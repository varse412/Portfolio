import express from "express";
import { PrismaClient, Prisma } from "@prisma/client"
import { uploadFile, urlEncodedParser } from "../../middlewares/addCertificateFormData";
const prisma = new PrismaClient();
const addOrEditSkillAppRouter = express.Router();
const addOrEditSkillData = async (req: any, res: any) => {
    try {
        await prisma.$transaction(async (prisma) => {
            if (req.params.type === "add") {
                const skill = await prisma.skills.findFirst({
                    where: {
                        stackName: req.body.stackName
                    }
                })
                if (skill) {
                    const newSkill = await prisma.skills.update({
                        where: {
                            id: skill?.id,
                        },
                        data: {
                            stackItems: req.body.stackItems
                        }
                    })
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Skill already exists"
                    })
                } else {
                    const newSkill = await prisma.skills.create({
                        data: {
                            stackName: req.body.stackName,
                            stackItems: req.body.stackItems
                        }
                    })
                    res.status(200).json({
                        meta: 1,
                        status: "Success",
                        message: "Skill created Successfully",
                        data: newSkill
                    })
                }
            } else {
                //edit path has id 
                const newSkill = await prisma.skills.update({
                    where: {
                        id: req.params.type,
                    },
                    data: {
                        stackName: req.body.stackName,
                        stackItems: req.body.stackItems
                    }
                })
                res.status(200).json({
                    meta: 1,
                    status: "Success",
                    message: "Skill updated Successfully",
                    data: newSkill
                })
            }

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
addOrEditSkillAppRouter.route('/skills/:type').post(urlEncodedParser, addOrEditSkillData)

module.exports = addOrEditSkillAppRouter 