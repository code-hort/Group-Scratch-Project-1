const express = require('express');

const userController = require('../controller/userController')

const router = express.Router();

router.post('/signup',
 userController.signUp,
  (req,res,next) => {
    res.status(200).json(res.locals.users)
})


router.patch('/addone',
 userController.addOne,
  (req,res,next)=>{
  res.status(200).json(res.locals.users)
 })



module.exports = router;