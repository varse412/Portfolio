import express from 'express'
import path from "path"
import { uploadFile, urlEncodedParser } from '../../middlewares/FormData';
const appRouter = express.Router();
const getProfileData = (req: any, res: any) => {
   // res.send("Hello got data")
   res.status(400).json({
      name: "Varun",
      age: 30
   })
}
const postProfileData = (req: any, res: any) => {
   console.log("req.body.data", req.body);
   console.log(req.files)
   res.json({
      name: "Varun",
      age: 30
   })
}
appRouter.route('/profile').get(getProfileData)
appRouter.route('/profile/update').post(urlEncodedParser, uploadFile.any(), postProfileData)
module.exports = appRouter
