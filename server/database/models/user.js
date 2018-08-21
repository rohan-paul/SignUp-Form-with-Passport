const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
mongoose.promise = Promise;

/*
Mongoose 5 uses Node.js' native promises by default.

mongoose.Promise === global.Promise; // true

The mongoose.Promise property is still supported. You can still make mongoose always return bluebird promises with the below code.

mongoose.Promise = require('bluebird');
mongoose.Promise === require('bluebird'); // true in 5.x, false in 4.x

On a related note, since mpromise is no longer supported, mongoose.Promise now contains the actual promise constructor. In other words, mongoose.Promise is no longer a compatibility layer that reconciles mpromise and ES6 promises, it is strictly equal to the promise constructor.
*/


const userSchema = new Schema({
    username: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: false }
})

// Defining Schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}


/* The hashPassword method does just what it says, it hashes the password. The first argument is the password to hash, and the second parameter is the salt length to generate (integer). */

// Defining hooks for pre-saving
userSchema.pre('save', (next) => {
    if(!this.password) {
        console.log('models/user.js ========NO PASSWORD PROVIDED==========')
        next()
    } else {
        console.log('models/user.js hashPassword in pre save')
        this.password = this.hashPassword(this.password)
        next()
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;

/* “pre” and “post” hooks  - They tie particular functions to particular lifecycle and query events. This middleware is defined on the schema level and can modify the query or the document itself as it is executed.

This middleware is invoked with two arguments: the event trigger (as a string, e.g. 'save') and the callback function that is triggered for that particular event. The callback itself takes in an argument of a function, which we typically call next , and when invoked — advances the document/query to the next awaiting middleware.

So what the below function does is - Before mongoose saves a document in the database, we want to hash the password, using the hashPassword method. This is serial middleware, so the next() function is needed to move on to the next middleware method.

*/