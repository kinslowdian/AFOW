
var screen_multiInfoUse;

var screen_multiInfoUse_keyboard;

var PortalScreen;

var resultOutcome;

var aboutSection;



/* --- OPTIONS */

/* --- OUTCOME SCREENS */

///////////////////////////////// --- OPTIONS

function optionsTrigger_init(run)
{
	if(run)
	{
		$(".options-trigger")[0].addEventListener("click", optionsTrigger_event, false);
		$(".options-trigger")[0].addEventListener("touchend", optionsTrigger_event, false);

		$("#menu_strip .options-trigger")[0].addEventListener("click", optionsTrigger_event, false);
		$("#menu_strip .options-trigger")[0].addEventListener("touchend", optionsTrigger_event, false);
	}

	else
	{
		$(".options-trigger")[0].removeEventListener("click", optionsTrigger_event, false);
		$(".options-trigger")[0].removeEventListener("touchend", optionsTrigger_event, false);

		$("#menu_strip .options-trigger")[0].removeEventListener("click", optionsTrigger_event, false);
		$("#menu_strip .options-trigger")[0].removeEventListener("touchend", optionsTrigger_event, false);
	}
}

function optionsTrigger_event(event)
{
	var exitFrame;

	optionsTrigger_init(false);

	move_cancel();

	multiUseInfoScreen_build("#options_wrapper .options-choice", "OPTIONS", false);

	exitFrame = setTimeout(optionsTrigger_run, 20);
}

function optionsTrigger_run()
{
	multiUseInfoScreen_drop();
}

///////////////////////////////// --- OPTIONS


///////////////////////////////// --- MULTI_USE_SCREEN

function multiUseInfoScreen_build(plugInto, screenType, followScreen)
{
	var buildData = {};

	html_lib_reuse();

	screen_multiInfoUse = {};
	screen_multiInfoUse.screenRoot = plugInto;
	screen_multiInfoUse.infoDisplay = screenType;
	screen_multiInfoUse.followScreen = followScreen || false;
	screen_multiInfoUse.dropEndFunct = null;
	screen_multiInfoUse.riseEndFunct = null;
	screen_multiInfoUse.eventTrigger = "";

	screen_multiInfoUse.goIntoBattle = false;
	screen_multiInfoUse.returnFromBattle = false;

	screen_multiInfoUse.aboutSectionGuide = false;

	screen_multiInfoUse.plugControl = false;

	switch(screen_multiInfoUse.infoDisplay)
	{
		case "START_INTRO":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_intro", "nav_intro", false);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_intro");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_entranceLine1").html(buildData.title_1);

			screen_multiInfoUse.dropEndFunct = startIntro_optionsHint;

			break;
		}

		case "CONTROL":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_control", "nav_control", false);

			trace(buildData);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_control");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_control .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_control .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_control .multiUseInfo_entranceLine1").html(buildData.title_1);

			screen_multiInfoUse.dropEndFunct = controlIntro_hint;
			screen_multiInfoUse.riseEndFunct = startGame_firstEntrance;

			break;
		}

		case "OPTIONS":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_options", "nav_options", true);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_options");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_entranceLine1").html(buildData.title_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_about").html(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_sound").html(buildData.btn_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_about").attr("data-direct-class", "multiUseInfo_options_option_about");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_sound").attr("data-direct-class", "multiUseInfo_options_option_sound");

			screen_multiInfoUse.dropEndFunct = options_display;

			break;
		}

		case "ABOUT":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_about", "nav_about", true);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_about");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_entranceLine1").html(buildData.title_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_read").html(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_return").html(buildData.btn_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_read").attr("data-direct-class", "multiUseInfo_about_option_read");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_return").attr("data-direct-class", "multiUseInfo_about_option_return");

			screen_multiInfoUse.dropEndFunct = aboutOptions_display;

			break;
		}

		case "SOUND_GLOBAL":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_sound", "nav_sound", true);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_sound");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_entranceLine1").html(buildData.title_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_true").html(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_false").html(buildData.btn_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_true").attr("data-direct-class", "multiUseInfo_sound_option_true");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_false").attr("data-direct-class", "multiUseInfo_sound_option_false");

			screen_multiInfoUse.dropEndFunct = soundGlobalOptions_display;

			break;
		}

		case "BATTLE_FAIL":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_fail", "nav_fail", false);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_fail");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_entranceLine1").html(buildData.title_1);

			battleFail_fullContent();

			screen_multiInfoUse.dropEndFunct = battleFail_display;

			break;
		}

		case "PREBATTLE":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_preFight", "nav_prebattle", true);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_preBattle");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_entranceLine1").html("");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_fight").html(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_leave").html(buildData.btn_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_fight").attr("data-direct-class", "multiUseInfo_preFight_option_fight");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_leave").attr("data-direct-class", "multiUseInfo_preFight_option_leave");

			preBattle_fullContent();

			screen_multiInfoUse.dropEndFunct = preBattle_display;

			break;
		}

		case "INTOBATTLE":
		{
			buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_intoFight", "nav_intobattle", true);

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_intoBattle");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_entranceLine0").html(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_entranceLine1").html("");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_attack").html(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_escape").html(buildData.btn_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_attack").attr("data-direct-class", "multiUseInfo_intoFight_option_attack");

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_escape").attr("data-direct-class", "multiUseInfo_intoFight_option_escape");

			intoBattle_fullContent();

			screen_multiInfoUse.dropEndFunct = intoBattle_display;
			screen_multiInfoUse.riseEndFunct = allBattleOver_battleDecide;

			break;
		}
	}

	delete buildData;

	html_lib_empty();
}

function multiUseInfoScreen_buildData(html_br, json_text, ui)
{
	var b = {};

	b.screen_html = html_lib_use("_multiUseInfo", true, true);
	b.art_html = html_lib_use(html_br, true, true);

	b.title_0 = Logic.dat_ROM["_NAVIGATION"][json_text]["title_0"];
	b.title_1 = Logic.dat_ROM["_NAVIGATION"][json_text]["title_1"];

	if(ui)
	{
		b.btn_0 = Logic.dat_ROM["_NAVIGATION"][json_text]["btn_0"];
		b.btn_1 = Logic.dat_ROM["_NAVIGATION"][json_text]["btn_1"];
	}

	return b;

	delete b;
}

function multiUseInfoScreen_selectLine(json_text, json_data, i)
{
	return Logic.dat_ROM["_NAVIGATION"][json_text][json_data][i];
}

function multiUseInfoScreen_randomLine(json_text, json_data)
{
	var randomLine_data = Logic.dat_ROM["_NAVIGATION"][json_text][json_data];
	var randomLine_length = randomLine_data.length;
	var randomLine_final = randomLine_data[Math.floor(Math.random() * randomLine_length)];

	return randomLine_final;
}

function multiUseInfoScreen_forcePlace()
{
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("tween-multiUseInfo_cont");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_hide").addClass("multiUseInfo_cont_show");
}

function multiUseInfoScreen_drop()
{
	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_dropEnd, false);
	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("transitionend", multiUseInfoScreen_dropEnd, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_hide").addClass("multiUseInfo_cont_show");

	if(screen_multiInfoUse.followScreen)
	{
		$("#options_wrapper .options-split").addClass("optionSplit_use");
	}
}

