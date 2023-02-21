
const { findOne } = require('../model/cohortModel');
const Cohort = require('../model/cohortModel');
const User = require('../model/userModel');


const cohortController = {

    async getCohort(req, res, next) {
        console.log(req.params.cohort)
        const cohort = await Cohort.findOne({ cohort: req.params.cohort })
        res.locals.cohort = cohort;
        return next()
    },
    async getAllCohorts(req, res, next) {
        const cohorts = await Cohort.find()
        res.locals.cohorts = cohorts;
        return next()
    },

    async newCohort(req, res, next) {
        try {
            const cohort = new Cohort(
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
        

        // catch (error) {
        //     return next({
        //         log: `err: ${err}`,
        //         status: 500,
        //         message: { err: 'error in cohortcontroller.newCohort middleware' }
        //     })

        // }
    },
    async chosenUser(req, res, next) {
        //   const user = await User.findOne({username:req.body.username})
        const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $inc: { participation: 1 } },
            { new: true }
        );
        const cohort = await Cohort.findOneAndUpdate(
            { cohort: req.params.cohort },
            { $pull: { students: { username: user.username } }, $push: { chosen: user } },
            { new: true })

        res.locals.cohort = cohort;
        res.locals.user = user
        return next();
    }




    // async addStudent(req,res,next) {

    // }

}



module.exports = cohortController