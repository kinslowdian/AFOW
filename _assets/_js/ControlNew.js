
var control;

var loopRun;
var loopList;
var loopInt;
var loopSlowInt;

var HIT_TEST;

// CLEANER CODE ?
var playerTarget;
var portalTarget; // PREV = PORTAL_TRAVEL
var enemyTarget; // PREV = ROM.enemy.character

// MERGED

var PORTAL_TRAVEL;

var game_levelChange = false;
var game_introEntrance = true;
var game_levelFinal = false;

// MERGED

var Control = function()
{
	this.fl = {};
}

Control.prototype.init = function()
{
	// NEW

	this.fl.x 				= 0;
	this.fl.y 				= 0;

	this.fl.x_target 	= 0;
	this.fl.y_target 	= 0;

	this.fl.x_safe		= 0;
	this.fl.y_safe		= 0;

	this.fl.spawn_x		= 0;
	this.fl.spawn_y		= 0;

	this.fl.enter_x		= 0;
	this.fl.enter_y		= 0;

	this.rem_x				= 0;
	this.rem_y				= 0;

	this.fl.move			= 40;
	this.animate 			= false;

	this.signal				= "";

	this.keyChange		= false;

	this.walkClass		= "tween-player-XX";

	this.scrollCount		= 0;
	this.scrollCountMax	= 3;

	// RECYCLED

	this.html_player = $("#display_wrapper .player").html();

	this.fl.tween = "";

	this.walkLegs = false;

	this.dir = "";


	// DEAD
	/*
	this.fl.target_x = 0;
	this.fl.target_y = 0;

	this.fl.target_safe_x = 0;
	this.fl.target_safe_y = 0;

	this.fl.target_move = 40;

	this.fl.x = 0;
	this.fl.y = 0;

	this.fl.spawn_x = 0;
	this.fl.spawn_y = 0;

	this.fl.enter_x = 0;
	this.fl.enter_y = 0;

	this.fl.move = 4;
	this.fl.moveX = 0;
	this.fl.moveY = 0;

	this.fl.tween = "";

	this.signal = false;

	this.dir = "";

	this.walkLegs = false;

	this.html_player = $("#display_wrapper .player").html();

	this.rem_x = 0;
	this.rem_y = 0;
	*/
}

Control.prototype.writePosition = function(placement)
{
	this.dir 							= placement.d;

	this.fl.x 						= placement.x;
	this.fl.y 						= placement.y;

	this.fl.x_target 			= this.fl.x;
	this.fl.y_target 			= this.fl.y;

	this.fl.x_safe 				= this.fl.x;
	this.fl.y_safe 				= this.fl.y;

	this.walkClass				= "tween-player-XX";
}

Control.prototype.writeSpawn = function(placement)
{
	this.fl.spawn_x = placement.x;
	this.fl.spawn_y = placement.y;
}

Control.prototype.writeEntry = function(placement)
{
	this.fl.enter_x = placement.x;
	this.fl.enter_y = placement.y;
}

Control.prototype.writeRem = function(placement)
{
	this.rem_x = placement.x;
	this.rem_y = placement.y;
}

Control.prototype.updateXY = function(x, y)
{
	this.fl.x_target += x;
	this.fl.y_target += y;
}

Control.prototype.walkClassUpdate = function(newClass)
{
	if(newClass !== this.walkClass)
	{
		$(".player .player-sprite").removeClass(this.walkClass).addClass(newClass);

		this.walkClass = newClass;

		if(this.walkClass === "tween-player-XX" && this.walkLegs)
		{
			this.walkLegs = false;
			$(".layer-field-player-area .player .map-goat-legs").removeClass("tween-mapPlayerWalk_loop").addClass("tween-mapPlayerWalk_stop");
		}

		else if(this.walkClass !== "tween-player-XX" && !this.walkLegs)
		{
			this.walkLegs = true;
			$(".layer-field-player-area .player .map-goat-legs").removeClass("tween-mapPlayerWalk_stop").addClass("tween-mapPlayerWalk_loop");
		}

	}
}

Control.prototype.touch_initPad = function(touchArea)
{
	this.touchArea = touchArea;
	this.firstTouch = true;
	this.enableTouch = true;

	this.html_touch = $(".layer-ui").html();

	this.touchData = {};

	this.touchData.moveDirection = "";
	this.touchData.indicator			= "";

	this.touchData.x_measure 		= $("#" + this.touchArea).width();
	this.touchData.y_measure 		= $("#" + this.touchArea).height();
}

Control.prototype.touch_setOffset = function()
{
	this.touchData.offset = $("#" + this.touchArea).offset();
}

