// Import model
var Instance = require('./instance.model');
var _ = require('lodash');
// Get list of Items
exports.index = function(req, res) {
  Instance.find(function (err, instances) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(instances);
  });
};
// Get a single instances
exports.show = function(req, res) {
  Instance.findById(req.params.id, function (err, instances) {
    if(err) { return handleError(res, err); }
    if(!instances) { return res.sendStatus(404); }
    return res.json(instances);
  });
};

exports.search = function(req, res) {
  Instance.find({ 'evaluador' : req.params.id }).
  where('status').ne('F').
  exec(function (err, instances) {
    if(err) { return handleError(res, err); }  
    return res.status(200).json(instances);
  });
};

exports.stats = function(req, res) {
  Instance.find({'evaluado' : req.params.id }).
  where('status').equals('F').
  exec(function (err, instances) {
    if(err) { return handleError(res, err); }  
    return res.status(200).json(instances);
  });
};

// Creates a new instances in the DB.
exports.create = function(req, res) {
  Instance.create(req.body, function(err, instances) {
    if(err) { return handleError(res, err); }    
  	return res.status(201).json(instances);
  });
};
// Updates an existing instances in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Instance.findById(req.params.id, function (err, instances) {
    if (err) { return handleError(res, err); }
    if(!instances) { return res.sendStatus(404); }
    var updated = _.merge(instances, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(instances);
    });
  });
};
// Deletes a instances from the DB.
exports.delete = function(req, res) {
  Instance.findById(req.params.id, function (err, instances) {
    if(err) { return handleError(res, err); }
    if(!instances) { return res.sendStatus(404); }
    instances.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};

// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}