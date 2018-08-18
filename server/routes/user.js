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

1> next() =>> You could have multiple routes that match an incoming request. Routes are executed from top to bottom. If a route matches an incoming request, subsequent routes that match the incoming request won’t be hit if you don’t call next().

http://www.passportjs.org/docs/downloads/html/ -


2> The "login" route is defined using the Router.post() method, which responds only to HTTP POST requests. The first argument to this method is the URL path while the second is a callback function that will be invoked if an HTTP POST request with the path is received.


3> The callback function passport.authenticate here calls send() on the response to return the string userInfo when we receive a POST request with the path ('/login'). 
There are a number of other response methods for ending the request/response cycle. For example, you could call res.json() to send a JSON response or res.sendFile() to send a file. res.render(), which creates and returns HTML files using templates and data—we'll talk a lot more about that in a later article!



*/