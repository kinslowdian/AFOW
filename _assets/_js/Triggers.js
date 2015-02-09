
var gameEventTriggers;

var GameEventTriggers = function()
{
	this.hitList = {};
};

GameEventTriggers.prototype.create = function()
{
	this.hitList.god_id 	= "";
	this.hitList.sound_id = "";
};

// 1 ITEM == gameEventTriggers.hitListFlush(false, "god_id"); ALL == gameEventTriggers.hitListFlush(true);

GameEventTriggers.prototype.hitListFlush = function(all, type_id)
{
	if(all)
	{
		for(var h in this.hitList)
		{
			this.hitList[h] = "";
		}
	}

	else
	{
		this.hitList[type_id] = "";
	}
};

function gameEventTriggers_init()
{
	gameEventTriggers = new GameEventTriggers();
	gameEventTriggers.create();
}