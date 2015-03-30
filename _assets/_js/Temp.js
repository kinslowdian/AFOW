trace("Temp.js being used -- remove from final build / release");

var tt_levelShift;
var time_levelShift = 800;

function levelShift_init(run)
{
	if(run)
	{
		levelShift_loop();
	}

	else
	{
		clearTimeout(tt_levelShift);
	}
}

function levelShift_loop()
{
	tt_levelShift = setTimeout(levelShift_loopEnd, time_levelShift);
}

function levelShift_loopEnd()
{
	display_centerLevel();

	levelShift_loop();
}



