import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addProjectFormData";
// urlEncodedParser, uploadFile.any(),
const prisma = new PrismaClient();
const addExpAppRouter = express.Router();
const addExpData = async (req: any, res: any) => {
    // try {
    //     //create a new user with data 
    //     //add file image to project image folder
    //     console.log("creating project", req.body);
    //     console.log("creating project2", req.files);
    //     let SoftwareUsedArray = req.body.softwareUsed.map((name: any) => ({ name }));
    //     console.log("result===>", SoftwareUsedArray);
    //     const createProject = await prisma.project.create({
    //         data: {
    //             projectName: req.body.projectName,
    //             developmentType: req.body.developmentType,
    //             projectDescription: req.body.projectDescription,
    //             softwareUsed: {
    //                 create: SoftwareUsedArray
    //             },
    //             githubURL: req.body.githubURL,
    //             liveURL: req.body.liveURL,
    //             demoVideo: req.body.demoVideo,
    //             picture: req.finalFilename
    //         }
    //     })
    //     await prisma.$disconnect()
    //     res.status(200).json({
    //         meta: 1,
    //         status: "Success",
    //         message: "Project created Successfully",
    //         data: createProject
    //     })
    // } catch (err: any) {
    //     await prisma.$disconnect()
    //     res.status(200).json({
    //         meta: 0,
    //         status: "failure",
    //         message: err.message
    //     })
    // }
    console.log("creating project", req.body);
    console.log("creating project2", req.files);
    res.status(200).json({
        meta: 0,
        status: "failure",
        message: "err.message"
    })

}
addExpAppRouter.route('/experience/add').post(urlEncodedParser, uploadFile.any(), addExpData)

module.exports = addExpAppRouter 