function multiUseInfoScreen_dropEnd(event)
{
	if(event != null || event != undefined)
	{
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_dropEnd, false);
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("transitionend", multiUseInfoScreen_dropEnd, false);
	}

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_dropEndNext, false);
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1")[0].addEventListener("transitionend", multiUseInfoScreen_dropEndNext, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");


	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");

	if($("#preload-wrapper .preloader"))
	{
		$("#preload-wrapper .preloader").remove();
	}

	if(screen_multiInfoUse.followScreen)
	{
		$("#options_wrapper .options-split").removeClass("optionSplit_use");
	}

}

function multiUseInfoScreen_dropEndNext(event)
{
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_dropEndNext, false);
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1")[0].removeEventListener("transitionend", multiUseInfoScreen_dropEndNext, false);

	if(screen_multiInfoUse.dropEndFunct != null || screen_multiInfoUse.dropEndFunct != undefined)
	{
		screen_multiInfoUse.dropEndFunct();
	}
}

// -------- START_INTRO

function startIntro_optionsHint()
{
	var delay;

	$(".multiUseInfo_intro .multiUseInfo_speech_40x40").toggleClass("multiUseInfo_speech_hide", "multiUseInfo_speech_show");

	delay = setTimeout(startIntro_optionsHintComplete, 3 * 1000);
}

function startIntro_optionsHintComplete()
{
	multiUseInfoScreen_removeTitleSoft(startIntro_optionsHintRemove);
}

function startIntro_optionsHintRemove(event)
{
	var exitFrame;

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", startIntro_optionsHintRemove, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", startIntro_optionsHintRemove, false);

	multiUseInfoScreen_build("#options_wrapper .options-select", "CONTROL", true);

	exitFrame = setTimeout(multiUseInfoScreen_drop, 20);
}

// -------- START_INTRO

// -------- CONTROL_INTRO

function controlIntro_hint()
{
	var delay;

	startIntro_destroy();

	$("#options_wrapper .options-choice").html("");

	delay = setTimeout(controlIntro_hintComplete, 3 * 1000);
}

function controlIntro_hintComplete()
{
	multiUseInfoScreen_removeTitle();
}

// -------- CONTROL_INTRO

// -------- OPTIONS

