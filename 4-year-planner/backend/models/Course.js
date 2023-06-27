const mongoose = require("mongoose");

const Course = mongoose.model(
    "Course",
    new mongoose.Schema({
        units: String,
        name: String,
        description: String,
        sub: Number,
        details: Object
    })
);

module.exports = Course;