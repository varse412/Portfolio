import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getCertificatesAppRouter = express.Router();
//get all projects
const getCertificates = async (req: express.Request, res: express.Response) => {
    try {
        const certi = await prisma.myCertificate.findMany();
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Certificates fetched Successfully",
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

getCertificatesAppRouter.route('/certificates/all').get(getCertificates)

module.exports = getCertificatesAppRouter;
