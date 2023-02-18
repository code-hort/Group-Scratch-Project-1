const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const db = require('./database/connection');
db()
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully")
// })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userRoute = require('./routes/user.js');
const cohortRoute = require('./routes/cohort.js');

app.use('/user', userRoute)
app.use('/cohort', cohortRoute)

app.use('*', ( req, res,err) => {
    res.status(404).send({ error: err })
})


app.use((err, req, res, next) => {
    res.status(500).json(err)
    // const defaultErr = {
    //     log: `err: ${err}`,
    //     status: 500,
    //     message: { err: 'error in middleware' }
    // };
    // const errorObj = Object.assign({}, defaultErr, err);
    // console.log(errorObj.log);
    // res.status(errorOBj.status).json(errorObj.message);
})

app.listen(PORT, () => (
    console.log(`listening on ${PORT}`)
))

module.exports = app




























// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 3000;

// const db = require('./database/connection');
// db()
// // db.on("error", console.error.bind(console, "connection error: "));
// // db.once("open", function () {
// //     console.log("Connected successfully")
// // })

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// const userRoute = require('./routes/user.js');
// const cohortRoute = require('./routes/cohort.js');

// app.use('/user', userRoute)
// app.use('/cohort', cohortRoute)

// app.use('*', (err, req, res) => {
//     res.status(404).send({ error: err })
// })


// app.use((err, req, res, next) => {
//     console.log(err)
//     const defaultErr = {
//         log: `err: ${err}`,
//         status: 500,
//         message: { err: 'error in middleware' }
//     };
//     const errorObj = Object.assign({}, defaultErr, err);
//     console.log(errorObj.log);
//     res.status(errorOBj.status).json(errorObj.message);
// })

// app.listen(PORT, () => (
//     console.log(`listening on ${PORT}`)
// ))

// module.exports = app

































// // const express = require('express');
// // const app = express();
// // const PORT = 3000;
// // const mongoose = require("mongoose")
// // const userController = require('./controller/userController.js')


// // const db = require('./database/connection');

// // db();

// // // db.on("error", console.error.bind(console,"connection error: "));
// // // db.once("open", function () {
// // //     console.log("Connected successfully")
// // // })

// // app.use(express.json())
// // app.use(express.urlencoded({extended: true}) )



// // const userRouter = require('./routes/user.js')
// // const cohortRouter = require('./routes/cohort.js')

// // // app.use('/user', userRouter);
// // // app.use('/cohort', cohortRouter);

// // app.post('/signup',
// //  userController.signUp,
// //   (req, res, next) => {
// //     res.status(200).json(res.locals.users)
// // })


// // app.patch('/addone',
// // userController.addOne, 
// //   (req, res, next)=>{
// //   res.status(200).json(res.locals.users)
// //  })


// // app.use('*', (req,res,next) => {
// //     res.status(404).send("url undefined")
// // })

// // app.use((err, req, res, next) => {
// //     console.log(err);
// //     res.status(500).send({ error: err });
// //   });


// // app.listen(PORT, ()=>{
// //     console.log('listening on port 3000')
// // })

// // module.exports = app;
// // // module.exports = router;






