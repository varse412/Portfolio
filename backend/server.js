 import express from 'express';
 import path from 'path';
 import bodyParser from 'body-parser';
 const app=express();
 const port=process.env.PORT||3000;
//  app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req, res) =>{
    res.send("Hello World!");
})
app.listen(port,()=>{
    console.log("Server is running on port "+port);
});