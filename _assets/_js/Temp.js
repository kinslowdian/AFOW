	trace("Temp.js being used -- remove from final build / release");


	function smasher()
	{
		var css;

		css = 	{
/*
					"-webkit-transform-origin"	: "50% 50%",
					"transform-origin"			: "50% 50%",
*/
					"-webkit-transform"			: "scale(0.4)",
					"transform"					: "scale(0.4)"
				};

		$(".microBattle_fade_main").css(css);
		$(".stage-view-y").css(css);
	}


/*
	function battleUserInfo_place()
	{
		var set_css;

		var set_y = $("#battle-cloud").height();

		var set_h = Math.abs(set_y - document.height);

		set_css	= 	{
						"height"	: set_h + "px",
						"top"		: set_y + "px"
					};


		$("#microBattle_darkness .microBattle_darkness_info").css(set_css);
	}
*/


	/////////////////////////// KEYBOARD HINT


	/////////////////////////// KEYBOARD HINT


	var battleEngine = 	{
							gameStats : null,

							difficulty : null,

							levelsCleared : new Array(),

							init	: function(levelTotal, diff_e, diff_m, diff_h, diff_s) // BOSS ROUNDS ???
							{
								this.gameStats = {};

								this.gameStats.win 		= 0;
								this.gameStats.lose		= 0;
								this.gameStats.draw		= 0;
								this.gameStats.play		= 0;

								this.difficulty = {};

								this.difficulty.easy 	= diff_e;
								this.difficulty.medium 	= diff_m;
								this.difficulty.hard	= diff_h;
								this.difficulty.max		= diff_s;

								for(var i = 0; i < levelTotal; i++)
								{
									this.levelsCleared.push(false);
								}
							},

							playerLevelSort	: function(player_ob)
							{
								player_ob.sword = {};

								// EASY
								if(player_ob.rating >= this.difficulty.easy && player_ob.rating < this.difficulty.medium)
								{
									player_ob.sword.skill 		= "apprentice";
									player_ob.sword.fullStrike 	= 51;
									player_ob.sword.magic 		= 5;
								}

								// MEDIUM
								else if(player_ob.rating >= this.difficulty.medium && player_ob.rating < this.difficulty.hard)
								{
									player_ob.sword.skill 		= "knight";
									player_ob.sword.fullStrike 	= 71;
									player_ob.sword.magic 		= 40;
								}

								// HARD
								else if(player_ob.rating >= this.difficulty.hard && player_ob.rating < this.difficulty.max)
								{
									player_ob.sword.skill 		= "master";
									player_ob.sword.fullStrike 	= 91;
									player_ob.sword.magic 		= 60;
								}

								// SUPER
								else
								{
									player_ob.sword.skill 		= "lord";
									player_ob.sword.fullStrike 	= 101;
									player_ob.sword.magic 		= 80;
								}

							},

							playerProgress : function(player_ob_win, player_ob_lose, playerIsEnemy)
							{
								var ratingUpdate = false;
								var updateValue = 0;

								if(player_ob_win.rating > player_ob_lose.rating)
								{
									ratingUpdate = false;
								}

								if(player_ob_win.rating == player_ob_lose.rating)
								{
									ratingUpdate = true;
									updateValue = player_ob_win.rating += 1;
								}

								if(player_ob_win.rating < player_ob_lose.rating)
								{
									ratingUpdate = true;

									if(playerIsEnemy)
									{
										updateValue = player_ob_win.rating += player_ob_lose.rating;
									}

									else
									{
										updateValue = player_ob_win.rating += Math.round(player_ob_lose.rating * 0.25); // * 0.5
									}
								}

								if(ratingUpdate)
								{
									player_ob_win.rating = updateValue;

									this.playerLevelSort(player_ob_win);
								}
							},

							battle : function(player_ob, enemy_ob, playerIsBoss)
							{
								var battle_resultString = "";

								var battle_data = {};

								var finalMagic = 0;
								var ratingDrop = 0;

								this.gameStats.play++;


								if(player_ob.sword.skill === enemy_ob.sword.skill)
								{
									if(player_ob.rating >= enemy_ob.rating)
									{
										// IF player_ob LEVEL IS GREATER BY 20 THEY GET FULL MAGIC

										if(Math.abs(player_ob.rating - enemy_ob.rating) > 20)
										{
											finalMagic = player_ob.sword.magic;
										}

										// IF player_ob LEVEL IS ONLY SLIGHTLY GREATER THEY GET LESS MAGIC

										else if(Math.abs(player_ob.rating - enemy_ob.rating) > 10)
										{
											finalMagic = Math.floor(player_ob.sword.magic * 0.25); // 0.25 ??
										}

										// FOR LESS EXPERIENCE AT THAT LEVEL

										else
										{
											finalMagic = Math.floor(player_ob.sword.magic * 0.5); // 0.5 ??
										}
									}

									else
									{
										finalMagic = Math.floor(player_ob.sword.magic * 0.5);
									}
								}

								else
								{
									finalMagic = player_ob.sword.magic;
								}

								battle_data.attack_p = Math.floor(Math.random() * (player_ob.sword.fullStrike - finalMagic) + finalMagic);
								battle_data.attack_e = Math.floor(Math.random() * (enemy_ob.sword.fullStrike - enemy_ob.sword.magic) + enemy_ob.sword.magic);

								//////// ---------- DRAW

								if(battle_data.attack_p === battle_data.attack_e)
								{
									battle_resultString = "DRAW";

									this.gameStats.draw++;
								}

								//////// ---------- WIN

								if(battle_data.attack_p > battle_data.attack_e)
								{
									if(playerIsBoss)
									{

									}

									else
									{
										battle_resultString = "WIN";

										this.playerProgress(player_ob, enemy_ob, false);
										this.playerLevelSort(player_ob);

										this.gameStats.win++;
									}
								}

								//////// ---------- LOSE

								else
								{
									if(playerIsBoss)
									{

									}

									else
									{
										battle_resultString = "LOSE";

										ratingDrop = Math.round(Math.abs(player_ob.rating - (player_ob.rating * 0.4)));

										player_ob.rating = ratingDrop;

										this.playerProgress(enemy_ob, player_ob, false);
										this.playerLevelSort(enemy_ob);

										this.gameStats.lose++;

									}
								}

								return battle_resultString;
							},

							levelClearedCheck : function(list_enemy, list_num)
							{
								var clearCheck = {};

								clearCheck.cleared_level = true;
								clearCheck.cleared_all = true;

								for(var check in list_enemy)
								{
									if(list_enemy[check].spawn == list_num)
									{
										if(list_enemy[check].alive)
										{
											clearCheck.cleared_level = false;
										}
									}
								}

								if(clearCheck.cleared_level)
								{
									this.levelsCleared[list_num] = true;
								}

								for(var all in this.levelsCleared)
								{
									if(!this.levelsCleared[all])
									{
										clearCheck.cleared_all	= false;
									}
								}

								return clearCheck;
							}
						};


