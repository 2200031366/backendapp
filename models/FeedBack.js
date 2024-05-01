const moment = require('moment-timezone');
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
 
  emoji: {
    type: String,
    required: true
  },
  postedtime: {
    type: String,
    default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A')
  },
});

const feedback = mongoose.model('feedback', feedbackSchema);

module.exports = feedback;
