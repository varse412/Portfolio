import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/editEducationFormData";
import removeFile from "../../controllers/educationImageDeletion"
// /api/experience/edit/:id
const prisma = new PrismaClient();
const editEducationAppRouter = express.Router();
const editEducationData = async (req: any, res: any) => {
    console.log("params", req.params);
    console.log("hi ji ")

    try {

        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        console.log("id", req.params.id)
        await prisma.$transaction(async (prisma) => {
            const getExpDetails = await prisma.education.findUnique({
                where: {
                    id: req.params.id,
                },

            })
            console.log("getExpDetails", getExpDetails)
            if (req.finalFilename) {
                // file is added 
                //delete previous file
                removeFile(getExpDetails?.schoolImage);
                const updateProject = await prisma.education.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        schoolName: req.body.companyName ?? getExpDetails?.schoolName,
                        description: req.body.description ?? getExpDetails?.description,
                        degree: req.body.position ?? getExpDetails?.degree,
                        startDate: req.body.startDate ?? getExpDetails?.startDate,
                        endDate: req.body.endDate ?? getExpDetails?.endDate,
                        schoolImage: req.finalFilename
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Education updated Successfully",
                    data: updateProject
                })
            } else {
                //don't update file
                const updateProject = await prisma.education.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        schoolName: req.body.companyName ?? getExpDetails?.schoolName,
                        description: req.body.description ?? getExpDetails?.description,
                        degree: req.body.position ?? getExpDetails?.degree,
                        startDate: req.body.startDate ?? getExpDetails?.startDate,
                        endDate: req.body.endDate ?? getExpDetails?.endDate,
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Education updated Successfully",
                    data: updateProject
                })
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
editEducationAppRouter.route('/education/edit/:id').post(urlEncodedParser, uploadFile.any(), editEducationData)

module.exports = editEducationAppRouter 