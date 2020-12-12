export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'put'
  | 'PUT'
  | 'options'
  | 'OPTIONS'
  | 'patch'
  | 'PATCH'

/**
 * 定义接口请求类型
 */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/**
 * 定义axios接口返回类型
 */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

/**
 * 定义ajax请求错误接口
 */
export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

/**
 * 定义Axios 方法类
 */
export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise

  get(url: string, config?: AxiosRequestConfig): AxiosPromise

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise

  head(url: string, config?: AxiosRequestConfig): AxiosPromise

  options(url: string, config?: AxiosRequestConfig): AxiosPromise

  post(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  put(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

  patch(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
}

/**
 * AxiosInstance实例本身是一个方法，并且还继承Axios方法
 * 函数重载，有两种方式传参
 */
export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise

  (url: string, config?: AxiosRequestConfig): AxiosPromise
}
