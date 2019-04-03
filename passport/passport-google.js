'use strict';

const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
        // check if user is in database
      User.findOne({ google: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        // if profile id is in database return user
        if(user) {
            return done(null, user);
        }else{
        // if not in database add new user
            const newUser = new User();
            newUser.google = profile.id;
            newUser.fullname = profile.displayName;
            newUser.email = profile.emails[0].value;
            newUser.userImage = profile._json.image.url;
            newUser.save((err) => {
                if(err){
                    return done(err);
                }
                return done(null, newUser);
            })
        }
        
      });
    }
  )
);
