document.addEventListener('DOMContentLoaded', () => {
  const login = document.getElementById('login-button');

  login.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert(`Logged as ${data.user.username} (${data.user.role})`);
        window.open('/index.html', '_self');
      } else if (data.message) {
        alert(data.message);
      } else {
        alert('Unknown error');
      }
    } catch (error) {
      console.error(error);
    }
  });
});
