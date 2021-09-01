$('.player__btn-play').click(function (evt) {
   $('.player__button').addClass('play');
   $('.player__poster').addClass('play');
   $('.player__video')[0].play();
});

$('.player__video').on('ended', function (evt) {
   $('.player__button').removeClass('play');
   $('.player__poster').removeClass('play');
});