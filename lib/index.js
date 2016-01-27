var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var Ping = require('ping-lite');

var config = {
    duration: null,
    host: null,
    interval: null
};

function check(obj) {
    var ping = new Ping(config.host);

    ping.send(function(err, duration) {
        if (err) {
            return obj.emit('down', err);
        } else if (!duration) {
            return obj.emit('down', 'Error: Response not received');
        }

        if (typeof config.duration !== 'number') {
            obj.emit('up', duration);
        } else {
            if (duration < config.duration) {
                obj.emit('up', duration);
            } else {
                obj.emit('down', 'Error: Request timed out');
            }
        }
    });
}

function Reping(host) {
    if (!(this instanceof Reping)) {
        return new Reping(host);
    }

    if (!host) {
        throw new Error('You must specify a host to ping!');
    }

    config.host = host;
}

inherits(Reping, EventEmitter);

Reping.prototype.interval = function(interval) {
    config.interval = interval;

    return this;
};

Reping.prototype.maxDuration = function(duration) {
    config.duration = duration;

    return this;
};

Reping.prototype.up = function(fn) {
    this.on('up', fn);

    return this;
};

Reping.prototype.down = function(fn) {
    this.on('down', fn);

    return this;
};

Reping.prototype.monitor = function() {
    if (!config.interval) {
        throw new Error('You must specify an interval to ping!');
    }

    var self = this;

    setInterval(function() {
        check(self);
    }, config.interval);
};

module.exports = Reping;
