var battleEngine;

var BattleEngine = {

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
};

BattleEngine.prototype.setDifficulty(diff)
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
		case "WIN"	: { this.gameStats.win++ 	break;}
		case "LOSE"	: {	this.gameStats.lose++ break;}
		case "DRAW"	: {	this.gameStats.draw++	break;}
		case "PLAY"	: {	this.gameStats.play++	break;}
	}
};

// playerObject.sword = battleEngine.levelSort(player_ob.sword);

BattleEngine.prototype.levelSort = function(player_ob)
{
	this.sword = {};

	// EASY
	if(player_ob.rating >= this.difficulty.easy && player_ob.rating < this.difficulty.medium)
	{
		this.sword.skill 		= "apprentice";
		this.sword.skillId		= 0;
		this.sword.fullStrike 	= 51;
		this.sword.magic 		= 5;
	}

	// MEDIUM
	else if(player_ob.rating >= this.difficulty.medium && player_ob.rating < this.difficulty.hard)
	{
		this.sword.skill 		= "knight";
		this.sword.skillId		= 1;
		this.sword.fullStrike 	= 71;
		this.sword.magic 		= 40;
	}

	// HARD
	else if(player_ob.rating >= this.difficulty.hard && player_ob.rating < this.difficulty.super)
	{
		this.sword.skill 		= "master";
		this.sword.skillId		= 2;
		this.sword.fullStrike 	= 91;
		this.sword.magic 		= 60;
	}

	// SUPER
	else
	{
		this.sword.skill 		= "lord";
		this.sword.skillId		= 3;
		this.sword.fullStrike 	= 101;
		this.sword.magic 		= 80;
	}

	return this.sword;

};


