import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
export const urlEncodedParser = bodyParser.urlencoded({
    extended: true
});
// extended=true for nested inputs
// extended =false for non nested inputs
// limit: 1000000, in bytes default 100kb
// parameterLimit: 2,//no of params

// __dirname + "/uploads"
// path.join(__dirname, '..', 'test', 'karma.conf.js')
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '..', 'public', 'images'))
//     },
//     filename: (req, file, cb) => {
//         const filename = `file_${crypto.randomUUID().toString() + Date.now() + file.originalname}`
//         cb(null, filename)
//     }
// })
// D:\Portfolio\backend\public\files
// D:\Portfolio\backend\public\images\file_9e97a682-535d-4f30-ba01-1f5c6877b82017135359948932019UEC2599_Cognitive Psychology.jpg


export const file_name_generator = (fieldname: string, originalname: string) => {
    return `${fieldname + "_" + crypto.randomUUID().toString() + "_" + Date.now() + "_" + originalname}`
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'images'))
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


// export const enum dashboardScreenName {
//     "skill" = "skills",
//     "workExp" = "workExperience",
//     "edu" = "education",
//     "certi" = "certifications",
//     "prof" = "myProfile",
//     "proj" = "projects",
//     "bio" = "bio"
// }
// const getProfileLoader = (screenName: any) => {
//     switch (screenName) {
//         case dashboardScreenName.bio:
//             return onBioLoad;
//         case dashboardScreenName.prof:
//             return onUserProfileLoad;
//         case dashboardScreenName.workExp:
//             return onWorkExperienceLoad;
//         case dashboardScreenName.edu:
//             return onEducationLoad;
//         case dashboardScreenName.proj:
//             return onProjectsLoad;
//         case dashboardScreenName.certi:
//             return onCertificatesLoad;
//         case dashboardScreenName.skill:
//             return onSkillsetLoad;
//         default:
//             throw new Error("Invalid profile");
//     }
// };