const express = require('express');

const router = express.Router();
const cohortController = require('../controller/cohortController');
const cookieController = require('../controller/cookieController');
const sessionController = require('../controller/sessionController');

router.post('/newcohort', cohortController.newCohort, (req, res, next) => {
  res.status(200).json(res.locals.newCohort);
});

router.patch(
  '/chosenuser/:cohort',
  cohortController.chosenUser,
  (req, res, next) => {
    const user = res.locals.user;
    const cohort = res.locals.cohort;
    res.status(200).json({ cohort: cohort, user: user });
  }
);

router.get('/:cohort', cohortController.getCohort, (req, res, next) => {
  res.status(200).json(res.locals.cohort);
});

router.post('/delete',
cohortController.deleteCohort,
// cohortController.getAllCohorts,
(req,res,next) => {
    res.status(200).json("cohort deleted")
}
)

// router.patch('/addStudent',
// cohortController.addStudent,
// res.status(200).json(res.locals.cohort)
// )
router.get(
  '/',
  //sessionController.checkSession,
  cohortController.getAllCohorts,
  (req, res, next) => {
    res.status(200).json(res.locals.cohorts);
  }
);

router.patch(
  '/resetcohort/:cohort',
  cohortController.resetCohort,
  (req, res, next) => {
    res.status(200).json(res.locals.cohort);
  }
);

module.exports = router;
