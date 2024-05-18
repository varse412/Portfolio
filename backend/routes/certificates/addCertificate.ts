import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addCertificateFormData";
const prisma = new PrismaClient();
const addCertAppRouter = express.Router();
const addCertificateData = async (req: any, res: any) => {
    console.log("creating project req", req.body);
    console.log("creating project2 rem", req.files);
    try {
        const certi = await prisma.myCertificate.create({
            data: {
                nameOfCertificate: req.body.nameOfCertificate,
                certificateLinkToDownload: req.body.certificateLinkToDownload,
                imageCertificate: req.finalFilename,
            }
        })
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Project created Successfully",
            data: certi

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
addCertAppRouter.route('/certificates/add').post(urlEncodedParser, uploadFile.any(), addCertificateData)

module.exports = addCertAppRouter 