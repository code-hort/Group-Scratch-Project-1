
const Cohort = require('../model/cohortModel');


const cohortController = {

    async getCohort (req,res,next) {
        console.log(req.params.cohort)
        const cohort = await Cohort.findOne({cohort:req.params.cohort})
        res.locals.cohort = cohort;
        return next()
    },
    async getAllCohorts (req,res,next) {
        const cohorts = await Cohort.find()
        res.locals.cohorts = cohorts;
        return next()
    },

    async newCohort(req, res, next) {
        try {
            const cohort =  await  new Cohort(
                {
                    cohort: req.body.cohort,
                })
         await cohort.save();

            res.locals.newCohort = cohort;
            return next()
        } catch (err) {
            return next({
                log: `err: ${err}`,
                status: 500,
                message: { err: 'error in cohortcontroller.newCohort middleware' }
            })
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
            { new: true })
        res.locals.cohort = resetCohort
        return next();
    } catch (error) {
        return next({
            log: `err: ${err}`,
            status: 500,
            message: { err: 'error in cohortcontroller.newCohort middleware' }
        })

    }
},

// async addStudent(req,res,next) {
//     const student = await 
// }

}



module.exports = cohortController