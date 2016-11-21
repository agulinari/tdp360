// Import model
var Eval = require('./eval.model');
var _ = require('lodash');
// Get list of Items
exports.index = function(req, res) {
  Eval.find(function (err, evals) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(evals);
  });
};
// Get a single eval
exports.show = function(req, res) {
  Eval.findById(req.params.id, function (err, eval) {
    if(err) { return handleError(res, err); }
    if(!eval) { return res.sendStatus(404); }
    return res.status(200).json(eval);
  });
};
// Get a single eval
exports.search = function(req, res) {
  Eval.find({ 'fullName' : new RegExp('^'+req.params.searchText+'$', "i")}, function (err, evals) {
    if(err) { return handleError(res, err); }  
    return res.status(200).json(evals);
  });
};
// Creates a new eval in the DB.
exports.create = function(req, res) {
  Eval.create(req.body, function(err, eval) {
    if(err) { return handleError(res, err); }    
  	return res.status(201).json(eval);
  });
};
// Updates an existing eval in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Eval.findById(req.params.id, function (err, eval) {
    if (err) { return handleError(res, err); }
    if(!eval) { return res.sendStatus(404); }
    var updated = _.merge(eval, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(eval);
    });
  });
};
// Deletes a eval from the DB.
exports.delete = function(req, res) {
  Eval.findById(req.params.id, function (err, eval) {
    if(err) { return handleError(res, err); }
    if(!eval) { return res.sendStatus(404); }
    eval.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}