const express = require('express');
const router = express.Router();
const NewsItem = require('../models/newsitem');
const cors = require('./cors');
const authenticate = require('../authenticate');

/* /news REST API endpoint */
router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
  NewsItem.find({})
  .then((newsitems) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitems);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  NewsItem.create(req.body)
  .then((newsitem) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitem);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  var err = new Error('PUT is forbidden on /news!');
  err.status = 403;
  next(err);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
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
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
  NewsItem.findById(req.params.newsId)
  .then((newsitem) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(newsitem);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  var err = new Error('POST is forbidden on /news/:newsId!');
  err.status = 403;
  next(err);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
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
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  NewsItem.findByIdAndRemove(req.params.newsId)
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;