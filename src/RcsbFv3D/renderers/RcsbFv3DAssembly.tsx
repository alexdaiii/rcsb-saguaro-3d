import {ViewerProps} from "@rcsb/rcsb-molstar/build/src/viewer";
import {InstanceSequenceConfig} from "@rcsb/rcsb-saguaro-app/lib/RcsbFvWeb/RcsbFvBuilder/RcsbFvInstanceBuilder";
import {RcsbFvAdditionalConfig} from "@rcsb/rcsb-saguaro-app/lib/RcsbFvWeb/RcsbFvModule/RcsbFvModuleInterface";
import uniqid from "uniqid";

import {AssemblyCallbackManagerFactory} from "../../RcsbFvSequence/SequenceViews/RcsbView/CallbackManagerFactoryImplementation/AssemblyCallbackManager";
import {HelpLinkComponent} from "../../RcsbFvSequence/SequenceViews/RcsbView/Components/HelpLinkComponent";
import {AssemblyPfvManagerFactory} from "../../RcsbFvSequence/SequenceViews/RcsbView/PfvManagerFactoryImplementation/AssemblyPfvManagerFactory";
import {RcsbFvStructure} from "../../RcsbFvStructure/RcsbFvStructure";
import {AssemblyBehaviourObserver} from "../../RcsbFvStructure/StructureViewerBehaviour/AssemblyBehaviour";
import {OperatorInfo} from "../../RcsbFvStructure/StructureViewerInterface";
import {
  LoadMolstarInterface,
  LoadMolstarReturnType,
} from "../../RcsbFvStructure/StructureViewers/MolstarViewer/MolstarActionManager";
import {MolstarManagerFactory} from "../../RcsbFvStructure/StructureViewers/MolstarViewer/MolstarManagerFactory";
import {MolstarAssemblyLoader} from "../../RcsbFvStructure/StructureViewers/MolstarViewer/MolstarUtils/MolstarAssemblyLoader";
import {MolstarTools} from "../../RcsbFvStructure/StructureViewers/MolstarViewer/MolstarUtils/MolstarTools";
import {AssemblyTrajectoryParamsType} from "../../RcsbFvStructure/StructureViewers/MolstarViewer/TrajectoryPresetProvider/AssemblyTrajectoryPresetProvider";
import {StructureViewer} from "../../RcsbFvStructure/StructureViewers/StructureViewer";
import {RcsbFv3DCssConfig} from "../components";
import {RcsbFv3DAbstract} from "./RcsbFv3DAbstract";

import getModelIdFromTrajectory = MolstarTools.getModelIdFromTrajectory;

type RcsbFv3DAssemblyAdditionalConfig = RcsbFvAdditionalConfig & {
  operatorChangeCallback?: (operatorInfo: OperatorInfo) => void;
};

export interface RcsbFv3DAssemblyInterface {
  elementId?: string;
  config: {
    entryId: string;
    assemblyId?: string;
    asymId?: string;
    title?: string;
    subtitle?: string;
  };
  additionalConfig?: RcsbFv3DAssemblyAdditionalConfig;
  instanceSequenceConfig?: InstanceSequenceConfig;
  useOperatorsFlag?: boolean;
  molstarProps?: Partial<ViewerProps>;
  cssConfig?: RcsbFv3DCssConfig;
}

type AssemblyLoadMolstarType = LoadMolstarInterface<
  AssemblyTrajectoryParamsType,
  LoadMolstarReturnType
>;
export class RcsbFv3DAssembly extends RcsbFv3DAbstract<
  {instanceSequenceConfig?: InstanceSequenceConfig},
  AssemblyLoadMolstarType,
  LoadMolstarReturnType,
  {viewerElement: string | HTMLElement; viewerProps: Partial<ViewerProps>},
  undefined
> {
  constructor(params: RcsbFv3DAssemblyInterface) {
    const elementId: string = params.elementId ?? uniqid("RcsbFv3D_");
    super({
      elementId: params.elementId ?? elementId,
      sequenceConfig: {
        title: params.config.title,
        subtitle: params.config.subtitle,
        config: {
          rcsbId: params.config.entryId,
          additionalConfig: params.additionalConfig,
          useOperatorsFlag: params.useOperatorsFlag,
          pfvParams: {
            instanceSequenceConfig: params.instanceSequenceConfig,
          },
          pfvManagerFactory: new AssemblyPfvManagerFactory(),
          callbackManagerFactory: new AssemblyCallbackManagerFactory(),
          additionalContent: (props) => (
            <HelpLinkComponent
              {...props}
              helpHref={"/docs/sequence-viewers/3d-protein-feature-view"}
            />
          ),
        },
      },
      structureConfig: {
        structureViewerConfig: {
          viewerElement: RcsbFvStructure.componentId(elementId),
          viewerProps: params.molstarProps ?? {},
        },
      },
      structureViewer: new StructureViewer<
        AssemblyLoadMolstarType,
        LoadMolstarReturnType,
        {
          viewerElement: string | HTMLElement;
          viewerProps: Partial<ViewerProps>;
        }
      >(new MolstarManagerFactory(getModelIdFromTrajectory)),
      structureViewerBehaviourObserver: new AssemblyBehaviourObserver<
        AssemblyLoadMolstarType,
        LoadMolstarReturnType
      >(
        new MolstarAssemblyLoader({
          entryId: params.config.entryId,
          assemblyId:
            typeof params.config.assemblyId === "string" &&
            params.config.assemblyId?.length > 0
              ? params.config.assemblyId
              : "1",
          asymId: params.config.asymId,
        }),
      ),
      cssConfig: params.cssConfig,
    });
  }
}
