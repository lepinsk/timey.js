var sinon       = require("sinon");
var should      = require("should");
process.argv	= ["timey", "1"];
var main        = require("../main");

describe("padding", function(){
	it("pads to two digits", function(done){
		var padded = main.pad2(1);
		padded.should.equal("01");
		done();
	});

	it("pads to three digits", function(done){
		var padded = main.padToDigits(1, 3);
		padded.should.equal("001");
		done();
	});
});

describe("millisecond conversion", function(){
	it("converts a large number of milliseconds to human time correctly", function(done) {
		var humanTime = main.processMilliseconds(68390392);
		humanTime.should.equal("18:59:50.392");
		done();
	});

	it("converts millisecond-only time to human time correctly", function(done) {
		var humanTime = main.processMilliseconds(38);
		humanTime.should.equal("00:00:00.038");
		done();
	});
});

describe("human time conversion", function(){
	it("converts a regular time string correctly", function(done) {
		var msTime = main.processHumanTime("01:32:09.24");
		msTime.should.equal(5529240);
		done();
	});

	it("converts a shorter time string correctly", function(done) {
		var msTime = main.processHumanTime("32:09.24");
		msTime.should.equal(1929240);
		done();
	});

	it("converts a time string without milliseconds correctly", function(done) {
		var msTime = main.processHumanTime("01:32:09");
		msTime.should.equal(5529000);
		done();
	});

	it("converts a time string with short pairs correctly", function(done) {
		var msTime = main.processHumanTime("1:2:9.5");
		msTime.should.equal(3729500);
		done();
	});	
});