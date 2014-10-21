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
									player_ob.sword.skillId		= 0;
									player_ob.sword.fullStrike 	= 51;
									player_ob.sword.magic 		= 5;
								}

								// MEDIUM
								else if(player_ob.rating >= this.difficulty.medium && player_ob.rating < this.difficulty.hard)
								{
									player_ob.sword.skill 		= "knight";
									player_ob.sword.skillId		= 1;
									player_ob.sword.fullStrike 	= 71;
									player_ob.sword.magic 		= 40;
								}

								// HARD
								else if(player_ob.rating >= this.difficulty.hard && player_ob.rating < this.difficulty.max)
								{
									player_ob.sword.skill 		= "master";
									player_ob.sword.skillId		= 2;
									player_ob.sword.fullStrike 	= 91;
									player_ob.sword.magic 		= 60;
								}

								// SUPER
								else
								{
									player_ob.sword.skill 		= "lord";
									player_ob.sword.skillId		= 3;
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



/*	--------------------------------------- INFO SCREEN*/





///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN



///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN



///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN

var screen_multiInfoUse_keyboard;

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
			action = true;
		}

		else
		{
			screen_multiInfoUse_keyboard.countTap = 0;

			signal = true;
		}
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

	// trace($(screen_multiInfoUse_keyboard["signal" + signalNum])[0].attr("class"));
	// trace(screen_multiInfoUse_keyboard["signal_" + signalNum]);

	/*
	var searchBlock = $(screen_multiInfoUse_keyboard["signal" + signalNum]);
	var searchClass = "multiUseInfo_keyboard_select-forceState_" + signalNum;

	if($(searchBlock).attr("class").search(searchClass) >= 0)
	{
		$(searchBlock).removeClass(searchClass);
	}
	*/
}

function keyboardSignal_multiInfoUse_action()
{

}

function keyboardSignal_multiInfoUse_cancel()
{
	$(window)[0].removeEventListener("keyup", keyboardSignal_multiInfoUse_event, false);

	keyboardSignal_multiInfoUse_event = {};

	delete keyboardSignal_multiInfoUse_event;
}



///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN














