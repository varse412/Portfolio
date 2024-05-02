import express from 'express'
import path from "path"
import fs from 'fs'
import { unlink } from 'node:fs/promises';
import { PrismaClient, Prisma } from '@prisma/client'
import { file_name_generator, uploadFile, urlEncodedParser } from '../../middlewares/FormData';
import removeFile from '../../controllers/fileDeletion';
const appRouter = express.Router();
const logValue = { log: ['query', 'info', 'warn', 'error'], }
const prisma = new PrismaClient()

const postProfileData = async (req: any, res: any) => {
   // console.log("req.body.data", req.body);
   // console.log(req.files)
   // console.log("rf", req.finalFilenames)

   try {
      const user = await prisma.myProfile.findFirst()
      
      if (!user) {
         const payload = {
            ...req.body,
            resume: req.files && req?.files[0]?.fieldname && req?.files[0]?.originalname && req.finalFilename ?
               req.finalFilename : ""
         }
         // console.log("entered here ")
         // console.log("payload: ", payload, "++++++++++++++++", req.finalFilename);
         //USER DOES'NT EXIST
         const newUser = await prisma.myProfile.create({
            data: payload
         })
         // console.log("newUser", newUser)
         res.status(200).json({
            meta: 1,
            status: "Sucess",
            message: "User Created Successfully",
            data: newUser
         })
      } else {
         let payload = {
            ...req.body,
            resume: req.files && req?.files[0]?.fieldname && req?.files[0]?.originalname && req.finalFilename ?
               req.finalFilename : ""
         }
         console.log("users are1",payload)
         console.log("req1",req?.files)
         if (req?.files&& 
            req.files[0]&&
            req.files[0]?.originalname&&
            (req?.files[0].originalname != user.resume.split('_')[3])) {
            // console.log("file changed")
            removeFile(user.resume);
         }else{
            //duplicate added 
            //delete that also 
            // removeFile(req.filename);
            //previouse file was there and remove insertion
            //same but not empty name 
             if(req?.files&& 
               req.files[0]&&
               req.files[0]?.originalname&&
               (req.files[0].originalname!='')){
              removeFile(req.finalFilename);
             }
              payload={
               ...req.body
              }
              delete payload["resume"];
         }
         //now do another updation of data
         console.log("users are",payload)
         const updatedUser = await prisma.myProfile.update({
            where: {
               id: user.id
            },
            data: payload
         })
         console.log("User Updated Successfully",updatedUser)
         res.status(200).json({
            meta: 1,
            status: "Sucess",
            message: "User Updated Successfully",
            data: updatedUser
         })
         
         
      }
      await prisma.$disconnect()
   } catch (err: any) {
      await prisma.$disconnect()
      res.status(200).json({
         meta: 0,
         status: "failure",
         message: err.message
      })
   }

}

appRouter.route('/profile/update').post(urlEncodedParser, uploadFile.any(), postProfileData)


const getProfileData = async (req: any, res: any) => {
   try{
      const user = await prisma.myProfile.findFirst()
      res.status(200).json({
         meta: 1,
         status: "Success",
         message: "User fetched Successfully",
         data: user
      })
   }catch(err: any){
      res.status(200).json({
         meta: 0,
         status: "failure",
         message: err.message
      })
   }
}
appRouter.route('/profile').get(getProfileData)
module.exports = appRouter

// if user.filename!= file_name_generator(req?.files[0]?.fieldname, req?.files[0].originalname  //then file changed and delete that filenow and update it user.filename
// const payload = {
//    ...req.body,
//    resume: req.files && req?.files[0]?.fieldname && req?.files[0]?.originalname ?
//       file_name_generator(req?.files[0]?.fieldname, req?.files[0].originalname) : ""
// }
// const updateUser = await prisma.myProfile.update({
//    where: {
//       id: user.id,
//    },
//    data: payload,
// })
// res.status(200).json({
//    meta: 1,
//    status: "Sucess",
//    message: "User Updated Successfully",
//    data: updateUser
// })



   //check if data exists in db 
   // if (!exists) {

   // } else {

   // }
   //    name        String
   //    email       String
   //    bio         String
   //    title       String
   //    mobile      String
   //    githubURL   String
   //    linkedinURL String
   //    websiteURL  String
   //    resumeURL   String
   //    resume      String
   //  }
   //  const DataObj=req.body;
   // let FinalObject = (DataObj: object) => {
   //    Dataobj.websiteURL = DataObj.website;
   //    Dataobj.resumeURL = DataObj.resumeLink;
   //    DataObj.linkedinURL=DataObj.linkedin
   //    delete Dataobj.website;
   // };

   //delete that file 
            // const filePath = path.join("public", "images", user.resume);
            // const filePath = path.resolve("public", "images", user.resume)
