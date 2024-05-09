import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getEducationsAppRouter = express.Router();
//get all projects
const getEducations = async (req: express.Request, res: express.Response) => {
    try {
        const edu = await prisma.education.findMany();
        await prisma.$disconnect()
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Educational Experience fetched Successfully",
            data: edu
        })
    } catch (err: any) {
        await prisma.$disconnect()
        res.status(200).json({
            meta: 0,
            status: "failure",
            message: err.message
        })
    }
}

getEducationsAppRouter.route('/education/all').get(getEducations)

module.exports = getEducationsAppRouter;
