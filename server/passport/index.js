const passport = require('passport')
const LocalStrategy = require('./localStrategy')
const User = require('../database/models/user')

/* called on login, saves the id to session req.session.passport.user = {id:'..'}

passport attaches the profile information to req.user. This occurs as a direct result of the serializeUser() and deserializeUser() functions. - https://hackernoon.com/passportjs-the-confusing-parts-explained-edca874ebead */

