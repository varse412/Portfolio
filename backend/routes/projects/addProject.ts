import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addProjectFormData";
const prisma = new PrismaClient();
const addProjectAppRouter = express.Router();
const addProjectData = async (req: any, res: any) => {
    console.log("creating project req", req.body);
    console.log("creating project2 rem", req.files);
    try {

        let SoftwareUsedArray = req.body.softwareUsed.map((name: any) => ({ name }));
        // console.log("result===>", SoftwareUsedArray);
        const createProject = await prisma.project.create({
            data: {
                projectName: req.body.projectName,
                developmentType: req.body.developmentType,
                projectDescription: req.body.projectDescription,
                softwareUsed: {
                    create: SoftwareUsedArray
                },
                githubURL: req.body.githubURL,
                liveURL: req.body.liveURL,
                demoVideo: req.body.demoVideo,
                picture: req.finalFilename
            }
        })
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Project created Successfully",
            data: createProject
        })
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
addProjectAppRouter.route('/projects/add').post(urlEncodedParser, uploadFile.any(), addProjectData)

module.exports = addProjectAppRouter 