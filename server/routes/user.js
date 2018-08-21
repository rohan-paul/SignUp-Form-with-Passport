const express = require('express')
const router = express.Router()
const User = require('..database/models/user')
const passport = require('../passport')

// route for signing-up a new user
router.post('/', (req, res) => {
    console.log('user signup')

    // from req.body - which will be { username: 'rohanpaul2@gmail.com', password: '123456' }
    // assign the username and password variable with ES-6-destructuring to be equal the value of req.body.username and req.body.password respectively
    const { username, password } = req.body;

    // check to see that new user does not exists in the database and also there's no error while creating the new user
    // Only after these two checks save the user in the database
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js posting error: ', err);
        } else if (user) {
                res.json({
                    error: `Sorry, that username already exists with ${username}`
                })
            } else {
                const newUser = new User({
                    username: username,
                    password: password
                })
                newUser.save((err, savedUser) => {
                    if(err) return res.json(err)
                    res.json(savedUser)
                })
            }
    })
})

// For logging-in a user who is already signed-up
router.post('/login',
    (req, res, next) => {
        console.log('routes/user.js, login, the value of req.body is: ') // line only for debugging for me
        console.log(req.body)
        /* the above is only for debugging and will print in the terminal -  { username: 'rohanpaul2@gmail.com', password: '123456' }  */
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('loggedin', req.user);
        /* the  above line is only for debugging and will print the below in Terminal
        logged in { _id: 5b7a79a545de52523ea1a482,
        username: 'rohanpaul2@gmail.com',
        password: '$2a$10$9eC8kXcVduG3885FLT1AweYIYsfvwLUIFJ65lvIvUZQZhcWpL6H0q',
 }
*/
        var userInfor = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

// Only a get route to see the user
router.get('/', (req, res, next) => {
    console.log('*****user*****')
    console.log(req.user) ;
    if (req.user) {
        res.json({user: req.user})
    } else {
        res.json({user: null})
    }
})

// route for logging out the user. So this router will handle axios.post('/user/logout') request coming from client
router.post('/logout', (req, res) => {
    if (req.user) {
        // console.log('Before logging out see the contents of req.body');
        // console.log(req.body);
        // req.logout()
        res.send({ msg: 'loggging out' })
    } else {
        res.send({msg: 'no user to logout'})
    }








/* Explanation of login route ('/login') above - which is also GENERAL NOTES ON HOW ROUTER WORKS IN EXPRESS

1> next() =>> You could have multiple routes that match an incoming request. Routes are executed from top to bottom. If a route matches an incoming request, subsequent routes that match the incoming request won’t be hit if you don’t call next(). Calling ``next()`` allows “the buck to NOT stop here”.

2> Also express.Router middleware as it allows us to group the route handlers for a particular part of a site together and access them using a common route-prefix. So in this case, the first callback function to router.post takes an object to which I pass three handlers.

3> passport.authenticate() - http://www.passportjs.org/docs/downloads/html/ -


Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ (  its first parameter, in this case 'local' ). authenticate()'s function signature is standard Connect middleware, which makes it convenient to use as route middleware in Express applications.

```js
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
```

By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.

4> The "login" route is defined using the router.post() method, which responds only to HTTP POST requests. The first argument to this method is the URL path while the second is a callback function that will be invoked if an HTTP POST request with the path is received.


5> The callback function passport.authenticate here calls send() on the response to return the string userInfo when we receive a POST request with the path ('/login').
There are a number of other response methods for ending the request/response cycle. For example, you could call res.json() to send a JSON response or res.sendFile() to send a file. res.render(), which creates and returns HTML files using templates and data—we'll talk a lot more about that in a later article!

6> User.findOne() - https://mongoosejs.com/docs/api.html#model_Model.findOne

Model.findOne()

Parameters
[conditions] «Object»
[projection] «Object|String» optional fields to return, see Query.prototype.select()
[options] «Object» optional see Query.prototype.setOptions()
[callback] «Function»
Returns:
«Query»
Finds one document.

The conditions are cast to their respective SchemaTypes before the command is sent.

// find one iphone adventures - iphone adventures??
Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
*/