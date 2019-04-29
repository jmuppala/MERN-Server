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
  NewsItem.findById(req.params.newsId)
  .then((newsitem) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitem);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post((req, res, next) => {
  var err = new Error('POST is forbidden on /news/:newsId!');
  err.status = 403;
  next(err);
})
.put((req, res, next) => {
  NewsItem.findByIdAndUpdate(req.params.newsId, {
      $set: req.body
  }, { new: true })
  .then((newsitem) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitem);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete((req, res, next) => {
  NewsItem.findByIdAndRemove(req.params.newsId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;