function options_display()
{
	$(".multiUseInfo_options_option_sound")[0].addEventListener("webkitTransitionEnd", options_displayEnd, false);
	$(".multiUseInfo_options_option_sound")[0].addEventListener("transitionend", options_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_options_option_about").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	$(".multiUseInfo_options_option_sound").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
}

function options_displayEnd(event)
{
	$(".multiUseInfo_options_option_sound")[0].removeEventListener("webkitTransitionEnd", options_displayEnd, false);
	$(".multiUseInfo_options_option_sound")[0].removeEventListener("transitionend", options_displayEnd, false);

	$(".multiUseInfo_options_option_sound").removeClass("tween-multiUseInfo_option_delay");

	options_btnInit(true);
}

function options_btnInit(run)
{
	if(run)
	{
		$(".multiUseInfo_options_option_about")[0].addEventListener("click", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].addEventListener("click", options_btnEvent, false);

		$(".multiUseInfo_options_option_about")[0].addEventListener("touchend", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].addEventListener("touchend", options_btnEvent, false);

		$(".multiUseInfo_cont_entrance")[0].addEventListener("click", options_btnEvent, false);
		$(".multiUseInfo_cont_entrance")[0].addEventListener("touchend", options_btnEvent, false);

		$(".multiUseInfo_options_option_about")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		// Temp.js
		keyboardSignal_multiInfoUse_init();
	}

	else
	{
		$(".multiUseInfo_options_option_about")[0].removeEventListener("click", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].removeEventListener("click", options_btnEvent, false);

		$(".multiUseInfo_options_option_about")[0].removeEventListener("touchend", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].removeEventListener("touchend", options_btnEvent, false);

		$(".multiUseInfo_cont_entrance")[0].removeEventListener("click", options_btnEvent, false);
		$(".multiUseInfo_cont_entrance")[0].removeEventListener("touchend", options_btnEvent, false);

		$(".multiUseInfo_options_option_about")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		$(".multiUseInfo_options_option_about").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_options_option_sound").addClass("multiUseInfo_option_disabled");

		keyboardSignal_multiInfoUse_cancel();
	}
}

function options_btnEvent(event)
{
	options_btnInit(false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_options_option_about" || _cl === "multiUseInfo_options_option_sound" || _cl === "multiUseInfo_cont_entrance")
		{
			if(_cl === "multiUseInfo_options_option_about")
			{
				screen_multiInfoUse.optionSelected = "ABOUT";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_options_option_sound";
			}

			if(_cl === "multiUseInfo_options_option_sound")
			{
				screen_multiInfoUse.optionSelected = "SOUND";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_options_option_about";
			}

			if(_cl === "multiUseInfo_cont_entrance")
			{
				$(".multiUseInfo_options_option_sound").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
				$(".multiUseInfo_options_option_about").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

				multiUseInfoScreen_removeTitle();
			}
		}
	}

	if(screen_multiInfoUse.eventTrigger)
	{
		$(screen_multiInfoUse.eventTrigger)[0].addEventListener("webkitTransitionEnd", options_btnSelected, false);
		$(screen_multiInfoUse.eventTrigger)[0].addEventListener("transitionend", options_btnSelected, false);

		$(screen_multiInfoUse.eventTrigger).toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
	}
}

function options_btnSelected(event)
{
	var exitFrame;

	$(screen_multiInfoUse.eventTrigger)[0].removeEventListener("webkitTransitionEnd", options_btnSelected, false);
	$(screen_multiInfoUse.eventTrigger)[0].removeEventListener("transitionend", options_btnSelected, false);

	switch(screen_multiInfoUse.optionSelected)
	{
		case "ABOUT":
		{
			multiUseInfoScreen_build("#options_wrapper .options-select", "ABOUT", true);

			exitFrame = setTimeout(multiUseInfoScreen_drop, 20);

			break;
		}

		case "SOUND":
		{
			multiUseInfoScreen_build("#options_wrapper .options-select", "SOUND_GLOBAL", true);

			exitFrame = setTimeout(multiUseInfoScreen_drop, 20);

			break;
		}
	}
}

// -------- OPTIONS

// -------- ABOUT

function aboutOptions_display()
{
	$(".multiUseInfo_about_option_return")[0].addEventListener("webkitTransitionEnd", aboutOptions_displayEnd, false);
	$(".multiUseInfo_about_option_return")[0].addEventListener("transitionend", aboutOptions_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_about_option_read").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	$(".multiUseInfo_about_option_return").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
}

function aboutOptions_displayEnd(event)
{
	$(".multiUseInfo_about_option_return")[0].removeEventListener("webkitTransitionEnd", aboutOptions_displayEnd, false);
	$(".multiUseInfo_about_option_return")[0].removeEventListener("transitionend", aboutOptions_displayEnd, false);

	$(".multiUseInfo_about_option_return").removeClass("tween-multiUseInfo_option_delay");

	$("#options_wrapper .options-choice").html("");

	aboutOptions_btnInit(true);
}

function aboutOptions_btnInit(run)
{
	if(run)
	{
		$(".multiUseInfo_about_option_read")[0].addEventListener("click", aboutOptions_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].addEventListener("click", aboutOptions_btnEvent, false);

		$(".multiUseInfo_about_option_read")[0].addEventListener("touchend", aboutOptions_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].addEventListener("touchend", aboutOptions_btnEvent, false);

		$(".multiUseInfo_about_option_read")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		// Temp.js
		keyboardSignal_multiInfoUse_init();
	}

	else
	{
		$(".multiUseInfo_about_option_read")[0].removeEventListener("click", aboutOptions_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].removeEventListener("click", aboutOptions_btnEvent, false);

		$(".multiUseInfo_about_option_read")[0].removeEventListener("touchend", aboutOptions_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].removeEventListener("touchend", aboutOptions_btnEvent, false);

		$(".multiUseInfo_about_option_read")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_about_option_return")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		$(".multiUseInfo_about_option_read").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_about_option_return").addClass("multiUseInfo_option_disabled");

		keyboardSignal_multiInfoUse_cancel();
	}
}

function aboutOptions_btnEvent(event)
{
	aboutOptions_btnInit(false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_about_option_read" || _cl === "multiUseInfo_about_option_return")
		{
			if(_cl === "multiUseInfo_about_option_read")
			{
				screen_multiInfoUse.optionSelected = "ABOUT_READ";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_about_option_return";
			}

			if(_cl === "multiUseInfo_about_option_return")
			{
				screen_multiInfoUse.optionSelected = "ABOUT_RETURN";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_about_option_read";
			}
		}
	}

	$(screen_multiInfoUse.eventTrigger).toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	aboutOptions_btnSelected();

	multiUseInfoScreen_removeTitle();
}

function aboutOptions_btnSelected()
{
	switch(screen_multiInfoUse.optionSelected)
	{
		case "ABOUT_READ":
		{
			screen_multiInfoUse.aboutSectionGuide = true;

			about_build();

			screen_multiInfoUse.riseEndFunct = aboutOptions_actionRead;

			break;
		}

		case "ABOUT_RETURN":
		{

			break;
		}
	}
}

function aboutOptions_actionRead()
{
	about_run();
}

// -------- ABOUT

// -------- GLOBAL_SOUND

function soundGlobalOptions_display()
{
	$(".multiUseInfo_sound_option_false")[0].addEventListener("webkitTransitionEnd", soundGlobalOptions_displayEnd, false);
	$(".multiUseInfo_sound_option_false")[0].addEventListener("transitionend", soundGlobalOptions_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_sound_option_true").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	$(".multiUseInfo_sound_option_false").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
}

function soundGlobalOptions_displayEnd(event)
{
	$(".multiUseInfo_sound_option_false")[0].removeEventListener("webkitTransitionEnd", soundGlobalOptions_displayEnd, false);
	$(".multiUseInfo_sound_option_false")[0].removeEventListener("transitionend", soundGlobalOptions_displayEnd, false);

	$(".multiUseInfo_sound_option_false").removeClass("tween-multiUseInfo_option_delay");

	$("#options_wrapper .options-choice").html("");

	soundGlobalOptions_btnInit(true);
}

function soundGlobalOptions_btnInit(run)
{
	if(run)
	{
		$(".multiUseInfo_sound_option_true")[0].addEventListener("click", soundGlobalOptions_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].addEventListener("click", soundGlobalOptions_btnEvent, false);

		$(".multiUseInfo_sound_option_true")[0].addEventListener("touchend", soundGlobalOptions_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].addEventListener("touchend", soundGlobalOptions_btnEvent, false);

		$(".multiUseInfo_sound_option_true")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		// Temp.js
		keyboardSignal_multiInfoUse_init();
	}

	else
	{
		$(".multiUseInfo_sound_option_true")[0].removeEventListener("click", soundGlobalOptions_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].removeEventListener("click", soundGlobalOptions_btnEvent, false);

		$(".multiUseInfo_sound_option_true")[0].removeEventListener("touchend", soundGlobalOptions_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].removeEventListener("touchend", soundGlobalOptions_btnEvent, false);

		$(".multiUseInfo_sound_option_true")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_sound_option_false")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		$(".multiUseInfo_sound_option_true").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_sound_option_false").addClass("multiUseInfo_option_disabled");

		keyboardSignal_multiInfoUse_cancel();
	}
}

function soundGlobalOptions_btnEvent(event)
{

	soundGlobalOptions_btnInit(false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_sound_option_true" || _cl === "multiUseInfo_sound_option_false")
		{
			if(_cl === "multiUseInfo_sound_option_true")
			{
				screen_multiInfoUse.optionSelected = "SOUND_TRUE";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_sound_option_false";
			}

			if(_cl === "multiUseInfo_sound_option_false")
			{
				screen_multiInfoUse.optionSelected = "SOUND_FALSE";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_sound_option_true";
			}
		}
	}

	$(screen_multiInfoUse.eventTrigger).toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	soundGlobalOptions_btnSelected();

	multiUseInfoScreen_removeTitle();
}

function soundGlobalOptions_btnSelected()
{
	switch(screen_multiInfoUse.optionSelected)
	{
		case "SOUND_TRUE":
		{
			// NOT FINAL
			createjs.Sound.setVolume(1); // GLOBAL SOUND

			break;
		}

		case "SOUND_FALSE":
		{
			// NOT FINAL
			createjs.Sound.setVolume(0); // GLOBAL SOUND

			break;
		}
	}
}

// -------- GLOBAL_SOUND

// -------- BATTLE_FAIL

function battleFail_fullContent()
{
	var player_html = html_lib_use("_player_goat", false, true);

	// CHARACTER ADD
	$(".multiUseInfo_fail .multiUseInfo_serial").html(player_html);

	$(".multiUseInfo_fail .multiUseInfo_serial .player-sprite .map-goat-head").addClass("mapPlayer_head_dead");
}

function battleFail_display()
{
	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("webkitTransitionEnd", battleFail_displayEnd, false);
	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("transitionend", battleFail_displayEnd, false);

	$(".multiUseInfo_fail .map-enemy_40x40-legs").toggleClass("tween-map-enemy_40x40_loop", "tween-map-enemy_40x40_stop");

	$(".multiUseInfo_fail .multiUseInfo_fail_character").toggleClass("multiUseInfo_fail_character_hide", "multiUseInfo_fail_character_show");

	allBattleOver_battleEnd_return_end(BATTLE_NAV.game.result);
}

function battleFail_displayEnd(event)
{
	var delay;

	var delay_failScreen;

	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].removeEventListener("webkitTransitionEnd", battleFail_displayEnd, false);
	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].removeEventListener("transitionend", battleFail_displayEnd, false);

	$(".multiUseInfo_fail .map-enemy_40x40-head").addClass("map-enemy_40x40_head_fear");

	delay_failScreen = new AnimationTimer();

	resultOutcome_init();

	delay = setTimeout(resultOutcome_request, 2 * 1000);
}

function battleFail_removeInit()
{
	multiUseInfoScreen_removeTitle();
}

// -------- BATTLE_FAIL

// -------- PREBATTLE

function preBattle_fullContent()
{
	var msg_line1_a;
	var msg_line1_b;
	var msg_line1_final;

	msg_line1_a = multiUseInfoScreen_selectLine("nav_prebattle", "enemy_static", 0) +  " " + enemyTarget.name + " " + multiUseInfoScreen_randomLine("nav_prebattle", "enemy_dynamic");

	msg_line1_b = multiUseInfoScreen_selectLine("nav_prebattle", "player_static" , 0) + " " + multiUseInfoScreen_randomLine("nav_prebattle", "player_dynamic");

	msg_line1_final = msg_line1_a + " <br>" + msg_line1_b;

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_entranceLine1").html(msg_line1_final);

	// CHARACTER ADD
	$(".multiUseInfo_preBattle .multiUseInfo_serial").html(enemyTarget.buildData.html);
	$(".multiUseInfo_preBattle .multiUseInfo_serial > div").html(enemyBodyHTML);
}

