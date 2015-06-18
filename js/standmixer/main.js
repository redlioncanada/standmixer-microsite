"use strict";

var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;

if (isMobile) {
    //inject meta tags
    $("head").append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />").append("<meta content='True' name='HandheldFriendly' />");
}

$(document).ready(function () {
    //change the mixer on the first panel at a set interval
    var mixerTimeout = undefined;
    resetMixerInterval();
    function resetMixerInterval() {
        clearTimeout(mixerTimeout);
        mixerTimeout = setInterval(function () {
            changeMixer();
        }, 5000);
    }
    function changeMixer(id) {
        if (typeof id === "undefined") {
            id = $(".mixer-panel-1 .mixer .selected").index() + 1;
            if (id > $(".mixer-panel-1 .mixer img").length - 1) id = 0;
        }
        //change mixer image
        $(".mixer-panel-1 .mixer img").eq(id).fadeIn(400, function () {
            var self = this;
            $(".mixer-panel-1 .mixer .selected").fadeOut(500, function () {
                $(this).removeClass("selected");
                $(self).addClass("selected");
            });
        });
    }
    //end first panel mixer change

    //on attachment button click, change the current attachment
    $(".menu li").click(function () {
        if ($(this).find("span").hasClass("selected")) return;
        var p = $(this).closest(".mixer-panel");
        var img = $(p).find(".mixer");
        var id = $(this).index();

        //change mixer image
        $(img).find("img").eq(id).fadeIn(300, function () {
            var self = this;
            $(img).find(".selected").fadeOut(400, function () {
                $(this).removeClass("selected");
                $(self).addClass("selected");
            });
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
    //end attachment button click

    //on 'choose attachment' arrow click, change the current attachment
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
    //end 'choose attachment' arrow click

    //on infobox tab click, change the window
    $(".infobox .infomenu li").click(function () {
        var p = $(this).closest(".mixer-panel");

        var old = $(p).find(".infomenu .selected");
        var oldId = $(old).attr("data-id");
        $(p).find(".content [data-id='" + oldId + "']").fadeOut();
        $(old).removeClass("selected");

        var id = $(this).attr("data-id");
        $(p).find(".infobox .content [data-id='" + id + "']").fadeIn();
        $(p).find(".infobox .infomenu li[data-id='" + id + "']").addClass("selected");
    });
    //end infobox tab click

    //on gallery image click, expand it and show close button
    $(".infobox .gallery li").click(function () {
        var p = $(this).closest(".gallery");
        if ($(p).find("img.expanded").length) return;
        var img = $(this).find("img");
        var id = $(this).index();

        var oTop = $(img).position().top - 1;
        var oLeft = $(img).position().left - 1;
        var oWidth = $(img).width();
        var oHeight = $(img).height() + 1;

        img = $(img).clone().css({
            top: oTop,
            left: oLeft,
            width: oWidth,
            height: oHeight,
            position: "absolute",
            border: "solid 1px white",
            cursor: "pointer"
        }).addClass("expanded").attr("data-id", id).appendTo(p);

        var first = $(p).find("li").first();
        var nTop = $(first).position().top;
        var nLeft = $(first).position().left;
        var nWidth = $(p).width();
        var nHeight = $(first).position().top + $(first).height() * 3 + parseInt($(first).css("marginTop")) * 2;

        var close = $("<div style=\"top:" + (nTop + 10) + "px; left:" + (nLeft + nWidth - 35) + "px;\" class=\"close\">X</div>").appendTo(p);

        $(img).animate({
            top: nTop,
            left: nLeft,
            width: nWidth,
            height: nHeight
        }, function () {
            $(close).fadeIn();
        });
    });
    //end gallery image click

    //on expanded gallery image click, remove it
    $(".infobox .gallery").on("click", ".expanded,.close", function () {
        var p = $(this).closest(".gallery");
        var exp = $(p).find(".expanded");
        var id = $(exp).attr("data-id");
        var img = $(p).find("li").eq(id);

        $(p).find(".close").fadeOut(function () {
            $(this).remove();

            var oTop = parseInt($(img).position().top) + 9;
            var oLeft = $(img).position().left;
            var oWidth = $(img).width();
            var oHeight = $(img).height() + 1;

            $(exp).animate({
                top: oTop,
                left: oLeft,
                width: oWidth,
                height: oHeight
            }, function () {
                $(exp).remove();
            });
        });
    });
    //end expanded gallery image click

    //on load complete, hide overlay
    Pace.on("done", function () {
        $("#loading").fadeOut();
    });
    //end load complete

    //on back-to-top click, go to top
    $(".back-to-top").click(function () {
        $("body").animate({ scrollTop: 0 }, "400");
    });
    //end back-to-top click

    //on anchor click, animate to the target location
    $("a[href*=#]").click(function (event) {
        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 500);
        event.preventDefault();
    });
    //end anchor click

    //on window resize, resize components
    setTimeout(redraw, 500);
    $(window).resize(redraw);
    function redraw() {
        var left = $("#main-container").width() / 2 - $(".mixer-nav").width() + $(".mixer-nav").width() * 0.11;
        $(".mixer-nav").css("left", left);
    }
    //end window resize
});