const clientSystem = client.registerSystem(0, 0);

// Setup which events to listen for
clientSystem.initialize = function ()
{
	// const eventDataDefaults = {narf: false};
	// clientSystem.registerEventData("gettingstarted:pinky", eventDataDefaults);
	const scriptLoggerConfig =
		clientSystem.createEventData("minecraft:script_logger_config");
	scriptLoggerConfig.data.log_errors = true;
	scriptLoggerConfig.data.log_information = true;
	scriptLoggerConfig.data.log_warnings = true;
	clientSystem
		.broadcastEvent("minecraft:script_logger_config", scriptLoggerConfig);

	this.listenForEvent("minecraft:client_entered_world", (eventData) =>
		this.onClientEnteredWorld(eventData));
	this.listenForEvent("minecraft:ui_event",
		(eventData) => this.onUIMessage(eventData));
};

clientSystem.update = () =>
{
};

clientSystem.onUIMessage = function (eventDataObject)
{
	const chatEventData = clientSystem
			.createEventData("minecraft:display_chat_event");
	chatEventData.data.message = "ui pressed";
	clientSystem
		.broadcastEvent("minecraft:display_chat_event", chatEventData);
    //Get the data out of the event data object.
		//If there's no data, nothing to do inside here
    let eventData = eventDataObject.data;
    if(!eventData)
		{
        return;
    }
    // UI engine sent us an event.
    else if (eventData === "startPressed")
		{
      // Start or restart button was pressed on a screen. Start up the game.
			const chatEventData = clientSystem
					.createEventData("minecraft:display_chat_event");
			chatEventData.data.message = "start pressed";
			clientSystem
				.broadcastEvent("minecraft:display_chat_event", chatEventData);
    }
};

clientSystem.onClientEnteredWorld = function (eventData)
 {
    // Client has entered the world, show the starting screen
    // let loadEventData = this.createEventData("minecraft:load_ui");
    // loadEventData.data.path = "settings.html";
    // loadEventData.data.options.is_showing_menu = false;
    // // loadEventData.data.options.absorbs_input = true;
		// loadEventData.data.options.always_accepts_input  = true;
		// // loadEventData.data.options.render_game_behind = false;
		// // loadEventData.data.options.should_steal_mouse = true;
		// // loadEventData.data.options.force_render_below = true;
    // clientSystem.broadcastEvent("minecraft:load_ui", loadEventData);

    // Notify the server script that the player has finished loading in.
  //   let clientEnteredEventData = this.createEventData("rpg_game:client_entered_world");
	// aClientSystem.broadcastEvent("rpg_game:client_entered_world", clientEnteredEventData);
};
