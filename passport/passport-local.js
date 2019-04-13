'use strict';

const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
    console.log(err);
  });
});

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({'username': username }, (err, user) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        if (user) {
          return done(
            null,
            false,
            req.flash('error', 'User with username already exists')
          );
        }
        const newUser = new User();
        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(req.body.password);
        newUser.save(err => {
          console.log(err);
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
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({'username': username }, (err, user) => {
        if (err) {
          return done(err);
        }

        const messages = [];
        if (!user || !user.validUserPassword(password)) {
          messages.push('Username is not in Database or Password is Invalid');
          return done(null, false, req.flash('error', messages));
        }
        console.log(user);
        return done(null, user);
      });
    }
  )
);
