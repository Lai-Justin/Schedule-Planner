const mongoose = require("mongoose");

const Quarter = mongoose.model(
    "Quarter",
    new mongoose.Schema({
        courses: [Object]
    })
);

module.exports = Quarter;