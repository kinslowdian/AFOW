
var errorMessage;

function setupErrorMessages()
{
	error_init();

	device_rotateCheck();

	device_blurFocusCheck();
}

//------ EVENT SETUP

function device_rotateCheck()
{
	$("body")[0].addEventListener("orientationchange", device_rotateEvent, false);
}

function device_rotateEvent(event)
{
	if(event != null || event != undefined)
	{
		// TOUCH OFFSET FIX
		if(control != null)
		{
			control.touch_setOffset();
		}
	}

	if(window.innerHeight < 460)
	{
		if(!errorMessage.displayed)
		{
			error_use("ROTATE");
		}
	}

	else
	{
		if(errorMessage.displayed)
		{
			error_remove();
		}
	}
}

function device_blurFocusCheck()
{
	$(window)[0].addEventListener("blur", device_blurFocusEvent, false);
}

function device_blurFocusEvent(event)
{
	if(event.type === "blur")
	{
		$(window)[0].removeEventListener("blur", device_blurFocusEvent, false);
		$(window)[0].addEventListener("focus", device_blurFocusEvent, false);

		error_use("BLUR_FOCUS");
	}

	if(event.type === "focus")
	{
		$(window)[0].removeEventListener("focus", device_blurFocusEvent, false);
		$(window)[0].addEventListener("blur", device_blurFocusEvent, false);

		error_remove();
	}
}

//------ EVENT SETUP




//------ MESSAGE DISPLAY

function error_init()
{
	errorMessage = {};

	errorMessage.text = {};
	errorMessage.text.fault_rotate 		= Logic.dat_ROM["_ERRORS"]["touch"]["txt"];
	errorMessage.text.fault_blurFocus = Logic.dat_ROM["_ERRORS"]["keyboard"]["txt"];
	errorMessage.text.fault						= "";

	errorMessage.displayed = false;
}

function error_use(fault)
{
	errorMessage.text.fault = "";

	switch(fault)
	{
		case "ROTATE":
		{
			errorMessage.text.fault = errorMessage.text.fault_rotate

			break;
		}

		case "BLUR_FOCUS":
		{
			errorMessage.text.fault = errorMessage.text.fault_blurFocus

			break;
		}
	}

	$("#displayErrorWrapper .finalLevel_bossShadow").addClass("tween-finalLevel_bossShadow");
	$("#displayErrorWrapper .displayError_trees").addClass("tween-displayErrorTrees");
	$("#displayErrorWrapper .displayError_fill").addClass("delay-displayErrorFill");

	$("#displayErrorWrapper .message p").html(errorMessage.text.fault.toUpperCase());

	error_request();
}

function error_request()
{
	errorMessage.displayed = true;

	$("#displayErrorWrapper .tween-displayErrorContent")[0].addEventListener("webkitTransitionEnd", error_requestEvent, false);
	$("#displayErrorWrapper .tween-displayErrorContent")[0].addEventListener("transitionend", error_requestEvent, false);

	$("#displayErrorWrapper .displayError_content").removeClass("displayErrorContent_hide").addClass("displayErrorContent_show");
}

function error_requestEvent(event)
{
	$("#displayErrorWrapper .tween-displayErrorContent")[0].removeEventListener("webkitTransitionEnd", error_requestEvent, false);
	$("#displayErrorWrapper .tween-displayErrorContent")[0].removeEventListener("transitionend", error_requestEvent, false);


	$("#displayErrorWrapper .displayError_fill")[0].addEventListener("webkitTransitionEnd", error_removeFillDelay, false);
	$("#displayErrorWrapper .displayError_fill")[0].addEventListener("transitionend", error_removeFillDelay, false);

	$("#displayErrorWrapper .displayError_fill").removeClass("displayErrorFill_show").addClass("displayErrorFill_hide");
}

function error_removeFillDelay(event)
{
	$("#displayErrorWrapper .displayError_fill")[0].removeEventListener("webkitTransitionEnd", error_removeFillDelay, false);
	$("#displayErrorWrapper .displayError_fill")[0].removeEventListener("transitionend", error_removeFillDelay, false);

	$("#displayErrorWrapper .displayError_fill").removeClass("delay-displayErrorFill");
}

function error_remove()
{
	$("#displayErrorWrapper .displayError_fill").removeClass("displayErrorFill_hide").addClass("displayErrorFill_show");

	$("#displayErrorWrapper .displayError_content")[0].addEventListener("webkitTransitionEnd", error_purge, false);
	$("#displayErrorWrapper .displayError_content")[0].addEventListener("transitionend", error_purge, false);

	$("#displayErrorWrapper .displayError_content").removeClass("displayErrorContent_show").addClass("displayErrorContent_hide");
}

function error_purge(event)
{
	$("#displayErrorWrapper .displayError_content")[0].removeEventListener("webkitTransitionEnd", error_purge, false);
	$("#displayErrorWrapper .displayError_content")[0].removeEventListener("transitionend", error_purge, false);

	$("#displayErrorWrapper .finalLevel_bossShadow").removeClass("tween-finalLevel_bossShadow");
	$("#displayErrorWrapper .displayError_trees").removeClass("tween-displayErrorTrees");

	$("#displayErrorWrapper .message p").html("");

	errorMessage.displayed = false;
}

//------ MESSAGE DISPLAY