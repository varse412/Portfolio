import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addExperienceFormData";
import removeFile from "../../controllers/workExpImageDeletion"
// /api/experience/edit/:id
const prisma = new PrismaClient();
const editExperienceAppRouter = express.Router();
const editExperienceData = async (req: any, res: any) => {
    console.log("params", req.params);
    console.log("hi ji ")

    try {

        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        console.log("id", req.params.id)
        await prisma.$transaction(async (prisma) => {
            const getExpDetails = await prisma.companyExperience.findUnique({
                where: {
                    id: req.params.id,
                },

            })
            console.log("getExpDetails", getExpDetails)
            if (req.finalFilename) {
                // file is added 
                //delete previous file
                removeFile(getExpDetails?.companyImage);
                const updateExp = await prisma.companyExperience.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        companyName: req.body.companyName ?? getExpDetails?.companyName,
                        description: req.body.description ?? getExpDetails?.description,
                        position: req.body.position ?? getExpDetails?.position,
                        startDate: req.body.startDate ?? getExpDetails?.startDate,
                        endDate: req.body.endDate ?? getExpDetails?.endDate,
                        companyImage: req.finalFilename
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Experience updated Successfully",
                    data: updateExp
                })
            } else {
                //don't update file
                const updateExp = await prisma.companyExperience.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        companyName: req.body.companyName ?? getExpDetails?.companyName,
                        description: req.body.description ?? getExpDetails?.description,
                        position: req.body.position ?? getExpDetails?.position,
                        startDate: req.body.startDate ?? getExpDetails?.startDate,
                        endDate: req.body.endDate ?? getExpDetails?.endDate,

                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Experience updated Successfully",
                    data: updateExp
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
editExperienceAppRouter.route('/experience/edit/:id').post(urlEncodedParser, uploadFile.any(), editExperienceData)

module.exports = editExperienceAppRouter 