const mongoose = require('mongoose')
const Student = require('./modelstudents.js')

const uri = process.env.DATABASE_URL || "mongodb+srv://bongbong:bongbong@bongbong.nuown.mongodb.net/bongbong?retryWrites=true&w=majority"

const connectDb = () => {
  return mongoose.connect(uri, { useNewUrlParser: true });
}; 

module.exports = {
  connectDb,
  models: {
    Student
  }
}