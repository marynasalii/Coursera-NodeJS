
var express = require('express');
var bodyParser = require('body-parser');
var leaderRouter = express.Router();
var Verify = require('./verify');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
//.all(function(req,res,next) {
//      res.writeHead(200, { 'Content-Type': 'text/plain' });
//      next();
//})

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will send all the leaders to you!');
    }
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);  
    }
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Deleting all leader');
    }
});

leaderRouter.route('/:leaderId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(Verify.verifyOrdinaryUser, function(req,res,next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Will send details of the leader ' + req.params.leaderId +' to you!');
    }
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
    }
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    if(err){
        var err = new Error('You`re not authorized to perform this operation!');
        return res.status(403).json({err: err});
    } else {
        res.end('Deleting leader: ' + req.params.leaderId);
}
});
    

module.exports = leaderRouter;