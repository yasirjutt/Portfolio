document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle with improved logic
  const toggleBtn = document.getElementById('toggle-theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Set initial theme
  const setTheme = (theme) => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    toggleBtn.textContent = theme === 'dark' 
      ? 'Switch to Light Mode' 
      : 'Switch to Dark Mode';
    localStorage.setItem('theme', theme);
    
    // Update meta theme color
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.content = theme === 'dark' ? '#0f172a' : '#f8fafc';
    }
  };

  // Check for saved theme or preferred scheme
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  setTheme(currentTheme);

  // Theme toggle button
  toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Enhanced smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      // Calculate offset based on header height
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Add focus state for accessibility
      setTimeout(() => {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }, 1000);
    });
  });

  // Professional intersection observer with delays
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('section-animate');
        }, 150 * index);
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  // Observe sections
  document.querySelectorAll('section').forEach((section, i) => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Skill cards animation
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
        }, 50 * index);
      }
    });
  });

  document.querySelectorAll('.skills li').forEach(skill => {
    skill.style.transform = 'translateY(20px)';
    skill.style.opacity = '0';
    skill.style.transition = 'transform 0.6s var(--transition), opacity 0.6s var(--transition)';
    skillObserver.observe(skill);
  });

  // Add meta theme color tag if not exists
  if (!document.querySelector('meta[name="theme-color"]')) {
    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = currentTheme === 'dark' ? '#0f172a' : '#f8fafc';
    document.head.appendChild(meta);
  }
});
