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

	this.signal = false;

	this.dir = "";

	this.walkLegs = false;

	this.html_player = $("#display_wrapper .player").html();
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

Control.prototype.walkClassUpdate = function(newClass)
{
	$(".layer-field-player-area .player .player-sprite").removeClass(this.walkClass).addClass(newClass);

	this.walkClass = newClass;

	if(this.walkClass === "tween-player-XX")
	{
		this.walkLegs = false;
		$(".layer-field-player-area .player .map-goat-legs").removeClass("tween-mapPlayerWalk_loop").addClass("tween-mapPlayerWalk_stop");
	}

	else
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
		}

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
		}

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

		if($(HIT_TEST.hits[0]).attr("data-npc") === "portal")
		{
			HIT_TEST.hit_portal = true;

			control.signal = false;

			HIT_TEST.hit_portal_id = HIT_TEST.hits[0].id;
		}

		if($(HIT_TEST.hits[0]).attr("data-npc") === "enemy")
		{
			HIT_TEST.hit_enemy = true;

			control.signal = false;

			HIT_TEST.hit_enemy_id = HIT_TEST.hits[0].id;
		}

		if($(HIT_TEST.hits[0]).attr("data-npc") === "sound")
		{
			HIT_TEST.hit_sound = true;

			HIT_TEST.hit_sound_id = HIT_TEST.hits[0].id;
		}

		if($(HIT_TEST.hits[0]).attr("data-npc") === "god")
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
		onEnterFrame_init(false);

		temp_findPortalEnter();
	}

	else
	{

	}

	if(HIT_TEST.hit_enemy)
	{
		onEnterFrame_init(false);

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

							portalScreen_request();

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

function autoMove_init(moveRequest)
{
	var tween;
	var css;
	var temp_delay;

	var moveTypes = {

		"PORTAL_ENTER"	: function()
		{
			tween = {};

			tween.x 		= portalTarget.x_mid;
			tween.y 		= portalTarget.y_mid;
			tween.a 		= "0";
			tween.onEnd = autoMove_event_portalEnter;

			control.walkClassUpdate("tween-player-XX");

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
			tween.x 				= portalTarget.buildData.x;
			tween.y 				= portalTarget.buildData.y;
			tween.a 				= "1";
			tween.pushX 		= 0;
			tween.pushY 		= 0;
			tween.onEnd 		= autoMove_event_portalExit;

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

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});
			control.writeEntry({x:tween.x, y:tween.y});

			autoMove_tween(tween, true);

			delete tween;
		},

		"ENEMY_ATTACK"	: function()
		{
			tween = {};

			tween.x 		= enemyTarget.buildData.x;
			tween.y 		= enemyTarget.buildData.y;
			tween.a 		= "1";
			tween.onEnd = autoMove_enemyAttack;

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
			$(".layer-field-player-area .player").addClass("tween-player");

			$(".tween-player")[0].addEventListener("webkitTransitionEnd", css.onEnd, false);
			$(".tween-player")[0].addEventListener("transitionend", css.onEnd, false);
	}

	css.write = 	{
						"-webkit-transform"	: "translate(" + css.x + "px, " + css.y + "px)",
						"transform"			: "translate(" + css.x + "px, " + css.y + "px)"
					};

	$(".layer-field-player-area .player").css(css.write);

	if(css.a)
	{
		$(".layer-field-player-area .player").css("opacity", css.a);
	}
}

function autoMove_tweenStage(onEnd)
{
	var css;

	var css_sky0;
	var css_sky1;

	var delay_exit;

	display.centerPlayer();

	// $(".field").addClass("tween-fieldShift");

	// $(".sky0").addClass("tween-fieldShift");
	// $(".sky1").addClass("tween-fieldShift");

	css = 	{
						"-webkit-transform"	: "translateY(" + display.focus_y + "px)",
						"transform"					: "translateY(" + display.focus_y + "px)"
					};

	css_sky0 = 	{
								"-webkit-transform"	: "translateY(" + (display.focus_y * display.sky0_offset).toFixed(0) + "px)",
								"transform"					: "translateY(" + (display.focus_y * display.sky0_offset).toFixed(0) + "px)"
							};

	css_sky1 = 	{
								"-webkit-transform"	: "translateY(" + (display.focus_y * display.sky1_offset).toFixed(0) + "px)",
								"transform"					: "translateY(" + (display.focus_y * display.sky1_offset).toFixed(0) + "px)"
							};

	display.setPosition();

	$(".field").css(css);

	$(".sky0").css(css_sky0);
	$(".sky1").css(css_sky1);

	delay_exit = setTimeout(autoMove_tweenStageComplete, 1000, onEnd);
}

function autoMove_tweenStageComplete(onEnd)
{
	// $(".field").removeClass("tween-fieldShift");

	// $(".sky0").removeClass("tween-fieldShift");
	// $(".sky1").removeClass("tween-fieldShift");

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

	$(".layer-field-player-area .player").removeClass("tween-player");

	temp_findPortalExit();
}

function autoMove_event_portalExit(event)
{
	$(".layer-field-player-area .player")[0].removeEventListener("webkitTransitionEnd", autoMove_event_portalExit, false);
	$(".layer-field-player-area .player")[0].removeEventListener("transitionend", autoMove_event_portalExit, false);

	$(".layer-field-player-area .player").removeClass("tween-player");

	control.writeSpawn({x:control.fl.x, y:control.fl.y});

	// PLUG CONTROLS
	move_reset();
}

function autoMove_enemyAttack()
{
	$(".layer-field-player-area .player")[0].removeEventListener("webkitTransitionEnd", autoMove_enemyAttack, false);
	$(".layer-field-player-area .player")[0].removeEventListener("transitionend", autoMove_enemyAttack, false);

	$(".layer-field-player-area .player").removeClass("tween-player");

	// DO STUFF

	attack_cloudInit();
}

function attack_cloudInit()
{
	attack_cloudOpen();
}

function attack_cloudOpen()
{
	attack_cloudAnimate();
}

function attack_cloudAnimate()
{
	var delay_sequence;

	delay_sequence = setTimeout(preBattleOptions_show, 1.2 * 1000);
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

	// control.touch_reset();

	// move_reset();
}


