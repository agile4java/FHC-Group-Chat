'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  console.log("Entering passport.serializeUser");
  done(null, user.id);
  console.log("passport.serializeUser user.id ", user.id);
});

passport.deserializeUser((id, done) => {
  console.log("Entering passport.deserializeUser");
  User.findById(id, (err, user) => {
    console.log("Entering user.findById in passport.deserializeUser");
    done(err, user);
    console.log("deserializeUser user ", user);
  });
});

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({'email': email }, (err, user) => {
        console.log("passport.use, local.signup user.findOne");
        if (err) {
          return done(err);
        }
        if (user) {
          console.log("passport.use, user.findOne if(user)");
          return done(
            null,
            false,
            req.flash('error', 'User with email already exists')
          );
        }
        console.log("passport.use user.findOne new user");
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.password = newUser.encryptPassword(req.body.password);
        console.log("newUser = ", newUser);
        newUser.save(err => {
          done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  'local.login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({'email': email }, (err, user) => {
        console.log("passport.use, local.login user.findOne");
        if (err) {
          console.log("passport.use, local.login user.findOne, err");
          return done(err);
        }

        const messages = [];
        if (!user || !user.validUserPassword(password)) {
          console.log("passport.use, local.login user.findOne, !user or not validPassword");
          messages.push('Email is not in Database or Password is Invalid');
          return done(null, false, req.flash('error', messages));
        }
        console.log("passport.use, local.login user.findOne, return user");
        return done(null, user);
      });
    }
  )
);
