import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getExperiencesAppRouter = express.Router();
//get all projects
const getExperiences = async (req: express.Request, res: express.Response) => {
    try {
        const exps = await prisma.companyExperience.findMany();
        await prisma.$disconnect()
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "company Experience fetched Successfully",
            data: exps
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

getExperiencesAppRouter.route('/experience/all').get(getExperiences)

module.exports = getExperiencesAppRouter;
