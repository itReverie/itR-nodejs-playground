//This is an individual route and i know what to do with it
(function (homeController){

    homeController.init= function(app){
        app.get('/', function(request, response){
            response.render('index', {title: "Express + vash"});
        });
    };

})(module.exports);