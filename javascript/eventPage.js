
var iconHandler = {
		displayRunner: function(){
				chrome.browserAction.setIcon({path: "../img/running.png"});
		},

		displayClock: function(){
				chrome.browserAction.setIcon({path: "../img/clock.png"});
		},

		displayHourGlass: function(){
				chrome.browserAction.setIcon({path: "../img/hourglass.png"});
		},

		displayComplete: function(){
				chrome.browserAction.setIcon({path: "../img/check.png"});
		}
};

chrome.alarms.onAlarm.addListener(function(alarm) {
	if (alarm.name == "should_stand") {
			iconHandler.displayRunner();
			chrome.storage.local.set({state: 'should_stand_up'});

	}
	else if (alarm.name == "can_sit_down"){
			iconHandler.displayComplete();
			chrome.storage.local.set({state: 'complete'});

	}
});


chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.storage.local.get("state", doActionBasedOnState);
});



var doActionBasedOnState = function(storage_object){
		var state = storage_object.state || "complete";
		console.log(state);

		if (state == "complete"){
				iconHandler.displayClock();
				chrome.alarms.create("should_stand", {delayInMinutes: 60}); // 1 hour
		}

		if (state == "should_stand_up"){
				iconHandler.displayHourGlass();
				chrome.alarms.create("can_sit_down", {delayInMinutes: 5}); // 5 minutes
		}
};
