/**
 * Brian Omusugu | Professional Developer Portfolio
 * Interactive Scripting (Theme, Smooth Scroll, Reveal, AJAX Contact, Clipboard)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light with LocalStorage)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  const getSavedTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initialize theme
  applyTheme(getSavedTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking outside or clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // 3. Safe Smooth Scrolling for In-Page Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 4. Scroll Reveal Animations with IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal once
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 6. One-Click Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  const copyTooltip = document.getElementById('copy-tooltip');

  if (copyBtn && copyTooltip) {
    copyBtn.addEventListener('click', async () => {
      const email = 'omusugubrian2@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        copyTooltip.textContent = 'Copied!';
        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        // Fallback for clipboard
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        copyTooltip.textContent = 'Copied!';
        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
        }, 2000);
      }
    });
  }

  // 7. Non-blocking AJAX Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formFeedback && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText ? btnText.textContent : 'Send Message';

      // Set Loading state
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      formFeedback.className = 'form-feedback';
      formFeedback.style.display = 'none';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch('https://formsubmit.co/ajax/omusugubrian2@gmail.com', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          formFeedback.textContent = "Thank you! Your message has been sent successfully. I'll get back to you soon.";
          formFeedback.className = 'form-feedback success';
          formFeedback.style.display = 'block';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        formFeedback.textContent = "Oops! Something went wrong while sending your message. Please reach out directly to omusugubrian2@gmail.com.";
        formFeedback.className = 'form-feedback error';
        formFeedback.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = originalText;
      }
    });
  }

  // 8. Dynamic Copyright Year
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});