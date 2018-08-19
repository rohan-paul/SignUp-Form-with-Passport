const mongoose = require('mongoose')
mongoose.Promise = global.Promise

/*
Mongoose 5 uses Node.js' native promises by default.

mongoose.Promise === global.Promise; // true

The mongoose.Promise property is still supported. You can still make mongoose always return bluebird promises with the below code.

mongoose.Promise = require('bluebird');
mongoose.Promise === require('bluebird'); // true in 5.x, false in 4.x

On a related note, since mpromise is no longer supported, mongoose.Promise now contains the actual promise constructor. In other words, mongoose.Promise is no longer a compatibility layer that reconciles mpromise and ES6 promises, it is strictly equal to the promise constructor.
*/

// mongodb database connection (standard boilerplate mongo connection code)
const uri = 'mongodb://localhost:27017/mern-postman-login'

mongoose.connect(uri)
    .then(() => console.log("Mongodb connection estrablished"))
    .catch(err => console.log(err))

module.exports = mongoose.connection;