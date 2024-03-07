//Import the installed packages
const router=require('./src/route/api')
const express= require('express');
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');

const app= new express();

//Cross origin
app.use(cors());

//Secuirty Implementation
app.use(helmet())
app.use(hpp())
app.use(express.json({limit:'20mb'}))
app.use(express.urlencoded({extended:true}))
const limiter= rateLimit({windowMs:15*60*1000, max:3000});
app.use(limiter);


//mongo DB connection
const URL= 'mongodb://localhost:27017/taskApi';
const OPTION = {user:'',pass:'',autoIndex:true};
mongoose.connect(URL,OPTION).then((res)=>{
    console.log('connected....')
}).catch((err)=>{
    console.log(err);
})


//Routing end point
app.use('/api',router);

app.use('*',()=>{

})

module.exports=app;

