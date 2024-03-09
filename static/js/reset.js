document.addEventListener('DOMContentLoaded', function () {
  const resetButton = document.getElementById('reset-button');

  resetButton.addEventListener('click', () => {
    const npassword = document.getElementById('newpassword').value;
    const repeatnpass = document.getElementById('repeatnewpassword').value;

    if (!npassword || !repeatnpass) {
      alert('Please fill in all the fields.');
      return;
    }

    const data = {
      status: 'success',
    };

    if (data.status === 'success') {
      alert('New password applied');
      window.open('/login.html', '_self');
    }
  });
});
