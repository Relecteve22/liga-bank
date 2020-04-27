'use strict';

(function () {
  var ourOffer = document.querySelector('.our-offer');
  var stepTwo = document.querySelector('.step-two');
  var payCradits = document.querySelector('.list-offers__item-text-pay--js');
  var inputValueContribution = document.querySelector('.list-step-two__item-input-value--contribution');
  var checkboxMaternityСapital = document.querySelector('.list-step-two__checkbox--additional');
  var checkboxCASCO = document.querySelector('.list-step-two__checkbox--CASCO');
  var checkboxInsuranceLife = document.querySelector('.list-step-two__checkbox--insurance-life');
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
  var rangeInputContribution = document.querySelector('.range__input--contribution');
  var rangeText = document.querySelector('.range__text--js-contribution');
  var rangeInputYearsCredit = document.querySelector('.range__input--yearsCredit');
  var rangeInputElements = document.querySelectorAll('.range__input');
  var titleTypeElement = document.querySelector('.list-step-two__item-title-type');
  var rangeTextStartElement = document.querySelector('.range__wrapper-text-start .range__value');
  var rangeTextFinishElement = document.querySelector('.range__wrapper-text-finish .range__value');
  var checkboxsIf = document.querySelectorAll('.list-step-two__checkbox');
  var labelElements = document.querySelectorAll('.list-step-two__additional');
  var maternityСapitalElement = document.querySelector('.list-step-two__additional--maternity-capital');
  var cascoElement = document.querySelector('.list-step-two__additional--CASCO');
  var insuranceLifeElement = document.querySelector('.list-step-two__additional--insurance-life');
  var textAmountElement = document.querySelector('.list-offers__item-text-amount--js');
  var beforeTitleElement = document.querySelector('.list-step-two__item-title');

  var maternityСapital = 470000;

  var monthInYear = 12;

  var isPercentCreditText = true;
  var isFormNoValid = false;

  var rangePercent = {
    min: 10,
    max: 100
  }

  var infoCreditsOurOffers = {
    amount: 0,
    contributionNumber: 0,
    amountFromMounth: 0,
    minAmount: 0
  };

  var isFormNoValidCheck = function (formNoValid, input) {
    if (formNoValid) {
      // input.setCustomValidity('Некорректное значение');
    }
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

  var percentCreditCalculator = function (valuePrice, valueContribution, forText, isMaternityСapital, isCASCO) {
    var sum = 0;
    if (isMaternityСapital) {
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
    }
    if (isCASCO) {
      if (valuePrice < 2000000) {
        sum = 0.16;
        if (forText === true) {
          sum = '16';
        }
      }

      if (valuePrice >= 2000000) {
        sum = 0.15;
        if (forText === true) {
          sum = '15';
        }
      }

      if (checkboxCASCO.checked || checkboxInsuranceLife.checked) {
        sum = 0.085;
        if (forText === true) {
          sum = '8,50';
        }
      };

      if (checkboxCASCO.checked && checkboxInsuranceLife.checked) {
        sum = 0.035;
        if (forText === true) {
          sum = '3,50';
        }
      };
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
    var startInfoCreditsText = {
      title: 'недвижимости',
      textAmountElement: 'Сумма ипотеки'
    };

    var startInfoCredits = {
      price: 2000000,
      minPrice: 1200000,
      maxPrice: 25000000,
      contribution: 200000,
      contributionNumber: 10,
      minContributionNumber: 10,
      maxContributionNumber: 100,
      timeYears: 5,
      minTimeYears: 5,
      maxTimeYears: 30,
      step: 100000,
      minCreditAmount: 500000,
      maternityCapital: 470000
    };

    var infoCredits = {
      price: 2000000,
      contribution: 200000,
      contributionNumber: 10,
      timeYears: 5
    };

    var minInputValueContribution = infoCredits.price * infoCredits.contributionNumber / 100;

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
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution), false, true)), (obj.timeYears));
      infoCreditsOurOffers.amount = payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution));
      infoCreditsOurOffers.contributionNumber = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText, true);
      infoCreditsOurOffers.amountFromMounth = Number(annuity);
      infoCreditsOurOffers.minAmount = Number(requiredRevenueCompute(annuity));
      payCradits.textContent = infoCreditsOurOffers.amount.toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = infoCreditsOurOffers.amountFromMounth.toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      isMinAmoutCredit();
      isAmoutCredit();
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    maternityСapitalElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = startInfoCredits.contribution;
    minPriceElement.textContent = startInfoCredits.minPrice.toLocaleString();
    maxPriceElement.textContent = startInfoCredits.maxPrice.toLocaleString();
    timeCredit.textContent = startInfoCredits.timeYears;
    titleTypeElement.textContent = startInfoCreditsText.title;
    rangeInputContribution.min = startInfoCredits.minContributionNumber;
    rangeInputContribution.value = startInfoCredits.minContributionNumber;
    rangeInputContribution.max = startInfoCredits.maxContributionNumber;
    rangeInputYearsCredit.min = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.value = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.max = startInfoCredits.maxTimeYears;
    rangeText.textContent = infoCredits.contributionNumber;
    rangeTextStartElement.textContent = startInfoCredits.minTimeYears;
    rangeTextFinishElement.textContent = startInfoCredits.maxTimeYears;
    textAmountElement.textContent = startInfoCreditsText.textAmountElement;
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.price = Number(text);
        inputValuePrice.textContent = Number(text);
        infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
        inputValuePrice.textContent = infoCredits.price;
      } else {
        inputValuePrice.textContent = infoCredits.price;
        isFormNoValid = true;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      inputValuePrice.textContent = Number(text);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValuePrice.textContent = infoCredits.price;
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.contribution = text;
        inputValueContribution.textContent = infoCredits.contribution;
      } else {
        inputValueContribution.textContent = infoCredits.contribution;
        isFormNoValid = true;
      }

      if (text >= minInputValueContribution && text <= infoCredits.price) {
        var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
        var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
        infoCredits.contributionNumber = rangeTextDinamyc;
        rangeText.textContent = infoCredits.contributionNumber;
        rangeInputContribution.value = infoCredits.contributionNumber;
      }
    });

    inputValueContribution.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= minInputValueContribution) {
        infoCredits.contribution = minInputValueContribution;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.min;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
      if (!isNaN(text) && text >= infoCredits.price) {
        infoCredits.contribution = infoCredits.price;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.max;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
    });

    timeCredit.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.timeYears = text;
        timeCredit.textContent = infoCredits.timeYears;
      } else {
        timeCredit.textContent = infoCredits.timeYears;
        isFormNoValid = true;
      }

      if (text >= startInfoCredits.minTimeYears && text <= startInfoCredits.maxTimeYears) {
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    timeCredit.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minTimeYears) {
        infoCredits.timeYears = startInfoCredits.minTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
      if (!isNaN(text) && text >= startInfoCredits.maxTimeYears) {
        infoCredits.timeYears = startInfoCredits.maxTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    rangeInputContribution.addEventListener('change', function () {
      infoCredits.contributionNumber = rangeInputContribution.value;
      rangeText.textContent = rangeInputContribution.value;
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;
    });

    rangeInputYearsCredit.addEventListener('change', function () {
      infoCredits.timeYears = rangeInputYearsCredit.value;
      timeCredit.textContent = infoCredits.timeYears;
    });

    Array.prototype.forEach.call(rangeInputElements, function (rangeInputElement) {
      rangeInputElement.addEventListener('change', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(inputsValue, function (inputValue) {
      inputValue.addEventListener('input', (evt) => {
        isFormNoValidCheck(isFormNoValid, evt.target);
        calculatorCompute(infoCredits);
      });
      inputValue.addEventListener('blur', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(checkboxsIf, function (checkboxIf) {
      checkboxIf.addEventListener('change', function () {
        calculatorCompute(infoCredits);
      });
    });
  };

  var selectedOptionCarCredit = function () {
    var startInfoCreditsText = {
      title: 'автомобиля',
      textAmountElement: 'Сумму автокредита'
    };

    var startInfoCredits = {
      price: 2000000,
      minPrice: 500000,
      maxPrice: 5000000,
      contribution: 400000,
      contributionNumber: 20,
      minContributionNumber: 20,
      maxContributionNumber: 100,
      timeYears: 1,
      minTimeYears: 1,
      maxTimeYears: 5,
      step: 50000,
      minCreditAmount: 200000
    };

    var infoCredits = {
      price: 2000000,
      contribution: 400000,
      contributionNumber: 20,
      timeYears: 5
    };

    var minInputValueContribution = infoCredits.price * infoCredits.contributionNumber / 100;

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
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution), false, false, true)), (obj.timeYears));
      infoCreditsOurOffers.amount = payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution));
      infoCreditsOurOffers.contributionNumber = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText, false, true);
      infoCreditsOurOffers.amountFromMounth = Number(annuity);
      infoCreditsOurOffers.minAmount = Number(requiredRevenueCompute(annuity));
      payCradits.textContent = infoCreditsOurOffers.amount.toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = infoCreditsOurOffers.amountFromMounth.toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      isMinAmoutCredit();
      isAmoutCredit();
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    cascoElement.classList.remove('list-step-two__additional--none');
    insuranceLifeElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = startInfoCredits.contribution;
    minPriceElement.textContent = startInfoCredits.minPrice.toLocaleString();
    maxPriceElement.textContent = startInfoCredits.maxPrice.toLocaleString();
    timeCredit.textContent = startInfoCredits.timeYears;
    titleTypeElement.textContent = startInfoCreditsText.title;
    rangeInputContribution.min = startInfoCredits.minContributionNumber;
    rangeInputContribution.value = startInfoCredits.minContributionNumber;
    rangeInputContribution.max = startInfoCredits.maxContributionNumber;
    rangeInputYearsCredit.min = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.value = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.max = startInfoCredits.maxTimeYears;
    rangeText.textContent = infoCredits.contributionNumber;
    rangeTextStartElement.textContent = startInfoCredits.minTimeYears;
    rangeTextFinishElement.textContent = startInfoCredits.maxTimeYears;
    textAmountElement.textContent = startInfoCreditsText.textAmountElement;
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        inputValuePrice.textContent = Number(text);
      }
      if (text >= startInfoCredits.minPrice && text <= startInfoCredits.maxPrice) {
        infoCredits.price = Number(text);
        infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      } else {
        inputValuePrice.textContent = infoCredits.price;
        isFormNoValid = true;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      inputValuePrice.textContent = Number(text);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValuePrice.textContent = infoCredits.price;
    });

    rangeInputContribution.addEventListener('change', function () {
      infoCredits.contributionNumber = rangeInputContribution.value;
      rangeText.textContent = rangeInputContribution.value;
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = Number(text);
        infoCredits.contribution = text;
        inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
      } else {
        inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
        isFormNoValid = true;
      }

      if (text >= minInputValueContribution && text <= infoCredits.price) {
        var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
        var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
        infoCredits.contributionNumber = rangeTextDinamyc;
        rangeText.textContent = infoCredits.contributionNumber;
        rangeInputContribution.value = infoCredits.contributionNumber;
      }
    });

    inputValueContribution.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= minInputValueContribution) {
        infoCredits.contribution = minInputValueContribution;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.min;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
      if (!isNaN(text) && text >= infoCredits.price) {
        infoCredits.contribution = infoCredits.price;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.max;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
    });

    rangeInputYearsCredit.addEventListener('change', function () {
      infoCredits.timeYears = rangeInputYearsCredit.value;
      timeCredit.textContent = infoCredits.timeYears;
    });

    timeCredit.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.timeYears = text;
        timeCredit.textContent = infoCredits.timeYears;
      } else {
        timeCredit.textContent = infoCredits.timeYears;
        isFormNoValid = true;
      }

      if (text >= startInfoCredits.minTimeYears && text <= startInfoCredits.maxTimeYears) {
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    timeCredit.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minTimeYears) {
        infoCredits.timeYears = startInfoCredits.minTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
      if (!isNaN(text) && text >= startInfoCredits.maxTimeYears) {
        infoCredits.timeYears = startInfoCredits.maxTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    Array.prototype.forEach.call(rangeInputElements, function (rangeInputElement) {
      rangeInputElement.addEventListener('change', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(inputsValue, function (inputValue) {
      inputValue.addEventListener('input', (evt) => {
        // isFormNoValidCheck(isFormNoValid, evt.target);
        calculatorCompute(infoCredits);
      });
      inputValue.addEventListener('blur', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(checkboxsIf, function (checkboxIf) {
      checkboxIf.addEventListener('change', function () {
        calculatorCompute(infoCredits);
      });
    });
  };

  var selectedOptionCredit = function () {
    var startInfoCreditsText = {
      beforeTitle: 'Сумма ',
      title: 'потребительского кредита',
      textAmountElement: 'Сумму автокредита'
    };

    var startInfoCredits = {
      price: 2000000,
      minPrice: 500000,
      maxPrice: 5000000,
      contribution: 400000,
      contributionNumber: 20,
      minContributionNumber: 20,
      maxContributionNumber: 100,
      timeYears: 1,
      minTimeYears: 1,
      maxTimeYears: 5,
      step: 50000,
      minCreditAmount: 200000
    };

    var infoCredits = {
      price: 2000000,
      contribution: 400000,
      contributionNumber: 20,
      timeYears: 5
    };

    var minInputValueContribution = infoCredits.price * infoCredits.contributionNumber / 100;

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
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution), false, false, true)), (obj.timeYears));
      infoCreditsOurOffers.amount = payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution));
      infoCreditsOurOffers.contributionNumber = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText, false, true);
      infoCreditsOurOffers.amountFromMounth = Number(annuity);
      infoCreditsOurOffers.minAmount = Number(requiredRevenueCompute(annuity));
      payCradits.textContent = infoCreditsOurOffers.amount.toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = infoCreditsOurOffers.amountFromMounth.toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      isMinAmoutCredit();
      isAmoutCredit();
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    cascoElement.classList.remove('list-step-two__additional--none');
    insuranceLifeElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = startInfoCredits.contribution;
    minPriceElement.textContent = startInfoCredits.minPrice.toLocaleString();
    maxPriceElement.textContent = startInfoCredits.maxPrice.toLocaleString();
    timeCredit.textContent = startInfoCredits.timeYears;
    titleTypeElement.textContent = startInfoCreditsText.title;
    rangeInputContribution.min = startInfoCredits.minContributionNumber;
    rangeInputContribution.value = startInfoCredits.minContributionNumber;
    rangeInputContribution.max = startInfoCredits.maxContributionNumber;
    rangeInputYearsCredit.min = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.value = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.max = startInfoCredits.maxTimeYears;
    rangeText.textContent = infoCredits.contributionNumber;
    rangeTextStartElement.textContent = startInfoCredits.minTimeYears;
    rangeTextFinishElement.textContent = startInfoCredits.maxTimeYears;
    textAmountElement.textContent = startInfoCreditsText.textAmountElement;
    beforeTitleElement.textContent = startInfoCreditsText.beforeTitle;
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        inputValuePrice.textContent = Number(text);
      }
      if (text >= startInfoCredits.minPrice && text <= startInfoCredits.maxPrice) {
        infoCredits.price = Number(text);
        infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      } else {
        inputValuePrice.textContent = infoCredits.price;
        isFormNoValid = true;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      inputValuePrice.textContent = Number(text);
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValuePrice.textContent = infoCredits.price;
    });

    rangeInputContribution.addEventListener('change', function () {
      infoCredits.contributionNumber = rangeInputContribution.value;
      rangeText.textContent = rangeInputContribution.value;
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution;
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.contribution = text;
        inputValueContribution.textContent = infoCredits.contribution;
      } else {
        inputValueContribution.textContent = infoCredits.contribution;
        isFormNoValid = true;
      }

      if (text >= minInputValueContribution && text <= infoCredits.price) {
        var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
        var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
        infoCredits.contributionNumber = rangeTextDinamyc;
        rangeText.textContent = infoCredits.contributionNumber;
        rangeInputContribution.value = infoCredits.contributionNumber;
      }
    });

    inputValueContribution.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= minInputValueContribution) {
        infoCredits.contribution = minInputValueContribution;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.min;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
      if (!isNaN(text) && text >= infoCredits.price) {
        infoCredits.contribution = infoCredits.price;
        inputValueContribution.textContent = infoCredits.contribution;
        infoCredits.contributionNumber = rangePercent.max;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }
    });

    rangeInputYearsCredit.addEventListener('change', function () {
      infoCredits.timeYears = rangeInputYearsCredit.value;
      timeCredit.textContent = infoCredits.timeYears;
    });

    timeCredit.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.timeYears = text;
        timeCredit.textContent = infoCredits.timeYears;
      } else {
        timeCredit.textContent = infoCredits.timeYears;
        isFormNoValid = true;
      }

      if (text >= startInfoCredits.minTimeYears && text <= startInfoCredits.maxTimeYears) {
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    timeCredit.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text) && text <= startInfoCredits.minTimeYears) {
        infoCredits.timeYears = startInfoCredits.minTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
      if (!isNaN(text) && text >= startInfoCredits.maxTimeYears) {
        infoCredits.timeYears = startInfoCredits.maxTimeYears;
        timeCredit.textContent = infoCredits.timeYears;
        rangeInputYearsCredit.value = infoCredits.timeYears;
      }
    });

    Array.prototype.forEach.call(rangeInputElements, function (rangeInputElement) {
      rangeInputElement.addEventListener('change', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(inputsValue, function (inputValue) {
      inputValue.addEventListener('input', (evt) => {
        // isFormNoValidCheck(isFormNoValid, evt.target);
        calculatorCompute(infoCredits);
      });
      inputValue.addEventListener('blur', () => {
        calculatorCompute(infoCredits);
      });
    });

    Array.prototype.forEach.call(checkboxsIf, function (checkboxIf) {
      checkboxIf.addEventListener('change', function () {
        calculatorCompute(infoCredits);
      });
    });
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage,
    selectedOptionCarCredit: selectedOptionCarCredit,
    selectedOptionCredit: selectedOptionCredit
  };
})();
