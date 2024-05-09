import express from 'express'
import { PrismaClient } from '@prisma/client'
import { uploadFile, urlEncodedParser } from '../../middlewares/addBioFormData';
import removeFile from '../../controllers/personalImageDeletion';
const BioAppRouter = express.Router();
const logValue = { log: ['query', 'info', 'warn', 'error'], }
const prisma = new PrismaClient()

const postProfileData = async (req: any, res: any) => {

   try {
      const user = await prisma.bio.findFirst()
      // title String
      // bio   String
      // image String
      if (!user) {
         //USER DOES'NT EXIST
         const payload = {
            ...req.body,
            image: req.files && req?.files[0]?.fieldname && req?.files[0]?.originalname && req.finalFilename ?
               req.finalFilename : ""
         }
         const newUser = await prisma.bio.create({
            data: payload
         })
         res.status(200).json({
            meta: 1,
            status: "Sucess",
            message: "User Created Successfully",
            data: newUser
         })
      } else {
         let payload = {
            ...req.body,
            image: req.files && req?.files[0]?.fieldname && req?.files[0]?.originalname && req.finalFilename ?
               req.finalFilename : ""
         }
         console.log("users are1", payload)
         console.log("req1", req?.files)
         if (req?.files &&
            req.files[0] &&
            req.files[0]?.originalname &&
            (req?.files[0].originalname != user.image.split('_')[3])) {
            // console.log("file changed")
            removeFile(user.image);
         } else {
            //duplicate added 
            //delete that also 
            // removeFile(req.filename);
            //previouse file was there and remove insertion
            //same but not empty name 
            if (req?.files &&
               req.files[0] &&
               req.files[0]?.originalname &&
               (req.files[0].originalname != '')) {
               removeFile(req.finalFilename);
            }
            payload = {
               ...req.body
            }
            delete payload["image"];
         }
         //now do another updation of data
         console.log("Bio is", payload)
         const updatedBio = await prisma.bio.update({
            where: {
               id: user.id
            },
            data: payload
         })
         console.log("Bio Updated Successfully", updatedBio)
         res.status(200).json({
            meta: 1,
            status: "Sucess",
            message: "Bio Updated Successfully",
            data: updatedBio
         })


      }
   } catch (err: any) {
      res.status(200).json({
         meta: 0,
         status: "failure",
         message: err.message
      })
   } finally {
      await prisma.$disconnect()
   }

}

BioAppRouter.route('/bio/update').post(urlEncodedParser, uploadFile.any(), postProfileData)


const getBioData = async (req: any, res: any) => {
   try {
      const user = await prisma.bio.findFirst()
      res.status(200).json({
         meta: 1,
         status: "Success",
         message: "Bio fetched Successfully",
         data: user
      })
   } catch (err: any) {
      res.status(200).json({
         meta: 0,
         status: "failure",
         message: err.message
      })
   }
}
BioAppRouter.route('/bio').get(getBioData)
module.exports = BioAppRouter