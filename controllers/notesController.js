(function (notesController) {

    //We connect to the database
    const data = require("../data");
    var auth = require("../auth");

    //Passing the app object
    notesController.init = function (app) {


        app.get("/api/notes/:categoryName",
            function (req, res) {

                var categoryName = req.params.categoryName;

                data.getNotes(categoryName, function (err, notes) {
                    if (err) {
                        res.send(400, err);
                    } else {
                        res.set("Content-Type", "application/json");
                        res.send(notes.notes);
                    }
                });
            });

        app.post("/api/notes/:categoryName", function (request, response) {
            let categoryName = request.params.categoryName;
            //We are constructing an object that might have more or less properties
            let noteToInsert = {
                note: request.body.note,
                color: request.body.color,
                author: "Shawn Wildermuth"
            };

            data.addNote(categoryName, noteToInsert, function (err, notes) {
                if (err) {
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