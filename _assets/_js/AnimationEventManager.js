
var timerListMain;

// FIXES EVENTLISTENER CONFLICTS
var EventSignal = function(classArray, classTrigger)
{
	var eventSignalFound = false;

	for(var i in classArray)
	{
		if(classArray[i] === classTrigger && !eventSignalFound)
		{
			eventSignalFound = true;
		}
	}

	return eventSignalFound;
}

var AnimationTimersMain = function()
{
	this.timerList = new Array();
};

AnimationTimersMain.prototype.listFlush = function()
{
	for(var i in this.timerList)
	{
		delete this.timerList[i];
	}

	this.timerList = [];
};

AnimationTimersMain.prototype.listTimer = function(ob)
{
	this.timerList.push(ob);

	for(var i = 0; i < this.timerList.length; i++)
	{
		if(ob === this.timerList[i])
		{
			ob.ref = "AnimationTimer" + i;
		}
	}
};

AnimationTimersMain.prototype.cancelAll = function()
{
	for(var i in this.timerList)
	{
		this.timerList[i].cancel();
	}
};

var AnimationTimer = function()
{
		this._AT;
	};

	AnimationTimer.prototype.time = function(s, f, p)
	{
 	p == undefined ? this._AT = setTimeout(f, s * 1000) : this._AT = setTimeout(f, s * 1000, p);
	};

	AnimationTimer.prototype.cancel = function()
	{
 	clearTimeout(this._AT);
};

function timerList_init()
{
	timerListMain = new AnimationTimersMain();
}

function timerList_add(ob)
{
	if(timerListMain != null || timerListMain != undefined)
	{
		if(ob != null || ob != undefined)
		{
			timerListMain.listTimer(ob);
		}
	}
}

function timerList_stopAll()
{
	timerListMain.cancelAll();
}

function timerList_destroy()
{
	timerListMain.listFlush();

	timerListMain = null;
}


function css_tween_new(arrayList, _event_animation, _event_target, _event_function)
{
	var css_tween = {};

	css_tween._event_target = _event_target;
	css_tween._event_function = _event_function;

	if(_event_animation)
	{
		css_tween._event_webkit = "webkitAnimationEnd";
		css_tween._event_default = "animationend";
	}

	else
	{
		css_tween._event_webkit = "webkitTransitionEnd";
		css_tween._event_default = "transitionend";
	}

	arrayList.push(css_tween);
}

function css_tween_clear(arrayList)
{
	for(var i in arrayList)
	{
		var _event_target		= arrayList[i]._event_target;
		var _event_webkit 	= arrayList[i]._event_webkit;
		var _event_default 	= arrayList[i]._event_default;
		var _event_function = window[arrayList[i]._event_function];

		$(_event_target)[0].removeEventListener(_event_webkit, _event_function, false);
		$(_event_target)[0].removeEventListener(_event_default, _event_function, false);
	}
}