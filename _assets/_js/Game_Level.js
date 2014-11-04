
	var LEVEL_MAIN;

	var enemyData_ARR = new Array();

	var enemies_ARR = new Array();

	var enemiesBorn = false;

	var portalData_ARR = new Array();

	var portals_ARR = new Array();

	var portalsOpened = false;

	var LEVEL = function(settings)
	{
		this.settings = settings;
		this.buildData = {};
		this.titleData = {};
	}

	LEVEL.prototype.create = function()
	{
		this.levelNumber 			= this.settings.n;
		this.weather				= this.settings.weather;
		this.landType				= this.settings.land;

		this.spirits = {};

		this.buildData.entry_fall	= this.settings.entry_fall;
		this.buildData.fall_x		= this.settings.fall_x;
		this.buildData.fall_y		= this.settings.fall_y;
		this.buildData.direction	= this.settings.fall_d;

		this.titleData.top			= this.settings.title_top;
		this.titleData.btm			= this.settings.title_btm;

		delete this.settings;
	}

	var level_create_basic = function(settings, num, set, container)
	{
		this.settings = settings;
		this.container = container;
		this.buildData = {};
		this.num = num;
		this.set = set;
	};

	level_create_basic.prototype.create = function()
	{
		this.buildData.block_x	= this.settings.x * 80;
		this.buildData.block_y	= this.settings.y * 80;
		this.buildData.block_w	= this.settings.w * 80;
		this.buildData.block_h	= this.settings.h * 80;
		this.buildData.id		= "level" + ROM.mapLevel + "_" + this.set + this.num;
		this.buildData.pixels	= this.settings.p;

		if(this.buildData.pixels.search("collideCheck-field") > -1)
		{
			this.buildData.html 	= '<div id="' + this.buildData.id + '" class="' + this.buildData.pixels + '" data-npc="edge"></div>';
		}

		else
		{
			this.buildData.html 	= '<div id="' + this.buildData.id + '" class="' + this.buildData.pixels + '"></div>';
		}

		this.buildData.css		= 	{
										"width"				: this.buildData.block_w + "px",
										"height"			: this.buildData.block_h + "px",
										"position"			: "absolute",
										"-webkit-transform"	: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)",
										"transform"			: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)"
									};

		$(this.container).append(this.buildData.html);
		$(this.container + " #" + this.buildData.id).css(this.buildData.css);

		delete this.settings;
	};

	var backgroundExtras = function(settings, container)
	{
		this.settings 				= settings;
		this.buildData				= {};
		this.buildData.artType		= this.settings.t;
		this.buildData.html			= html_lib_use("_" + this.buildData.artType, false, true);
		this.buildData.container 	= container;
	};

	backgroundExtras.prototype.create = function()
	{
		this.id					= this.settings.n;

		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;

		this.buildData.css	=	{
									"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
									"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
								};


		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_" + this.buildData.artType).attr("id", this.id);

		$("#" + this.id).css(this.buildData.css);

		delete this.settings;
	};

	var enemy = function(settings, container, num)
	{
		this.settings				= settings;
		this.buildData				= {};
		this.buildData.container	= container;
		this.alive					= true;
		this.rendered				= false;
		this.array_index			= num;
	};

	enemy.prototype.create = function()
	{
		this.id 				= this.settings.n;
		this.enemyType 			= this.settings.t;
		this.spawn				= this.settings.spawn;
		this.rating				= this.settings.l;
		this.name				= this.settings.known;

		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;

		this.buildData.html		= html_lib_use("_enemy_" + this.enemyType, false, true);

		this.buildData.css		=	{
										"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
										"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
									};

		battleEngine.playerLevelSort(this);

		delete this.settings;
	};

	enemy.prototype.build = function()
	{
		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_enemy_" + this.enemyType).attr("id", this.id);

		$("#" + this.id).css(this.buildData.css);

		trace("RENDER ISSUE :: " + "#" + this.id);
		trace(this.buildData.css);

		this.rendered = true;
	};

	function enemyRead()
	{
		for(var levelData in Logic.dat_ROM["_LEVELS"])
		{
			for(var i in Logic.dat_ROM["_LEVELS"][levelData]["enemyPlayers"])
			{
				enemyData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["enemyPlayers"][i]);
			}
		}

		var enemy_count = 0;

		for(var j in enemyData_ARR)
		{
			var e = new enemy(enemyData_ARR[j], ".enemy-area", enemy_count);

			e.create();

			enemies_ARR.push(e);

			enemy_count++;
		}

		trace(enemies_ARR);

		enemiesBorn = true;
	}

	function enemy_forcePosition(obj)
	{
		var css_data;

		css_data = obj.buildData.css;

		return css_data;
	}

	var portal = function(settings, container)
	{
		this.settings 				= settings;
		this.buildData				= {};
		this.buildData.html			= html_lib_use("_portal", false, true);
		this.buildData.container 	= container;

		trace(this);
	};

	portal.prototype.portal_open = function()
	{
		this.spawn				= this.settings.spawn;
		this.num 				= this.settings.num;
		this.id 				= "portal_" +  this.spawn + "_" + this.num; // PORTAL NUMBER 1 ON LEVEL 0 === #portal_0_1;

		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;
		this.buildData.pixels	= this.settings.p;

		this.level				= this.settings.level;
		this.exit				= this.settings.exit;
		this.direction 			= this.settings.direction;

		this.buildData.css	=	{
									"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
									"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
								};

		delete this.settings;
	};

	portal.prototype.build = function(levelCheck)
	{
		var pixelClass = this.buildData.pixels;

		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_portal").attr("id", this.id);

		$(this.buildData.container + " #" + this.id + " .pixelPush").addClass(this.buildData.pixels);

		// PORTAL CHANGE FOR LEVEL AND STAGE (LEVEL = BLACK SPACE, STAGE = PINK SPACE)
		if(this.level != ROM.mapLevel)
		{
			$(this.buildData.container + " #" + this.id + " .portal_space").addClass("portal_level_warp");
		}


		$("#" + this.id).css(this.buildData.css);
	}

	function portalRead()
	{
		for(var levelData in Logic.dat_ROM["_LEVELS"])
		{
			for(var i in Logic.dat_ROM["_LEVELS"][levelData]["portal"])
			{
				portalData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["portal"][i]);
			}
		}

		trace("SAFE");
		trace(portalData_ARR);

		for(var j in portalData_ARR)
		{
			var p = new portal(portalData_ARR[j], ".portal-area");

			p.portal_open();

			portals_ARR.push(p);
		}

		portalsOpened = true;
	}


	var level_create_god = function(settings)
	{
		this.settings = settings;
		this.buildData = {};
	};

	level_create_god.prototype.create = function()
	{
		this.container 						= "." + this.settings.c_cl;
		this.godType 							= this.settings.t;

		this.position 						= this.settings.p;

		this.class_display				= this.settings.display;

		this.buildData.block_x		= this.settings.x * 80;
		this.buildData.block_y		= this.settings.y * 80;
		this.buildData.block_w		= this.settings.w * 80;
		this.buildData.block_h		= this.settings.h * 80;
		this.buildData.bg					= this.settings.b_cl;
		this.buildData.trees			= this.settings.t_cl;
		this.buildData.ground			= this.settings.g_cl;
		this.buildData.pixels			= this.settings.p_cl;

		this.buildData.mainAmbience = this.settings.a;

		this.buildData.id 				= this.settings.n;
		this.buildData.html 			= html_lib_use("_" + this.godType, true, true);

		this.buildData.css				= 	{
																		"position"			: "absolute",
																		"-webkit-transform"	: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)",
																		"transform"			: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)"
																	};

		$("#roam_wrapper " + this.container).append(this.buildData.html);
		$("#roam_wrapper " + this.container + " #_" + this.godType).attr("id", this.buildData.id);
		$("#roam_wrapper " + this.container + " #" + this.buildData.id).css(this.buildData.css);

		$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .god_main").addClass(this.buildData.mainAmbience);

		if(this.position === "SHOW")
		{
			$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .god_holder").addClass(this.class_display.show);
		}

		if(this.position === "HIDE")
		{
			$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .god_holder").addClass(this.class_display.hide);
		}

		$("#roam_wrapper " + this.container + " #" + this.buildData.id).addClass(this.buildData.bg);
		$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .treePush").addClass(this.buildData.trees);
		$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .god_ground").addClass(this.buildData.ground);
		$("#roam_wrapper " + this.container + " #" + this.buildData.id + " .pixelPush").addClass(this.buildData.pixels);

		delete this.settings;
	};

	var god_level_trigger = function(settings, num)
	{
			this.settings = settings;
			this.buildData = {};
			this.num = num;
	};

	god_level_trigger.prototype.create = function()
	{
			this.container 					= "." + this.settings.c_cl;
			this.godTriggerPrefs		= this.settings.god_prefs;

			this.buildData.block_x	= this.settings.x * 80;
			this.buildData.block_y	= this.settings.y * 80;
			this.buildData.block_w	= this.settings.w * 80;
			this.buildData.block_h	= this.settings.h * 80;
			this.buildData.id		= "level" + ROM.mapLevel + "_godTrigger_" + this.num;

			this.buildData.html 	= '<div id="' + this.buildData.id + '" class="god_trigger collideCheck-field" data-npc="god"></div>';


			this.buildData.css		= 	{
											"width"				: this.buildData.block_w + "px",
											"height"			: this.buildData.block_h + "px",
											"position"			: "absolute",
											"-webkit-transform"	: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)",
											"transform"			: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)"
										};

			$(this.container).append(this.buildData.html);
			$(this.container + " #" + this.buildData.id).css(this.buildData.css);

			delete this.settings;
	}



	function level_init()
	{
		LEVEL_MAIN = new LEVEL(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["levelSettings"]);

		LEVEL_MAIN.create();

		// RESET SCREEN MOVE?

		// SET UP LEVEL INFO NOTICE

		if(game_levelChange)
		{
			game_levelChange = false;
		}

		level_form();

		// ADD LATER - if() COULD BE BUGGY

/*
		if(game_introEntrance)
		{
			level_player_setup();
		}
*/

		level_player_setup();
	}

	function level_form()
	{
		var i;


		if(Graphics.html.data)
		{
			html_lib_reuse();
		}

		level_weather();

		// FLOOR COLOUR

		$(".field-floor > div").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["FLOOR"]["class"]);

		// OUTER BACKGROUND

		$("#roam_content").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);

		// TREES BUSHES

