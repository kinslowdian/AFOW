var control;

var loopRun;
var loopList;

var HIT_TEST;

// CLEANER CODE ?
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

	this.fl.move = 4;
	this.fl.moveX = 0;
	this.fl.moveY = 0;

	this.signal = false;

	this.dir = "";
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

Control.prototype.walkClassUpdate = function(newClass)
{
	$(".player .player-sprite").removeClass(this.walkClass).addClass(newClass);

	this.walkClass = newClass;
}

Control.prototype.touch_initPad = function(touchArea)
{
	this.touchArea = touchArea;
	this.firstTouch = true;
	this.enableTouch = true;

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
	loopList.push(display_centerLevel);

	loopRun = false;

	onEnterFrame_init(true);
}

function onEnterFrame_init(run)
{
	if(run)
	{
		loopRun = true;
		window.requestAnimationFrame(onEnterFrame);
	}

	else
	{
		loopRun = false;
		window.cancelAnimationFrame(onEnterFrame);
	}
}

function hitTest_init()
{
	HIT_TEST = {};

	HIT_TEST.hit_portal_id = "";
	HIT_TEST.hit_enemy_id = "";

	HIT_TEST.hit_edge = false;
	HIT_TEST.hit_portal = false;
	HIT_TEST.hit_enemy = false;
}

function move_init(run)
{
	if(run)
	{
		control.signal = true;

		$(window)[0].addEventListener("keydown", move_event, false);
		$(window)[0].addEventListener("keyup", move_event, false);

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
}

function onEnterFrame()
{
	for(var i in loopList)
	{
		loopList[i]();
	}

	if(loopRun)
	{
		window.requestAnimationFrame(onEnterFrame);
	}
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

		}

		if($(HIT_TEST.hits[0]).attr("data-npc") === "god")
		{

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



		temp_findEnemy();
	}

	else
	{

	}
}

function onEnterFrame_stepper()
{
	var css;

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

	css = {
					"-webkit-transform"	: "translate(" + finalMoveX + "px, " + finalMoveY + "px)",
					"transform"					: "translate(" + finalMoveX + "px, " + finalMoveY + "px)"
				};

	$(".hitTest").css(css);
}

function onEnterFrame_move()
{
	var css;

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

		css = {
						"-webkit-transform"	: "translate(" + control.fl.x + "px, " + control.fl.y + "px)",
						"transform"					: "translate(" + control.fl.x + "px, " + control.fl.y + "px)"
					};

		$(".player").css(css);
	}
}



///////// UPDATE

