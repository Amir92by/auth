//1.all require
const express =require('express')
require('dotenv').config()
const connectDb =require('./config/connectDb')

//instance
const app =express()

//2.Database connection
connectDb()

//3.global middleware
app.use(express.json())
app.use('/api/user', require('./routes/user'))

//create server
const PORT = process.env.PORT
app.listen(PORT, err=>{
    err?
    console.log(`FAILED TO CONNECT`)
    :
    console.log(`SERVER IS RUNNING ON PORT ${PORT}..`)
})