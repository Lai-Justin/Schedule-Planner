require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models");

//const dbo = require("./db/conn");

db.mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }  
).then(() => {
    console.log("Mongoose Successfully connected to DB!");
}).catch (err => {
    console.error("Mongoose connection error", err);
    process.exit();
});


var corsOptions = {
    origin: [process.env.FRONTEND_URL]
};

app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// routes
require('./routes/auth.routes')(app);
require('./routes/major.routes')(app);
require('./routes/user.routes')(app);
//require('./routes/user.routes')(app);
// set port, listen for requests
app.get("/", (req, res) => {
  res.json({ message: "Work in progress Four Year Schedule Planner" });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {

  /*dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });*/

  console.log(`Server is running on port ${PORT}.`);
});

module.exports = server;