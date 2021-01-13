//menu


var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});


//slider


var sliderItemBefore = document.querySelector('.slider__item--fat');
var sliderItemAfter = document.querySelector('.slider__item--thin');
var sliderButtonBefore = document.querySelector('.slider__controls--before');
var sliderButtonAfter = document.querySelector('.slider__controls--after');

sliderButtonBefore.addEventListener('click', function () {
  if (sliderItemAfter.classList.contains('slider__item--current')) {
    sliderItemAfter.classList.remove('slider__item--current')
    sliderItemBefore.classList.add('slider__item--current');
  }
});

sliderButtonAfter.addEventListener('click', function () {
  if (sliderItemBefore.classList.contains('slider__item--current')) {
    sliderItemBefore.classList.remove('slider__item--current')
    sliderItemAfter.classList.add('slider__item--current');
  }
});

