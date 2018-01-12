import { Subject }  from 'rxjs/Subject';

export class EventsBus {

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();

  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {

    const current = this._data[event];
    const subscribers = this._subscriptions.get(event) || [];
    const ignoreReatValue = subscribers['opt'] ? (subscribers['opt']['ignoreRepeat'] !== false) : true;

    if (current !== value || ignoreReatValue) {
      this._data[event] = value;

      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, callback: Function) {
    const subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);
    if (callback['opt']) {
        subscribers['opt'] = callback['opt'];
    }
    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    const subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }
}
