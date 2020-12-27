import axios from '../../src/index'
import { AxiosTransformer } from '../../src/types'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123

axios({
  method: 'post',
  url: '/config/post',
  data: qs.stringify({
    ac: 1
  }),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})

axios({
  transformRequest: [
    function (data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function (data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})


const instance = axios.create({
  headers: {
    'hahah': 1231313
  }
})

instance({
  url: '/config/post',
  method: 'post',
  data: {
    abc: 12313
  }
}).then(res => {
  console.log(res)
})