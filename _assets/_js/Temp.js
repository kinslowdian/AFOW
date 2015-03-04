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



// BOSS TAUNT

function bossTaunt_init()
{
	$(".bossFailTaunt_wrapper .bossFailTaunt_content").removeClass("bossFailtTauntContent_hide").addClass("bossFailtTauntContent_show");

	$(".bossFailTaunt_wrapper .bossFailTaunt_boss").addClass("tween-bossFailTauntBoss");

}

function bossTaunt_wait()
{
	var delay;

	$(".bossFailTaunt_wrapper .bossFailTaunt_content").addClass("tween-bossFailtTauntContent");

	delay = setTimeout(bossTaunt_drop, 4 * 1000);
}

function bossTaunt_drop()
{
	$(".bossFailTaunt_wrapper .tween-bossFailtTauntContent")[0].addEventListener("webkitTransitionEnd", bossTaunt_purge, false);
	$(".bossFailTaunt_wrapper .tween-bossFailtTauntContent")[0].addEventListener("transitionend", bossTaunt_purge, false);

	$(".bossFailTaunt_wrapper .bossFailTaunt_content").removeClass("bossFailtTauntContent_show").addClass("bossFailtTauntContent_hide");
}

function bossTaunt_purge(event)
{
	$(".bossFailTaunt_wrapper .tween-bossFailtTauntContent")[0].removeEventListener("webkitTransitionEnd", bossTaunt_purge, false);
	$(".bossFailTaunt_wrapper .tween-bossFailtTauntContent")[0].removeEventListener("transitionend", bossTaunt_purge, false);

	$("#display_finalLevel").html("");

	// TODO FAULTY
	move_plugIn();
}



