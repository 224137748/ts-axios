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
export interface AxiosRespons<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

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
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  put<T = any>(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>

  patch<T = any>(url?: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * AxiosInstance实例本身是一个方法，并且还继承Axios方法
 * 函数重载，有两种方式传参
 */
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

/**
 * 定义axios拦截器接口
 */
export interface AxiosInterceptorManger<T> {
  // 添加拦截器
  use(resolve: ResolvedFn<T>, reject: RejectedFn): number

  // 删除拦截器
  eject(id: number): void
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
