	var DISPLAY;

	var displayZoom;

	function display_init()
	{
		DISPLAY = {};

		DISPLAY._width 			= window.screen.width;
		DISPLAY._height 		= window.screen.height;

		DISPLAY.screenSectionMove = false;
		DISPLAY.screenSectionStore = 0;

		DISPLAY.gameHeight = 2000;

		// ISSUES
		// DISPLAY.y = 0;
		// DISPLAY.current_y = 0;
	}

	function screenUpdateInit(forceEvent)
	{
		DISPLAY.screenUpdateUse = true;

		$(window).on("resize", screenUpdate);

		if(forceEvent)
		{
			screenUpdate(null);
		}
	}

	function screenUpdateCancel()
	{
		DISPLAY.screenUpdateUse = false;

		$(window).off("resize");
	}

	function screenUpdate(event)
	{
		var css_x;
		var css_y;
		var x;
		var y;


		DISPLAY._width 			= window.screen.width;
		DISPLAY._height 		= window.screen.height;
		DISPLAY._width_row 		= Math.round(DISPLAY._width / DISPLAY.tileWidth);
		DISPLAY._height_row 	= Math.round(DISPLAY._height / DISPLAY.tileHeight);
		DISPLAY._width_fill 	= DISPLAY._width_row * DISPLAY.tileWidth;
		DISPLAY._height_fill	= DISPLAY._height_row * DISPLAY.tileHeight;


		if(DISPLAY.screenUpdateUse)
		{
			// fix blurring:
			DISPLAY.center_X		= Math.floor(($(".stage-main").width() - $(".stage-view-x").width()) * 0.5);

			DISPLAY.center_y	= 0;


			DISPLAY.center_X < 0 ? x = DISPLAY.center_X : x = 0;

			css_x = {
						"-webkit-transform"	: "translateX(" + x + "px)",
						"transform" 		: "translateX(" + x + "px)"
					};

			$(".stage-view-x").css(css_x);

			// ERROR HERE - TEMP REMOVAL
			// DISPLAY.stageOffset = $(".stage-view-x").offset().left;
			// ERROR HERE - TEMP REMOVAL

			DISPLAY.viewHeight = $(document).height();

			// ISSUES
			DISPLAY.y = 0;
			DISPLAY.current_y = 0;


			if(!DISPLAY.screenSections)
			{
				screenDivision();
			}
		}
	}

	function screenDivision()
	{
		DISPLAY._height <= 480 ?  DISPLAY.screenSections = 240 : DISPLAY.screenSections = 320; // 400

		DISPLAY.screenDivisionTotal = DISPLAY.gameHeight / DISPLAY.screenSections;
	}

	function moveStageTest()
	{
		var exitFrame;

		var triggered = false;

		for(var i = 0; i < DISPLAY.screenDivisionTotal; i++)
		{
			if(MAP_PLAYER.pos_y >= i * DISPLAY.screenSections && MAP_PLAYER.pos_y < (i + 1) * DISPLAY.screenSections)
			{
				if(DISPLAY.screenSectionCurrent != i && !DISPLAY.screenSectionMove)
				{
					if(DISPLAY.screenSectionCurrent != i && !DISPLAY.screenSectionMove)
					{
						DISPLAY.screenSectionMove = true;

						DISPLAY.screenSectionStore = i;

						i * DISPLAY.screenSections === 0 ? DISPLAY.y = 0 : DISPLAY.y = -(i * DISPLAY.screenSections - 80);

						triggered = true;

						moveStageScreen();
					}
				}

				traceHard(DISPLAY.screenSectionCurrent + " " + i + " " + DISPLAY.screenSectionMove + " " + DISPLAY.y + "px");
			}


		}


		// CATCH NEW LEVEL WITHOUT A SCREEN MOVE

		if(!triggered)
		{
			moveStageScreenTerminal();
		}
	}

	function moveStageScreen()
	{
		var css;

		// ALLOWS CONTROL SHOULD EVENT LISTENERS NOT FIRE IN THIS FUCTION
		// FIX TO SOLVE ISSUE OF SCREEN MOVE ON IMPACT WITH ENEMY

		if(BATTLE_NAV != null)
		{
			controlsAfterBattleExit();
		}


		// DEFAULT

		css =	{
					"-webkit-transform"		: "translateY(" + DISPLAY.y + "px)",
					"transform"				: "translateY(" + DISPLAY.y + "px)"
				};

		$(".stage-view-y")[0].addEventListener("webkitTransitionEnd", moveStageScreenEnd, false);
		$(".stage-view-y")[0].addEventListener("transitionend", moveStageScreenEnd, false);

		$(".stage-view-y").css(css);
	}

	function moveStageScreenEnd(event)
	{
		var exitFrame;

		$(".stage-view-y")[0].removeEventListener("webkitTransitionEnd", moveStageScreenEnd, false);
		$(".stage-view-y")[0].removeEventListener("transitionend", moveStageScreenEnd, false);

		DISPLAY.screenSectionCurrent = DISPLAY.screenSectionStore;

		DISPLAY.screenSectionMove = false;

		DISPLAY.current_y = DISPLAY.y;

		if(PORTAL_TRAVEL != null || BATTLE_NAV != null)
		{
			moveStageScreenTerminal();
		}
		// moveStageScreenTerminal();
	}

	function moveStageScreenTerminal()
	{
		if(PORTAL_TRAVEL != null)
		{
			appearFromPortal();
		}

		if(BATTLE_NAV != null)
		{
			controlsAfterBattleExit();
		}
	}

	function appearFromPortal()
	{
		if(!game_levelChange)
		{
			if(PortalScreen.displayed)
			{
				PortalScreen.displayed = false;

				exitFrame = setTimeout(mapPlayer_entry, 100);
			}

			else
			{
				exitFrame = setTimeout(mapPlayer_entry, 1000);
			}

			PORTAL_TRAVEL = null;
		}
	}

	function controlsAfterBattleExit()
	{
		if(BATTLE_NAV.game.result === "LOSE" || BATTLE_NAV.game.result === "WIN")
		{
			// SET UP CONTROLS + HITTEST

			control_relink();

			BATTLE_NAV = null;
		}
	}

	// ZOOM

	function displayZoom_init(run, plugControl)
	{
		if(plugControl)
		{
			control_relink();
		}

		else
		{
			MAP_PLAYER.listen = false;
		}

		if(run)
		{
			DISPLAY.displayZoom = {};
		}

		else
		{
			delete DISPLAY.displayZoom;
		}
	}

	function displayZoom_create(zoomHold, zoomEnd)
	{
		DISPLAY.displayZoom.wait 						= null;
		DISPLAY.displayZoom.waitTime 				= zoomHold;
		DISPLAY.displayZoom.call_funct 			= zoomEnd.call_funct;
		DISPLAY.displayZoom.call_params 		= zoomEnd.call_params|| null;

		DISPLAY.displayZoom.waitReturn			= null;
		DISPLAY.displayZoom.waitReturnTime	= 0.5;
	}

	function displayZoom_to(displayTarget_y, extra_y)
	{
		var css;
		var y_zoom = displayTarget_y + extra_y;

		if(y_zoom == 0)
		{
			displayZoom_over();
		}

		else
		{
			css =	{
						"-webkit-transform"		: "translateY(" + y_zoom + "px)",
						"transform"				: "translateY(" + y_zoom + "px)"
					};

			$(".stage-view-y")[0].addEventListener("webkitTransitionEnd", displayZoom_event, false);
			$(".stage-view-y")[0].addEventListener("transitionend", displayZoom_event, false);

			$(".stage-view-y").css(css);
		}
	}

	function displayZoom_event(event)
	{
		$(".stage-view-y")[0].removeEventListener("webkitTransitionEnd", displayZoom_event, false);
		$(".stage-view-y")[0].removeEventListener("transitionend", displayZoom_event, false);

		displayZoom_over();

		trace("ZOOM OK");
	}

	function displayZoom_over()
	{
		if(DISPLAY.displayZoom.waitTime > 0)
		{
			DISPLAY.displayZoom.wait = setTimeout(displayZoom_action, DISPLAY.displayZoom.waitTime * 1000);
		}

		else
		{
			displayZoom_action();
		}
	}

	function displayZoom_action()
	{
		z_action = window[DISPLAY.displayZoom.call_funct];
		z_params = DISPLAY.displayZoom.call_params || null;

		if(z_params != null)
		{
			z_action.apply(this, z_params);
		}

		else
		{
			z_action();
		}
	}

	function displayZoom_return()
	{
		// if(DISPLAY.y > 0)
		// {
		// 	moveStageScreen();
		// }

		moveStageScreen();

		displayZoom_init(false, true);
	}