/*
	// MIGHT BE USEFUL LATER

	if(BATTLE_NAV.game.result === "LOSE")
	{
		// ENEMY POSITION CHECK USING DATA ATTRIBUTE ("data-npc")
		$('#display_wrapper #display_inner_world #roam_wrapper .enemy-area [data-npc *= "enemy"]').each(function(i, div)
		{
			// NO CSS ADDED (translate(x, y))
			if(!$(div).attr("style"))
			{
				var faulty = $(div).attr("id");

				for(var object_enemy in enemies_ARR)
				{
					// FIND OBJECT TO MATCH FAULTY ID
					if(enemies_ARR[object_enemy].id === faulty)
					{
						// FORCE CSS POSITIONING
						$(div).css(enemy_forcePosition(enemies_ARR[object_enemy]));
					}
				}
			}

		});
	}
*/


	///////////////// DISPLAY

/*
	if(mountains != null || mountains != undefined)
	{
		battleEnd_alignMountains_measure();
	}
*/

	///////////////// DISPLAY

function optionsTrigger_init()
{
	$(".options-trigger")[0].addEventListener("click", optionsTrigger_event, false);
	$(".options-trigger")[0].addEventListener("touchend", optionsTrigger_event, false);
}

function optionsTrigger_event(event)
{
	var exitFrame;

	$(".options-trigger")[0].removeEventListener("click", optionsTrigger_event, false);
	$(".options-trigger")[0].removeEventListener("touchend", optionsTrigger_event, false);

	html_lib_reuse();

	multiUseInfoScreen_build("#options_wrapper .options-choice", "OPTIONS");

	html_lib_empty();

	exitFrame = setTimeout(optionsTrigger_run, 20);
}

function optionsTrigger_run()
{
	multiUseInfoScreen_drop();
}



/*	--------------------------------------- INFO SCREEN*/

var screen_multiInfoUse;