function preBattle_display()
{
	$(".multiUseInfo_preFight_option_leave")[0].addEventListener("webkitTransitionEnd", preBattle_displayEnd, false);
	$(".multiUseInfo_preFight_option_leave")[0].addEventListener("transitionend", preBattle_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_preFight_option_fight").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	$(".multiUseInfo_preFight_option_leave").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	// TIDY UP
	control.writeSpawn({x:control.fl.x, y:control.fl.y});
	autoMove_init("SPAWN");
	$(".layer-field-player-area .player").removeClass("tween-player");
}

function preBattle_displayEnd(event)
{
	$(".multiUseInfo_preFight_option_leave")[0].removeEventListener("webkitTransitionEnd", preBattle_displayEnd, false);
	$(".multiUseInfo_preFight_option_leave")[0].removeEventListener("transitionend", preBattle_displayEnd, false);

	$(".multiUseInfo_preFight_option_leave").removeClass("tween-multiUseInfo_option_delay");

	preBattle_btnInit(true);

	$("#display_wrapper").html("");
}

function preBattle_btnInit(run)
{
	if(run)
	{
		$(".multiUseInfo_preFight_option_fight")[0].addEventListener("click", preBattle_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].addEventListener("click", preBattle_btnEvent, false);

		$(".multiUseInfo_preFight_option_fight")[0].addEventListener("touchend", preBattle_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].addEventListener("touchend", preBattle_btnEvent, false);

		$(".multiUseInfo_preFight_option_fight")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		// Temp.js
		keyboardSignal_multiInfoUse_init();
	}

	else
	{
		$(".multiUseInfo_preFight_option_fight")[0].removeEventListener("click", preBattle_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].removeEventListener("click", preBattle_btnEvent, false);

		$(".multiUseInfo_preFight_option_fight")[0].removeEventListener("touchend", preBattle_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].removeEventListener("touchend", preBattle_btnEvent, false);

		$(".multiUseInfo_preFight_option_fight")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_preFight_option_leave")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		$(".multiUseInfo_preFight_option_fight").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_preFight_option_leave").addClass("multiUseInfo_option_disabled");

		keyboardSignal_multiInfoUse_cancel();
	}
}

function preBattle_btnEvent(event)
{
	preBattle_btnInit(false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_preFight_option_fight" || _cl === "multiUseInfo_preFight_option_leave")
		{
			if(_cl === "multiUseInfo_preFight_option_fight")
			{
				screen_multiInfoUse.optionSelected = "FIGHT";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_preFight_option_leave";
			}

			if(_cl === "multiUseInfo_preFight_option_leave")
			{
				screen_multiInfoUse.optionSelected = "RUN";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_preFight_option_fight";
			}
		}
	}

	$(screen_multiInfoUse.eventTrigger).toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	multiUseInfoScreen_removeTitleSoft(preBattle_btnSelected);
}

function preBattle_btnSelected()
{
	var exitFrame;

	switch(screen_multiInfoUse.optionSelected)
	{
		case "FIGHT":
		{
			multiUseInfoScreen_build("#options_wrapper .options-select", "INTOBATTLE", true);

			exitFrame = setTimeout(multiUseInfoScreen_drop, 20);

			break;
		}

		case "RUN":
		{
			screen_multiInfoUse.returnFromBattle = true;

			$("#display_wrapper").html(preBattleOptions.html.display_inner_world);
			$("#display_wrapper .player").html("");
			$("#display_wrapper .player").html(control.html_player);

			screen_multiInfoUse.plugControl = true;

			multiUseInfoScreen_rise(null);

			break;
		}
	}
}

// -------- PREBATTLE

// -------- INTOBATTLE

function intoBattle_display()
{
	$(".multiUseInfo_intoFight_option_escape")[0].addEventListener("webkitTransitionEnd", intoBattle_displayEnd, false);
	$(".multiUseInfo_intoFight_option_escape")[0].addEventListener("transitionend", intoBattle_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_intoFight_option_attack").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	$(".multiUseInfo_intoFight_option_escape").toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");
}

function intoBattle_displayEnd(event)
{
	$(".multiUseInfo_intoFight_option_escape")[0].removeEventListener("webkitTransitionEnd", intoBattle_displayEnd, false);
	$(".multiUseInfo_intoFight_option_escape")[0].removeEventListener("transitionend", intoBattle_displayEnd, false);

	$(".multiUseInfo_intoFight_option_escape").removeClass("tween-multiUseInfo_option_delay");

	intoBattle_btnInit(true);

	$("#options_wrapper .options-choice").html("");

}

function intoBattle_fullContent()
{
	var msg_value;
	var msg_line0;
	var msg_line1_a;
	var msg_line1_b;
	var msg_line1_final;

	var serial_html = html_lib_use("_multiUseInfo_serial_intoFight", false, true);
	var player_html = html_lib_use("_player_goat", false, true);

	trace(player_html);

	// SETS PLAYER 1 + 2
	battleEngine_setPlayers(playerTarget, enemyTarget);


	// WEAK
	if(playerTarget.sword.skillId < enemyTarget.sword.skillId)
	{
		msg_value = 0;
	}

	// EVEN
	if(playerTarget.sword.skillId == enemyTarget.sword.skillId)
	{
		msg_value = 1;
	}

	// STRONG
	if(playerTarget.sword.skillId > enemyTarget.sword.skillId)
	{
		msg_value = 2;
	}

	msg_line0 = multiUseInfoScreen_selectLine("nav_intobattle", "title_0_dynamic", msg_value);
	msg_line1_a = multiUseInfoScreen_selectLine("nav_intobattle", "title_1_dynamic", 3) + " " + playerTarget.sword.skill + " " + multiUseInfoScreen_selectLine("nav_intobattle", "title_1_dynamic", msg_value);
	msg_line1_b	= multiUseInfoScreen_selectLine("nav_intobattle", "title_1_dynamic", 4);

	msg_line1_final = msg_line1_a + " <br>" + msg_line1_b;

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_entranceLine0").html(msg_line0);
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_entranceLine1").html(msg_line1_final);

	// CHARACTER ADD
	$(".multiUseInfo_intoBattle .multiUseInfo_serial").html(serial_html);
	$(".multiUseInfo_intoBattle .multiUseInfo_serial .intoFightDisplay_p1").html(player_html);
	$(".multiUseInfo_intoBattle .multiUseInfo_serial .intoFightDisplay_p2").html(enemyTarget.buildData.html);
	$(".multiUseInfo_intoBattle .multiUseInfo_serial .intoFightDisplay_p2 > div").html(enemyBodyHTML);
}

function intoBattle_btnInit(run)
{
	if(run)
	{
		$(".multiUseInfo_intoFight_option_attack")[0].addEventListener("click", intoBattle_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].addEventListener("click", intoBattle_btnEvent, false);

		$(".multiUseInfo_intoFight_option_attack")[0].addEventListener("touchend", intoBattle_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].addEventListener("touchend", intoBattle_btnEvent, false);

		$(".multiUseInfo_intoFight_option_attack")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].addEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		// Temp.js
		keyboardSignal_multiInfoUse_init();
	}

	else
	{
		$(".multiUseInfo_intoFight_option_attack")[0].removeEventListener("click", intoBattle_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].removeEventListener("click", intoBattle_btnEvent, false);

		$(".multiUseInfo_intoFight_option_attack")[0].removeEventListener("touchend", intoBattle_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].removeEventListener("touchend", intoBattle_btnEvent, false);

		$(".multiUseInfo_intoFight_option_attack")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);
		$(".multiUseInfo_intoFight_option_escape")[0].removeEventListener("mouseover", multiUseInfoScreen_general_btnEvent, false);

		$(".multiUseInfo_intoFight_option_attack").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_intoFight_option_escape").addClass("multiUseInfo_option_disabled");

		keyboardSignal_multiInfoUse_cancel();
	}
}

