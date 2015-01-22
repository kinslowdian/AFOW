
	var LEVEL_MAIN;

	var enemyData_ARR = new Array();

	var enemies_ARR = new Array();

	var enemiesBorn = false;

	var portalData_ARR = new Array();

	var portals_ARR = new Array();

	var portalsOpened = false;

	// var gateControl = {};

	var levelGateTarget;

	var gateData_ARR = new Array();

	var gates_ARR = new Array();

	var gatesBorn = false;

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

		this.levelFunctions = this.settings.levelFunctions;

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

		this.defeatPrefs = this.settings.defeat;

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

		// battleEngine.playerLevelSort(this);

		delete this.settings;
	};

	enemy.prototype.build = function()
	{
		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_enemy_" + this.enemyType).attr("id", this.id);

		$(this.buildData.container + " #" + this.id).css(this.buildData.css);

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
			var e = new enemy(enemyData_ARR[j], ".layer-field-enemy-area", enemy_count);

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
		this.settings 						= settings;
		this.buildData						= {};
		this.buildData.html				= html_lib_use("_portal", false, true);
		this.buildData.container 	= container;
		this.visited 							= false;

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

		this.x_mid = this.buildData.x + 20;
		this.y_mid = this.buildData.y + 20;

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


		$(this.buildData.container + " #" + this.id).css(this.buildData.css);
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
			var p = new portal(portalData_ARR[j], ".layer-field-portal-area");

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

	var gate = function(settings)
	{
		this.settings							= settings;
		this.buildData						= {};

		// this.needCenterFocus = false;

		this.closed = true;
	}

	gate.prototype.create = function()
	{
		this.id 									= this.settings.n;
		this.spawn								= this.settings.spawn;
		this.center_y							= 0;

		this.buildData.container	= this.settings.c_cl;

		this.buildData.block_x		= this.settings.x;
		this.buildData.block_y		= this.settings.y;
		this.buildData.x					= this.buildData.block_x * 80;
		this.buildData.y					= this.buildData.block_y * 80;
		this.buildData.w					= this.settings.w * 80;
		this.buildData.h					= this.settings.h * 80;

		// this.buildData.cy					= this.buildData.y + (this.buildData.h * 0.5);

		this.buildData.html	= html_lib_use("_gate", true, true);

		this.buildData.css 	= {
														"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
														"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
													};

		delete this.settings;
	}

	gate.prototype.build = function()
	{
		$("." + this.buildData.container).append(this.buildData.html);
		$("." + this.buildData.container + " #_gate").attr("id", this.id);

		$("#" + this.id + " .gate-outer-floor").addClass("field-floor-" + LEVEL_MAIN.landType);

		$("#" + this.id + " .gate-inner-floor").addClass("field-floor-" + LEVEL_MAIN.landType);

		if(!this.closed)
		{
			$("#" + this.id + " .gate-outer").remove();
		}

		$("#" + this.id).css(this.buildData.css);
	}

	gate.prototype.centerGate = function()
	{
		this.center_y = -(this.buildData.y) + ((display.h * 0.5) - (this.buildData.h * 0.5));
	}

	function gateRead()
	{
		for(var levelData in Logic.dat_ROM["_LEVELS"])
		{
			for(var i in Logic.dat_ROM["_LEVELS"][levelData]["gates"])
			{
				gateData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["gates"][i]);
			}
		}

		var gate_count = 0;

		for(var j in gateData_ARR)
		{
			var g = new gate(gateData_ARR[j]);

			g.create();

			gates_ARR.push(g);

			gate_count++;
		}

		gatesBorn = true;
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

		display_setBG();

		if(Graphics.html.data)
		{
			html_lib_reuse();
		}

		if(touchSupported)
		{

		}

		else
		{
			level_weather();
			$(".layer-ui").remove();
		}


		// FLOOR COLOUR

		$(".layer-field-floor > div").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["FLOOR"]["class"]);

		// OUTER BACKGROUND

		// $("#roam_content").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);

		$(".layer-field-fill .bgFill-l").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);
		$(".layer-field-fill .bgFill-r").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);
		$(".layer-field-fill .bgFill-t").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);
		$(".layer-field-fill .bgFill-b").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["OUTER"]["class"]);

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
			var b = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["WALLS"][object_walls], i, "BUSH", ".layer-field-walls");

			b.create();

			i++;
		}

		// FLOWERS

		i = 0;

		for(var object_plants in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["PLANTS"])
		{
			var f = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["PLANTS"][object_plants], i, "FLOWER_LIGHT", ".layer-field-walls");

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
				var s = new sound_level_trigger(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["sound_trigger"][object_soundTrigger], i, ".layer-field-sound-area");

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
				$("#roam_content .layer-field-water-area").css("opacity", Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["FILL"].toString());
			}

			else
			{
				if($("#roam_content .layer-field-water-area").attr("style"));
				{
					$("#roam_content .layer-field-water-area").removeAttr("style");
				}
			}

			i = 0;

			for(var object_waterBase in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["BASE"])
			{
				var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["BASE"][object_waterBase], i, "WATER_BASE", ".layer-field-water-area");

				w.create();

				i++;
			}

			i = 0;

			for(var object_waterEdge in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["EDGE"])
			{
				var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["EDGE"][object_waterEdge], i, "WATER_EDGE", ".layer-field-water-area");

				w.create();

				i++;
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

			if(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"])
			{
				i = 0;

				for(var object_waterIsland in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"])
				{
					var w = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["water"]["ISLAND"][object_waterIsland], i, "WATER_ISLAND", ".layer-field-water-area");

					w.create();

					i++;
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

				trace("PORTAL BUILD!!!");
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

		// GATES (PRE-READ)

		if(!gatesBorn)
		{
			gatesBorn = true;

			gateRead();
		}

		for(var object_gate in gates_ARR)
		{
			if(ROM.mapLevel == gates_ARR[object_gate].spawn)
			{
				gates_ARR[object_gate].build();
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
			// trace(LEVEL_MAIN.spirits.god_ARR[i]);

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

// GATES

function levelGate_checkStatus(gateID, enemyList)
{
	var statusMet = true;

	for(var enemyObject in enemies_ARR)
	{
		for(var enemyListID in enemyList)
		{
			if(enemies_ARR[enemyObject].id === enemyList[enemyListID])
			{
				var statusTarget = enemies_ARR[enemyObject];

				if(statusTarget.alive)
				{
					statusMet = false;

					break;
				}
			}
		}
	}

	if(statusMet)
	{
		for(var gateObject in gates_ARR)
		{
			if(gates_ARR[gateObject].id === gateID)
			{
				gates_ARR[gateObject].closed = false;

				levelGate_init(gates_ARR[gateObject]);
			}
		}
	}

	else
	{
		move_plugIn();

		eventColor_remove();
	}
}

function levelGate_init(gateOb)
{
	levelGateTarget = {};
	levelGateTarget = gateOb;

	levelGate_zoom();
}

function levelGate_zoom()
{
	var css;

	var css_sky0;
	var css_sky1;

	levelGateTarget.centerGate();

	css = 	{
						"-webkit-transform"	: "translateY(" + levelGateTarget.center_y + "px)",
						"transform"					: "translateY(" + levelGateTarget.center_y + "px)"
					};

	css_sky0 = 	{
								"-webkit-transform"	: "translateY(" + (levelGateTarget.center_y * display.sky0_offset).toFixed(0) + "px)",
								"transform"					: "translateY(" + (levelGateTarget.center_y * display.sky0_offset).toFixed(0) + "px)"
							};

	css_sky1 = 	{
								"-webkit-transform"	: "translateY(" + (levelGateTarget.center_y * display.sky1_offset).toFixed(0) + "px)",
								"transform"					: "translateY(" + (levelGateTarget.center_y * display.sky1_offset).toFixed(0) + "px)"
							};

	$(".tween-fieldShift")[0].addEventListener("webkitTransitionEnd", levelGate_zoomEvent, false);
	$(".tween-fieldShift")[0].addEventListener("transitionend", levelGate_zoomEvent, false);

	$(".field").css(css);

	$(".sky0").css(css_sky0);
	$(".sky1").css(css_sky1);
}

function levelGate_zoomEvent(event)
{
	var delay_hide;

	$(".tween-fieldShift")[0].removeEventListener("webkitTransitionEnd", levelGate_zoomEvent, false);
	$(".tween-fieldShift")[0].removeEventListener("transitionend", levelGate_zoomEvent, false);

	delay_hide = setTimeout(levelGate_hide, 500);
}

function levelGate_hide()
{
	$(".tween-gate")[0].addEventListener("webkitTransitionEnd", levelGate_hideEvent, false);
	$(".tween-gate")[0].addEventListener("transitionend", levelGate_hideEvent, false);

	$("#" + levelGateTarget.id + " .gate-outer").addClass("gate_hide");
}

function levelGate_hideEvent(event)
{
	var delay_return;

	$(".tween-gate")[0].removeEventListener("webkitTransitionEnd", levelGate_hideEvent, false);
	$(".tween-gate")[0].removeEventListener("transitionend", levelGate_hideEvent, false);

	$("#" + levelGateTarget.id + " .gate-outer").remove();

	// levelGate_return();
	delay_return = setTimeout(levelGate_return, 500);
}

function levelGate_return()
{
	var css;

	var css_sky0;
	var css_sky1;

	levelGateTarget.centerGate();

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

	$(".tween-fieldShift")[0].addEventListener("webkitTransitionEnd", levelGate_returnEvent, false);
	$(".tween-fieldShift")[0].addEventListener("transitionend", levelGate_returnEvent, false);

	$(".field").css(css);

	$(".sky0").css(css_sky0);
	$(".sky1").css(css_sky1);
}

function levelGate_returnEvent(event)
{
	$(".tween-fieldShift")[0].removeEventListener("webkitTransitionEnd", levelGate_returnEvent, false);
	$(".tween-fieldShift")[0].removeEventListener("transitionend", levelGate_returnEvent, false);

	levelGate_cleanUp();
}

function levelGate_cleanUp()
{
	delete levelGateTarget;

	eventColor_remove();

	move_plugIn();
}

	function level_player_setup()
	{
		// BREAK
		/*
		trace("level_player_setup();");

		if(LEVEL_MAIN.buildData.entry_fall === "YES" && game_introEntrance)
		{
			trace("CATCH");

			game_introEntrance = false;

			mapPlayer_spawn(LEVEL_MAIN.buildData.fall_x, LEVEL_MAIN.buildData.fall_y, LEVEL_MAIN.buildData.direction, "FULL");

			trace(LEVEL_MAIN);
		}

		else
		{
			portalExit();
		}
		*/
	}

	function level_clear()
	{
		var find_bgPixels = {};

		find_bgPixels.target 			= $(".bgFill-l").attr("class");
		find_bgPixels.searchBeg 	= find_bgPixels.target.search("pixels");
		find_bgPixels.searchEnd		= find_bgPixels.target.length;
		find_bgPixels.classString	= find_bgPixels.target.substr(find_bgPixels.searchBeg, find_bgPixels.searchEnd);

		$(".bgFill-l").removeClass(find_bgPixels.classString);
		$(".bgFill-r").removeClass(find_bgPixels.classString);
		$(".bgFill-t").removeClass(find_bgPixels.classString);
		$(".bgFill-b").removeClass(find_bgPixels.classString);

		delete find_bgPixels;

		$(".layer-field-floor > div").removeAttr("class");


		$(".layer-field-gate-area").html("");
		$(".layer-field-god-area").html("");
		$(".layer-field-water-area").html("");
		$(".layer-field-walls").html("");
		$(".layer-field-portal-area").html("");
		$(".layer-field-enemy-area").html("");
		$(".layer-field-sound-area").html("");
		$(".layer-field-gate-area").html("");

		$(".sky0").html("");
		$(".sky1").html("");

		$(".weather-snow").html("");
		$(".weather-rain").html("");
		$(".weather-wind").html("");


		for(var object_enemy in enemies_ARR)
		{
			if(enemies_ARR[object_enemy].rendered)
			{
				enemies_ARR[object_enemy].rendered = false;
			}
		}
	}