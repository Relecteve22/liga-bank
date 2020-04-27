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