Control.prototype.touch_reset = function()
{
	this.dir = "STILL";
	this.touchData.x_percent 		= 0;
	this.touchData.y_percent 		= 0;
}

// CALL ONLY ONCE
function control_request()
{
	control_init();
}

function control_init()
{
	control = new Control();
	control.init();

	// CHECK CURRENT BUILD
	hitTest_init();

	// TouchUI.js CHECK DEVICE TYPE THEN CALL
	// touch_init();

	if(touchSupported)
	{
		touch_init();
	}

	// DELAY CALL
	move_init(true);
}


function move_init(run)
{
	if(run)
	{
		// CONTROLS
		$(window)[0].addEventListener("keydown", move_event, false);
		$(window)[0].addEventListener("keyup", move_event, false);

		if(touchSupported)
		{
			$("#touchPad-full")[0].addEventListener("touchstart", touch_find, false);
			$("#touchPad-full")[0].addEventListener("touchmove", touch_find, false);
			$("#touchPad-full")[0].addEventListener("touchend", touch_find, false);
		}

		// PLAYER
		$(".player").addClass("tween-controlPlayer");

		$(".tween-controlPlayer")[0].addEventListener("webkitTransitionEnd", move_cssAddEvent, false);
		$(".tween-controlPlayer")[0].addEventListener("transitionend", move_cssAddEvent, false);

		// MENU
		$("#menu_strip").removeClass("ignoreMouseEvents");
		$("#menu_strip .menu_tab").removeClass("menuTab_hide").addClass("menuTab_show");
	}

	else
	{
		// CONTROLS
		$(window)[0].removeEventListener("keydown", move_event, false);
		$(window)[0].removeEventListener("keyup", move_event, false);

		if(touchSupported)
		{
			$("#touchPad-full")[0].removeEventListener("touchstart", touch_find, false);
			$("#touchPad-full")[0].removeEventListener("touchmove", touch_find, false);
			$("#touchPad-full")[0].removeEventListener("touchend", touch_find, false);
		}

		// PLAYER
		$(".tween-controlPlayer")[0].removeEventListener("webkitTransitionEnd", move_cssAddEvent, false);
		$(".tween-controlPlayer")[0].removeEventListener("transitionend", move_cssAddEvent, false);

		$(".player").removeClass("tween-controlPlayer");

		// MENU
		$("#menu_strip").addClass("ignoreMouseEvents");
		$("#menu_strip .menu_tab").removeClass("menuTab_show").addClass("menuTab_hide");
	}
}

function move_plugIn()
{
	move_reset();
	move_init(true);
}

function move_reset()
{
	hitTest_init();

	control.signal = "";
}

function move_cancel()
{
	control.signal = "STILL";

	move_init(false);
}

function move_event(event)
{
	if(event.type === "keyup")
	{
		control.signal = "STILL";

		control.walkClassUpdate("tween-player-XX");
	}

	if(event.type === "keydown")
	{
		// U
		if(event.keyCode == 38 && control.signal !== "UP")
		{
			control.signal = "UP";

			control.keyChange = true;
		}

		// D
		else if(event.keyCode == 40 && control.signal !== "DOWN")
		{
			control.signal = "DOWN";

			control.keyChange = true;
		}

		// L
		else if(event.keyCode == 37 && control.signal !== "LEFT")
		{
			control.signal = "LEFT";

			control.keyChange = true;
		}

		// R
		else if(event.keyCode == 39 && control.signal !== "RIGHT")
		{
			control.signal = "RIGHT";

			control.keyChange = true;
		}
	}

	// trace(control.signal);

	if(control.keyChange)
	{
		control.keyChange = false;

		move_listen();
	}
}

function move_listen()
{
	var _x;
	var _y;

	if(control.enableTouch)
	{
		control.signal = control.dir;
	}

	switch(control.signal)
	{
		case "UP":
		{
			_x = 0;
			_y = -control.fl.move;

			control.walkClassUpdate("tween-player-UD");

			break;
		}

		case "DOWN":
		{
			_x = 0;
			_y = control.fl.move;

			control.walkClassUpdate("tween-player-UD");

			break;
		}

		case "LEFT":
		{
			_x = -control.fl.move;
			_y = 0;

			control.walkClassUpdate("tween-player-LR");

			break;
		}

		case "RIGHT":
		{
			_x = control.fl.move;
			_y = 0;

			control.walkClassUpdate("tween-player-LR");

			break;
		}

		default:
		{
			control.signal = "STILL";

			control.walkClassUpdate("tween-player-XX");
		}
	}

	if(!control.animate && control.signal !== "STILL")
	{
		control.animate = true;

		control.updateXY(_x, _y);

		move_cssAdd();
	}
}

