trace("Temp.js being used -- remove from final build / release");

var tt_levelShift;
var time_levelShift = 800;

function levelShift_init(run)
{
	if(run)
	{
		levelShift_loop();
	}

	else
	{
		clearTimeout(tt_levelShift);
	}
}

function levelShift_loop()
{
	tt_levelShift = setTimeout(levelShift_loopEnd, time_levelShift);
}

function levelShift_loopEnd()
{
	display_centerLevel();

	levelShift_loop();
}


// FRIENDS

var friendData_ARR = new Array();

var friends_ARR = new Array();

var friendsBorn = false;

				/*
				{
					"x": 1.75,
					"y": 7.5,
					"w": 0.5,
					"h": 0.5,
					"n": "level0_friend0",
					"r": false,
					"spawn": 0,
					"hint": "up ahead is a wormhole, they dont always go where you’d expect"
				} */

var friend = function(settings, container, num)
{
	this.settings							= settings;
	this.buildData						= {};
	this.buildData.container	= container;
	this.seen									= false;
	this.rendered							= false;
	this.array_index					= num;
	this.flooring							= {};
	this.scene								= {};
};

friend.prototype.create = function()
{
	this.id 									= this.settings.n;
	this.spawn								= this.settings.spawn;
	this.hint									= this.settings.hint;
	this.time									= this.settings.time;
	this.character						= this.settings.character;
	this.once									= this.settings.once;

	// pixels_behindWorld_bad pixels_behindWorld_good

	this.scene.customFog			= this.settings.customFog;
	this.scene.bg							= this.settings.bg;
	this.scene.customDarkness	= this.settings.customDarkness;

	this.flooring.grass				= this.settings.grass;
	this.flooring.customHaze	= this.settings.customHaze;
	this.flooring.customFill	= this.settings.customFill;


	this.buildData.block_x 		= this.settings.x;
	this.buildData.block_y 		= this.settings.y;
	this.buildData.x					= this.buildData.block_x * 80;
	this.buildData.y 					= this.buildData.block_y * 80;
	this.buildData.w 					= this.settings.w * 80;
	this.buildData.h 					= this.settings.h * 80;

	this.buildData.html		= html_lib_use(this.character, false, true);

	this.buildData.css		=	{
									"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
									"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
								};

	delete this.settings;
};

friend.prototype.build = function()
{
	$(this.buildData.container).append(this.buildData.html);
	$(this.buildData.container + " #" + this.character).attr("id", this.id);

	$(this.buildData.container + " #" + this.id).css(this.buildData.css);

	this.rendered = true;
};

function friendRead()
{
	for(var levelData in Logic.dat_ROM["_LEVELS"])
	{
		for(var i in Logic.dat_ROM["_LEVELS"][levelData]["friendPlayers"])
		{
			friendData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["friendPlayers"][i]);
		}
	}

	var friend_count = 0;

	for(var j in friendData_ARR)
	{
		var f = new friend(friendData_ARR[j], ".layer-field-friend-area", friend_count);

		f.create();

		friends_ARR.push(f);

		friend_count++;
	}

	// friendsBorn = true;
}




function temp_messageScreen_init()
{
	var messageScreen_html;
	var exitFrame;
	var css;

	html_lib_reuse();

	messageScreen_html = html_lib_use("_messageScreen", false, true);

	html_lib_empty();

	$("#messageScreen").html(messageScreen_html);

	$("#messageScreen .messageScreen_friend").html(friendTarget.buildData.html);

	//OPTIMISED TARGETING
	$("#messageScreen .messageScreen_friend > div").removeAttr("id");

	css = {
					"width" 						: friendTarget.buildData.w + "px",
					"height" 						: friendTarget.buildData.h + "px",
					"-webkit-transform"	: "translateY(" + -(friendTarget.buildData.h) + "px)",
					"transform"					: "translateY(" + -(friendTarget.buildData.h) + "px)"
				};

	$("#messageScreen .messageScreen_friend").css(css);

	$("#messageScreen .messageScreen_focus .messageScreen_text p").html(friendTarget.hint);

	if(friendTarget.scene.customFog)
	{
		$("#messageScreen .foggyEdge").addClass(friendTarget.scene.customFog);
	}

	else
	{
		$("#messageScreen .foggyEdge").addClass("foggyEdge-" + LEVEL_MAIN.landType);
	}

	if(friendTarget.scene.customDarkness)
	{
		$("#messageScreen .messageScreenLand_darkness").addClass(friendTarget.scene.customDarkness);
	}

	else
	{
		$("#messageScreen .messageScreenLand_darkness").addClass("darkness-" + LEVEL_MAIN.landType);
	}

	$("#messageScreen .behindWorld").addClass(friendTarget.scene.bg);
	$("#messageScreen .messageScreenLand_grass").addClass(friendTarget.flooring.grass);

	if(friendTarget.flooring.customHaze)
	{
		$("#messageScreen .messageScreen_haze").addClass(friendTarget.flooring.customHaze);
	}

	else
	{
		$("#messageScreen .messageScreen_haze").addClass("haze-" + LEVEL_MAIN.landType);
	}

	if(friendTarget.flooring.customFill)
	{
		$("#messageScreen .messageScreenLand_fieldFill").addClass(friendTarget.flooring.customFill);
	}

	else
	{
		$("#messageScreen .messageScreenLand_fieldFill").addClass("field-floor-" + LEVEL_MAIN.landType);
	}


	$("#messageScreen").removeClass("messageScreen_hide");

	exitFrame = setTimeout(temp_messageScreen_run, 20);
}

function temp_messageScreen_run()
{
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", temp_messageScreen_runEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", temp_messageScreen_runEvent, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_hide").addClass("messageScreenFlare_show");
}

function temp_messageScreen_runEvent(event)
{
	var delay;

	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", temp_messageScreen_runEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", temp_messageScreen_runEvent, false);

	if(friendTarget.once)
	{
		friendTarget.seen = true;

		$("#" + friendTarget.id).remove();
	}

	$("#messageScreen .messageScreen_text p").removeClass("messageScreenText_hide").addClass("messageScreenText_show");

	$("#messageScreen .messageScreen_fullFill").addClass("messageScreenFullFill_show");

	$("#messageScreen .messageScreen_main").removeClass("messageScreen_hide");
	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_show").addClass("messageScreenFlare_hide");

	delay = setTimeout(temp_messageScreen_end, friendTarget.time * 1000);
}

function temp_messageScreen_end()
{
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", temp_messageScreen_endEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", temp_messageScreen_endEvent, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_hide").addClass("messageScreenFlare_show");
}

function temp_messageScreen_endEvent(event)
{
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", temp_messageScreen_endEvent, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", temp_messageScreen_endEvent, false);

	$("#messageScreen .messageScreen_main").addClass("messageScreen_hide");

	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("webkitTransitionEnd", temp_messageScreen_purge, false);
	$("#messageScreen .tween-messageScreenFlare")[0].addEventListener("transitionend", temp_messageScreen_purge, false);

	$("#messageScreen .messageScreen_flare").removeClass("messageScreenFlare_show").addClass("messageScreenFlare_hide");
}

function temp_messageScreen_purge(event)
{
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("webkitTransitionEnd", temp_messageScreen_purge, false);
	$("#messageScreen .tween-messageScreenFlare")[0].removeEventListener("transitionend", temp_messageScreen_purge, false);

	$("#messageScreen").html("");

	friendTarget = {};

	move_plugIn();
}



