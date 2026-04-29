document.addEventListener('DOMContentLoaded', () => {
  initHeroSequence();
  initScrollAnimations();
  initTestimonialsCarousel();
  initModal();
  initDestinationModal();
  initMobileMenu();
  initLocationFetcher();
  initFareEstimator();
  initFAQAccordion();
});

function initLocationFetcher() {
  const locBtn = document.getElementById('get-location');
  const pickupInput = document.getElementById('pickup');
  if (!locBtn || !pickupInput) return;

  locBtn.addEventListener('click', () => {
    if ("geolocation" in navigator) {
      locBtn.innerHTML = '<span class="loading-spinner"></span>';
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          pickupInput.value = data.display_name;
        } catch (error) {
          console.error("Location error:", error);
          alert("Could not get exact address. Please enter manually.");
        } finally {
          locBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
        }
      }, () => {
        alert("Location permission denied.");
        locBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
      });
    }
  });
}

function initFareEstimator() {
  const distInput = document.getElementById('est-distance');
  const vehicleSelect = document.getElementById('est-vehicle');
  const resultEl = document.getElementById('fare-price');

  if (!distInput || !vehicleSelect || !resultEl) return;

  const rates = {
    economy: 11,
    sedan: 13,
    muv: 18,
    luxury_suv: 45
  };

  const updatePrice = () => {
    const dist = parseFloat(distInput.value) || 0;
    const rate = rates[vehicleSelect.value] || 0;
    const estimate = dist * rate;
    
    // Smooth transition for text
    resultEl.style.opacity = '0.5';
    setTimeout(() => {
      resultEl.textContent = `${estimate.toLocaleString('en-IN')}`;
      resultEl.style.opacity = '1';
    }, 100);
  };

  distInput.addEventListener('input', updatePrice);
  vehicleSelect.addEventListener('change', updatePrice);
}

function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      
      // Toggle current
      item.classList.toggle('active');
    });
  });
}

