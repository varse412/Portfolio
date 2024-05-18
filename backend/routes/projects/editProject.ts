import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
// import { uploadFile, urlEncodedParser } from "../../middlewares/editProjectFormData";
import { uploadFile, urlEncodedParser } from "../../middlewares/addProjectFormData";
import removeFile from "../../controllers/projectImageDeletion";
// /api/projects/edit/:id
const prisma = new PrismaClient();
const editProjectAppRouter = express.Router();
const editProjectData = async (req: any, res: any) => {
    console.log("params", req.params);
    console.log("hi ji ")

    try {

        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        console.log("id", req.params.id)
        await prisma.$transaction(async (prisma) => {
            const getProjectDetails = await prisma.project.findUnique({
                where: {
                    id: req.params.id,
                },
                include: {
                    softwareUsed: true
                }
            })
            console.log("getProjectDetails", getProjectDetails)
            if (req.body.softwareUsed) {
                // console.log("result===>", req.body.softwareUsed);
                // if (Array.isArray(req.body.softwareUsed)) {
                //     console.log("result===>", req.body.softwareUsed);
                // }
                let SoftwareUsedArray = Array.isArray(req.body.softwareUsed) ? req.body.softwareUsed.map((name: any) => ({ name })) : [{ name: req.body.softwareUsed }];
                // console.log("result===>", req.body.SoftwareUsed);
                //delete the previous software used
                //and add new one 
                await prisma.projectStack.deleteMany({
                    where: { projectId: req.params.id },
                });
                //now check empty filename
                if (req.finalFilename) {
                    // file is added 
                    //delete previous file
                    console.log("entered 1 case")
                    removeFile(getProjectDetails?.picture);
                    const updateProject = await prisma.project.update({
                        where: {
                            id: req.params.id,
                        },
                        data: {
                            projectName: req.body.projectName ?? getProjectDetails?.projectName,
                            developmentType: req.body.developmentType ?? getProjectDetails?.developmentType,
                            projectDescription: req.body.projectDescription ?? getProjectDetails?.projectDescription,
                            softwareUsed: {
                                create: SoftwareUsedArray ?? getProjectDetails?.softwareUsed,
                            },
                            githubURL: req.body.githubURL ?? getProjectDetails?.githubURL,
                            liveURL: req.body.liveURL ?? getProjectDetails?.liveURL,
                            demoVideo: req.body.demoVideo ?? getProjectDetails?.demoVideo,
                            picture: req.finalFilename
                        }
                    })
                    console.log("val is", updateProject)
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Project updated Successfully",
                        data: updateProject
                    })
                } else {
                    //don't update file
                    const updateProject = await prisma.project.update({
                        where: {
                            id: req.params.id,
                        },
                        data: {
                            projectName: req.body.projectName ?? getProjectDetails?.projectName,
                            developmentType: req.body.developmentType ?? getProjectDetails?.developmentType,
                            projectDescription: req.body.projectDescription ?? getProjectDetails?.projectDescription,
                            softwareUsed: {
                                create: SoftwareUsedArray ?? getProjectDetails?.softwareUsed
                            },
                            githubURL: req.body.githubURL ?? getProjectDetails?.githubURL,
                            liveURL: req.body.liveURL ?? getProjectDetails?.liveURL,
                            demoVideo: req.body.demoVideo ?? getProjectDetails?.demoVideo,
                        }
                    })
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Project updated Successfully",
                        data: updateProject
                    })
                }
            } else {
                if (req.finalFilename) {
                    removeFile(getProjectDetails?.picture);
                    const updateProject = await prisma.project.update({
                        where: {
                            id: req.params.id,
                        },
                        data: {
                            projectName: req.body.projectName ?? getProjectDetails?.projectName,
                            developmentType: req.body.developmentType ?? getProjectDetails?.developmentType,
                            projectDescription: req.body.projectDescription ?? getProjectDetails?.projectDescription,
                            githubURL: req.body.githubURL ?? getProjectDetails?.githubURL,
                            liveURL: req.body.liveURL ?? getProjectDetails?.liveURL,
                            demoVideo: req.body.demoVideo ?? getProjectDetails?.demoVideo,
                            picture: req.finalFilename
                        }
                    })
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Project updated Successfully",
                        data: updateProject
                    })
                } else {
                    const updateProject = await prisma.project.update({
                        where: {
                            id: req.params.id,
                        },
                        data: {
                            projectName: req.body.projectName ?? getProjectDetails?.projectName,
                            developmentType: req.body.developmentType ?? getProjectDetails?.developmentType,
                            projectDescription: req.body.projectDescription ?? getProjectDetails?.projectDescription,
                            githubURL: req.body.githubURL ?? getProjectDetails?.githubURL,
                            liveURL: req.body.liveURL ?? getProjectDetails?.liveURL,
                            demoVideo: req.body.demoVideo ?? getProjectDetails?.demoVideo,
                        }
                    })
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Project updated Successfully",
                        data: updateProject
                    })
                }
            }
        })

    } catch (err: any) {
        console.log(err)
        res.status(200).json({
            meta: 0,
            status: "failure",
            message: err.message
        })
    } finally {
        await prisma.$disconnect()
    }
    // res.send({ data: "hi" })

}
editProjectAppRouter.route('/projects/edit/:id').post(urlEncodedParser, uploadFile.any(), editProjectData)

module.exports = editProjectAppRouter 