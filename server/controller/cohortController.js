const { findOne } = require('../model/cohortModel');
const Cohort = require('../model/cohortModel');
const User = require('../model/userModel');
const Student = require('../model/studentModel');

const cohortController = {
  async getCohort(req, res, next) {
    try {
      console.log(req.params.cohort);
      const cohort = await Cohort.findOne({ cohort: req.params.cohort });
      res.locals.cohort = cohort;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.getCohort middleware' },
      });
    }
  },

  async getAllCohorts(req, res, next) {
    try {
      const cohorts = await Cohort.find();
      res.locals.cohorts = cohorts;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.getAllCohorts middleware' },
      });
    }
  },

  async addStudent(req, res, next) {
    console.log("made it")
    try {
        const student = await new Student({
          username: req.body.username,
            cohort: req.body.cohort,
        });
        console.log(student);
        student.save();
          
        const cohort = await Cohort.findOneAndUpdate(
            { cohort: req.body.cohort },
            { $push: { students: student } },
            { upsert: true, new: true }
          );

      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.addStudent middleware' },
      });
    }
  },

  async newCohort(req, res, next) {
    try {
      const cohort = new Cohort({
        cohort: req.body.cohort,
      });
      await cohort.save();

      res.locals.newCohort = cohort;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.newCohort middleware' },
      });
    }
  },

  async deleteCohort(req, res, next) {
    try {
      await Cohort.deleteOne({ cohort: req.body.cohort });
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.deleteCohort middleware' },
      });
    }
  },

  async resetCohort(req, res, next) {
    try {
      const cohort = await Cohort.findOne({ cohort: req.params.cohort });
      const studentsArray = cohort.students;
      const chosenArray = cohort.chosen;
      const resetArray = studentsArray.concat(chosenArray);

      const resetCohort = await Cohort.findOneAndUpdate(
        { cohort: req.params.cohort },
        { students: resetArray, chosen: [] },
        { new: true }
      );
      res.locals.cohort = resetCohort;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.resetCohort middleware' },
      });
    }
  },

  async chosenUser(req, res, next) {
    try {
      const user = await Student.findOneAndUpdate(
        { username: req.body.username },
        { $inc: { participation: 1 } },
        { new: true }
      );
      const cohort = await Cohort.findOneAndUpdate(
        { cohort: req.params.cohort },
        {
          $pull: { students: { username: user.username } },
          $push: { chosen: user },
        },
        { new: true }
      );
      res.locals.cohort = cohort;
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.chosenUser middleware' },
      });
    }
  },

  async volunteerUser(req, res, next) {
    try {
      const user = await Student.findOneAndUpdate(
        { username: req.body.username },
        { $inc: { participation: 1 } },
        { new: true }
      );
      const cohort = await Cohort.findOneAndUpdate(
        { 'students.username': user.username },
        {
          $set: { 'students.$.participation': user.participation },
        },
        { new: true }
      );
      res.locals.cohort = cohort;
      res.locals.user = user;
      return next();
    } catch (err) {
      return next({
        log: `err: ${err}`,
        status: 500,
        message: { err: 'error in cohortcontroller.volunteerUser middleware' },
      });
    }
  },
};

module.exports = cohortController;
