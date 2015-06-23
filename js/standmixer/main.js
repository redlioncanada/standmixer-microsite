"use strict";

var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;
var mixerDotNav = undefined;

if (isMobile) {
    //inject meta tags
    $("head").append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />").append("<meta content='True' name='HandheldFriendly' />");
} else {
    mixerDotNav = new MixerDotNav($(".mixer-panel-1"));
}

$(document).ready(function () {
    //change the mixer on the first panel at a set interval
    var mixerTimeout = undefined;
    resetMixerInterval();
    function resetMixerInterval() {
        clearTimeout(mixerTimeout);
        mixerTimeout = setInterval(function () {
            changeMixer();
        }, 4000);
    }
    function changeMixer(id) {
        if (typeof id === "undefined") {
            id = $(".mixer-panel-1 .mixer .selected").index() + 1;
            if (id > $(".mixer-panel-1 .mixer img").length - 1) id = 0;
        }
        mixerDotNav.Select(id);
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

    //init mixer nav
    mixerDotNav.on("selected", function () {
        changeMixer(this.index);
        resetMixerInterval();
    });
    //end init mixer nav

    //on mixer attachment image click, nav to that category
    $(".mixer-panel-1 .mixer img").click(function () {
        var id = $(this).attr("data-id");
        var att = $(this).attr("data-att");
        $(".mixer-panel-1 .categories li a[href=\"#" + id + "\"]").click();
        $(".make-button[data-att=\"" + att + "\"]").click();
    });
    //end mixer attachment image click

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

    //on gallery arrow click, navigate
    /*$('.infobox .gallery').on('click', '.left', function() {
        navGallery(this,1);
    });
    $('.infobox .gallery').on('click', '.right', function() {
        navGallery(this,0);
    });
    function navGallery(self, direction) {
        let p = $(self).closest('.gallery');
        let length = $(p).find('img').not('.expanded').length-1;
        let img = $(p).find('.expanded');
        let curId = $(img).index();
        let newId = direction ? curId+1 : curId-1;
        
        if (newId > length) newId = 0;
        else if (newId < 0) newId = length;
         let src = $(p).find('img').not('.expanded').eq(newId).attr('src');
        let newImg = $(img).clone().css('left',$(img).position().left+$(img).width()).attr('src',src).appendTo(p);
    }*/

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
            border: "solid 1px white"
        }).addClass("expanded").attr("data-id", id).appendTo(p);

        var first = $(p).find("li").first();
        var nTop = $(first).position().top;
        var nLeft = $(first).position().left;
        var nWidth = $(p).width();
        var nHeight = $(first).position().top + $(first).height() * 3 + parseInt($(first).css("marginTop")) * 2;

        var close = $("<div style=\"top:" + (nTop + 10) + "px; left:" + (nLeft + nWidth - 35) + "px;\" class=\"close\">+</div>").appendTo(p);
        //let leftArrow = $(`<img style="top:${nTop+(nHeight-nTop)/2}; left: ${nLeft+nWidth-40};" class="left" src="/images/standmixer/triangle.png"/>`).appendTo(p);
        //let rightArrow = $(`<img style="top:${nTop+(nHeight-nTop)/2}; left: ${nLeft+20};" class="right" src="/images/standmixer/triangle.png"/>`).appendTo(p);

        $(img).animate({
            top: nTop,
            left: nLeft,
            width: nWidth,
            height: nHeight
        }, function () {
            $(close).fadeIn();
            //$(leftArrow).fadeIn();
            //$(rightArrow).fadeIn();
        });
    });
    //end gallery image click

    //on expanded gallery image click, remove it
    $(".infobox .gallery").on("click", ".close", function () {
        var p = $(this).closest(".gallery");
        var exp = $(p).find(".expanded");
        var id = $(exp).attr("data-id");
        var img = $(p).find("li").eq(id);

        $(p).find(".left,.right").fadeOut(function () {
            $(this).remove();
        });
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
        var hash = $(this).attr("href");
        event.preventDefault();event.stopPropagation();
        $("html, body").animate({
            scrollTop: $($.attr(this, "href")).offset().top
        }, 500, function () {
            document.location.hash = hash;
        });
    });
    //end anchor click

    //on window resize, resize components
    setTimeout(redraw, 500);
    $(window).resize(redraw);
    function redraw() {
        var navWidth = $(".mixer-nav").eq(1).width();
        var mod = $(window).width() < 1470 ? navWidth * 0.07 * -1 : navWidth * 0.12;
        var left = $("#main-container").width() / 2 - navWidth + mod;
        $(".mixer-nav").not(".mixer-panel-7 .mixer-nav").css("left", left);

        mod = $(window).width() < 1470 ? navWidth * 0.52 : navWidth * 0.72;
        left = $("#main-container").width() / 2 + mod;
        $(".mixer-panel-7 .mixer-nav").css("left", left);
    }
    //end window resize
});