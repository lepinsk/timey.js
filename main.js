// timey.js
// 2018 Julian Lepinski

//////////////////////////
// extremely core logic //
//////////////////////////

if (process.argv.length === 3 && process.argv[0].indexOf("node") !== -1) {
	// when running this with the "node main.js xxx" command, 
	// we pop off the first param so the next part works properly
	process.argv.shift();
}

if (process.argv.length === 2) {
	var timeIn = process.argv[1];
	var inputType = parseTimeInput(timeIn);
	if (inputType === "human") {
		var timeInOrig = timeIn;
		var timeInMS = processHumanTime(timeIn);
		console.log(timeInOrig + " in milliseconds is " + timeInMS);
	} else if (inputType === "ms") {
		var timeInOrig = timeIn;
		var timeInHuman = processMilliseconds(timeIn);
		console.log(timeInOrig + "ms in human time is " + timeInHuman);
	} else {
		console.log("whoops: timey can't interpret '" + timeIn + "'");
		console.log("timey expects a single argument, i.e.");
		console.log("");
		console.log("   timey 01:02:03");
		console.log("or");
		console.log("   timey 230000");
		process.exit(1);
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

/**
 * Processes a human-readable (i.e. 03:04.20) time string and 
 * returns the time in milliseconds.
 * @param {string} timeIn - A formatted time value
 * @returns {integer} The time in milliseconds
 */
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

/**
 * Processes a time in millseconds and returns
 * it in a human-readable format
 * @param {integer} msIn - A time value in milliseconds
 * @returns {string} A formatted time string
 */
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

/**
 * Left-pads a number with zeroes to two digits;
 * returns the number untouched if it's >= 2 digits.
 * @param {integer} numberIn - The number to pad
 * @returns {string} The number, padded to 2 digits
 */
function pad2(numberIn) {
	return padToDigits(numberIn, 2);
}

/**
 * Left-pads a number with zeroes to an arbitrary number of digits;
 * returns the number untouched if its length is >= the digits value.
 * @param {integer} numberIn - The number to pad
 * @param {integer} digits – The number of digits to pad to
 * @returns {string} The number, padded
 */
function padToDigits(numberIn, digits) {
	numberIn = "" + numberIn;
	while (numberIn.length < digits) {
		numberIn = "0" + numberIn;
	}
	return numberIn;
}

/**
 * Parses a time value to determine whether it is 
 * formatted, or milliseconds (or invalid)
 * @param {string} timeInput - The input to parse
 * @returns {string} "human" if human input, "ms" if milliseconds,
 * and null if invalid / unparseable
 */
function parseTimeInput(timeInput) {
	// we're looking for a string that is digit groups separated by at least
	// one colon, and optionally one final group separated by a period
	var humanRx = /(\d{1,2}:)?\d{1,2}:\d{1,2}(\.\d+)?/g;
	
	// we're looking for a string that is *only* digits
	var msRx = /^\d+$/g;

	if (humanRx.test(timeInput)) {
		return "human";
	} else if (msRx.test(timeInput)) {
		return "ms";
	} else {
		return;
	}
}

/////////////////////////
// exports for testing //
/////////////////////////

module.exports = {
  pad2: pad2,
  padToDigits: padToDigits,
  processHumanTime: processHumanTime,
  processMilliseconds: processMilliseconds,
  parseTimeInput: parseTimeInput
};