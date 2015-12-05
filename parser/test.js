var parser = require('./index');
var assert = require('assert');

parser.getRawFromStream(process.stdin).then(function(data){
  console.log(`Got ${data.length} raw records:\n`, data);

  return data.map(parser.parseRecord);
}).then(function(parsedData){
  console.log(`Parsed ${parsedData.length} records:\n`, parsedData);
}).catch(function(err){
  console.error('Meh :(', err.stack);
  process.exit(1);
});
