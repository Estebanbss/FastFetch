export interface HTTPClientConfig {
     baseURL?: string;
     headers?: Record<string, string>;
     timeout?: number;
   }
   
   export interface HTTPRequestConfig extends Partial<HTTPClientConfig> {
     data?: any;
   }
   
   export interface HTTPResponse<T = any> {
     [x: string]: any;
     data: T;
     status: number;
     statusText: string;
     headers: Record<string, string>;
   }
   