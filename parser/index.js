var parse = require('csv-parse');

module.exports = {
  getRaw: function(stream) {
    return new Promise(function(resolve, reject){
      var records = [];
      var parser = parse({
        skip_empty_lines: true,
        columns: true,
      });

      parser.on('readable', function(){
        var record = parser.read();

        if (record) {
          records.push(record);
        }
      });

      parser.on('finish', function(){
        resolve(records);
      });

      parser.on('error', function(error){
        reject(err);
      });

      stream.pipe(parser);
    });
  }
}
