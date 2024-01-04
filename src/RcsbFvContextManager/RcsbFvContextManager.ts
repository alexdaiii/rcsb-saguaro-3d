import {PluginContext} from "molstar/lib/mol-plugin/context";
import {Subject, Subscription} from "rxjs";

import {RcsbFvSequenceInterface} from "../RcsbFvSequence/RcsbFvSequence";
import {RcsbFvStructureConfigInterface} from "../RcsbFvStructure/RcsbFvStructure";
import {EventType} from "./utils";

/**Main Event Data Object Interface*/
export interface RcsbFvContextManagerInterface<T, R, S, U> {
  eventType: EventType;
  eventData:
    | string
    | UpdateConfigInterface<T, R, S, U>
    | ((plugin: PluginContext) => void);
}

export interface UpdateConfigInterface<T, R, S, U> {
  structurePanelConfig?: Partial<RcsbFvStructureConfigInterface<R, S>>;
  sequencePanelConfig?: Partial<RcsbFvSequenceInterface<T, U>>;
}

/**rxjs Event Handler Object. It allows objects to subscribe methods and then, get(send) events to(from) other objects*/
export class RcsbFvContextManager<T, R, S, U> {
  private readonly subject: Subject<RcsbFvContextManagerInterface<T, R, S, U>> =
    new Subject<RcsbFvContextManagerInterface<T, R, S, U>>();
  /**Call other subscribed methods
   * @param obj Event Data Structure Interface
   * */
  public next(obj: RcsbFvContextManagerInterface<T, R, S, U>): void {
    this.subject.next(obj);
  }
  /**Subscribe loadMethod
   * @return Subscription
   * */
  public subscribe(
    f: (x: RcsbFvContextManagerInterface<T, R, S, U>) => void,
  ): Subscription {
    return this.subject.asObservable().subscribe(f);
  }
  /**Unsubscribe all methods*/
  public unsubscribeAll(): void {
    this.subject.unsubscribe();
  }
}
