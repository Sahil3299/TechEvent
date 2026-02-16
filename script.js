  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Countdown Timer
  const eventDate = new Date("March 25, 2026 10:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff < 0) {
      document.getElementById("countdown").innerHTML = `
        <div class="countdown-item" style="width: 100%;">
          <span class="number">Event Started!</span>
        </div>
      `;
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = d.toString().padStart(2, '0');
    document.getElementById("hours").textContent = h.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = m.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = s.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Scroll Animations
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));

  // Modal Functions
  function openModal() {
    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
    // Reset form after closing
    setTimeout(() => {
      document.getElementById('registration-form').style.display = 'block';
      document.getElementById('success-message').classList.remove('show');
      document.getElementById('registration-form').reset();
    }, 300);
  }

  // Close modal on outside click
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) {
      closeModal();
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Handle Registration Form Submit
  function handleRegistration(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      id: generateRegistrationId(),
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      college: document.getElementById('college').value,
      track: document.getElementById('track').value,
      timestamp: new Date().toISOString()
    };

    // Simulate form submission
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Store data in localStorage
      saveRegistrationData(formData);
      
      // Show success message
      document.getElementById('registration-form').style.display = 'none';
      document.getElementById('success-message').classList.add('show');
      
      // Show toast notification with registration ID
      showToast(`Welcome ${formData.name}! Your Registration ID: ${formData.id}`);
      
      // Log to console for verification
      console.log('Registration saved:', formData);
      console.log('All registrations:', getAllRegistrations());
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }

  // Generate unique registration ID
  function generateRegistrationId() {
    const prefix = 'TF2026';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  // Save registration data to localStorage
  function saveRegistrationData(data) {
    // Get existing registrations from localStorage
    let registrations = JSON.parse(localStorage.getItem('techfest_registrations')) || [];
    
    // Add new registration
    registrations.push(data);
    
    // Save back to localStorage
    localStorage.setItem('techfest_registrations', JSON.stringify(registrations));
  }

  // Get all registrations from localStorage
  function getAllRegistrations() {
    return JSON.parse(localStorage.getItem('techfest_registrations')) || [];
  }

  // Get registration count
  function getRegistrationCount() {
    return getAllRegistrations().length;
  }

  // Clear all registrations (for testing)
  function clearAllRegistrations() {
    localStorage.removeItem('techfest_registrations');
    console.log('All registrations cleared');
  }

  // Highlight Card Info
  const highlightInfo = {
    hackathon: {
      title: 'Hackathon',
      message: 'Join our 24-hour hackathon! Form teams of up to 4 members and build innovative solutions. Prizes worth $50,000!'
    },
    ai: {
      title: 'AI Workshops',
      message: 'Learn from industry experts about Machine Learning, Deep Learning, and AI. Hands-on sessions and certifications!'
    },
    concert: {
      title: 'Live Concert',
      message: 'Enjoy performances by top artists and bands. Dance the night away with your friends!'
    },
    food: {
      title: 'Food Festival',
      message: 'Savor cuisines from around the world. From street food to fine dining, we have it all!'
    },
    startup: {
      title: 'Startup Expo',
      message: 'Showcase your startup to investors. Network with founders and venture capitalists!'
    },
    gaming: {
      title: 'Gaming Zone',
      message: 'Compete in esports tournaments. Experience the latest games and VR technologies!'
    }
  };

  function showHighlightInfo(type) {
    const info = highlightInfo[type];
    if (info) {
      showToast(`${info.title}: ${info.message}`);
    }
  }

  // Toast Notification
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Add smooth reveal animation to cards on hover
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Parallax effect for hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  });

  console.log('TechFest 2026 website loaded successfully!');
