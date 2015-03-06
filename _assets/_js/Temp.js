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



// OUTCOME SCREEN


var resultOutcome;


function resultOutcome_init()
{
	resultOutcome = {};

	resultOutcome.html 		= {};
	resultOutcome.header 	= {};

	html_lib_reuse();

	resultOutcome.html.taunt_main = html_lib_use("_resultOutcome", false, true);

	resultOutcome.header.taunt_win = "nice!";
	resultOutcome.header.taunt_lose = "fail!";

	html_lib_empty();

	$("#outcomeScreen").html(resultOutcome.html.taunt_main);

	if(BATTLE_NAV.game.result === "WIN")
	{
		$("#outcomeScreen").addClass("outcome_win");

		$("#outcomeScreen .resultOutcome_header h1").html(resultOutcome.header.taunt_win);

		$("#outcomeScreen .pixels_resultOutcomeScreen").addClass("pixels_resultOutcomeScreenWin");
	}

	if(BATTLE_NAV.game.result === "LOSE")
	{
		$("#outcomeScreen").addClass("outcome_lose");

		$("#outcomeScreen .resultOutcome_header h1").html(resultOutcome.header.taunt_lose);

		$("#outcomeScreen .pixels_resultOutcomeScreen").addClass("pixels_resultOutcomeScreenLose");
	}
}

function resultOutcome_request()
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_requestEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_requestEvent, false);

	$("#outcomeScreen .resultOutcome_content").removeClass("resultOutcomeContent_hide").addClass("resultOutcomeContent_show");
}

function resultOutcome_requestEvent(event)
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_requestEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_requestEvent, false);


	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_revealEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_revealEvent, false);


	$("#outcomeScreen .resultOutcome_boss").addClass("tween-bossFailTauntBoss");

	$("#outcomeScreen .resultOutcome_fill").addClass("bossFailTauntFill_hide");
}

function resultOutcome_revealEvent(event)
{
	var delay;

	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_revealEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_revealEvent, false);

	$("#outcomeScreen .resultOutcome_fill").remove();

	delay = setTimeout(resultOutcome_showOutcome, 1 * 1000);
}

function resultOutcome_showOutcome()
{
	var delay;

	$("#outcomeScreen .resultOutcome_header").removeClass("resultOutcomeHeader_hide").addClass("resultOutcomeHeader_show");

	if(battleEngine.firstZombie)
	{
		$(screen_multiInfoUse.screenRoot + " .multiUseInfo_wrapper").remove();
	}

	else if(!game_levelFinal)
	{
		delete screen_multiInfoUse;

		allBattleOver_battleEnd_return_end(BATTLE_NAV.game.result);
	}

	delay = setTimeout(resultOutcome_hideAll, 3 * 1000);
}

function resultOutcome_hideAll()
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("webkitTransitionEnd", resultOutcome_hideAllEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].addEventListener("transitionend", resultOutcome_hideAllEvent, false);

	$("#outcomeScreen .resultOutcome_content").removeClass("resultOutcomeContent_show").addClass("resultOutcomeContent_hide");
}

function resultOutcome_hideAllEvent(event)
{
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("webkitTransitionEnd", resultOutcome_hideAllEvent, false);
	$("#outcomeScreen .tween-resultOutcomeContent")[0].removeEventListener("transitionend", resultOutcome_hideAllEvent, false);

	// FLUSH
	$("#outcomeScreen").html("");

	if(battleEngine.firstZombie)
	{
		battleEngine.firstZombie = false;

		multiUseInfoScreen_purge();
	}

	else
	{
		optionsTrigger_init(true);

		// TODO
		worldReturn_slideReturn();
	}
}





