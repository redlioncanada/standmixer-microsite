var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;
let mixerDotNav = undefined;
let gaw = new gaWrapper({prefix: "SMA", verbose: true, testMode: true});

if (isMobile) {
    //inject meta tags
    $('head').append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />").append("<meta content='True' name='HandheldFriendly' />");
}

$(document).ready(function(){
    //change the mixer on the first panel at a set interval
    let mixerTimeout = undefined;
    resetMixerInterval();
    function resetMixerInterval() {
        clearTimeout(mixerTimeout);
        mixerTimeout = setInterval(function() {
            changeMixer();
        },4000)
    }
    function changeMixer(id) {
        if (typeof id === 'undefined') {
            id = $('.mixer-panel-1 .mixer .selected').index()+1;
            if (id > $('.mixer-panel-1 .mixer img').length-1) id = 0;
        }
        if (!isMobile) mixerDotNav.Select(id);
        //change mixer image
        $('.mixer-panel-1 .mixer img').eq(id).fadeIn(400, function() {
            let self = this;
            $('.mixer-panel-1 .mixer .selected').fadeOut(500, function() {
                $(this).removeClass('selected');
                $(self).addClass('selected');
            });
        });
    }
    //end first panel mixer change

    //on mixer attachment image click, nav to that category
    $('.mixer-panel-1 .mixer img').click(function() {
        let id = $(this).attr('data-id');
        let att = $(this).attr('data-att');
        $(`.mixer-panel-1 .categories li a[href="#${id}"]`).click();
        $(`.make-button[data-att="${att}"]`).click();
    });
    //end mixer attachment image click

    if (!isMobile) {
        //init mixer nav
        mixerDotNav = new MixerDotNav($('.mixer-panel-1'));
        mixerDotNav.on('selected', function() {
            changeMixer(this.index);
            resetMixerInterval();
        });
        //end init mixer nav

        //on attachment button click, change the current attachment
        $('.menu li').click(function() {
            if ($(this).find('span').hasClass('selected')) return;
            let p = $(this).closest('.mixer-panel');
            let img = $(p).find('.mixer');
            let id = $(this).index();
            let type = $(this).find('span').attr('data-att');

            //change mixer image
            $(img).find('img').eq(id).fadeIn(300, function() {
                let self = this;
                $(img).find('.selected').fadeOut(400, function() {
                    $(this).removeClass('selected');
                    $(self).addClass('selected');
                });
            });

            //change copy
            $(p).find('.copy.selected, .infobox.selected').removeClass('selected').fadeOut('fast',function(){
                $(p).find('.copy').eq(id).addClass('selected').fadeIn('fast');
                $(p).find('.infobox').eq(id).addClass('selected').fadeIn('fast');
            });

            //change CTB link
            let cta = $(p).find('.cta-button');
            let ctaLink = $(cta).find('a');
            let href = $(ctaLink).attr(`data-${type}-href`);
            if (href && href.length) $(ctaLink).attr('href',href);
            if (href == '#' && !$(cta).is(':animated')) $(cta).fadeOut();
            else if (href != '#' && !$(cta).is(':animated')) $(cta).fadeIn();

            //change menu selection
            $(this).closest('.menu').find('.selected').removeClass('selected');
            $(this).find('span').addClass('selected');
        });
        //end attachment button click

        //on 'choose attachment' arrow click, change the current attachment
        $('.mixer-nav .nav-left').click(function() {
            let p = $(this).closest('.mixer-panel');
            let m = $(p).find('.menu');
            let id = $(m).find('.selected').parent().index();

            if (id-1 < 0) id = $(m).find('li').length-1;
            else id--;
            $(m).find('li').eq(id).click();
        });
        $('.mixer-nav .nav-right').click(function() {
            let p = $(this).closest('.mixer-panel');
            let m = $(p).find('.menu');
            let id = $(m).find('.selected').parent().index();

            if (id+1 > $(m).find('li').length-1) id = 0;
            else id++;
            $(m).find('li').eq(id).click();
        });
        //end 'choose attachment' arrow click

        //on infobox tab click, change the window
        $('.infobox .infomenu li').click(function() {
            let p = $(this).closest('.mixer-panel');

            let old = $(p).find('.infomenu .selected');
            let oldId = $(old).attr('data-id');
            $(p).find(".content [data-id='"+oldId+"']").fadeOut();
            $(old).removeClass('selected');

            let id = $(this).attr('data-id');
            $(p).find(".infobox .content [data-id='"+id+"']").fadeIn();
            $(p).find(".infobox .infomenu li[data-id='"+id+"']").addClass('selected');
        });
        //end infobox tab click
    } else {
        //init mixer navs
        for (var i = 2; i <= 7; i++) {
            let mixerDotNav = new MixerDotNav($('.mixer-panel-'+i.toString()), isMobile);
            mixerDotNav.on("selected", function() {
                doMobileSwipe(this.index,this);
            });

            //init hammerjs
            $('.mixer-panel-'+i.toString()).hammer().bind("swipe", function(e) {
                let d = e.gesture.direction == Hammer.DIRECTION_LEFT ? 'left' : 'right';
                closeLeftDrawer('.mobile-drawer-left');
                closeRightDrawer('.mobile-drawer-right', function() {
                    doMobileSwipe(d,this);
                });
            });
            //end init hammerjs
        }
        //end init mixer navs

        function doMobileSwipe(d,e) {
            let newId = undefined;
            if (d == 'left') {
                newId = $(p).find('.mixer .selected').index()+1;
                if (newId > $(p).find('.mixer img').length) newId = 0;
            } else if (d == 'right') {
                newId = $(p).find('.mixer .selected').index()-1;
                if (newId < 0) newId = $(p).find('.mixer img').length;
            } else if (typeof d === 'number') {
                if (d < 0 || d > $(p).find('.mixer img').length) return;
                else newId = d;
            }

            let p = $(e).closest('.mixer-panel');
            //do some mobile swiping
        }

        //on drawer click, animate out
        $('.mobile-drawer').click(function() {
            let self = this;
            let p = $(this).closest('.mixer-panel');

            if ($(this).hasClass('mobile-drawer-left')) {
                $(p).find('.mobile-drawer-left').each(function(i, e) {
                    $(e).css('zIndex','100');
                    openLeftDrawer(e);
                });
            } else {
                $(p).find('.mobile-drawer-right').each(function(i, e) {
                    $(e).css('zIndex','100');
                    openRightDrawer(e);
                });
            }
            $(self).css('zIndex','200');
        });
        //end drawer click

        //on not drawer click, close the drawer
        $('.mobile-close').mousedown(function() {
            closeLeftDrawer('.mobile-drawer-left');
            closeRightDrawer('.mobile-drawer-right');
        });
        //end not drawer click

        function closeLeftDrawer(e,cb=false) {let width = $(e).width(); $(e).animate({'left': -width}, 400, function(){if (cb) cb();}); $(e).closest('.mobile-drawer').removeClass('open');}
        function openLeftDrawer(e,cb=false) {$(e).css('zIndex','100').animate({'left': '-1px'}, 400, function(){if (cb) cb();}); $(e).closest('.mobile-drawer').addClass('open');}
        function closeRightDrawer(e,cb=false) {let width = $(e).width(); $(e).animate({'right': -width}, 400, function(){if (cb) cb();}); $(e).closest('.mobile-drawer').removeClass('open');} 
        function openRightDrawer(e,cb=false) {$(e).css('zIndex','100').animate({'right': '-1px'}, 400, function(){if (cb) cb();}); $(e).closest('.mobile-drawer').addClass('open');}
    }

    //on gallery arrow click, navigate
    $('.infobox .gallery').on('click', '.left', function() {
        navGallery(this,1);
    });
    $('.infobox .gallery').on('click', '.right', function() {
        navGallery(this,0);
    });
    function navGallery(self, direction) {
        let p = $(self).closest('.gallery');
        if (p.find('.expanded img').length > 1) return;
        let length = $(p).find('ul img').length-1;
        let img = $(p).find('.expanded .current');
        let curId = parseInt($(img).attr('data-id'));
        let newId = direction ? curId+1 : curId-1;
        
        if (newId > length) newId = 0;
        else if (newId < 0) newId = length;

        let curImg = $(p).find('ul img').eq(newId);
        let mod = direction ? 1 : -1; 
        let width = $(img).width()*mod;
        let newImg = $(curImg).clone().css('left',width).attr('data-id',newId).appendTo(p.find('.expanded'));

        $(img).animate({'left': width*-1}, function() {
            $(this).remove();
        });
        $(newImg).animate({'left': 0}, function() {
            $(this).addClass('current');
        })
    }   

    //on gallery image click, expand it and show close button
    $('.infobox .gallery li').click(function() {
        let p = $(this).closest('.gallery');
        if ($(p).find('img.expanded').length) return;
        let img = $(this).find('img');
        let id = $(this).index();

        let oTop = $(img).position().top-1;
        let oLeft = $(img).position().left-1;
        let oWidth = $(img).width();
        let oHeight = $(img).height()+1;
        
        let gallery = $('<div></div>').css({
            top: oTop,
            left: oLeft,
            width: oWidth,
            height: oHeight,
            overflow: 'hidden', 
            position: 'absolute',
            border: 'solid 1px white'
        }).addClass('expanded').appendTo(p);

        img = $(img).clone().css({
            left: 0,
            top: 0
        }).addClass('current').attr('data-id',id).appendTo(gallery);


        let first = $(p).find('li').first();
        let nTop = $(first).position().top+11;
        let nLeft = $(first).position().left;
        let nWidth = $(p).width();
        let nHeight = $(first).position().top + $(first).height()*3 + parseInt($(first).css('marginTop'))*2 - 21;

        let close = $(`<div style="top:${nTop+10}px; left:${nLeft+nWidth-35}px;" data-label="Close Gallery" class="close">+</div>`).appendTo(p);
        let leftArrow = $(`<div class="left" data-label="Next Image"></div>`).appendTo(p);
        let rightArrow = $(`<div class="right" data-label="Previous Image"></div>`).appendTo(p);

        $(gallery).animate({
            top: nTop,
            left: nLeft,
            width: nWidth,
            height: nHeight
        }, function() {
            $(close).fadeIn();
            $(leftArrow).fadeIn();
            $(rightArrow).fadeIn();
        });
    });
    //end gallery image click

    //on expanded gallery image click, remove it
    $('.infobox .gallery').on('click', '.close', function() {
        let p = $(this).closest('.gallery');
        let exp = $(p).find('.expanded');
        let id = $(exp).find('.current').attr('data-id');
        let img = $(p).find('li').eq(id);

        $(p).find('.left,.right').fadeOut(function() {
            $(this).remove();
        });
        $(p).find('.close').fadeOut(function() {
            $(this).remove();

            let oTop = parseInt($(img).position().top)+9;
            let oLeft = $(img).position().left;
            let oWidth = $(img).width();
            let oHeight = $(img).height()+1;

            $(exp).animate({
                top: oTop,
                left: oLeft,
                width: oWidth,
                height: oHeight
            }, function() {
                $(exp).remove();
            });
        });
    });
    //end expanded gallery image click

    //on load complete, hide overlay
    Pace.on('done', function() {
        $('#loading').fadeOut();
    });
    //end load complete

    //on back-to-top click, go to top
    $('.back-to-top').click(function() {
        $('body').animate({'scrollTop':0}, '400');
    });
    //end back-to-top click

    //on anchor click, animate to the target location
    $('a[href*=#]').click(function(event){
        let hash = $(this).attr('href');
        if (!$(hash).offset() || hash == "#") return;
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $( hash ).offset().top
        }, 500, function() {
            document.location.hash = hash;
        });
    });
    //end anchor click

    //on window resize, resize components
    setTimeout(redraw,500);
    $(window).resize(redraw);
    function redraw() {

    }
    //end window resize
});