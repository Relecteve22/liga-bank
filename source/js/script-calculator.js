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
      contributionNumber: 10,
      timeYears: 5,
      step: 100000,
      minCreditAmount: 500000
    };

    var infoCredits = {
      price: 2000000,
      contribution: 200000,
      contributionNumber: 10,
      timeYears: 5
    };

    var infoCreditsOurOffers = {
      amount: 0,
      contributionNumber: 0,
      amountFromMounth: 0,
      minAmount: 0
    };

    var isMinAmoutCredit = function () {
      if (infoCreditsOurOffers.amount <= startInfoCredits.minCreditAmount) {
        ourOffer.classList.add('our-offer--none');
        minAmoutCreditElement.classList.remove('min-amout-credit--none');
      }
    };

    var isAmoutCredit = function () {
      if (infoCreditsOurOffers.amount >= startInfoCredits.minCreditAmount) {
        ourOffer.classList.remove('our-offer--none');
        minAmoutCreditElement.classList.add('min-amout-credit--none');
      }
    };

    var calculatorCompute = function (obj) {
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution))), (obj.timeYears));
      infoCreditsOurOffers.amount = payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution));
      infoCreditsOurOffers.contributionNumber = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText);
      infoCreditsOurOffers.amountFromMounth = Number(annuity);
      infoCreditsOurOffers.minAmount = Number(requiredRevenueCompute(annuity));
      payCradits.textContent = infoCreditsOurOffers.amount.toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = infoCreditsOurOffers.amountFromMounth.toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      isMinAmoutCredit();
      isAmoutCredit();
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

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      var infoCreditsContribution = new Decimal(infoCredits.price);
      infoCredits.contribution = infoCreditsContribution.mul((new Decimal(startInfoCredits.contributionNumber)).mul(0.01));
      inputValueContribution.textContent = infoCredits.contribution;
      calculatorCompute(infoCredits);
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      var infoCreditsContribution = new Decimal(infoCredits.price);
      infoCredits.contribution = infoCreditsContribution.mul((new Decimal(startInfoCredits.contributionNumber)).mul(0.01));
      inputValueContribution.textContent = infoCredits.contribution;
      calculatorCompute(infoCredits);
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;
      text = Number(text);
      infoCredits.price = Number(text);
      inputValuePrice.textContent = Number(text).toLocaleString();
      var infoCreditsContribution = new Decimal(infoCredits.price);
      infoCredits.contribution = infoCreditsContribution.mul((new Decimal(startInfoCredits.contributionNumber)).mul(0.01));
      inputValueContribution.textContent = infoCredits.contribution;

      calculatorCompute(infoCredits);
    });

    inputValuePrice.addEventListener('blur', function () {
      var text = inputValuePrice.textContent;
      text = Number(text);

      if (text >= startInfoCredits.maxPrice) {
        inputValuePrice.textContent = startInfoCredits.maxPrice;
      }
      if (text <= startInfoCredits.minPrice) {
        inputValuePrice.textContent = startInfoCredits.minPrice;
      }

      calculatorCompute(infoCredits);
    });





    var rangeInputContribution = document.querySelector('.range__input--contribution');
    var rangeText = document.querySelector('.range__text--js');

    rangeInputContribution.addEventListener('change', function () {
      infoCredits.contributionNumber = rangeInputContribution.value;
      rangeText.textContent = rangeInputContribution.value;
      var infoCreditsContribution = new Decimal(infoCredits.price);
      infoCredits.contribution = infoCreditsContribution.mul((new Decimal(infoCredits.contributionNumber)).mul(0.01));
      inputValueContribution.textContent = infoCredits.contribution;

      calculatorCompute(infoCredits);
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;
      // inputValueContribution.textContent = inputValueContribution.textContent.replace (/[^0-9+]/g, '');
      text = Number(text);
      infoCredits.contribution = text;

      var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
      var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
      infoCredits.contributionNumber = rangeTextDinamyc;
      rangeText.textContent = infoCredits.contributionNumber;
      rangeInputContribution.value = infoCredits.contributionNumber;

      calculatorCompute(infoCredits);
    });

    inputValueContribution.addEventListener('blur', function () {
      var infoCreditsContribution = new Decimal(infoCredits.price);
      var text = inputValueContribution.textContent;
      text = Number(text);

      if (text >= (new Decimal(infoCredits.price))) {
        inputValueContribution.textContent = new Decimal(infoCredits.price);
        infoCredits.contribution = new Decimal(infoCredits.price);
      }
      if (text <= infoCreditsContribution.mul((new Decimal(infoCredits.contributionNumber)).mul(0.01))) {
        inputValueContribution.textContent = infoCreditsContribution.mul((new Decimal(infoCredits.contributionNumber)).mul(0.01).toString());
        infoCredits.contribution = infoCreditsContribution.mul((new Decimal(infoCredits.contributionNumber)).mul(0.01));
      }

      calculatorCompute(infoCredits);
    });
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
  };
})();
