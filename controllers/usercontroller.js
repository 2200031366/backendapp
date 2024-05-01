const User = require("../models/User") //import statement
const Feedback = require('../models/FeedBack')


const insertuser = async (request, response) => {
    try 
    {
      const input = request.body;
      const users = new User(input);
      users.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const checkuserlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const user = await User.findOne(input)
       response.json(user)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };


  const updateuserprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const user = await User.findOne({ email });
      if (!user) 
      {
        response.status(200).send('User not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          user[key] = input[key];
        }
      }
      await user.save();
      response.status(200).send('User Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };


  const userprofile = async (request, response) => {
    try {
      const email = request.params.email;
      const user = await User.findOne({ email });
      if (user) {
        response.json(user);
      } else {
        return response.status(404).send('User not found with the provided email id');
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };





  const submitfeedback = async (req, res) => {
    try {
      const { emoji } = req.body;
      console.log('Received feedback:', emoji); 
  
      
      const newFeedback = new Feedback({ emoji });
  
      
      await newFeedback.save();
      console.log('Feedback saved successfully'); 
  
      
      res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error('Error submitting feedback:', error); 
    
      res.status(500).json({ error: 'An error occurred while submitting feedback.' });
    }
  };
  



  

  module.exports = {insertuser,checkuserlogin,updateuserprofile,userprofile,submitfeedback}