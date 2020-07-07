"use strict";
const DAY = "day";
const NIGHT = "night";
let system;
let timeOfDay = DAY; //TODO should be game depending
let dayLength = 100;
let nightLength = 100;
//
const commandCallback =  (commandResultData) =>
{
	const eventData = system.createEventData("minecraft:display_chat_event");
	if (eventData)
	{
		eventData.data.message =
			JSON.stringify(commandResultData.data, null, "    ");
		system.broadcastEvent("minecraft:display_chat_event", eventData);
	}
};

const timeSet = () =>
{
	system.executeCommand(`/time set ${timeOfDay}`, () =>
	{
	});
};

const daylightCycleManager = {};
daylightCycleManager.setDayLength = (length) =>
{
	dayLength = length;
};

daylightCycleManager.setNightLength = (length) =>
{
	nightLength = length;
};

daylightCycleManager.getDayLength = () => dayLength;
daylightCycleManager.getNightLength = () => nightLength;

daylightCycleManager.update = (tickCount) =>
{
	if (timeOfDay === DAY && (tickCount % dayLength === 0)) //5 sec passed
	{
		timeOfDay = NIGHT;
		system
		.executeCommand("/difficulty hard", (data) => commandCallback(data));
		timeSet();
	}
	else if (timeOfDay === NIGHT && (tickCount % nightLength === 0))
	{
		timeOfDay = DAY;
		system
		.executeCommand("/difficulty easy", (data) => commandCallback(data));
		timeSet();
	}
};
module.exports = (sys) =>
{
	if (system === undefined)
	{
		system = sys;
		system.executeCommand("/gamerule doDaylightCycle false", () =>
		{
		});
	}

	return Object.freeze(daylightCycleManager);
};
