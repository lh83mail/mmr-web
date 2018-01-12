import { InjectionToken } from "@angular/core";

export interface MmrConfiguration {
    /**
     * 系统远程命令地址
     */
    getRemoteCommandUrl(uri: string): string;

}


export declare const MMR_CONFIGRATION_TOKEN: InjectionToken<MmrConfiguration>;