# Reping

IPv4 Monitoring with IPv6 and HTTP support coming soon

## Usage

```js
var reping = require('reping');

reping('google.com')
    .interval(5000)
    .on('up', function(info) {
        console.log(info.time + ' ms');
     })
    .on('down', function(error) {
        console.log(error);
    })
    .monitor();
```

Both "up" and "down" are optional.

Check if response is back under maximum duration:

```js
var reping = require('reping');

reping('google.com')
    .interval(5000)
    .maxDuration(1000)
    .on('up', function(info) {
        console.log(info.time + ' ms');
     })
     .monitor();
```

## Installation

```
$ npm install reping
```

## Test

```
$ npm install
$ npm run test
```

## Todo

* Support IPv6
* Support HTTP

## License

MIT License