function intoBattle_btnEvent(event)
{
	intoBattle_btnInit(false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_intoFight_option_attack" || _cl === "multiUseInfo_intoFight_option_escape")
		{
			if(_cl === "multiUseInfo_intoFight_option_attack")
			{
				screen_multiInfoUse.optionSelected = "FIGHT";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_intoFight_option_escape";
			}

			if(_cl === "multiUseInfo_intoFight_option_escape")
			{
				screen_multiInfoUse.optionSelected = "RUN";

				screen_multiInfoUse.eventTrigger = ".multiUseInfo_intoFight_option_attack";
			}
		}
	}

	$(screen_multiInfoUse.eventTrigger).toggleClass("multiUseInfo_option_hide", "multiUseInfo_option_show");

	multiUseInfoScreen_removeTitleSoft(intoBattle_btnSelected);
}

function intoBattle_btnSelected()
{
	var exitFrame;

	switch(screen_multiInfoUse.optionSelected)
	{
		case "FIGHT":
		{
			screen_multiInfoUse.goIntoBattle = true;

			theBattle_init(preBattleOptions);

			theBattle_build();

			multiUseInfoScreen_rise(null);

			break;
		}

		case "RUN":
		{
			screen_multiInfoUse.returnFromBattle = true;

			$("#display_wrapper").html(preBattleOptions.html.display_inner_world);
			$("#display_wrapper .player").html("");
			$("#display_wrapper .player").html(control.html_player);

			screen_multiInfoUse.plugControl = true;

			multiUseInfoScreen_rise(null);

			break;
		}
	}
}

function multiUseInfoScreen_general_btnEvent(event)
{
	keyboardSignal_multiInfoUse_signalClean(0);
	keyboardSignal_multiInfoUse_signalClean(1);
}

function multiUseInfoScreen_removeTitle()
{
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").addClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_rise, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("transitionend", multiUseInfoScreen_rise, false);
}

function multiUseInfoScreen_removeTitleSoft(eventFunct)
{
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").addClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("webkitTransitionEnd", eventFunct, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("transitionend", eventFunct, false);
}

function multiUseInfoScreen_rise(event)
{
	trace("!!! multiUseInfoScreen_rise(event);")
	trace(screen_multiInfoUse);

	if(event != null)
	{
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_rise, false);
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", multiUseInfoScreen_rise, false);
	}

	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_riseEnd, false);
	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("transitionend", multiUseInfoScreen_riseEnd, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_show").addClass("multiUseInfo_cont_hide");

}

function multiUseInfoScreen_riseEnd(event)
{
	var eventCheck = EventSignal(event.target.classList, "tween-multiUseInfo_cont");

	if(eventCheck)
	{
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_riseEnd, false);
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("transitionend", multiUseInfoScreen_riseEnd, false);

		if(screen_multiInfoUse.riseEndFunct != null || screen_multiInfoUse.riseEndFunct != undefined)
		{
			screen_multiInfoUse.riseEndFunct();
		}

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_wrapper").remove();

		multiUseInfoScreen_purge();
	}
}

function multiUseInfoScreen_purge()
{
	if(screen_multiInfoUse.infoDisplay === "OPTIONS" || screen_multiInfoUse.infoDisplay === "SOUND_GLOBAL")
	{
		move_plugIn();
	}

	if(screen_multiInfoUse.infoDisplay === "BATTLE_FAIL")
	{
		alert("FAULT");

		optionsTrigger_init(true);

		worldReturn_slideReturnApply();
	}


	if(screen_multiInfoUse.returnFromBattle)
	{
		screen_multiInfoUse.returnFromBattle = false;
	}

	if(screen_multiInfoUse.plugControl)
	{
		screen_multiInfoUse.plugControl = false;

		move_plugIn();
	}

	delete screen_multiInfoUse;

	// ADD BACK IN
	if(screen_multiInfoUse.aboutSectionGuide)
	{
		// HACK
	}

	else if(screen_multiInfoUse.goIntoBattle)
	{
		// HACK
	}

	else
	{
		optionsTrigger_init(true);
	}
}

///////////////////////////////// --- MULTI_USE_SCREEN

///////////////////////////////// --- KEYBOARD CONTROLS

function keyboardSignal_multiInfoUse_init()
{
	screen_multiInfoUse_keyboard = {};

	screen_multiInfoUse_keyboard.countTap = "DEFAULT";

	screen_multiInfoUse_keyboard.signal_0 = null;
	screen_multiInfoUse_keyboard.signal_1 = null;

	keyboardSignal_multiInfoUse_signalSet();

	$(window)[0].addEventListener("keyup", keyboardSignal_multiInfoUse_event, false);
}

function keyboardSignal_multiInfoUse_signalSet()
{
	switch(screen_multiInfoUse.infoDisplay)
	{
		case "OPTIONS":
		{
			screen_multiInfoUse_keyboard.signal_0 = screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_about";
			screen_multiInfoUse_keyboard.signal_1 = screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_sound";

			break;
		}

		case "ABOUT":
		{
			screen_multiInfoUse_keyboard.signal_0 = screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_read";
			screen_multiInfoUse_keyboard.signal_1 = screen_multiInfoUse.screenRoot + " .multiUseInfo_about .multiUseInfo_about_option_return";

			break;
		}

		case "SOUND_GLOBAL":
		{
			screen_multiInfoUse_keyboard.signal_0 = screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_true";
			screen_multiInfoUse_keyboard.signal_1 = screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_false";

			break;
		}

		case "PREBATTLE":
		{
			screen_multiInfoUse_keyboard.signal_0 = screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_fight";
			screen_multiInfoUse_keyboard.signal_1 = screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_preFight_option_leave";

			break;
		}

		case "INTOBATTLE":
		{
			screen_multiInfoUse_keyboard.signal_0 = screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_attack";
			screen_multiInfoUse_keyboard.signal_1 = screen_multiInfoUse.screenRoot + " .multiUseInfo_intoBattle .multiUseInfo_intoFight_option_escape";

			break;
		}
	}
}

function keyboardSignal_multiInfoUse_event(event)
{
	var signal = false;
	var action = false;

	trace(event);

	// LEFT + DOWN
	if(event.keyCode == 37 || event.keyCode == 40)
	{
		if(screen_multiInfoUse_keyboard.countTap === "DEFAULT")
		{
			screen_multiInfoUse_keyboard.countTap = 0;
		}

		else
		{
			screen_multiInfoUse_keyboard.countTap --;
		}

		if(screen_multiInfoUse_keyboard.countTap < 0)
		{
			screen_multiInfoUse_keyboard.countTap = 1;
		}

		signal = true;
	}

	// RIGHT + UP
	if(event.keyCode == 39 || event.keyCode == 38)
	{
		if(screen_multiInfoUse_keyboard.countTap === "DEFAULT")
		{
			screen_multiInfoUse_keyboard.countTap = 0;
		}

		else
		{
			screen_multiInfoUse_keyboard.countTap ++;
		}

		if(screen_multiInfoUse_keyboard.countTap > 1)
		{
			screen_multiInfoUse_keyboard.countTap = 0;
		}

		signal = true;
	}

	// SPACE + ENTER
	if(event.keyCode == 13 || event.keyCode == 32)
	{
		if(screen_multiInfoUse_keyboard.countTap === "DEFAULT")
		{
			screen_multiInfoUse_keyboard.countTap = 0;
			signal = true;
		}

		action = true;
	}

	if(signal)
	{
		keyboardSignal_multiInfoUse_signal()
	}

	if(action)
	{
		keyboardSignal_multiInfoUse_action()
	}
}

