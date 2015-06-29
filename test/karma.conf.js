var sharedConfig = require('./karma-shared.conf.js');

module.exports = function(config) {
  var shared = sharedConfig(config);
  shared.files.push('test/spec/unit/**/*.js');
  config.set(shared);
};
