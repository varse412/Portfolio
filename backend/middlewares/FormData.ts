import bodyParser from "body-parser";
import multer from "multer";

export const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});
// extended=true for nested inputs
// extended =false for non nested inputs
// limit: 1000000, in bytes default 100kb
// parameterLimit: 2,//no of params


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/uploads")
    },
    filename: (req, file, cb) => {
        const filename = `file_${crypto.randomUUID().toString() + Date.now() + file.originalname}`
        cb(null, file.originalname)
    }
})
export const uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: 1048576 //1mb
    }
})

//    filename: (req, file, cb) => {
//       cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
//    }
// })
// const upload = multer({
//    storage: storage
// })
// const upload = multer({
//     dest: '/destinationname'
// })