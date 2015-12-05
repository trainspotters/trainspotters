var parser = require('./index');
var assert = require('assert');

parser.getRaw(process.stdin).then(function(data){
  console.log('Got data!\n', data);
}).catch(function(err){
  console.error('Meh :(', err);
  process.exit(1);
});
