var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify = require('./verify');
var bodyParser = require('body-parser');

//router.use(bodyParser.json());

//router.route('/')

router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        User.find({}, function (err, user) {
        if (err) throw err;
        res.json(user);
    })
    } 
})

//.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    if(err){
//        var err = new Error('You`re not authorized to perform this operation!');
//        return res.status(403).json({err: err});
//    } else {
//        res.end('Sending users to you!');
//    }   
//})
//
//.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    if(err){
//        var err = new Error('You`re not authorized to perform this operation!');
//        return res.status(403).json({err: err});
//    } else{
//        res.end('Sending users to you!');
//    }   
//})
//
//.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
//    if(err){
//        var err = new Error('You`re not authorized to perform this operation!');
//        return res.status(403).json({err: err});
//    } else{
//        res.end('Sending users to you!');
//    }   
//})

/* GET users listing. */

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username }),
      req.body.password, function(err, user) {
        if (err) {
            return res.status(500).json({err: err});
        }
        passport.authenticate('local')(req, res, function () {
            return res.status(200).json({status: 'Registration Successful!'});
        });
    });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    // users pass is wrong or something else
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
        // if login is successful
        // return token for the specific user
      var token = Verify.getToken(user);
              res.status(200).json({
        status: 'Login successful!',
        success: true,
        // return token here
        token: token
      });
    });
  })(req,res,next);
});

router.get('/logout', function(req, res) {
    req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;

// file used to support users