const mongoose = require('mongoose');

const groupNames = mongoose.Schema({
    name: {type: String, default: '', unique: true },
    image: {type: String, default: 'default.png'},
    members: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Group', groupNames);