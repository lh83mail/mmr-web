import { InjectionToken } from '@angular/core';

export abstract class MmrConfiguration {
    /**
     * 系统远程命令地址
     */
    abstract getRemoteCommandUrl(uri: string): string;
}



