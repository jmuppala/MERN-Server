const express = require('express');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

var ReadItems = require('../models/readitems');

const readItemsRouter = express.Router();

readItemsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    ReadItems.findOne({ user: req.user._id})
    .exec((err, readItems) => {
        if (err) return next(err);

        if (readItems) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(readItems.readItems);
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json([]);
        }
    });
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    ReadItems.findOne({ user: req.user._id }, (err, readItems) => {
        if (err) return next(err);

        if (!readItems) {
            ReadItems.create({ user: req.user._id })
            .then((readItems) => {
                for (i = 0; i < req.body.length; i++ )
                    if (readItems.readItems.indexOf(req.body[i]._id) < 0)                                
                        readItems.readItems.push(req.body[i]);
                readItems.save()
                .then((readItems) => {
                    console.log('readItems created!');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(readItems.readItems);
                })
                .catch((err) => {
                    return next(err);
                });
            })
            .catch((err) => {
                return next(err);                
            })
        }
        else {
            for (i = 0; i < req.body.length; i++ )
                if (readItems.readItems.indexOf(req.body[i]._id) < 0)                                  
                    readItems.readItems.push(req.body[i]);
            readItems.save()
            .then((readItems) => {
                console.log('Read Item Added!');
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(readItems.readItems);
            })
            .catch((err) => {
                return next(err);
            });
        }

    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /readItems');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    ReadItems.findOneAndRemove({ user: req.user._id }, (err, resp) => {
        if (err) return next(err);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    });
});

readItemsRouter.route('/:readItemId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('GET operation not supported on /readItems/'+ req.params.readItemId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    ReadItems.findOne({ user: req.user._id }, (err, readItems) => {
        if (err) return next(err);

        if (!readItems) {
            ReadItems.create({ user: req.user._id })
            .then((readItems) => {
                readItems.readItems.push({ "_id": req.params.readItemId });
                readItems.save()
                .then((readItems) => {
                    console.log('Read Items created!');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(readItems.readItems);
                })
                .catch((err) => {
                    return next(err);
                });
            })
            .catch((err) => {
                return next(err);                
            })
        }
        else {
            if (readItems.readItems.indexOf(req.params.readItemId) < 0) {                
                readItems.readItems.push({ "_id": req.params.readItemId });
                readItems.save()
                .then((readItems) => {
                    console.log('Read Item Added!');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(readItems.readItems);
                })
                .catch((err) => {
                    return next(err);
                })
            }
            else {
                res.statusCode = 403;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Read Item ' + req.params.readItemId + ' already in list of read items!');                    
            }
        }
    });
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    res.end('PUT operation not supported on /readItems/'+ req.params.readItemId);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    ReadItems.findOne({ user: req.user._id }, (err, readItems) => {
        if (err) return next(err);

        console.log(readItems);
        var index = readItems.readItems.indexOf(req.params.readItemId);
        if ( index >= 0) {
            readItems.readItems.splice(index,1);
            readItems.save()
            .then((readItems) => {
                console.log('Read Item Deleted!', readItems);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(readItems.readItems);
            })
            .catch((err) => {
                return next(err);
            })
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Read Item ' + req.params.readItemId + ' not in your read items!');
        }
    });
});

module.exports = readItemsRouter;