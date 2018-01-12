import {MmrConfiguration} from '../@theme'

export class MmrConfigurationMock implements MmrConfiguration {

    getRemoteCommandUrl(uri: string): string {
        return `/assets/mock-data/${uri}`;
    }

}