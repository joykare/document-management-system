var mongoose = require('mongoose');

module.exports = {
  users: [  {
      username: 'jwarugu',
      name: {
        first: 'joy',
        last: 'warugu'
      },
      email: 'jwarugu@gmail.com',
      password: 'jwarugu',
      role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
    },
    {
      username: 'skieha',
      name: {
        first: 'sylvia',
        last: 'kieha'
      },
      email: 'skieha@gmail.com',
      password: 'skieha',
      role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
    },
    {
      username: 'emabishi',
      name: {
        first: 'elizabeth',
        last: 'mabishi'
      },
      email: 'emabishi@gmail.com',
      password: 'emabishi',
      role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
    },
    {
      username: 'tbaraza',
      name: {
        first: 'tonida',
        last: '57d11f35b0a303c1186279us'
      },
      email: 'tbaraza@gmail.com',
      password: 'tbaraza',
      role: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
    }],

  roles : [{
    title: 'admin',
    _id: mongoose.Types.ObjectId('57d11f35b0a303c1186270ad')
  }, {
    title: 'user',
    _id: mongoose.Types.ObjectId('57d11f35b0a303c1186279af')
  }]



  }
