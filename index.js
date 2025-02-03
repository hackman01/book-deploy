const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000

const bookRouter = require('./src/routes/book.route')
const requestRouter = require('./src/routes/request.route')
const authRouter = require('./src/routes/auth.route')
const userRouter = require('./src/routes/user.route');

const connectDB = require('./src/config/database');


app.use(cors());

connectDB();


app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/dist')));


app.use('/api/book',bookRouter);
app.use('/api/request',requestRouter);
app.use('/api/auth',authRouter);
app.use('/api/user/',userRouter);

app.get('/health',(req,res)=>{
    res.send("hello world");
})

app.get('/*',(req,res)=>{
    res.sendFile(__dirname + "/client/dist/index.html")
})


app.listen(8000,()=>{
    console.log("Server started at 8000")
})