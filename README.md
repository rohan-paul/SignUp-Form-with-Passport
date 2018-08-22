## Simple MERN Passport Template for a sign-in and sign-up form built with Mongo, Express, ReactJS, Node.js.

For authentication, I am using passport-local strategy and for salting, I am using bcrypt

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


### Installing Run these commands in the terminal:

```
npm install
npm run dev
```
### Completed Features

- [ ] Sign up, login and logout.
- [ ] Authentication with passport and bcryptjs.
- [ ] Session information stored with express sessions.
- [ ] Store data for production in sessions with connect-mongo


# [Actual workflow in this super basic sign-up form](https://github.com/rohan-paul/SignUp-Form-with-Passport)

### Step-1

[From components/login-form.js](https://github.com/rohan-paul/SignUp-Form-with-Passport/blob/master/src/components/login-form.js) comes the request from user's browsers to the server for logging in with axios.post

```js
handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                console.log('login response: ')
                console.log(response)
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username
                    })
                    // update the state to redirect to home
                    this.setState({
                        redirectTo: '/'
                    })
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);

            })
    }

```
### Step-2
This request is registered in the relevant server route (/user/login) being handled at the file [routes/user.js](https://github.com/rohan-paul/SignUp-Form-with-Passport/blob/master/server/routes/user.js)

1> The HTTP post request is performed by calling axios.post(). In its first parameter we’re passing in the URI of the service endpoint. In the second parameter, we’re passing in the full user object which contains the properties of the user: username and password. By default these two properties are set to be empty string

2> **https://www.sitepoint.com/axios-beginner-guide/ - Good explanation**

The post, put, and patch methods take a data object as their second argument, and an optional config object as the third

### The response object

When the request is successful, your then() callback will receive a response object with the following properties:

data: the payload returned from the server. By default, Axios expects JSON and will parse this back into a JavaScript object for you.
status: the HTTP code returned from the server.
statusText: the HTTP status message returned by the server.
headers: all the headers sent back by the server.
config: the original request configuration.
request: the actual XMLHttpRequest object (when running in a browser).

```js
router.post('/login',
    (req, res, next) => {
        console.log('routes/user.js, login, req.body: ')
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('loggedin', req.user);
    /* the  above line is only for debugging and will print the below in Terminal
        logged in { _id: 5b7a79a545de52523ea1a482,
        username: 'rohanpaul2@gmail.com',
        password: '$2a$10$9eC8kXcVduG3885FLT1AweYIYsfvwLUIFJ65lvIvUZQZhcWpL6H0q',
 } */
        var userInfor = {
            username: req.user.username
        };
        res.send(userInfo)
    }
)

```
### Step-3

[In the above file routes/user.js](https://github.com/rohan-paul/SignUp-Form-with-Passport/blob/master/server/routes/user.js)

 I have ``passport.authenticate()`` - http://www.passportjs.org/docs/downloads/html/ -


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

By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the **req.user** property will be set to the authenticated user.

4> The "login" route is defined using the router.post() method, which responds only to HTTP POST requests. The first argument to this method is the URL path while the second is a callback function that will be invoked if an HTTP POST request with the path is received.


### To check the database for the saved user credentials of all the users

### show dbs

### use mern-postman-login

### show collections

### db.users.find().pretty()

And there I will see all my user credentials as below and note all the password are saved in databased as hashed version and not plain-text version

```js
{
	"_id" : ObjectId("5b7b13745a07863a8f9e9968"),
	"username" : "rohanpaul7@gmail.com",
	"password" : "$2a$10$14/sYphKOKiGhO5/NtrqBO92G2ZrIKt/dAs5E0jtY1lPsSSFfa/Uq",
	"__v" : 0
}
{
	"_id" : ObjectId("5b7b2196aa200647aa5a4948"),
	"username" : "rohanpaul8@gmail.com",
	"password" : "$2a$10$FU49Yn5iAYb1w57T5EVXXOCy6bYUxNYFFcN10B/m.MokzpmaXBTkm",
	"__v" : 0
}
{
	"_id" : ObjectId("5b7b21c6ae32ee481c300184"),
	"username" : "rohanpaul9@gmail.com",
	"password" : "$2a$10$e135TAf62l5jdDnk2/UyM.3iEyaRXyTLPxY0LbnVruY1qUN1eixT6",
	"__v" : 0
}

```

So, initially I was having issues here, when password was being saved in database in plaintext format. And so when logging in, was getting **the server responded with a status of 401 (Unauthorized)** error. As soon, as I refactored the code in `` ../database/models/index.js`` this issue was resolved.