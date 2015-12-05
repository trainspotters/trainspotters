var parse = require('csv-parse');

var OPTIONS = {
  skip_empty_lines: true,
  columns: true,
};

module.exports = {
  getRawFromStream: function(stream) {
    return new Promise(function(resolve, reject){
      var parser = parse(OPTIONS);
      var records = [];

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
  },
  getRawFromString: function(string) {
    return new Promise(function(resolve, reject) {
      parse(string, OPTIONS, function(error, records){
        if (error) {
          reject(error);
        } else {
          resolve(records);
        }
      });
    });
  },
  parseRecord: function(rawRecord) {
    return Object.assign({
      displayName: rawRecord.name,
      lat: parseFloat(rawRecord.latitude, 10),
      lng: parseFloat(rawRecord.longitude, 10),
      names: [rawRecord.name],
    });
  }
};
