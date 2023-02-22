const express = require('express')
const router = express.Router();
const userController = require('../controller/userController');
const cookieController = require('../controller/cookieController');
const sessionController = require('../controller/sessionController');



router.post("/signup",
userController.signup,
cookieController.setCookie,
sessionController.setSession,
(req,res,next) => {
const cohort = res.locals.cohort;
const user = res.locals.user
  res.status(200).json({cohort:cohort, user:user});
}
)

router.post("/login",
userController.login,
cookieController.setCookie,
sessionController.setSession,
(req,res,next) => {
     res.status(200).json(res.locals.user);
}
)


router.patch("/addpoint",
userController.addpoint,
(req,res,next) => {
  res.status(200).json(res.locals.user);
}
)

router.delete("/delete/:cohort",
userController.delete,
(req,res,next) => {
  res.status(200).json(res.locals.cohort);
})




module.exports = router;
































// const express = require('express');

// const userController = require('../controller/userController')
// //console.log(userController.signUp)
// const router = express.Router();

// router.post('/signup',
//  userController.signUp,
//   (req, res, next) => {
//     res.status(200).json(res.locals.users)
// })


// router.patch('/addone',
// userController.addOne, 
//   (req, res, next)=>{
//   res.status(200).json(res.locals.users)
//  })



// module.exports = router;