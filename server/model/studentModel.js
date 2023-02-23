const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  cohort: { type: Number, required: true },
  participation: { type: Number, default: 0 }
//   isAdmin: { type: Boolean, default: false },
});

const Student = mongoose.model('student', StudentSchema);

module.exports = Student;