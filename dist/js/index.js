'use strict';

$(".icon-menu").click(function () {
   $(this).toggleClass('active');
   $('body').toggleClass('lock');
   $('.menu__body').toggleClass('active');
});
$('.player__btn-play').click(function (evt) {
   $('.player__button').addClass('play');
   $('.player__poster').addClass('play');
   $('.player__video')[0].play();
});

$('.player__video').on('ended', function (evt) {
   $('.player__button').removeClass('play');
   $('.player__poster').removeClass('play');
});

$('.spoiler__title').click(function (event) {
   if ($('.spoiler__body').hasClass('one')) {
      $('.spoiler__title').not($(this)).removeClass('active');
      $('.spoiler__content').not($(this).next()).slideUp(300);
   }
   $(this).toggleClass('active').next().slideToggle(300);
});


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




let form = document.getElementById('form');
form.addEventListener('submit', formSend);


async function formSend(e) {
   e.preventDefault();

   let error = formValidate();

   let formData = new FormData(form);

   if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sendmail.php', {
         method: 'POST',
         body: formData
      });

      if (response.ok) {
         let result = await response.json();
         alert(result.message);
         form.reset();
         form.classList.remove('_sending');
      } else {
         alert('Error');
         form.classList.remove('_sending');
      }

   } else {
      alert('Fill in the required fields');
   }
}

function formValidate() {
   let error = 0;
   let formReq = document.querySelectorAll('._req');
   for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);


      if (input.classList.contains('_email')) {
         if (emailTest(input)) {
            formAddError(input);
            formRemoveSuccess(input);
            error++;
         }
      } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
         formAddError(input);
         error++;
      } else {
         if (input.value === '') {
            formAddError(input);
            formRemoveSuccess(input)
            error++;
         }
      }
   }
   return error;
}

function inputSuccess() {
   let inputs = form.querySelectorAll('._req');
   let er = 0;
   for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      input.addEventListener("input", function () {
         if (input.validity.valid) {
            if (input.classList.contains('_error')) {
               er = 1
               formRemoveError(input);
            }
            formAddSuccess(input);
         }
         if (input.value === '' || input.value == '[A-Za-z]') {
            formRemoveSuccess(input);
            if (er) {
               formAddError(input);
            }
         }
      }, false);
   }
}
inputSuccess();

function formAddError(input) {
   input.parentElement.classList.add('_error');
   input.classList.add('_error');
}

function formRemoveError(input) {
   input.parentElement.classList.remove('_error');
   input.classList.remove('_error');
}

function emailTest(input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

function formAddSuccess(input) {
   input.classList.add('_success');
}

function formRemoveSuccess(input) {
   input.classList.remove('_success');
}

$('a').on('mouseup', function () {
	$(this).blur();
});
$('button').on('mouseup', function () {
	$(this).blur();
});