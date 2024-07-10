import { fetch, RequestInit as UndiciRequestInit } from 'undici';
import { HTTPRequestConfig, HTTPResponse } from './interfaces';

export default class FastFetch {

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
      options.signal = AbortSignal.timeout(timeout);
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
}