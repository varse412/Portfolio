import express from "express";
import { PrismaClient } from "@prisma/client"
import removeFile from "../../controllers/certificateImageDeletion";
const prisma = new PrismaClient();

const deleteCertificateAppRouter = express.Router();
//get all projects
const deleteCerti = async (req: express.Request, res: express.Response) => {
    try {
        const certi = await prisma.myCertificate.delete(
            {
                where: {
                    id: req.params.id
                }
            }
        );
        removeFile(certi?.imageCertificate)
        res.status(200).json({
            meta: 1,
            status: "Success",
            message: "certificate deleted Successfully",
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

deleteCertificateAppRouter.route('/certificate/delete/:id').get(deleteCerti)

module.exports = deleteCertificateAppRouter;
