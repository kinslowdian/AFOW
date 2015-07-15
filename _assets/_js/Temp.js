trace("Temp.js being used -- remove from final build / release");

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

