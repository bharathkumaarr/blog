const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()


const connectDB = require('./config/configDb')
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/posts')
const commentRoutes = require('./routes/comments')

const app= express();

app.use(cors())
app.use(express.json())


connectDB()


app.use('./api/auth', authRoutes)
app.use('./api/posts', postRoutes)
app.use('./api/comments', commentRoutes)

app.listen(3000, ()=>{
    console.log('server running at port 3000')
})



