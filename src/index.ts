import { request, RequestOptions } from 'http';

interface FastFetchRequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  data?: any;
}

interface FastFetchResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export default class FastFetch {
  private static makeRequest<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH', url: string, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return new Promise((resolve, reject) => {
      const { hostname, pathname, port, protocol } = new URL(url);
      const data = config.data ? JSON.stringify(config.data) : null;
      const headers = {
        'Content-Type': 'application/json',
        ...config.headers,
      };

      const options: RequestOptions = {
        hostname,
        path: pathname,
        port: port || (protocol === 'https:' ? 443 : 80),
        method,
        headers,
        timeout: config.timeout,
      };

      const req = request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(responseData);
            const response: FastFetchResponse<T> = {
              data: parsedData,
              status: res.statusCode || 200,
              statusText: res.statusMessage || 'OK',
              headers: res.headers as Record<string, string>,
            };
            resolve(response);
          } catch (error) {
            reject(`Error parsing response: ${error}`);
          }
        });
      });

      req.on('error', (error) => {
        reject(`Request error: ${error.message}`);
      });

      if (options.timeout) {
        req.setTimeout(options.timeout, () => {
          req.abort();
          reject('Request timed out');
        });
      }

      if (data) {
        req.write(data);
      }
      req.end();
    });
  }

  static get<T>(url: string, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return this.makeRequest<T>('GET', url, config);
  }

  static post<T>(url: string, data: any, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return this.makeRequest<T>('POST', url, { ...config, data });
  }

  static put<T>(url: string, data: any, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return this.makeRequest<T>('PUT', url, { ...config, data });
  }

  static delete<T>(url: string, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return this.makeRequest<T>('DELETE', url, config);
  }

  static patch<T>(url: string, data: any, config: FastFetchRequestConfig = {}): Promise<FastFetchResponse<T>> {
    return this.makeRequest<T>('PATCH', url, { ...config, data });
  }
}