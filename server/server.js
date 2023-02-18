const express = require('express');
const app = express();
const PORT = 3000;

const db = require('./database/connection');

db();

// db.on("error", console.error.bind(console,"connection error: "));
// db.once("open", function () {
//     console.log("Connected successfully")
// })

app.use(express.json())
app.use(express.urlencoded({extended: true}) )



const userRouter = require('./routes/user.js')
const cohortRouter = require('./routes/cohort.js')

app.use('/user', userRouter);
app.use('/cohort', cohortRouter);

app.use('*', (req,res,next) => {
    res.status(404).send("url undefined")
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
  });



app.listen(PORT, ()=>{
    console.log('listening on port 3000')
})

module.exports = app;






