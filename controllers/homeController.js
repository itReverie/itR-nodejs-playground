//This is an individual route and i know what to do with it
(function (homeController){

    let data = require("../data");

    homeController.init= function(app){
        app.get('/', function(request, response){

            //Making using of the async function
            data.getNoteCategories(function(err, results){
                response.render('index', {title: "Express and vash",
                                          error: err,
                                          categories: results});
            });

        });


    };

})(module.exports);