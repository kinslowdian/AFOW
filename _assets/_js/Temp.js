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