import { DataPipeConfig, CommandResponse } from "./interfaces";
import { HttpResponse, HttpClient } from "@angular/common/http";
import { MmrConfiguration } from "./config-interface";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";


/**
 * 页面配置
 */
export interface PageConfig {
    /** 
     * 视图唯一ID 
     */
    id: string;
    /** 
     * 视图描述 
     */
    description: string;
    /** 
     * 视图配置版本号，用来识别配置 
     */
    version: number ;
    /**
     * 页面组件配置
     */
    views: ViewComponent;
}

/**
 * 视图组件配置
 */
export interface ViewComponent {
    /**
     * 组件唯一标识
     */
    id: string;
    /**
     * 组件描述
     */
    description?: string;
    /**
     * 组件类型
     */
    type: string;
    /**
     * 布局方式
     */
    layout: string;
    /**
     * 配置子项
     */
    items?: Array<ViewComponent>;    
}


/**
 * 命令类型
 */
export enum CommandType {
    REMOTE,
    LOCALE
}

/**
 * 命令
 */
export interface Command {
    /** 命令ID */
    id: string;     

    /** 命令类型*/
    type: CommandType;

    /** 命令文本描述 */
    description?: string;   
}



export class RemoteCommand implements Command {
    type: CommandType = CommandType.REMOTE;
    id: string;
    description?: string;
   
    /**
     * HTTP 请求方法
     */
    method:string = 'GET'

    /**
     * 输入数据格式定义
     */
    input: {[key: string]: any};

    /**
     * 结果数据绑定到的目标数据空间
     */
    bindingTo: string;

}

export class LocalCommand implements Command {
    type: CommandType = CommandType.LOCALE;
    id: string;
    description?: string;
}


/**
 * 每视图一个实例，不共享
 * 视图对象管理器
 */
export class ViewDataManager {
    /**
     * 全部数据空间
     */
    dataSet: any = {}
    /**
     * 视图管理器绑定的视图
     */
    viewId: string;
    
    /**
     * 获取指定数据
     * @param expression 表达式
     */
    lookup(expression:String ): any {

    if (!expression) {
            return null;
        }
        
        if (!expression.match("^\$\{[^}]\}$")) {
            throw new Error("不正确的表达式")
        }

        expression = expression.replace(/(?:^$\{)|(?:\})$/g,'')

        let exps = expression.split("\.");
        let val, i = exps.length;
        
        do {
            val = this.dataSet[exps[i]]
        } while ( val == null || i-- <= 0)

        return val
    }

    /**
     * 绑定数据到指定数据空间
     * @param expression 
     * @param data 
     */
    binding(expression, data: any) {

    }
}

/**
 * 命令执行器
 */
export class CommandExecutor {

    constructor(
        private mmrConfiguration: MmrConfiguration,
        private viewManager: ViewDataManager,
        private httpClient: HttpClient
    ) {}

    execute(cmd: Command) {
        
    }

    /**
     * 执行本地命令
     * @param cmd 
     */
    private executeLocalCommand(cmd: LocalCommand): Observable<any> {

        return of({})
    }


    /**
     * 执行远程命令
     * @param cmd 
     */
    private executeRemoteCommand(cmd: RemoteCommand): Observable<any> {
        const method = 'POST'

        const data: any = {}
        // TODO 使用表达式解析参数集合

        const options: any = {
            body: data,
            observe: 'response',
        }

       return this.httpClient.request<HttpResponse<any>>(
            method,
            this.mmrConfiguration.getRemoteCommandUrl(`v1/views/${this.viewManager.viewId}/commands/${cmd.id}`),
            options
        )
        .map(response => {
            if (response instanceof HttpResponse) {
              
              // 绑定数据集合
              if (cmd.bindingTo) {
                  this.viewManager.binding(cmd.bindingTo, response.body)
              }
      
              return {
                status: response.status,
                command: cmd,
                data: response.body
              }
            }
          })
    }
}