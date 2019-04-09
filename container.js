const dependable = require('dependable');
const path = require('path');

const container = dependable.container();

const simpleDependencies = [
  ['_', 'lodash'],
  ['passport', 'passport'],
  ['Group', './models/groups'],
  ['async', 'async'],
  ['formidable', 'formidable'],
  ['aws', './helpers/AWSUpload']
];

simpleDependencies.forEach(function (val) {
  // val 0 is from above simpleDependencies
  // which is the abbrev eg "_"
  // val 1 is the translation from above
  // eg "loadash"
  container.register(val[0], function () {
    return require(val[1]);
  });
});

// load any functions exported in files in these folders
container.load(path.join(__dirname, '/controllers'));
container.load(path.join(__dirname, '/helpers'));

// register everything above to container
container.register('container', function () {
  return container;
});

module.exports = container;