function move_cssAdd()
{
	var css;
	var reset_hitTest = false;

	css = "translate(" + control.fl.x_target + "px, " + control.fl.y_target + "px)";

	$(".hitTest")[0].style.webkitTransform 	= css;
	$(".hitTest")[0].style.transform				= css;

	// TODO CHECK FUNCTION CALL
	hitTest_check();

	// EDGE
	if(HIT_TEST.hit_edge)
	{
		reset_hitTest = true;
	}

	else
	{
		control.fl.x_safe = control.fl.x_target;
		control.fl.y_safe = control.fl.y_target;

		$(".layer-field-player-area .player")[0].style.webkitTransform 	= css;
		$(".layer-field-player-area .player")[0].style.transform				= css;
	}

	// PORTAL
	if(HIT_TEST.hit_portal)
	{
		move_cancel();

		temp_findPortalEnter();
	}

	// ENEMY
	if(HIT_TEST.hit_enemy)
	{
		move_cancel();

		control.fl.x_safe = control.fl.x_target;
		control.fl.y_safe = control.fl.y_target;

		preBattleOptions_init();

		temp_findEnemy();
	}

	// SOUND
	if(HIT_TEST.hit_sound)
	{
		if(soundEffects_pedal != null)
		{
			if(gameEventTriggers.hitList.sound_id !== HIT_TEST.hit_sound_id)
			{
				sound_level_trigger_event(HIT_TEST.hit_sound_id);

				gameEventTriggers.hitList.sound_id = HIT_TEST.hit_sound_id;
			}
		}
	}

	// GOD
	if(HIT_TEST.hit_god)
	{
		if(gameEventTriggers.hitList.god_id !== HIT_TEST.hit_god_id)
		{
			god_eventSearch(HIT_TEST.hit_god_id);

			gameEventTriggers.hitList.god_id = HIT_TEST.hit_god_id;
		}
	}


	if(reset_hitTest)
	{
		reset_hitTest = false;

		css = "translate(" + control.fl.x_safe + "px, " + control.fl.y_safe + "px)";

		control.fl.x_target = control.fl.x_safe;
		control.fl.y_target = control.fl.y_safe;

		$(".hitTest")[0].style.webkitTransform 	= css;
		$(".hitTest")[0].style.transform				= css;

		// TODO CHECK FUNCTION CALL
		hitTest_init();

		control.animate = false;
	}
}

function move_cssAddEvent(event)
{
	control.fl.x = control.fl.x_target;
	control.fl.y = control.fl.y_target;

	control.animate = false;

	if(control.signal === "UP" || control.signal === "DOWN")
	{
		// STAGE MOVE TO CENTER PLAYER AFTER 3xY_MOVES

		if(control.scrollCount < control.scrollCountMax)
		{
			control.scrollCount++;
		}

		if(control.scrollCount >= control.scrollCountMax)
		{
			control.scrollCount = 0;

			display_centerLevel();
		}
	}

	move_listen();
}



function hitTest_init()
{
	HIT_TEST = {};

	HIT_TEST.hit_portal_id = "";
	HIT_TEST.hit_enemy_id = "";
	HIT_TEST.hit_sound_id = "";
	HIT_TEST.hit_god_id = "";

	HIT_TEST.hit_edge = false;
	HIT_TEST.hit_portal = false;
	HIT_TEST.hit_enemy = false;
	HIT_TEST.hit_sound = false;
	HIT_TEST.hit_god = false;
}

function hitTest_check()
{
	HIT_TEST.hits = $(".collideCheck-player").collision(".collideCheck-field");

	if(HIT_TEST.hits[0] != undefined || HIT_TEST.hits[0] != null)
	{
		if($(HIT_TEST.hits[0]).attr("data-npc") === "edge")
		{
			HIT_TEST.hit_edge = true;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "portal")
		{
			HIT_TEST.hit_portal = true;

			HIT_TEST.hit_portal_id = HIT_TEST.hits[0].id;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "enemy")
		{
			HIT_TEST.hit_enemy = true;

			HIT_TEST.hit_enemy_id = HIT_TEST.hits[0].id;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "sound")
		{
			HIT_TEST.hit_sound = true;

			HIT_TEST.hit_sound_id = HIT_TEST.hits[0].id;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "god")
		{
			HIT_TEST.hit_god = true;

			HIT_TEST.hit_god_id = HIT_TEST.hits[0].id;
		}
	}

	else
	{

	}
}

///////// UPDATE

