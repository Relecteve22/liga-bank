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
