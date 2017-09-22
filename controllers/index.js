(function(controllers){

    let homeController = require("./homeController");

    controllers.init = function (app){
        homeController.init(app);
    }

})(module.exports);