import express from 'express'
import router from 'express'
const appRouter=express.Router();
appRouter.get("prof",(req,res)=>{
   res.send("from router")
})

export appRouter;
// module.exports=appRouter