const routeData = {
  spiritual: {
    title: 'Spiritual Journeys',
    icon: '🕌',
    places: [
      { name: 'Varanasi', desc: 'The eternal city on the Ganga — ghats, temples & Ganga Aarti.', dist: '~290 km from Ayodhya', img: 'https://s7ap1.scene7.com/is/image/incredibleindia/manikarnika-ghat-city-hero?qlt=82&ts=1727959374496' },
      { name: 'Prayagraj', desc: 'Sangam of the three sacred rivers — Triveni Sangam & Kumbh Mela site.', dist: '~165 km from Ayodhya', img: 'https://res.cloudinary.com/dyiffrkzh/image/upload/c_fill,f_auto,fl_progressive.strip_profile,g_center,h_400,q_auto,w_700/v1694588285/bbj/ehzi0yif5ifcswmsi5q8.jpg' },
      { name: 'Mathura', desc: 'Birthplace of Lord Krishna — ancient temples & Vrindavan nearby.', dist: '~450 km from Ayodhya', img: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Vishram_Ghat.jpg' },
      { name: 'Agra', desc: 'Home to the Taj Mahal, Agra Fort & Fatehpur Sikri.', dist: '~500 km from Ayodhya', img: 'https://foodandtravel.com/imager/hours/219609/Ministry-of-Tourism-Govt-of-India-595161_Taj-Mahal-Uttar-Pradesh-Aerial_821631bb23140209ea99c8f810f75634.jpg' }
    ]
  },
  himalayan: {
    title: 'Himalayan Escapes',
    icon: '🏔️',
    places: [
      { name: 'Nainital', desc: 'Charming hill station with a scenic lake surrounded by mountains.', dist: '~430 km from Ayodhya', img: 'https://assets.simplotel.com/simplotel/image/upload/x_0,y_71,w_1024,h_618,r_0,c_crop,q_80,fl_progressive/w_500,f_auto,c_fit/heritage-hotels-of-nainital/naini_lake_heritage_hotels_of_nainital._hotel_in_nainital_wovees' },
      { name: 'Mussoorie', desc: 'Queen of the Hills — breathtaking views, malls & waterfalls.', dist: '~530 km from Ayodhya', img: 'https://img.freepik.com/premium-photo/aerial-view-beautiful-forest-near-mountains-mussoorie-india_665346-44299.jpg?semt=ais_hybrid&w=740&q=80' },
      { name: 'Haridwar', desc: 'Gateway to the Gods — Har Ki Pauri & Ganga Aarti at dusk.', dist: '~580 km from Ayodhya', img: 'https://www.tripsavvy.com/thmb/l_8mGpbABJtXL6F7q6Q2vTn2TXs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-450780637_Darkroom-1aa87b7388274f03a8bc49e7b2148f3a.jpg' },
      { name: 'Rishikesh', desc: 'Yoga capital of the world — river rafting & adventure sports.', dist: '~600 km from Ayodhya', img: 'https://s7ap1.scene7.com/is/image/incredibleindia/1-triveni-ghat-rishikesh-uttarakhand-2-city-hero?qlt=82&ts=1742167841959' }
    ]
  },
  city: {
    title: 'City & Coastal',
    icon: '🌆',
    places: [
      { name: 'Delhi NCR', desc: 'India\'s capital — historic monuments, shopping & culture.', dist: '~650 km from Ayodhya', img: 'https://images.news18.com/ibnlive/uploads/2023/05/what-is-the-difference-between-delhi-new-delhi-and-delhi-ncr.png' },
      { name: 'Jaipur', desc: 'The Pink City — Amber Fort, Hawa Mahal & bazaars.', dist: '~720 km from Ayodhya', img: 'https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577' },
      { name: 'Goa', desc: 'Golden beaches, vibrant nightlife & Portuguese heritage.', dist: '~1,650 km from Ayodhya', img: 'https://s7ap1.scene7.com/is/image/incredibleindia/1-palolem-beach-goa-goa-city-hero?qlt=82&ts=1742182084999' },
      { name: 'Amritsar', desc: 'The Golden Temple & Wagah Border — a soul-stirring experience.', dist: '~870 km from Ayodhya', img: 'https://upload.wikimedia.org/wikipedia/commons/9/94/The_Golden_Temple_of_Amrithsar_7.jpg' }
    ]
  },
  pilgrimage: {
    title: 'Pilgrimage Special',
    icon: '🙏',
    places: [
      { name: 'Kedarnath', desc: 'One of the Char Dham — sacred Shiva temple in the Himalayas.', dist: '~740 km from Ayodhya', img: 'https://www.tourmyindia.com/blog//wp-content/uploads/2025/05/Kedarnath-Temple.jpg' },
      { name: 'Badrinath', desc: 'Sacred Vishnu shrine on the banks of the Alaknanda river.', dist: '~780 km from Ayodhya', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi2MoYgIrjhEoizb5c2cD5haqzf-8xINVIWQ&s' },
      { name: 'Vaishno Devi', desc: 'Cave shrine of Mata Vaishno Devi in the Trikuta Mountains.', dist: '~950 km from Ayodhya', img: 'https://www.maavaishnodevi.org/sites/default/files/2023-11/intro.png' },
      { name: 'Chitrakoot', desc: 'Where Lord Ram spent his exile — serene & spiritually powerful.', dist: '~255 km from Ayodhya', img: 'https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2025/03/05134634/places-to-visit-in-Chitrakoot.jpg?tr=w-1200,q-60' }
    ]
  }
};

function initDestinationModal() {
  const modal = document.getElementById('destination-modal');
  const closeBtn = document.getElementById('dest-modal-close');
  const titleEl = document.getElementById('dest-modal-title');
  const iconEl = document.getElementById('dest-modal-icon');
  const grid = document.getElementById('dest-places-grid');
  const bookBtn = document.querySelector('.dest-book-btn');
  const routeCards = document.querySelectorAll('.route-item[data-route]');

  if (!modal || routeCards.length === 0) return;

  function openDestModal(routeKey) {
    const data = routeData[routeKey];
    if (!data) return;

    titleEl.textContent = data.title;
    iconEl.textContent = data.icon;

    grid.innerHTML = data.places.map(place => `
      <div class="dest-place-card">
        ${place.img
          ? `<img class="dest-place-img-real" src="${place.img}" alt="${place.name}">`
          : `<div class="dest-place-img">Photo Coming Soon</div>`
        }
        <div class="dest-place-info">
          <h3>${place.name}</h3>
          <p>${place.desc}</p>
          <span class="dist-tag">📍 ${place.dist}</span>
        </div>
      </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDestModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  routeCards.forEach(card => {
    card.addEventListener('click', () => {
      openDestModal(card.getAttribute('data-route'));
    });
  });

  closeBtn.addEventListener('click', closeDestModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeDestModal(); });

  if (bookBtn) {
    bookBtn.addEventListener('click', closeDestModal);
  }
}

const carDetails = {
  economy: {
    name: 'Maruti Swift / Baleno',
    category: 'Economy Compact',
    basePrice: '₹1000 for 80km / 8hrs',
    extraKm: '₹10/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹300/day (includes food & lodging)',
    luggage: '2 Small Bags',
    bookValue: 'economy'
  },
  sedan: {
    name: 'Swift Dzire / Honda City',
    category: 'Sedan Comfort',
    basePrice: '₹1200 for 80km / 8hrs',
    extraKm: '₹12/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹300/day',
    luggage: '2 Large, 1 Small Bag',
    bookValue: 'sedan'
  },
  muv: {
    name: 'Maruti Ertiga / Kia Carens',
    category: 'MUV Family',
    basePrice: '₹1500 for 80km / 8hrs',
    extraKm: '₹14/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹300/day',
    luggage: '3 Large, 2 Small Bags',
    bookValue: 'muv'
  },
  suv: {
    name: 'Toyota Innova Crysta',
    category: 'SUV Premium',
    basePrice: '₹2000 for 80km / 8hrs',
    extraKm: '₹18/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹400/day',
    luggage: '4 Large, 2 Small Bags',
    bookValue: 'suv'
  },
  luxury_suv: {
    name: 'Toyota Fortuner',
    category: 'Luxury SUV',
    basePrice: '₹3500 for 80km / 8hrs',
    extraKm: '₹25/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹500/day',
    luggage: '4 Large, 2 Small Bags',
    bookValue: 'luxury_suv'
  },
  group: {
    name: 'Tempo Traveller (12-seater)',
    category: 'Group Travel',
    basePrice: '₹3000 for 80km / 8hrs',
    extraKm: '₹22/km after 80km',
    fuel: 'Included in Per KM rate',
    toll: 'State Tax, Toll, Parking Extra',
    driver: '₹500/day',
    luggage: 'Large Boot Space',
    bookValue: 'group'
  }
};

function initModal() {
  const modal = document.getElementById('car-details-modal');
  const closeBtn = document.querySelector('.modal-close');
  const cards = document.querySelectorAll('.fleet-card');
  const bookBtn = document.querySelector('.modal-book-btn');

  if (!modal || cards.length === 0) return;

  function openModal(carKey) {
    const data = carDetails[carKey];
    if (!data) return;

    document.getElementById('modal-car-name').textContent = data.name;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-base-price').textContent = data.basePrice;
    document.getElementById('modal-extra-km').textContent = data.extraKm;
    document.getElementById('modal-fuel').textContent = data.fuel;
    document.getElementById('modal-toll').textContent = data.toll;
    document.getElementById('modal-driver').textContent = data.driver;
    document.getElementById('modal-luggage').textContent = data.luggage;
    
    bookBtn.onclick = () => {
      const vehicleSelect = document.getElementById('vehicle');
      if (vehicleSelect) {
        vehicleSelect.value = data.bookValue;
      }
      closeModal();
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const carKey = card.getAttribute('data-car');
      openModal(carKey);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

function initHeroSequence() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const heroSection = document.getElementById('hero');
  const heroText = document.querySelector('.hero-text-container');
  
  // Total frames in the sequence
  const frameCount = 81;
  
  // Preload frames
  const images = [];
  let imagesLoaded = 0;
  
  // Create a padding function to format frame numbers (001, 002, etc)
  const currentFrame = index => (
    `public/sequence/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
  );

  // Resize canvas to fill window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderImage(Math.min(Math.max(1, Math.floor(getScrollProgress() * frameCount) + 1), frameCount));
  }
  
  window.addEventListener('resize', resizeCanvas);
  
  // Function to draw image covering the canvas
  function drawCover(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }
  
  // Function to render specific frame
  function renderImage(index) {
    if (images[index]) {
      drawCover(images[index]);
    }
  }

  // Preload all images
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images[i] = img;
    
    img.onload = () => {
      imagesLoaded++;
      if (i === 1) {
        // Init canvas size and draw first frame when loaded
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderImage(1);
      }
    };
  }

  // Calculate scroll progress specifically for hero section
  function getScrollProgress() {
    const heroRect = heroSection.getBoundingClientRect();
    const scrollPosition = -heroRect.top;
    const maxScroll = heroSection.offsetHeight - window.innerHeight;
    
    let progress = scrollPosition / maxScroll;
    progress = Math.max(0, Math.min(1, progress));
    return progress;
  }

  // Handle scroll events
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const progress = getScrollProgress();
        
        // Calculate which frame to show
        const frameIndex = Math.min(
          frameCount,
          Math.floor(progress * frameCount) + 1
        );
        
        renderImage(frameIndex);
        
        // Show text at ~50% scroll
        if (progress > 0.4) {
          heroText.classList.add('visible');
        } else {
          heroText.classList.remove('visible');
        }
        
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        
        if (entry.target.classList.contains('counter')) {
          startCounter(entry.target);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply initial styles and observe
  const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .fleet-card, .feature-card, .route-card, .about-text, .about-list li, .stat-box, .counter');
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index % 3 * 0.1}s, transform 0.6s ease ${index % 3 * 0.1}s`;
    observer.observe(el);
  });
}

function startCounter(el) {
  const target = +el.getAttribute('data-target');
  if (!target) return;
  const duration = 2000;
  const increment = target > 100 ? Math.ceil(target / 60) : 1;
  const stepTime = duration / (target / increment);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = current + '+';
    }
  }, stepTime);
}

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  // Auto scroll logic could be added here, but manual drag/scroll is implemented below
  track.parentElement.style.overflowX = 'auto';
  track.parentElement.style.scrollBehavior = 'smooth';
  track.parentElement.style.scrollbarWidth = 'none'; // Firefox
  
  // Hide scrollbar for Chrome/Safari
  const style = document.createElement('style');
  style.innerHTML = '.testimonial-carousel::-webkit-scrollbar { display: none; }';
  document.head.appendChild(style);
  
  // Simple auto-scroll
  let scrollAmount = 0;
  const maxScroll = track.scrollWidth - track.parentElement.clientWidth;
  
  setInterval(() => {
    if (maxScroll <= 0) return;
    
    scrollAmount += track.parentElement.clientWidth / 2;
    if (scrollAmount > maxScroll) {
      scrollAmount = 0;
    }
    
    track.parentElement.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, 5000);
}

function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  const navLinks = document.querySelectorAll('.navbar-links a');

  if (!menuToggle || !navbarLinks) return;

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    navbarLinks.classList.toggle('active');
    document.body.style.overflow = navbarLinks.classList.contains('active') ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

// Quote Form & Bookings Logic
document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm');
  const successModal = document.getElementById('success-modal');
  const closeSuccess = document.getElementById('close-success');

  if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Explicitly check all fields
      const pickup = document.getElementById('pickup').value.trim();
      const destination = document.getElementById('destination').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const vehicle = document.getElementById('vehicle').value;
      const phone = document.getElementById('phone').value.trim();

      if (!pickup || !destination || !date || !time || !vehicle || !phone) {
        alert("Please fill in all details before requesting a quote.");
        return;
      }

      // Check if user is logged in
      const user = firebase.auth().currentUser;

      if (!user) {
        // Save form data to session storage
        const formData = {
          pickup: document.getElementById('pickup').value,
          destination: document.getElementById('destination').value,
          date: document.getElementById('date').value,
          time: document.getElementById('time').value,
          vehicle: document.getElementById('vehicle').value,
          phone: document.getElementById('phone').value
        };
        sessionStorage.setItem('pendingQuote', JSON.stringify(formData));
        
        // Redirect to login
        window.location.href = 'login.html';
        return;
      }

      // If logged in, save to Firestore
      const bookingData = {
        userId: user.uid,
        userEmail: user.email,
        pickup: document.getElementById('pickup').value,
        destination: document.getElementById('destination').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        vehicle: document.getElementById('vehicle').value,
        phone: document.getElementById('phone').value,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      try {
        await firebase.firestore().collection('bookings').add(bookingData);
        
        // Show Success Modal
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        quoteForm.reset();
      } catch (error) {
        console.error("Error saving booking: ", error);
        alert("Failed to request quote. Please try again.");
      }
    });
  }

  if (closeSuccess) {
    closeSuccess.addEventListener('click', () => {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Check for pending quote after login
  const pendingQuote = sessionStorage.getItem('pendingQuote');
  if (pendingQuote) {
    const checkPending = setInterval(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        const data = JSON.parse(pendingQuote);
        if (document.getElementById('pickup')) {
          document.getElementById('pickup').value = data.pickup || '';
          document.getElementById('destination').value = data.destination || '';
          document.getElementById('date').value = data.date || '';
          document.getElementById('time').value = data.time || '';
          document.getElementById('vehicle').value = data.vehicle || '';
          document.getElementById('phone').value = data.phone || '';
          sessionStorage.removeItem('pendingQuote');
          quoteForm.dispatchEvent(new Event('submit'));
        }
        clearInterval(checkPending);
      }
    }, 1000);
    
    // Safety timeout to clear interval if user doesn't log in within 5 minutes
    setTimeout(() => clearInterval(checkPending), 300000);
  }
});



