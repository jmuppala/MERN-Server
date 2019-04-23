const express = require('express');
const router = express.Router();
const NEWSITEMS = require('../shared/newsitems');

let newsitems = NEWSITEMS;

/* /news REST API endpoint */
router.route('/')
.get((req, res, next) => {
  res.json(newsitems);
})
.post((req, res, next) => {
  newsitems = newsitems.concat(req.body);
  res.json(newsitems);
})
.put((req, res, next) => {
    var err = new Error('PUT is forbidden on /news!');
    err.status = 403;
    next(err);
})
.delete((req, res, next) => {
    var err = new Error('DELETE is not supported on /news!');
    err.status = 403;
    next(err);
});

module.exports = router;