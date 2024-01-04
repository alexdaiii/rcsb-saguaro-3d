/*
 * Copyright (c) 2021 RCSB PDB and contributors, licensed under MIT, See LICENSE file for more info.
 * @author Joan Segura Mora <joan.segura@rcsb.org>
 */
import {Subject, Subscription} from "rxjs";

import {OperatorInfo} from "../RcsbFvStructure/StructureViewerInterface";
import {DataContainer} from "../utils/DataContainer";
import {AssemblyModelSate} from "./AssemblyModelSate";
import {RcsbFvSelectorManager} from "./RcsbFvSelectorManager";
import {RcsbFvStateInterface, RcsbFvStateType} from "./RcsbFvStateInterface";

export class RcsbFvStateManager implements RcsbFvStateInterface {
  readonly assemblyModelSate: AssemblyModelSate = new AssemblyModelSate();
  readonly selectionState: RcsbFvSelectorManager = new RcsbFvSelectorManager();
  readonly pfvContext: DataContainer<{
    entryId: string;
    asymId?: string;
    operator?: OperatorInfo;
  }> = new DataContainer<{
    entryId: string;
    asymId?: string;
    operator?: OperatorInfo;
  }>();
  readonly subject: Subject<RcsbFvStateType<any, any>> =
    new Subject<RcsbFvStateType>();

  next<T, D>(state: RcsbFvStateType<T, D>): void {
    this.subject.next(state);
  }

  subscribe<T, D>(o: (state: RcsbFvStateType<T, D>) => void): Subscription {
    return this.subject.subscribe(o);
  }

  unsubscribe(): void {
    this.subject.unsubscribe();
  }
}
