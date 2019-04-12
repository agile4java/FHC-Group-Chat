'use strict';

module.exports = function() {
  return {
    SignUpValidation: (req, res, next) => {
      req.checkBody('username', 'Username is Required').notEmpty();
      req
        .checkBody('username', 'Username must be at least 3 characters')
        .isLength({ min: 3 });
     
      req.checkBody('password', 'Password is Required').notEmpty();

      req
        .getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          res.redirect('/signup');
        })
        .catch(err => {
          return next();
        });
    },

    LoginValidation: (req, res, next) => {
      req.checkBody('username', 'Username is Required').notEmpty();
    
      req.checkBody('password', 'Password is Required').notEmpty();

      req
        .getValidationResult()
        .then(result => {
          const errors = result.array();
          const messages = [];
          errors.forEach(error => {
            messages.push(error.msg);
          });

          req.flash('error', messages);
          res.redirect('/');
        })
        .catch(err => {
          return next();
        });
    }
  };
};
