"use strict";

var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;
var mixerDotNav = undefined;
var gaw = new gaWrapper({ prefix: isMobile ? "Mobile-SMA" : "SMA", verbose: true });

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
        }, 4000);
    }
    function changeMixer(id) {
        if (typeof id === "undefined") {
            id = $(".mixer-panel-1 .mixer .selected").index() + 1;
            if (id > $(".mixer-panel-1 .mixer img").length - 1) id = 0;
        }
        if (!isMobile) mixerDotNav.Select(id);
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

    //on mixer attachment image click, nav to that category
    $(".mixer-panel-1 .mixer img").click(function () {
        var id = $(this).attr("data-id");
        var att = $(this).attr("data-att");
        $(".mixer-panel-1 .categories li a[href=\"#" + id + "\"]").click();
        $(".make-button[data-att=\"" + att + "\"]").click();
    });
    //end mixer attachment image click

    if (!isMobile) {
        //init mixer nav
        mixerDotNav = new MixerDotNav($(".mixer-panel-1"));
        mixerDotNav.on("selected", function () {
            changeMixer(this.lastClicked);
            resetMixerInterval();
        });
        //end init mixer nav

        //on attachment button click, change the current attachment
        $(".menu li").click(function () {
            if ($(this).find("span").hasClass("selected")) return;
            var p = $(this).closest(".mixer-panel");
            var img = $(p).find(".mixer");
            var id = $(this).index();
            var type = $(this).find("span").attr("data-att");

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

            //change CTB link
            var cta = $(p).find(".cta-button");
            var ctaLink = $(cta).find("a");
            var href = $(ctaLink).attr("data-" + type + "-href");
            if (href && href.length) $(ctaLink).attr("href", href);
            if (href == "#" && !$(cta).is(":animated")) $(cta).fadeOut();else if (href != "#" && !$(cta).is(":animated")) $(cta).fadeIn();

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
    } else {
        var i;

        (function () {
            var doMobileSwipe =
            //end init mixer navs

            function (d, e) {
                var newId = undefined;
                var p = $(e).closest(".mixer-panel");
                var mixerDiv = $(p).find(".mixer");
                if ($(mixerDiv).hasClass("animating")) return -1;
                var curImg = $(p).find(".mixer .selected");
                var curId = $(curImg).index();
                var numImages = $(p).find(".mixer img").length;

                if (d == "left") {
                    newId = curId + 1;
                    if (newId > numImages - 1) newId = 0;
                } else if (d == "right") {
                    newId = curId - 1;
                    if (newId < 0) newId = numImages - 1;
                } else if (typeof d === "number") {
                    if (d < 0 || d > numImages - 1) return -1;else newId = d;
                }

                var pWidth = $(p).width();
                var newImg = $(p).find(".mixer img").eq(newId);
                var mod = newId > curId ? 1 : -1;

                $(mixerDiv).addClass("animating");
                newImg.css({ left: pWidth * mod, display: "block" }).animate({ left: 0 }, 400);
                curImg.animate({ left: -pWidth * mod }, 400, function () {
                    $(newImg).addClass("selected");
                    $(this).removeClass("selected").css("display", "none");
                    $(mixerDiv).removeClass("animating");
                });

                $(p).find(".mobile-content").not(".mobile-content-" + (newId + 1)).css("display", "none").removeClass("selected");
                $(p).find(".mobile-content-" + (newId + 1)).css("display", "block").addClass("selected");
                return newId;
            };

            var closeLeftDrawer =
            //end not drawer click

            function (e) {
                var cb = arguments[1] === undefined ? false : arguments[1];
                var width = $(e).width();$(e).animate({ left: -width - 1 }, 400, function () {
                    if (cb) cb();$(e).closest(".mobile-drawer").removeClass("open selected");
                });
            };

            var openLeftDrawer = function (e) {
                var cb = arguments[1] === undefined ? false : arguments[1];
                $(e).animate({ left: "-1px" }, 400, function () {
                    if (cb) cb();
                });$(e).closest(".mobile-drawer").addClass("open");
            };

            var closeRightDrawer = function (e) {
                var cb = arguments[1] === undefined ? false : arguments[1];
                var width = $(e).width();$(e).animate({ right: -width - 1 }, 400, function () {
                    if (cb) cb();$(e).closest(".mobile-drawer").removeClass("open selected");
                });
            };

            var openRightDrawer = function (e) {
                var cb = arguments[1] === undefined ? false : arguments[1];
                $(e).animate({ right: "-1px" }, 400, function () {
                    if (cb) cb();
                });$(e).closest(".mobile-drawer").addClass("open");
            };

            var _loop = function () {
                var mixerDotNav = new MixerDotNav($(".mixer-panel-" + i.toString()), isMobile);
                if (i > 1) {
                    mixerDotNav.on("selected", function () {
                        var self = this;
                        var ret = undefined;
                        if ($(this.parent).find(".mobile-drawer.open").length) {
                            closeLeftDrawer(".mobile-drawer-left", function () {
                                if (doMobileSwipe(self.lastClicked, self.element) >= 0) self.Select(self.lastClicked);
                            });
                            closeRightDrawer(".mobile-drawer-right", function () {
                                if (doMobileSwipe(self.lastClicked, self.element) >= 0) self.Select(self.lastClicked);
                            });
                        } else {
                            if (doMobileSwipe(self.lastClicked, self.element) >= 0) self.Select(self.lastClicked);
                        }
                    });
                }

                //init hammerjs
                $(".mixer-panel-" + i.toString()).hammer({ threshold: 8, velocity: 0.4 }).bind("swipe", function (e) {
                    var id = false;
                    var d = e.gesture.direction == Hammer.DIRECTION_LEFT ? "left" : "right";
                    if ($(this).closest(".mixer-panel").find(".mobile-drawer.open").length) {
                        closeLeftDrawer(".mobile-drawer-left", function () {
                            id = doMobileSwipe(d, this);
                        });
                        closeRightDrawer(".mobile-drawer-right", function () {
                            id = doMobileSwipe(d, this);
                        });
                    } else {
                        id = doMobileSwipe(d, this);
                    }
                    if (id >= 0 && id !== false) {
                        console.log(id);
                        mixerDotNav.Select(id);
                    }
                });
                //end init hammerjs
            };

            //init mixer navs
            for (i = 1; i <= 7; i++) {
                _loop();
            }

            //on drawer click, animate out
            $(".mobile-drawer").click(function () {
                var self = this;
                var p = $(this).closest(".mixer-panel");

                if ($(this).hasClass("mobile-drawer-left")) {
                    $(p).find(".mobile-drawer-left").each(function (i, e) {
                        $(e).removeClass("selected");
                        openLeftDrawer(e);
                    });
                    $(p).find(".mobile-drawer-right").each(function (i, e) {
                        closeRightDrawer(e);
                    });
                } else {
                    $(p).find(".mobile-drawer-right").each(function (i, e) {
                        $(e).removeClass("selected");
                        openRightDrawer(e);
                    });
                    $(p).find(".mobile-drawer-left").each(function (i, e) {
                        closeLeftDrawer(e);
                    });
                }
                $(self).addClass("selected");
            });
            //end drawer click

            //on not drawer click, close the drawer
            $(".mobile-close").mousedown(function () {
                closeLeftDrawer(".mobile-drawer-left");
                closeRightDrawer(".mobile-drawer-right");
            });
        })();
    }

    //on gallery arrow click, navigate
    $(".infobox .gallery, .mobile-drawer-gallery").on("click", ".left,.left-section", function () {
        navGallery(this, 1);
    });
    $(".infobox .gallery, .mobile-drawer-gallery").on("click", ".right,.right-section", function () {
        navGallery(this, 0);
    });
    function navGallery(self, direction) {
        var p = $(self).closest(".gallery");
        if (!p.length) p = $(self).closest(".mobile-content");
        if (p.find(".expanded img").length > 1) {
            return;
        }var length = $(p).find("ul img").length - 1;
        var img = $(p).find(".expanded .current");
        var curId = parseInt($(img).attr("data-id"));
        var newId = direction ? curId + 1 : curId - 1;

        if (newId > length) newId = 0;else if (newId < 0) newId = length;

        var curImg = $(p).find("ul img").eq(newId);
        var mod = direction ? 1 : -1;
        var width = $(img).width() * mod;
        var newImg = $(curImg).clone().css({ left: width, top: 0 }).attr("data-id", newId).appendTo(p.find(".expanded"));

        $(img).animate({ left: width * -1 }, function () {
            $(this).remove();
        });
        $(newImg).animate({ left: 0 }, function () {
            $(this).addClass("current");
        });
    }

    //on gallery image click, expand it and show close button
    $(".infobox .gallery li, .mobile-drawer-gallery li").click(function () {
        var p = $(this).closest(".gallery");
        var mobile = false;
        if (!p.length) {
            p = $(this).closest(".mobile-content");
            mobile = true;
        }
        if ($(p).find("img.expanded").length) return;
        var img = $(this).find("img");
        var id = $(this).index();
        var oTop = $(img).position().top - 1;
        var oLeft = $(img).position().left - 1;
        var oWidth = $(img).width();
        var oHeight = $(img).height() + 1;

        var gallery = $("<div></div>").css({
            top: oTop,
            left: oLeft,
            width: oWidth,
            height: oHeight,
            overflow: "hidden",
            position: "absolute",
            border: "solid 1px white"
        }).addClass("expanded").appendTo(p);

        img = $(img).clone().css({
            left: 0,
            top: 0
        }).addClass("current").attr("data-id", id).appendTo(gallery);

        var first = $(p).find("li").first();
        var nWidth = undefined,
            nHeight = undefined;
        if (mobile) {
            nWidth = $(first).width() * 3 + 2;
            nHeight = $(first).height() * 3 + 2;
        } else {
            nWidth = $(p).width();
            nHeight = $(first).position().top + $(first).height() * 3 + parseInt($(first).css("marginTop")) * 2 - 21;
        }
        var nTop = $(first).position().top + 9;
        var nLeft = $(first).position().left;

        var close = $("<div style=\"top:" + (nTop + 10) + "px; left:" + (nLeft + nWidth - 35) + "px;\" data-label=\"Close Gallery\" class=\"close\">+</div>").appendTo(p);
        var leftArrow = $("<div class=\"left\" data-label=\"Next Image\"></div>").appendTo(p);
        var rightArrow = $("<div class=\"right\" data-label=\"Previous Image\"></div>").appendTo(p);
        var leftSection = $("<div class=\"left-section\" data=label=\"Next Image\"></div>").appendTo(p);
        var rightSection = $("<div class=\"right-section\" data=label=\"Previous Image\"></div>").appendTo(p);

        $(gallery).delay(500).animate({
            top: nTop,
            left: nLeft,
            width: nWidth,
            height: nHeight
        }, function () {
            $(close).fadeIn();
            $(leftArrow).fadeIn();
            $(rightArrow).fadeIn();
        });
    });
    //end gallery image click

    //on expanded gallery image click, remove it
    $(".infobox .gallery, .mobile-drawer-gallery").on("click", ".close", function () {
        var p = $(this).closest(".gallery");
        if (!p.length) p = $(this).closest(".mobile-content");
        var exp = $(p).find(".expanded");
        var id = $(exp).find(".current").attr("data-id");
        var img = $(p).find("li").eq(id);

        $(p).find(".left,.right,.left-section,.right-section").fadeOut(function () {
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
        if (!$(hash).offset() || hash == "#") return;
        event.preventDefault();
        $("html, body").animate({
            scrollTop: $(hash).offset().top
        }, 500, function () {
            document.location.hash = hash;
        });
    });
    //end anchor click

    //on window resize, resize components
    setTimeout(redraw, 500);
    $(window).resize(redraw);
    function redraw() {}
    //end window resize
});