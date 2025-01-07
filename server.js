//https://pages.git.generalassemb.ly/modular-curriculum-all-courses/men-stack-crud-app-fruits/canvas-landing-pages/seb

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
const Fruit = require("./models/fruits.js");
// this line use middleware to convert the form into an object type
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async(req, res)=>{
    res.render("index.ejs");
});

// GET /fruits/new
app.get("/fruits/new", (req, res)=>{
    res.render("fruits/new.ejs");
});

// POST /fruits
app.post("/fruits", async(req,res)=>{
    if(req.body.isReadyToEat === "on"){
        req.body.isReadyToEat = true;
    }else{
        req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
});

//GET /fruits

app.get("/fruits", async (req,res)=>{
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", {
        fruits:allFruits
    });
});

//GET /fruits/:fruitId

app.get("/fruits/:fruitId", async(req, res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs",{
        fruit: foundFruit
    });
});


//DELETE /fruits/:fruitId
app.delete("/fruits/:fruitID", async (req, res)=>{
    await Fruit.findByIdAndDelete(req.params.fruitID);
    res.redirect("/fruits");
});

//Get /fruits/:fruitID/edit
app.get("/fruits/:fruitId/edit", async (req, res)=>{
    const foundFruit = await Fruit.findById(req.params.fruitId);
    console.log(foundFruit);
    res.render("fruits/edit.ejs",{
        fruit: foundFruit
    });
});

// /fruits/:fruitId
app.put("/fruits/:fruitId", async (req, res)=>{
    if(req.body.isReadyToEat === "on"){
        req.body.isReadyToEat = true;
    }else{
        req.body.isReadyToEat = false;
    }

    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

    res.redirect(`/fruits/${req.params.fruitId}`);
});


app.listen(3000, ()=>{
    console.log('Listening on port 3000');
});

