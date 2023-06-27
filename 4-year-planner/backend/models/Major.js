const mongoose = require("mongoose")

const Major = mongoose.model(
    "Major",
    new mongoose.Schema({
        name: String,
        lowerDivision: [Object],
        upperDivision: [Object],
        otherRequirements: String,
        majorElectives: [Object],
        numMajorElectives: Number,

    })
);

module.exports = Major;