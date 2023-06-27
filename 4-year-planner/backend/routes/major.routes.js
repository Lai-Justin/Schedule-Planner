const controller = require("../controllers/major.controller");

module.exports = function(app){
    app.get("/api/major/majornames", controller.majorNames);
    app.get("/api/major/majorinfo", controller.majorInfo);
}