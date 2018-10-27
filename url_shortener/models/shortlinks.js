require("dotenv").load();

// database connection
const mongoose = require("mongoose");
const unique_validator = require("mongoose-unique-validator");


const ShortLinkSchema = new mongoose.Schema({
    long_link : {
        type : String,
        minLength : 5,
        required : true
        // unique : true   -- I don't want to cause an error here
    },
    short_link : {
        type : String,
        maxLength: 20
    }
});

ShortLinkSchema.plugin(unique_validator);


// ASSIGN this new variable to the exports object, which has the following properties
const ShortLink = module.exports = mongoose.model('URLShortener_ShortLink', ShortLinkSchema);


