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
  var labelContributtion = document.querySelector('.list-step-two__item--contributtion');
  var playerProjectElement = document.querySelector('.list-step-two__additional--player-project');
  var playerProjectCheckbox = document.querySelector('.list-step-two__checkbox--player-project');
  var ourOfferButton = document.querySelector('.our-offer__btn');
  var stepThree = document.querySelector('.step-three');
  var applicationNumberElement = document.querySelector('.list-info__item-value--application-number');
  var goalElement = document.querySelector('.list-info__item-value--goal');
  var priceInFormElement = document.querySelector('.list-info__item-value--price');
  var contributionInFormElement = document.querySelector('.list-info__item-value--contribution');
  var timeYearsInFormElement = document.querySelector('.list-info__item-value--time-years');
  var contributionInFormItem = document.querySelector('.list-info__item--contribution');
  var userName = document.querySelector('#name');
  var userTel = document.querySelector('#tel');
  var userEmail = document.querySelector('#email');
  var btnSubmit = document.querySelector('.step-three_btn-submit');
  var form = document.querySelector('.form-post-info');

  var maternityСapital = 470000;

  var monthInYear = 12;
  var numberApplication = 11;

  var isPercentCreditText = true;
  var isFormNoValid = false;
  var isStorageSupport = true;

  var storage = {};
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

  try {
    storage.name = localStorage.getItem('name');
    storage.tel = localStorage.getItem('tel');
    storage.email = localStorage.getItem('email');
    storage.numberApplication = localStorage.getItem('application-number');
  } catch (err) {
    isStorageSupport = false;
  }

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

  var percentCreditCalculator = function (valuePrice, valueContribution, forText, isMaternityСapital, isCASCO, isPlayerProject) {
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
    if (isPlayerProject) {
      if (valuePrice < 750000) {
        sum = 0.15;
        if (forText === true) {
          sum = '15';
        }
      }

      if (valuePrice >= 750000 && valuePrice < 2000000) {
        sum = 0.125;
        if (forText === true) {
          sum = '12,5';
        }
      }

      if (valuePrice >= 2000000) {
        sum = 0.095;
        if (forText === true) {
          sum = '9,5';
        }
      }

      if (playerProjectCheckbox.checked) {
        sum -= 0.005;
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

    if (storage.name) {
      userName.textContent = storage.name;
      userTel.textContent = storage.tel;
      userName.focus();
    } else {
      userTel.focus();
    }

    btnSubmit.addEventListener('click', function () {
      if (isStorageSupport) {
        localStorage.setItem('name', userName.textContent);
        localStorage.setItem('tel', userTel.textContent);
        // localStorage.setItem('email', userEmail.textContent);
      }
    });

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      window.thanksSection.openThanksSection();
      numberApplication += 1;
    });
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
      price: startInfoCredits.price,
      contribution: startInfoCredits.contribution,
      contributionNumber: startInfoCredits.contributionNumber,
      timeYears: startInfoCredits.timeYears
    };

    var infosForStepThree = {
      goal: 'Ипотека',
      price: infoCredits.price,
      contribution: infoCredits.contribution,
      timeYears: infoCredits.timeYears
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
      payCradits.textContent = Number(infoCreditsOurOffers.amount).toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = Number(infoCreditsOurOffers.amountFromMounth).toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      stepThree.classList.add('step-three--none');

      infosForStepThree.price = infoCredits.price;
      infosForStepThree.contribution = infoCredits.contribution;
      infosForStepThree.timeYears = infoCredits.timeYears;

      isMinAmoutCredit();
      isAmoutCredit();
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    maternityСapitalElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = Number(startInfoCredits.contribution).toLocaleString();
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
    labelContributtion.classList.remove('list-step-two__item--contributtion-none');
    contributionInFormItem.classList.remove('list-info__item--contribution-none');
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = Number(infoCredits.contribution).toLocaleString();

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      if (infoCredits.price >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      if (infoCredits.price <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('click', (evt) => {
      var text = evt.target.textContent;
      inputValuePrice.textContent = text.replace(/\s/g, '');
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = text.replace(/\s/g, '');
        inputValuePrice.textContent = text;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.price = text;
      }

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
    });

    inputValueContribution.addEventListener('click', (evt) => {
      var text = evt.target.textContent;
      inputValueContribution.textContent = text.replace(/\s/g, '');
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = text.replace(/\s/g, '');
        inputValueContribution.textContent = text;
      }

      // if (!isNaN(text)) {
      //   infoCredits.contribution = text;
      //   inputValueContribution.textContent = infoCredits.contribution;
      // } else {
      //   inputValueContribution.textContent = infoCredits.contribution;
      //   isFormNoValid = true;
      // }

      // if (text >= minInputValueContribution && text <= infoCredits.price) {
      //   var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
      //   var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
      //   infoCredits.contributionNumber = rangeTextDinamyc;
      //   rangeText.textContent = infoCredits.contributionNumber;
      //   rangeInputContribution.value = infoCredits.contributionNumber;
      // }
    });

    inputValueContribution.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.contribution = text;
      }

      if (text >= minInputValueContribution && text <= infoCredits.price) {
        var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
        var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
        infoCredits.contributionNumber = rangeTextDinamyc;
        rangeText.textContent = infoCredits.contributionNumber;
        rangeInputContribution.value = infoCredits.contributionNumber;
      }

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

      inputValueContribution.textContent = Number(infoCredits.contribution).toLocaleString();
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
      inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
    });

    rangeInputYearsCredit.addEventListener('change', function () {
      infoCredits.timeYears = rangeInputYearsCredit.value;
      timeCredit.textContent = infoCredits.timeYears.toLocaleString();
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

    ourOfferButton.addEventListener('click', function () {
      stepThree.classList.remove('step-three--none');

      applicationNumberElement.textContent = '00' + numberApplication + '';
      goalElement.textContent = infosForStepThree.goal;
      priceInFormElement.textContent = infosForStepThree.price.toLocaleString();
      contributionInFormElement.textContent = infosForStepThree.contribution.toLocaleString();
      timeYearsInFormElement.textContent = infosForStepThree.timeYears;
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
      price: startInfoCredits.price,
      contribution: startInfoCredits.contribution,
      contributionNumber: startInfoCredits.contributionNumber,
      timeYears: startInfoCredits.timeYears
    };

    var infosForStepThree = {
      goal: 'Автокредит',
      price: infoCredits.price,
      contribution: infoCredits.contribution,
      timeYears: infoCredits.timeYears
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

      stepThree.classList.add('step-three--none');

      infosForStepThree.price = infoCredits.price;
      infosForStepThree.contribution = infoCredits.contribution;
      infosForStepThree.timeYears = infoCredits.timeYears;

      isMinAmoutCredit();
      isAmoutCredit();
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    cascoElement.classList.remove('list-step-two__additional--none');
    insuranceLifeElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    inputValueContribution.textContent = startInfoCredits.contribution.toLocaleString();
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
    labelContributtion.classList.remove('list-step-two__item--contributtion-none');
    contributionInFormItem.classList.remove('list-info__item--contribution-none');
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = Number(infoCredits.contribution).toLocaleString();

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      if (infoCredits.price >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      if (infoCredits.price <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('click', (evt) => {
      var text = evt.target.textContent;
      inputValuePrice.textContent = text.replace(/\s/g, '');
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = text.replace(/\s/g, '');
        inputValuePrice.textContent = text;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.price = text;
      }

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
    });

    // inputValuePrice.addEventListener('input', (evt) => {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text)) {
    //     inputValuePrice.textContent = Number(text);
    //   }
    //   if (text >= startInfoCredits.minPrice && text <= startInfoCredits.maxPrice) {
    //     infoCredits.price = Number(text);
    //     infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
    //   } else {
    //     inputValuePrice.textContent = infoCredits.price;
    //     isFormNoValid = true;
    //   }
    // });

    // inputValuePrice.addEventListener('blur', function (evt) {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text) && text <= startInfoCredits.minPrice) {
    //     infoCredits.price = startInfoCredits.minPrice;
    //     evt.target.textContent = infoCredits.price;
    //   }

    //   if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
    //     infoCredits.price = startInfoCredits.maxPrice;
    //     evt.target.textContent = infoCredits.price;
    //   }

    //   inputValuePrice.textContent = Number(text);
    //   infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
    //   inputValuePrice.textContent = infoCredits.price;
    // });

    inputValueContribution.addEventListener('click', (evt) => {
      var text = evt.target.textContent;
      inputValueContribution.textContent = text.replace(/\s/g, '');
    });

    inputValueContribution.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = text.replace(/\s/g, '');
        inputValueContribution.textContent = text;
      }

      // if (!isNaN(text)) {
      //   infoCredits.contribution = text;
      //   inputValueContribution.textContent = infoCredits.contribution;
      // } else {
      //   inputValueContribution.textContent = infoCredits.contribution;
      //   isFormNoValid = true;
      // }

      // if (text >= minInputValueContribution && text <= infoCredits.price) {
      //   var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
      //   var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
      //   infoCredits.contributionNumber = rangeTextDinamyc;
      //   rangeText.textContent = infoCredits.contributionNumber;
      //   rangeInputContribution.value = infoCredits.contributionNumber;
      // }
    });

    inputValueContribution.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.contribution = text;
      }

      if (text >= minInputValueContribution && text <= infoCredits.price) {
        var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
        var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
        infoCredits.contributionNumber = rangeTextDinamyc;
        rangeText.textContent = infoCredits.contributionNumber;
        rangeInputContribution.value = infoCredits.contributionNumber;
      }

      if (!isNaN(text) && text <= minInputValueContribution) {
        infoCredits.contribution = minInputValueContribution;
        infoCredits.contributionNumber = rangePercent.min;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }

      if (!isNaN(text) && text >= infoCredits.price) {
        infoCredits.contribution = infoCredits.price;
        infoCredits.contributionNumber = rangePercent.max;
        rangeInputContribution.value = infoCredits.contributionNumber;
        rangeText.textContent = infoCredits.contributionNumber;
      }

      inputValueContribution.textContent = Number(infoCredits.contribution).toLocaleString();
    });

    // inputValueContribution.addEventListener('input', (evt) => {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text)) {
    //     text = Number(text);
    //     infoCredits.contribution = text;
    //     inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
    //   } else {
    //     inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
    //     isFormNoValid = true;
    //   }

    //   if (text >= minInputValueContribution && text <= infoCredits.price) {
    //     var infoCreditsContributionDecimal = new Decimal(infoCredits.contribution);
    //     var rangeTextDinamyc = (infoCreditsContributionDecimal.div(infoCredits.price)).div(0.01).toFixed(0);
    //     infoCredits.contributionNumber = rangeTextDinamyc;
    //     rangeText.textContent = infoCredits.contributionNumber;
    //     rangeInputContribution.value = infoCredits.contributionNumber;
    //   }
    // });

    // inputValueContribution.addEventListener('blur', function (evt) {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text) && text <= minInputValueContribution) {
    //     infoCredits.contribution = minInputValueContribution;
    //     inputValueContribution.textContent = infoCredits.contribution;
    //     infoCredits.contributionNumber = rangePercent.min;
    //     rangeInputContribution.value = infoCredits.contributionNumber;
    //     rangeText.textContent = infoCredits.contributionNumber;
    //   }
    //   if (!isNaN(text) && text >= infoCredits.price) {
    //     infoCredits.contribution = infoCredits.price;
    //     inputValueContribution.textContent = infoCredits.contribution;
    //     infoCredits.contributionNumber = rangePercent.max;
    //     rangeInputContribution.value = infoCredits.contributionNumber;
    //     rangeText.textContent = infoCredits.contributionNumber;
    //   }
    // });

    rangeInputContribution.addEventListener('change', function () {
      infoCredits.contributionNumber = rangeInputContribution.value;
      rangeText.textContent = rangeInputContribution.value;
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
    });

    rangeInputYearsCredit.addEventListener('change', function () {
      infoCredits.timeYears = rangeInputYearsCredit.value;
      timeCredit.textContent = infoCredits.timeYears.toLocaleString();
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

    ourOfferButton.addEventListener('click', function () {
      stepThree.classList.remove('step-three--none');

      applicationNumberElement.textContent = '00' + numberApplication + '';
      goalElement.textContent = infosForStepThree.goal;
      priceInFormElement.textContent = infosForStepThree.price.toLocaleString();
      contributionInFormElement.textContent = infosForStepThree.contribution.toLocaleString();
      timeYearsInFormElement.textContent = infosForStepThree.timeYears;
    });
  };

  var selectedOptionCredit = function () {
    var startInfoCreditsText = {
      beforeTitle: 'Сумма ',
      title: 'потребительского кредита',
      textAmountElement: 'Сумма кредита'
    };

    var startInfoCredits = {
      price: 2000000,
      minPrice: 50000,
      maxPrice: 3000000,
      timeYears: 1,
      minTimeYears: 1,
      maxTimeYears: 7,
      step: 50000,
      minCreditAmount: 200000,
      contribution: 0,
    };

    var infoCredits = {
      price: startInfoCredits.price,
      timeYears: startInfoCredits.timeYears
    };

    var infosForStepThree = {
      goal: 'Потребительский кредит',
      price: infoCredits.price,
      timeYears: infoCredits.timeYears
    };

    var calculatorCompute = function (obj) {
      var annuity = annuityCompute((payCraditsCalculator(inputValueContribution, (obj.price), (obj.contribution))), (percentCreditCalculator((obj.price), (obj.contribution), false, false, false, true)), (obj.timeYears));
      infoCreditsOurOffers.amount = obj.price;
      infoCreditsOurOffers.contributionNumber = percentCreditCalculator((obj.price), (obj.contribution), isPercentCreditText, false, false, true);
      infoCreditsOurOffers.amountFromMounth = Number(annuity);
      infoCreditsOurOffers.minAmount = Number(requiredRevenueCompute(annuity));
      payCradits.textContent = infoCreditsOurOffers.amount.toLocaleString();
      percentCreditElement.textContent = infoCreditsOurOffers.contributionNumber;
      payMonth.textContent = infoCreditsOurOffers.amountFromMounth.toLocaleString();
      requiredRevenueElement.textContent = infoCreditsOurOffers.minAmount.toLocaleString();

      stepThree.classList.add('step-three--none');

      infosForStepThree.price = infoCredits.price;
      infosForStepThree.timeYears = infoCredits.timeYears;
    };

    Array.prototype.forEach.call(labelElements, function (labelElement) {
      labelElement.classList.add('list-step-two__additional--none');
    });
    playerProjectElement.classList.remove('list-step-two__additional--none');
    inputValuePrice.textContent = Number(startInfoCredits.price).toLocaleString();
    minPriceElement.textContent = startInfoCredits.minPrice.toLocaleString();
    maxPriceElement.textContent = startInfoCredits.maxPrice.toLocaleString();
    timeCredit.textContent = startInfoCredits.timeYears;
    titleTypeElement.textContent = startInfoCreditsText.title;
    rangeInputYearsCredit.min = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.value = startInfoCredits.minTimeYears;
    rangeInputYearsCredit.max = startInfoCredits.maxTimeYears;
    rangeTextStartElement.textContent = startInfoCredits.minTimeYears;
    rangeTextFinishElement.textContent = startInfoCredits.maxTimeYears;
    textAmountElement.textContent = startInfoCreditsText.textAmountElement;
    beforeTitleElement.textContent = startInfoCreditsText.beforeTitle;
    labelContributtion.classList.add('list-step-two__item--contributtion-none');
    contributionInFormItem.classList.add('list-info__item--contribution-none');
    calculatorCompute(startInfoCredits);

    var plusOrMinusAmountElement = function () {
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = Number(infoCredits.contribution).toLocaleString();

      calculatorCompute(infoCredits);
    };

    plusAmountElement.addEventListener('click', function () {
      infoCredits.price += startInfoCredits.step;
      if (infoCredits.price >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    minusAmountElement.addEventListener('click', function () {
      infoCredits.price -= startInfoCredits.step;
      if (infoCredits.price <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        inputValuePrice.textContent = infoCredits.price;
      }
      plusOrMinusAmountElement();
    });

    inputValuePrice.addEventListener('click', (evt) => {
      var text = evt.target.textContent;
      inputValuePrice.textContent = text.replace(/\s/g, '');
    });

    inputValuePrice.addEventListener('input', (evt) => {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        text = text.replace(/\s/g, '');
        inputValuePrice.textContent = text;
      }
    });

    inputValuePrice.addEventListener('blur', function (evt) {
      var text = evt.target.textContent;

      if (!isNaN(text)) {
        infoCredits.price = text;
      }

      if (!isNaN(text) && text <= startInfoCredits.minPrice) {
        infoCredits.price = startInfoCredits.minPrice;
        evt.target.textContent = infoCredits.price;
      }

      if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
        infoCredits.price = startInfoCredits.maxPrice;
        evt.target.textContent = infoCredits.price;
      }

      infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
      inputValueContribution.textContent = infoCredits.contribution.toLocaleString();
      inputValuePrice.textContent = Number(infoCredits.price).toLocaleString();
    });

    // inputValuePrice.addEventListener('input', (evt) => {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text)) {
    //     inputValuePrice.textContent = Number(text);
    //   }
    //   if (text >= startInfoCredits.minPrice && text <= startInfoCredits.maxPrice) {
    //     infoCredits.price = Number(text);
    //     infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
    //   } else {
    //     inputValuePrice.textContent = infoCredits.price;
    //     isFormNoValid = true;
    //   }
    // });

    // inputValuePrice.addEventListener('blur', function (evt) {
    //   var text = evt.target.textContent;

    //   if (!isNaN(text) && text <= startInfoCredits.minPrice) {
    //     infoCredits.price = startInfoCredits.minPrice;
    //     evt.target.textContent = infoCredits.price;
    //   }

    //   if (!isNaN(text) && text >= startInfoCredits.maxPrice) {
    //     infoCredits.price = startInfoCredits.maxPrice;
    //     evt.target.textContent = infoCredits.price;
    //   }

    //   inputValuePrice.textContent = Number(text);
    //   infoCredits.contribution = infoCredits.price * infoCredits.contributionNumber / 100;
    //   inputValuePrice.textContent = infoCredits.price;
    // });

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

    ourOfferButton.addEventListener('click', function () {
      stepThree.classList.remove('step-three--none');

      applicationNumberElement.textContent = '00' + numberApplication + '';
      goalElement.textContent = infosForStepThree.goal;
      priceInFormElement.textContent = infosForStepThree.price.toLocaleString();
      timeYearsInFormElement.textContent = infosForStepThree.timeYears;
    });
  };

  window.сalculator = {
    selectedOption: selectedOption,
    selectedOptionMortgage: selectedOptionMortgage,
    selectedOptionCarCredit: selectedOptionCarCredit,
    selectedOptionCredit: selectedOptionCredit,
    stepThree: stepThree
  };
})();

'use strict';

(function () {
  var maskedInputs = document.querySelectorAll('input[data-inputmask]');

  var applyMask = function () {
    Array.prototype.forEach.call(maskedInputs, function (input) {
      var maskOption = {
        mask: input.getAttribute('data-inputmask')
      };
      IMask(input, maskOption);
    });
  };

  applyMask();
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
      window.сalculator.selectedOptionMortgage();
    }

    if (value === '2') {
      window.сalculator.selectedOptionCarCredit();
    }

    if (value === '3') {
      window.сalculator.selectedOptionCredit();
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
