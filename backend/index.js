import express from "express"
import dotenv from "dotenv"
dotenv.config()

const PORT=process.env.port||3000

app.get("/",(req,res)=>{
   res.send("hello ji")
})

app.listen(PORT,()=>{
    console.log("server listening on port ",3000)
})