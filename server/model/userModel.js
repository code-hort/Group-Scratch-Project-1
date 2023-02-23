const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cohort: { type: Number, required: true },
  participation: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next();
});

const Userdb = mongoose.model('userdb', UserSchema);

module.exports = Userdb;
