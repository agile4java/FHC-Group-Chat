const mongoose = require('mongoose');

const groupNames = mongoose.Schema({
    name: {type: String, default: ''},
    image: {type: String, default: 'default.png'},
    members: [{
        username: {type: String, default: ''},
        email: {type: String, default: ''}
    }]
});

module.exports = mongoose.model('Group', groupNames);