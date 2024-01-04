import {PluginContext} from "molstar/lib/mol-plugin/context";
import {Subject, Subscription} from "rxjs";

import {RcsbFvCustomSequenceInterface} from "../RcsbFvSequence/RcsbFvCustomSequence";
import {RcsbFvStructureConfigInterface} from "../RcsbFvStructure/RcsbFvStructure";
import {EventType} from "./utils";

/**Main Event Data Object Interface*/
export interface RcsbFvCustomContextManagerInterface<R, L, S> {
  eventType: EventType;
  eventData:
    | string
    | CustomUpdateConfigInterface<R, L, S>
    | ((plugin: PluginContext) => void);
}

export interface CustomUpdateConfigInterface<R, L, S> {
  structurePanelConfig?: Partial<RcsbFvStructureConfigInterface<R, S>>;
  sequencePanelConfig?: Partial<RcsbFvCustomSequenceInterface<R, L>>;
}

/**rxjs Event Handler Object. It allows objects to subscribe methods and then, get(send) events to(from) other objects*/
export class RcsbFvCustomContextManager<R, L, S> {
  private readonly subject: Subject<
    RcsbFvCustomContextManagerInterface<R, L, S>
  > = new Subject<RcsbFvCustomContextManagerInterface<R, L, S>>();
  /**Call other subscribed methods
   * @param obj Event Data Structure Interface
   * */
  public next(obj: RcsbFvCustomContextManagerInterface<R, L, S>): void {
    this.subject.next(obj);
  }
  /**Subscribe loadMethod
   * @return Subscription
   * */
  public subscribe(
    f: (x: RcsbFvCustomContextManagerInterface<R, L, S>) => void,
  ): Subscription {
    return this.subject.asObservable().subscribe(f);
  }
  /**Unsubscribe all methods*/
  public unsubscribeAll(): void {
    this.subject.unsubscribe();
  }
}
