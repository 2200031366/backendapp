const User = require("../models/User")
const Admin = require("../models/Admin")
const Event = require('../models/Place')


const multer = require('multer')
const path = require('path')
const fs = require('fs')


 const viewusers = async (request, response) => 
 {
    try 
    {
      const users = await User.find();
      if(users.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(users);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deleteusers = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const user = await User.findOne({"email":email})
      if(user!=null)
      {
        await User.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   
  const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './media/'); // Destination folder
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); // File naming convention
      }
    });
    
    const upload = multer({ storage: storage }).single('file');
    

    const createevent = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { location, place, season, description } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newEvent = new Event({
            location,
            place,
            season,
            description,
            file: fileName // Save only the file name
          });
    
          await newEvent.save();
          res.status(200).send('Event Created Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };
    

const viewevents = async (req, res) => 
{
  try 
  {
    const events = await Event.find();
    res.status(200).json(events);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const eventimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream (binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
};








  module.exports = {viewusers,deleteusers,checkadminlogin,changeadminpwd,createevent,viewevents,eventimage}

 




  