function temp_findEnemy()
{


	for(var enemyObj in enemies_ARR)
	{
		if(enemies_ARR[enemyObj].id === HIT_TEST.hit_enemy_id)
		{
			enemyTarget = enemies_ARR[enemyObj];

			break;
		}
	}

	trace("temp_findEnemy();");
	trace(enemyTarget);

	preBattleOptions_build();

	autoMove_init("ENEMY_ATTACK");


	/*
	for(var i in enemyArr)
	{
		if(HIT_TEST.hit_enemy_id === enemyArr[i].id)
		{
			enemyTarget = enemyArr[i];

			break;
		}
	}

	autoMove_init("ENEMY_ATTACK");
	*/
}

function temp_findPortalEnter()
{
	for(var i in portals_ARR)
	{
		if(portals_ARR[i].id === HIT_TEST.hit_portal_id)
		{
			portalTarget = {};
			portalTarget = portals_ARR[i];

			// TODO
			if(portalTarget.bossEntrance)
			{
				// FIRED JUST TO STORE HTML AND X AND Y POSITIONS OF PLAYER
				preBattleOptions_init();
			}

			break;
		}
	}

	autoMove_init("PORTAL_ENTER");
}

function temp_findPortalExit()
{
	for(var i in portals_ARR)
	{
		if(portals_ARR[i].id === HIT_TEST.hit_portal_id)
		{
			if(portals_ARR[i].bossEntrance)
			{
				// FINAL_LEVEL
				if(!game_levelFinal)
				{
					game_levelFinal = true;

					finalLevelTriggered();
				}
			}

			else
			{
				// STAGE TRAVEL

				if(portals_ARR[i].level == ROM.mapLevel)
				{
					for(var j in portals_ARR)
					{
						if(portals_ARR[i].level == portals_ARR[j].spawn)
						{
							if(portals_ARR[i].exit == portals_ARR[j].num)
							{
								portalTarget = {};
								portalTarget = portals_ARR[j];

								autoMove_init("PORTAL_PLACE");

								// NOT FINAL SOUND FX TEST
								if(soundEffects_pedal != null)
								{
									sound_play("fx_crow");
								}
							}
						}
					}
				}

				// LEVEL TRAVEL

				else
				{
					for(var k in portals_ARR)
					{
						if(portals_ARR[i].level == portals_ARR[k].spawn)
						{
							if(portals_ARR[i].exit == portals_ARR[k].num)
							{
								portalTarget = {};
								portalTarget = portals_ARR[k];

								ROM.mapLevel = portals_ARR[i].level;

								// MAY NEED TO ADD
								game_levelChange = true;

								// portalScreen_request();

								// NOT FINAL SOUND FADE OUT FOR LEVEL
								if(soundEffects_pedal != null)
								{
									sound_fadeInitGlobal(0, {call_funct: sound_levelClear});
								}
							}
						}
					}
				}
			}
		}
	}
}

