import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/editProjectFormData";
// /api/projects/edit/:id
const prisma = new PrismaClient();
const editProjectAppRouter = express.Router();
const editProjectData = async (req: any, res: any) => {
    console.log("params", req.params);
    console.log("hi ji ")

    try {

        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        let SoftwareUsedArray = req.body.softwareUsed.map((name: any) => ({ name }));
        console.log("result===>", SoftwareUsedArray);
        console.log("id", req.params.id)
        // const createProject = await prisma.project.create({
        //     data: {
        //         projectName: req.body.projectName,
        //         developmentType: req.body.developmentType,
        //         projectDescription: req.body.projectDescription,
        //         softwareUsed: {
        //             create: SoftwareUsedArray
        //         },
        //         githubURL: req.body.githubURL,
        //         liveURL: req.body.liveURL,
        //         demoVideo: req.body.demoVideo,
        //         picture: req.finalFilename
        //     }
        // })
        // await prisma.$disconnect()
        // res.status(200).json({
        //     meta: 1,
        //     status: "Success",
        //     message: "Project created Successfully",
        //     data: createProject
        // })
    } catch (err: any) {
        // await prisma.$disconnect()
        // res.status(200).json({
        //     meta: 0,
        //     status: "failure",
        //     message: err.message
        // })
    }
    res.send({ data: "hi" })

}
editProjectAppRouter.route('/projects/edit/:id').post(urlEncodedParser, uploadFile.any(), editProjectData)

module.exports = editProjectAppRouter 