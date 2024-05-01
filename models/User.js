//const mongoose = require("mongoose")
const mongoose = require("mongoose")

const userschema = new mongoose.Schema({ //object
    
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique:true
      },
      username:{
        type:String,
        required:true,
        unique:true
      },
      region: {
      type: String,
      required: true
    },
    
  });

const user = mongoose.model('user', userschema); // (collectionname =>(collectionnames) , schema,"name ") - it will take the name instead of collectionname

module.exports = user;