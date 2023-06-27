const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User");

db.major = require("./Major");

db.planner = require("./Planner");

module.exports = db;