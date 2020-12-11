import axios from '../../src/index'

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'barz']
  }
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date();

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})



axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@: v$'
  }
})


axios({
  method: 'get',
  url: '/base/get?abc',
  params: {
    foo: 'bar',
    bar: 'baz'
  }
})

axios({
  method: 'get',
  url: '/base/get#132132',
  params: {
    foo: 'bar',
    bar: 'baz'
  }
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    'Accept': 'application/json,text/plain,*/*'
  },
  data: {
    a: 1,
    b: 3
  }
})

const paramsString = 'q=URLUtils.searchParams&topoc=all'
const searchParams = new URLSearchParams(paramsString)

/**
 * 测试promise
 */
axios({
  method: 'post',
  url: '/base/post',
  data: searchParams
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})
/**
 * 测试 responseType
 */
axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then(res => console.log(res))