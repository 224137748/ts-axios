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