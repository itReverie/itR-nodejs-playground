(function (database){

    const MongoClient = require('mongodb').MongoClient;

    //url for production
    //let uri = "mongodb://mongodbUser:mongodbPassword@cluster0-shard-00-00-i6dab.mongodb.net:27017,cluster0-shard-00-01-i6dab.mongodb.net:27017,cluster0-shard-00-02-i6dab.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
    //url for development
    let uri= "mongodb://localhost:27017/theBoard"; //it will create the db

    let theDb= null;

    database.getDb = function (next) {
        //I want to create the db just when I need to
        if(!theDb)
        {
            //Connect to the DB
            MongoClient.connect(uri, function(err, db) {
                if(err)
                {
                    next(err, null);
                }
                else {
                    //We are wrapping the db in an object in case we need it later with more parameters.
                    //Maybe we would like to know which user is accessing it, etc.
                    theDb = {db: db,
                             notes: db.collection("notes"),
                             users: db.collection("users")};
                    next(null, theDb);
                }
            });
        }
        else{
            next(null, theDb);
        }
    }

})(module.exports);