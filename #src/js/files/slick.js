$('.slider').slick({
   vertical: true,
   verticalSwiping: true,
   adaptiveHeight: true,
   adaptiveWidth: true,
   infinite: false,
   slidesToShow: 2,
   autoplay: 0,
   autoplaySpeed: 10000,
   draggable: false,
   waiteForAnimate: false,
});

$('.slider__text').each(function () {
   if (parseFloat($(this).css('height')) > 100) {
      $(this).parent().wrap("<div class='slider__wrapper'></div>");
   }
});

let sliderItems = $('.slider-img .slider-img__item');
if (sliderItems.length < 4) {
   $('.slider-img__item:last-child').clone().prependTo('.slider-img');
   $('.slider-content__item:last-child').clone().prependTo('.slider-content');
}

$('.slider-img').slick({
   asNavFor: '.slider-content',
   infinite: false,
   slidesToShow: 3,
   initialSlide: 2,
   waiteForAnimate: false,
   variableWidth: true,
   centerMode: true,
   cssEase: 'ease-in',
   speed: 500,
   easing: 'liner',
   touchMove: false,
   swipeToSlide: false,
   touchThreshold: 7,
});

$('.slider-content').slick({
   asNavFor: '.slider-img',
   infinite: false,
   slidesToShow: 1,
   initialSlide: 2,
   speed: 500,
   cssEase: 'ease-in',
   waiteForAnimate: false,
   draggable: false,
   swipe: false,
});