function multiUseInfoScreen_build(plugInto, screenType)
{
	var buildData = {};

	screen_multiInfoUse = {};
	screen_multiInfoUse.screenRoot = plugInto;
	screen_multiInfoUse.infoDisplay = screenType;
	screen_multiInfoUse.dropEndFunct = null;
	screen_multiInfoUse.riseEndFunct = null;

	switch(screen_multiInfoUse.infoDisplay)
	{

		case "START_INTRO":
		{
			buildData.screen_html = html_lib_use("_multiUseInfo", true, true);
			buildData.art_html = html_lib_use("_multiUseInfo_br_intro", true, true);

			buildData.title_0 = Logic.dat_ROM["_NAVIGATION"]["nav_intro"]["title_0"];
			buildData.title_1 = Logic.dat_ROM["_NAVIGATION"]["nav_intro"]["title_1"];

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_intro");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_entranceLine0").text(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_intro .multiUseInfo_entranceLine1").text(buildData.title_1);

			screen_multiInfoUse.dropEndFunct = startIntro_optionsHint;
			screen_multiInfoUse.riseEndFunct = startGame_firstEntrance;

			break;
		}

		case "OPTIONS":
		{
			buildData.screen_html = html_lib_use("_multiUseInfo", true, true);
			buildData.art_html = html_lib_use("_multiUseInfo_br_options", true, true);

			buildData.title_0 = Logic.dat_ROM["_NAVIGATION"]["nav_options"]["title_0"];
			buildData.title_1 = Logic.dat_ROM["_NAVIGATION"]["nav_options"]["title_1"];

			buildData.btn_0 = Logic.dat_ROM["_NAVIGATION"]["nav_options"]["btn_0"];
			buildData.btn_1 = Logic.dat_ROM["_NAVIGATION"]["nav_options"]["btn_1"];

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_options");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_entranceLine0").text(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_entranceLine1").text(buildData.title_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_about").text(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_options .multiUseInfo_options_option_sound").text(buildData.btn_1);

			screen_multiInfoUse.dropEndFunct = options_display;

			break;
		}


		case "SOUND_GLOBAL":
		{
			buildData.screen_html = html_lib_use("_multiUseInfo", true, true);
			buildData.art_html = html_lib_use("_multiUseInfo_br_sound", true, true);

			buildData.title_0 = Logic.dat_ROM["_NAVIGATION"]["nav_sound"]["title_0"];
			buildData.title_1 = Logic.dat_ROM["_NAVIGATION"]["nav_sound"]["title_1"];

			buildData.btn_0 = Logic.dat_ROM["_NAVIGATION"]["nav_sound"]["btn_0"];
			buildData.btn_1 = Logic.dat_ROM["_NAVIGATION"]["nav_sound"]["btn_1"];

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_sound");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_entranceLine0").text(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_entranceLine1").text(buildData.title_1);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_true").text(buildData.btn_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_sound .multiUseInfo_sound_option_false").text(buildData.btn_1);

			screen_multiInfoUse.dropEndFunct = soundGlobalOptions_display;

			break;
		}

		case "BATTLE_FAIL":
		{
			buildData.screen_html = html_lib_use("_multiUseInfo", true, true);
			buildData.art_html = html_lib_use("_multiUseInfo_br_fail", true, true);

			buildData.title_0 = Logic.dat_ROM["_NAVIGATION"]["nav_fail"]["title_0"];
			buildData.title_1 = Logic.dat_ROM["_NAVIGATION"]["nav_fail"]["title_1"];

			$(screen_multiInfoUse.screenRoot).append(buildData.screen_html);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_fail");
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_br").append(buildData.art_html);

			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_entranceLine0").text(buildData.title_0);
			$(screen_multiInfoUse.screenRoot + " .multiUseInfo_fail .multiUseInfo_entranceLine1").text(buildData.title_1);

			screen_multiInfoUse.dropEndFunct = battleFail_display;

			trace("!!!!!! ----------------------------- BATTLE_FAIL screen build!!!!!");

			trace(buildData);

			break;
		}
	}

	delete buildData;
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

	// $(".multiUseInfo_entranceLine0").removeClass("multiUseInfo_tl_hide");
	// $(".multiUseInfo_entranceLine0").addClass("multiUseInfo_tl_show");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").toggleClass("multiUseInfo_tl_hide", "multiUseInfo_tl_show");

	// $(".multiUseInfo_entranceLine1").removeClass("multiUseInfo_tl_hide");
	// $(".multiUseInfo_entranceLine1").addClass("multiUseInfo_tl_show");

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
	multiUseInfoScreen_removeTitle();
}

