//This is an individual route and i know what to do with it
(function (homeController){

    //We connect to the database
    let data = require("../data");
    var auth = require("../auth");

    //Passing the app object
    homeController.init= function(app){

        app.get('/', function(request, response){
            //Making using of the async function
            data.getNoteCategories(function(err, results){
                response.render('index', {title: "Express and vash",
                                          error: err,
                                          categories: results,
                    newCatError: request.flash("newCatName"),
                    user: request.user}); // here we are adding it to the model if the user is npm startauthenticated
            });

        });

        //If we want to protect the notes just for the log in users you can pass (not call pass the function)
        app.get("/notes/:categoryName",
            auth.ensureAuthenticated, //If it succeeds then call the function below
            function(request, response){
            let categoryName= request.params.categoryName;
            response.render("notes", { title: categoryName, user: request.user });
        });

        app.post("/newCategory", function (request, response) {
            let categoryName = request.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    // Handle Error
                    console.log(err);
                    //Very temporary way to display our error in session and display it whwhn we load the page agaon
                    request.flash("newCatError", err);
                    response.redirect("/");
                } else {
                    response.redirect("/notes/" + categoryName);
                }
            });
        });

    };
})(module.exports);