function keyboardSignal_multiInfoUse_signal()
{
	var applyBlock = screen_multiInfoUse_keyboard["signal_" + screen_multiInfoUse_keyboard.countTap].toString();
	var applyClass = "multiUseInfo_keyboard_select-forceState_" + screen_multiInfoUse_keyboard.countTap;

	screen_multiInfoUse_keyboard.countTap == 0 ? keyboardSignal_multiInfoUse_signalClean(1) : keyboardSignal_multiInfoUse_signalClean(0);

	$(applyBlock).addClass(applyClass);

	trace("KEYBOARD COUNT == " + screen_multiInfoUse_keyboard.countTap);
	trace(applyBlock);
}

function keyboardSignal_multiInfoUse_signalClean(signalNum)
{
	var searchBlock = screen_multiInfoUse_keyboard["signal_" + signalNum].toString();
	var searchClass = "multiUseInfo_keyboard_select-forceState_" + signalNum;

	if($(searchBlock).attr("class").search(searchClass) >= 0)
	{
		$(searchBlock).removeClass(searchClass);
	}
}

function keyboardSignal_multiInfoUse_action()
{
	var triggerTargetBlock;
	var triggerTargetClass;

	triggerTargetBlock = screen_multiInfoUse_keyboard["signal_" + screen_multiInfoUse_keyboard.countTap].toString();

	triggerTargetClass = $(triggerTargetBlock).attr("data-direct-class") || null;

	if(triggerTargetClass != null)
	{
		$("." + triggerTargetClass).trigger("click");
	}
}

function keyboardSignal_multiInfoUse_cancel()
{
	$(window)[0].removeEventListener("keyup", keyboardSignal_multiInfoUse_event, false);

	screen_multiInfoUse_keyboard = {};

	delete screen_multiInfoUse_keyboard;
}

///////////////////////////////// --- KEYBOARD CONTROLS



///////////////////////////////// --- PORTAL_SCREEN

function portalScreen_init()
{
	PortalScreen = {};
	PortalScreen.html = "";
	PortalScreen.displayed = false;
	PortalScreen.delay = null;

	html_lib_reuse();

	PortalScreen.html = html_lib_use("_portalScreen", false, true);

	html_lib_empty();
}

function portalScreen_request()
{
	PortalScreen.displayed = true;

	$("#portalScreen").html(PortalScreen.html);

	$("#portalScreen .newPortalScreen_content").addClass("newPortalScreen_hide");

	// EXIT FRAME
	PortalScreen.delay = setTimeout(portalScreen_run, 100); // 20
}

function portalScreen_run()
{
	$("#portalScreen .tween-displayErrorContent")[0].addEventListener("webkitTransitionEnd", portalScreen_screen0, false);

	$("#portalScreen .tween-displayErrorContent")[0].addEventListener("transitionend", portalScreen_screen0, false);

	$("#portalScreen .newPortalScreen_content").removeClass("newPortalScreen_hide").addClass("newPortalScreen_show");
}

function portalScreen_screen0(event)
{
	$("#portalScreen .tween-displayErrorContent")[0].removeEventListener("webkitTransitionEnd", portalScreen_screen0, false);

	$("#portalScreen .tween-displayErrorContent")[0].removeEventListener("transitionend", portalScreen_screen0, false);


	PortalScreen.delay = setTimeout(portalScreen_screen1, 4 * 1000);

	level_clear();

	level_init();

	$("#portalScreen .message p").html(LEVEL_MAIN.titleData.top);

	$("#portalScreen .message").css("opacity", "1");
}

function portalScreen_screen1()
{
	$("#portalScreen .tween-displayErrorContent")[0].addEventListener("webkitTransitionEnd", portalScreen_remove, false);

	$("#portalScreen .tween-displayErrorContent")[0].addEventListener("transitionend", portalScreen_remove, false);

	$("#portalScreen .newPortalScreen_content").removeClass("newPortalScreen_show").addClass("newPortalScreen_hide");


	if(soundEffects_pedal != null)
	{
		sound_level_background();
	}

}

function portalScreen_remove(event)
{
	$("#portalScreen .tween-displayErrorContent")[0].removeEventListener("webkitTransitionEnd", portalScreen_remove, false);

	$("#portalScreen .tween-displayErrorContent")[0].removeEventListener("transitionend", portalScreen_remove, false);


	$("#portalScreen").html("");

	level_player_setup();

	autoMove_init("PORTAL_PLACE");

	PortalScreen.displayed = false;
}

///////////////////////////////// --- PORTAL_SCREEN


///////////////////////////////// --- OUTCOME SCREENS

function resultOutcome_init()
{
	resultOutcome = {};

	resultOutcome.html 		= {};
	resultOutcome.header 	= {};

	html_lib_reuse();

	resultOutcome.html.taunt_main = html_lib_use("_resultOutcome", false, true);

	resultOutcome.header.taunt_win = "nice!";
	resultOutcome.header.taunt_lose = "fail!";

	html_lib_empty();

	$("#outcomeScreen").html(resultOutcome.html.taunt_main);

	if(BATTLE_NAV.game.result === "WIN")
	{
		$("#outcomeScreen").addClass("outcome_win");

		$("#outcomeScreen .resultOutcome_header h1").html(resultOutcome.header.taunt_win);

		$("#outcomeScreen .pixels_resultOutcomeScreen").addClass("pixels_resultOutcomeScreenWin");
	}

	if(BATTLE_NAV.game.result === "LOSE")
	{
		$("#outcomeScreen").addClass("outcome_lose");

		$("#outcomeScreen .resultOutcome_header h1").html(resultOutcome.header.taunt_lose);

		$("#outcomeScreen .pixels_resultOutcomeScreen").addClass("pixels_resultOutcomeScreenLose");
	}
}

function resultOutcome_request()
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_requestEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_requestEvent, false);

	$("#outcomeScreen .resultOutcome_content").removeClass("resultOutcomeContent_hide").addClass("resultOutcomeContent_show");
}

function resultOutcome_requestEvent(event)
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_requestEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_requestEvent, false);


	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_revealEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_revealEvent, false);


	$("#outcomeScreen .resultOutcome_boss").addClass("tween-bossFailTauntBoss");

	$("#outcomeScreen .resultOutcome_fill").addClass("bossFailTauntFill_hide");
}

function resultOutcome_revealEvent(event)
{
	var delay;

	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_revealEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_revealEvent, false);

	$("#outcomeScreen .resultOutcome_fill").remove();

	delay = setTimeout(resultOutcome_showOutcome, 1 * 1000);
}

function resultOutcome_showOutcome()
{
	var delay;

	$("#outcomeScreen .resultOutcome_header").removeClass("resultOutcomeHeader_hide").addClass("resultOutcomeHeader_show");

	if(BATTLE_NAV.game.result === "LOSE" && battleEngine.firstZombie && !game_levelFinal)
	{
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_wrapper").remove();
	}

	else if(!game_levelFinal)
	{
		delete screen_multiInfoUse;

		allBattleOver_battleEnd_return_end(BATTLE_NAV.game.result);
	}

	else if(game_levelFinal)
	{
		delete screen_multiInfoUse;

		$("#display_finalLevel").html("");

		allBattleOver_battleEnd_return_end("BOSS_FAIL");
	}

	delay = setTimeout(resultOutcome_hideAll, 1.5 * 1000);
}

