import fs from 'fs';

const removeFile = (filename: string = "") => {
    const fileName = filename;
    const directoryPath = __basedir + "/public/schoolImages/";
    fs.unlink(directoryPath + fileName, (err) => {
        if (err) throw err;
        console.log("Successfully deleted!");
    });

};
export default removeFile;