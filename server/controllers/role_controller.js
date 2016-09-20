var Role = require('../models/role');

module.exports = {
  access: function (req, res, next) {
    if (req.decoded.role.permissions === 'readwrite') {
      next();
    } else {
      res.send({message: 'You are not authorized to execute action'});
    }
  },
  get: function (req, res) {
    Role.find(function (err, roles) {
      if (err) {
        res.status(400).send({ message: 'Error occured during request' });
      } else {
        res.send(roles);
      }
    });
  },
  create: function (req, res) {
    var possibleActions = Role.schema.path('permissions').enumValues;

    var role = new Role();

    role.title = req.body.role;

    if (possibleActions.indexOf(req.body.permissions) !== -1) {
      role.permissions = req.body.permissions;

      role.save(function (err) {
        if (err) {
          if (err.code === 11000) {
            res.status(409).send({ message: 'Duplicate entry' });
          } else {
            res.status(400).send({ message: 'Error occured while saving the user' });
          }
        } else {
          res.send({ message:'Role saved' });
        }
      });
    } else {
      res.status(400).send({ message: 'Not a possible permission' });
    }
  },
  update: function(req, res) {
    var possibleActions = Role.schema.path('permissions').enumValues;

    Role.findById(req.params.role_id, function(err, role) {
      if (req.body.role) { role.title = req.body.role; }
      if (req.body.permissions) {
        if (possibleActions.indexOf(req.body.permissions) !== -1) {
          role.permissions = req.body.permissions;
        } else {
          return res.send({message: 'Not a possible permission'});
        }
      }
      role.save(function (err) {
        if (err) {
          res.status(400).send({ message: 'Error occured while saving the user' });
        } else {
          res.send({ message:'Role has been updated' });
        }
      });
    });
  },
  remove: function (req, res) {
    Role.remove({ _id: req.params.role_id}, function(err){
      if (err) {
        res.send(err);
      } else {
        res.send({message: 'Role has been deleted successfully'});
      }
    });
  }
};
