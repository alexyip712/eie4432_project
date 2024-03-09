$(document).ready(function () {
  $('#event').change(function () {
    var value = $(this).val();

    if (value === 'tw') {
      $('#seatstw').removeClass('d-none');
      $('#seatshk').addClass('d-none');
    } else if (value === 'hk') {
      $('#seatshk').removeClass('d-none');
      $('#seatstw').addClass('d-none');
    } else if (value === 'default') {
      $('#seatstw').addClass('d-none');
      $('#seatshk').addClass('d-none');
    }
  });
});
