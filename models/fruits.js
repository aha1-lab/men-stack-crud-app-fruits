const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean
});

const Fruit = mongoose.model("Fruits", fruitSchema);

module.exports = Fruit;
