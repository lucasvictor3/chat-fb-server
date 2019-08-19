const mongoose = require('mongoose');


const uri = process.env.MONGODB_URI;
mongoose.connect( uri , {useNewUrlParser: true});
mongoose.Promise = global.Promise;

module.exports = mongoose
