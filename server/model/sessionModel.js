const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  cookieId: { type: Number, unique: true, required: true },
  username: { type: String },
  isAdmin: { type: Boolean }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
