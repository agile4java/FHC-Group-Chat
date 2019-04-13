const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, default: '' },
  fullname: { type: String, default: '' },
  password: { type: String, default: '' },
  userImage: { type: String, default: 'default.png' },
  facebook: { type: String, defualt: '' },
  fbTokens: Array,
  google: { type: String, default: '' }
});

userSchema.methods.encryptPassword = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validUserPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
