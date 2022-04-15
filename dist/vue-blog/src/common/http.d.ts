import { AxiosResponse } from "axios";
export declare const get: (url: string, params: any) => Promise<AxiosResponse<any, any>>;
export declare const post: (url: string, data: any) => Promise<AxiosResponse<any, any>>;
export declare const update: (url: string, data: any) => Promise<AxiosResponse<any, any>>;
export declare const remove: (url: string) => Promise<AxiosResponse<any, any>>;
