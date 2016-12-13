// Import model
var Employee = require('./employee.model');
var _ = require('lodash');
// Get list of Items
exports.index = function(req, res) {
  Employee.find(function (err, employees) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(employees);
  });
};
// Get a single employee
exports.show = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.sendStatus(404); }
    return res.json(employee);
  });
};
// Get a single employee
exports.filtrar = function(req, res) {
  var regex = new RegExp(req.params.text, "i"),
      query = { 'fullName' : regex };

  Employee.find('query', function (err, employees) {
    if(err) { return handleError(res, err); }  
    return res.json(employees);
  });
};
// Creates a new employee in the DB.
exports.create = function(req, res) {
  Employee.create(req.body, function(err, employee) {
    if(err) { return handleError(res, err); }    
  	return res.status(201).json(employee);
  });
};
// Updates an existing employee in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Employee.findById(req.params.id, function (err, employee) {
    if (err) { return handleError(res, err); }
    if(!employee) { return res.sendStatus(404); }
    var updated = _.merge(employee, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(employee);
    });
  });
};
// Deletes a employee from the DB.
exports.delete = function(req, res) {
  Employee.findById(req.params.id, function (err, employee) {
    if(err) { return handleError(res, err); }
    if(!employee) { return res.sendStatus(404); }
    employee.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};
// Get subordinates
exports.subs = function(req, res) {
  Employee.find({ 'jefe' : req.params.id }, function (err, employees) {
    if(err) { return handleError(res, err); }  
    return res.status(200).json(employees);
  });
};

// Get by area
exports.area = function(req, res) {
  Employee.find({ 'area' : req.params.area}, function (err, employees) {
    if(err) { return handleError(res, err); }  
    return res.status(200).json(employees);
  });
};

// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}