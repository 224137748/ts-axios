import Axios from './core/Axios'
import defaults from './default'
import { AxiosRequestConfig, AxiosStatic } from './types'
import { extend } from './helpers/utils'
import mergeConfig from './core/mergeConfig'

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

export default axios
