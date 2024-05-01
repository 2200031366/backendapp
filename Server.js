const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")


// const dburl = "mongodb://localhost:27017/sdpproject"

//MongoDB Atlas Connection
const dburl = "mongodb+srv://admin:admin@cluster0.zjecgea.mongodb.net/sdpproject?retryWrites=true&w=majority&appName=Cluster0"
// //const dburl = "mongodb+srv://admin:admin@cluster0.nkmsyiq.mongodb.net/<database>?retryWrites=true&w=majority"

mongoose.connect(dburl).then(() => {
    console.log("Connected to DB Successfully")
}).catch((err) => {
    console.log(err.message)
});


const app = express() 
app.use(cors())
app.use(express.json())  // to parse JSON dataN

const adminrouter = require("./routes/adminroutes")
const userrouter = require("./routes/userroutes")

app.use("",adminrouter)
app.use("",userrouter)

// const port=2023
const port = process.env.PORT || 2023
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})