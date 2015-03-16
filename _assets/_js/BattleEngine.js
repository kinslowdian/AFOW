
var battleEngine;

var player1;
var player2;


var BattleEngine = function()
{

	this.gameStats = {};

	this.gameStats.win 		= 0;
	this.gameStats.lose		= 0;
	this.gameStats.draw		= 0;
	this.gameStats.play		= 0;

	this.difficulty = {};

	this.difficulty.easy 		= 0;
	this.difficulty.medium 	= 0;
	this.difficulty.hard		= 0;
	this.difficulty.super		= 0;

	this.playerStore 				= {};

	this.firstZombie = true;
};

BattleEngine.prototype.setDifficulty = function(diff)
{
	this.difficulty.easy 		= diff.e;
	this.difficulty.medium 	= diff.m;
	this.difficulty.hard		= diff.h;
	this.difficulty.super		= diff.s;
};

BattleEngine.prototype.update_stats = function(incrementType)
{
	switch(incrementType)
	{
		case "WIN"	: { this.gameStats.win++; 	break;}
		case "LOSE"	: {	this.gameStats.lose++; break;}
		case "DRAW"	: {	this.gameStats.draw++;	break;}
		case "PLAY"	: {	this.gameStats.play++;	break;}
	}
};

// playerObject.sword = battleEngine.levelSort(player_ob.sword);

BattleEngine.prototype.levelSort = function(player_ob)
{
	var sword = {};

	// EASY
	if(player_ob.rating >= this.difficulty.easy && player_ob.rating < this.difficulty.medium)
	{
		sword.skill 		= "apprentice";
		sword.skillId		= 0;
		sword.fullStrike 	= 51;
		sword.magic 		= 5;
	}

	// MEDIUM
	else if(player_ob.rating >= this.difficulty.medium && player_ob.rating < this.difficulty.hard)
	{
		sword.skill 		= "knight";
		sword.skillId		= 1;
		sword.fullStrike 	= 71;
		sword.magic 		= 40;
	}

	// HARD
	else if(player_ob.rating >= this.difficulty.hard && player_ob.rating < this.difficulty.super)
	{
		sword.skill 		= "master";
		sword.skillId		= 2;
		sword.fullStrike 	= 91;
		sword.magic 		= 60;
	}

	// SUPER
	else if(player_ob.rating >= this.difficulty.super)
	{
		sword.skill 		= "lord";
		sword.skillId		= 3;
		sword.fullStrike 	= 101;
		sword.magic 		= 80;
	}

	return sword;

};

BattleEngine.prototype.levelRating = function(pw, pl, _gameResult)
{
	var updateNeeded = false;
	var updateValue = 0;

	this.playerStore = {};
	this.playerStore = pw;

	if(pw.rating > pl.rating)
	{
		updateNeeded = false;
	}

	else if(pw.rating == pl.rating)
	{
		updateNeeded = true;
		updateValue = pw.rating += 1;
	}

	else if(pw.rating < pl.rating)
	{
		updateNeeded = true;

		if(_gameResult === "LOSE")
		{
			updateValue = pw.rating += pl.rating;
		}

		if(_gameResult === "WIN")
		{
			updateValue = pw.rating += Math.round(pl.rating * 0.25); // * 0.5
		}
	}

	trace("updateNeeded == " + updateNeeded);

	if(updateNeeded)
	{
		this.playerStore.rating = updateValue;
	}
};

BattleEngine.prototype.levelDrop = function(p)
{
	var updateValue;

	this.playerStore = {};
	this.playerStore = p;

	updateValue = Math.round(Math.abs(p.rating - (p.rating * 0.4)));

	this.playerStore.rating = updateValue;
}

BattleEngine.prototype.attack = function(p1, p2)
{
	var resultString = "";

	var attack_magic = 0;

	this.strike_p1 = 0;
	this.strike_p2 = 0;

	trace(p1);

	trace(p2);

	this.gameStats.play++;

	if(p1.sword.skill === p2.sword.skill)
	{
		if(p1.rating >= p2.rating)
		{
			// IF p1 LEVEL GREATER THAN 20 THEY GET FULL MAGIC
			if((p1.rating - p2.rating) >= 20)
			{
				attack_magic = p1.sword.magic;
			}

			// IF p1 LEVEL GREATER THAN 10 THEY GET HALF MAGIC
			else if((p1.rating - p2.rating) >= 10)
			{
				attack_magic = Math.floor(p1.sword.magic * 0.5);
			}

			// FOR LESS EXPERIENCE AT THAT LEVEL

			else
			{
				attack_magic = Math.floor(p1.sword.magic * 0.25);
			}
		}

		else
		{
			attack_magic = Math.floor(p1.sword.magic * 0.25);
		}
	}

	else
	{
		attack_magic = p1.sword.magic;
	}

	this.strike_p1 = Math.floor(Math.random() * (p1.sword.fullStrike - attack_magic) + attack_magic);
	this.strike_p2 = Math.floor(Math.random() * (p2.sword.fullStrike - p2.sword.magic) + p2.sword.magic);

	trace(this.strike_p1);
	trace(this.strike_p2);

	// DRAW
	if(this.strike_p1 === this.strike_p2)
	{
		battle_resultString = "DRAW";
	}

	// WIN
	else if(this.strike_p1 > this.strike_p2)
	{
		battle_resultString = "WIN";
	}

	// LOSE
	else if(this.strike_p1 < this.strike_p2)
	{
		battle_resultString = "LOSE";
	}

	else
	{
		// ERROR ?
	}

	this.update_stats(battle_resultString);

	return battle_resultString;
};



function _howToSetUpinit(event)
{
	trace(event);

	player1 = {};
	player2 = {};

  player1.rating = 30;
  player2.rating = 40;

  battleEngine = new BattleEngine();
  battleEngine.setDifficulty({e:0, m:40, h:80, s:120});

  run();
}

function battleEngine_setPlayers(p1, p2)
{
	trace("battleEngine_setPlayers();");
	trace(p1);

	player1 = {};
	player2 = {};

	player1 = p1;
	player2 = p2;

  player1.sword = battleEngine.levelSort(player1);
  player2.sword = battleEngine.levelSort(player2);
}

function battleEngine_battleStart()
{
	BATTLE_NAV.game.result = battleEngine.attack(player1, player2);

	// TODO HACK WIN
	// BATTLE_NAV.game.result = "WIN";

	// TODO HACK LOSE
	BATTLE_NAV.game.result = "LOSE";

  battleEngine_battleResults();
}

function battleEngine_battleResults()
{
	if(BATTLE_NAV.game.result === "WIN")
	{
		battleEngine.levelRating(player1, player2, BATTLE_NAV.game.result);

		player1 = battleEngine.playerStore;
	}

	else if(BATTLE_NAV.game.result === "DRAW")
	{

	}

	else if(BATTLE_NAV.game.result === "LOSE")
	{
		battleEngine.levelDrop(player1);
		player1 = battleEngine.playerStore;

		battleEngine.levelRating(player2, player1, BATTLE_NAV.game.result);
		player2 = battleEngine.playerStore;
	}
}