import express from "express";
import { PrismaClient } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addExperienceFormData";
const prisma = new PrismaClient();
const addExperienceAppRouter = express.Router();
const addExperienceData = async (req: any, res: any) => {
    try {
        //create a new user with data 
        //add file image to project image folder
        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        const exp = await prisma.companyExperience.create({
            data: {
                companyName: req.body.companyName,
                description: req.body.description,
                position: req.body.position,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                companyImage: req.finalFilename
            }
        })
        await prisma.$disconnect()
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Experience created Successfully",
            data: exp
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
addExperienceAppRouter.route('/experience/add').post(urlEncodedParser, uploadFile.any(), addExperienceData)

module.exports = addExperienceAppRouter 