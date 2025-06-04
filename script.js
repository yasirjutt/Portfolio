// Theme toggle functionality
    document.addEventListener('DOMContentLoaded', () => {
      const toggleBtn = document.getElementById('toggle-theme');
      
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        toggleBtn.textContent = isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode';
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        });
      });

      // Scroll animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
      });

      // Form submission
      document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.type || !data.message) {
          alert('Please fill in all required fields.');
          return;
        }
        
        // Show success message (in real app, you'd send this to a server)
        alert('Thank you for your message! I\'ll get back to you soon. 🚀');
        
        // Reset form
        this.reset();
        
        // Add some visual feedback
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent! ✅';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
        }, 3000);
      });

      // Add floating animation to skill items
      const skillItems = document.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease-out both';
      });

      // Add parallax effect to floating shapes
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shapes');
        
        shapes.forEach((shape, index) => {
          const speed = (index + 1) * 0.1;
          shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    });
