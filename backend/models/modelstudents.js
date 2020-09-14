const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  _id: Number,
  email: String,
  name: String,
  address: {
    gata: String,
    postnummer: String,
    ort: String
  }
});

//original, men vill ej fungera
// const studentSchema = new mongoose.Schema({

//   student: {
//     email: String,
//     name: String,
//     address: {
//       gata: String,
//       postnummer: Number,
//       ort: String
//     }
//   }
// });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 