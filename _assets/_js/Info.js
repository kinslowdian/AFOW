
	var screen_multiInfoUse;

	/* --- OPTIONS */

	function optionsTrigger_init(run)
	{
		if(run)
		{
			$(".options-trigger")[0].addEventListener("click", optionsTrigger_event, false);
			$(".options-trigger")[0].addEventListener("touchend", optionsTrigger_event, false);
		}

		else
		{
			$(".options-trigger")[0].removeEventListener("click", optionsTrigger_event, false);
			$(".options-trigger")[0].removeEventListener("touchend", optionsTrigger_event, false);
		}
	}

	function optionsTrigger_event(event)
	{
		var exitFrame;

		optionsTrigger_init(false);

		multiUseInfoScreen_build("#options_wrapper .options-choice", "OPTIONS");

		exitFrame = setTimeout(optionsTrigger_run, 20);
	}

	function optionsTrigger_run()
	{
		multiUseInfoScreen_drop();
	}

	/* --- OPTIONS */


	/* --- MULTI_USE_SCREEN */

	function multiUseInfoScreen_build(plugInto, screenType)
	{
		var buildData = {};

		html_lib_reuse();

		screen_multiInfoUse = {};
		screen_multiInfoUse.screenRoot = plugInto;
		screen_multiInfoUse.infoDisplay = screenType;
		screen_multiInfoUse.dropEndFunct = null;
		screen_multiInfoUse.riseEndFunct = null;
		screen_multiInfoUse.eventTrigger = "";

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

				screen_multiInfoUse.dropEndFunct = battleFail_display;

				break;
			}

			case "PREBATTLE":
			{
				buildData = multiUseInfoScreen_buildData("_multiUseInfo_br_preFight", "nav_prebattle", false);

				$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
				$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_preBattle");
				$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_br").append(buildData.art_html);

				$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_entranceLine0").html(buildData.title_0);
				$(screen_multiInfoUse.screenRoot + " .multiUseInfo_preBattle .multiUseInfo_entranceLine1").html(multiUseInfoScreen_randomLine("nav_prebattle", "enemy"));

				screen_multiInfoUse.dropEndFunct = preBattle_display;

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

		// var randomLine = {};

		// randomLine.j_node = new Array();
		// randomLine.j_node 		= Logic.dat_ROM["_NAVIGATION"][json_text][json_data];
		// randomLine.j_length		= Logic.dat_ROM["_NAVIGATION"][json_text][json_data].length;
		// randomLine.j_select 	= Math.floor(Math.random * this.j_node.length);

		// return randomLine.j_select;
		// return randomLine.j_node;
		// delete randomLine;

		return randomLine_final;
	}

	function multiUseInfoScreen_forcePlace()
	{
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("tween-multiUseInfo_cont");

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_hide");
	}

	function multiUseInfoScreen_drop()
	{
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_dropEnd, false);
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("transitionend", multiUseInfoScreen_dropEnd, false);

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").toggleClass("multiUseInfo_cont_hide", "multiUseInfo_cont_show");
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
		var delay_startIntro;

		$(".multiUseInfo_intro .multiUseInfo_speech_40x40").toggleClass("multiUseInfo_speech_hide", "multiUseInfo_speech_show");

		timerList_init();
		delay_startIntro = new AnimationTimer();
		timerList_add(delay_startIntro);
		delay_startIntro.time(3, startIntro_optionsHintComplete);
	}

	function startIntro_optionsHintComplete()
	{
		timerList_destroy();

		multiUseInfoScreen_removeTitleSoft(startIntro_optionsHintRemove);
	}

	function startIntro_optionsHintRemove(event)
	{
		var exitFrame;

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", startIntro_optionsHintRemove, false);

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", startIntro_optionsHintRemove, false);

		multiUseInfoScreen_build("#options_wrapper .options-select", "CONTROL");

		exitFrame = setTimeout(multiUseInfoScreen_drop, 20);
	}

	// -------- START_INTRO

	// -------- CONTROL_INTRO

	function controlIntro_hint()
	{
		var delay_startIntro;

		$("#options_wrapper .options-choice").html("");

		timerList_init();
		delay_controlIntro = new AnimationTimer();
		timerList_add(delay_controlIntro);
		delay_controlIntro.time(3, controlIntro_hintComplete);
	}

	function controlIntro_hintComplete()
	{
		timerList_destroy();
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
		}

		else
		{
			$(".multiUseInfo_options_option_about")[0].removeEventListener("click", options_btnEvent, false);
			$(".multiUseInfo_options_option_sound")[0].removeEventListener("click", options_btnEvent, false);

			$(".multiUseInfo_options_option_about")[0].removeEventListener("touchend", options_btnEvent, false);
			$(".multiUseInfo_options_option_sound")[0].removeEventListener("touchend", options_btnEvent, false);

			$(".multiUseInfo_cont_entrance")[0].removeEventListener("click", options_btnEvent, false);
			$(".multiUseInfo_cont_entrance")[0].removeEventListener("touchend", options_btnEvent, false);

			$(".multiUseInfo_options_option_about").addClass("multiUseInfo_option_disabled");
			$(".multiUseInfo_options_option_sound").addClass("multiUseInfo_option_disabled");
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
					html_lib_reuse();

					multiUseInfoScreen_build("#options_wrapper .options-select", "ABOUT");

					html_lib_empty();

					exitFrame = setTimeout(multiUseInfoScreen_drop, 20);

				break;
			}

			case "SOUND":
			{

					html_lib_reuse();

					multiUseInfoScreen_build("#options_wrapper .options-select", "SOUND_GLOBAL");

					html_lib_empty();

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
		}

		else
		{
			$(".multiUseInfo_about_option_read")[0].removeEventListener("click", aboutOptions_btnEvent, false);
			$(".multiUseInfo_about_option_return")[0].removeEventListener("click", aboutOptions_btnEvent, false);

			$(".multiUseInfo_about_option_read")[0].removeEventListener("touchend", aboutOptions_btnEvent, false);
			$(".multiUseInfo_about_option_return")[0].removeEventListener("touchend", aboutOptions_btnEvent, false);

			$(".multiUseInfo_about_option_read").addClass("multiUseInfo_option_disabled");
			$(".multiUseInfo_about_option_return").addClass("multiUseInfo_option_disabled");
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
		window.open("http://www.simonkinslow.com", "menubar=yes, resizable=yes, scrollbars=yes, status=yes, titlebar=yes", "_blank");
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
		}

		else
		{
			$(".multiUseInfo_sound_option_true")[0].removeEventListener("click", soundGlobalOptions_btnEvent, false);
			$(".multiUseInfo_sound_option_false")[0].removeEventListener("click", soundGlobalOptions_btnEvent, false);

			$(".multiUseInfo_sound_option_true")[0].removeEventListener("touchend", soundGlobalOptions_btnEvent, false);
			$(".multiUseInfo_sound_option_false")[0].removeEventListener("touchend", soundGlobalOptions_btnEvent, false);

			$(".multiUseInfo_sound_option_true").addClass("multiUseInfo_option_disabled");
			$(".multiUseInfo_sound_option_false").addClass("multiUseInfo_option_disabled");
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

				break;
			}

			case "SOUND_FALSE":
			{

				break;
			}
		}
	}

	// -------- GLOBAL_SOUND

	// -------- BATTLE_FAIL

	function battleFail_display()
	{
		$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("webkitTransitionEnd", battleFail_displayEnd, false);
		$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("transitionend", battleFail_displayEnd, false);

		$(".multiUseInfo_fail .map-enemy_40x40-legs").toggleClass("tween-map-enemy_40x40_loop", "tween-map-enemy_40x40_stop");

		$(".multiUseInfo_fail .multiUseInfo_fail_character").toggleClass("multiUseInfo_fail_character_hide", "multiUseInfo_fail_character_show");
	}

	function battleFail_displayEnd(event)
	{
		var delay_failScreen;

		$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].removeEventListener("webkitTransitionEnd", battleFail_displayEnd, false);
		$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].removeEventListener("transitionend", battleFail_displayEnd, false);

		$(".multiUseInfo_fail .map-enemy_40x40-head").addClass("map-enemy_40x40_head_fear");

		delay_failScreen = new AnimationTimer();

		timerList_add(delay_failScreen);
		delay_failScreen.time(1.5, battleFail_removeInit);
	}

	function battleFail_removeInit()
	{
		multiUseInfoScreen_removeTitleSoft(battleFail_removeEnd);
	}

	function battleFail_removeEnd(event)
	{
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", battleFail_removeEnd, false);

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", battleFail_removeEnd, false);

		battleEnd_battleOver_returnPath();
	}

	// -------- BATTLE_FAIL

	// -------- PREBATTLE

	function preBattle_display()
	{

	}

	// -------- PREBATTLE

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
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_rise, false);
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", multiUseInfoScreen_rise, false);

		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_riseEnd, false);
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("transitionend", multiUseInfoScreen_riseEnd, false);

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_show");
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_cont_hide");
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
			delete screen_multiInfoUse;

			optionsTrigger_init(true);
	}

	/* --- MULTI_USE_SCREEN */