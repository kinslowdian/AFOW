
var display;

// var raw_displayEls;

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

	this.focus_y = Math.round(-(control.fl.target_safe_y) + ((this.h * 0.5) - (40 * 0.5)));
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

	this.sky0_offset = 0.75;
	this.sky1_offset = 0.5;
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

	// $("." + display.centerTarget).addClass("tween-fieldShift");

	display.hack();

	// raw_displayEls = {};

	// raw_displayEls.field 	= document.querySelector(".field");
	// raw_displayEls.sky0 	= document.querySelector(".sky0");
	// raw_displayEls.sky1 	= document.querySelector(".sky1");

	display_screenUpdate(true);
}

function display_rotate(event)
{
	if(event != null || event != undefined)
	{
		if(control != null)
		{
			control.touch_setOffset();
		}
	}

	trace(event);
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
	display.centerPlayer();
}

function display_centerLevel()
{
	var css;

	display.centerPlayer();

	$("." + display.centerTarget)[0].style.webkitTransform 	= "translateY(" + display.focus_y.toFixed(0) + "px)";
	$("." + display.centerTarget)[0].style.transform				= "translateY(" + display.focus_y.toFixed(0) + "px)";

	sky_paralax();


	// if(display.focus_y != display.focusCurrent_y)
	// {
	// 	display.stageY.fl.ty = display.focus_y;

	// 	display.stageY.fl.dy = display.stageY.fl.ty - display.stageY.fl.y;

	// 	if(Math.abs(display.stageY.fl.dy) < 1)
	// 	{
	// 		display.stageY.fl.y = display.stageY.fl.ty;

	// 		display.focusCurrent_y = display.focus_y;
	// 	}

	// 	else
	// 	{
	// 		display.stageY.fl.vy = display.stageY.fl.dy * display.stageY.fl.easing;
	// 		display.stageY.fl.y += display.stageY.fl.vy;


	// 		$("." + display.centerTarget)[0].style.webkitTransform 	= "translateY(" + display.stageY.fl.y.toFixed(0) + "px)";
	// 		$("." + display.centerTarget)[0].style.transform				= "translateY(" + display.stageY.fl.y.toFixed(0) + "px)";


	// 		sky_paralax();
	// 	}
	// }
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
	// display.fill 			= {};
	// display.fill.val_x = 0;
	// display.fill.val_y = 0;
	// display.fill.css 	= {};


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

function sky_paralax()
{
	$(".sky0")[0].style.webkitTransform 	= "translateY(" + (display.focus_y * display.sky0_offset).toFixed(0) + "px)";
	$(".sky0")[0].style.transform					= "translateY(" + (display.focus_y * display.sky0_offset).toFixed(0) + "px)";

	$(".sky1")[0].style.webkitTransform 	= "translateY(" + (display.focus_y * display.sky1_offset).toFixed(0) + "px)";
	$(".sky1")[0].style.transform					= "translateY(" + (display.focus_y * display.sky1_offset).toFixed(0) + "px)";



	/*
	var css_sky0;
	var css_sky1;

	css_sky0 = 	{
								"-webkit-transform" : "translateY(" + (display.stageY.fl.y * display.sky0_offset) + "px)",
								"transform" 				: "translateY(" + (display.stageY.fl.y * display.sky0_offset) + "px)"
							};

	css_sky1 = {
								"-webkit-transform" : "translateY(" + (display.stageY.fl.y * display.sky1_offset) + "px)",
								"transform" 				: "translateY(" + (display.stageY.fl.y * display.sky1_offset) + "px)"
							};

	$(".sky0").css(css_sky0);
	$(".sky1").css(css_sky1);
	*/


	// $(".sky0")[0].style.webkitTransform 	= "translateY(" + (display.stageY.fl.y * display.sky0_offset).toFixed(0) + "px)";
	// $(".sky0")[0].style.transform					= "translateY(" + (display.stageY.fl.y * display.sky0_offset).toFixed(0) + "px)";

	// $(".sky1")[0].style.webkitTransform 	= "translateY(" + (display.stageY.fl.y * display.sky1_offset).toFixed(0) + "px)";
	// $(".sky1")[0].style.transform					= "translateY(" + (display.stageY.fl.y * display.sky1_offset).toFixed(0) + "px)";

	// raw_displayEls.sky0.style.webkitTransform 	= "translateY(" + (display.stageY.fl.y * display.sky1_offset) + "px)";
	// raw_displayEls.sky1.style.transform					= "translateY(" + (display.stageY.fl.y * display.sky1_offset) + "px)";

}