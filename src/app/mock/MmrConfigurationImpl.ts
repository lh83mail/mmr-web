import {MmrConfiguration} from '../@theme'
import { Injectable } from '@angular/core';

@Injectable()
export class MmrConfigurationMock extends MmrConfiguration {
    getRemoteCommandUrl(uri: string): string {
        return `/assets/mock-data/${uri}`;
    }

}