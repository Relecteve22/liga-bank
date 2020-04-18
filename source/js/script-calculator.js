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
  var maternityСapital = '470000';

  var ourOfferCalculator = function () {

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

    var payCraditsCalculator = function (valuePriceElement, valueContributionElement) {
      var valuePrice = valuePriceElement.textContent;
      var valueContribution = valueContributionElement.textContent;
      var valuePriceReturn = valuePrice;

      if (inputValueContribution) {
        valuePriceReturn = valuePrice - valueContribution;
      };

      if (checkboxMaternityСapital.checked) {
        valuePriceReturn = valuePrice - valueContribution - maternityСapital;
      };

      return valuePriceReturn;
    };

    // payCradits.textContent = payCraditsCalculator(inputValuePrice, inputValueContribution);

    var percentCreditCalculator = function () {
      if (inputValueContribution.textContent < (inputValuePrice.textContent * 0.15)) {
        percentCredit.textContent = '9,40';
      }
      if (inputValueContribution.textContent >= (inputValuePrice.textContent * 0.15)) {
        percentCredit.textContent = '8,50';
      }
    };

    // payCraditsCalculator();
    percentCreditCalculator();
  };

  var selectedOptionMortgage = function () {
    var startInfoCredits = {
      price: '2000000',
      contribution: '200000'
    };
    inputValuePrice.textContent = startInfoCredits.price;
    inputValueContribution.textContent = startInfoCredits.contribution;
    // var loanAmount = 0;
    // var annuityPayment = 0;
    // payMonth.textContent = annuityPayment;
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage
  };
})();
