(function(controllers){

    let homeController = require("./homeController");
    var notesController= require("./notesController");

    controllers.init = function (app){
        homeController.init(app);
        notesController.init(app);
    }

})(module.exports);