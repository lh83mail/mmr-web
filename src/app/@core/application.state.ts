

export class AppState {
    _localStorage: any;

    constructor() {
      if (!sessionStorage) {
        throw new Error('Current browser does not support session Storage');
      }
      this._localStorage = sessionStorage;
    }

    getState():Promise<any> {
        return Promise.resolve(this._clone(this._localStorage));
    }

    setState(value): Promise<any> {
        return Promise.reject(new Error('do not mutate the `.state` directly'));
    }

    get(prop?: any): Promise<any> {
      return Promise.resolve((this._localStorage[prop] || false));
    }

    set(prop: string, value: any): Promise<boolean> {
        this._localStorage[prop] = value;
        return Promise.resolve(true);
    }

    clear(): Promise<boolean> {
        this._localStorage.clear();
        return Promise.resolve(true);
    }

    private _clone(object: any) {
        return JSON.parse(JSON.stringify(object));
    }
}