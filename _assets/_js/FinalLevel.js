
var finalLevelKit;

var tempValue = 199;

// BUILD DISPLAY
function finalLevelTriggered()
{
	var html_lev;
	var html_nav;

	html_lib_reuse();

	html_lev = html_lib_use("_finalLevel", true, true);
	html_nav = html_lib_use("_battleNavUItext", true, true);

	// LEVEL HTML PLUG
	$("#display_finalLevel").html(html_lev);

	// NAV HTML PLUG
	$("#display_finalLevel .battleNav_UI_TEXT").html(html_nav);

	html_lib_empty();
}

function finalLevelAfterPortalFX(event)
{
	var delay;

	// TODO
	if(event != null)
	{
		$(".tween-monkeyObserve")[0].removeEventListener("webkitTransitionEnd", finalLevelAfterPortalFX, false);
		$(".tween-monkeyObserve")[0].removeEventListener("transitionend", finalLevelAfterPortalFX, false);
	}

	delay = setTimeout(finalLevelSeq_init, 800);
}

// PART 1

// BUILD AND SHOW
function finalLevelSeq_init()
{
	finalLevelKit = {};

	endDeathScene_init();

	$("#display_finalLevel").removeClass("ignoreMouseEvents");

	finalLevelSeq_show();
}

function finalLevelSeq_show()
{
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPart")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_showEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPart")[0].addEventListener("transitionend", finalLevelSeq_showEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1").removeClass("finalLevelPart_hideX").addClass("finalLevelPart_showX");
}

function finalLevelSeq_showEvent(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPart")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_showEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPart")[0].removeEventListener("transitionend", finalLevelSeq_showEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .foggyEdge").removeClass("foggyEdge_hide").addClass("foggyEdge_show");

	// TODO MAY REQUIRE THE HTML STATE TO BE STORED FOR RETURNING TO THE GAME
	theBattle = {};

	theBattle.html = {};
	theBattle.html.display_inner_world = $("#display_wrapper").html();

	theBattle.html.navWrapper = "";
	theBattle.html.fadeWrapper = "";
	theBattle.html.wipeWrapper = "";

	theBattle.playerStore = {};

	theBattle.playerStore.x_return = control.fl.target_safe_x;
	theBattle.playerStore.y_return = control.fl.target_safe_y;

	// FLUSH LEVEL OUT FOR OPTIMISATION
	$("#display_wrapper").html("");

	delay = setTimeout(finalLevelSeq_zoom, 0.5 * 1000);
}

function finalLevelSeq_zoom()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_zoomEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("transitionend", finalLevelSeq_zoomEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sunnySky").removeClass("sunnySky_hide").addClass("sunnySky_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land").removeClass("finalLevel_hide").addClass("finalLevel_show");
}

function finalLevelSeq_zoomEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_zoomEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("transitionend", finalLevelSeq_zoomEvent, false);

	finalLevelSeq_sunRise();
}

function finalLevelSeq_sunRise()
{
	trace($("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner"));

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_bossRise, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner")[0].addEventListener("transitionend", finalLevelSeq_bossRise, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner").removeClass("finalLevelSun_hide").addClass("finalLevelSun_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_night").addClass("finalLevelNight_hide");
}

function finalLevelSeq_bossRise(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_bossRise, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner")[0].removeEventListener("transitionend", finalLevelSeq_bossRise, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_bossRiseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].addEventListener("transitionend", finalLevelSeq_bossRiseEvent, false);


	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow").removeClass("finalLevel_bossShadow_hide").addClass("finalLevel_bossShadow_show");
}

function finalLevelSeq_bossRiseEvent(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_bossRiseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].removeEventListener("transitionend", finalLevelSeq_bossRiseEvent, false);

	delay = setTimeout(finalLevelSeq_bossJump0, 3 * 1000);
}

