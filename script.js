/*==================================================*/
/*==============Home Page Logic=====================*/
/*==================================================*/

/* ================= HAMBURGER MENU ================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("nav");

if (hamburger && navMenu) {

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    navMenu.classList.toggle("open");
    hamburger.innerHTML = navMenu.classList.contains("open") ? "&#10005;" : "&#9776;";
    document.body.style.overflow = navMenu.classList.contains("open") ? "hidden" : "";
  });

  // Close when a nav link is clicked
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburger.innerHTML = "&#9776;";
      document.body.style.overflow = "";
    });
  });

  // Close when clicking outside nav / header
  document.addEventListener("click", function (e) {
    if (!e.target.closest("header")) {
      navMenu.classList.remove("open");
      hamburger.innerHTML = "&#9776;";
      document.body.style.overflow = "";
    }
  });
}


/* ================= IMAGE SLIDER ================= */

const images = ["Photos/garv1.png", "Photos/garv2.jpeg"];
let index = 0;
const mainImg = document.getElementById("mainImg");

if (mainImg) {
  setInterval(() => {
    index = (index + 1) % images.length;

    mainImg.style.opacity = 0;

    setTimeout(() => {
      mainImg.src = images[index];
      mainImg.style.opacity = 1;
    }, 750);

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

    fetch("/", {
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