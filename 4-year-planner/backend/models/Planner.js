const mongoose = require("mongoose");

const Planner = mongoose.model(
    "Planner",
    new mongoose.Schema({
        years:[
            [[Object],[Object],[Object],[Object]]
            ,[[Object],[Object],[Object],[Object]]
            ,[[Object],[Object],[Object],[Object]]
            ,[[Object],[Object],[Object],[Object]]
            ,[[Object],[Object],[Object],[Object]]],
        sub: Number,
        selections: Object
    })
);

module.exports = Planner;