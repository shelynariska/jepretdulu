/**
 * Jepret Dulu! — Main Web Script
 * Features:
 * - Masonry Polaroid Portfolio with Category Filtering & Lightbox Modal
 * - Interactive T&C Accordion
 * - Dynamic Package Preselection from Price Cards
 * - Form Validation & Automated WhatsApp Message Generator
 * - Mobile Navigation Menu Toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // 1. DATA: 19 CLIENT PHOTOS PORTFOLIO
  // =========================================================
  const galleryData = [
    {
      src: 'assets/gallery/nongki_4.jpg',
      category: 'Portrait',
      alt: 'Portrait santai saat sunset di Surabaya',
      caption: 'golden hour in SBY ♡',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/nongki_2.jpg',
      category: 'Cafe Date',
      alt: 'Portrait hangat di sudut cafe Surabaya',
      caption: 'cafe date vibes',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/nongki_8.jpg',
      category: 'Cafe Date',
      alt: 'Momen kasual di meja cafe',
      caption: 'little moments',
      rotate: 'rot-neg-2'
    },
    {
      src: 'assets/gallery/nongki_1.jpg',
      category: 'Portrait',
      alt: 'Portrait playful dengan direct flash',
      caption: 'click!',
      rotate: 'rot-pos-2'
    },
    {
      src: 'assets/gallery/nongki_10.jpg',
      category: 'Cafe Date',
      alt: 'Portrait kasual santai',
      caption: 'hangout time',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/nongki_5.jpg',
      category: 'Cafe Date',
      alt: 'Cafe date portrait nuansa hangat',
      caption: 'warm smile',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/nongki_6.jpg',
      category: 'Cafe Date',
      alt: 'Hangout bersama teman di cafe',
      caption: 'coffee & laugh',
      rotate: 'rot-neg-2'
    },
    {
      src: 'assets/gallery/nongki_7.jpg',
      category: 'Portrait',
      alt: 'Foto OOTD kasual outdoor Surabaya',
      caption: 'daily ootd',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/nongki_9.jpg',
      category: 'Cafe Date',
      alt: 'Portrait cantik di cafe estetik',
      caption: 'bestie vibe',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/nongki_3.jpg',
      category: 'Portrait',
      alt: 'Portrait playful ala digicam',
      caption: 'chill afternoon',
      rotate: 'rot-pos-2'
    },
    {
      src: 'assets/gallery/graduate_1.jpg',
      category: 'Wisuda',
      alt: 'Foto wisuda outdoor penuh kebahagiaan',
      caption: 'finally done!',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/graduate_2.jpg',
      category: 'Wisuda',
      alt: 'Portrait wisuda dengan selempang dan toga',
      caption: 'happy graduation',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/graduate_3.jpg',
      category: 'Wisuda',
      alt: 'Momen selebrasi kelulusan wisuda',
      caption: 'proud moment',
      rotate: 'rot-neg-2'
    },
    {
      src: 'assets/gallery/graduate_4.jpg',
      category: 'Wisuda',
      alt: 'Portrait wisuda bersama sahabat kampus',
      caption: 'together we made it',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/graduate_5.jpg',
      category: 'Wisuda',
      alt: 'Foto wisuda kampus Surabaya',
      caption: 'new journey',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/graduate_6.jpg',
      category: 'Wisuda',
      alt: 'Kenangan manis selebrasi hari kelulusan',
      caption: 'grad memories',
      rotate: 'rot-pos-2'
    },
    {
      src: 'assets/gallery/sempro_1.jpg',
      category: 'Special Moments',
      alt: 'Selebrasi seminar proposal sempro',
      caption: 'sempro conquered!',
      rotate: 'rot-neg-1'
    },
    {
      src: 'assets/gallery/sempro_2.jpg',
      category: 'Special Moments',
      alt: 'Momen bahagia lulus seminar proposal',
      caption: 'one step closer',
      rotate: 'rot-pos-1'
    },
    {
      src: 'assets/gallery/sempro_3.jpg',
      category: 'Special Moments',
      alt: 'Foto selebrasi sempro dengan bucket bunga',
      caption: 'best support system',
      rotate: 'rot-neg-2'
    }
  ];

  // =========================================================
  // 2. PORTFOLIO MASONRY RENDERING & FILTERING
  // =========================================================
  const portfolioGrid = document.getElementById('portfolioGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let currentFilter = 'All';

  function renderPortfolio(filter) {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';

    const filtered = galleryData.filter(item => {
      return filter === 'All' || item.category === filter;
    });

    filtered.forEach(photo => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `portfolio-photo-btn ${photo.rotate || ''}`;
      btn.setAttribute('aria-label', `Perbesar ${photo.alt}`);

      btn.innerHTML = `
        <img src="${photo.src}" alt="${photo.alt}" loading="lazy">
        <span class="portfolio-photo-caption">${photo.caption || photo.category}</span>
        <span class="portfolio-photo-plus">+</span>
      `;

      btn.addEventListener('click', () => {
        openLightbox(photo);
      });

      portfolioGrid.appendChild(btn);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'All';
      renderPortfolio(currentFilter);
    });
  });

  // Initial render
  renderPortfolio(currentFilter);

  // =========================================================
  // 3. LIGHTBOX MODAL PREVIEW
  // =========================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(photo) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    if (lightboxCaption) {
      lightboxCaption.textContent = `${photo.category} • ${photo.caption}`;
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // =========================================================
  // 4. ACCORDION (TERMS & CONDITIONS)
  // =========================================================
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const icon = item.querySelector('.accordion-icon');

    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all items
        accordionItems.forEach(other => {
          other.classList.remove('open');
          const otherTrigger = other.querySelector('.accordion-trigger');
          const otherIcon = other.querySelector('.accordion-icon');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          if (otherIcon) otherIcon.textContent = '+';
        });

        // Toggle clicked item if it was closed
        if (!isOpen) {
          item.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });

  // =========================================================
  // 5. PACKAGE SELECTION FROM PRICING CARDS
  // =========================================================
  const packageSelect = document.getElementById('packageSelect');
  const selectPkgBtns = document.querySelectorAll('.select-pkg-btn');

  selectPkgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pkg = btn.getAttribute('data-package');
      if (packageSelect && pkg) {
        for (let i = 0; i < packageSelect.options.length; i++) {
          if (packageSelect.options[i].value.includes(pkg)) {
            packageSelect.selectedIndex = i;
            break;
          }
        }
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================
  // 6. BOOKING FORM & AUTOMATIC WHATSAPP GENERATOR
  // =========================================================
  const bookingForm = document.getElementById('bookingForm');
  const termsCheckbox = document.getElementById('termsCheckbox');
  const formError = document.getElementById('formError');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const timeSlotNotice = document.getElementById('timeSlotNotice');

  // Set min date to today
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];

    function checkScheduleAvailability() {
      const dateVal = dateInput.value;
      if (!dateVal) {
        if (timeSlotNotice) {
          timeSlotNotice.style.display = 'none';
          timeSlotNotice.innerHTML = '';
        }
        if (timeInput) timeInput.removeAttribute('min');
        return;
      }

      const [y, m, d] = dateVal.split('-').map(Number);
      const chosenDate = new Date(y, m - 1, d);
      const day = chosenDate.getDay(); // 0 is Sunday, 6 is Saturday

      if (day >= 1 && day <= 5) {
        // Weekday (Senin - Jumat) -> Only after 18:00
        if (timeInput) timeInput.min = '18:00';
        if (timeSlotNotice) {
          timeSlotNotice.className = 'col-span-2 time-notice weekday-notice';
          timeSlotNotice.innerHTML = '🌙 <strong>Sesi Weekday (Senin–Jumat):</strong> Sesi hanya tersedia di atas pukul <strong>18.00 WIB</strong> (sesi malam).';
          timeSlotNotice.style.display = 'block';
        }
      } else {
        // Weekend (Sabtu & Minggu) -> Flexible all day
        if (timeInput) timeInput.removeAttribute('min');
        if (timeSlotNotice) {
          timeSlotNotice.className = 'col-span-2 time-notice weekend-notice';
          timeSlotNotice.innerHTML = '☀️ <strong>Sesi Weekend (Sabtu–Minggu):</strong> Ketersediaan fleksibel seharian.';
          timeSlotNotice.style.display = 'block';
        }
      }
    }

    dateInput.addEventListener('change', checkScheduleAvailability);
    dateInput.addEventListener('input', checkScheduleAvailability);
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (formError) {
        formError.style.display = 'none';
        formError.textContent = '';
      }

      if (!termsCheckbox || !termsCheckbox.checked) {
        if (formError) {
          formError.textContent = 'Centang persetujuan T&C dulu, ya.';
          formError.style.display = 'block';
        }
        return;
      }

      const formData = new FormData(bookingForm);
      const pkg = formData.get('package') || 'Nongkrong Cantik';
      const name = (formData.get('name') || '').trim();
      const people = formData.get('people');
      const date = formData.get('date');
      const time = formData.get('time');
      const area = (formData.get('area') || '').trim();
      const location = (formData.get('location') || '').trim();

      if (!name || !people || !date || !time || !area || !location) {
        if (formError) {
          formError.textContent = 'Harap lengkapi seluruh formulir booking.';
          formError.style.display = 'block';
        }
        return;
      }

      // Validate Weekday vs Weekend schedule
      const [year, month, day] = date.split('-').map(Number);
      const bookingDate = new Date(year, month - 1, day);
      const dayOfWeek = bookingDate.getDay(); // 0: Sun, 6: Sat, 1-5: Mon-Fri
      const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

      if (isWeekday && time < '18:00') {
        if (formError) {
          formError.textContent = 'Untuk hari Senin–Jumat (weekday), sesi foto hanya tersedia di atas pukul 18.00 WIB. Silakan pilih jam 18.00 ke atas atau pilih hari Sabtu/Minggu.';
          formError.style.display = 'block';
        }
        if (timeInput) timeInput.focus();
        return;
      }

      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const dayName = dayNames[dayOfWeek];

      // WhatsApp message template with area, venue, & transport info
      const messageLines = [
        'Halo Jepret Dulu! Aku mau booking sesi foto.',
        '',
        `Paket: ${pkg}`,
        `Nama: ${name}`,
        `Hari / Tanggal: ${dayName}, ${date}`,
        `Jam: ${time} WIB`,
        `Jumlah orang: ${people}`,
        `Wilayah: ${area}`,
        `Lokasi Venue: ${location}`,
        'Ket. Transport: Exclude transport (biaya transport menyesuaikan lokasi venue)',
        'Ket. Tempat: Cafe / kampus free izin kamera (jika ada charge kamera ditanggung customer)',
        '',
        'Sistem Pembayaran: DP 50% (Pelunasan 50% setelah bertemu admin di venue).',
        'Aku sudah membaca dan menyetujui T&C Jepret Dulu! (Termasuk ketentuan Reschedule min. H-1, jadwal weekend fleksibel / weekday > 18.00 WIB, tanpa overtime, & hasil GDrive tanpa edit). Mohon cek ketersediaan jadwalnya, ya!'
      ];

      const waText = messageLines.join('\n');
      const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // =========================================================
  // 7. MOBILE MENU TOGGLE
  // =========================================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const menuIcon = document.getElementById('menuIcon');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isActive = mainNav.classList.toggle('active');
      if (menuIcon) {
        menuIcon.textContent = isActive ? '×' : '≡';
      }
    });

    // Close when clicking nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        if (menuIcon) {
          menuIcon.textContent = '≡';
        }
      });
    });
  }

});
