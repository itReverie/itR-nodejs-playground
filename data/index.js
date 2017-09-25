(function(data){

    const seedData = require("./seedData");
    const database = require("./database");

    //We are setting an async operation
    data.getNoteCategories = function (next){
        database.getDb(function(err,db){
            if(err){
                console.log('Failed to seed the database:',err);
            }
            else {
                //Find is like where in sql
                // {name: 'People'}
                // {notes: {$size : 5 }}
             db.notes.find().sort({ name: 1}).toArray(function(err, results){
                 if(err){
                     console.log('Failed to seed the database:',err);
                 }

                 next(null, results);
             });
            }
        });
    };

    function seedDataBase(){
        database.getDb(function(err,db){
            if(err){
                console.log('Failed to seed the database:',err);
            }
            else {
                //Test to see if data exists already asynchronously
                db.notes.count(function (err, count){
                    if(err){
                        console.log('Failed to seed the database:',err);
                    }
                    else {
                        if(count === 0)
                        {
                            console.log('It is the first time, lets seed the db');
                            seedData.initialNotes.forEach(function(item)
                                {
                                    db.notes.insert(item, function (err){
                                        if(err){
                                            console.log("Failed to insert into the db");
                                        }
                                    })
                                }
                            );
                        }
                        else
                        {
                            console.log('Db already seeded.');
                        }
                    }
                });

            }
        });
    }

    seedDataBase();

})(module.exports);