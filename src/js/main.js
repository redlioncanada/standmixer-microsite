var isMobile = Modernizr.mobile;
var isPhone = Modernizr.phone;
var isTablet = Modernizr.tablet;

if (isMobile) {
    //inject meta tags
    $('head').append("<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />").append("<meta content='True' name='HandheldFriendly' />");
}

$(document).ready(function(){
    //start first panel mixer change
    let mixerTimeout = undefined;
    resetMixerInterval();
    function resetMixerInterval() {
        clearTimeout(mixerTimeout);
        mixerTimeout = setInterval(function() {
            changeMixer();
        },5000)
    }

    $('.categories').on('click', 'li:not(".selected,.title")', function(){
        let id = $(this).index();
        resetMixerInterval();
        changeMixer(id);
    });

    function changeMixer(id) {
        if (typeof id === 'undefined') {
            id = $('.categories .selected').index()+1;
            if (id > $('.categories li').length-1) id = 1;
        }

        let target = $('.categories li').eq(id);

        //change mixer image
        $('.mixer .selected').fadeOut(500);
        $('.mixer img').eq(id-1).fadeIn(400, function() {
            $(this).addClass('selected');
        });

        //change menu selection
        $('.categories .selected').removeClass('selected');
        $(target).addClass('selected');
    }
    //end first panel mixer change

    //on load complete, hide overlay
    Pace.on('done', function() {
        $('#loading').fadeOut();
    })

    //on click-to-top click, go to top
    $('.back-to-top').click(function() {
        $('body').animate({'scrollTop':0}, '400');
    });

    /*redraw();
    //on window resize, resize components
    $(window).resize(redraw);
    function redraw() {
    }*/
});