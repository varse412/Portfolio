//delete from project db
//delelete from projectStack
//remove file from projectsImage
import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const deleteProjectsAppRouter = express.Router();
//get all projects
const deleteProject = async (req: express.Request, res: express.Response) => {
    try {
        const projects = await prisma.project.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Projects deleted Successfully",
            data: projects
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

deleteProjectsAppRouter.route('/projects/delete/:id').get(deleteProject)

module.exports = deleteProjectsAppRouter;
