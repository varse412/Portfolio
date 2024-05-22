import express from "express";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const deleteSkillAppRouter = express.Router();
//get all projects
const deleteSkill = async (req: express.Request, res: express.Response) => {
    console.log("entered here")
    try {
        const skill = await prisma.skills.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "skill deleted Successfully",
            data: skill
        })
    } catch (err: any) {
        console.log("Err,err", err)
        res.status(200).json({
            meta: 0,
            status: "failure",
            message: err.message
        })
    } finally {
        await prisma.$disconnect()
    }
}

deleteSkillAppRouter.route('/skill/delete/:id').get(deleteSkill)

module.exports = deleteSkillAppRouter;
