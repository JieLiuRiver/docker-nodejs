const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const redis = require('redis')
const CONFIG = require('./config/config')
const postRouter = require('./routers/postRoutes')
const userRouter = require('./routers/userRoutes')

const RedisStore = require('connect-redis')(session)
const redisClient = redis.createClient({
    host: CONFIG.REDIS_URL,
    port: CONFIG.REDIS_PORT
})

const url = `mongodb://${CONFIG.MONG_USER}:${CONFIG.MONGO_PASSWORD}@${CONFIG.MONGO_IP}:${CONFIG.MONGO_PORT}/?authSource=admin`
mongoose.connect(url)
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => console.log('e', e));

const app = express()

const port = process.env.PORT || 3000

app.enable("trust proxy");
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: CONFIG.SESSION_SECRET,
    cookie: { 
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 60000
    }
}))
app.use(express.json());
app.get('/api/v1', (req, res) => {
    res.end('<h1>Hello Docker & Node.js</h1>')
    console.log('hello')
})
 
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

app.listen(port, () => console.log('listening on port ' + port))