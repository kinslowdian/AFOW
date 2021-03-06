
/* --- TOUCH */

var touchSupported;

/* --- JSON */

var Logic;

var json_local_root = "_assets/_data/";

/* --- HTML */

var Graphics;

var ext_html_path;

var event_htmlLoaded = document.createEvent("Event");

event_htmlLoaded.initEvent("EVENT_HTML_LOADED", true, true);


// --------------------------------------------- TOUCH

function checkDevice()
{
	touchSupported = ('ontouchstart' in document.documentElement) || (window.DocumentTouch && document instanceof DocumentTouch || navigator.msMaxTouchPoints || debug.touch ? true : false);

	if(touchSupported)
	{
		$(".foggyEdge").css("opacity", "0.6");
	}
}

// --------------------------------------------- TOUCH


// --------------------------------------------- JSON

function gameData_get(callBack)
{
	Logic = {};

	Logic.dat_FILE = "setup.json";
	Logic.dat_ROM;
	Logic.dat_COMPLETE = gameData_get_loaded;
	Logic.dat_CALL_BACK = callBack;

	get_JSON(Logic);
}

function get_JSON(obj)
{
	var json_request = new XMLHttpRequest();
	var json_method = "GET"; //other option is POST
	var json_url = json_local_root + obj.dat_FILE; //file
	var json_async = true;

	json_request.open(json_method, json_url, json_async);

	json_request.onload = function()
	{
		obj.dat_ROM = JSON.parse(this.responseText);

		obj.dat_COMPLETE(obj);
	};

	json_request.send();
}

function gameData_get_loaded(obj)
{
	if(!ext_html_path)
	{
		ext_html_path = Logic.dat_ROM["_HTML-EXT"]["file_path"]["url"];
	}

	obj.dat_CALL_BACK();

	trace(obj);
}

// --------------------------------------------- JSON


// --------------------------------------------- HTML

var load_HTML = function(_html, target)
{
	var ext_html = ext_html_path + _html;
	var exit_frame;

	$(target).load(ext_html, function(html)
	{
		// adding parameters to the event
		event_htmlLoaded.fileLoaded = _html;
		event_htmlLoaded.data = html;
		event_htmlLoaded.dataContainer = target;

		$(target).html("");

		$(target).html(html);

		// firing the event
		exit_frame = setTimeout(function(){ document.dispatchEvent(event_htmlLoaded); }, 20);
	});
}

function html_lib_init(callBack)
{
	Graphics = {};
	Graphics.html = {};
	Graphics.gfx_CALL_BACK = callBack;

	$(document).get(0).addEventListener("EVENT_HTML_LOADED", html_lib_loaded, false);

	Graphics.html.file = Logic.dat_ROM["_HTML-EXT"]["file_lib"]["file"];
	Graphics.html.save = new load_HTML(Graphics.html.file, $("#memory"));
}

function html_lib_loaded(event)
{
	$(document).get(0).removeEventListener("EVENT_HTML_LOADED", html_lib_loaded, false);

	html_lib_store();
}

function html_lib_store()
{
	Graphics.html.data = $("#memory").html();

	Graphics.gfx_CALL_BACK();

	html_lib_empty();
}

function html_lib_use(html_class, extend_ids, extend_classes)
{
	var html;

	if(extend_ids)
	{
		$("#memory ." + html_class + " *").each(function(i, div)
		{
			if($(div).attr("data-static-id"))
			{
				var set_id = $(div).attr("data-static-id");

				$(div).attr("id", set_id);
				$(div).removeAttr("data-static-id");
			}
		});
	}

	if(extend_classes)
	{
		$("#memory ." + html_class + " *").each(function(i, div)
		{
			if($(div).attr("data-static-class"))
			{
				var set_class = $(div).attr("data-static-class");

				$(div).attr("class", set_class);
				$(div).removeAttr("data-static-class");
			}
		});
	}


	html = $("#memory ." + html_class).html();

	return html;
}

function html_lib_empty()
{
	$("#memory").html("");
}

function html_lib_reuse()
{
	$("#memory").html(Graphics.html.data);
}

// --------------------------------------------- HTML