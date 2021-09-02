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



const form = $('form');
const popupOpenTimeDelay = 6000;
let timerId = null;

const popupClickHandler = function (evt) {
   if (evt.target !== $(this).find('.popup__body')[0]) {
      popupMessageClose();
   }
};
function popupMessageOpen (message) {
   $('#popup-message').find('.popup__content').html(message);
   $('#popup-message').addClass('open');
   $('#popup-message').on('click', popupClickHandler);
   $('body').addClass('lock');
   timerId = setTimeout(popupMessageClose, popupOpenTimeDelay);
}
function popupMessageClose () {
   if (timerId) {
      clearTimeout(timerId);
      timerId = null;
   }
   $('#popup-message').off('click', popupClickHandler);
   $('body').removeClass('lock');
   $('#popup-message').removeClass('open');
}

form.submit(function (evt) {
   formSubmitHandler($(this), evt);
});

function formSubmitHandler (form, evt) {
   evt.preventDefault();
   const validateSuccess = formValidate();
   const messageSubmit = form.attr('data-message') ? form.attr('data-message') : 'Form sent';
   const formData = new FormData(form[0]);

   if (validateSuccess) {
      form.addClass('_sending');

      $.ajax({
         url: 'PHP/sendmail.php',
         type: 'POST',
         data: formData,
         contentType: false,
         cache: false,
         processData: false,

      }).done(function () {
         popupMessageOpen(messageSubmit);

      }).fail(function (xhr, status, err) {
         popupMessageOpen(`Ошибка отправки <br> ${status} ${xhr.status}`);

      }).always(function () {
         form[0].reset();
         form.removeClass('_sending');
         formRemoveSuccess(form.find('._success'));
      });

   } else {
      popupMessageOpen('Fill in the required fields');
   }
};


function formValidate () {
   let error = 0;
   const inputsReq = form.find('._req');

   inputsReq.each(function () {
      formRemoveError($(this));

      if ($(this).hasClass('_email')) {
         if (emailTest($(this))) {
            formAddError($(this));
            formRemoveSuccess($(this));
            error++;
         }
      } else if ($(this).attr('type') === 'checkbox' && !$(this)[0].checked) {
         console.log($(this)[0].checked);
         formAddError($(this));
         error++;
      } else {
         if ($(this).val() === '') {
            formAddError($(this));
            formRemoveSuccess($(this));
            error++;
         }
      }
   });
   return error === 0 ? true : false;
}

function inputSuccess () {
   const inputsReq = form.find('._req');
   let err = 0;

   inputsReq.change(function () {
      if ($(this)[0].validity.valid) {
         if ($(this).hasClass('_error')) {
            err = 1;
            formRemoveError($(this));
         }

         formAddSuccess($(this));
      }

      if ($(this).val() === '' || $(this).val() == '[A-Za-z]') {
         formRemoveSuccess($(this));

         if (err) {
            formAddError($(this));
         }
      }
   });
}
inputSuccess();

function formAddError (input) {
   input.parent().addClass('_error');
   input.addClass('_error');
}
function formRemoveError (input) {
   input.parent().removeClass('_error');
   input.removeClass('_error');
}
function emailTest (input) {
   return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val());
}
function formAddSuccess (input) {
   input.addClass('_success');
}
function formRemoveSuccess (input) {
   input.removeClass('_success');
}


$('a').on('mouseup', function () {
	$(this).blur();
});
$('button').on('mouseup', function () {
	$(this).blur();
});