var display;

var Display = function(w, h, target)
{
	this.gameWidth = w;
	this.gameHeight = h;
	this.centerTarget = target;

	this.record = false;
}

Display.prototype.init = function()
{
	this.screen_w = window.screen.width;
	this.screen_h = window.screen.height;

	this.w = window.innerWidth;
	this.h = window.innerHeight;

	this.focus_y = 0;
	this.focusCurrent_y = 0;
	this.focusMove = false;
	this.focusHasEvent = false;

	this.waitForStage = {};
	this.waitForStage.track = false;
	this.waitForStage.call_funct = "";
	this.waitForStage.call_params = [];

	this.fill 			= {};
	this.fill.val_x = 0;
	this.fill.val_y = 0;
	this.fill.css 	= {};
}

Display.prototype.updateScreenVals = function()
{
	this.w = window.innerWidth;
	this.h = window.innerHeight;
}

Display.prototype.centerPlayer = function()
{
	// 	center_y = -(player_y) + ((screen_h * 0.5) - (player_h * 0.5));

	this.focus_y = Math.round(-(control.fl.y_safe) + ((this.h * 0.5) - (40 * 0.5)));
}

Display.prototype.hack = function()
{
	this.stageY = {};

	this.stageY.fl = {};

	// VELOCITY
	this.stageY.fl.vy = 0;

	// TARGET Y
	this.stageY.fl.ty = 0;

	// FINAL Y
	this.stageY.fl.dy = 0;

	this.stageY.fl.y = 0;

	this.stageY.fl.move = 40;
	this.stageY.fl.easing = 0.01;
}

Display.prototype.setPosition = function()
{
	this.focusCurrent_y = this.focus_y;

	this.stageY.fl.ty = this.focus_y;
	this.stageY.fl.y = this.focus_y;

	this.stageY.fl.vy = 0;
	this.stageY.fl.dy = 0;
}

function display_init()
{
	display = new Display(320, 2000, "field");
	display.init();

	display.hack();


	display_screenUpdate(true);
}

function display_screenUpdate(run)
{
	if(run)
	{
		$(window).on("resize", display_screenUpdateEvent);
	}

	else
	{
		$(window).off("resize");
	}
}

function display_screenUpdateEvent(event)
{
	display.updateScreenVals();
	// display.centerPlayer();

	display_centerLevel();
}

function display_centerLevel()
{
	var css;

	display.centerPlayer();

	css = "translateY(" + display.focus_y.toFixed(0) + "px)";

	/*
	if(!display.focusHasEvent)
	{
		display.focusHasEvent = true;

		$("." + display.centerTarget)[0].addEventListener("webkitTransitionEnd", display_centerLevelEvent, false);
		$("." + display.centerTarget)[0].addEventListener("transitionend", display_centerLevelEvent, false);
	}
	*/

	$("." + display.centerTarget)[0].style.webkitTransform 	= css;
	$("." + display.centerTarget)[0].style.transform				= css;
}

function display_centerLevelEvent(event)
{
	// $("." + display.centerTarget)[0].removeEventListener("webkitTransitionEnd", display_centerLevelEvent, false);
	// $("." + display.centerTarget)[0].removeEventListener("transitionend", display_centerLevelEvent, false);

	display.focusCurrent_y = display.focus_y;
}

function display_centerLevelEnd(event)
{
	display.focusCurrent_y = display.focus_y;
	display.focusMove = false;

	if(display.waitForStage.track)
	{
		display.waitForStage.track = false;

		if(display.waitForStage.call_params && display.waitForStage.call_params != null)
		{
			display.waitForStage.call_funct.apply(this, display.waitForStage.call_params);
		}

		else
		{
			display.waitForStage.call_funct();
		}
	}
}


function display_setBG()
{
	display.fill.css 		= {};
	display.fill.val_x 	= Math.round((display.screen_w * 0.5) / 40) * 40;
	display.fill.val_y 	= Math.round((display.screen_h * 0.5) / 40) * 40;

	display.fill.css.l =
	{
		"width"							: display.fill.val_x + "px",
		"height"						: (display.gameHeight + (display.fill.val_y * 2)) + "px",
		"-webkit-transform" : "translate(" + -display.fill.val_x + "px, " + -display.fill.val_y + "px)",
		"transform" 				: "translate(" + -display.fill.val_x + "px, " + -display.fill.val_y + "px)"
	};

	display.fill.css.r =
	{
		"width"							: display.fill.val_x + "px",
		"height"						: (display.gameHeight + (display.fill.val_y * 2)) + "px",
		"-webkit-transform" : "translate(" + display.gameWidth + "px, " + -display.fill.val_y + "px)",
		"transform" 				: "translate(" + display.gameWidth + "px, " + -display.fill.val_y + "px)"
	};

	display.fill.css.c =
	{
		"width"							: display.gameWidth + "px",
		"height"						: display.gameHeight + "px"
	};

	display.fill.css.t =
	{
		"height"						: display.fill.val_y + "px",
		"-webkit-transform" : "translateY(" + -display.fill.val_y + "px)",
		"transform" 				: "translateY(" + -display.fill.val_y + "px)"
	};

	display.fill.css.b	=
	{
		"height"						: display.fill.val_y + "px",
		"-webkit-transform" : "translateY(" + display.gameHeight + "px)",
		"transform" 				: "translateY(" + display.gameHeight + "px)"
	};

	$(".bgFill-l").css(display.fill.css.l);
	$(".bgFill-r").css(display.fill.css.r);

	$(".bgFill-c").css(display.fill.css.c);

	$(".bgFill-t").css(display.fill.css.t);
	$(".bgFill-b").css(display.fill.css.b);
}