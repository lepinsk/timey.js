// timey.js
// 2018 Julian Lepinski

if (process.argv.length === 3) {
	var timeIn = process.argv[2];
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
	console.log("In milliseconds: " + timeInMS);
} else {
	console.log("error: I expect a single argument, i.e.");
	console.log("");
	console.log("   node timey.js 01:02:03");
	process.exit(1);
}