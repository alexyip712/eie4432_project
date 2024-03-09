function calculatePrice() {
  var selectedPrice = document.querySelector('input[name="size"]:checked').value;
  var price = 0;

  if (selectedPrice === 'Medium') {
    price = 300;
  }

  document.getElementById('price').innerHTML = price;
}
function selectSeat(seatNumber) {
  var text = document.getElementById('selseat');
  text.innerText = 'You are selecting: Seat ' + seatNumber;
}

$(document).ready(function () {
  $('#event').change(function () {
    var value = $(this).val();

    if (value === 'Queen') {
      $('#seatsQueen').removeClass('d-none');
      $('#seats2').addClass('d-none');
    } else if (value === '2') {
      $('#seats2').removeClass('d-none');
      $('#seatsQueen').addClass('d-none');
    } else if (value === 'default') {
      $('#seatsQueen').addClass('d-none');
      $('#seats2').addClass('d-none');
    }
  });
});
