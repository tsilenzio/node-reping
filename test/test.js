var expect = require('chai').expect;
var sinon = require('sinon');
var reping = require('../index.js');

describe('reping()', function() {
    it('should fail without a host', function() {
        expect(function() {
            reping();
        }).to.throw('You must specify a host to ping!');
    });

    it('should pass with a host', function() {
        expect(function() {
            reping('google.com');
        }).to.not.throw();
    });

    describe('interval()', function() {
        it('should fail without being called', function() {
            expect(function() {
                reping('google.com').monitor();
            }).to.throw('You must specify an interval to ping!');
        });

        it('should pass when being called', function(done) {
            expect(function() {
                reping('google.com').interval(1000).monitor();
            }).to.not.throw();

            var spy = sinon.spy();

            reping('127.0.0.1')
                .interval(10)
                .on('up', spy)
                .monitor();

            setTimeout(function() {
                expect(spy.callCount).to.be.above(0);
                done();
            }, 25);
        });

        describe('on("up", function(){})', function() {
            it('should be called at least once', function(done) {
                var spy = sinon.spy();

                reping('127.0.0.1')
                    .interval(10)
                    .on('up', spy)
                    .monitor();

                setTimeout(function() {
                    expect(spy.callCount).to.be.above(0);
                    done();
                }, 25);
            });
        });

        describe('on("down", function(){})', function() {
            it('should be called at least once', function(done) {
                var spy = sinon.spy();

                reping('domain.tld')
                    .interval(10)
                    .on('down', spy)
                    .monitor();

                setTimeout(function() {
                    expect(spy.callCount).to.be.above(0);
                    done();
                }, 200);
            });
        });

        describe('maxDuration()', function() {
            it('should emit "down"', function(done) {
                var spy = sinon.spy();

                reping('127.0.0.1')
                    .interval(10)
                    .maxDuration(0.001)
                    .on('down', spy)
                    .monitor();

                setTimeout(function() {
                    expect(spy.callCount).to.be.above(0);
                    done();
                }, 25);
            });

            it('should emit "up"', function(done) {
                var spy = sinon.spy();

                reping('127.0.0.1')
                    .interval(10)
                    .maxDuration(10)
                    .on('up', spy)
                    .monitor();

                setTimeout(function() {
                    expect(spy.callCount).to.be.above(0);
                    done();
                }, 25);
            });
        });
    });
});
