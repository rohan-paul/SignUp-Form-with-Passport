const express = require('express')
const router = express.Router()
const User = require('..database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup')
})

router.post('/login',
    (req, res, next) => {
        console.log('routes/user.js, login, req.body: ')
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('loggedin', req.user);
        var userInfor = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

/* Explanation of login route above - which is also GENERAL NOTES ON HOW ROUTER WORKS IN EXPRESS

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

4> The "login" route is defined using the Router.post() method, which responds only to HTTP POST requests. The first argument to this method is the URL path while the second is a callback function that will be invoked if an HTTP POST request with the path is received.


5> The callback function passport.authenticate here calls send() on the response to return the string userInfo when we receive a POST request with the path ('/login').
There are a number of other response methods for ending the request/response cycle. For example, you could call res.json() to send a JSON response or res.sendFile() to send a file. res.render(), which creates and returns HTML files using templates and data—we'll talk a lot more about that in a later article!



*/