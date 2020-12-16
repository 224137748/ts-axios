import axios from '../../src/index'

axios.interceptors.request.use((config) => {
  config.headers.XMLHttpRequestResponseType = 'json'
  config.headers.test += '1'
  console.log(JSON.stringify(config));
  return config;
})
axios.interceptors.request.use((config) => {
  config.headers.test += '2'
  console.log(JSON.stringify(config));
  return config;
})
axios.interceptors.request.use((config) => {
  config.headers.XMLHttpRequestResponseType = 'json'
  config.headers.test += '3'
  console.log(JSON.stringify(config));

  return config;
})

axios.interceptors.response.use(res => {
  res.data += '1'
  return res
})
axios.interceptors.response.use(res => {
  res.data += '2'
  return res
})


let instance = axios.interceptors.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptors.response.eject(instance)

axios({
  method: 'get',
  url: '/interceptor/get',
  headers: {
    test: ''
  }
}).then(res => {
  console.log(res.data)
})