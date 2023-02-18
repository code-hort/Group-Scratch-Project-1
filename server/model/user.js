
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { stringify } = require('postcss');


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cohortNumber: { type: String, required: true },
    participation: { Number, default: 0 }

});

UserSchema.pre('save', async function (next) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    return next()
})

const User = mongoose.model('User', UserSchema);

module.exports = User;