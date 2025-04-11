/**
 * Navigation functionality for Artisan Design Studio
 */

// Initialize navigation functionality
function initNavigation() {
  const header = document.getElementById("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Add scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);

  // Add CSS for scroll progress bar
  const progressStyle = document.createElement("style");
  progressStyle.textContent = `
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #000;
      z-index: 1000;
      transition: width 0.1s ease;
    }
  `;
  document.head.appendChild(progressStyle);

  // Enhanced header scroll effect
  function handleHeaderScroll() {
    const scrollPosition = getScrollPosition();
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollPosition / maxScroll) * 100;

    progressBar.style.width = `${scrollProgress}%`;

    if (scrollPosition > 50) {
      header.classList.add("scrolled");
      header.style.transform = "translateY(0)";
    } else {
      header.classList.remove("scrolled");
      header.style.transform = "translateY(0)";
    }

    // Hide header when scrolling down, show when scrolling up
    if (scrollPosition > lastScrollPosition && scrollPosition > 150) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollPosition = scrollPosition;
  };

  let lastScrollPosition = 0;
  window.addEventListener("scroll", throttle(handleHeaderScroll, 100));

  // Initial header check
  setTimeout(handleHeaderScroll, 0);

  // Mobile menu functionality
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  }

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";

    // Animate mobile menu items
    const menuItems = document.querySelectorAll(".mobile-menu li");
    menuItems.forEach((item, index) => {
      item.style.animation = `slideIn 0.4s ease forwards ${index * 0.1}s`;
    });
  });

  closeBtn.addEventListener("click", closeMobileMenu);
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  function highlightActiveLink() {
    const scrollPosition = getScrollPosition() + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").slice(1) === sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  // Add CSS for active link
  const activeLinkStyle = document.createElement("style");
  activeLinkStyle.textContent = `
    .nav-links a.active {
      color: #000;
    }
    .nav-links a.active::after {
      width: 100%;
    }
  `;
  document.head.appendChild(activeLinkStyle);

  window.addEventListener("scroll", throttle(highlightActiveLink, 100));
  highlightActiveLink();
}

// Define throttle and getScrollPosition functions
function throttle(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

function getScrollPosition() {
  return window.scrollY || window.pageYOffset;
}

// Call initNavigation function
initNavigation();
