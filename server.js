const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path : './config.env'})


const connect = mongoose.connect(process.env.CONNECTION).then(el=>{
    console.log("db established")
})

const server = app.listen(5700, ()=>{
    console.log("app is live")
})

