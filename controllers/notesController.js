(function(notesController){

    const data= require("../data");

    //Passing the app object
    notesController.init= function(app){


        //Our route
        app.get("/api/notes/:categoryName", function(request, response){

            let categoryName= request.params.categoryName;
            console.log(categoryName);

            data.getNotes(categoryName, function (err, notes){
                if(err){
                    response.send(400, err);
                }
                else {
                    response.set("Content-Type", "application/json");
                    response.send(notes.notes);
                }
            });

        });
    };

})(module.exports);