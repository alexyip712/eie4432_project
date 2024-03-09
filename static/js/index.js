document.addEventListener('DOMContentLoaded', () => {
  fetch('/auth/me')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API request failed');
      }
    })
    .then((data) => {
      console.log(data);
      const greeting = document.getElementById('greeting');
      greeting.textContent = `${data.user.username} (${data.user.role})`;
    })
    .catch((error) => {
      alert('Please login');
      window.open('/eie4432_project/static/login.html', '_self');
    });

  const logout = document.getElementById('logout-button');

  logout.addEventListener('click', async () => {
    const confirm = window.confirm('Confirm to logout?');

    if (confirm) {
      try {
        await fetch('/auth/logout');
        window.open('/eie4432_project/static/login.html', '_self');
      } catch (error) {
        console.error(error);
      }
    }
  });
});
