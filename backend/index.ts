import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"

const appRouter = require("./routes/profile/profile")

dotenv.config()
const app = express()
const PORT = process.env.port || 3000
app.use(cors())
app.use(express.json());

// __dirname, "public", "images"
const StaticFilePAth = path.join("public");
console.log("/api", StaticFilePAth)
app.use("/api", express.static(StaticFilePAth))
// __dirname,
// limit: 1000000,
// parameterLimit: 2,//no of params
// D:\Portfolio\backend\public\images\file_9e97a682-535d-4f30-ba01-1f5c6877b82017135359948932019UEC2599_Cognitive Psychology.jpg
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 2
}))
app.use("/api", appRouter)
app.get("/", (req, res) => {
    res.send("hello ji")
})

app.listen(PORT, () => {
    console.log("server listening on port ", 3000)
})