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
        cb(null, path.join(__dirname, '..', 'public', 'projectsImage'))
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
// var multer = require('multer')

// var storage = multer.diskStorage({
//     destination: function (request: any, file: any, callback: any) {
//         const filePath = path.join(__dirname, '..', 'public', 'projectsImage')
//         callback(null, filePath);
//     },
//     filename: function (request: any, file: any, callback: any) {
//         console.log(file);
//         request.finalFilename = file_name_generator(file.fieldname, file.originalname);
//         callback(null, request.finalFilename)
//     }
// });

// export var uploadFile = multer({
//     storage: storage, limits: {
//         fileSize: Infinity
//     }
// });
