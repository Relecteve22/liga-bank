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
    return annuityPayment.toFixed(0).toString();
  }

  var requiredRevenueCompute = function (payment) {
    var paymentDecimal = new Decimal(payment);
    var number = new Decimal(0.45);
    return paymentDecimal.div(number).toFixed(0).toString();
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

    var infoCredits = {
      price: '2000000',
      contribution: '200000',
      timeYears: '5'
    };

    var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (startInfoCredits.price), (startInfoCredits.contribution))), (percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution))), (startInfoCredits.timeYears));

    inputValuePrice.textContent = startInfoCredits.price;
    inputValueContribution.textContent = startInfoCredits.contribution;

    payCradits.textContent = payCraditsCalculator(inputValueContribution, (startInfoCredits.price), (startInfoCredits.contribution));
    percentCreditElement.textContent = percentCreditCalculator((startInfoCredits.price), (startInfoCredits.contribution), isPercentCreditText);
    payMonth.textContent = annuity;
    requiredRevenueElement.textContent = requiredRevenueCompute(annuity);

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;
      infoCredits.price = text;

      // if (text >= '25000000') {
      //   text = '25000000';
      // }
    });

    inputValuePrice.addEventListener('blur', function () {
      annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (infoCredits.price), (infoCredits.contribution))), (percentCreditCalculator((infoCredits.price), (infoCredits.contribution))), (infoCredits.timeYears));
      payCradits.textContent = payCraditsCalculator(inputValueContribution, (infoCredits.price), (infoCredits.contribution));
      percentCreditElement.textContent = percentCreditCalculator((infoCredits.price), (infoCredits.contribution), isPercentCreditText);
      payMonth.textContent = annuity;
      requiredRevenueElement.textContent = requiredRevenueCompute(annuity);
    });
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
  };
})();
