import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})


axios.request({
  method: 'post',
  url: '/extend/post',
  data: {
    msg: 'hi'
  }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post', { msg: 'post' })

axios.put('/extend/put', { msg: 'put' })

axios.patch('/extend/patch').catch(err => {
  console.log(err.message)
  console.log(err.response)
})