function resultOutcome_hideAll()
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_hideAllEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_hideAllEvent, false);

	$("#outcomeScreen .resultOutcome_content").removeClass("resultOutcomeContent_show").addClass("resultOutcomeContent_hide");
}

function resultOutcome_hideAllEvent(event)
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_hideAllEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_hideAllEvent, false);

	// FLUSH
	$("#outcomeScreen").html("");

	if(BATTLE_NAV.game.result === "LOSE" && !game_levelFinal && battleEngine.firstZombie)
	{
		battleEngine.firstZombie = false;

		multiUseInfoScreen_purge();
	}

	// TODO
	else if(BATTLE_NAV.game.result === "LOSE" && game_levelFinal)
	{
		$("#display_wrapper #roam_wrapper .player").css("opacity", "1");

		optionsTrigger_init(true);

		worldReturn_slideReturnApply();

		$("#display_finalLevel").addClass("ignoreMouseEvents");

		game_levelFinal = false;
	}

	else
	{
		optionsTrigger_init(true);

		worldReturn_slideReturnApply();
	}
}

///////////////////////////////// --- OUTCOME SCREENS


///////////////////////////////// --- GAME MESSAGES

function messageScreen_init()
{
	var messageScreen_html;
	var exitFrame;
	var css;

	html_lib_reuse();

	messageScreen_html = html_lib_use("_messageScreen", false, true);

	html_lib_empty();

	$("#messageScreen").html(messageScreen_html);

	$("#messageScreen .messageScreen_friend").html(friendTarget.buildData.html);

	if(friendTarget.enemy)
	{
		$("#messageScreen .messageScreen_friend > div").html(enemyBodyHTML);
	}

	//OPTIMISED TARGETING
	$("#messageScreen .messageScreen_friend > div").removeAttr("id");

	css = {
					"width" 						: friendTarget.buildData.w + "px",
					"height" 						: friendTarget.buildData.h + "px",
					"-webkit-transform"	: "translateY(" + -(friendTarget.buildData.h) + "px)",
					"transform"					: "translateY(" + -(friendTarget.buildData.h) + "px)"
				};

	$("#messageScreen .messageScreen_friend").css(css);

	$("#messageScreen .messageScreen_focus .messageScreen_text p").html(friendTarget.hint);

	if(friendTarget.scene.customFog)
	{
		$("#messageScreen .foggyEdge").addClass(friendTarget.scene.customFog);
	}

	else
	{
		$("#messageScreen .foggyEdge").addClass("foggyEdge-" + LEVEL_MAIN.landType);
	}

	if(friendTarget.scene.customDarkness)
	{
		// $("#messageScreen .messageScreenLand_darkness").addClass(friendTarget.scene.customDarkness);
	}

	else
	{
		// $("#messageScreen .messageScreenLand_darkness").addClass("darkness-" + LEVEL_MAIN.landType);
	}

	$("#messageScreen .behindWorld").addClass(friendTarget.scene.bg);
	$("#messageScreen .messageScreenLand_grass").addClass(friendTarget.flooring.grass);

	if(friendTarget.flooring.customHaze)
	{
		$("#messageScreen .messageScreen_haze").addClass(friendTarget.flooring.customHaze);
	}

	else
	{
		// $("#messageScreen .messageScreen_haze").addClass("haze-" + LEVEL_MAIN.landType);
	}

	if(friendTarget.flooring.customFill)
	{
		$("#messageScreen .messageScreenLand_fieldFill").addClass(friendTarget.flooring.customFill);
	}

	else
	{
		// $("#messageScreen .messageScreenLand_fieldFill").addClass("field-floor-" + LEVEL_MAIN.landType);
		$("#messageScreen .messageScreenLand_fieldFill").addClass(LEVEL_MAIN.floorType);
	}


	$("#messageScreen").removeClass("messageScreen_hide");

	exitFrame = setTimeout(messageScreen_run, 20);
}

function messageScreen_run()
{
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", messageScreen_runEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", messageScreen_runEvent, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_hide").addClass("messageScreenFlare_show");
}

function messageScreen_runEvent(event)
{
	var delay;

	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", messageScreen_runEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", messageScreen_runEvent, false);

	if(friendTarget.once)
	{
		friendTarget.seen = true;

		$("#" + friendTarget.id).remove();
	}

	$("#messageScreen .messageScreen_text p").removeClass("messageScreenText_hide").addClass("messageScreenText_show");

	$("#messageScreen .messageScreen_fullFill").addClass("messageScreenFullFill_show");

	$("#messageScreen .messageScreen_main").removeClass("messageScreen_hide");
	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_show").addClass("messageScreenFlare_hide");

	delay = setTimeout(messageScreen_end, friendTarget.time * 1000);
}

function messageScreen_end()
{
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", messageScreen_endEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", messageScreen_endEvent, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_hide").addClass("messageScreenFlare_show");
}

function messageScreen_endEvent(event)
{
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", messageScreen_endEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", messageScreen_endEvent, false);

	$("#messageScreen .messageScreen_main").addClass("messageScreen_hide");

	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", messageScreen_purge, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", messageScreen_purge, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_show").addClass("messageScreenFlare_hide");
}

function messageScreen_purge(event)
{
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", messageScreen_purge, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", messageScreen_purge, false);

	$("#messageScreen").html("");

	friendTarget = {};

	move_plugIn();
}

///////////////////////////////// --- GAME MESSAGES


///////////////////////////////// --- ABOUT SECTION

function about_setup()
{
	aboutSection = {};

	html_lib_reuse();
	aboutSection._html = html_lib_use("_about", false, true);
	html_lib_empty();

	aboutSection._replay = false;
}

function about_build()
{
	// TODO BUILD PAGE FROM HTML

	$("#options_wrapper .options-about").removeClass("about-hide");
	$("#options_wrapper .options-about").html(aboutSection._html);

	$("#options_wrapper .options-about .display_about").removeClass("display_about_hide");
}

function about_run()
{
	aboutSection._tweens = new Array();

	// TODO CALL ON DROP
	about_init();
}

function about_clear()
{
	clearTimeout(aboutSection._delay);
	css_tween_clear(aboutSection._tweens);
}

