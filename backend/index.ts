import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

const appRouter = require("./routes/profile/profile")

dotenv.config()
const app = express()
const PORT = process.env.port || 3000
app.use(cors())
app.use(express.json());

// limit: 1000000,
// parameterLimit: 2,//no of params

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