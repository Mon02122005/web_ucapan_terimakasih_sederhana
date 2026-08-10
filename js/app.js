// ===== LOADING SCREEN MENUNGGU SEMUA KONTEN =====
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  const mainContent = document.getElementById("mainContent");
  const progressBar = document.getElementById("progressBar");
  const progressPercent = document.getElementById("progressPercent");

  // Kumpulkan semua gambar di halaman
  const allImages = document.querySelectorAll("img");
  const totalImages = allImages.length;
  let loadedImages = 0;
  let isComplete = false;

  // Update progress
  function updateProgress() {
    let percent = 0;
    if (totalImages === 0) {
      percent = 100;
    } else {
      percent = Math.round((loadedImages / totalImages) * 100);
    }

    progressBar.style.width = percent + "%";
    progressPercent.textContent = percent + "%";

    // Jika semua gambar sudah selesai dimuat
    if (percent === 100 && !isComplete) {
      isComplete = true;
      // Tampilkan konten dengan fade in
      mainContent.style.display = "block";
      setTimeout(function () {
        mainContent.style.opacity = "1";
      }, 50);

      // Hilangkan loading screen
      setTimeout(function () {
        loadingScreen.classList.add("hidden");
        document.body.style.overflow = "";
      }, 400);
    }
  }

  // Jika tidak ada gambar
  if (totalImages === 0) {
    updateProgress();
    return;
  }

  // Cek setiap gambar
  allImages.forEach(function (img) {
    // Jika gambar sudah selesai dimuat dari cache
    if (img.complete) {
      loadedImages++;
      updateProgress();
    } else {
      // Tunggu gambar selesai dimuat
      img.addEventListener("load", function () {
        loadedImages++;
        updateProgress();
      });
      img.addEventListener("error", function () {
        // Tetap hitung meskipun error (biar tidak stuck)
        loadedImages++;
        updateProgress();
      });
    }
  });

  // Fallback: jika ada gambar yang tidak trigger event
  setTimeout(function () {
    if (!isComplete) {
      // Hitung ulang gambar yang sudah complete
      let actualLoaded = 0;
      allImages.forEach(function (img) {
        if (img.complete) actualLoaded++;
      });
      loadedImages = actualLoaded;
      updateProgress();
    }
  }, 3000);
});

// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

if (menuToggle) {
  menuToggle.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("open");
    menuIcon.textContent = isOpen ? "close" : "menu";
  });
}

const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll("a") : [];
mobileLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    menuIcon.textContent = "menu";
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", function () {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("py-2", "bg-white/95", "backdrop-blur-sm", "shadow-sm");
    nav.classList.remove("py-4");
  } else {
    nav.classList.remove(
      "py-2",
      "bg-white/95",
      "backdrop-blur-sm",
      "shadow-sm",
    );
    nav.classList.add("py-4");
  }
});

// ===== ACTIVE LINK HIGHLIGHTING =====
var sections = document.querySelectorAll("section[id]");
var navLinks = document.querySelectorAll("nav a:not(.mobile-menu a)");
var mobileNavLinks = document.querySelectorAll(".mobile-menu a");

function updateActiveLink() {
  var current = "";
  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove(
      "text-primary",
      "font-bold",
      "border-b-2",
      "border-secondary",
    );
    link.classList.add("text-on-surface-variant");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add(
        "text-primary",
        "font-bold",
        "border-b-2",
        "border-secondary",
      );
      link.classList.remove("text-on-surface-variant");
    }
  });

  mobileNavLinks.forEach(function (link) {
    link.classList.remove(
      "text-primary",
      "font-bold",
      "border-b-2",
      "border-secondary",
    );
    link.classList.add("text-on-surface-variant");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add(
        "text-primary",
        "font-bold",
        "border-b-2",
        "border-secondary",
      );
      link.classList.remove("text-on-surface-variant");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// ===== GALERI FOTO =====
var currentSlide = 0;
var slides = document.querySelectorAll(".gallery-slide");
var totalSlides = slides.length;
var slider = document.getElementById("gallerySlider");
var dotsContainer = document.getElementById("galleryDots");

function createDots() {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";
  for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement("button");
    dot.className = "gallery-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      goToSlide(index);
    });
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  currentSlide = index;
  if (slider) {
    slider.style.transform = "translateX(-" + currentSlide * 100 + "%)";
  }

  document.querySelectorAll(".gallery-dot").forEach(function (dot, i) {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function openGallery() {
  var modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    goToSlide(0);
  }
}

function closeGallery() {
  var modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", function (e) {
  var modal = document.getElementById("galleryModal");
  if (!modal || modal.classList.contains("hidden")) return;

  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

createDots();

document
  .getElementById("galleryTrigger")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    openGallery();
  });
