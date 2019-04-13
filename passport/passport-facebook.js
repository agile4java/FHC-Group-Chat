'use strict';

const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profileFields: ['email', 'displayName', 'photos'],
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      passReqToCallback: true
    },
    (req, token, refreshToken, profile, done) => {
      User.findOne({
        facebook: profile.id
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.facebook = profile.id;
          newUser.fullname = profile.displayName;
          // get first name from fullname
          // user as username
          var nameArray = (newUser.fullname).split(" ");
          console.log(nameArray);
          newUser.username = nameArray[0];
          console.log(newUser.username);


          newUser.email = profile._json.email;
          newUser.userImage =
            'https://graph.facebook.com/' + profile.id + '/picture?type=large';
          newUser.fbTokens.push({
            token: token
          });
          newUser.save(err => {
            console.log("passport facebook login returns:");
            console.log(user);
            return done(null, newUser);
          });
        }
      });
    }
  )
);