import express from "express"
import dotenv from "dotenv"
const appRouter = require("./routes/profile/profile")

dotenv.config()
const app = express()
const PORT = process.env.port || 3000
app.use("/api", appRouter)
app.get("/", (req, res) => {
    res.send("hello ji")
})

app.listen(PORT, () => {
    console.log("server listening on port ", 3000)
})