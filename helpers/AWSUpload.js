const AWS = require('aws-sdk');
const multer = require('multer');
const multers3 = require('multer-s3');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});

const S0 = new AWS.S3({});
const upload = multer({
    storage: multers3({
        s3: S0,
        bucket: 'fhc-group-chat',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldName })
        },
        key: function(req, file, cb) {
            cb(null, file.originalname);
        },
        rename: function(fieldName, fileName) {
            return fileName.replace(/\W+/g, '-');
        }
    })
});

exports.Upload = upload;
