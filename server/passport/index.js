const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')

/* Key Point - When you log in, passport will put the user object (username and password and whatever else you’re saving — email, etc) into req.session.passport.user with the serializeUser() method. Then on future requests, you don’t need to ask the user to log in again for the life of the session.

Important Key Point - The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

Passport will maintain persistent login sessions. In order for persistent sessions to work, the authenticated user must be serialized to the session, and deserialized when subsequent requests are made.

Passport does not impose any restrictions on how your user records are stored. Instead, you provide functions to Passport which implements the necessary serialization and deserialization logic. In a typical application, this will be as simple as serializing the user ID, and finding the user by ID when deserializing.

Passport supports storing the user information in the session if your app supports it.  passport attaches the profile information to req.user. This occurs as a direct result of the serializeUser() and deserializeUser() functions. - https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead

Question - 1 - Where does user.id go after passport.serializeUser has been called?

Ans - The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines, which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id:'xyz'}

Question-2 - We are calling passport.deserializeUser right after it where does it fit in the workflow?

The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with that in memory array / database or any data resource.

*/
passport.serializeUser((user, done) => {
    // console.log('***serialization called, user: '); // only for debugging to see result in terminal
    // console.log(user); // the whole raw user object - only for debugging to see result in terminal
    done(null, { _id: user._id})
})

/* Then in deserializeUser(), the first argument is an id which is the same id that was passed in done(null, user.id) of serializeUser(). deserializeUser() then makes a request to our DB to find the full profile information for the user and then calls done(null, user). This is where the user profile is attached to the request handler at req.user. Then finally after all this occurs, the user is routed back to the /login/google/return route handler where we can finally access the user profile information on req.user. - https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead */

passport.deserializeUser((id, done) => {
    console.log('DeserializeUser called')
    User.findOne(
        {_id: id},
        'username',
        (err, user) => {
            console.log('*** Deserialize called, user: '); // only for debugging to see result in terminal
            console.log(user); // the whole raw user object - only for debugging to see result in terminal
            done(null, user)
        }
    )
})

// Use Strategies
passport.use(LocalStrategy);

module.exports = passport