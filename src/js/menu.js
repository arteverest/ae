var SLIDER_SLIDE_CLASS_NAME = 'slider--slide';
var $slider = document.querySelector('.js-slider');
var $buttons = document.querySelectorAll('.js-menu-button');

function onClickHandler() {

}

$buttons = Array.prototype.slice.call($buttons);

$buttons.forEach(function($button) {
  $button.addEventListener('click', function(event) {
    event.preventDefault();
    $slider.classList.add(SLIDER_SLIDE_CLASS_NAME);
  }, true);
});
