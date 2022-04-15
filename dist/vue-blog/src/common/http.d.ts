import { AxiosPromise } from "axios";
export declare const get: (url: string, params: any) => AxiosPromise;
export declare const post: (url: string, data: any) => AxiosPromise;
export declare const update: (url: string, data: any) => AxiosPromise;
export declare const remove: (url: string) => AxiosPromise;
