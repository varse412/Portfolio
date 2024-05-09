import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
declare global {
    var __basedir: string;
}
global.__basedir = __dirname;

//Profile section
const appRouter = require("./routes/profile/profile")
const BioAppRouter = require("./routes/bio/bio")

//Projects section
const addProjectAppRouter = require("./routes/projects/addProject");
const getProjectsAppRouter = require("./routes/projects/getProjects");
const editProjectAppRouter = require("./routes/projects/editProject");
const deleteProjectsAppRouter = require("./routes/projects/deleteProject");

//Experience
const addExperienceAppRouter = require("./routes/projects/addExperience");
const getExperiencesAppRouter = require("./routes/projects/geExperiences");
const editExperienceAppRouter = require("./routes/projects/editExperience");
const deleteExperienceAppRouter = require("./routes/projects/deleteExperience");

//Education
const addEducationAppRouter = require("./routes/education/addEducation");
const getEducationsAppRouter = require("./routes/education/getEducations");
const editEducationAppRouter = require("./routes/education/editEducation");
const deleteEducationAppRouter = require("./routes/education/deleteEducation");

dotenv.config()
const app = express()
const PORT = process.env.port || 3000
app.use(cors())
app.use(express.json());

// __dirname, "public", "images"
const StaticFilePAth = path.join("public");
console.log("/api", StaticFilePAth)

//static file host on public folder at /api endpoint
app.use("/api", express.static(StaticFilePAth))

app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 2
}))

//for creating and updating myprofile
app.use("/api", appRouter)

//for creating and updating bio
app.use("/api", BioAppRouter)




//for adding projects
app.use("/api", addProjectAppRouter)
//for reading all projects
app.use("/api", getProjectsAppRouter)
//edit project 
app.use("/api", editProjectAppRouter)
//delete project
app.use("/api", deleteProjectsAppRouter);


//for exprience 
app.use("/api", addExperienceAppRouter)
//for read exp
app.use("/api", getExperiencesAppRouter)
//for edit exp
app.use("/api", editExperienceAppRouter)
//for delete exp
app.use("/api", deleteExperienceAppRouter)

//for education
app.use("/api", addEducationAppRouter)
//for read
app.use("/api", getEducationsAppRouter)
//for edit 
app.use("/api", editEducationAppRouter)
//for delete 
app.use("/api", deleteEducationAppRouter)










app.get("/", (req, res) => {
    res.send("hello ji")
})

app.listen(PORT, () => {
    console.log("server listening on port ", 3000)
})


// __dirname,
// limit: 1000000,
// parameterLimit: 2,//no of params
// D:\Portfolio\backend\public\images\file_9e97a682-535d-4f30-ba01-1f5c6877b82017135359948932019UEC2599_Cognitive Psychology.jpg