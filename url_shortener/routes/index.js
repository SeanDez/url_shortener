var express = require('express');
var router = express.Router();


router.get('/result', function (req, res, next) {
    const long_url = req.query.long_url;
    console.log('index.js: 12', long_url); // undefined
    // console.log('index.js: 13', req); // large object
    console.log('index.js: 14', req.query); // {}
    res.render('result', { title: "Results", short_url : long_url })
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
