
var express = require('express');
var bodyParser = require('body-parser');
var promoRouter = express.Router();
var Verify = require('./verify');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
//.all(function(req,res,next) {
//      res.writeHead(200, { 'Content-Type': 'text/plain' });
//      next();
//})

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will send all the promotions to you!');
    }
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);   
    }
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Deleting all promotions');
    }
});

promoRouter.route('/:promoId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
    }
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.write('Updating the promotion: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
    }
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Deleting promotion: ' + req.params.promoId);
    }
});
    

module.exports = promoRouter;