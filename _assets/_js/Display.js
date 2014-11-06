	var DISPLAY;

	function display_init()
	{
		DISPLAY = {};

		DISPLAY._width 			= window.screen.width;
		DISPLAY._height 		= window.screen.height;

		DISPLAY.screenSectionMove = false;
		DISPLAY.screenSectionStore = 0;

		DISPLAY.gameHeight = 2000;
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

	var debug_j = 0;

	function appearFromPortal()
	{
		debug_j ++;

		trace("appearFromPortal(); call === " + debug_j);

		if(PORTAL_TRAVEL != null || PORTAL_TRAVEL != undefined)
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
	}

	var debug_i = 0;

	function controlsAfterBattleExit()
	{
		debug_i ++;

		trace("controlsAfterBattleExit(); call === " + debug_i);

		if(BATTLE_NAV != null || BATTLE_NAV != undefined)
		{
			// if(BATTLE_NAV.game.result === "LOSE" || BATTLE_NAV.game.result === "WIN")
			// {
			// 	// SET UP CONTROLS + HITTEST
			// 	hitTest_init();

			// 	MAP_PLAYER.listen = true;

			// 	control_switch(true);

			// 	BATTLE_NAV = null;
			// }

			if(BATTLE_NAV.game.result === "LOSE")
			{
				// SET UP CONTROLS + HITTEST
				hitTest_init();

				MAP_PLAYER.listen = true;

				control_switch(true);

				BATTLE_NAV = null;
			}

			if(BATTLE_NAV.game.result === "WIN")
			{
				BATTLE_NAV = null;
			}
		}
	}