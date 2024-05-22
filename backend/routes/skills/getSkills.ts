import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getSkillsAppRouter = express.Router();
//get all projects
const getSkills = async (req: express.Request, res: express.Response) => {
    try {
        const skill = await prisma.skills.findMany();
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Skills fetched Successfully",
            data: skill
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

getSkillsAppRouter.route('/skills/all').get(getSkills)

module.exports = getSkillsAppRouter;