// -------- START_INTRO

// -------- OPTIONS

function options_display()
{
	$(".multiUseInfo_options_option_sound")[0].addEventListener("webkitTransitionEnd", options_displayEnd, false);
	$(".multiUseInfo_options_option_sound")[0].addEventListener("transitionend", options_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(".multiUseInfo_options_option_about").toggleClass("multiUseInfo_options_option_hide", "multiUseInfo_options_option_show");

	$(".multiUseInfo_options_option_sound").toggleClass("multiUseInfo_options_option_hide", "multiUseInfo_options_option_show");
}

function options_displayEnd(event)
{
	$(".multiUseInfo_options_option_sound")[0].removeEventListener("webkitTransitionEnd", options_displayEnd, false);
	$(".multiUseInfo_options_option_sound")[0].removeEventListener("transitionend", options_displayEnd, false);

	$(".multiUseInfo_options_option_sound").removeClass("tween-multiUseInfo_options_option_delay");

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
	}

	else
	{
		$(".multiUseInfo_options_option_about")[0].removeEventListener("click", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].removeEventListener("click", options_btnEvent, false);

		$(".multiUseInfo_options_option_about")[0].removeEventListener("touchend", options_btnEvent, false);
		$(".multiUseInfo_options_option_sound")[0].removeEventListener("touchend", options_btnEvent, false);

		$(".multiUseInfo_options_option_about").addClass("multiUseInfo_option_disabled");
		$(".multiUseInfo_options_option_sound").addClass("multiUseInfo_option_disabled");
	}
}

function options_btnEvent(event)
{

	options_btnInit(false);

	$(".tween-multiUseInfo_options_option")[0].addEventListener("webkitTransitionEnd", options_btnSelected, false);
	$(".tween-multiUseInfo_options_option")[0].addEventListener("transitionend", options_btnSelected, false);

	for(var cl = 0; cl < event.target.classList.length; cl++)
	{
		var _cl = event.target.classList[cl];

		if(_cl === "multiUseInfo_options_option_about" || _cl === "multiUseInfo_options_option_sound")
		{
			if(_cl === "multiUseInfo_options_option_about")
			{
				screen_multiInfoUse.optionSelected = "ABOUT";

				$(".multiUseInfo_options_option_sound").toggleClass("multiUseInfo_options_option_hide", "multiUseInfo_options_option_show");
			}

			if(_cl === "multiUseInfo_options_option_sound")
			{
				screen_multiInfoUse.optionSelected = "SOUND";

				$(".multiUseInfo_options_option_about").toggleClass("multiUseInfo_options_option_hide", "multiUseInfo_options_option_show");
			}
		}
	}
}