function autoMove_init(moveRequest)
{
	var tween;
	var css;
	var temp_delay;

	var moveTypes = {

		"PORTAL_ENTER"	: function()
		{
			tween = {};

			tween.x 					= portalTarget.x_mid;
			tween.y 					= portalTarget.y_mid;
			tween.a 					= "0";
			tween.tweenClass 	= "tween-player-portal";
			tween.onEnd 			= autoMove_event_portalEnter;

			control.walkClassUpdate("tween-player-XX");
			control.writeRem({x:control.fl.x, y:control.fl.y});

			autoMove_tween(tween, true);

			delete tween;
		},

		"PORTAL_PLACE"	: function()
		{
			tween = {};

			tween.x 		= portalTarget.x_mid;
			tween.y 		= portalTarget.y_mid;
			tween.a 		= "0";

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			$(".layer-field-player-area .player .map-goat-hide").removeClass("map-goat-hide-default");

			$(".layer-field-player-area .player .map-goat-hide").addClass("map-goat-hide-show");
			$(".layer-field-player-area .player .map-goat-hide").addClass("tween-map-goat-hide");

			// $(".layer-field-player-area .player .map-goat-hide-inner").addClass("tween-map-goat-hide-inner");

			autoMove_tween(tween, false);

			autoMove_tweenStage({call_funct:autoMove_init, call_params:["PORTAL_EXIT"]});

			delete tween;

		},

		"PORTAL_EXIT"		: function()
		{
			tween = {};
			css;

			// tween.x 				= portalTarget.x_mid;
			// tween.y 				= portalTarget.y_mid;
			tween.x 					= portalTarget.buildData.x;
			tween.y 					= portalTarget.buildData.y;
			tween.a 					= "1";
			tween.pushX 			= 0;
			tween.pushY 			= 0;
			tween.tweenClass 	= "tween-player-portal";
			tween.onEnd 			= autoMove_event_portalExit;

			if(!portalTarget.visited)
			{
				$(".layer-field-player-area .player .map-goat-hide-aware").addClass("map-goat-hide-aware-display");
			}


			switch(portalTarget.direction)
			{
				/*
				case "UP"			:{ tween.pushY = -(portalTarget.buildData.h); break; }
				case "DOWN"		:{ tween.pushY = portalTarget.buildData.h * 1.5; 		break; }
				case "LEFT"		:{ tween.pushX = -(portalTarget.buildData.w); break; }
				case "RIGHT"	:{ tween.pushX = portalTarget.buildData.w * 1.5; 		break; }
				*/

				case "UP"			:{ tween.pushY = -(portalTarget.buildData.h * 0.5); break; }
				case "DOWN"		:{ tween.pushY = portalTarget.buildData.h * 1; 		break; }
				case "LEFT"		:{ tween.pushX = -(portalTarget.buildData.w * 0.5); break; }
				case "RIGHT"	:{ tween.pushX = portalTarget.buildData.w * 1; 		break; }
			}

			tween.x += tween.pushX;
			tween.y += tween.pushY;

			css = 	{
						"-webkit-transform"	: "translate(" + tween.x + "px, " + tween.y + "px)",
						"transform"					: "translate(" + tween.x + "px, " + tween.y + "px)"
					};

			$(".hitTest").css(css);

			// display.waitForStage.track 				= true;
			// display.waitForStage.call_funct 	= move_reset;
			// display.waitForStage.call_params 	= null;

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});
			control.writeEntry({x:tween.x, y:tween.y});

			autoMove_tween(tween, true);

			delete tween;
		},

		"ENEMY_ATTACK"	: function()
		{
			tween = {};

			tween.x 					= enemyTarget.buildData.x;
			tween.y 					= enemyTarget.buildData.y;
			tween.a 					= "1";
			tween.tweenClass 	= "tween-player-enemy";
			tween.onEnd 			= autoMove_enemyAttack;

			control.walkClassUpdate("tween-player-XX");

			autoMove_tween(tween, true);

			delete tween;
		},

		"ENEMY_RETREAT"	: function()
		{
			tween = {};

			tween.x 		= control.fl.x_safe;
			tween.y 		= control.fl.y_safe;

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			autoMove_tween(tween, false);

			delete tween;
		},

		"SPAWN"	: function()
		{
			tween = {};

			tween.x	= control.fl.spawn_x;
			tween.y	= control.fl.spawn_y;

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			control.walkClassUpdate("tween-player-XX");

			css = 	{
								"-webkit-transform"	: "translate(" + tween.x + "px, " + tween.y + "px)",
								"transform"					: "translate(" + tween.x + "px, " + tween.y + "px)"
							};

			$(".hitTest").css(css);

			autoMove_tween(tween, false);

			delete tween;
		},

		"SPAWN_MOVE"	: function()
		{
			tween = {};

			delete tween;
		},

		"GATE_GOTO"	: function()
		{
			tween = {};

			tween.x = levelGateTarget.buildData.x;
			tween.y = levelGateTarget.buildData.cy;
		},

		"GATE_RETURN" : function()
		{
			tween = {};

			delete tween;
		}

	};

	if(typeof moveTypes[moveRequest] === "function")
	{
		return moveTypes[moveRequest]();
	}
}

function autoMove_tween(settings, animate)
{
	var css = settings;

	if(animate)
	{
		control.fl.tween = css.tweenClass;

		$(".layer-field-player-area .player").addClass(control.fl.tween);

		$("." + control.fl.tween)[0].addEventListener("webkitTransitionEnd", css.onEnd, false);
		$("." + control.fl.tween)[0].addEventListener("transitionend", css.onEnd, false);

		// $(".layer-field-player-area .player").addClass("tween-player");

		// $(".tween-player")[0].addEventListener("webkitTransitionEnd", css.onEnd, false);
		// $(".tween-player")[0].addEventListener("transitionend", css.onEnd, false);
	}

	css.write = 	{
										"-webkit-transform"					: "translate(" + css.x + "px, " + css.y + "px)",
										"transform"									: "translate(" + css.x + "px, " + css.y + "px)"
								};

	$(".layer-field-player-area .player").css(css.write);

	if(css.a)
	{
		$(".layer-field-player-area .player").css("opacity", css.a);
	}
}

function autoMove_tweenStage(onEnd)
{
	trace("!!!!!! -------- MOVE DETECTED HERE");

	var css;

	var delay_exit;

	display.centerPlayer();

	css = 	{
						"-webkit-transform"	: "translateY(" + display.focus_y + "px)",
						"transform"					: "translateY(" + display.focus_y + "px)"
					};


	display.setPosition();

	$(".field").css(css);

	delay_exit = setTimeout(autoMove_tweenStageComplete, 1000, onEnd);
}

