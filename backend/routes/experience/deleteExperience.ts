//delete from project db
//delelete from projectStack
//remove file from projectsImage
import express from "express";
import { PrismaClient } from "@prisma/client"
import removeFile from "../../controllers/workExpImageDeletion";
const prisma = new PrismaClient();

const deleteExperienceAppRouter = express.Router();
//get all projects
const deleteExp = async (req: express.Request, res: express.Response) => {
    try {
        const exp = await prisma.companyExperience.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        removeFile(exp?.companyImage)
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "experience deleted Successfully",
            data: exp
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

deleteExperienceAppRouter.route('/experience/delete/:id').get(deleteExp)

module.exports = deleteExperienceAppRouter;
