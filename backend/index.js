import express from "express"
import dotenv from "dotenv"
import {appRouter} from "../routes/profile.js"
// require('appRouter') from "./routes/profile"
// const appRouter= require('../backend/routes/profile')
dotenv.config()
const app=express()
const PORT=process.env.port||3000

app.get("/",(req,res)=>{
   res.send("hello ji")
})

app.listen(PORT,()=>{
    console.log("server listening on port ",3000)
})