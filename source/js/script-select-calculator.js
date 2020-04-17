'use strict';
// $('.step-one__select').selectize();

$('.step-one__select').selectize({
  onChange: function (value) {
    window.сalculator.selectedOption();
    if (value === '1') {
      console.log('1');
    }

    if (value === '2') {
      console.log('2');
    }

    if (value === '3') {
      console.log('3');
    }
  }
});
