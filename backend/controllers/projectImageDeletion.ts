import fs from 'fs';

const removeFile = (filename: string = "") => {
    const fileName = filename;
    const directoryPath = __basedir + "/public/projectsImage/";
    const finalpath = directoryPath + fileName
    if (fs.existsSync(finalpath)) {
        console.log(`The file or directory at '${finalpath}' exists.`);
        fs.unlink(directoryPath + fileName, (err) => {
            if (err) throw err;
            console.log("Successfully deleted!");
        });
    } else {
        console.log(`The file or directory at '${finalpath}' does not exist.`);
        return;
    }


};
export default removeFile;