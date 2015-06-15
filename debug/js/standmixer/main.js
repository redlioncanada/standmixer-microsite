"use strict";

var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;

if (isMobile) {
    //inject meta tags
    $("head").append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />").append("<meta content='True' name='HandheldFriendly' />");
}

$(document).ready(function () {
    //start first panel mixer change
    var mixerTimeout = undefined;
    resetMixerInterval();
    function resetMixerInterval() {
        clearTimeout(mixerTimeout);
        mixerTimeout = setInterval(function () {
            changeMixer();
        }, 5000);
    }

    $(".categories").on("click", "li:not(\".selected,.title\")", function () {
        var id = $(this).index();
        resetMixerInterval();
        changeMixer(id);
    });

    function changeMixer(id) {
        if (typeof id === "undefined") {
            id = $(".mixer-panel-1 .categories .selected").index() + 1;
            if (id > $(".mixer-panel-1 .categories li").length - 1) id = 1;
        }

        var target = $(".mixer-panel-1 .categories li").eq(id);

        //change mixer image
        $(".mixer-panel-1 .mixer .selected").fadeOut(500);
        $(".mixer-panel-1 .mixer img").eq(id - 1).fadeIn(400, function () {
            $(this).addClass("selected");
        });

        //change menu selection
        $(".mixer-panel-1 .categories .selected").removeClass("selected");
        $(target).addClass("selected");
    }
    //end first panel mixer change

    $(".menu li").click(function () {
        if ($(this).find("span").hasClass("selected")) return;
        var p = $(this).closest(".mixer-panel");
        var img = $(p).find(".mixer");
        var id = $(this).index();

        //change mixer image
        $(img).find(".selected").fadeOut(500);
        $(img).find("img").eq(id).fadeIn(400, function () {
            $(this).addClass("selected");
        });

        //change copy
        $(p).find(".copy.selected, .infobox.selected").removeClass("selected").fadeOut("fast", function () {
            $(p).find(".copy").eq(id).addClass("selected").fadeIn("fast");
            $(p).find(".infobox").eq(id).addClass("selected").fadeIn("fast");
        });

        //change menu selection
        $(this).closest(".menu").find(".selected").removeClass("selected");
        $(this).find("span").addClass("selected");
    });

    $(".mixer-nav .nav-left").click(function () {
        var p = $(this).closest(".mixer-panel");
        var m = $(p).find(".menu");
        var id = $(m).find(".selected").parent().index();

        if (id - 1 < 0) id = $(m).find("li").length - 1;else id--;
        $(m).find("li").eq(id).click();
    });

    $(".mixer-nav .nav-right").click(function () {
        var p = $(this).closest(".mixer-panel");
        var m = $(p).find(".menu");
        var id = $(m).find(".selected").parent().index();

        if (id + 1 > $(m).find("li").length - 1) id = 0;else id++;
        $(m).find("li").eq(id).click();
    });

    $(".infobox .infomenu li").click(function () {
        var p = $(this).parent().parent();

        var old = $(p).find(".infomenu .selected");
        var oldId = $(old).attr("data-id");
        $(p).find(".content [data-id='" + oldId + "']").fadeOut();
        $(old).removeClass("selected");

        var id = $(this).attr("data-id");
        $(p).find(".content [data-id='" + id + "']").fadeIn();
        $(this).addClass("selected");
    });

    //on load complete, hide overlay
    Pace.on("done", function () {
        $("#loading").fadeOut();
    });

    //on click-to-top click, go to top
    $(".back-to-top").click(function () {
        $("body").animate({ scrollTop: 0 }, "400");
    });

    setTimeout(redraw, 500);
    //on window resize, resize components
    $(window).resize(redraw);
    function redraw() {
        var left = $(window).width() / 2 - $(".mixer-nav").width();
        $(".mixer-nav").css("left", left);
    }
});