const express = require('express')
const mongoose = require('mongoose')
const CONFIG = require('./config/config')
const postRouter = require('./routers/postRoutes')

// 帐号密码
// docker 分配的 ip 地址
const url = `mongodb://${CONFIG.MONG_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_IP}:${CONFIG.MONGO_PORT}/?authSource=admin`
mongoose.connect(url)
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => console.log('e', e));

const app = express()

const port = process.env.PORT || 3000
  
app.use(express.json());
// app.get('/', (req, res) => {
//     res.end('<h1>Hello Docker</h1>')
// })

app.use("/api/v1/posts", postRouter)

app.listen(port, () => console.log('listening on port ' + port))