import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const getProjectsAppRouter = express.Router();
//get all projects
const getProjects = async (req: express.Request, res: express.Response) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                softwareUsed: true
            }
        });
        await prisma.$disconnect()
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Projects fetched Successfully",
            data: projects
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

getProjectsAppRouter.route('/projects/all').get(getProjects)

module.exports = getProjectsAppRouter;
