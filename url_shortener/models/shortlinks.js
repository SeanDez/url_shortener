require("dotenv").load();

// database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);


const ShortLinkSchema = new mongoose.Schema({
    long_link : {
        type : String,
        minLength : 5,
        required : true,
        unique : true // npm i mongoose-unique-validator --save
    },
    short_link : {
        type : String,
        maxLength: 20
    }
});


// ASSIGN this new variable to the exports object, which has the following properties
const ShortLink = module.exports = mongoose.model('URLShortener_ShortLink', ShortLinkSchema);