function autoMove_tweenStageComplete(onEnd)
{
	trace(onEnd);

	if(onEnd.call_params)
	{
		onEnd.call_funct.apply(this, onEnd.call_params);
	}

	else
	{
		onEnd.call_funct();
	}
}

function autoMove_event_portalEnter(event)
{
	var exitFrame;

	$(".layer-field-player-area .player")[0].removeEventListener("webkitTransitionEnd", autoMove_event_portalEnter, false);
	$(".layer-field-player-area .player")[0].removeEventListener("transitionend", autoMove_event_portalEnter, false);

	if(!portalTarget.visited)
	{
		portalTarget.visited = true;
	}

	autoMove_cleanPlayer();


	temp_findPortalExit();

	// TODO
	if(game_levelFinal)
	{
		exitFrame = setTimeout(finalLevelEvent_showFill, 20);
	}

	else
	{
		eventColor_add("portalLevel", null);

		observe_init("MONKEY");
	}
}

function autoMove_event_portalExit(event)
{
	var delay_opt;

	$(".layer-field-player-area .player")[0].removeEventListener("webkitTransitionEnd", autoMove_event_portalExit, false);
	$(".layer-field-player-area .player")[0].removeEventListener("transitionend", autoMove_event_portalExit, false);

	// $(".layer-field-player-area .player").removeClass("tween-player");
	// $(".layer-field-player-area .player").removeClass(control.fl.tween);
	// control.fl.tween = "";
	autoMove_cleanPlayer();

	control.writeSpawn({x:control.fl.x, y:control.fl.y});

	// PLUG CONTROLS
	// HOLD MOVE UNTIL STAGE MOVE
	// move_reset();
	// display.waitForStage.track 				= true;
	// display.waitForStage.call_funct 	= move_reset;
	// display.waitForStage.call_params 	= null;

	// display_centerLevel();

	// delay_opt = setTimeout(move_reset, 100);

	$(".tween-map-goat-hide")[0].addEventListener("webkitTransitionEnd", autoMove_event_portalExit_event, false);
	$(".tween-map-goat-hide")[0].addEventListener("transitionend", autoMove_event_portalExit_event, false);

	$(".layer-field-player-area .player .map-goat-hide").removeClass("map-goat-hide-show").addClass("map-goat-hide-hide");

	// $("#monkeyObserve .monkeyObserve-monkeyInner").addClass("monkeyObserve-look-C");

	observe_monkeyLook("C");
}

function autoMove_event_portalExit_event(event)
{
	$(".tween-map-goat-hide")[0].removeEventListener("webkitTransitionEnd", autoMove_event_portalExit_event, false);
	$(".tween-map-goat-hide")[0].removeEventListener("transitionend", autoMove_event_portalExit_event, false);

	$(".layer-field-player-area .player .map-goat-hide").removeClass("tween-map-goat-hide");
	$(".layer-field-player-area .player .map-goat-hide").removeClass("map-goat-hide-hide");
	// $(".layer-field-player-area .player .map-goat-hide-inner").removeClass("tween-map-goat-hide-inner");

	$(".layer-field-player-area .player .map-goat-hide").addClass("map-goat-hide-default");

	if(!portalTarget.visited)
	{
		portalTarget.visited = true;
		$(".layer-field-player-area .player .map-goat-hide-aware").removeClass("map-goat-hide-aware-display");
	}

	eventColor_remove();

	// $("#monkeyObserve .monkeyObserve-monkey").removeClass("monkeyObserve-show");
	observe_monkeyHide();

	// move_reset();
}

function autoMove_enemyAttack()
{
	$(".layer-field-player-area .player")[0].removeEventListener("webkitTransitionEnd", autoMove_enemyAttack, false);
	$(".layer-field-player-area .player")[0].removeEventListener("transitionend", autoMove_enemyAttack, false);


	autoMove_cleanPlayer();

	// NEW
	$(".layer-field-player-area .player .map-goat-battleFace").addClass("map-goat-battleFace-display");

	eventColor_add("battle", autoMove_enemyAttack_event);

	observe_init("BOSS");
}

function autoMove_enemyAttack_event(event)
{
	var delay_sequence;

	$(".tween-color-event")[0].removeEventListener("webkitTransitionEnd", autoMove_enemyAttack_event, false);
	$(".tween-color-event")[0].removeEventListener("transitionend", autoMove_enemyAttack_event, false);

	delay_sequence = setTimeout(preBattleOptions_show, 1.2 * 1000);
}

function autoMove_cleanPlayer()
{
	// TODO CHECK ALTERNATIVE
	$(".layer-field-player-area .player").removeClass(control.fl.tween);
	control.fl.tween = "";

	control.animate = false;
}


