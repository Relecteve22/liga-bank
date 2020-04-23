'use strict';

(function () {
  var ourOffer = document.querySelector('.our-offer');
  var stepTwo = document.querySelector('.step-two');
  var payCradits = document.querySelector('.list-offers__item-text-pay--js');
  var inputValueContribution = document.querySelector('.list-step-two__item-input-value--contribution');
  var checkboxMaternityСapital = document.querySelector('.list-step-two__checkbox--additional');
  var inputValuePrice = document.querySelector('.list-step-two__item-input-value--price');
  var percentCreditElement = document.querySelector('.list-offers__item-text-percent--js');
  var payMonth = document.querySelector('.list-offers__item-text-pay-month--js');
  var timeCredit = document.querySelector('.list-step-two__item-input-value--time-credit');
  var requiredRevenueElement = document.querySelector('.list-offers__item-text-income-month--js');
  var inputValuePrice = document.querySelector('.list-step-two__item-input-value--price');
  var inputValueContribution = document.querySelector('.list-step-two__item-input-value--contribution');
  var inputsValue = document.querySelectorAll('.list-step-two__item-input-value');
  var minAmoutCreditElement = document.querySelector('.min-amout-credit');
  var minPriceElement = document.querySelector('.range-text__item--from-js');
  var maxPriceElement = document.querySelector('.range-text__item--before-js');
  var plusAmountElement = document.querySelector('.list-step-two__item-btn-plus');
  var minusAmountElement = document.querySelector('.list-step-two__item-btn-minus');

  var maternityСapital = '470000';

  var monthInYear = 12;

  var isPercentCreditText = true;

  var ourOfferCalculator = function () {

  };

  var payCraditsCalculator = function (valueContributionElement, valuePrice, valueContribution) {
    var valuePriceReturn = valuePrice;

    if (valueContributionElement) {
      valuePriceReturn = valuePrice - valueContribution;
    };

    if (checkboxMaternityСapital.checked) {
      valuePriceReturn = valuePrice - valueContribution - maternityСapital;
    };

    return valuePriceReturn;
  };

  var percentCreditCalculator = function (valuePrice, valueContribution, forText) {
    var sum = 0;
    if (valueContribution < (valuePrice * 0.15)) {
      sum = 0.094;
      if (forText === true) {
        sum = '9,40';
      }
    }
    if (valueContribution >= (valuePrice * 0.15)) {
      sum = 0.085;
      if (forText === true) {
        sum = '8,50';
      }
    }

    return sum;
  };

  var annuityCompute = function (loanAmountNumber, percentCreditNumber, yearsCreditsNumber) {
    var loanAmount = new Decimal(loanAmountNumber);
    var percentCredit = new Decimal(percentCreditNumber);
    var monthPercentCredit = percentCredit.div(monthInYear);
    monthPercentCredit = new Decimal(monthPercentCredit);
    var numberForCalculator = new Decimal(1);
    var annuityCoefficient = monthPercentCredit.div(numberForCalculator.sub(monthPercentCredit.add(1).pow(new Decimal(yearsCreditsNumber).mul(monthInYear).mul(-1))));
    var annuityPayment = loanAmount.mul(annuityCoefficient);
    return annuityPayment.toFixed(0);
  }

  var requiredRevenueCompute = function (payment) {
    var paymentDecimal = new Decimal(payment);
    var number = new Decimal(0.45);
    return paymentDecimal.div(number).toFixed(0);
  };

  var selectedOption = function () {
    ourOffer.classList.remove('our-offer--none');
    stepTwo.classList.remove('step-two--none');
  };

  var selectedOptionMortgage = function () {
    var startInfoCredits = {
      price: 2000000,
      minPrice: 1200000,
      maxPrice: 25000000,
      contribution: 200000,
      timeYears: 5,
      step: 100000
    };

    var infoCredits = {
      price: 2000000,
      contribution: 200000,
      timeYears: 5
    };

    var calculatorCompute = function (obj) {
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution))), (obj.timeYears));
      payCradits.textContent = payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution)).toLocaleString();
      percentCreditElement.textContent = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText);
      payMonth.textContent = Number(annuity).toLocaleString();
      requiredRevenueElement.textContent = Number(requiredRevenueCompute(annuity)).toLocaleString();
    };

    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = startInfoCredits.contribution;
    minPriceElement.textContent = startInfoCredits.minPrice.toLocaleString();
    maxPriceElement.textContent = startInfoCredits.maxPrice.toLocaleString();
    calculatorCompute(startInfoCredits);

    Array.prototype.forEach.call(inputsValue, function (inputValue) {
      inputValue.addEventListener('input', (evt) => {
        calculatorCompute(infoCredits);
      });
    });

    var isMinAmoutCredit = function () {
      if (infoCredits.price <= 500000) {
        ourOffer.classList.add('our-offer--none');
        minAmoutCreditElement.classList.remove('min-amout-credit--none');
      }
    };

    var isAmoutCredit = function () {
      if (infoCredits.price >= 500000) {
        ourOffer.classList.remove('our-offer--none');
        minAmoutCreditElement.classList.add('min-amout-credit--none');
      }
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      infoCredits.contribution = infoCredits.price * 0.1;
      inputValueContribution.textContent = infoCredits.contribution;
      calculatorCompute(infoCredits);
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      infoCredits.contribution = infoCredits.price * 0.1;
      inputValueContribution.textContent = infoCredits.contribution;
      calculatorCompute(infoCredits);
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;
      text = Number(text);
      infoCredits.price = Number(text);
      inputValuePrice.textContent = Number(text).toLocaleString();
      infoCredits.contribution = infoCredits.price * 0.1;
      inputValueContribution.textContent = infoCredits.contribution;
      // inputValuePrice.textContent = text.toString();

      isMinAmoutCredit();
      isAmoutCredit();
    });







    var BorderMap = {
      MIN_Y: 5,
      MAX_Y: 12,
      MIN_X: 0
    };
    var MyPin = {
      WIDTH: 12,
      HEIGHT: 12
    };

    var pinInputContributionElement = document.querySelector('.range__btn');
    var rangeLineContributuionElement = document.querySelector('.range__line');

    var getPinLeft = function (left) {
      if (left < BorderMap.MIN_X) {
        return BorderMap.MIN_X;
      }

      if ((left + MyPin.WIDTH) > rangeLineContributuionElement.offsetWidth) {
        return (rangeLineContributuionElement.offsetWidth) - MyPin.WIDTH;
      }

      return left;
    };

    var movePin = function (left) {
      pinInputContributionElement.style.left = left + 'px';
    };

    pinInputContributionElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      var dragged = false;

      var MouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        var coodXLeftMyPin = pinInputContributionElement.offsetLeft - shift.x;

        // var updateAddress = function (left, top) {
        //   window.map.inputCordenatios.value = (left + Math.floor(mysharpMarkX)) + ', ' + (top + MyPin.HEIGHT);
        // };

        var left = getPinLeft(coodXLeftMyPin);

        movePin(left);

        // updateAddress(left, top);
      };

      var MouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', MouseMoveHandler);
        document.removeEventListener('mouseup', MouseUpHandler);

        if (dragged) {
          var ClickPreventDefaultHandler = function (defaultEvt) {
            defaultEvt.preventDefault();
            pinInputContributionElement.removeEventListener('click', ClickPreventDefaultHandler);
          };
          pinInputContributionElement.addEventListener('click', ClickPreventDefaultHandler);
        }
      };
      document.addEventListener('mousemove', MouseMoveHandler);
      document.addEventListener('mouseup', MouseUpHandler);
    });









    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;
      infoCredits.contribution = text.toLocaleString();

      if (text >= startInfoCredits.maxPrice) {
        text = startInfoCredits.maxPrice;
      }
      isMinAmoutCredit();
      isAmoutCredit();
    });
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
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
// $('.step-one__select').selectize();

$('.step-one__select').selectize({
  onChange: function (value) {
    if (value === '1') {
      // console.log('1');
      window.сalculator.selectedOptionMortgage();
    }

    if (value === '2') {
      // console.log('2');
    }

    if (value === '3') {
      // console.log('3');
    }
    window.сalculator.selectedOption();
  }
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
