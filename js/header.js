import { throttle, getScrollPosition } from "./utils.js";

/**
 * Header and navigation functionality
 */
export const initHeader = () => {
  const header = document.getElementById("header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.querySelector(".close-btn");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Enhanced header scroll effect
  const handleHeaderScroll = () => {
    const scrollPosition = getScrollPosition();

    if (scrollPosition > 50) {
      header.classList.add("scrolled");

      // Add subtle animation for header elements when scrolled
      document.querySelector(".logo").style.fontSize = "20px";
      navLinks.forEach((link) => {
        link.style.fontSize = "12px";
      });
    } else {
      header.classList.remove("scrolled");

      // Reset header elements
      document.querySelector(".logo").style.fontSize = "";
      navLinks.forEach((link) => {
        link.style.fontSize = "";
      });
    }

    // Add scroll progress indicator
    const scrollPercentage =
      (scrollPosition / (document.body.scrollHeight - window.innerHeight)) *
      100;
    document.documentElement.style.setProperty(
      "--scroll-progress",
      `${scrollPercentage}%`
    );
  };

  // Add scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress-bar";
  document.body.appendChild(progressBar);

  // Add CSS for scroll progress bar
  const progressStyle = document.createElement("style");
  progressStyle.textContent = `
    :root {
      --scroll-progress: 0%;
    }
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      width: var(--scroll-progress);
      height: 3px;
      background-color: #000;
      z-index: 1000;
      transition: opacity 0.3s ease;
    }
  `;
  document.head.appendChild(progressStyle);

  // Throttled scroll handler
  window.addEventListener("scroll", throttle(handleHeaderScroll, 100));

  // Initial header check
  handleHeaderScroll();

  // Enhanced mobile menu animations
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";

    // Animate mobile menu items
    const menuItems = document.querySelectorAll(".mobile-menu li");
    menuItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";

      setTimeout(() => {
        item.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, 100 + index * 100);
    });

    // Animate menu toggle
    menuToggle.classList.add("active");
  });

  // Add CSS for menu toggle animation
  const menuToggleStyle = document.createElement("style");
  menuToggleStyle.textContent = `
    .menu-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    .menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    .menu-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  `;
  document.head.appendChild(menuToggleStyle);

  // Close mobile menu
  const closeMobileMenu = () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
    menuToggle.classList.remove("active");
  };

  closeBtn.addEventListener("click", closeMobileMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");

  const highlightActiveLink = () => {
    const scrollPosition = getScrollPosition() + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active class from all links
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Add active class to current link
        const activeLink = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("active");
        }
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

  // Throttled scroll handler for active link
  window.addEventListener("scroll", throttle(highlightActiveLink, 200));

  // Initial active link check
  highlightActiveLink();
};
