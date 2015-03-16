
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
}

Control.prototype.writePosition = function(placement)
{
	this.dir 							= placement.d;

	this.fl.x 						= placement.x;
	this.fl.y 						= placement.y;

	this.fl.target_x 			= this.fl.x;
	this.fl.target_y 			= this.fl.y;

	this.fl.target_safe_x = this.fl.x;
	this.fl.target_safe_y = this.fl.y;

	this.fl.moveX 				= 0;
	this.fl.moveY 				= 0;

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

Control.prototype.walkClassUpdate = function(newClass)
{
	$(".layer-field-player-area .player .player-sprite").removeClass("tween-player-UD");
	$(".layer-field-player-area .player .player-sprite").removeClass("tween-player-LR");
	$(".layer-field-player-area .player .player-sprite").removeClass("tween-player-XX");

	$(".layer-field-player-area .player .player-sprite").addClass(newClass);

	if(newClass === "tween-player-XX" && this.walkLegs)
	{
		this.walkLegs = false;
		$(".layer-field-player-area .player .map-goat-legs").removeClass("tween-mapPlayerWalk_loop").addClass("tween-mapPlayerWalk_stop");
	}

	else if(newClass !== "tween-player-XX" && !this.walkLegs)
	{
		this.walkLegs = true;
		$(".layer-field-player-area .player .map-goat-legs").removeClass("tween-mapPlayerWalk_stop").addClass("tween-mapPlayerWalk_loop");
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
	loop_init();
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

function loop_init()
{
	loopList = new Array();

	loopList.push(onEnterFrame_direction);
	loopList.push(onEnterFrame_stepper);
	loopList.push(hack_hitTest);
	loopList.push(onEnterFrame_move);
	// loopList.push(display_centerLevel);

	loopRun = false;

	onEnterFrame_init(true);
}

function onEnterFrame_init(run)
{
	if(run)
	{
		loopRun = true;
		//
		if(touchSupported)
		{
			loopInt = setInterval(onEnterFrame, 20); // SET TO 10 FOR TURBO
			// window.requestAnimationFrame(onEnterFrame);
		}

		else
		{
			window.requestAnimationFrame(onEnterFrame);
		}

		loopSlowInt = setInterval(onEnterSlow, 1400);
	}

	else
	{
		loopRun = false;

		if(touchSupported)
		{
			clearInterval(loopInt);
			// window.cancelAnimationFrame(onEnterFrame);
		}

		else
		{
			window.cancelAnimationFrame(onEnterFrame);
		}

		clearInterval(loopSlowInt);
	}
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

function move_init(run)
{
	if(run)
	{
		control.signal = true;

		$(window)[0].addEventListener("keydown", move_event, false);
		$(window)[0].addEventListener("keyup", move_event, false);

		if(touchSupported)
		{
			$(window)[0].addEventListener("touchstart", touch_lock, false);

			$("#touchPad-full")[0].addEventListener("touchstart", touch_find, false);
			$("#touchPad-full")[0].addEventListener("touchmove", touch_find, false);
			$("#touchPad-full")[0].addEventListener("touchend", touch_find, false);

			$("#touchPad .touchPad-cont").removeClass("touchPad_C_hide").addClass("touchPad_C_show");
		}

		$("#menu_strip").removeClass("ignoreMouseEvents");
		$("#menu_strip .menu_tab").removeClass("menuTab_hide").addClass("menuTab_show");

		// TouchUI.js
		// ADD WHEN HTML UPDATED
		// $(window)[0].addEventListener("touchstart", touch_lock, false);

		// ADD WHEN HTML UPDATED
		// $("#touchPad-full")[0].addEventListener("touchstart", touch_find, false);
		// $("#touchPad-full")[0].addEventListener("touchmove", touch_find, false);
		// $("#touchPad-full")[0].addEventListener("touchend", touch_find, false);
	}

	else
	{
		control.signal = false;

		$(window)[0].removeEventListener("keydown", move_event, false);
		$(window)[0].removeEventListener("keyup", move_event, false);

		if(touchSupported)
		{
			$(window)[0].removeEventListener("touchstart", touch_lock, false);

			$("#touchPad-full")[0].removeEventListener("touchstart", touch_find, false);
			$("#touchPad-full")[0].removeEventListener("touchmove", touch_find, false);
			$("#touchPad-full")[0].removeEventListener("touchend", touch_find, false);

			$("#touchPad .touchPad-cont").removeClass("touchPad_C_show").addClass("touchPad_C_hide");

			$("#" + control.touchData.indicator).removeClass("touchPad_C_signal_show").addClass("touchPad_C_signal_hide");
		}

		$("#menu_strip").addClass("ignoreMouseEvents");
		$("#menu_strip .menu_tab").removeClass("menuTab_show").addClass("menuTab_hide");

		// TouchUI.js
		// ADD WHEN HTML UPDATED
		// $(window)[0].removeEventListener("touchstart", touch_lock, false);

		// ADD WHEN HTML UPDATED
		// $("#touchPad-full")[0].removeEventListener("touchstart", touch_find, false);
		// $("#touchPad-full")[0].removeEventListener("touchmove", touch_find, false);
		// $("#touchPad-full")[0].removeEventListener("touchend", touch_find, false);
	}
}

function move_event(event)
{
	trace("move_event();");

	var tempSignal = "";

	if(event.type === "keyup")
	{
		control.dir = "STILL";

		control.walkClassUpdate("tween-player-XX");
	}

	if(event.type === "keydown")
	{
		switch(event.keyCode)
		{
			case 37:
			{
				// LEFT
				tempSignal = "LEFT";

				control.walkClassUpdate("tween-player-LR");

				break;
			}

			case 38:
			{
				// UP
				tempSignal = "UP";

				control.walkClassUpdate("tween-player-UD");

				break;
			}

			case 39:
			{
				// RIGHT
				tempSignal = "RIGHT";

				control.walkClassUpdate("tween-player-LR");

				break;
			}

			case 40:
			{
				// DOWN
				tempSignal = "DOWN";

				control.walkClassUpdate("tween-player-UD");

				break;
			}

			default:
			{
				tempSignal = "STILL";

				control.walkClassUpdate("tween-player-XX");
			}
		}

		if(control.signal)
		{
			control.dir = tempSignal;
		}
	}
}

function move_reset()
{
	hitTest_init();

	control.signal = true;

	onEnterFrame_init(true);
	console.log("!!!!!!----------- move_reset");
}

function move_cancel()
{
	control.signal = false;

	onEnterFrame_init(false);

	move_init(false);
}

function move_plugIn()
{
	move_reset();
	move_init(true);
}

function onEnterFrame()
{
	for(var i in loopList)
	{
		loopList[i]();
	}

	if(loopRun && !touchSupported)
	{
		window.requestAnimationFrame(onEnterFrame);
	}
}

function onEnterSlow()
{
	display_centerLevel();
}

function onEnterFrame_direction()
{
	if(control.signal)
	{
		if(control.dir === "UP")
		{
			if(control.fl.y == control.fl.target_y)
			{
				control.fl.moveY = -(control.fl.move);
				control.fl.target_y -= control.fl.target_move;
			}
		}

		else if(control.dir === "DOWN") //else if
		{
			if(control.fl.y == control.fl.target_y)
			{
				control.fl.moveY = control.fl.move;
				control.fl.target_y += control.fl.target_move;
			}
		}

		if(control.dir === "LEFT")
		{
			if(control.fl.x == control.fl.target_x)
			{
				control.fl.moveX = -(control.fl.move);
				control.fl.target_x -= control.fl.target_move;
			}
		}

		else if(control.dir === "RIGHT") //else if
		{
			if(control.fl.x == control.fl.target_x)
			{
				control.fl.moveX = control.fl.move;
				control.fl.target_x += control.fl.target_move;
			}
		}
	}

	else
	{

	}
}

function hack_hitTest()
{
	HIT_TEST.hits = $(".collideCheck-player").collision(".collideCheck-field");

	if(HIT_TEST.hits[0] != undefined || HIT_TEST.hits[0] != null)
	{
		if($(HIT_TEST.hits[0]).attr("data-npc") === "edge")
		{
			HIT_TEST.hit_edge = true;

			control.signal = false;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "portal")
		{
			HIT_TEST.hit_portal = true;

			control.signal = false;

			HIT_TEST.hit_portal_id = HIT_TEST.hits[0].id;
		}

		else if($(HIT_TEST.hits[0]).attr("data-npc") === "enemy")
		{
			HIT_TEST.hit_enemy = true;

			control.signal = false;

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

	// $(".status p").html(HIT_TEST.hit_edge.toString());

	hack_hitTest_update();
}

function hack_hitTest_update()
{
	if(HIT_TEST.hit_edge)
	{
		// HIT ISSUE SO USE SAFE X & Y (EXTRA WRITE)

		control.fl.target_x = control.fl.target_safe_x;
		control.fl.target_y = control.fl.target_safe_y;

		// RESET CONTROL AND HIT TEST

		// REVERSE LOGIC??

		if(HIT_TEST.hit_edge)
		{
			HIT_TEST.hit_edge = false;
		}

		if(!control.signal)
		{
			control.signal = true;
		}

		// REVERSE LOGIC??
	}

	else
	{
		// SAFE VALUES UPDATED

		if(!HIT_TEST.hit_enemy)
		{
			control.fl.target_safe_x = control.fl.target_x;
			control.fl.target_safe_y = control.fl.target_y;

			// display_centerLevel();
		}
		// control.fl.target_safe_x = control.fl.target_x;
		// control.fl.target_safe_y = control.fl.target_y;
	}

	if(HIT_TEST.hit_portal)
	{
		// AMEND
		// onEnterFrame_init(false);
		move_cancel();

		temp_findPortalEnter();
	}

	else
	{

	}

	if(HIT_TEST.hit_enemy)
	{
		// AMEND
		// onEnterFrame_init(false);
		move_cancel();

		preBattleOptions_init();

		temp_findEnemy();
	}

	else
	{

	}

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

	// SEE temp.js
	if(HIT_TEST.hit_god)
	{
		if(gameEventTriggers.hitList.god_id !== HIT_TEST.hit_god_id)
		{
			god_eventSearch(HIT_TEST.hit_god_id);

			gameEventTriggers.hitList.god_id = HIT_TEST.hit_god_id;
		}

		// WHEN BUILT - OPTIMISE THIS THE SAME AS THE SOUND
		// god_eventSearch(HIT_TEST.hit_god_id);
	}
}

function onEnterFrame_stepper()
{
	// var css;

	var finalMoveX;
	var finalMoveY;

	if(control.signal)
	{
		// USE TARGET X & Y

		finalMoveX = control.fl.target_x;
		finalMoveY = control.fl.target_y;
	}

	else
	{
		// HIT ISSUE SO USE SAFE X & Y

		finalMoveX = control.fl.target_safe_x;
		finalMoveY = control.fl.target_safe_y;
	}

	/*
	css = {
					"-webkit-transform"	: "translate(" + finalMoveX + "px, " + finalMoveY + "px)",
					"transform"					: "translate(" + finalMoveX + "px, " + finalMoveY + "px)"
				};

	$(".hitTest").css(css);
	*/

	$(".hitTest")[0].style.webkitTransform 	= "translate(" + finalMoveX + "px, " + finalMoveY + "px)";
	$(".hitTest")[0].style.transform 				= "translate(" + finalMoveX + "px, " + finalMoveY + "px)";
}

function onEnterFrame_move()
{
	// var css;

	if(!HIT_TEST.hit_portal && !HIT_TEST.hit_enemy)
	{
		if(control.fl.x != control.fl.target_x)
		{
			// ADD NORMAL MOVEMENT
			control.fl.x += control.fl.moveX;
		}

		if(control.fl.y != control.fl.target_y)
		{
			// ADD NORMAL MOVEMENT
			control.fl.y += control.fl.moveY;
		}

		/*
		css = {
						"-webkit-transform"	: "translate(" + control.fl.x + "px, " + control.fl.y + "px)",
						"transform"					: "translate(" + control.fl.x + "px, " + control.fl.y + "px)"
					};

		$(".layer-field-player-area .player").css(css);
		*/

		$(".layer-field-player-area .player")[0].style.webkitTransform 	= "translate(" + control.fl.x + "px, " + control.fl.y + "px)";
		$(".layer-field-player-area .player")[0].style.transform				= "translate(" + control.fl.x + "px, " + control.fl.y + "px)";
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

			tween.x 		= control.fl.target_safe_x;
			tween.y 		= control.fl.target_safe_y;

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
		// finalLevelSeq_init();

		finalLevelAfterPortalFX(null);
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
	$(".layer-field-player-area .player").removeClass(control.fl.tween);
	control.fl.tween = "";
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





