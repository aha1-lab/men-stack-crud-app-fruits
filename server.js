const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
const Fruit = require("./models/fruits.js");

app.get("/", async(requestAnimationFrame, res)=>{
    res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res)=>{
    res.send("This route sends the user a form page!");
});


app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});

