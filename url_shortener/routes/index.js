var express = require('express');
var router = express.Router();
require('dotenv').load();
const ShortLink = require('../models/shortlinks');
const shortid = require("shortid");
require("dotenv").load();

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


const lookup_shortlink = (long_link, not_found_callback) => {
    console.log("long_link from parameter, before hitting the findOne ", long_link);

    ShortLink.findOne({
            long_link : long_link
        },
        function (error, document) {
            if (error) {
                console.log('error ', error)
            } else if (document.long_link) {
                console.log("document found during lookup", document);
                console.log("document short_link", object.short_link);
                return document.short_link;
            } else {
                console.log("document not found during lookup");
                create_new_shortlink_record(long_link)
            }
        }
    )
};





// API Endpoints


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;

    // check if the long url is in the db already
    ShortLink.findOne({
        long_link : long_url
    }, (error, document) => {
        if (error) {
            console.log("error", error);

    // match: set short_url to the collection.short_url
        } else if (document) { // if the original link matches
            console.log('document found', document);
            res.render('result', { short_url : shortid.generate() + '/r/' + document.short_link })

    // if no then generate new record
        } else { // no match found
            const short_link_document = new ShortLink({
                long_link : long_url,
                short_link : shortid.generate()
            });
            short_link_document.save((error, document) => {
                if (error) { console.log(error) }
                else {
                    console.log('document saved: ', document);
                    res.render('result', { short_url : process.env.ROOT_DOMAIN + '/r/' + document.short_link })
                }
            })
        }
    })

});

router.get('/r/:short_link_id', (req, res, next) => {
    const short_link_id = req.params.short_link_id;

    ShortLink.findOne({
        short_link : short_link_id
    }, (error, document) => {
        if (error) { console.log(error) }
        else if (document) {
            console.log("long link: ", document.long_link);
            res.redirect('http://' + document.long_link);
        } else {
            res.send('No matching shortlink');
        }
    })

});


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});





module.exports = router;
