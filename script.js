document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-theme');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply the saved theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = 'Switch to Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    toggleBtn.textContent = 'Switch to Dark Mode';
  }

  // Theme toggle functionality
  toggleBtn.addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = 'Switch to Dark Mode';
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = 'Switch to Light Mode';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});
