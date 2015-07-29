var ROM;


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

	setupErrorMessages();

	playerTarget = {};
	playerTarget.rating = 0;

	battleEngine = new BattleEngine();
	battleEngine.setDifficulty({e:diff.easy, m:diff.medium, h:diff.hard, s:diff.max});


	html_lib_init(gameHTML_found);
}

function gameHTML_found()
{
	sound_init_entry(soundData_found);
}

function soundData_found()
{
	display_init();

	plug_mainGame();
}

function plug_mainGame()
{
	trace("$$ CHECK - plug_mainGame();");

	var html_gameLevel;
	var html_player;

	html_lib_reuse();

	html_gameLevel = html_lib_use("_level_game", true, true);
	html_player = html_lib_use("_player_goat", false, true);

	$("#display_wrapper").html(html_gameLevel);
	$("#display_wrapper .player").html(html_player);

	init_mainGame();
}

function init_mainGame()
{
	level_init();

	startIntro_init();
}

function startIntro_init()
{
	var delay;

	delay = setTimeout(startIntro_show, 1 * 1000);
}

function startIntro_show()
{
	$("#startScreen .tween-startScreen_text")[0].addEventListener("webkitTransitionEnd", startIntro_show_event, false);
	$("#startScreen .tween-startScreen_text")[0].addEventListener("transitionend", startIntro_show_event, false);

	$("#startScreen .startScreen_text").removeClass("startScreen_text_hide");

}

function startIntro_show_event(event)
{
	$("#startScreen .tween-startScreen_text")[0].removeEventListener("webkitTransitionEnd", startIntro_show_event, false);
	$("#startScreen .tween-startScreen_text")[0].removeEventListener("transitionend", startIntro_show_event, false);

	$("#startScreen .startScreen_hide").addClass("startScreen_hide_hide");

	$("#startScreen .startScreen_footer").removeClass("startScreen_footer_hide");

	startIntro_btn(true);

}

function startIntro_btn(run)
{
	if(run)
	{
		$("#startScreen_go")[0].addEventListener("click", startIntro_btn_event, false);
	}

	else
	{
		$("#startScreen_go")[0].removeEventListener("click", startIntro_btn_event, false);
	}
}

function startIntro_btn_event(event)
{
	var delay;

	startIntro_btn(false);

	$("#startScreen .startScreen_all_hide").addClass("startScreen_hide_show");

	$("#startScreen .startScreen_text").addClass("startScreen_text_hide");

	$("#startScreen .startScreen_boss").addClass("startScreen_boss_show");

	// TODO
	intoGame_soundTest();

	delay = setTimeout(intoGame_prepHint, 2 * 1000);

}

function startIntro_destroy()
{
	$("#startScreen").remove();
}



// TODO REROUTE

function intoGame_soundTest()
{
	// SOUND KILL
	sound_dump();

	if(soundEffects_pedal != null)
	{
		/////// HACK FOR iOS
		createjs.WebAudioPlugin.playEmptySound();
		/////// HACK FOR iOS
	}
}

function intoGame_prepHint()
{
	var exitFrame;

	var html_screen_soundOptions = "";
	var html_soundOptions = "";

	multiUseInfoScreen_build("#options_wrapper .options-choice", "START_INTRO", false);

	exitFrame = setTimeout(multiUseInfoScreen_drop, 20);
}




// NOT FINAL

function startGame_firstEntrance()
{
	$("#preload-wrapper").remove();

	portalScreen_init();


	gameEventTriggers_init();


	// FLOW CHANGE

	if(soundEffects_pedal != null)
	{
		sound_level_background();
	}

	optionsTrigger_init(true);

	control_request();

	display_centerLevel();

	about_setup();
}
