const express = require('express')

const router = express.Router();
const cohortController = require('../controller/cohortController');



router.post('/newCohort',
cohortController.newCohort,
(req,res,next) => {
    res.status(200).json(res.locals.newCohort)
}
)

// router.patch('/addStudent',
// cohortController.addStudent,
// res.status(200).json(res.locals.cohort)
// )

// router.patch('/chosenUser/:cohort',
// cohortController.chosenUser,
// res.status(200).json(res.locals.user)
// )

router.get('/:cohort',
cohortController.getCohort,  
(req,res,next) => {
  res.status(200).json(res.locals.cohort)
})
router.get('/',
cohortController.getAllCohorts,  
(req,res,next) => {
  res.status(200).json(res.locals.cohorts)
})

router.patch('/resetCohort/:cohort',
cohortController.resetCohort,
(req,res,next) => {
    return res.status(200).json(res.locals.cohort)
})



module.exports = router;