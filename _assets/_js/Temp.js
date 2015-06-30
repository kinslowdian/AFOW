trace("Temp.js being used -- remove from final build / release");

var aboutSection;

function about_setup()
{
	aboutSection = {};

	html_lib_reuse();
	aboutSection._html = html_lib_use("_about", false, true);
	html_lib_empty();

	aboutSection._replay = false;
}

function about_build()
{
	// TODO BUILD PAGE FROM HTML

	$("#options_wrapper .options-about").removeClass("about-hide");
	$("#options_wrapper .options-about").html(aboutSection._html);

	$("#options_wrapper .options-about .display_about").removeClass("display_about_hide");
}

function about_run()
{
	aboutSection._tweens = new Array();

	// TODO CALL ON DROP
	about_init();
}

function about_clear()
{
	clearTimeout(aboutSection._delay);
	css_tween_clear(aboutSection._tweens);
}

function about_init()
{
	$(".display_about .about_mainA")[0].addEventListener("webkitTransitionEnd", about_init_event, false);
	$(".display_about .about_mainA")[0].addEventListener("transitionend", about_init_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainA", "about_init_event");

	$(".display_about .about_mainA").removeClass("about_hide");
}

function about_init_event(event)
{
	$(".display_about .about_mainA")[0].removeEventListener("webkitTransitionEnd", about_init_event, false);
	$(".display_about .about_mainA")[0].removeEventListener("transitionend", about_init_event, false);

	about_slideA_init();
}

function about_slideA_init()
{
	$(".display_about .about_mainA .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideA_event, false);
	$(".display_about .about_mainA .about_goat")[0].addEventListener("animationend", about_slideA_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainA .about_goat", "about_slideA_event");

	aboutSection._delay = setTimeout(about_slideA_run, 1 * 1000);
}

function about_slideA_run()
{
	$(".display_about .about_mainA .about_goat").addClass("tween-aboutA");
	$(".display_about .about_mainA .about_goat .about_goatSprite").addClass("tween-about_goatSprite");
}

function about_slideA_event(event)
{
	$(".display_about .about_mainA .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideA_event, false);
	$(".display_about .about_mainA .about_goat")[0].removeEventListener("animationend", about_slideA_event, false);

	$(".display_about .about_mainA")[0].addEventListener("webkitTransitionEnd", about_slideB_show, false);
	$(".display_about .about_mainA")[0].addEventListener("transitionend", about_slideB_show, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainA", "about_slideB_show");

	$(".display_about .about_mainA").addClass("about_hide");
}

function about_slideB_show(event)
{
	$(".display_about .about_mainA")[0].removeEventListener("webkitTransitionEnd", about_slideB_show, false);
	$(".display_about .about_mainA")[0].removeEventListener("transitionend", about_slideB_show, false);


	$(".display_about .about_mainA .about_goat").removeClass("tween-aboutA");
	$(".display_about .about_mainA .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");


	$(".display_about .about_mainB")[0].addEventListener("webkitTransitionEnd", about_slideB_show_event, false);
	$(".display_about .about_mainB")[0].addEventListener("transitionend", about_slideB_show_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainB", "about_slideB_show_event");


	$(".display_about .about_mainB").removeClass("about_hide");
}

function about_slideB_show_event(event)
{
	$(".display_about .about_mainB")[0].removeEventListener("webkitTransitionEnd", about_slideB_show_event, false);
	$(".display_about .about_mainB")[0].removeEventListener("transitionend", about_slideB_show_event, false);

	about_slideB_run();
}

function about_slideB_run()
{
	$(".display_about .about_mainB .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideB_event, false);
	$(".display_about .about_mainB .about_goat")[0].addEventListener("animationend", about_slideB_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainB .about_goat", "about_slideB_event");

	$(".display_about .about_mainB .about_goat").addClass("tween-aboutB");
	$(".display_about .about_mainB .about_goat .about_goatSprite").addClass("tween-about_goatSprite");

	$(".display_about .about_mainB .about_warning_N").addClass("tween-aboutBN");
	$(".display_about .about_mainB .about_warning_Y").addClass("tween-aboutBY");
}

function about_slideB_event(event)
{
	$(".display_about .about_mainB .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideB_event, false);
	$(".display_about .about_mainB .about_goat")[0].removeEventListener("animationend", about_slideB_event, false);


	$(".display_about .about_mainB")[0].addEventListener("webkitTransitionEnd", about_slideC_show, false);
	$(".display_about .about_mainB")[0].addEventListener("transitionend", about_slideC_show, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainB", "about_slideC_show");

	aboutSection._delay = setTimeout(about_slideB_delayHide, 0.6 * 1000);

}

function about_slideB_delayHide()
{
	// TODO
	$(".display_about .about_mainB").addClass("about_hide");
}

function about_slideC_show(event)
{
	$(".display_about .about_mainB")[0].removeEventListener("webkitTransitionEnd", about_slideC_show, false);
	$(".display_about .about_mainB")[0].removeEventListener("transitionend", about_slideC_show, false);

 	$(".display_about .about_mainB .about_goat").removeClass("tween-aboutB");
	$(".display_about .about_mainB .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");

	$(".display_about .about_mainB .about_warning_N").removeClass("tween-aboutBN");
	$(".display_about .about_mainB .about_warning_Y").removeClass("tween-aboutBY");

	$(".display_about .about_mainC")[0].addEventListener("webkitTransitionEnd", about_slideC_show_event, false);
	$(".display_about .about_mainC")[0].addEventListener("transitionend", about_slideC_show_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainC", "about_slideC_show_event");

	$(".display_about .about_mainC").removeClass("about_hide");
}

function about_slideC_show_event(event)
{
	$(".display_about .about_mainC")[0].removeEventListener("webkitTransitionEnd", about_slideC_show_event, false);
	$(".display_about .about_mainC")[0].removeEventListener("transitionend", about_slideC_show_event, false);

	about_slideC_run0();
}

function about_slideC_run0()
{
	$(".display_about .about_mainC .about_goat")[0].addEventListener("webkitAnimationEnd", about_slideC_run0_event, false);
	$(".display_about .about_mainC .about_goat")[0].addEventListener("animationend", about_slideC_run0_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainC .about_goat", "about_slideC_run0_event");

	$(".display_about .about_mainC .about_goat").addClass("tween-aboutC-goat");
	$(".display_about .about_mainC .about_goat .about_goatSprite").addClass("tween-about_goatSprite");
}

function about_slideC_run0_event(event)
{
	$(".display_about .about_mainC .about_goat")[0].removeEventListener("webkitAnimationEnd", about_slideC_run0_event, false);
	$(".display_about .about_mainC .about_goat")[0].removeEventListener("animationend", about_slideC_run0_event, false);

	$(".display_about .about_mainC .about_goat .about_goatSprite").removeClass("tween-about_goatSprite");

	about_slideC_run1();
}

function about_slideC_run1()
{
	$(".display_about .about_mainC .about_boss_move")[0].addEventListener("webkitAnimationEnd", about_slideC_run1_event, false);
	$(".display_about .about_mainC .about_boss_move")[0].addEventListener("animationend", about_slideC_run1_event, false);

	css_tween_new(aboutSection._tweens, true, ".display_about .about_mainC .about_boss_move", "about_slideC_run1_event");

	$(".display_about .about_mainC .about_boss_move").addClass("tween-aboutC-boss");
}

function about_slideC_run1_event(event)
{
	$(".display_about .about_mainC .about_boss_move")[0].removeEventListener("webkitAnimationEnd", about_slideC_run1_event, false);
	$(".display_about .about_mainC .about_boss_move")[0].removeEventListener("animationend", about_slideC_run1_event, false);

	aboutSection._delay = setTimeout(about_slideC_run2, 0.4 * 1000);
}

function about_slideC_run2()
{
	$(".display_about .about_mainC .about_bossSprite").addClass("tween-about_bossSprite");

	if(aboutSection._replay)
	{
		aboutSection._delay = setTimeout(about_replay, 4 * 1000);
	}

	else
	{
		aboutSection._delay = setTimeout(about_return, 4 * 1000);
	}
}

function about_replay()
{
	$(".display_about .about_mainC")[0].addEventListener("webkitTransitionEnd", about_replay_event, false);
	$(".display_about .about_mainC")[0].addEventListener("transitionend", about_replay_event, false);

	css_tween_new(aboutSection._tweens, false, ".display_about .about_mainC", "about_replay_event");

	$(".display_about .about_mainC").addClass("about_hide");


}

function about_replay_event(event)
{
	$(".display_about .about_mainC")[0].removeEventListener("webkitTransitionEnd", about_replay_event, false);
	$(".display_about .about_mainC")[0].removeEventListener("transitionend", about_replay_event, false);

	// animationEventKill(".display_about .about_mainC");

	$(".display_about .about_mainC .about_goat").removeClass("tween-aboutC-goat");
	$(".display_about .about_mainC .about_boss_move").removeClass("tween-aboutC-boss");
	$(".display_about .about_mainC .about_bossSprite").removeClass("tween-about_bossSprite");

	about_run();
}

function about_return()
{
	$("#options_wrapper .tween-display_about")[0].addEventListener("webkitTransitionEnd", about_return_event, false);

	$("#options_wrapper .tween-display_about")[0].addEventListener("transitionend", about_return_event, false);

	$("#options_wrapper .display_about"). addClass("display_about_hide");
}

function about_return_event(event)
{
	$("#options_wrapper .tween-display_about")[0].removeEventListener("webkitTransitionEnd", about_return_event, false);

	$("#options_wrapper .tween-display_about")[0].removeEventListener("transitionend", about_return_event, false);

	about_clear();
	aboutSection._tweens = new Array();

	$("#options_wrapper .options-about").addClass("about-hide");
	$("#options_wrapper .options-about").html("");
}