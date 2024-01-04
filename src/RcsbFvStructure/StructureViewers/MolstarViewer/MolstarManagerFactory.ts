import {Viewer, ViewerProps} from "@rcsb/rcsb-molstar/build/src/viewer";

import {RcsbFvStateInterface} from "../../../RcsbFvState/RcsbFvStateInterface";
import {DataContainer} from "../../../utils/DataContainer";
import {ViewerManagerFactoryInterface} from "../../StructureViewerInterface";
import {
  LoadMolstarInterface,
  MolstarActionManager,
} from "./MolstarActionManager";
import {MolstarCallbackManager} from "./MolstarCallbackManager";
import {MolstarModelMapManager} from "./MolstarModelMapManager";

export class MolstarManagerFactory<P, L>
  implements
    ViewerManagerFactoryInterface<
      LoadMolstarInterface<P, L>,
      L,
      {viewerElement: string | HTMLElement; viewerProps: Partial<ViewerProps>}
    >
{
  private readonly getModelIdFromTrajectory: (
    trajectory: L,
  ) => string | undefined;

  constructor(getModelIdFromTrajectory: (trajectory: L) => string | undefined) {
    this.getModelIdFromTrajectory = getModelIdFromTrajectory;
  }

  public getViewerManagerFactory(
    stateManager: RcsbFvStateInterface,
    viewerParams: {
      viewerElement: string | HTMLElement;
      viewerProps: Partial<ViewerProps>;
    },
  ) {
    const loadingFlag: DataContainer<boolean> = new DataContainer(false);
    const innerSelectionFlag: DataContainer<boolean> = new DataContainer(false);
    const innerReprChangeFlag: DataContainer<boolean> = new DataContainer(
      false,
    );
    const viewer = new Viewer(viewerParams.viewerElement, {
      ...viewerParams.viewerProps,
      layoutShowControls: false,
      layoutShowSequence: true,
      canvas3d: {
        multiSample: {
          mode: "off",
        },
      },
    });
    viewer.plugin.selectionMode = true;
    const modelMapManager: MolstarModelMapManager<L> =
      new MolstarModelMapManager(viewer, this.getModelIdFromTrajectory);
    const callbackManager: MolstarCallbackManager = new MolstarCallbackManager({
      viewer: viewer,
      stateManager: stateManager,
      loadingFlag: loadingFlag,
      modelMapManager: modelMapManager,
      innerSelectionFlag: innerSelectionFlag,
      innerReprChangeFlag: innerReprChangeFlag,
    });
    const actionManager = new MolstarActionManager<P, L>({
      viewer: viewer,
      modelMapManager: modelMapManager,
      innerSelectionFlag: innerSelectionFlag,
      innerReprChangeFlag: innerReprChangeFlag,
      loadingFlag: loadingFlag,
    });
    return {
      actionManager,
      callbackManager,
    };
  }
}
