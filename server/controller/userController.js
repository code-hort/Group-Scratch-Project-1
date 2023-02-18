






const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const Cohort = require('../model/cohortModel')



const userController = {

    async signup(req, res, next) {
        try {
            const user = await new User(
                {
                    username: req.body.username,
                    password: req.body.password,
                    cohortNumber: req.body.cohortNumber,
                    isAdmin: req.body.isAdmin
                });

            user.save();
            const cohort = await Cohort.findOneAndUpdate(
                {cohort: req.body.cohortNumber},
                {$push: {students: user}},
                {new:true}
                );
                console.log(cohort)
                console.log(user)
                res.locals.user = user;
                res.locals.cohort = cohort;
                return next()

            //possibly redirect to signup page with then

            res.locals.user = user;
            return next()
        } catch (err) {
            return next({
                log: `err: ${err}`,
                status: 500,
                message: { err: 'error in usercontroller.signup middleware' }
            })
        }
    },

    async login(req, res, next) {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            // if isAdmin then you need to redirect them to admin page
            res.locals.user = user;
            next();
        } else {
            next({ error: "try again" })
        }
    },

    async addpoint(req, res, next) {
        try {
            const user = await User.findOneAndUpdate(
                { username: req.body.username }, 
                { $inc: { participation: 1 } },
                {new: true}
                );
            user.save();
            //possibly redirect to signup page with then

            res.locals.user = user;
            return next()
        } catch (err) {
            return next({
                log: `err: ${err}`,
                status: 500,
                message: { err: 'error in usercontroller.signup middleware' }
            })
        }
    },
    
    async delete(req, res, next) {
       await User.deleteOne({username: req.body.username})
            if (err){
                return next({ 
                    log: 'Error occured in delete middleware',
                    status: 400,
                    message: { err: 'Error!'}
                  })
            } 
              res.locals.user = "user deleted"
              return next();
        }
    


}

module.exports = userController;






















// const User = require('../model/userModel');

// const userController = {}

// userController.signUp = async function (req, res, err, next){
//     const { username, password } = req.body;
//     if (!username || !password) (err) => next(err);
//     const user = await new User({
//         username: req.body.username,
//         password: req.body.password,
//         cohortNumber: req.body.cohortNumber

//     });
//     await user.save()
//     res.locals.user = user

//     return next()
// }

// userController.addOne = async function(req, res, next) {
//     const user = await User.findOneAndUpdate(
//         { username: req.body.username },
//         { $inc: { participation: 1 } },
//         { new: true }
//     )
//     res.locals.user = user
//     return next()
// }




// module.exports = userController;