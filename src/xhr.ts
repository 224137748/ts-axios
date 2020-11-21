import { AxiosRequestConfig } from './types/'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, data = null, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toLowerCase(), url, true)

  Object.keys(headers).forEach(name => {
    /* 如果data数据为null， 删除headers字段 */
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
