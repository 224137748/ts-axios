import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/'

import { parseHeaders } from './helpers/header'
import { createError } from './helpers/error'

/**
 * 封装原生js ajax请求
 * @param config
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toLowerCase(), url!, true)

    // 监听状态变化
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      // 网络错误或者超时错误为0
      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        data: responseData,
        config,
        request
      }

      handleResponse(response)
    }

    // 监听异常（网络错误）
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 监听请求超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms execeeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      /* 如果data数据为null， 删除headers字段 */
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed width status code ${response.status}`))
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
