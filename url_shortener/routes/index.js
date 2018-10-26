var express = require('express');
var router = express.Router();
require('dotenv').load();
const ShortLink = require('../models/shortlinks');


// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;

db.on('error', (error) => {
    console.log(error);
});

db.once('open', () => {
    console.log("Connected to MongoDB");
});



// Functions
const save_new_shortlink = (long_link) => {
    // ShortLink.
    const short_link = new ShortLink();
    short_link.long_link = long_link;
    short_link.short_link = 'S link';

    short_link.save((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('successfully saved');
        }
    })
};





// API Endpoints


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;

    save_new_shortlink();

    res.render('result', { title: "Results", short_url : long_url })
});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});





module.exports = router;
