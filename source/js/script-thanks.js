'use strict';

(function () {
  var KEYCODE = {
    esc: 27
  };
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var thanksSection = document.querySelector('.thanks-section');
  var thanksSectionClose = thanksSection.querySelector('.thanks-section__close');
  // var form = thanksSection.querySelector('.form-popup');
  // var userlogin = thanksSection.querySelector('#login-popup');
  // var userPassword = thanksSection.querySelector('#password-popup');
  // var passwordControl = thanksSection.querySelector('.form-popup__password-control');

  var openThanksSection = function () {
    body.classList.add('thanks-section-show--body');
    thanksSection.classList.add('thanks-section-show');
    overlay.classList.add('overlay--show');
  };

  var closeThanksSection = function () {
    body.classList.remove('thanks-section-show--body');
    thanksSection.classList.remove('thanks-section-show');
    overlay.classList.remove('overlay--show');
    window.сalculator.stepThree.classList.add('step-three--none');
  };

  thanksSectionClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeThanksSection();
  });

  overlay.addEventListener('click', function () {
    closeThanksSection();
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE.esc) {
      evt.preventDefault();
      if (thanksSection.classList.contains('thanks-section-show')) {
        closeThanksSection();
      }
    }
  });

  window.thanksSection = {
    body: body,
    openThanksSection: openThanksSection
  };
})();