/*
		for(var object_bush in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["BUSH"])
		{
			var b = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["BUSH"][object_bush], i, "BUSH", ".field-area");

			b.create();

			i++;
		}
*/

		i = 0;

		for(var object_walls in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["WALLS"])
		{
			var b = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["WALLS"][object_walls], i, "BUSH", ".field-area");

			b.create();

			i++;
		}

		// FLOWERS

		i = 0;

		for(var object_plants in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["PLANTS"])
		{
			var f = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["PLANTS"][object_plants], i, "FLOWER_LIGHT", ".field-area");

			f.create();

			i++;
		}

		// BACKGROUND EXTRAS

		for(var object_bg in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["CLEARING"])
		{
			var b = new backgroundExtras(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["CLEARING"][object_bg], ".woodland-areas");

			b.create();
		}

			i = 0;

		// SOUND EVENT AREAS

		if(soundEffects_pedal != null)
		{
			soundEffects_pedal.triggers = new Array();

			for(var object_soundTrigger in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["sound_trigger"])
			{
				var s = new sound_level_trigger(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["sound_trigger"][object_soundTrigger], i, ".sound-area");

				s.create();

				soundEffects_pedal.triggers.push(s);

				i++;
			}
		}


		// EXTRAS

		if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"])
		{
			if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FILL"] < 1)
			{
				$("#roam_content .water-area").css("opacity", Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FILL"].toString());
			}

			else
			{
				if($("#roam_content .water-area").attr("style"));
				{
					$("#roam_content .water-area").removeAttr("style");
				}
			}

			i = 0;

			for(var object_waterEdge in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["EDGE"])
			{
				var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["EDGE"][object_waterEdge], i, "WATER_EDGE", ".water-area");

				w.create();

				i++;
			}

			i = 0;

			for(var object_waterBase in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["BASE"])
			{
				var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["BASE"][object_waterBase], i, "WATER_BASE", ".water-area");

				w.create();

				i++;
			}

			if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"])
			{
				i = 0;

				for(var object_waterIsland in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"])
				{
					var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"][object_waterIsland], i, "WATER_ISLAND", ".water-area");

					w.create();

					i++;
				}
			}

			if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FISH"])
			{
				// i = 0;

				for(var object_waterFish in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FISH"])
				{
					var w = new backgroundExtras(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FISH"][object_waterFish], ".water-area");

					w.create();

					// i++;
				}
			}
		}

		if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"])
		{
			LEVEL_MAIN.spirits.god_ARR = new Array();
			LEVEL_MAIN.spirits.godTriggers_ARR = new Array();

			for(var object_god in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"]["GOD"])
			{
				var g = new level_create_god(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"]["GOD"][object_god]);

				g.create();

				LEVEL_MAIN.spirits.god_ARR.push(g);
			}

			if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"]["TRIGGERS"])
			{
				i = 0;

				trace("!!!!!!!!!!!! GOD TRIGGERS ALERT");

				for(var object_godTrigger in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"]["TRIGGERS"])
				{
					var gt = new god_level_trigger(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["gods"]["TRIGGERS"][object_godTrigger], i);

					gt.create();

					LEVEL_MAIN.spirits.godTriggers_ARR.push(gt);

					i++;
				}
			}
		}


		// PORTALS (PRE-READ)

		if(!portalsOpened)
		{
			portalRead();

			portalsOpened = true;
		}

		for(var object_portal in portals_ARR)
		{
			if(ROM.mapLevel == portals_ARR[object_portal].spawn)
			{
				portals_ARR[object_portal].build();
			}
		}

		// ENEMIES (PRE-READ)

		if(!enemiesBorn)
		{
			enemiesBorn = true;

			enemyRead();
		}

		for(var object_enemy in enemies_ARR)
		{
			if(ROM.mapLevel == enemies_ARR[object_enemy].spawn)
			{
				if(enemies_ARR[object_enemy].alive)
				{
					if(!enemies_ARR[object_enemy].rendered)
					{
						enemies_ARR[object_enemy].build();
					}
				}

				else
				{
					digGrave(enemies_ARR[object_enemy]);
				}
			}
		}

		html_lib_empty();

		// SHIFT TO PORTAL SCREEN
		// if(soundEffects_pedal != null)
		// {
		// 	sound_level_background();
		// }
	}

	function digGrave(dead_obj)
	{
		var grave = {};

		grave.w = dead_obj.buildData.w;
		grave.h = dead_obj.buildData.h;
		grave.ref = "_enemy_grave" + grave.w + "x" + grave.h;
		grave.html = html_lib_use(grave.ref, false, true);

		$(dead_obj.buildData.container).append(grave.html);
		$(dead_obj.buildData.container + " #" + grave.ref).attr("id", dead_obj.id);

		$("#" + dead_obj.id).css(dead_obj.buildData.css);

		// GRAVE FIX
		$("#" + dead_obj.id).addClass("field-floor-" + LEVEL_MAIN.landType);
		// GRAVE FIX

		enemies_ARR[dead_obj.array_index].rendered = true;

		delete grave;
	}

	function level_weather()
	{
		var weather_use = true;

		var html_data;
		var html_cont;

		if(LEVEL_MAIN.weather === "CLEAR")
		{
			weather_use = false;
		}

		else
		{
			if(LEVEL_MAIN.weather === "SNOW")
			{
				html_data = html_lib_use("_weather_data_SNOW", false, true);
				html_cont = ".weather-snow";
			}

			if(LEVEL_MAIN.weather === "RAIN")
			{
				html_data = html_lib_use("_weather_data_RAIN", false, true);
				html_cont = ".weather-rain";
			}

			if(LEVEL_MAIN.weather === "WIND")
			{
				html_data = html_lib_use("_weather_data_WIND", false, true);
				html_cont = ".weather-wind";
			}
		}

		if(weather_use)
		{
			$(html_cont).html(html_data);
		}
	}

	function god_eventSearch(god_hit)
	{
		var godTriggerItem;

		var godTriggerFunction;
		var godTriggerParameters;

		for(var i in LEVEL_MAIN.spirits.godTriggers_ARR)
		{
			godTriggerItem = LEVEL_MAIN.spirits.godTriggers_ARR[i];

			if(god_hit === godTriggerItem.buildData.id)
			{
				for(var prefObject in godTriggerItem.godTriggerPrefs)
				{
					godTriggerFunction = window[godTriggerItem.godTriggerPrefs[prefObject].call_funct];
					godTriggerParameters = godTriggerItem.godTriggerPrefs[prefObject].call_params;

					godTriggerFunction.apply(this, godTriggerParameters);
				}
			}
		}
	}

	function god_displayInit(target, position)
	{
		var displayApply = god_displayCheck(target, position);

		var displaySettings;

		var positionRoute = {

			"SHOW" : 	function()
			{
				if(displayApply)
				{
					displaySettings = {}
					displaySettings = god_unpackDisplay(target);

					$("#" + target + " .god_holder").removeClass(displaySettings.hide).addClass(displaySettings.show);
				}

			},

			"HIDE" : 	function()
			{
				if(displayApply)
				{
					displaySettings = {}
					displaySettings = god_unpackDisplay(target);

					$("#" + target + " .god_holder").removeClass(displaySettings.show).addClass(displaySettings.hide);
				}
			}
		};

		if(typeof positionRoute[position] !== "function")
		{
			return false;
		}

		else
		{
			positionRoute[position]();
		}
	}

	function god_displayCheck(target, newPosition)
	{
		var allowChange = false;

		for(var i in LEVEL_MAIN.spirits.god_ARR)
		{
			trace(LEVEL_MAIN.spirits.god_ARR[i]);

			if(target === LEVEL_MAIN.spirits.god_ARR[i].buildData.id)
			{
				if(newPosition !== LEVEL_MAIN.spirits.god_ARR[i].position)
				{
					LEVEL_MAIN.spirits.god_ARR[i].position = newPosition;
					allowChange = true;
				}
			}
		}

		return allowChange;
	}

	function god_unpackDisplay(target)
	{
		var displayPrefs = {};

		for(var i in LEVEL_MAIN.spirits.god_ARR)
		{
			if(target === LEVEL_MAIN.spirits.god_ARR[i].buildData.id)
			{
				displayPrefs = LEVEL_MAIN.spirits.god_ARR[i].class_display;

				return displayPrefs;
			}
		}
	}

	function level_player_setup()
	{
		trace("level_player_setup();");

		if(LEVEL_MAIN.buildData.entry_fall === "YES" && game_introEntrance)
		{
			trace("CATCH");

			game_introEntrance = false;

			mapPlayer_spawn(LEVEL_MAIN.buildData.fall_x, LEVEL_MAIN.buildData.fall_y, LEVEL_MAIN.buildData.direction, true);

			trace(LEVEL_MAIN);
		}

		else
		{
			portalExit();
		}
	}

	function level_clear()
	{
		var find_bgPixels 		= $("#roam_content").attr("class");

		var get_bgPixels_BEG 	= find_bgPixels.search("pixels");
		var get_bgPixels_END 	= find_bgPixels.length;
		var get_bgPixels 		= find_bgPixels.substr(get_bgPixels_BEG, get_bgPixels_END);

		$(".field-floor > div").removeAttr("class");

		$(".enemy-area").html("");
		$(".portal-area").html("");
		$(".field-area").html("");
		$(".water-area").html("");

		$(".woodland-areas").html("");
		$(".god-areas").html("");

		$("#space .weather-snow").html("");
		$("#space .weather-rain").html("");
		$("#space .weather-wind").html("");


		$("#roam_content").removeClass(get_bgPixels);
		$(".field-floor > div").removeAttr("class");


		for(var object_enemy in enemies_ARR)
		{
			if(enemies_ARR[object_enemy].rendered)
			{
				enemies_ARR[object_enemy].rendered = false;
			}
		}
	}