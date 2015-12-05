# TfL csv parser

Features:

* Extract raw JSON blobs from TFL CSVs (fro stream or string)
* Parse raw records to usable objects

Todo:

- [ ] Handle next day exit

## Usage

```js
var parser = require('parser');

parser.getRawFromStream(process.stdin)
// or parser.getRawFromString('<csv content>')
  .then(function(rawRecords){
  /*
  rawRecords ~= [
    {
      Date: '24-Nov-2015',
      'Start Time': '20:58',
      'End Time': '21:23',
      'Journey/Action': 'Shepherd\'s Bush (Central line) to Liverpool Street [London Underground]',
      Charge: '2.30',
      Credit: '',
      Balance: '14.60',
      Note: ''
    },
    {
      Date: '24-Nov-2015',
      'Start Time': '18:35',
      'End Time': '19:11',
      'Journey/Action': 'Old Street to Shepherd\'s Bush (Central line)',
      Charge: '2.90',
      Credit: '',
      Balance: '16.90',
      Note: ''
    }
  ];

  */

   return rawRecords.map(parser.parseRecord);
}).then(function(records) {
  /*

  records ~= [
    {
      description: 'Shepherd\'s Bush (Central line) to Liverpool Street [London Underground]',
      startAt: Tue Nov 24 2015 20:58:00 GMT+0000 (GMT),
      endAt: Tue Nov 24 2015 21:23:00 GMT+0000 (GMT),
      note: '',
      type: 'UNDERGROUND_JOURNEY',
      from: 'Shepherd\'s Bush (Central line)',
      to: 'Liverpool Street [London Underground]',
      balance: 14.6,
      credit: undefined,
      charge: 2.3
    },
    {
      description: 'Old Street to Shepherd\'s Bush (Central line)',
      startAt: Tue Nov 24 2015 18:35:00 GMT+0000 (GMT),
      endAt: Tue Nov 24 2015 19:11:00 GMT+0000 (GMT),
      note: '',
      type: 'UNDERGROUND_JOURNEY',
      from: 'Old Street',
      to: 'Shepherd\'s Bush (Central line)',
      balance: 16.9,
      credit: undefined,
      charge: 2.9
    }
  ];
  */
});
```
