import express from "express";
import { PrismaClient } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addEducationFormData";
const prisma = new PrismaClient();
const addEducationAppRouter = express.Router();
const addEducationData = async (req: any, res: any) => {
    try {
        //create a new user with data 
        //add file image to project image folder
        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        const edu = await prisma.education.create({
            data: {
                schoolName: req.body.schoolName,
                description: req.body.description,
                degree: req.body.degree,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                schoolImage: req.finalFilename
            }
        })
        await prisma.$disconnect()
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Education created Successfully",
            data: edu
        })
    } catch (err: any) {
        await prisma.$disconnect()
        res.status(200).json({
            meta: 0,
            status: "failure",
            message: err.message
        })
    }

}
addEducationAppRouter.route('/education/add').post(urlEncodedParser, uploadFile.any(), addEducationData)

module.exports = addEducationAppRouter 