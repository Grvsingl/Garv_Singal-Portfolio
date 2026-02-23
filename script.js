/*==================================================*/
/*==============Home Page Logic=====================*/
/*==================================================*/

/* ================= HAMBURGER MENU ================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("nav");

if (hamburger && navMenu) {
  const setNavOpen = isOpen => {
    navMenu.classList.toggle("open", isOpen);
    hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  const closeNav = () => setNavOpen(false);

  hamburger.addEventListener("click", event => {
    event.stopPropagation();
    setNavOpen(!navMenu.classList.contains("open"));
  });

  // Close when a nav link is clicked
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  // Close when clicking outside nav / header
  document.addEventListener("click", event => {
    if (!event.target.closest("header")) {
      closeNav();
    }
  });
}


/* ================= IMAGE SLIDER ================= */

// Both images are already in the DOM — just swap CSS classes.
// No src change = no extra HTTP requests, only the CSS opacity transition fires.

const heroImgs = document.querySelectorAll(".hero-image .img");

if (heroImgs.length === 2) {
  setInterval(() => {
    heroImgs.forEach(img => {
      img.classList.toggle("front");
      img.classList.toggle("back");
    });
  }, 10000);
}


/* ================= SMOOTH SCROLL ================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


/* ================= CONTACT DROPDOWN ================= */

const toggleBtn = document.getElementById("contactToggleBtn");
const dropdown = document.getElementById("contactDropdown");

if (toggleBtn && dropdown) {

  toggleBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

  // Close when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest(".contact-wrapper")) {
      dropdown.style.display = "none";
    }
  });
}


/* ================= NETLIFY FORM SUBMIT ================= */

const form = document.getElementById("netlifyContactForm");

if (form) {

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("/home.html", {
      method: "POST",
      body: formData
    })
    .then(() => {
      const popup = document.getElementById("formSuccessPopup");

      if (popup) popup.classList.remove("hidden");
      form.reset();

      // Close dropdown after success
      if (dropdown) dropdown.style.display = "none";

      setTimeout(() => {
        if (popup) popup.classList.add("hidden");
      }, 3000);
    })
    .catch(() => alert("Form submission failed"));
  });
}


/* ================= SCROLL TO TOP BUTTON ================= */

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {

  window.addEventListener("scroll", function() {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ================= INFINITE SLIDER ================= */

const slider = document.querySelector(".upcoming-slider");

if (slider) {

  const cards = [...slider.children];

  // clone for seamless loop
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    slider.appendChild(clone);
  });

  let position = 0;
  const speed = 0.5;
  let paused = false;

  slider.addEventListener("mouseenter", () => paused = true);
  slider.addEventListener("mouseleave", () => paused = false);

  function animate() {
    if (!paused) {
      position -= speed;

      if (Math.abs(position) >= slider.scrollWidth / 2) {
        position = 0;
      }

      slider.style.transform = `translateX(${position}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ================= SCROLL REVEAL EFFECT ================= */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const elementTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if(elementTop < windowHeight - revealPoint){
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();