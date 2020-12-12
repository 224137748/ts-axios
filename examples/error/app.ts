import axios, { AxiosError } from '../../src/index'

// 404
axios({
  method: 'get',
  url: '/error/error'
}).then(res => console.log(res)).catch(e => console.log(e))

// 500
axios({
  method: 'get',
  url: '/error/get'
}).then(res => console.log(res)).catch(e => console.log(e))

// timeout
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => console.log(res)).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.config)
  console.log(e.request)
  console.log(e.response)
})

// network error
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res => console.log(res)).catch(e => console.log(e))
}, 5000);