function temp_findEnemy()
{
	/*
	for(var i in enemyArr)
	{
		if(HIT_TEST.hit_enemy_id === enemyArr[i].id)
		{
			enemyTarget = enemyArr[i];

			break;
		}
	}

	temp_autoMove_init("ENEMY_ATTACK");
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

	temp_autoMove_init("PORTAL_ENTER");
}

function temp_findPortalExit()
{
	// STAGE TRAVEL
	if(portalTarget.level == ROM.mapLevel)
	{
		for(var i in portals_ARR)
		{
			if(portalTarget.exit == portals_ARR[i].num)
			{
				portalTarget = {};
				portalTarget = portals_ARR[i];

				temp_autoMove_init("PORTAL_PLACE");

				break;
			}
		}
	}

	// LEVEL TRAVEL
	else
	{

	}
}

function temp_autoMove_init(moveRequest)
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
			tween.onEnd = temp_autoMove_event_portalEnter;

			control.walkClassUpdate("tween-player-XX");

			temp_autoMove_tween(tween, true);

			delete tween;
		},

		"PORTAL_PLACE"	: function()
		{
			tween = {};

			tween.x 		= portalTarget.x_mid;
			tween.y 		= portalTarget.y_mid;
			tween.a 		= "0";

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			// display_centerLevel();

			temp_autoMove_tween(tween, false);

			delete tween;

			// HACKY EXIT AFTER SCREEN PLACEMENT

			// temp_delay = setTimeout(temp_autoMove_init, 600, "PORTAL_EXIT");

			temp_autoMove_tweenStage();

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
			tween.onEnd 		= temp_autoMove_event_portalExit;

			switch(portalTarget.direction)
			{
				case "UP"			:{ tween.pushY = -(portalTarget.buildData.h); break; }
				case "DOWN"		:{ tween.pushY = portalTarget.buildData.h * 1.5; 		break; }
				case "LEFT"		:{ tween.pushX = -(portalTarget.buildData.w); break; }
				case "RIGHT"	:{ tween.pushX = portalTarget.buildData.w * 1.5; 		break; }
			}

			tween.x += tween.pushX;
			tween.y += tween.pushY;

			css = 	{
								"-webkit-transform"	: "translate(" + tween.x + "px, " + tween.y + "px)",
								"transform"					: "translate(" + tween.x + "px, " + tween.y + "px)"
							};

			$(".hitTest").css(css);

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			// SWAP
			// onEnterFrame_init(true);

			temp_autoMove_tween(tween, true);

			delete tween;
		},

		"ENEMY_ATTACK"	: function()
		{
			tween = {};

			tween.x 		= enemyTarget.x;
			tween.y 		= enemyTarget.y;
			tween.a 		= "1";
			tween.onEnd = temp_autoMove_enemyAttack;

			control.walkClassUpdate("tween-player-XX");

			temp_autoMove_tween(tween, true);

			delete tween;
		},

		"ENEMY_RETREAT"	: function()
		{
			tween = {};

			tween.x 		= control.fl.target_safe_x;
			tween.y 		= control.fl.target_safe_y;

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			temp_autoMove_tween(tween, false);

			delete tween;
		},

		"SPAWN"	: function()
		{
			tween = {};

			tween.x	= control.fl.spawn_x;
			tween.y	= control.fl.spawn_y;

			control.writePosition({x:tween.x, y:tween.y, d:"STILL"});

			control.walkClassUpdate("tween-player-XX");

			temp_autoMove_tween(tween, false);

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

function temp_autoMove_tween(settings, animate)
{
	var css = settings;

	if(animate)
	{
			$(".player").addClass("tween-player");

			$(".tween-player")[0].addEventListener("webkitTransitionEnd", css.onEnd, false);
			$(".tween-player")[0].addEventListener("transitionend", css.onEnd, false);
	}

	css.write = 	{
										"-webkit-transform"	: "translate(" + css.x + "px, " + css.y + "px)",
										"transform"					: "translate(" + css.x + "px, " + css.y + "px)"
								};

	$(".player").css(css.write);

	if(css.a)
	{
		$(".player").css("opacity", css.a);
	}
}

function temp_autoMove_tweenStage()
{
	var css;

	var delay_exit;

	display.centerPlayer();
	// display_centerLevel();

	$(".field").addClass("tween-fieldShift");

	css = 	{
						"-webkit-transform"	: "translateY(" + display.focus_y + "px)",
						"transform"					: "translateY(" + display.focus_y + "px)"
					};

	display.setPosition();

	// $(".field")[0].addEventListener("webkitTransitionEnd", temp_autoMove_tweenStageEvent, false);
	// $(".field")[0].addEventListener("transitionend", temp_autoMove_tweenStageEvent, false);

	$(".field").css(css);

	delay_exit = setTimeout(temp_autoMove_tweenStageEvent, 1000, null);

	trace("CHECK FAULT");
	trace(loopRun);
}

function temp_autoMove_tweenStageEvent(event)
{
	// $(".field")[0].removeEventListener("webkitTransitionEnd", temp_autoMove_tweenStageEvent, false);
	// $(".field")[0].removeEventListener("transitionend", temp_autoMove_tweenStageEvent, false);

	$(".field").removeClass("tween-fieldShift");

	temp_autoMove_init("PORTAL_EXIT");
}

function temp_autoMove_event_portalEnter(event)
{
	$(".player")[0].removeEventListener("webkitTransitionEnd", temp_autoMove_event_portalEnter, false);
	$(".player")[0].removeEventListener("transitionend", temp_autoMove_event_portalEnter, false);

	$(".player").removeClass("tween-player");

	temp_findPortalExit();
}

function temp_autoMove_event_portalExit(event)
{
	$(".player")[0].removeEventListener("webkitTransitionEnd", temp_autoMove_event_portalExit, false);
	$(".player")[0].removeEventListener("transitionend", temp_autoMove_event_portalExit, false);

	$(".player").removeClass("tween-player");

	control.writeSpawn({x:control.fl.x, y:control.fl.y});

	// PLUG CONTROLS
	move_reset();
}

function temp_autoMove_enemyAttack()
{
	$(".player")[0].removeEventListener("webkitTransitionEnd", temp_autoMove_enemyAttack, false);
	$(".player")[0].removeEventListener("transitionend", temp_autoMove_enemyAttack, false);

	$(".player").removeClass("tween-player");

	// DO STUFF
}




	///////////////////////////////// --- PORTAL

	function portalEntry(portal_hit)
	{
		for(var i in portals_ARR)
		{
			if(portals_ARR[i].id === portal_hit)
			{
				trace(portals_ARR[i].id + " " + portal_hit);

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

								// BREAK
								// portalExit();

								// NOT FINAL
								if(soundEffects_pedal != null)
								{
									sound_play("fx_crow");
								}

								break;
							}
						}
					}

					break;
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
								game_levelChange = true;

								portalTarget = {};
								portalTarget = portals_ARR[k];

								ROM.mapLevel = portals_ARR[i].level;

								trace("!!!! GOING TO: " + ROM.mapLevel);
								trace(portalTarget);

								// NEEDS TO BE IN OWN FUNCTION AND CALLED AFTER FADE:
								// level_clear();

								// level_init();

								// BREAK
								// portalScreen_request();

								// portalExit();

								// NOT FINAL
								// sound_play("fx_trees");

								// NOT FINAL
								if(soundEffects_pedal != null)
								{
									sound_fadeInitGlobal(0, {call_funct: sound_levelClear});
								}

								break;
							}
						}
					}
				}
			}
		}
	}

	// DEAD???
	function portalExit()
	{
		var moveMeasure = "";
		var x_spawn;
		var y_spawn;
		var axisCenter = MAP_PLAYER.move_default / MAP_PLAYER.placement.block_full;

		// NEW MOVEMENT

		if(portalTarget.direction === "UP")
		{
			x_spawn = portalTarget.buildData.block_x + axisCenter;
			y_spawn = portalTarget.buildData.block_y;

			moveMeasure = "HALF";
		}

		if(portalTarget.direction === "DOWN")
		{
			x_spawn = portalTarget.buildData.block_x + axisCenter;
			y_spawn = portalTarget.buildData.block_y;

			moveMeasure = "FULL";
		}

		if(portalTarget.direction === "LEFT")
		{
			x_spawn = portalTarget.buildData.block_x;
			y_spawn = portalTarget.buildData.block_y + axisCenter;

			moveMeasure = "HALF_EXTRA";
		}

		if(portalTarget.direction === "RIGHT")
		{
			x_spawn = portalTarget.buildData.block_x;
			y_spawn = portalTarget.buildData.block_y + axisCenter;

			moveMeasure = "FULL";
		}

		mapPlayer_spawn(x_spawn, y_spawn, portalTarget.direction, moveMeasure);
	}

	///////////////////////////////// --- PORTAL


