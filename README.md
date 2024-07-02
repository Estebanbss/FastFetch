# ⚡ FastFetch

[![npm version](https://badge.fury.io/js/fast-fetch.svg)](https://badge.fury.io/js/fast-fetch)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badge/)

**FastFetch** is a super fast and optimized HTTP client for Node.js. It provides a simple and intuitive API to make HTTP requests with ease, inspired by the simplicity of Axios.

## Features
- 🚀 **Super Fast**: Optimized for speed and performance.
- ⚙️ **Simple API**: Easy to use, similar to Axios.
- 🔒 **Configurable**: Custom headers, timeouts, and more.
- 🌐 **Supports All HTTP Methods**: GET, POST, PUT, DELETE, PATCH.

## Available Methods

- **`get(url: string, config?: HTTPRequestConfig): Promise<HTTPResponse<T>>`**
- **`post(url: string, data: any, config?: HTTPRequestConfig): Promise<HTTPResponse<T>>`**
- **`put(url: string, data: any, config?: HTTPRequestConfig): Promise<HTTPResponse<T>>`**
- **`delete(url: string, config?: HTTPRequestConfig): Promise<HTTPResponse<T>>`**
- **`patch(url: string, data: any, config?: HTTPRequestConfig): Promise<HTTPResponse<T>>`**

## Configuration Options

- **`headers`**: Custom HTTP headers to send with the request.
- **`timeout`**: Request timeout in milliseconds.

## Example Usage

### POST Request

Making a POST request with custom headers and timeout:

```typescript
import FastFetch from 'fast-fetch';

FastFetch.post('http://api.example.com/data', { key: 'value' }, {
  headers: {
    'Custom-Header': 'CustomValue',
    'Authorization': 'Bearer your_token'
  },
  timeout: 5000 // 5 seconds
})
  .then(response => console.log('POST response:', response.data))
  .catch(error => console.error('POST error:', error));
