const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const session = require('session')

const dbConnection = require('./database')
/* MongoStore allows me to store the Express sessions into MongoDB instead of using the MemoryStore, which is not designed for a production environment. I do it down below where I am calling express-session's session function and within the object that I am passing to session, the store variable inside the object is for setting MongoDB as my backend, for persisting the application session in my database.
Note - express-session by default uses a MemoryStore (in-memory key-value store for storing session data) implementation that is only designed for development environments, but cant scale in production, as after few user logins it can no more handle all those session data and will crash wiping out all session data
connect-mongo will store my user sessions in my db in a collection named sessions and takes care of removing them based on the maxAge of the cookie configuration for the session. */


const MongoStore = require('connect-mongo')(session)
const passport = require('./passport')
const app = express()
const PORT = 8080

const user = require('./routes/user')

app.use(morgan('dev'));

/* Create a new morgan logger middleware function using the given format and options. Concise output colored by response status for development use.

However, looking at the Morgan documentation (https://www.npmjs.com/package/morgan) I see many useful pre-defined formats. The combined setting is very useful for logging production bugs - it provides user agent info. So, I could change my above middleware declaration as below.

if (app.get('env') === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}
*/

app.use(bodyParser.urlencoded({extended: false}));

/* - The above for parsing application/x-www-form-urlencoded. Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) and exposes the resulting object (containing the keys and values) on req.body.

https://www.npmjs.com/package/body-parser#bodyparserurlencodedoptions - Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option. The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. */


app.use(bodyParser.json()); // for parsing application/json

// express-session management
app.use(
    session({
        secret: 'green-india',  //pick a random string to make the hash that is generated secure
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
)

/* We're importing the [session function](https://github.com/expressjs/session/blob/master/session/session.js#L24) from the express-session NPM module and passing the session function a configuration object to set properties inside the object passed to express-session. Note **express-session**, requires an object as an argument to initialize it.

Note, We use sessions to maintain state between user requests and we use cookies to transport the session ID between those requests.

**Secret**. Required option. This is a value used in the signing of the session ID cookie, that is stored in the cookie.

**Store**. I’m using MongoDB as my backend, and I want to persist the application sessions in my database, so I am using the connect-mongo NPM module and setting the session store value to an instance of this module.

**resave** - Forces the session to be saved back to the session store, even if the session was never modified during the request. Depending on your store this may be necessary, but it can also create race conditions where a client makes two parallel requests to your server and changes made to the session in one request may get overwritten when the other request ends, even if it made no changes (this behavior also depends on what store you're using). Typically, you'll want false.
How do I know if this is necessary for my store? The best way to know is to check with your store if it implements the touch method. If it does, then you can safely set resave: false. If it does not implement the touch method and your store sets an expiration date on stored sessions, then you likely need resave: true.

**saveUninitialized** - Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with race conditions where a client makes multiple parallel requests without a session. */

// From official doc - https://github.com/jaredhanson/passport#middleware - To use Passport in an Express or Connect-based application, configure it with the required passport.initialize() middleware. If your application uses persistent login sessions (recommended, but not required), passport.session() middleware must also be used.
app.use(passport.initialize())
app.use(passport.session())


// set the single Routes
app.use('/user', user)

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT} `)
})