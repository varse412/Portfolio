// import express from "express";
// import { PrismaClient } from "@prisma/client"
// // import { uploadFile, urlEncodedParser } from "../../middlewares/addExperienceFormData";
// // import { uploadFile, urlEncodedParser } from "../../middlewares/addExperienceFormData"
// import { uploadFile, urlEncodedParser } from "../../middlewares/addProjectFormData";

// const prisma = new PrismaClient();
// const addExperienceAppRouter = express.Router();
// const addExperienceData = async (req: any, res: any) => {
//     // try {
//     //     //create a new user with data 
//     //     //add file image to project image folder
//     //     console.log("creating project", req.body);
//     //     console.log("creating project2", req.files);
//     //     console.log("obj is", {
//     //         companyName: req.body.companyName,
//     //         description: req.body.description,
//     //         position: req.body.position,
//     //         startDate: req.body.startDate,
//     //         endDate: req.body.endDate,
//     //         companyImage: req.finalFilename
//     //     })
//     //     const exp = await prisma.companyExperience.create({
//     //         data: {
//     //             companyName: req.body.companyName,
//     //             description: req.body.description,
//     //             position: req.body.position,
//     //             startDate: req.body.startDate,
//     //             endDate: req.body.endDate,
//     //             companyImage: req.finalFilename
//     //         }
//     //     })
//     //     res.status(200).json({
//     //         meta: 1,
//     //         status: "Success",
//     //         message: "Experience created Successfully",
//     //         data: exp
//     //     })
//     // } catch (err: any) {

//     //     res.status(200).json({
//     //         meta: 0,
//     //         status: "failure",
//     //         message: err.message
//     //     })
//     // } finally {
//     //     await prisma.$disconnect()
//     // }
//     console.log("creating project", req.body);
//     console.log("creating project2", req.files);
//     res.status(200).json({
//         meta: 0,
//         status: "failure",
//         message: "m"
//     })
// }
// addExperienceAppRouter.route('/experience/add').post(uploadFile.any(), addExperienceData)

// module.exports = addExperienceAppRouter 
import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addProjectFormData";
// urlEncodedParser, uploadFile.any(),
const prisma = new PrismaClient();
const addProjectAppRouter2 = express.Router();
const addProjectData = async (req: any, res: any) => {
    console.log("creating project", req.body);
    console.log("creating project2", req.files);
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

}
addProjectAppRouter2.route('/experience/add1').post(urlEncodedParser, uploadFile.any(), addProjectData)

module.exports = addProjectAppRouter2 