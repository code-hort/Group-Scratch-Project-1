const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CohortSchema = new Schema({
  cohort: { type: Number, required: true, unique: true },
  students: [],
  chosen: [],
  admin: [],
});

const Cohort = mongoose.model('Cohort', CohortSchema);

module.exports = Cohort;
