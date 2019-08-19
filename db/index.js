const mongoose = require('mongoose');
//password: qK6Z5LPqyznE31RK
//const uri = 'mongodb://localhost/noderest';



const uri = process.env.MONGODB_URI;
mongoose.connect( uri , {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose
