'use strict';

(function () {
  var ourOffer = document.querySelector('.our-offer');
  var stepTwo = document.querySelector('.step-two');
  var payCradits = document.querySelector('.list-offers__item-text-pay--js');
  var inputValueContribution = document.querySelector('.list-step-two__item-input-value--contribution');
  var checkboxMaternityСapital = document.querySelector('.list-step-two__checkbox--additional');
  var inputValuePrice = document.querySelector('.list-step-two__item-input-value--price');
  var percentCredit = document.querySelector('.list-offers__item-text-percent--js');
  var payMonth = document.querySelector('.list-offers__item-text-pay-month--js');
  var timeCredit = document.querySelector('.list-step-two__item-input-value--time-credit');

  var maternityСapital = '470000';

  var monthInYear = 12;

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

  var selectedOption = function () {
    ourOffer.classList.remove('our-offer--none');
    stepTwo.classList.remove('step-two--none');

    // var payCraditsCalculator = function () {
    //   payCradits.textContent = inputValuePrice.textContent;

    //   if (inputValueContribution) {
    //     payCradits.textContent = inputValuePrice.textContent - inputValueContribution.textContent;
    //   };

    //   if (checkboxMaternityСapital.checked) {
    //     payCradits.textContent = inputValuePrice.textContent - inputValueContribution.textContent - maternityСapital;
    //   };
    // };

    // var percentCreditCalculator = function () {
    //   if (inputValueContribution.textContent < (inputValuePrice.textContent * 0.15)) {
    //     percentCredit.textContent = '9,40';
    //   }
    //   if (inputValueContribution.textContent >= (inputValuePrice.textContent * 0.15)) {
    //     percentCredit.textContent = '8,50';
    //   }
    // };

    // payCraditsCalculator();
    // percentCreditCalculator();
  };

  var selectedOptionMortgage = function () {
    var startInfoCredits = {
      price: '2000000',
      contribution: '200000',
      timeYears: '5'
    };

    inputValuePrice.textContent = startInfoCredits.price;
    inputValueContribution.textContent = startInfoCredits.contribution;

    payCradits.textContent = payCraditsCalculator(inputValueContribution, (startInfoCredits.price), (startInfoCredits.contribution));
    percentCredit.textContent = percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution), true);





    var loanAmount = payCraditsCalculator(inputValueContribution, (startInfoCredits.price), (startInfoCredits.contribution));
    var monthlyInterestRate = (percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution)) / monthInYear).toFixed(5);
    var annuityPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (startInfoCredits.timeYears * monthInYear * -1))));
    payMonth.textContent = annuityPayment;
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
  };
})();
