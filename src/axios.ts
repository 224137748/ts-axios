import Axios from './core/Axios'
import defaults from './default'
import { AxiosRequestConfig, AxiosStatic, CancelTokenStatic, CancelStatic } from './types'
import { extend } from './helpers/utils'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(initConfig: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(initConfig)
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken as CancelTokenStatic
axios.Cancel = Cancel as CancelStatic
axios.isCancel = isCancel

export default axios
