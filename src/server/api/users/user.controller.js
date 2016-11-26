// Import model
var User = require('./user.model');
var Employee = require('../employees/employee.model');
var _ = require('lodash');

// Get list of Items
exports.index = function(req, res) {
  User.find(function (err, users) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(users);
  });
};
// Get a single user
exports.show = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    return res.json(user);
  });
};
// Get a single user
exports.login = function(req, res) {

  User.findOne({username : req.params.username}, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    return res.json(user);
  });
};
// Creates a new user in the DB.
exports.create = function(req, res) {
  Employee.findOne({dni : req.body.dni}, function (err, emp) {
    if(err) { return handleError(res, err); }
    if(!emp) { 
        return res.sendStatus(404); 
    }else{
       console.log(emp._id);
      var newuser = {};
      newuser.username = req.body.username;
      newuser.password = req.body.password;
      newuser.idemployee = emp._id;
        User.create(newuser, function(err, user) {
          if(err) { return handleError(res, err); }    
          return res.status(201).json(user);
        });      
    }    
  });
  
};
// Updates an existing user in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  User.findById(req.params.id, function (err, user) {
    if (err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(user);
    });
  });
};
// Deletes a user from the DB.
exports.delete = function(req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) { return handleError(res, err); }
    if(!user) { return res.sendStatus(404); }
    user.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.sendStatus(204);
    });
  });
};
// Error function
function handleError(res, err) {
  return res.status(500).json(err);
}