document.addEventListener('DOMContentLoaded', function () {
  const payButton = document.getElementById('pay-button');

  payButton.addEventListener('click', () => {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiration = document.getElementById('cardExpiration').value;
    const cardCVV = document.getElementById('cardCVV').value;

    if (!cardNumber || !cardExpiration || !cardCVV) {
      alert('Please fill in all the fields.');
      return;
    }

    if (cardNumber.length !== 16) {
      alert('Invalid card number!');
      return;
    }

    if (cardCVV.length !== 3) {
      alert('Invalid CVV!');
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
    const currentYear = currentDate.getFullYear();

    const expirationDate = new Date(cardExpiration + '/1'); // Appending '/1' to convert month to a complete date
    const expirationMonth = expirationDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month
    const expirationYear = expirationDate.getFullYear();

    if (expirationYear < currentYear || (expirationYear === currentYear && expirationMonth < currentMonth)) {
      alert('Card has expired!');
      return;
    }

    const data = {
      status: 'success',
    };

    if (data.status === 'success') {
      alert('Payment successful!');
      window.open('/book.html', '_self');
    }
  });
});
