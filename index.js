const express = require('express')
const mongoose = require('mongoose')
const CONFIG = require('./config/config')

// 帐号密码
// docker 分配的 ip 地址
const url = `mongodb://${CONFIG.MONG_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_IP}:${CONFIG.MONGO_PORT}/?authSource=admin`
mongoose.connect(url)
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => console.log('e', e));

const app = express()

const port = process.env.PORT || 3000
  
app.get('/', (req, res) => {
    res.end('<h1>Hello Docker Compose</h1>')
})

app.listen(port, () => console.log('listening on port ' + port))