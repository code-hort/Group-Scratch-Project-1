

const express = require('express')

const router = express.Router();

const userController = require('../controller/userController');



router.post("/signup",
userController.signup,
(req,res,next) => {
    return res.status(200).json(res.locals.user);
}
)

router.post("/login",
userController.login,
(req,res,next) => {
    return res.status(200).json(res.locals.user);
}
)


router.patch("/addpoint",
userController.addpoint,
(req,res,next) => {
    return res.status(200).json(res.locals.user);
}
)

router.delete("/delete",
userController.delete,
(req,res,next) => {
    return res.status(200).json(res.locals.user);
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