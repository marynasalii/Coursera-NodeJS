var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('../models/favorites');
var Verify = require('./verify');
var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')

.all(Verify.verifyOrdinaryUser)

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    // find only for the user with the current token
    Favorites.find({'postedBy': req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.update({'postedBy': req.decoded._doc._id},
        { $push: { dishes: req.body._id } },
        { upsert: true },
        function(err, favorite) {
            if (err) throw err;
            res.json(favorite);
    }
    );
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findById(req.params.dishId, function (err, favorite) {
      if (err) throw err;
        favorite.remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
    });
});



module.exports = favoriteRouter;