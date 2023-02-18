const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const db = require('./database/connection');

db.on("error", console.error.bind(console,"connection error: "));
db.once("open", function () {
    console.log("Connected successfully")
})

app.use(express.json())
app.use(express.urlencoded({extended: true}) )
















app.listen(PORT, ()=>(
    console.log(`listening on ${PORT}`)
))