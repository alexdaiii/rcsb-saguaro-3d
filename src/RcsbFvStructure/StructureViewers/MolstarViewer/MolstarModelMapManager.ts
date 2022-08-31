import {
    ChainInfo,
    OperatorInfo,
    SaguaroPluginModelMapType,
    ViewerModelMapManagerInterface
} from "../../StructureViewerInterface";
import {PluginContext} from "molstar/lib/mol-plugin/context";
import {Structure, StructureElement, StructureProperties as SP} from "molstar/lib/mol-model/structure";
import {StructureRef} from "molstar/lib/mol-plugin-state/manager/structure/hierarchy-state";
import {State} from "molstar/lib/mol-state";
import {PluginStateObject as PSO} from "molstar/lib/mol-plugin-state/objects";
import {Viewer} from "@rcsb/rcsb-molstar/build/src/viewer";
import {LoadMolstarInterface} from "./MolstarActionManager";

interface LoadParams<P=any,S={}> {
    id?:string;
    params?:P;
}

export class MolstarModelMapManager implements ViewerModelMapManagerInterface<LoadMolstarInterface> {

    private readonly viewer: Viewer;
    private readonly modelMap: Map<string,string|undefined> = new Map<string, string>();

    constructor(viewer: Viewer) {
        this.viewer = viewer;
    }

    public add(lC: LoadMolstarInterface){
        (Array.isArray(lC.loadParams) ? lC.loadParams : [lC.loadParams]).forEach((lP: LoadParams)=>{
            if(typeof lP.params?.getMap === "function") {
                const map: Map<string,string> = lP.params.getMap();
                if(typeof map?.forEach === "function")
                    map.forEach((modelId: string, key: string) => {
                        if (typeof modelId === "string" && typeof key === "string") {
                            this.modelMap.set(key, modelId);
                            this.modelMap.set(modelId, key);
                        }
                    })
            }
        });
        this.map(lC.loadParams);
    }

    public getChains(): SaguaroPluginModelMapType{
        const structureRefList = getStructureOptions(this.viewer.plugin);
        const out: SaguaroPluginModelMapType = new Map<string, {entryId: string; chains: Array<ChainInfo>; assemblyId:string;}>();
        structureRefList.forEach((structureRef,i)=>{
            const structure: Structure = getStructure(structureRef[0], this.viewer.plugin.state.data);
            let modelEntityId = getModelEntityOptions(structure)[0][0];
            const chains: [{modelId:string;entryId:string;assemblyId:string;},ChainInfo[]] = getChainValues(structure, modelEntityId);
            out.set(this.getModelId(chains[0].modelId),{entryId:chains[0].entryId, assemblyId:chains[0].assemblyId, chains: chains[1]});
        });
        return out;
    }

    public getModelId(id: string): string{
        return this.modelMap.get(id) ?? id;
    }

    private map(loadParams: LoadParams | Array<LoadParams>): void{
        const loadParamList: Array<LoadParams> = loadParams instanceof Array ? loadParams : [loadParams];
        const structureRefList = getStructureOptions(this.viewer.plugin);
        if(loadParamList.length == structureRefList.length )
            structureRefList.forEach((structureRef,i)=>{
                const structure = getStructure(structureRef[0], this.viewer.plugin.state.data);
                let modelEntityId = getModelEntityOptions(structure)[0][0];
                const chains: [{modelId:string, entryId:string},ChainInfo[]] = getChainValues(structure, modelEntityId);
                if(!this.modelMap.has(chains[0].modelId)) {
                    this.modelMap.set(chains[0].modelId, loadParamList[i].id);
                    if (loadParamList[i].id != null)
                        this.modelMap.set(loadParamList[i].id!, chains[0].modelId);
                }
            });
    }
}


function getStructureOptions(plugin: PluginContext): [string,string][] {
    const options: [string, string][] = [];
    plugin.managers.structure.hierarchy.current.structures.forEach(s=>{
        options.push([s.cell.transform.ref, s.cell.obj!.data.label]);
    })
    return options;
}

function getChainValues(structure: Structure, modelEntityId: string): [{modelId:string; entryId:string; assemblyId:string;},ChainInfo[]] {
    const chains: Map<number, ChainInfo> = new Map<number, ChainInfo>();
    const l = StructureElement.Location.create(structure);
    let assemblyId:string = "-";
    const [modelIdx, entityId] = splitModelEntityId(modelEntityId);
    for (const unit of structure.units) {
        StructureElement.Location.set(l, structure, unit, unit.elements[0]);
        assemblyId = SP.unit.pdbx_struct_assembly_id(l);
        if (structure.getModelIndex(unit.model) !== modelIdx) continue;
        const chId: number = unit.chainGroupId;
        if(chains.has(chId)){
            chains.get(chId)!.operators.push(opKey(l))
        }else{
            chains.set(chId, {label:SP.chain.label_asym_id(l), auth:SP.chain.auth_asym_id(l), entityId: SP.entity.id(l), title: SP.entity.pdbx_description(l).join("|"), type: SP.entity.type(l), operators:[opKey(l)]});
        }
    }
    const id: {modelId:string; entryId:string; assemblyId:string;} = {modelId:l.unit?.model?.id, entryId: l.unit?.model?.entryId, assemblyId: assemblyId};
    return [id,Array.from(chains.values())];
}

function getStructureWithModelId(structures: StructureRef[], modelId: string): Structure|undefined{
    for(const structure of structures){
        if(!structure.cell?.obj?.data?.units)
            continue;
        const unit =  structure.cell.obj.data.units[0];
        const id:string = unit.model.id;
        if(id === modelId)
            return structure.cell.obj.data
    }
}

function getStructure(ref: string, state: State) {
    const cell = state.select(ref)[0];
    if (!ref || !cell || !cell.obj) return Structure.Empty;
    return (cell.obj as PSO.Molecule.Structure).data;
}

function getModelEntityOptions(structure: Structure):[string, string][] {
    const options: [string, string][] = [];
    const l = StructureElement.Location.create(structure);
    const seen = new Set<string>();
    for (const unit of structure.units) {
        StructureElement.Location.set(l, structure, unit, unit.elements[0]);
        const id = SP.entity.id(l);
        const modelIdx = structure.getModelIndex(unit.model);
        const key = `${modelIdx}|${id}`;
        if (seen.has(key)) continue;
        let description = SP.entity.pdbx_description(l).join(', ');
        if (structure.models.length) {
            if (structure.representativeModel) { // indicates model trajectory
                description += ` (Model ${structure.models[modelIdx].modelNum})`;
            } else  if (description.startsWith('Polymer ')) { // indicates generic entity name
                description += ` (${structure.models[modelIdx].entry})`;
            }
        }
        const label = `${id}: ${description}`;
        options.push([ key, label ]);
        seen.add(key);
    }
    if (options.length === 0) options.push(['', 'No entities']);
    return options;
}

function splitModelEntityId(modelEntityId: string) {
    const [ modelIdx, entityId ] = modelEntityId.split('|');
    return [ parseInt(modelIdx), entityId ];
}

function opKey(l: StructureElement.Location): OperatorInfo {
    const ids = SP.unit.pdbx_struct_oper_list_ids(l);
    const ncs = SP.unit.struct_ncs_oper_id(l);
    const hkl = SP.unit.hkl(l);
    const spgrOp = SP.unit.spgrOp(l);
    const name = SP.unit.operator_name(l);
    return {ids:ids,name:name};
}