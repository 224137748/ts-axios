const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

// 监听文件变化
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
)

// 热更新
app.use(webpackHotMiddleware(compiler))

// 设置静态资源中间件
app.use(express.static(__dirname))

// 设置 bodyparse 中间件
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/simple/get', function (req, res) {
  res.json({
    msg: 'hello world'
  })
})


router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  let msg = []
  req.on('data', chunk => {
    if (chunk) {
      msg.push(chunk)
    }
  })

  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

//增加接口请求错误测试接口
app.get('/error/get', (req, res) => {
  if (Math.random() > .5) {
    res.json({
      msg: 'Hello workd'
    })
  } else {
    res.status(500)
    res.end()
  }
})

app.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      msg: 'hello world2'
    })
  }, 3000);
})

// 增加扩展接口方法测试接口
router.get('/extend/get', (req, res) => {
  res.json({
    msg: 'hello world'
  })
})

router.options('/extend/options', (req, res) => {
  res.end()
})

router.delete('/extend/delete', (req, res) => {
  res.end()
})

router.head('/extend/head', (req, res) => {
  res.end()
})

router.post('/extend/post', (req, res) => {
  res.json(req.body)
})

router.put('/extend/put', (req, res) => {
  res.json(req.body)
})

router.patch('/extend/patch', (req, res) => {
  res.json(req.body)
})

app.use(router)

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl + C to stop!`)
})
