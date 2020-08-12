const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const dotenv=require('dotenv');
const errorHandler = require('./middlewares/errorHandler');
const path=require("path")

dotenv.config({path:'./config/config.env'})

const app=express();


app.use(bodyParser.json());


if(process.env.NODE_ENV==="production"){

    app.use(express.static('society-frontend/build'));

    app.get('/',(req,res)=>{
        res.sendFile(path.resolve(__dirname+'/society-frontend/build/index.html'));
    });
}

const db=process.env.mongoURI; 

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("mongo db connected"))
    .catch((err)=>console.log(err));


app.use('/api/admin',require('./routes/api/admin/admin'));
app.use('/api/notice',require('./routes/api/member/notice'));
app.use('/api/member',require('./routes/api/member/member'));
app.use('/api/complaint',require('./routes/api/member/complaints'));
app.use(errorHandler);
const port = process.env.PORT || 5000;

app.listen(port,()=>console.log("server running on "+port))