// TOUCH UI

function touch_init()
{
	control.touch_initPad("touchPad-full");
}

function touch_lock(event)
{
	event.preventDefault();
}

function touch_find(event)
{
	event.preventDefault();

	if(event.type === "touchstart" || event.type === "touchmove")
	{
		if(!control.touchData.offset)
		{
			control.touch_setOffset();
		}

		control.touchData.x = event.targetTouches[0].pageX - control.touchData.offset.left;
		control.touchData.y = event.targetTouches[0].pageY - control.touchData.offset.top;

		if(control.touchData.x >= 0 && control.touchData.x <= control.touchData.x_measure)
		{
			control.touchData.x_percent = Math.round((control.touchData.x / control.touchData.x_measure) * 100);
		}

		if(control.touchData.y >= 0 && control.touchData.y <= control.touchData.y_measure)
		{
			control.touchData.y_percent = Math.round((control.touchData.y / control.touchData.y_measure) * 100);
		}

		touch_controlSignal();
	}

	if(event.type === "touchend")
	{
		control.touch_reset();

		touch_feedback();
	}
}

function touch_controlSignal()
{
	if(control.touchData.x_percent >= 33 && control.touchData.x_percent < 66)
	{
		if(control.touchData.y_percent >= 0 && control.touchData.y_percent < 33)
		{
			control.dir = "UP";
		}
	}

	if(control.touchData.x_percent >= 33 && control.touchData.x_percent < 66)
	{
		if(control.touchData.y_percent >= 66 && control.touchData.y_percent <= 100)
		{
			control.dir = "DOWN";
		}
	}

	if(control.touchData.x_percent >= 0 && control.touchData.x_percent < 33)
	{
		if(control.touchData.y_percent >= 33 && control.touchData.y_percent < 66)
		{
			control.dir = "LEFT";
		}
	}

	if(control.touchData.x_percent >= 66 && control.touchData.x_percent <= 100)
	{
		if(control.touchData.y_percent >= 33 && control.touchData.y_percent < 66)
		{
			control.dir = "RIGHT";
		}
	}

	touch_feedback();
}

function touch_feedback()
{
	var ind;

	var walkClass;

	switch(control.dir)
	{
		case "UP":
		{
			ind = "touchPad-U-ind";
			walkClass = "tween-player-UD";

			break;
		}

		case "DOWN":
		{
			ind = "touchPad-D-ind";
			walkClass = "tween-player-UD";

			break;
		}

		case "LEFT":
		{
			ind = "touchPad-L-ind";
			walkClass = "tween-player-LR";

			break;
		}

		case "RIGHT":
		{
			ind = "touchPad-R-ind";
			walkClass = "tween-player-LR";

			break;
		}
	}

	if(control.dir === "STILL")
	{
		$("#" + control.touchData.indicator).removeClass("touchPad_C_signal_show").addClass("touchPad_C_signal_hide");

		control.touchData.indicator = "";

		control.walkClassUpdate("tween-player-XX");
	}

	else
	{
		if(ind !== control.touchData.indicator)
		{
			$("#" + control.touchData.indicator).removeClass("touchPad_C_signal_show").addClass("touchPad_C_signal_hide");

			$("#" + ind).removeClass("touchPad_C_signal_hide").addClass("touchPad_C_signal_show");

			control.touchData.indicator = ind;

			control.walkClassUpdate(walkClass);
		}
	}

	control_listen();
}

function touch_render()
{
	$("#display_wrapper .layer-ui").html("");
	$("#display_wrapper .layer-ui").html(control.html_touch);
}

// COLOR_EVENT

function eventColor_add(colorClass, onComplete)
{
	$(".layer-field-event-color").addClass("tween-color-event");
	$(".layer-field-event-color div").addClass("color-event-" + colorClass);

	$(".layer-field-event-color").attr("data-color", colorClass);

	if(onComplete && onComplete != null)
	{
		$(".tween-color-event")[0].addEventListener("webkitTransitionEnd", onComplete, false);
		$(".tween-color-event")[0].addEventListener("transitionend", onComplete, false);
	}

	$(".layer-field-event-color").removeClass("color-event-default");
	$(".layer-field-event-color").addClass("color-event-show");
}

function eventColor_remove()
{
	$(".tween-color-event")[0].addEventListener("webkitTransitionEnd", eventColor_purge, false);
	$(".tween-color-event")[0].addEventListener("transitionend", eventColor_purge, false);


	$(".layer-field-event-color").removeClass("color-event-show");
}

