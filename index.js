import express from 'express';
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
const morgan =require('morgan');
import cookieParser from 'cookie-parser'; //need this for the csurf

import csrf from 'csurf';

require('dotenv').config(); //help us load env variables

const csrfProtection=csrf({cookie:true});

//create express app
const app = express();

//db connection
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected")).catch((err)=>console.log("DB connected ERR=>",err))


//apply middlewares - code that run before we send back response to client
app.use(cors());
app.use(cookieParser());

app.use(express.json({limit:"5mb"}));

app.use(morgan("dev"));

// app.use((req,res,next)=>{
//     console.log("this is a middleware which runs");
//     next();
// });

//route . express is like a req response handler
// app.get("/",(req,res)=>{

//     res.send("You hit server endpoint");


// });

//access file system to load each file to apply as middleware
fs.readdirSync("./routes").map((r)=>app.use('/api',require(`./routes/${r}`)))


app.use(csrfProtection);
app.get('/api/csrf-token',(req,res)=>{
    console.log("csrf-token ==============================>");
    console.log(req.csrfToken());
    res.json({csrfToken:req.csrfToken()});
})

//port on which the node js server is un
const port=process.env.PORT||8000;

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
