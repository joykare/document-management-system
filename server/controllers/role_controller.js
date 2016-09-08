var Role = require('../models/role');

module.exports = {
  get: function(req, res){
    Role.find(function(err, roles){
      if (err) {
        res.status(400).send({message: 'Error occured during request'});
      } else {
        res.json(roles);
      }
    })
  },

  create: function(req, res){
    var possibleRoles = Role.schema.path('title').enumValues;
    console.log(Role.schema.path('title').enumValues);

    var role = new Role();

    if (possibleRoles.indexOf(req.body.role) !== -1) {
        role.title = req.body.role;
    } else {
      res.status(400).send({message: 'Is not an allowable role'});
    }

    role.save(function(err){
      if (err){
        res.send(err);
      }
      else {
        res.send({message:'Role saved'});
      }
    });
  }
}
