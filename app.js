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
  // 5. PACKAGE SELECTION & DYNAMIC PRICING CALCULATION
  // =========================================================
  const packageSelect = document.getElementById('packageSelect');
  const peopleInput = document.getElementById('peopleInput');
  const peopleHint = document.getElementById('peopleHint');
  const extraSessionSelect = document.getElementById('extraSessionSelect');
  const selectPkgBtns = document.querySelectorAll('.select-pkg-btn');

  // Breakdown elements
  const calcPkgName = document.getElementById('calcPkgName');
  const calcPkgPrice = document.getElementById('calcPkgPrice');
  const calcExtraTimeRow = document.getElementById('calcExtraTimeRow');
  const calcExtraTimeText = document.getElementById('calcExtraTimeText');
  const calcExtraTimePrice = document.getElementById('calcExtraTimePrice');
  const calcExtraPeopleRow = document.getElementById('calcExtraPeopleRow');
  const calcExtraPeopleText = document.getElementById('calcExtraPeopleText');
  const calcExtraPeoplePrice = document.getElementById('calcExtraPeoplePrice');
  const editPhotoSelect = document.getElementById('editPhotoSelect');
  const calcEditPhotoRow = document.getElementById('calcEditPhotoRow');
  const calcEditPhotoPrice = document.getElementById('calcEditPhotoPrice');
  const calcTotalPrice = document.getElementById('calcTotalPrice');
  const calcDpPrice = document.getElementById('calcDpPrice');
  const calcRemainingPrice = document.getElementById('calcRemainingPrice');
  const footnoteDp = document.getElementById('footnoteDp');

  function formatRupiah(num) {
    return 'Rp' + Number(num || 0).toLocaleString('id-ID');
  }

  function calculateBookingPrice() {
    const pkgVal = packageSelect ? packageSelect.value : 'Nongkrong Cantik';
    const isNongkrong = pkgVal.includes('Nongkrong Cantik');

    const basePrice = isNongkrong ? 35000 : 55000;
    const baseQuota = 1;
    const pkgTitle = isNongkrong ? 'Nongkrong Cantik (30 mnt)' : 'Special Moments (30 mnt)';

    let people = 1;
    if (peopleInput && peopleInput.value) {
      people = parseInt(peopleInput.value, 10);
      if (isNaN(people) || people < 1) people = 1;
    }

    const extraPeopleCount = people > baseQuota ? (people - baseQuota) : 0;
    const extraPeopleCost = extraPeopleCount * 10000;

    let extraMinutes = 0;
    if (extraSessionSelect && extraSessionSelect.value) {
      extraMinutes = parseInt(extraSessionSelect.value, 10);
      if (isNaN(extraMinutes) || extraMinutes < 0) extraMinutes = 0;
    }
    const extraSessionCost = (extraMinutes / 10) * 15000;

    const editPhoto = !!(editPhotoSelect && editPhotoSelect.value === '1');
    const editPhotoCost = editPhoto ? 5000 : 0;

    const totalCost = basePrice + extraSessionCost + extraPeopleCost + editPhotoCost;
    const dpCost = Math.round(totalCost * 0.5);
    const remainingCost = totalCost - dpCost;
    const totalDuration = 30 + extraMinutes;

    return {
      pkgVal,
      isNongkrong,
      basePrice,
      baseQuota,
      pkgTitle,
      people,
      extraPeopleCount,
      extraPeopleCost,
      extraMinutes,
      extraSessionCost,
      editPhoto,
      editPhotoCost,
      totalDuration,
      totalCost,
      dpCost,
      remainingCost
    };
  }

  function updatePriceCalculation() {
    const calc = calculateBookingPrice();

    if (peopleHint) {
      peopleHint.textContent = 'Kuota dasar paket: 1 orang. Tambah orang: +Rp10.000/orang.';
    }

    if (calcPkgName) calcPkgName.textContent = `Paket ${calc.pkgTitle}`;
    if (calcPkgPrice) calcPkgPrice.textContent = formatRupiah(calc.basePrice);

    if (calcExtraTimeRow) {
      if (calc.extraMinutes > 0) {
        calcExtraTimeRow.style.display = 'flex';
        if (calcExtraTimeText) calcExtraTimeText.textContent = `Tambah Durasi (+${calc.extraMinutes} menit)`;
        if (calcExtraTimePrice) calcExtraTimePrice.textContent = `+${formatRupiah(calc.extraSessionCost)}`;
      } else {
        calcExtraTimeRow.style.display = 'none';
      }
    }

    if (calcExtraPeopleRow) {
      if (calc.extraPeopleCount > 0) {
        calcExtraPeopleRow.style.display = 'flex';
        if (calcExtraPeopleText) calcExtraPeopleText.textContent = `Tambah Person (+${calc.extraPeopleCount} orang)`;
        if (calcExtraPeoplePrice) calcExtraPeoplePrice.textContent = `+${formatRupiah(calc.extraPeopleCost)}`;
      } else {
        calcExtraPeopleRow.style.display = 'none';
      }
    }

    if (calcEditPhotoRow) {
      calcEditPhotoRow.style.display = calc.editPhoto ? 'flex' : 'none';
      if (calcEditPhotoPrice) calcEditPhotoPrice.textContent = `+${formatRupiah(calc.editPhotoCost)}`;
    }

    if (calcTotalPrice) calcTotalPrice.textContent = formatRupiah(calc.totalCost);
    if (calcDpPrice) calcDpPrice.textContent = formatRupiah(calc.dpCost);
    if (calcRemainingPrice) calcRemainingPrice.textContent = formatRupiah(calc.remainingCost);
    if (footnoteDp) footnoteDp.textContent = formatRupiah(calc.dpCost);
  }

  if (packageSelect) {
    packageSelect.addEventListener('change', updatePriceCalculation);
  }
  if (peopleInput) {
    peopleInput.addEventListener('input', updatePriceCalculation);
    peopleInput.addEventListener('change', updatePriceCalculation);
  }
  if (extraSessionSelect) {
    extraSessionSelect.addEventListener('change', updatePriceCalculation);
  }
  if (editPhotoSelect) {
    editPhotoSelect.addEventListener('change', updatePriceCalculation);
  }

  // Initial calculation
  updatePriceCalculation();

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
        updatePriceCalculation();
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

    // Build 24-hour time options (every 30 minutes, 00.00 - 23.30)
    function setMinTime(minVal) {
      if (!timeInput) return;
      Array.from(timeInput.options).forEach(opt => {
        if (!opt.value) return;
        opt.disabled = !!minVal && opt.value < minVal;
      });
      if (timeInput.value && minVal && timeInput.value < minVal) timeInput.value = '';
    }

    if (timeInput && timeInput.tagName === 'SELECT') {
      for (let h = 0; h < 24; h++) {
        ['00', '30'].forEach(mm => {
          const val = String(h).padStart(2, '0') + ':' + mm;
          const opt = document.createElement('option');
          opt.value = val;
          opt.textContent = val.replace(':', '.');
          timeInput.appendChild(opt);
        });
      }
    }

    function checkScheduleAvailability() {
      const dateVal = dateInput.value;
      if (!dateVal) {
        if (timeSlotNotice) {
          timeSlotNotice.style.display = 'none';
          timeSlotNotice.innerHTML = '';
        }
        setMinTime(null);
        return;
      }

      const [y, m, d] = dateVal.split('-').map(Number);
      const chosenDate = new Date(y, m - 1, d);
      const day = chosenDate.getDay(); // 0 is Sunday, 6 is Saturday

      if (day >= 1 && day <= 5) {
        // Weekday (Senin - Jumat) -> Only from 17:00
        setMinTime('17:00');
        if (timeSlotNotice) {
          timeSlotNotice.className = 'col-span-2 time-notice weekday-notice';
          timeSlotNotice.innerHTML = '🌙 <strong>Sesi Weekday (Senin–Jumat):</strong> Sesi hanya tersedia mulai pukul <strong>17.00 WIB</strong> (sesi sore & malam).';
          timeSlotNotice.style.display = 'block';
        }
      } else {
        // Weekend (Sabtu & Minggu) -> Flexible all day
        setMinTime(null);
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
      const name = (formData.get('name') || '').trim();
      const peopleRaw = formData.get('people');
      const date = formData.get('date');
      const time = formData.get('time');
      const area = (formData.get('area') || '').trim();
      const location = (formData.get('location') || '').trim();

      if (!name || !peopleRaw || !date || !time || !area || !location) {
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

      if (isWeekday && time < '17:00') {
        if (formError) {
          formError.textContent = 'Untuk hari Senin–Jumat (weekday), sesi foto hanya tersedia mulai pukul 17.00 WIB. Silakan pilih jam 17.00 ke atas atau pilih hari Sabtu/Minggu.';
          formError.style.display = 'block';
        }
        if (timeInput) timeInput.focus();
        return;
      }

      const calc = calculateBookingPrice();
      const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
      const dayName = dayNames[dayOfWeek];
      const formattedDate = `${dayName}, ${day} ${monthNames[month - 1]} ${year}`;

      const packageName = calc.isNongkrong ? 'Nongkrong Cantik' : 'Special Moments';
      const peopleText = `${calc.people} orang${calc.extraPeopleCount > 0 ? ` (+${calc.extraPeopleCount})` : ''}`;
      const durationText = `${calc.totalDuration} menit${calc.extraMinutes > 0 ? ` (+${calc.extraMinutes} mnt)` : ''}`;

      // WhatsApp message: complete info, concise wording
      const messageLines = [
        'Halo Jepret Dulu! Aku mau booking sesi foto.',
        '',
        'Detail Booking',
        `Paket: ${packageName}`,
        `Nama: ${name}`,
        `Jadwal: ${formattedDate}, ${time} WIB`,
        `Jumlah: ${peopleText}`,
        `Durasi: ${durationText}`,
        `Lokasi: ${location}, ${area}`,
        '',
        'Rincian Biaya',
        `• Paket: ${formatRupiah(calc.basePrice)}`,
        ...(calc.extraMinutes > 0 ? [`• +${calc.extraMinutes} menit: +${formatRupiah(calc.extraSessionCost)}`] : []),
        ...(calc.extraPeopleCount > 0 ? [`• +${calc.extraPeopleCount} orang: +${formatRupiah(calc.extraPeopleCost)}`] : []),
        ...(calc.editPhoto ? [`• Edit 3 foto: +${formatRupiah(calc.editPhotoCost)}`] : []),
        `• Total: ${formatRupiah(calc.totalCost)}`,
        `• DP 50%: ${formatRupiah(calc.dpCost)} (transfer)`,
        `• Pelunasan: ${formatRupiah(calc.remainingCost)} (di venue)`,
        '',
        'Catatan',
        '• Free transport (lokasi jauh ada fee)',
        '• Venue free izin kamera (charge kamera ditanggung customer)',
        '',
        'Aku sudah setuju T&C Jepret Dulu! Mohon cek jadwalnya, ya!'
      ];

      const waText = messageLines.join('\n');
      const waNumber = '62895629537139';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;

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
