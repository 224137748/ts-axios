import { isPlainObject } from './utils'

/**
 * 处理发送请求的数据
 * @param data any
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }

  return data
}

/**
 * 处理接口返回的数据，尝试将string数据转化为json对象
 * @param data any
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
