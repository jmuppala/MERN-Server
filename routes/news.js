const express = require('express');
const router = express.Router();
const NewsItem = require('../models/newsitem');

/* /news REST API endpoint */
router.route('/')
.get((req, res, next) => {
  NewsItem.find({})
  .then((newsitems) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitems);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  NewsItem.create(req.body)
  .then((newsitem) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitem);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put((req, res, next) => {
  var err = new Error('PUT is forbidden on /news!');
  err.status = 403;
  next(err);
})
.delete((req, res, next) => {
  NewsItem.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

/* /news/:newsId REST API endpoint */
router.route('/:newsId')
.get((req, res, next) => {

})
.post((req, res, next) => {
  var err = new Error('POST is forbidden on /news/:newsId!');
  err.status = 403;
  next(err);
})
.put((req, res, next) => {

})
.delete((req, res, next) => {

});

module.exports = router;