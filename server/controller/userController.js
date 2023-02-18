







const User = require('../model/userModel');



const userController = {

  async signup(req, res, next) {
      try {
          const user = await new User({ username: req.body.username, password: req.body.password, cohortNumber: req.body.cohortNumber });
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


  async addpoint(req, res, next) {
    try {
        const user = await User.findOneAndUpdate({ username: req.body.username }, {$inc: {participation: 1 }});
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