function about_init()
{
	$(".display_about .about_mainA")[0].addEventListener("webkitTransitionEnd", about_init_event, false);
	$(".display_about .about_mainA")[0].addEventListener("transitionend", about_init_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainA", "about_init_event");

	$(".display_about .about_mainA").removeClass("about_hide");
}

function about_init_event(event)
{
	$(".display_about .about_mainA")[0].removeEventListener("webkitTransitionEnd", about_init_event, false);
	$(".display_about .about_mainA")[0].removeEventListener("transitionend", about_init_event, false);

	about_slideA_init();
}

function about_slideA_init()
{
	$(".display_about .about_mainA .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideA_event, false);
	$(".display_about .about_mainA .about_goat")[0].addEventListener("animationend", about_slideA_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainA .about_goat", "about_slideA_event");

	aboutSection._delay = setTimeout(about_slideA_run, 1 * 1000);
}

function about_slideA_run()
{
	$(".display_about .about_mainA .about_goat").addClass("tween-aboutA");
	$(".display_about .about_mainA .about_goat .about_goatSprite").addClass("tween-about_goatSprite");
}

function about_slideA_event(event)
{
	$(".display_about .about_mainA .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideA_event, false);
	$(".display_about .about_mainA .about_goat")[0].removeEventListener("animationend", about_slideA_event, false);

	$(".display_about .about_mainA")[0].addEventListener("webkitTransitionEnd", about_slideB_show, false);
	$(".display_about .about_mainA")[0].addEventListener("transitionend", about_slideB_show, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainA", "about_slideB_show");

	$(".display_about .about_mainA").addClass("about_hide");
}

function about_slideB_show(event)
{
	$(".display_about .about_mainA")[0].removeEventListener("webkitTransitionEnd", about_slideB_show, false);
	$(".display_about .about_mainA")[0].removeEventListener("transitionend", about_slideB_show, false);


	$(".display_about .about_mainA .about_goat").removeClass("tween-aboutA");
	$(".display_about .about_mainA .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");


	$(".display_about .about_mainB")[0].addEventListener("webkitTransitionEnd", about_slideB_show_event, false);
	$(".display_about .about_mainB")[0].addEventListener("transitionend", about_slideB_show_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainB", "about_slideB_show_event");


	$(".display_about .about_mainB").removeClass("about_hide");
}

function about_slideB_show_event(event)
{
	$(".display_about .about_mainB")[0].removeEventListener("webkitTransitionEnd", about_slideB_show_event, false);
	$(".display_about .about_mainB")[0].removeEventListener("transitionend", about_slideB_show_event, false);

	about_slideB_run();
}

function about_slideB_run()
{
	$(".display_about .about_mainB .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideB_event, false);
	$(".display_about .about_mainB .about_goat")[0].addEventListener("animationend", about_slideB_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainB .about_goat", "about_slideB_event");

	$(".display_about .about_mainB .about_goat").addClass("tween-aboutB");
	$(".display_about .about_mainB .about_goat .about_goatSprite").addClass("tween-about_goatSprite");

	$(".display_about .about_mainB .about_warning_N").addClass("tween-aboutBN");
	$(".display_about .about_mainB .about_warning_Y").addClass("tween-aboutBY");
}

function about_slideB_event(event)
{
	$(".display_about .about_mainB .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideB_event, false);
	$(".display_about .about_mainB .about_goat")[0].removeEventListener("animationend", about_slideB_event, false);


	$(".display_about .about_mainB")[0].addEventListener("webkitTransitionEnd", about_slideC_show, false);
	$(".display_about .about_mainB")[0].addEventListener("transitionend", about_slideC_show, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainB", "about_slideC_show");

	aboutSection._delay = setTimeout(about_slideB_delayHide, 0.6 * 1000);

}

function about_slideB_delayHide()
{
	// TODO
	$(".display_about .about_mainB").addClass("about_hide");
}

function about_slideC_show(event)
{
	$(".display_about .about_mainB")[0].removeEventListener("webkitTransitionEnd", about_slideC_show, false);
	$(".display_about .about_mainB")[0].removeEventListener("transitionend", about_slideC_show, false);

 	$(".display_about .about_mainB .about_goat").removeClass("tween-aboutB");
	$(".display_about .about_mainB .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");

	$(".display_about .about_mainB .about_warning_N").removeClass("tween-aboutBN");
	$(".display_about .about_mainB .about_warning_Y").removeClass("tween-aboutBY");

	$(".display_about .about_mainC")[0].addEventListener("webkitTransitionEnd", about_slideC_show_event, false);
	$(".display_about .about_mainC")[0].addEventListener("transitionend", about_slideC_show_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainC", "about_slideC_show_event");

	$(".display_about .about_mainC").removeClass("about_hide");
}

function about_slideC_show_event(event)
{
	$(".display_about .about_mainC")[0].removeEventListener("webkitTransitionEnd", about_slideC_show_event, false);
	$(".display_about .about_mainC")[0].removeEventListener("transitionend", about_slideC_show_event, false);

	about_slideC_run0();
}

function about_slideC_run0()
{
	$(".display_about .about_mainC .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideC_run0_event, false);
	$(".display_about .about_mainC .about_goat")[0].addEventListener("animationend", about_slideC_run0_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainC .about_goat", "about_slideC_run0_event");

	$(".display_about .about_mainC .about_goat").addClass("tween-aboutC-goat");
	$(".display_about .about_mainC .about_goat .about_goatSprite").addClass("tween-about_goatSprite");
}

function about_slideC_run0_event(event)
{
	$(".display_about .about_mainC .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideC_run0_event, false);
	$(".display_about .about_mainC .about_goat")[0].removeEventListener("animationend", about_slideC_run0_event, false);

	$(".display_about .about_mainC .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");

	about_slideC_run1();
}

function about_slideC_run1()
{
	$(".display_about .about_mainC .about_boss_move")[0].addEventListener("webkitAnimationEnd", about_slideC_run1_event, false);
	$(".display_about .about_mainC .about_boss_move")[0].addEventListener("animationend", about_slideC_run1_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainC .about_boss_move", "about_slideC_run1_event");

	$(".display_about .about_mainC .about_boss_move").addClass("tween-aboutC-boss");
}

function about_slideC_run1_event(event)
{
	$(".display_about .about_mainC .about_boss_move")[0].removeEventListener("webkitAnimationEnd", about_slideC_run1_event, false);
	$(".display_about .about_mainC .about_boss_move")[0].removeEventListener("animationend", about_slideC_run1_event, false);

	aboutSection._delay = setTimeout(about_slideC_run2, 0.4 * 1000);
}

function about_slideC_run2()
{
	$(".display_about .about_mainC .about_bossSprite").addClass("tween-about_bossSprite");

	if(aboutSection._replay)
	{
		aboutSection._delay = setTimeout(about_replay, 4 * 1000);
	}

	else
	{
		aboutSection._delay = setTimeout(about_return, 4 * 1000);
	}
}

function about_replay()
{
	$(".display_about .about_mainC")[0].addEventListener("webkitTransitionEnd", about_replay_event, false);
	$(".display_about .about_mainC")[0].addEventListener("transitionend", about_replay_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainC", "about_replay_event");

	$(".display_about .about_mainC").addClass("about_hide");


}

function about_replay_event(event)
{
	$(".display_about .about_mainC")[0].removeEventListener("webkitTransitionEnd", about_replay_event, false);
	$(".display_about .about_mainC")[0].removeEventListener("transitionend", about_replay_event, false);

	$(".display_about .about_mainC .about_goat").removeClass("tween-aboutC-goat");
	$(".display_about .about_mainC .about_boss_move").removeClass("tween-aboutC-boss");
	$(".display_about .about_mainC .about_bossSprite").removeClass("tween-about_bossSprite");

	about_run();
}

function about_return()
{
	$("#options_wrapper .tween-display_about")[0].addEventListener("webkitTransitionEnd", about_return_event, false);

	$("#options_wrapper .tween-display_about")[0].addEventListener("transitionend", about_return_event, false);

	$("#options_wrapper .display_about"). addClass("display_about_hide");
}

function about_return_event(event)
{
	$("#options_wrapper .tween-display_about")[0].removeEventListener("webkitTransitionEnd", about_return_event, false);

	$("#options_wrapper .tween-display_about")[0].removeEventListener("transitionend", about_return_event, false);

	about_clear();
	aboutSection._tweens = new Array();

	$("#options_wrapper .options-about").addClass("about-hide");
	$("#options_wrapper .options-about").html("");

	move_plugIn();
	optionsTrigger_init(true);
	screen_multiInfoUse.aboutSectionGuide = false;
}

///////////////////////////////// --- ABOUT SECTION


