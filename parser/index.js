'use strict';
var parse = require('csv-parse');
var moment = require('moment');
var stations = require('./stations.json');

var DATE_FORMAT = 'DD-MMM-YYYY H:mm';
var OPTIONS = {
  skip_empty_lines: true,
  columns: true,
};
var RECORD_TYPES = {
  topup: 'TOPUP',
  busJourney: 'BUS_JOURNEY',
  undergroundJourney: 'UNDERGROUND_JOURNEY',
};

var STATION = "[-\\w\\(\\)\\ \\,\\[\\]\\/\\'\\&]+";
var TYPE_PARSERS = [
  {
    type: RECORD_TYPES.undergroundJourney,
    regexp: new RegExp(`(${STATION}) to (${STATION})`),
    extract: function(match) {
      return {
        from: cleanStationName(match[1]),
        to: match[2] === '[No touch-out]' ? undefined : cleanStationName(match[2]),
      };
    }
  },
  {
    type: RECORD_TYPES.busJourney,
    regexp: new RegExp(`Bus journey, route (${STATION})`),
    extract: function(match) {
      return {
        route: match[1],
      };
    }
  },
  {
    type: RECORD_TYPES.topup,
    regexp: new RegExp(`Topped up, (${STATION})`),
    extract: function(match) {
      return {
        at: match[1].trim() === '' ? undefined : match[1],
      };
    }
  },
];

function cleanStationName(station) {
  return station.replace(/DLR|\[London Underground.*|\[London Overground.*|\[HS1\]|\[National Rail\]/g, '').trim();
}

function parseDescription(description) {
  return TYPE_PARSERS.reduce(function(parsed, parser){
    var match = parser.regexp.exec(description);
    if (match) {
      return Object.assign({
        type: parser.type,
      }, parser.extract(match));
    }
    return parsed;
  }, false);
}

function getCoordinateByName(name) {
  return stations.find(function(station) {
    return station.names.indexOf(name) > -1;
  });
}

function extractNumbers(rawRecord) {
  return ['Charge', 'Credit', 'Balance'].reduce(function(formatted, key){
    return Object.assign({
      [key.toLowerCase()]: rawRecord[key] ? parseFloat(rawRecord[key], 10) : undefined,
    }, formatted);
  }, {});
}

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
    var startAtMoment = moment(`${rawRecord.Date} {${rawRecord['Start Time']}}`, DATE_FORMAT);
    var endAtMoment = moment(`${rawRecord.Date} {${rawRecord['End Time']}}`, DATE_FORMAT);

    if (endAtMoment.isBefore(startAtMoment)) {
      endAtMoment = endAtMoment.add(1, 'd');
    }

    // duration of the journey in seconds
    var duration = moment.duration(endAtMoment.diff(startAtMoment)).asSeconds();

    // parse description and retrieve geo coordinate
    var journey = parseDescription(rawRecord['Journey/Action']);
    var from = getCoordinateByName(journey.from) || {};
    var to = getCoordinateByName(journey.to) || {};

    return Object.assign(
      {
        description: rawRecord['Journey/Action'],
        startAt: startAtMoment.toDate(),
        endAt: endAtMoment.toDate(),
        note: rawRecord.Note,
        duration,
        type: journey.type,
        route: journey.route,
        at: journey.at,
        from: {
          name: journey.from,
          lat: from.lat,
          lng: from.lng,
        },
        to: {
          name: journey.to,
          lat: to.lat,
          lng: to.lng,
        },
      },
      extractNumbers(rawRecord)
    );
  },
  recordTypes: RECORD_TYPES,
}
