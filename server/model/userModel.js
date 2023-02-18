

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cohortNumber: { type: Number, required: true },
  participation: { type: Number, default: 0 },
  isAdmin: { type: String, required: true, default: "Admin" }
})

UserSchema.pre('save', async function (next) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  return next()
})



const Userdb = mongoose.model('userdb', UserSchema);

module.exports = Userdb;






// const mongoose = require('mongoose');


// const CohortSchema = new mongoose.Scheme({
//     cohortNumber: {type: String, required: true},
//     residents: {type: Array}
// });

// const Cohortdb = mongoose.model('cohortdb', CohortSchema);

// module.exports = Cohortdb;



































// const bcrypt = require('bcrypt');
// // const { stringify } = require('postcss');


// const Schema = mongoose.Schema;


// const UserSchema = new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     cohortNumber: { type: String, required: true },
//     participation: { Number, default: 0 }

// });

// UserSchema.pre('save', async function (next) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//     return next()
// })

// const User = mongoose.model('User', UserSchema);

// module.exports = User;