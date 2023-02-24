const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const Cohort = require('../model/cohortModel');
const { findOneAndUpdate } = require('../model/cohortModel');

const userController = {
  async signup(req, res, next) {
    try {
      const adminKey = 'thisIsTheAdminKey';
      let adminRole = false;
      if (req.body.isAdmin === adminKey) adminRole = true;
      const user = await new User({
        username: req.body.username,
        password: req.body.password,
        cohort: req.body.cohort,
        isAdmin: adminRole,
      });
      user.save();

      const student = await new Student({
        username: req.body.username,
          cohort: req.body.cohort,
      });
      student.save();

      if (adminRole === true) {
        const cohort = await Cohort.findOneAndUpdate(
          { cohort: req.body.cohort },
          { $push: { admin: user } },
          { upsert: true, new: true }
        );
        res.locals.cohort = cohort;
      } else {
        const cohort = await Cohort.findOneAndUpdate(
          { cohort: req.body.cohort },
          { $push: { students: user } },
          { upsert: true, new: true }
        );
        res.locals.cohort = cohort;
      }
      res.locals.user = user;
      
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in usercontroller.signup middleware' },
      });
    }
  },
  async login(req, res, next) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.locals.user = user;
      return next();
    } else {
      return next({ error: 'try again' });
    }
  },

  async addpoint(req, res, next) {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $inc: { participation: 1 } },
        { new: true }
      );
      user.save();
      //possibly redirect to signup page with then

      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in usercontroller.addpoint middleware' },
      });
    }
  },

  async delete(req, res, next) {
    try {
      const cohort = await Cohort.findOneAndUpdate(
        { cohort: req.params.cohort },
        {
          $pull: {
            students: { username: req.body.username },
            chosen: { username: req.body.username },
          },
        },

        { new: true }
      );
      await User.deleteOne({ username: req.body.username });

      res.locals.cohort = cohort;
      console.log(`user: ${req.body.username} has been deleted`);
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in usercontroller.delete middleware' },
      });
    }
  },
};
module.exports = userController;
