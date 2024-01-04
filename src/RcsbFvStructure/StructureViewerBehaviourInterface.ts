/*
 * Copyright (c) 2021 RCSB PDB and contributors, licensed under MIT, See LICENSE file for more info.
 * @author Joan Segura Mora <joan.segura@rcsb.org>
 */
import {RcsbFvStateInterface} from "../RcsbFvState/RcsbFvStateInterface";
import {
  ViewerActionManagerInterface,
  ViewerCallbackManagerInterface,
} from "./StructureViewerInterface";

export interface StructureViewerBehaviourObserverInterface<R, L> {
  observe(
    structureViewer: ViewerCallbackManagerInterface &
      ViewerActionManagerInterface<R, L>,
    stateManager: RcsbFvStateInterface,
  ): void;
  unsubscribe(): void;
}

export interface StructureViewerBehaviourInterface {
  selectionChange(): void;
  hoverChange(): void;
  featureClick(): void;
  modelChange(): void;
  reprChange(): void;
  unsubscribe(): void;
}
