// import bodyParser from "body-parser";
// import multer from "multer"
// import path from "path"
// export const urlEncodedParser = bodyParser.urlencoded({
//     extended: true
// });
// export const file_name_generator = (fieldname: string, originalname: string) => {
//     return `${fieldname + "_" + crypto.randomUUID().toString() + "_" + Date.now() + "_" + originalname}`
// }
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log("ff", file, file.fieldname, req)
//         cb(null, path.join(__dirname, '..', 'public', 'companyImages'))
//     },
//     filename: (req, file, cb) => {
//         console.log("ff", file, file.fieldname, req)
//         const filename = `${file.fieldname + "_" + crypto.randomUUID().toString() + "_" + Date.now() + "_" + file.originalname}`
//         req.finalFilename = filename;
//         cb(null, filename)
//     }
// })
// export const uploadFile = multer({
//     storage: storage,
// })
import bodyParser from "body-parser";
import multer from "multer"
import path from "path"
export const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});
export const file_name_generator = (fieldname: string, originalname: string) => {
    return `${fieldname + "_" + crypto.randomUUID().toString() + "_" + Date.now() + "_" + originalname}`
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'companyImages'))
    },
    filename: (req, file, cb) => {
        const filename = `${file.fieldname + "_" + crypto.randomUUID().toString() + "_" + Date.now() + "_" + file.originalname}`
        req.finalFilename = filename;
        cb(null, filename)
    }
})
export const uploadFile = multer({
    storage: storage,
    limits: {
        // Set no limits on file size
        fileSize: Infinity
    }
})