function finalLevelSeq_bossJump0()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].addEventListener("webkitAnimationEnd", finalLevelSeq_bossJump0Event, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].addEventListener("animationend", finalLevelSeq_bossJump0Event, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow").removeClass("tween-finalLevel_container_bossShadow").addClass("tween-finalLevelBossJump0");
}

function finalLevelSeq_bossJump0Event(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].removeEventListener("webkitAnimationEnd", finalLevelSeq_bossJump0Event, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow")[0].removeEventListener("animationend", finalLevelSeq_bossJump0Event, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_container_bossShadow").remove();

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-face").removeClass("boss-face-default").addClass("boss-face-happy");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .bossCont").addClass("tween-finalLevelBossJump1");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-armL-Cont").removeClass("boss-armL-Cont-UP");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-armR-Cont").removeClass("boss-armL-Cont-UP");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land").addClass("tween-finalLevelBossJumpGround");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_player .map-goat-head").addClass("mapPlayer_head_fear");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("webkitAnimationEnd", finalLevelSeq_bossJumpEnd, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("animationend", finalLevelSeq_bossJumpEnd, false);
}

function finalLevelSeq_bossJumpEnd(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("webkitAnimationEnd", finalLevelSeq_bossJumpEnd, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("animationend", finalLevelSeq_bossJumpEnd, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land").removeClass("tween-finalLevelBossJumpGround").addClass("tween-finalLevel");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner").removeClass("tween-finalLevelSun").addClass("tween-finalLevel");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_player .map-goat-head").removeClass("mapPlayer_head_fear");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-face").removeClass("boss-face-happy").addClass("boss-face-default");

	delay = setTimeout(finalLevelSeq_focusBoss, 1 * 1000);
}

function finalLevelSeq_focusBoss()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("webkitTransitionEnd", finalLevlSeq_storm, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].addEventListener("transitionend", finalLevlSeq_storm, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land").removeClass("finalLevel_show").addClass("finalLevel_drop");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_far").removeClass("finalLevel_show").addClass("finalLevel_drop");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner").removeClass("finalLevelSun_show").addClass("finalLevelSun_drop");
}

function finalLevlSeq_storm(event)
{
	trace(event);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("webkitTransitionEnd", finalLevlSeq_storm, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_land")[0].removeEventListener("transitionend", finalLevlSeq_storm, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .sun_inner").removeClass("finalLevelSun_drop").addClass("finalLevelSun_evil");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_night").removeClass("finalLevelNight_hide").addClass("finalLevelNight_evil");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].addEventListener("webkitTransitionEnd", finalLevSeq_stormEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].addEventListener("transitionend", finalLevSeq_stormEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .cloudySky").removeClass("cloudySky_hide").addClass("cloudySky_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_rain .rain").addClass("tween-rain");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_rain").removeClass("finalLevelRain_hide").addClass("finalLevelRain_show");
}

function finalLevSeq_stormEvent(event)
{
	trace(event);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].removeEventListener("webkitTransitionEnd", finalLevSeq_stormEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].removeEventListener("transitionend", finalLevSeq_stormEvent, false);

	// RECYCLE BATTLE NAV
	// TODO Temp.js
	test_finalBattle_intoBattle();
}

////////////////////// BOSS BATTLE RESULT == WIN

function finalLevelSeq_bossDefeat()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_night").removeClass("finalLevelNight_evil").addClass("finalLevelNight_hide");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_bossDefeatEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].addEventListener("transitionend", finalLevelSeq_bossDefeatEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .cloudySky").removeClass("cloudySky_show").addClass("cloudySky_hide");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-face").removeClass("boss-face-default").addClass("boss-face-dead");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .portal_bleed .portal_bleed_drop").removeClass("portal_bleed_drop_hide").addClass("portal_bleed_drop_show");
}

function finalLevelSeq_bossDefeatEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_bossDefeatEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-cloudySky")[0].removeEventListener("transitionend", finalLevelSeq_bossDefeatEvent, false);

	finalLevelSeq_portalLight();
}

function finalLevelSeq_portalLight()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelPortalLight")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_portalLightEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelPortalLight")[0].addEventListener("transitionend", finalLevelSeq_portalLightEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_portalLight").removeClass("finalLevelPortalLight_hide").addClass("finalLevelPortalLight_show");
}

function finalLevelSeq_portalLightEvent(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelPortalLight")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_portalLightEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelPortalLight")[0].removeEventListener("transitionend", finalLevelSeq_portalLightEvent, false);

	delay = setTimeout(finalLevelSeq_brightLight, 1.2 * 1000);
}

function finalLevelSeq_brightLight()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelLightFlare")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_intoPart2, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelLightFlare")[0].addEventListener("transitionend", finalLevelSeq_intoPart2, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_lightFlare").removeClass("finalLevelLightFlare_hide").addClass("finalLevelLightFlare_show");
}

function finalLevelSeq_intoPart2(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelLightFlare")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_intoPart2, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .tween-finalLevelLightFlare")[0].removeEventListener("transitionend", finalLevelSeq_intoPart2, false);

	endDeathScene_run();
}

function finalLevelSeq_purge()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1").html("");
}

////////////////////// BOSS BATTLE RESULT == WIN

////////////////////// BOSS BATTLE RESULT == LOSE

function finalLevelSeq_bossWin()
{
	finalLevelSeq_lightningFirstStrike();
}

function finalLevelSeq_lightningFirstStrike()
{
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelStormStrike")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_lightningFirstStrikeEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelStormStrike")[0].addEventListener("transitionend", finalLevelSeq_lightningFirstStrikeEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_stormStrike").removeClass("finalLevelStormStrike_hide").addClass("finalLevelStormStrike_show");
}

function finalLevelSeq_lightningFirstStrikeEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelStormStrike")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_lightningFirstStrikeEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelStormStrike")[0].removeEventListener("transitionend", finalLevelSeq_lightningFirstStrikeEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_lightningCloudEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite")[0].addEventListener("transitionend", finalLevelSeq_lightningCloudEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite").removeClass("finalLevelLightningCloudSprite_hide").addClass("finalLevelLightningCloudSprite_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightning")[0].addEventListener("webkitAnimationEnd", finalLevelSeq_lightningSecondStrike, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightning")[0].addEventListener("animationend", finalLevelSeq_lightningSecondStrike, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightning").addClass("tween-finalLevelLightning");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_thunderFlash").removeClass("finalLevelThunderFlash_hide").addClass("tween-finalLevelLightning");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_bossPart1 .boss-face").removeClass("boss-face-default").addClass("boss-face-happy");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-armL-Cont").addClass("boss-armL-Cont-UP");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1 .finalLevel_bossPart1 .boss-armR-Cont").addClass("boss-armL-Cont-UP");
}

function finalLevelSeq_lightningCloudEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_lightningCloudEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite")[0].removeEventListener("transitionend", finalLevelSeq_lightningCloudEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite").removeClass("tween-finalLevelLightningCloudSprite").addClass("tween-finalLevelLightningCloudSpriteLong");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_player .player-sprite").remove();

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_playerAshPile").removeClass("finalLevelPlayerAshPile_hide").addClass("finalLevelPlayerAshPile_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_fireLeft").removeClass("finalLevelFire_hide");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_fireRight").removeClass("finalLevelFire_hide");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_playerAshPile .finalLevel_playerAshPile_eyes").addClass("tween-finalLevelPlayerAshPile");
}

function finalLevelSeq_lightningSecondStrike(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightning")[0].removeEventListener("webkitAnimationEnd", finalLevelSeq_lightningSecondStrike, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightning")[0].removeEventListener("animationend", finalLevelSeq_lightningSecondStrike, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_lightningCloudSprite").removeClass("finalLevelLightningCloudSprite_show").addClass("finalLevelLightningCloudSprite_rise");

	// TODO
	// delay = setTimeout(finalLevelSeq_returnAfterLose, 4 * 1000);

	resultOutcome_init();

	delay = setTimeout(resultOutcome_request, 4 * 1000);
}

// TODO

function finalLevelSeq_returnAfterLose()
{
	var exitFrame;

	allBattleOver_battleEnd_return_end("BOSS_FAIL");



	// $("#display_wrapper").html(preBattleOptions.html.display_inner_world);
	// $("#display_wrapper .player").html("");
	// $("#display_wrapper .player").html(control.html_player);

	// $("#display_wrapper .hitTest").removeAttr("style");

	// TODO
	// bossTaunt_init();

	resultOutcome_init();

	exitFrame = setTimeout(resultOutcome_request, 20);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1").removeClass("tween-finalLevelPart").addClass("tween-finalLevelPartEnd");

	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPartEnd")[0].addEventListener("webkitTransitionEnd", finalLevelSeq_returnAfterLoseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPartEnd")[0].addEventListener("transitionend", finalLevelSeq_returnAfterLoseEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1").removeClass("finalLevelPart_showX").addClass("finalLevelPart_hideX");


}

function finalLevelSeq_returnAfterLoseEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPartEnd")[0].removeEventListener("webkitTransitionEnd", finalLevelSeq_returnAfterLoseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .tween-finalLevelPartEnd")[0].removeEventListener("transitionend", finalLevelSeq_returnAfterLoseEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part1").remove();

	game_levelFinal = false;

	// TODO
	bossTaunt_wait();
}

////////////////////// BOSS BATTLE RESULT == LOSE


// PART 2 + 3


function endDeathScene_init()
{
	finalLevelKit = {};

	finalLevelKit.html = {};
	finalLevelKit.html.endDeathScene = "";

	finalLevelKit.countShake;
	finalLevelKit.countShakeMax = 10;

	// JSON
	finalLevelKit.displayText = {};
	finalLevelKit.displayText.line0 = "well done!";
	finalLevelKit.displayText.line1 = "this forest is now free from worm holes.";
	finalLevelKit.displayText.lineDy0 = "you were defeated ";
	finalLevelKit.displayText.lineDy1 = " times.";

	finalLevelKit.html.endDeathScene = $("#display_finalLevel #finalLevel_wrapper .finalLevel_part2").html();

	finalLevelKit.lightning 				= {};
	finalLevelKit.lightning.height 	= display.screen_h;
	finalLevelKit.lightning.setY 		= 40 - finalLevelKit.lightning.height;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2").html("");

	endDeathScene_populate();
}

function endDeathScene_run()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2").html(finalLevelKit.html.endDeathScene);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2")[0].addEventListener("webkitTransitionEnd", endDeathScene_inPlace, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2")[0].addEventListener("transitionend", endDeathScene_inPlace, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2").removeClass("finalLevelPart_hideX").addClass("finalLevelPart_showX");
}

function endDeathScene_inPlace(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2")[0].removeEventListener("webkitTransitionEnd", endDeathScene_inPlace, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2")[0].removeEventListener("transitionend", endDeathScene_inPlace, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_lightFlare").removeClass("finalLevelLightFlare_show").addClass('finalLevelLightFlare_hide');

	finalLevelSeq_purge();

	// endDeathScene_portalOpen();

	endDeathScene_scroll();
}

function endDeathScene_populate()
{
	var defeatString = "";
	var css;

	defeatString = finalLevelKit.displayText.lineDy0 + tempValue + finalLevelKit.displayText.lineDy1;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEnd_infoBox .finalLevelEndInfoBoxText0").html(finalLevelKit.displayText.line0);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEnd_infoBox .finalLevelEndInfoBoxText1").html(finalLevelKit.displayText.line1);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEnd_infoBox .finalLevelEndInfoBoxText2").html(defeatString);

	css = {
					"height"	: finalLevelKit.lightning.height + "px",
					"margin"	: finalLevelKit.lightning.setY + "px auto 0px auto"
				};

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_stormStrike").css(css);
}

function endDeathScene_scroll()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].addEventListener("webkitTransitionEnd", endDeathScene_portalOpen, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].addEventListener("transitionend", endDeathScene_portalOpen, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner").removeClass("finalLevelPart2Inner_start").addClass("finalLevelPart2Inner_show");
}

function endDeathScene_portalOpen(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].removeEventListener("webkitTransitionEnd", endDeathScene_portalOpen, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].removeEventListener("transitionend", endDeathScene_portalOpen, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].addEventListener("webkitTransitionEnd", endDeathScene_bossRemove0, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].addEventListener("transitionend", endDeathScene_bossRemove0, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2LeavePortal").removeClass("bossLeavePortal_hide").addClass("bossLeavePortal_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_lightFlare").remove();
}

function endDeathScene_bossRemove0(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].removeEventListener("webkitTransitionEnd", endDeathScene_bossRemove0, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].removeEventListener("transitionend", endDeathScene_bossRemove0, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2 .bossCont").addClass("tween-finalLevelEndBossDeath0");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath0")[0].addEventListener("webkitAnimationIteration", endDeathScene_bossRemove1, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath0")[0].addEventListener("animationiteration", endDeathScene_bossRemove1, false);

	// e.addEventListener("animationiteration", listener, false);
}

function endDeathScene_bossRemove1(event)
{
	if(!finalLevelKit.countShake)
	{
		finalLevelKit.countShake = 0;
	}

	if(event.animationName === "tweenFinalLevelEndBossDeath0Frames")
	{
		finalLevelKit.countShake ++;

		trace(finalLevelKit.countShake + " " + (finalLevelKit.countShakeMax - 1));

		if(finalLevelKit.countShake == (finalLevelKit.countShakeMax - 1))
		{
			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath0")[0].removeEventListener("webkitAnimationIteration", endDeathScene_bossRemove1, false);
			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath0")[0].removeEventListener("animationiteration", endDeathScene_bossRemove1, false);

			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2 .bossCont").removeClass("tween-finalLevelEndBossDeath0");

			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2").addClass("tween-finalLevelEndBossDeath1");

			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath1")[0].addEventListener("webkitAnimationEnd", endDeathScene_portalClose, false);
			$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath1")[0].addEventListener("animationend", endDeathScene_portalClose, false);
		}
	}
}

function endDeathScene_portalClose(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath1")[0].removeEventListener("webkitAnimationEnd", endDeathScene_portalClose, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-finalLevelEndBossDeath1")[0].removeEventListener("animationend", endDeathScene_portalClose, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2LeavePortal").removeClass("bossLeavePortal_show").addClass("bossLeavePortal_hide");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].addEventListener("webkitTransitionEnd", endDeathScene_portalCloseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].addEventListener("transitionend", endDeathScene_portalCloseEvent, false);
}

function endDeathScene_portalCloseEvent(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].removeEventListener("webkitTransitionEnd", endDeathScene_portalCloseEvent, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .tween-bossLeavePortal")[0].removeEventListener("transitionend", endDeathScene_portalCloseEvent, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2").remove();
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bossPart2LeavePortal").remove();

	/*
	$("#display_finalLevel #finalLevel_wrapper")[0].addEventListener("webkitTransitionEnd", endDeathScene_sceneFocusEnd, false);
	$("#display_finalLevel #finalLevel_wrapper")[0].addEventListener("transitionend", endDeathScene_sceneFocusEnd, false);

	$("#display_finalLevel #finalLevel_wrapper").addClass("finalLevelEndWrapperFocus");
	*/

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].addEventListener("webkitTransitionEnd", endDeathScene_sceneFocusEnd, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].addEventListener("transitionend", endDeathScene_sceneFocusEnd, false);

	// $("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner").addClass("finalLevelEndWrapperFocus");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner").removeClass("finalLevelPart2Inner_show").addClass("finalLevelPart2Inner_end");
}

function endDeathScene_sceneFocusEnd(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].removeEventListener("webkitTransitionEnd", endDeathScene_sceneFocusEnd, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevel_part2_inner")[0].removeEventListener("transitionend", endDeathScene_sceneFocusEnd, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_sprite")[0].addEventListener("webkitTransitionEnd", endDeathScene_birdWalk, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_sprite")[0].addEventListener("transitionend", endDeathScene_birdWalk, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_sprite").removeClass("finalLevelEndBirdFade_hide").addClass("finalLevelEndBirdFade_show");
}

function endDeathScene_birdWalk(event)
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_sprite")[0].removeEventListener("webkitTransitionEnd", endDeathScene_birdWalk, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_sprite")[0].removeEventListener("transitionend", endDeathScene_birdWalk, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_L .finalLevelEnd_bird_cont").removeClass("finalLevelEndBirdCont_hideL").addClass("finalLevelEndBirdCont_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird_R .finalLevelEnd_bird_cont").removeClass("finalLevelEndBirdCont_hideR").addClass("finalLevelEndBirdCont_show");

	delay = setTimeout(endDeathScene_birdHappy, 0.4 * 1000);
}

function endDeathScene_birdHappy()
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_bird").addClass("tween-finalLevelEndBird");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_player .map-goat-head").addClass("mapPlayer_head_happy");


	delay = setTimeout(endDeathScene_endTitleInit, 2 * 1000);
}

function endDeathScene_endTitleInit()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText2")[0].addEventListener("webkitTransitionEnd", endDeathScene_endTitleColor, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText2")[0].addEventListener("transitionend", endDeathScene_endTitleColor, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName0")[0].addEventListener("webkitTransitionEnd", endDeathScene_endTitleColor, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName0")[0].addEventListener("transitionend", endDeathScene_endTitleColor, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName1")[0].addEventListener("webkitTransitionEnd", endDeathScene_endTitleColor, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName1")[0].addEventListener("transitionend", endDeathScene_endTitleColor, false);



	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .tween-finalLevelEndInfoBox")[0].addEventListener("webkitTransitionEnd", endDeathScene_endTitle0, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .tween-finalLevelEndInfoBox")[0].addEventListener("transitionend", endDeathScene_endTitle0, false);



	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEnd_infoBox").removeClass("finalLevelEndInfoBox_hide").addClass("finalLevelEndInfoBox_show");
}

function endDeathScene_endTitleColor(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText2")[0].removeEventListener("webkitTransitionEnd", endDeathScene_endTitleColor, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText2")[0].removeEventListener("transitionend", endDeathScene_endTitleColor, false);

	$(event.target).removeClass("finalLevelEndInfoBox_white");
}

function endDeathScene_endTitle0(event)
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .tween-finalLevelEndInfoBox")[0].removeEventListener("webkitTransitionEnd", endDeathScene_endTitle0, false);
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .tween-finalLevelEndInfoBox")[0].removeEventListener("transitionend", endDeathScene_endTitle0, false);

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText0").removeClass("finalLevelEndInfoBox_white");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText1").removeClass("finalLevelEndInfoBox_white");

	endDeathScene_endTitle1();
}

function endDeathScene_endTitle1()
{
	var delay;

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxText2").removeClass("finalLevelEndInfoBox_hide").addClass("finalLevelEndInfoBox_show");

	delay = setTimeout(endDeathScene_endTitle2, 0.5 * 1000);
}


function endDeathScene_endTitle2()
{
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName0").removeClass("finalLevelEndInfoBox_hide").addClass("finalLevelEndInfoBox_show");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part3 .finalLevelEndInfoBoxName1").removeClass("finalLevelEndInfoBox_hide").addClass("finalLevelEndInfoBox_show");

	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_blossom .snow").addClass("tween-snow");
	$("#display_finalLevel #finalLevel_wrapper .finalLevel_part2 .finalLevelEnd_blossom").removeClass("finalLevelEndBlossom_hide").addClass("finalLevelEndBlossom_show");
}