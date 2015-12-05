var parser = require('./index');
var fs = require('fs');

var str = fs.readFileSync('./stations-locator/stations.csv', 'utf8');

parser.getRawFromString(str).then(function(data){
  return data.map(parser.parseRecord);
}).then(function(parsedData){
  console.log(parsedData);
}).catch(function(e){
  console.error('Meh :(', e.stack);
  process.exit(1);
});
