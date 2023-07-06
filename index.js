const route=require('./Routes/Routers')
const express=require('express')
const app=express()
 
const cors=require('cors')
app.use(cors({
    origin:'*'
}))

const dotenv = require('dotenv')
dotenv.config();
const PORT=process.env.PORT;

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use("/user",route)

app.listen(PORT,()=>{
    console.log(`${PORT} Server Running Fine `)
})