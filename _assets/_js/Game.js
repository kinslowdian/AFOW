	var ROM;

	var errorMessages = {};


	// CALLED FIRST FROM index.html
	function gameFirstInit()
	{
		ROM = {};

		ROM.mapLevel = 0;

		ROM.game = {};

		checkDevice();

		gameData_get(gameData_found);

		//////////// debug.js
		debug_init();
		//////////// debug.js
	}
	// CALLED FIRST FROM index.html

	function gameData_found()
	{
		var diff = Logic.dat_ROM._LOGIC.difficulty;

		var levelCount = 0;

		for(var levelData in Logic.dat_ROM._LEVELS)
		{
			levelCount++;
		}

		errorMessages.touch 	= Logic.dat_ROM["_ERRORS"]["touch"]["txt"];
		errorMessages.keyboard 	= Logic.dat_ROM["_ERRORS"]["keyboard"]["txt"];

		battleEngine.init(levelCount, diff.easy, diff.medium, diff.hard, diff.max);


		html_lib_init(gameHTML_found);
	}

	function gameHTML_found()
	{
		// sound_init();

		sound_init_entry(soundData_found);
	}

	function soundData_found()
	{
		// BREAK
		//display_init();

		display_init();

		init_startScreen();
	}

	function init_startScreen()
	{
		// HACK
		plug_intro();
	}

	function plug_intro()
	{
		// HACK
		init_intro();
	}

	function init_intro()
	{
		// HACK
		plug_mainGame();
	}

	function plug_mainGame()
	{
		var html_gameLevel;

		html_lib_reuse();

		html_gameLevel = html_lib_use("_level_game", true, true);


		$("#display_wrapper").html(html_gameLevel);

		init_mainGame();
	}

	function init_mainGame()
	{
		// BREAK
		// mapPlayer_init("player-block", "tween-player-block", "tween-player-walkX", "tween-player-walkY", "tween-mapPlayerWalk_stop", "tween-mapPlayerWalk_loop", "map-goat", "preHitTest");
		// BREAK

		// trace(MAP_PLAYER);

		level_init();

		// BREAK
		// controlSignal_init();

		// BREAK
		// screenUpdateInit(true);

		control_init();
		loop_init();

		var temp = setTimeout(preloader_remove_step0, 1000);

		// newLevel();
	}

	// NOT FINAL

	function preloader_remove_step0()
	{
		$("#preload-wrapper .preloader-message-group").css("opacity", "1");

		// $("#preload-wrapper .preloader-message-sound")[0].addEventListener("touchend", preloader_remove1, false);
		// $("#preload-wrapper .preloader-message-sound")[0].addEventListener("click", preloader_remove1, false);

		// $("#preload-wrapper .preloader-message-silence")[0].addEventListener("touchend", preload_removeNS, false);
		// $("#preload-wrapper .preloader-message-silence")[0].addEventListener("click", preload_removeNS, false);

		$("#preload-wrapper .preloader-message-start")[0].addEventListener("touchend", preloader_remove_btnEvent, false);
		$("#preload-wrapper .preloader-message-start")[0].addEventListener("click", preloader_remove_btnEvent, false);
	}

	function preloader_remove_btnEvent(event)
	{
		var html_screen_soundOptions = "";
		var html_soundOptions = "";

		$("#preload-wrapper .preloader-message-start")[0].removeEventListener("touchend", preloader_remove_btnEvent, false);
		$("#preload-wrapper .preloader-message-start")[0].removeEventListener("click", preloader_remove_btnEvent, false);

		// html_lib_reuse();

		// multiUseInfoScreen_build("#preload-wrapper", "SOUND_GLOBAL");

		// multiUseInfoScreen_build("#preload-wrapper", "START_INTRO");

		// multiUseInfoScreen_build("#preload-wrapper", "CONTROL");

		multiUseInfoScreen_build("#options_wrapper .options-choice", "START_INTRO");

		// html_screen_soundOptions = html_lib_use("_multiUseInfo", false, false);
		// html_soundOptions = html_lib_use("_multiUseInfo_br_sound", false, false);

		// html_lib_empty();

		// $("#preload-wrapper").append(html_screen_soundOptions);
		// $("#preload-wrapper .multiUseInfo_br").append(html_soundOptions);
		// $("#preload-wrapper .multiUseInfo_cont_entrance").addClass("multiUseInfo_sound");

		// multiUseInfoScreen_drop("SOUND_GLOBAL");

		// QUICK BREAK
		$(".tween-preload")[0].addEventListener("webkitTransitionEnd", test_soundOptions, false);
		$(".tween-preload")[0].addEventListener("transitionend", test_soundOptions, false);

		$("#preload-wrapper .preloader-message-group").css("opacity", "0");

		//var d = setTimeout(multiUseInfoScreen_drop, 3 * 1000, "SOUND_GLOBAL");

		// multiUseInfoScreen_drop("SOUND_GLOBAL");
	}

	function test_soundOptions(event)
	{
		$(".tween-preload")[0].removeEventListener("webkitTransitionEnd", test_soundOptions, false);
		$(".tween-preload")[0].removeEventListener("transitionend", test_soundOptions, false);

		// multiUseInfoScreen_drop("SOUND_GLOBAL");

		multiUseInfoScreen_drop();
	}







	function preload_removeNS(event)
	{
		$("#preload-wrapper .preloader-message-silence")[0].removeEventListener("touchend", preload_removeNS, false);
		$("#preload-wrapper .preloader-message-silence")[0].removeEventListener("click", preload_removeNS, false);

		sound_dump();

		preloader_remove1(null);
	}

	function preloader_remove1(event)
	{
		// sound_prep();

		if(soundEffects_pedal != null)
		{
			/////// HACK FOR iOS
			createjs.WebAudioPlugin.playEmptySound();
			/////// HACK FOR iOS
		}


		$("#preload-wrapper .preloader-message-sound")[0].removeEventListener("touchend", preloader_remove1, false);
		$("#preload-wrapper .preloader-message-sound")[0].removeEventListener("click", preloader_remove1, false);

		$("#preload-wrapper")[0].addEventListener("webkitTransitionEnd", start_mainGame, false);
		$("#preload-wrapper")[0].addEventListener("transitionend", start_mainGame, false);

		$("#preload-wrapper").css("opacity", "0");

	}

	// NOT FINAL

	function startGame_firstEntrance()
	{
		$("#preload-wrapper").remove();

		// FLOW CHANGE

		// BREAK
		// mapPlayer_entry();
		// portalScreen_init();
		// BREAK

		portalScreen_init();


		gameEventTriggers_init();


		// FLOW CHANGE

		if(soundEffects_pedal != null)
		{
			sound_level_background();
		}

		optionsTrigger_init(true);
	}

	// DEFUNCT
	function start_mainGame(event)
	{
		$("#preload-wrapper")[0].removeEventListener("webkitTransitionEnd", start_mainGame, false);
		$("#preload-wrapper")[0].removeEventListener("transitionend", start_mainGame, false);

		$("#preload-wrapper").remove();

		// FLOW CHANGE

		// BREAK
		// mapPlayer_entry();
		// portalScreen_init();
		// BREAK

		// FLOW CHANGE

		if(soundEffects_pedal != null)
		{
			sound_level_background();
		}

		optionsTrigger_init();


		// NOT FINAL
		// sound_play("level_bg_forest");
	}
