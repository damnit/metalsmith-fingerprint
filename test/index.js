var assertDir = require('assert-dir-equal');
var fingerprint = require('../');
var Metalsmith = require('metalsmith');
require('should');

describe('metalsmith-fingerprint', function(){

    it('should fingerprint the file', function(done){
        Metalsmith('test/fixtures/basic')
            .use(fingerprint({ pattern: 'hello.txt' }))
            .use(function(files, metalsmith, done){
                console.log(metalsmith.metadata().fingerprint['hello.txt']);
                metalsmith.metadata().fingerprint['hello.txt'].should.equal('hello-22fd426562ac8a95a381a563d22ed04d.txt');
                return process.nextTick(done)
            })
            .build(function(err){
                if (err) return done(err)
                assertDir('test/fixtures/basic/expected', 'test/fixtures/basic/build')
                return done(null)
        })
    })

})
