'use strict';
$(document).ready(function () {
  $('.step-one__select').selectize({
    create: true,
    sortField: 'text'
  });
  $('.step-one__select-item--page').selectize({
    hideSelected: true
  });
});
