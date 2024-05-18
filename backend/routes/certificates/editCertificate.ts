import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addCertificateFormData";
import removeFile from "../../controllers/certificateImageDeletion";
// /api/experience/edit/:id
const prisma = new PrismaClient();
const editCertificateAppRouter = express.Router();
const editCertificateData = async (req: any, res: any) => {
    console.log("params", req.params);
    console.log("hi ji ")

    try {

        console.log("creating project", req.body);
        console.log("creating project2", req.files);
        console.log("id", req.params.id)
        await prisma.$transaction(async (prisma) => {
            const getExpDetails = await prisma.myCertificate.findUnique({
                where: {
                    id: req.params.id,
                },

            })
            console.log("getExpDetails", getExpDetails)
            if (req.finalFilename) {
                removeFile(getExpDetails?.imageCertificate);
                const updateCerti = await prisma.myCertificate.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        nameOfCertificate: req.body.nameOfCertificate ?? getExpDetails?.nameOfCertificate,
                        certificateLinkToDownload: req.body.certificateLinkToDownload ?? getExpDetails?.certificateLinkToDownload,
                        imageCertificate: req.finalFilename,
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Experience updated Successfully",
                    data: updateCerti
                })
            } else {
                //don't update file
                const updateCerti = await prisma.myCertificate.update({
                    where: {
                        id: req.params.id,
                    },
                    data: {
                        nameOfCertificate: req.body.nameOfCertificate ?? getExpDetails?.nameOfCertificate,
                        certificateLinkToDownload: req.body.certificateLinkToDownload ?? getExpDetails?.certificateLinkToDownload,
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Experience updated Successfully",
                    data: updateCerti
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

}
editCertificateAppRouter.route('/certificate/edit/:id').post(urlEncodedParser, uploadFile.any(), editCertificateData)

module.exports = editCertificateAppRouter 