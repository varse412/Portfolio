import express from 'express'
const appRouter = express.Router();
const getProfileData = (req: any, res: any) => {
   // res.send("Hello got data")
   res.status(400).json({
      name: "Varun",
      age: 30
   })
}
appRouter.route('/profile').get(getProfileData)
module.exports = appRouter