function eventColor_purge(event)
{
	var usedColorClass = $(".layer-field-event-color").attr("data-color");

	$(".tween-color-event")[0].removeEventListener("webkitTransitionEnd", eventColor_purge, false);
	$(".tween-color-event")[0].removeEventListener("transitionend", eventColor_purge, false);

	$(".layer-field-event-color").removeClass("tween-color-event");

	if(usedColorClass !== "none")
	{
		if(usedColorClass === "portalLevel")
		{
			// move_reset();
			move_plugIn();
		}

		$(".layer-field-event-color div").removeClass("color-event-" + usedColorClass);

		$(".layer-field-event-color").attr("data-color", "none");
	}

	$(".layer-field-event-color").addClass("color-event-default");
}

// OBSERVE_TRAVEL

function observe_init(theObserver)
{
	var observeTypes = {

		"BOSS"	: function()
		{
			$("#bossObserve .bossObserve-mountain").addClass("tween-bossObserve");
			$("#bossObserve .bossObserve-boss").addClass("tween-bossObserve");

			$("#bossObserve .bossObserve-mountain").addClass("bossObserve-show");
			$("#bossObserve .bossObserve-boss").addClass("bossObserve-show");
		},

		"MONKEY"	: function()
		{
			if(portalTarget.spawn != portalTarget.level)
			{
				observe_monkeyLook("H");
			}

			else
			{
				if(control.rem_y < portalTarget.y_mid)
				{
					observe_monkeyLook("D");
				}

				else if(control.rem_y > portalTarget.y_mid)
				{
					observe_monkeyLook("U");
				}

				else if(control.rem_y == portalTarget.y_mid)
				{
					observe_monkeyLook("C");
				}
			}

			observe_monkeyShow();
		}

	};

	if(typeof observeTypes[theObserver] === "function")
	{
		return observeTypes[theObserver]();
	}
}

function observe_monkeyLook(dir)
{
	var currentLook = $("#monkeyObserve .monkeyObserve-monkeyInner").attr("data-look");

	if(currentLook.length > 0)
	{
		$("#monkeyObserve .monkeyObserve-monkeyInner").removeClass("monkeyObserve-look-" + currentLook);
	}

	$("#monkeyObserve .monkeyObserve-monkeyInner").addClass("monkeyObserve-look-" + dir);
	$("#monkeyObserve .monkeyObserve-monkeyInner").attr("data-look", dir);
}

function observe_monkeyShow()
{
	$("#monkeyObserve .monkeyObserve-monkey").addClass("tween-monkeyObserve");

	if(game_levelChange)
	{
		$(".tween-monkeyObserve")[0].addEventListener("webkitTransitionEnd", observe_monkeyShowEvent, false);
		$(".tween-monkeyObserve")[0].addEventListener("transitionend", observe_monkeyShowEvent, false);
	}

	if(game_levelFinal)
	{
		// FINAL_LEVEL
		$(".tween-monkeyObserve")[0].addEventListener("webkitTransitionEnd", finalLevelAfterPortalFX, false);
		$(".tween-monkeyObserve")[0].addEventListener("transitionend", finalLevelAfterPortalFX, false);
	}

	$("#monkeyObserve .monkeyObserve-monkey").addClass("monkeyObserve-show");
}

function observe_monkeyShowEvent(event)
{
	var delay_portalScreen_request;

	$(".tween-monkeyObserve")[0].removeEventListener("webkitTransitionEnd", observe_monkeyShowEvent, false);
	$(".tween-monkeyObserve")[0].removeEventListener("transitionend", observe_monkeyShowEvent, false);

	delay_portalScreen_request = setTimeout(portalScreen_request, 800);
}

function observe_monkeyHide()
{
	$(".tween-monkeyObserve")[0].addEventListener("webkitTransitionEnd", observe_monkeyHideEvent, false);
	$(".tween-monkeyObserve")[0].addEventListener("transitionend", observe_monkeyHideEvent, false);

	$("#monkeyObserve .monkeyObserve-monkey").removeClass("monkeyObserve-show");
}

function observe_monkeyHideEvent(event)
{
	var currentLook = $("#monkeyObserve .monkeyObserve-monkeyInner").attr("data-look");

	$(".tween-monkeyObserve")[0].removeEventListener("webkitTransitionEnd", observe_monkeyHideEvent, false);
	$(".tween-monkeyObserve")[0].removeEventListener("transitionend", observe_monkeyHideEvent, false);

	$("#monkeyObserve .monkeyObserve-monkey").removeClass("tween-monkeyObserve");

	$("#monkeyObserve .monkeyObserve-monkeyInner").removeClass("monkeyObserve-look-" + currentLook);
	$("#monkeyObserve .monkeyObserve-monkeyInner").attr("data-look", "");
}


//





