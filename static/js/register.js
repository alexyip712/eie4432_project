document.addEventListener('DOMContentLoaded', () => {
  const register = document.getElementById('register-button');

  register.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const repeat = document.getElementById('repeat').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const birthdate = document.getElementById('birthdate').value;

    if (!username || !nickname || !password || !email || !birthdate || !repeat) {
      alert('Everything should be filled!');
      return;
    }

    if (password != repeat) {
      alert('Password mismatch!');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('nickname', nickname);
    formData.append('password', password);
    formData.append('repeat', repeat);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('role', 'user');

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert(`Welcome, ${data.user.username}! \n You can login with your account now!`);
        window.open('/login.html', '_self');
      } else if (data.message) {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  });
});
