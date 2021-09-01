$(".icon-menu").click(function () {
   $(this).toggleClass('active');
   $('body').toggleClass('lock');
   $('.menu__body').toggleClass('active');
});