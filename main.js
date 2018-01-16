// timey.js
// 2018 Julian Lepinski

//////////////////////////
// extremely core logic //
//////////////////////////

if (process.argv.length === 3 && process.argv[0].indexOf("node") !== -1) {
	process.argv.shift();
}

if (process.argv.length === 2) {
	var timeIn = process.argv[1];
	if (timeIn.indexOf(":") !== -1 || timeIn.indexOf(".") !== -1) {
		var timeInOrig = timeIn;
		var timeInMS = processHumanTime(timeIn);
		console.log(timeInOrig + " in milliseconds is " + timeInMS);
	} else {
		var timeInOrig = timeIn;
		var timeInHuman = processMilliseconds(timeIn);
		console.log(timeInOrig + "ms in human time is " + timeInHuman);
	}
} else {
	console.log("whoops: timey expects a single argument, i.e.");
	console.log("");
	console.log("   timey 01:02:03");
	console.log("or");
	console.log("   timey 230000");
	process.exit(1);
}

//////////////////////////////
// conversion & convenience //
//////////////////////////////

function processHumanTime(timeIn) {
	var msComponent = 0;
	var sComponent = 0;
	var mComponent = 0;
	var hComponent = 0;
	if (timeIn.indexOf(".") !== -1) {
		var timeSplit = timeIn.split(".");
		msComponent = parseFloat("0." + timeSplit[1]);
		msComponent = msComponent * 1000.0;
		timeIn = timeSplit[0];
	}
	var colonSplit = timeIn.split(":");
	sComponent = parseInt(colonSplit.pop());
	if (colonSplit.length > 0) {
		mComponent = parseInt(colonSplit.pop());
	}
	if (colonSplit.length > 0) {
		hComponent = parseInt(colonSplit.pop());
	}
	var timeInMS = (hComponent * 60 * 60000) + (mComponent * 60000) + (sComponent * 1000) + msComponent;
	timeInMS = parseInt(timeInMS);
	return timeInMS;
}

function processMilliseconds(msIn) {
	var hComponent = ~~(msIn / (60 * 60000));
	msIn -= hComponent * (60 * 60000);
	var mComponent = ~~(msIn / 60000);
	msIn -= mComponent * 60000;
	var sComponent = ~~(msIn / 1000);
	var msComponent = msIn % 1000;
	var humanReadable = 	pad2(hComponent) + ":" + 
							pad2(mComponent) + ":" +
							pad2(sComponent) + "." +
							padToDigits(msComponent, 3);
	return humanReadable;
}

function pad2(numberIn) {
	return padToDigits(numberIn, 2);
}

function padToDigits(numberIn, digits) {
	numberIn = "" + numberIn;
	while (numberIn.length < digits) {
		numberIn = "0" + numberIn;
	}
	return numberIn;
}

/////////////////////////
// exports for testing //
/////////////////////////

module.exports = {
  pad2: pad2,
  padToDigits: padToDigits,
  processHumanTime: processHumanTime,
  processMilliseconds: processMilliseconds
};