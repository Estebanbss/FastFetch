import { fetch, RequestInit as UndiciRequestInit } from 'undici';
import { HTTPRequestConfig, HTTPResponse } from './interfaces';

class FastFetch {

  private static async makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    url: string,
    config: HTTPRequestConfig = {}
  ): Promise<HTTPResponse<T>> {
    const { data, headers, timeout } = config;
    const options: UndiciRequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: data ? JSON.stringify(data) : null,
    };

    if (timeout) {
      const controller = new AbortController();
      options.signal = controller.signal;
      setTimeout(() => controller.abort(), timeout);
    }

    try {
      const response = await fetch(url, options as UndiciRequestInit);
      const responseData: T = await response.json() as T;
      const result: HTTPResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Request error: ${error.message}`);
      } else {
        throw new Error('Request error: An unknown error occurred');
      }
    }
  }

  static get<T>(url: string, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> {
    return this.makeRequest<T>('GET', url, config);
  }

  static post<T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> {
    return this.makeRequest<T>('POST', url, { ...config, data });
  }

  static put<T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> {
    return this.makeRequest<T>('PUT', url, { ...config, data });
  }

  static delete<T>(url: string, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> {
    return this.makeRequest<T>('DELETE', url, config);
  }

  static patch<T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> {
    return this.makeRequest<T>('PATCH', url, { ...config, data });
  }

  static request<T>(config: HTTPRequestConfig): Promise<HTTPResponse<T>> {
    const { method = 'GET', url, data, ...restConfig } = config;
    return this.makeRequest<T>(method as 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', url, { ...restConfig, data });
  }
}

const createInstance = () => {
  const instance = (config: HTTPRequestConfig) => FastFetch.request(config);
  instance.get = <T>(url: string, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> => FastFetch.get(url, config);
  instance.post = <T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> => FastFetch.post(url, data, config);
  instance.put = <T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> => FastFetch.put(url, data, config);
  instance.delete = <T>(url: string, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> => FastFetch.delete(url, config);
  instance.patch = <T>(url: string, data: any, config: HTTPRequestConfig = {}): Promise<HTTPResponse<T>> => FastFetch.patch(url, data, config);

  return instance;
};

const fastFetch = createInstance();

export default fastFetch;
export { FastFetch };
