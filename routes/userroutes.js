//user routes

const usercontroller = require("../controllers/usercontroller")

const express = require("express")
const user = require("../models/User")
const userrouter  = express.Router()

userrouter.post("/insertuser",usercontroller.insertuser)
userrouter.post("/checkuserlogin",usercontroller.checkuserlogin)
userrouter.put("/updateuserprofile",usercontroller.updateuserprofile)
userrouter.get("/userprofile/:email",usercontroller.userprofile) // for the update and local storage
userrouter.post("/submitfeedback",usercontroller.submitfeedback)


module.exports = userrouter