(function (auth){

    let data= require("../data");
    let hasher= require("./hasher");

    //http://passportjs.org/
    let passport = require("passport");
    let localStrategy = require("passport-local").Strategy; // We are just going to use this one

    function userVerify(username, password, next) {
        data.getUser(username, function (err, user) {
            if (!err && user) {
                let testHash = hasher.computeHash(password, user.salt);
                //As it is a one way authentication we check if the hash matches
                if (testHash === user.passwordHash) {
                    next(null, user);
                    return;
                }
            }
            next(null, false, { message: "Invalid Credentials." });
        });
    }

    auth.init = function (app){

        /**Setting up the passport authentication**/

        //we are telling the passport what kind of authentication to use, in this case localstrategy
        //when you are done with the local strategy go to the function user verify
        passport.use(new localStrategy(userVerify));
        //we can also add Facebook, Google authentication, etc.
        //passport.use('twitter');
        passport.serializeUser(function(user, next){
            //Ask me for a key of the user so I can use it if there is an error
            next(null, user.username);
        });
        passport.deserializeUser(function (key, next) {
            //this is the key that we pass in the serializer (in this case username)
            data.getUser(key, function (err, user) {
                if (err || !user) {
                    next(null, false, { message: "Could not find user" });
                } else {
                    next(null, user);
                }
            });
        });
        //returns an object that represents the entire middleware for passports
        app.use(passport.initialize());
        //passport to use session to store temporary. At the moment this is nice and simple but there are other ways
        app.use(passport.session());


        app.get("/Login", function(request, response){
            response.render("login", {title: "Login to Board"} );
        });

        app.post("/Login", function(request, response, next){

            //We are putting together an object that can be called for  the authentication
            var authFunction = passport.authenticate("local",
                { successRedirect: '/',
                    failureRedirect: '/login' });
            //This is where the actual authentication happens
            authFunction(request, response, next);
        });

        app.get("/register", function(request,response){
            response.render("register",{title: "Register to the board"});
        });

        app.post("/register", function(request, response){

            //This will give is a random 8 character string
            let salt = hasher.createSalt();

            let user={
                name: request.body.name,
                email: request.body.email,
                username: request.body.username,
                passwordHash: hasher.computeHash(request.body.password, salt),
                salt : salt
            };

            data.addUser(user, function (err) {
                if (err) {
                    console.log("We were unable to register the user.");
                    response.redirect("/register");
                } else {
                    response.redirect("/login");
                }
            });
        });
    };
})(module.exports);