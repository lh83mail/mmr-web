import { Subject }  from 'rxjs/Subject';

export interface MmrEvent {
  source?: any
  data?: any
}

export class MmrEventBus {
    private _data = new Subject<Object>();
    private _dataStream$ = this._data.asObservable();
    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  
    constructor() {
      this._dataStream$.subscribe((data) => this._onEvent(data));
    }
  
    /**
     * @param event 事件名称
     * @param value 数据
     */
    notify(event, ...values) {
      const current = this._data[event];
      const subscribers = this._subscriptions.get(event) || [];
      this._data[event] = values;
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  
    subscribe(event: string, callback: Function, scope = null) {
      const subscribers = this._subscriptions.get(event) || [];
      callback["__$scope"] = scope
      subscribers.push(callback);
      this._subscriptions.set(event, subscribers);
    }

    canncel(event:string, callback: Function) {
        let subscribers = this._subscriptions.get(event) || [];        
        subscribers = subscribers.filter(c => c !== callback)
        this._subscriptions.set(event, subscribers);
    }
  
    _onEvent(data: any) {
      const subscribers = this._subscriptions.get(data['event']) || [];
      subscribers.forEach((callback) => {
        callback.apply(callback["__$scope"], data['data'])    
      });
    }
}