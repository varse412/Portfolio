//delete from project db
//delelete from projectStack
//remove file from projectsImage
import express from "express";
import { PrismaClient } from "@prisma/client"
import removeFile from "../../controllers/educationImageDeletion";
const prisma = new PrismaClient();

const deleteEducationAppRouter = express.Router();
//get all projects
const deleteEdu = async (req: express.Request, res: express.Response) => {
    try {
        const edu = await prisma.education.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        removeFile(edu?.schoolImage)
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "Education experience deleted Successfully",
            data: edu
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

deleteEducationAppRouter.route('/education/delete/:id').get(deleteEdu)

module.exports = deleteEducationAppRouter;
