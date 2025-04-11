/*************************************
* RESPONSIVE NAVIGATION BAR BEHAVIOR *
*************************************/

const nav = document.querySelector("nav");
const navLinks = document.querySelectorAll(".nav-link");
const hamburgerIcon = document.querySelector("#hamburger-icon");

// Scroll to a specific section on the page.
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Toggle the navigation menu and hamburger icon's active state.
hamburgerIcon.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburgerIcon.classList.toggle("active");
});

// Scroll to section and close the navigation menu when a nav link is clicked.
navLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('data-section-id');
    scrollToSection(sectionId);
    nav.classList.remove("active");
    hamburgerIcon.classList.remove("active");
  });
});


/***********************
* MODE TOGGLE BEHAVIOR *
***********************/

// Get elements that change with the mode.
const body = document.body;
const header = document.querySelector("header");
const navbar = document.querySelector("nav")
const toggleModeBtn = document.getElementById("toggle-mode-btn");
const features = document.getElementById("features")

// Mobile detection.
const isMobile = window.innerWidth <= 768;

// Function to apply mode.
function applyMode(mode) {
  body.classList.remove("light-mode", "dark-mode");
  header.classList.remove("light-mode", "dark-mode");
  navbar.classList.remove("light-mode", "dark-mode");
  features.classList.remove("light-mode", "dark-mode");

  body.classList.add(mode);
  header.classList.add(mode);
  navbar.classList.add(mode);
  features.classList.add(mode)

  if (!isMobile) {
    if (mode === "dark-mode") {
      toggleModeBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';
    } else {
      toggleModeBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
    }
  }
}

// On mobile, use system preference
if (isMobile) {
  toggleModeBtn.style.display = "none"; // hide toggle on mobile

  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const mode = systemPrefersDark ? "dark-mode" : "light-mode";
  applyMode(mode);

  // Optional: listen to changes in system theme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    applyMode(e.matches ? "dark-mode" : "light-mode");
  });

} else {
  // On desktop: use saved preference or default
  let savedMode = localStorage.getItem("mode") || "light-mode";
  applyMode(savedMode);

  toggleModeBtn.addEventListener("click", function () {
    const newMode = body.classList.contains("light-mode") ? "dark-mode" : "light-mode";
    applyMode(newMode);
    localStorage.setItem("mode", newMode);
  });
}


/******************************
* MOVE TO TOP BUTTON BEHAVIOR *
******************************/

const moveToTopButton = document.querySelector("#move-to-top-button");

// Show or hide the 'Move to Top' button based on scroll position.
window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 250) {
    moveToTopButton.style.bottom = "50px";
  } else {
    moveToTopButton.style.bottom = "-50px";
  }
});

// Scroll smoothly to the top of the page when the button is clicked.
moveToTopButton.addEventListener("click", (onclick) => {
  onclick.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


/*******************
* GALLERY BEHAVIOR *
*******************/

document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail");
  const mainImage = document.getElementById("main-image");

  // Update the main image when a thumbnail is clicked.
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener("click", function () {
      const imageUrl = this.getAttribute("src");
      mainImage.setAttribute("src", imageUrl);
    });
  });
});


/****************************
* GLOBAL ANIMATION BEHAVIOR *
****************************/

// Observe elements and add or remove animation classes based on their visibility.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.contains("hidden")) {
        entry.target.classList.add("show");
      } else if (entry.target.classList.contains("hidden-top")) {
        entry.target.classList.add("show-top");
      } else if (entry.target.classList.contains("hidden-right")) {
        entry.target.classList.add("show-right");
      } else if (entry.target.classList.contains("hidden-bottom")) {
        entry.target.classList.add("show-bottom");
      } else if (entry.target.classList.contains("hidden-left")) {
        entry.target.classList.add("show-left");
      }
    } else {
      entry.target.classList.remove("show", "show-top", "show-right", "show-bottom", "show-left");
    }
  });
});

// Observe hidden elements to trigger animations when they become visible.
const hiddenElements = document.querySelectorAll(".hidden, .hidden-top, .hidden-right, .hidden-bottom, .hidden-left");
hiddenElements.forEach((element) => observer.observe(element));
