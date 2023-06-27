const db = require("../models");
const User = db.user;
const Planner = db.planner;

exports.getUserPlanner = async (req, res) => {
    Planner.findOne({ sub: req.user.sub }).exec((err, planner) => {
        if (err) {
            console.log("Error finding planner: ", err);
            res.status(500).send("Couldn't find planner")
        }

        res.status(200).send(planner);
    });
}

exports.setUserPlanner = async (req, res) => {
    console.log("Updating years: ", req.body.planner.years);
    console.log("Updating selections: ", req.body.planner.selections);
    Planner.findOneAndUpdate({ sub: req.user.sub }, {
        $set: {
            years: req.body.planner.years,
            selections: req.body.planner.selections
        }
    }, { upsert: true, new: true, setDefaultsOnInsert: true }).then((response, err) => {
        if (err) {
            res.status(500).send(err);
            throw err;
        }

        console.log("response: ", response);

        console.log("Updated planner!");
        res.status(200).send("Saved")
    });

}