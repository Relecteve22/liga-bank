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
      sum = 9.4;
      if (forText === true) {
        sum = '9,40';
      }
    }
    if (valueContribution >= (valuePrice * 0.15)) {
      sum = 8.5;
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
    percentCreditElement.textContent = percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution), true);
    // var erhtrg = new Decimal(2);
    // console.log((erhtrg.mul(150)).toString());



    var loanAmount = new Decimal(payCraditsCalculator(inputValueContribution, (startInfoCredits.price), (startInfoCredits.contribution)));
    var percentCredit = new Decimal(percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution)));
    var monthlyInterestRate = percentCredit.div(monthInYear);
    var annuityCoefficient = (monthlyInterestRate.mul(monthlyInterestRate.add(1).pow(new Decimal(startInfoCredits.timeYears)).mul(monthInYear))).div(monthlyInterestRate.add(1).pow(new Decimal(startInfoCredits.timeYears)).mul(monthInYear).sub(1));
    var annuityPayment = loanAmount.mul(annuityCoefficient);
    payMonth.textContent = annuityPayment.toString();
  };

  // function getAnnuityCoeff(monthlyRate) {
  //   var rate = new Decimal(monthlyRate);
  //   var numerator = rate.add(1).pow(18).mul(rate);
  //   var denominator = rate.add(1).pow(18).sub(1);
  //   return numerator.div(denominator).toString();
  // }

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
  };
})();
