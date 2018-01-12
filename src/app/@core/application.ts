import { AppState } from './application.state';


export class Application  {
   private __state: AppState = new AppState();

    getState(): AppState {
        return this.__state;
    }

    
}