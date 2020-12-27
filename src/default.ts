import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/header'
import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 6000,

  headers: {
    common: {
      Accepet: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(data, headers)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any) {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methdsWidthData = ['post', 'put', 'patch']
methdsWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
