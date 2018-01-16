// timey.js
// 2018 Julian Lepinski

if (process.argv.length === 3 && process.argv[0].indexOf("node") !== -1) {
	process.argv.shift();
}

if (process.argv.length === 2) {
	var timeIn = process.argv[1];
	var timeInOrig = timeIn;
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
	if (colonSplit) {
		mComponent = parseInt(colonSplit.pop());
	}
	if (colonSplit) {
		hComponent = parseInt(colonSplit.pop());
	}
	var timeInMS = (hComponent * 60 * 60000) + (mComponent * 60000) + (sComponent * 1000) + msComponent;
	timeInMS = parseInt(timeInMS);
	console.log(timeInOrig + " in milliseconds is " + timeInMS);
} else {
	console.log("error: I expect a single argument, i.e.");
	console.log("");
	console.log("   timey 01:02:03");
	process.exit(1);
}