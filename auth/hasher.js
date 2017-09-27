// hasher.js
(function (hasher) {

    //crypto library is already built in node
    let crypto = require("crypto");

    //This will give is a random 8 character string
    hasher.createSalt = function () {
        let len = 8;//This length is up to us
        //generate random bytes. 2 un hexadecimal will be 8. securing Passwords
        return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').substring(0, len);
    };

    hasher.computeHash = function (source, salt) {
        //createHmac is an encription algoithm
        //I can change sha1 if I need more security
        let hmac = crypto.createHmac("sha1", salt);
        let hash = hmac.update(source);
        return hash.digest("hex");
    };

})(module.exports);