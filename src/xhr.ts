import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/'

/**
 * 封装原生js ajax请求
 * @param config
 */
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLowerCase(), url, true)

    // 监听状态变化
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        data: responseData,
        config,
        request
      }

      resolve(response)
    }

    Object.keys(headers).forEach(name => {
      /* 如果data数据为null， 删除headers字段 */
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
