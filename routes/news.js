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

/* /news/:newsId REST API endpoint */
router.route('/:newsId')
.get((req, res, next) => {
  let item = newsitems.find((item) => item._id === req.params.newsId);
  if (item)
    res.json(item);
  else {
    var err = new Error('Did not find item with index: ' + req.params.newsId + '!');
    err.status = 404;
    next(err);
  }
})
.post((req, res, next) => {
  var err = new Error('POST is forbidden on /news/:newsId!');
  err.status = 403;
  next(err);
})
.put((req, res, next) => {
  let index = newsitems.findIndex((item) => item._id === req.params.newsId);
  if (index < 0) {
    var err = new Error('Did not find item with index: ' + req.params.newsId + '!');
    err.status = 404;
    next(err);
  }
  else {
    newsitems.splice(index,1,req.body);
    res.json(newsitems);
  }
})
.delete((req, res, next) => {
  let index = newsitems.findIndex((item) => item._id === req.params.newsId);
  if (index < 0) {
    var err = new Error('Did not find item with index: ' + req.params.newsId + '!');
    err.status = 404;
    next(err);
  }
  else {
    newsitems.splice(index,1);
    res.json(newsitems);
  }
});

module.exports = router;