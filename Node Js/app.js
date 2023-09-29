const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan')
require('./connection')
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt());
// app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


const categoryRouter = require('./router/category')
app.use('/api/category', categoryRouter);

const productRouter = require('./router/product')
app.use('/api/product', productRouter);

const userRouter = require('./router/user')
app.use('/api/user', userRouter);


app.get('/',(req,res)=>{
    res.send("Hello World")
})
app.listen(5000,(req,res)=>{
    console.log("Server is running ")
})