function options_btnSelected(event)
{
	var exitFrame;

	$(".tween-multiUseInfo_options_option")[0].removeEventListener("webkitTransitionEnd", options_btnSelected, false);
	$(".tween-multiUseInfo_options_option")[0].removeEventListener("transitionend", options_btnSelected, false);

	switch(screen_multiInfoUse.optionSelected)
	{
		case "ABOUT":
		{

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

function multiUseInfoScreen_options_about()
{

}

// -------- ABOUT

// -------- GLOBAL_SOUND

function soundGlobalOptions_display()
{
	$(".multiUseInfo_sound_option_false")[0].addEventListener("webkitTransitionEnd", soundGlobalOptions_displayEnd, false);
	$(".multiUseInfo_sound_option_false")[0].addEventListener("transitionend", soundGlobalOptions_displayEnd, false);

	$(".multiUseInfo_entranceLine1").removeClass("tween-multiUseInfo_cont_entrance_tl_delay");


	// $(".multiUseInfo_sound_option_true").removeClass("multiUseInfo_sound_option_hide");
	// $(".multiUseInfo_sound_option_true").addClass("multiUseInfo_sound_option_show");

	$(".multiUseInfo_sound_option_true").toggleClass("multiUseInfo_sound_option_hide", "multiUseInfo_sound_option_show");

	// $(".multiUseInfo_sound_option_false").removeClass("multiUseInfo_sound_option_hide");
	// $(".multiUseInfo_sound_option_false").addClass("multiUseInfo_sound_option_show");

	$(".multiUseInfo_sound_option_false").toggleClass("multiUseInfo_sound_option_hide", "multiUseInfo_sound_option_show");
}

function soundGlobalOptions_displayEnd(event)
{
	$(".multiUseInfo_sound_option_true")[0].removeEventListener("webkitTransitionEnd", soundGlobalOptions_displayEnd, false);
	$(".multiUseInfo_sound_option_false")[0].removeEventListener("transitionend", soundGlobalOptions_displayEnd, false);

	$(".multiUseInfo_sound_option_false").removeClass("tween-multiUseInfo_sound_option_delay");

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

	/*
	for(var c = 0; c < event.target.classList.length; c++)
	{
		var cl = event.target.classList[c];

		if(cl === "multiUseInfo_sound_option_true" || cl === "multiUseInfo_sound_option_false")
		{
			if(cl === "multiUseInfo_sound_option_true")
			{
				$(".multiUseInfo_sound_option_false").removeClass("multiUseInfo_sound_option_show");
				$(".multiUseInfo_sound_option_false").addClass("multiUseInfo_sound_option_hide");
			}

			if(cl === "multiUseInfo_sound_option_false")
			{
				$(".multiUseInfo_sound_option_true").removeClass("multiUseInfo_sound_option_show");
				$(".multiUseInfo_sound_option_true").addClass("multiUseInfo_sound_option_hide");
			}
		}
	}
	*/

	multiUseInfoScreen_removeTitle();
}

// -------- GLOBAL_SOUND

// -------- BATTLE_FAIL

function battleFail_display()
{
	trace("!!! battleFail_display();");

	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("webkitTransitionEnd", battleFail_displayEnd, false);
	$(".multiUseInfo_fail .multiUseInfo_fail_character")[0].addEventListener("transitionend", battleFail_displayEnd, false);

	// $(".multiUseInfo_fail .map-enemy_40x40-legs").removeClass("tween-map-enemy_40x40_stop");
	// $(".multiUseInfo_fail .map-enemy_40x40-legs").addClass("tween-map-enemy_40x40_loop");

	// $(".multiUseInfo_fail .map-enemy_40x40-legs").toggleClass("tween-map-enemy_40x40_stop", "tween-map-enemy_40x40_loop");
	$(".multiUseInfo_fail .map-enemy_40x40-legs").toggleClass("tween-map-enemy_40x40_loop", "tween-map-enemy_40x40_stop");

	// $(".multiUseInfo_fail .multiUseInfo_fail_character").removeClass("multiUseInfo_fail_character_hide");
	// $(".multiUseInfo_fail .multiUseInfo_fail_character").addClass("multiUseInfo_fail_character_show");

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
	delay_failScreen.time(1.5, battleEnd_battleEnd_returnToGame);
}

// -------- BATTLE_FAIL

function multiUseInfoScreen_removeTitle()
{
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").addClass("tween-multiUseInfo_cont_entrance_tl_delay");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").removeClass("multiUseInfo_tl_show");
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0").addClass("multiUseInfo_tl_hide");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1").removeClass("multiUseInfo_tl_show");
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine1").addClass("multiUseInfo_tl_hide");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_rise, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].addEventListener("transitionend", multiUseInfoScreen_rise, false);
}

function multiUseInfoScreen_rise(event)
{
	trace("!!!!!!! === multiUseInfoScreen_rise());");

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_rise, false);
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_entranceLine0")[0].removeEventListener("transitionend", multiUseInfoScreen_rise, false);

	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("webkitTransitionEnd", multiUseInfoScreen_riseEnd, false);
	$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].addEventListener("transitionend", multiUseInfoScreen_riseEnd, false);

	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").removeClass("multiUseInfo_cont_show");
	$(screen_multiInfoUse.screenRoot + " .multiUseInfo_cont_entrance").addClass("multiUseInfo_cont_hide");
}

function multiUseInfoScreen_riseEnd(event)
{
	var eventSignalFound = false;

	for(var i in event.target.classList)
	{
		if(event.target.classList[i] === "tween-multiUseInfo_cont" && !eventSignalFound)
		{
			eventSignalFound = true;
		}
	}

	if(eventSignalFound)
	{
		eventSignalFound = false;

		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("webkitTransitionEnd", multiUseInfoScreen_riseEnd, false);
		$(screen_multiInfoUse.screenRoot + " .tween-multiUseInfo_cont")[0].removeEventListener("transitionend", multiUseInfoScreen_riseEnd, false);

		if(screen_multiInfoUse.riseEndFunct != null || screen_multiInfoUse.riseEndFunct != undefined)
		{
			screen_multiInfoUse.riseEndFunct();
		}

		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_wrapper").remove();

		delete screen_multiInfoUse;
	}
}