(function(data){

    let seedData = require("./seedData");

    //We are setting an async operation
    data.getNoteCategories = function (next){
        next(null,seedData.initialNotes);
    };
})(module.exports);