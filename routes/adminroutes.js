//admin routes
const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const adminrouter  = express.Router()


adminrouter.get("/viewusers",admincontroller.viewusers)
adminrouter.delete("/deleteusers/:email",admincontroller.deleteusers)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)


adminrouter.post("/createevent",admincontroller.createevent)
adminrouter.get("/viewevents",admincontroller.viewevents)
adminrouter.get("/eventimage/:filename",admincontroller.eventimage)
// adminrouter.delete("/events/:id", admincontroller.deleteEvent);
// adminrouter.get("/submitFeedback",admincontroller.submitFeedback)


module.exports = adminrouter