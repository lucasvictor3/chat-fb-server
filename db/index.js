const mongoose = require('mongoose');
//password: qK6Z5LPqyznE31RK
//const uri = 'mongodb://localhost/noderest';
const uri = "mongodb+srv://lucasvictor3:qK6Z5LPqyznE31RK@cluster0-uxydw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect( uri , {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose
