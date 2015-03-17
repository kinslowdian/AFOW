trace("Temp.js being used -- remove from final build / release");


function test_finalBattle_intoBattle()
{
	var delay;

	enemyTarget = {};

	// WRITE BOSS
	enemyTarget.alive = true;
	enemyTarget.enemyType = "crow";
	enemyTarget.id = "boss";
	enemyTarget.name = "final boss";
	enemyTarget.rating = 10;
	enemyTarget.rendered = true;
	enemyTarget.spawn = 1000;

	// PLAYER1 + PLAYER2
	battleEngine_setPlayers(playerTarget, enemyTarget);

	battleNav_init();

	delay = setTimeout(test_finalBattle_init, 1 * 1000);
}

function test_finalBattle_init()
{
	battleNav_show();
}

function test_finalBattle_result()
{
	if(BATTLE_NAV.game.result === "WIN")
	{
		finalLevelSeq_bossDefeat();
	}

	if(BATTLE_NAV.game.result === "LOSE")
	{
		finalLevelSeq_bossWin();
	}
}


// FINAL LEVEL EVENT SCREEN

function finalLevelEvent_init()
{
	var html;

	// html_lib_reuse();

	html = html_lib_use("_finalLevelEvent", false, true);

	// html_lib_empty();

	$("#display_finalLevelEvent").html(html);
}

function finalLevelEvent_showFill()
{
	$("#display_finalLevelEvent .tween-finalLevelEventFill")[0].addEventListener("webkitTransitionEnd", finalLevelEvent_fillEvent, false);
	$("#display_finalLevelEvent .tween-finalLevelEventFill")[0].addEventListener("transitionend", finalLevelEvent_fillEvent, false);

	$("#display_finalLevelEvent .finalLevelEvent_fill").removeClass("finalLevelEventFill_hide").addClass("finalLevelEventFill_show");
}

function finalLevelEvent_fillEvent(event)
{
	$("#display_finalLevelEvent .tween-finalLevelEventFill")[0].removeEventListener("webkitTransitionEnd", finalLevelEvent_fillEvent, false);
	$("#display_finalLevelEvent .tween-finalLevelEventFill")[0].removeEventListener("transitionend", finalLevelEvent_fillEvent, false);

	$("#display_finalLevelEvent .tween-finalLevelEventContent")[0].addEventListener("webkitTransitionEnd", finalLevelEvent_inView, false);
	$("#display_finalLevelEvent .tween-finalLevelEventContent")[0].addEventListener("transitionend", finalLevelEvent_inView, false);

	$("#display_finalLevelEvent .finalLevelEvent_content").removeClass("finalLevelEventContent_hide").addClass("finalLevelEventContent_show");
}

function finalLevelEvent_inView(event)
{
	var delay;

	$("#display_finalLevelEvent .tween-finalLevelEventContent")[0].removeEventListener("webkitTransitionEnd", finalLevelEvent_inView, false);
	$("#display_finalLevelEvent .tween-finalLevelEventContent")[0].removeEventListener("transitionend", finalLevelEvent_inView, false);

	// TODO CLEAN
	// finalLevelAfterPortalFX(null);
	delay = setTimeout(finalLevelSeq_init, 1.6 * 1000, null);
}

function finalLevelEvent_purge()
{
	$("#display_finalLevelEvent").html("");
}






