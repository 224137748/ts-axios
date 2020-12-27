import axios from '../../src/index'
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