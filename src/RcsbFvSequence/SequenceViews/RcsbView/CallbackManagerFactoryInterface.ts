import {RcsbFvTrackDataElementInterface} from "@rcsb/rcsb-saguaro";
import {
    ViewerCallbackManagerInterface, ViewerActionManagerInterface
} from "../../../RcsbFvStructure/StructureViewerInterface";
import {DataContainer} from "../../../Utils/DataContainer";
import {
    RcsbFvModulePublicInterface
} from "@rcsb/rcsb-saguaro-app/build/dist/RcsbFvWeb/RcsbFvModule/RcsbFvModuleInterface";
import {PfvManagerInterface} from "./PfvManagerFactoryInterface";
import {RcsbFvStateManager} from "../../../RcsbFvState/RcsbFvStateManager";

export interface CallbackManagerInterface<U> {
    pluginSelectCallback(mode:'select'|'hover'): Promise<void>;
    elementClickCallback(e:RcsbFvTrackDataElementInterface): void;
    highlightHoverCallback(selection: RcsbFvTrackDataElementInterface[]): void;
    selectionChangeCallback(selection: Array<RcsbFvTrackDataElementInterface>): void;
    modelChangeCallback(defaultAuthId?: string, defaultOperatorName?:string): Promise<void>;
    pfvChangeCallback(args:U): Promise<void>;
}

export interface CallbackManagerFactoryInterface<R,U> {
    getCallbackManager(config: CallbackConfigInterface<R>): CallbackManagerInterface<U>;
}

export interface CallbackConfigInterface<R> {
    rcsbFvContainer: DataContainer<RcsbFvModulePublicInterface>;
    stateManager: RcsbFvStateManager;
    plugin: ViewerCallbackManagerInterface & ViewerActionManagerInterface<R>;
    pfvFactory: PfvManagerInterface;
}

export abstract class AbstractCallbackManager<R,U> implements CallbackManagerInterface<U> {
    protected readonly rcsbFvContainer: DataContainer<RcsbFvModulePublicInterface>;
    protected readonly stateManager: RcsbFvStateManager;
    protected selectedComponentId: string|undefined;
    protected readonly plugin: ViewerCallbackManagerInterface & ViewerActionManagerInterface<R>;
    protected pfvFactory: PfvManagerInterface;
    protected readonly isInnerSelection: DataContainer<boolean> = new DataContainer<boolean>();

    constructor(config: CallbackConfigInterface<R>) {
        this.rcsbFvContainer = config.rcsbFvContainer;
        this.stateManager = config.stateManager;
        this.plugin = config.plugin;
        this.pfvFactory = config.pfvFactory;
    }

    public async pluginSelectCallback(mode:'select'|'hover'): Promise<void> {
        if(this.rcsbFvContainer.get() == null)
            return;
        this.isInnerSelection.set(true);
        await this.innerPluginSelect(mode);
        this.isInnerSelection.set(false);
    }

    public selectionChangeCallback(selection: Array<RcsbFvTrackDataElementInterface>): void {
        if(this.isInnerSelection.get())
            return;
        this.innerSelectionChange(selection);
    }

    public abstract elementClickCallback(e:RcsbFvTrackDataElementInterface): void;
    public abstract highlightHoverCallback(selection: RcsbFvTrackDataElementInterface[]): void;
    public abstract modelChangeCallback(defaultAuthId?: string, defaultOperatorName?:string): Promise<void>;
    public abstract pfvChangeCallback(args: U): Promise<void>;
    protected abstract innerPluginSelect(mode: "select" | "hover"): Promise<void> ;
    protected abstract innerSelectionChange(selection: Array<RcsbFvTrackDataElementInterface>): void;

}