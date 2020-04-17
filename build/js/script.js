'use strict';

(function () {
  var ourOffer = document.querySelector('.our-offer');

  var ourOfferCalculator = function () {

  };

  var selectedOption = function () {
    ourOffer.classList.remove('our-offer--none');
  };

  window.сalculator = {
    selectedOption: selectedOption
  };
})();

'use strict';

(function () {
  var navMain = document.querySelector('.page-header__navigation-site');
  var navToggle = document.querySelector('.page-header__toogle-nav');

  navMain.classList.remove('page-header__navigation-site--nojs');

  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('page-header__navigation-site--closed')) {
      navMain.classList.remove('page-header__navigation-site--closed');
      navMain.classList.add('page-header__navigation-site--opened');
    } else {
      navMain.classList.add('page-header__navigation-site--closed');
      navMain.classList.remove('page-header__navigation-site--opened');
    }
  });
})();

'use strict';

(function () {
  var KEYCODE = {
    esc: 27
  };
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');
  var popupOpen = document.querySelector('.page-header__open-popup');
  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');
  var form = popup.querySelector('.form-popup');
  var userlogin = popup.querySelector('#login-popup');
  var userPassword = popup.querySelector('#password-popup');
  var passwordControl = popup.querySelector('.form-popup__password-control');
  var isStorageSupport = true;
  var storage = {};

  var openPopup = function () {
    body.classList.add('popup-show--body');
    popup.classList.add('popup-show');
    overlay.classList.add('overlay--show');
  };

  var closePopup = function () {
    body.classList.remove('popup-show--body');
    popup.classList.remove('popup-show');
    overlay.classList.remove('overlay--show');
  };

  try {
    storage.login = localStorage.getItem('login-popup');
    storage.phone = localStorage.getItem('phone-popup');
    storage.password = localStorage.getItem('password-popup');
  } catch (err) {
    isStorageSupport = false;
  }

  popupOpen.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();

    if (storage.login) {
      userlogin.value = storage.login;
      userPassword.value = storage.password;
      userPassword.focus();
    } else {
      userlogin.focus();
    }
  });

  popupClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    closePopup();
  });

  overlay.addEventListener('click', function () {
    closePopup();
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('login', userlogin.value);
      localStorage.setItem('password', userPassword.value);
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE.esc) {
      evt.preventDefault();
      if (popup.classList.contains('popup-show')) {
        closePopup();
      }
    }
  });

  var showHidePasswordHandler = function () {
    if (userPassword.getAttribute('type') === 'password') {
      passwordControl.classList.add('form-popup__password-control--view');
      userPassword.setAttribute('type', 'text');
    } else {
      passwordControl.classList.remove('form-popup__password-control--view');
      userPassword.setAttribute('type', 'password');
    }
    return false;
  };

  passwordControl.addEventListener('click', showHidePasswordHandler);
})();

'use strict';
$(document).ready(function () {
  $('.list-promo').slick({
    arrows: false,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  });
});

'use strict';

(function () {
  var inputValuePrice = document.querySelector('.list-step-two__item-input-value--price');

  inputValuePrice.addEventListener('input', (evt) => {
    const text = evt.target.textContent;
    
    // text.toLocaleString("number", {
    //   year: 'numeric'
    // });
   });
})();

'use strict';

(function () {
  var linkNav = document.querySelectorAll('[href^="#"]');
  var v = 0.8;
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (event) {
      event.preventDefault();
      var w = window.pageYOffset;
      var hash;
      var t;
      var start;
      hash = this.href.replace(/[^#]*(.*)/, '$1');
      t = document.querySelector(hash).getBoundingClientRect().top;
      start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start;
        var r;
        r = (t < 0 ? Math.max(w - progress / v, w + t) : Math.min(w + progress / v, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    }, false);
  }
})();

'use strict';
$(document).ready(function () {
  // $('.step-one__select').selectize();

  $('.step-one__select').selectize({
    onChange: function (value) {
      window.calculator.selectedOption();
      if (value === '1') {
        console.log('1');
      }

      if (value === '2') {
        console.log('2');
      }

      if (value === '3') {
        console.log('3');
      }
    }
  });
});

'use strict';
$(document).ready(function () {
  var tabsList = document.querySelectorAll('.tabs-list li');
  var arrayTabsList = Array.prototype.slice.call(tabsList, 0);
  $('.list-services').slick({
    arrows: false,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          swipe: true,
          dots: true
        }
      }
    ]
  });

  arrayTabsList.forEach(function (btnTabs, i) {
    btnTabs.addEventListener('click', function (evt) {
      Array.prototype.forEach.call(tabsList, function (tab) {
        if (tab.classList.contains('tabs-list__item--active')) {
          tab.classList.remove('tabs-list__item--active');
        }
        if ((tab.querySelector('button')) === evt.target) {
          tab.classList.add('tabs-list__item--active');
        }
        if ((tab.querySelector('.tabs-list__wrapper')) === evt.target) {
          tab.classList.add('tabs-list__item--active');
        }
        var arrayTabBtnChild = Array.prototype.slice.call(((tab.querySelector('.tabs-list__wrapper')).childNodes), 0);
        arrayTabBtnChild.forEach(function (tabBtnChild, b) {
          if (tabBtnChild === evt.target) {
            tab.classList.add('tabs-list__item--active');
          }
        });
        if ((tab.querySelector('svg use')) === evt.target) {
          tab.classList.add('tabs-list__item--active');
        }
      });
      $('.list-services').slick('slickGoTo', i);
    });
  });
});
