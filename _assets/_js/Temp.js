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



///////////////////////////////// DISPLAY_ZOOM
///////////////////////////////// DISPLAY_ZOOM
///////////////////////////////// DISPLAY_ZOOM

// var displayZoom;

// function displayZoom_init(run)
// {
// 	if(run)
// 	{
// 		displayZoom = {
// 										zoomTo : function(displayTarget_y, extra_y)
// 										{
// 											this.css;
// 											this.y_zoom = displayTarget_y + extra_y;

// 											// DEFAULT

// 											this.css =	{
// 																		"-webkit-transform"		: "translateY(" + this.y_zoom + "px)",
// 																		"transform"				: "translateY(" + this.y_zoom + "px)"
// 																	};

// 											$(".stage-view-y")[0].addEventListener("webkitTransitionEnd", this.zoomEvent, false);
// 											$(".stage-view-y")[0].addEventListener("transitionend", this.zoomEvent, false);

// 											$(".stage-view-y").css(this.css);
// 										},

// 										zoomEvent: function(event)
// 										{
// 											$(".stage-view-y")[0].removeEventListener("webkitTransitionEnd", this, false);
// 											$(".stage-view-y")[0].removeEventListener("transitionend", this, false);

// 											trace("ZOOM OK " + window.displayZoom.zoomEvent);
// 										},

// 										zoomReturn: function()
// 										{
// 											moveStageScreen();
// 										}
// 									};
// 	}

// 	else
// 	{
// 		delete displayZoom;
// 	}
// }


// USAGE
// displayZoom_init(true);
// displayZoom_create(3, {call_funct: demo, call_params: ["SENT MESSAGE"]});
// displayZoom_to(-1200, 0);





// function quick_updateGateList(gateID)
// {
// 	var gateTarget;

// 	for(var gateObject in gates.list)
// 	{
// 		if(gates.list[gateObject].id === gateID)
// 		{
// 			gateTarget = gates.list[gateObject];

// 			gateTarget.closed = false;

// 			$("#" + gateTarget.id + " .gate-outer").remove();

// 			break;
// 		}
// 	}

// 	trace(gates.list);
// }









	// IN GAME










// DIRTY REMOVE

// var Gate = function(_x, _y, _w, _h, _id)
// {
// 	this.x = _x;
// 	this.y = _y;
// 	this.w = _w;
// 	this.h = _h;
// 	this.cy = 0;

// 	this.id = _id;

// 	this.closed = true;
// }

// Gate.prototype.create = function()
// {
// 	this.css = 	{
// 								"-webkit-transform" : "translate(" + this.x + "px, " + this.y + "px)",
// 								"transform" : "translate(" + this.x + "px, " + this.y + "px)"
// 							};

// 	$("#" + this.id + " .gate-outer-floor").addClass("field-floor-" + LEVEL_MAIN.landType);

// 	$("#" + this.id + " .gate-inner-floor").addClass("field-floor-" + LEVEL_MAIN.landType);

// 	$("#" + this.id).css(this.css);
// }

// Gate.prototype.findCenter = function()
// {
// 	alert(DISPLAY.viewHeight * 0.5);

// 	this.cy = -(this.y) + ((DISPLAY.viewHeight * 0.5) - (this.h * 0.5));

// 	// alert(this.cy);
// }

// function demo(msg)
// {
// 	alert(msg);

// 	displayZoom_return();
// }





// function gate_control(cmd)
// {
// 	switch(cmd)
// 	{
// 		case "TEST":
// 		{
// 			displayZoom_init(true, false);
// 			displayZoom_create(3, {call_funct: demo, call_params: ["SENT MESSAGE"]});
// 			displayZoom_to(-1920, 0);

// 			break;
// 		}
// 	}
// }


// var gates;

// function quick_buildGate()
// {
// 	gates = {};

// 	gates.list = new Array();
// 	gates.gateTarget = null;

// 	var g = new Gate(0, 1720, 320, 160, "gate_0_0");

// 	g.create();

// 	gates.list.push(g);
// }









///////////////////////////////// DISPLAY_ZOOM
///////////////////////////////// DISPLAY_ZOOM
///////////////////////////////// DISPLAY_ZOOM




///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN



///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN
///////////////////////////////// WIN SCREEN



///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN







///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN
///////////////////////////////// KEYBOARD_MULTI_USE_SCREEN

var gameEventTriggers;

var GameEventTriggers = function()
{
	this.hitList = {};
};

GameEventTriggers.prototype.create = function()
{
	this.hitList.god_id 	= "";
	this.hitList.sound_id = "";
};

// 1 ITEM == gameEventTriggers.hitListFlush(false, "god_id"); ALL == gameEventTriggers.hitListFlush(true);

GameEventTriggers.prototype.hitListFlush = function(all, type_id)
{
	if(all)
	{
		for(var h in this.hitList)
		{
			this.hitList[h] = "";
		}
	}

	else
	{
		this.hitList[type_id] = "";
	}
};

function gameEventTriggers_init()
{
	gameEventTriggers = new GameEventTriggers();
	gameEventTriggers.create();
}



//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////






function worldReturn_slideReturn()
{
	var html_fx;
	var delay_apply;

	$("#display_wrapper").addClass("tween-event-slide");

	html_lib_reuse();

	html_fx = html_lib_use("_sunLight_beam", false, true);
	$("#display_wrapper").append(html_fx);

	html_lib_empty();

	delay_apply = setTimeout(worldReturn_slideReturnApply, 400);
}

function worldReturn_slideReturnApply()
{
	$(".tween-event-slide")[0].addEventListener("webkitTransitionEnd", worldReturn_slideReturnEvent, false);
	$(".tween-event-slide")[0].addEventListener("transitionend", worldReturn_slideReturnEvent, false);

	$("#display_wrapper").removeClass("event-slide");
}

function worldReturn_slideReturnEvent(event)
{
	$(".tween-event-slide")[0].removeEventListener("webkitTransitionEnd", worldReturn_slideReturnEvent, false);
	$(".tween-event-slide")[0].removeEventListener("transitionend", worldReturn_slideReturnEvent, false);

	$("#display_wrapper").removeClass("tween-event-slide");

	$(".tween-sunLight_beam")[0].addEventListener("webkitTransitionEnd", worldReturn_slideReturnPurge, false);
	$(".tween-sunLight_beam")[0].addEventListener("transitionend", worldReturn_slideReturnPurge, false);

	$(".sunLight_beam").addClass("sunLight_beam_hide");

	if(enemyTarget.defeatPrefs)
	{
		enemyDefeat_check();
	}

	else
	{
		move_plugIn();
	}
}

function worldReturn_slideReturnPurge(event)
{
	$(".tween-sunLight_beam")[0].removeEventListener("webkitTransitionEnd", worldReturn_slideReturnPurge, false);
	$(".tween-sunLight_beam")[0].removeEventListener("transitionend", worldReturn_slideReturnPurge, false);

	$(".sunLight_beam").remove();
}







