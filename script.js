/**
 * Artisan Design Studio - Enhanced JavaScript
 * A comprehensive script with advanced animations, interactions, and functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // UTILITY FUNCTIONS
  // ======================================================

  /**
   * Throttle function to limit the rate at which a function can fire
   */
  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  /**
   * Debounce function to delay function execution
   */
  const debounce = (func, delay) => {
    let debounceTimer;
    return function () {
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  /**
   * Check if an element is in viewport
   */
  const isInViewport = (element, offset = 0) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) -
          offset &&
      rect.bottom >= offset &&
      rect.left <=
        (window.innerWidth || document.documentElement.clientWidth) - offset &&
      rect.right >= offset
    );
  };

  /**
   * Get the current scroll position
   */
  const getScrollPosition = () => {
    return window.pageYOffset || document.documentElement.scrollTop;
  };

  /**
   * Animate a number from start to end
   */
  const animateNumber = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentNumber = Math.floor(progress * (end - start) + start);
      element.textContent = currentNumber;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  };

  /**
   * Lerp (Linear Interpolation) function for smooth animations
   */
  const lerp = (start, end, factor) => {
    return start + (end - start) * factor;
  };

  // ======================================================
  // PRELOADER
  // ======================================================

  const preloader = document.getElementById("preloader");

  // More sophisticated preloader with progress counter
  const startPreloader = () => {
    let counter = 0;
    const progressElement = document.createElement("div");
    progressElement.className = "preloader-progress";
    progressElement.innerHTML = `<span>0%</span>`;
    preloader.appendChild(progressElement);

    const interval = setInterval(() => {
      counter += Math.floor(Math.random() * 5) + 1;
      if (counter > 100) counter = 100;
      progressElement.innerHTML = `<span>${counter}%</span>`;

      if (counter === 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.style.opacity = "0";
          setTimeout(() => {
            preloader.style.display = "none";
            // Trigger entrance animations after preloader
            document.body.classList.add("loaded");
            animateHeroElements();
          }, 500);
        }, 500);
      }
    }, 50);
  };

  // Start preloader animation
  startPreloader();

  // ======================================================
  // CUSTOM CURSOR
  // ======================================================

  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  // Enhanced cursor variables
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let followerX = 0;
  let followerY = 0;
  let cursorVisible = false;
  let cursorActive = false;

  // Show cursor when mouse moves
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!cursorVisible) {
      cursor.style.opacity = 1;
      cursorFollower.style.opacity = 1;
      cursorVisible = true;
    }
  });

  // Hide cursor when mouse leaves window
  document.addEventListener("mouseout", () => {
    cursor.style.opacity = 0;
    cursorFollower.style.opacity = 0;
    cursorVisible = false;
  });

  // Cursor down effect
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)";
    cursorActive = true;
  });

  // Cursor up effect
  document.addEventListener("mouseup", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    cursorActive = false;
  });

  // Enhanced cursor animation with smooth movement
  const animateCursor = () => {
    // Smooth cursor movement with lerp
    cursorX = lerp(cursorX, mouseX, 0.2);
    cursorY = lerp(cursorY, mouseY, 0.2);
    followerX = lerp(followerX, mouseX, 0.1);
    followerY = lerp(followerY, mouseY, 0.1);

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    cursorFollower.style.left = `${followerX}px`;
    cursorFollower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
  };

  animateCursor();

  // Enhanced hover effects for interactive elements
  const cursorInteractiveElements = document.querySelectorAll(
    "a, button, .menu-toggle, .work-item, .service-card, .client-logo, input, textarea, .social-icon"
  );

  cursorInteractiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
      cursorFollower.classList.add("follower-hover");

      // Add specific classes based on element type
      if (element.tagName === "A" || element.tagName === "BUTTON") {
        cursor.classList.add("cursor-link");
      }

      if (element.classList.contains("work-item")) {
        cursor.classList.add("cursor-view");
        cursor.innerHTML = "<span>View</span>";
      }
    });

    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover", "cursor-link", "cursor-view");
      cursorFollower.classList.remove("follower-hover");
      cursor.innerHTML = "";
    });
  });

  // Add CSS for enhanced cursor
  const cursorStyle = document.createElement("style");
  cursorStyle.textContent = `
      .cursor {
        opacity: 0;
        mix-blend-mode: difference;
        transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      }
      .cursor-follower {
        opacity: 0;
        transition: transform 0.6s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
      }
      .cursor-hover {
        transform: translate(-50%, -50%) scale(1.5) !important;
        background-color: #fff !important;
      }
      .follower-hover {
        transform: translate(-50%, -50%) scale(0.5) !important;
        opacity: 0.5 !important;
      }
      .cursor-link {
        transform: translate(-50%, -50%) scale(0) !important;
      }
      .cursor-view {
        width: 60px !important;
        height: 60px !important;
        background-color: #fff !important;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 500;
      }
    `;
  document.head.appendChild(cursorStyle);

  // ======================================================
  // HEADER AND NAVIGATION
  // ======================================================

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

  // ======================================================
  // SMOOTH SCROLLING
  // ======================================================

  // Enhanced smooth scrolling with easing
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get header height for offset
        const headerHeight = header.offsetHeight;

        // Calculate target position
        const targetPosition = targetElement.offsetTop - headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;

        // Smooth scroll with easing
        let startTime = null;
        const duration = 1000;

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          // Easing function (easeInOutQuad)
          const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          };

          window.scrollTo(
            0,
            startPosition + distance * easeInOutQuad(progress)
          );

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    });
  });

  // ======================================================
  // HERO SECTION ANIMATIONS
  // ======================================================

  // Animate hero elements on page load
  const animateHeroElements = () => {
    const heroText = document.querySelector(".hero-text");
    const heroImage = document.querySelector(".hero-image");
    const heroElements = [
      heroText.querySelector("h1"),
      heroText.querySelector("p"),
      heroText.querySelector(".hero-buttons"),
    ];

    // Animate hero text elements
    heroElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, 300 + index * 200);
    });

    // Animate hero image
    setTimeout(() => {
      heroImage.style.opacity = "1";
      heroImage.style.transform = "translateX(0)";
    }, 800);
  };

  // Add CSS for hero animations
  const heroAnimationStyle = document.createElement("style");
  heroAnimationStyle.textContent = `
      .hero-text h1,
      .hero-text p,
      .hero-text .hero-buttons {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .hero-image {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
    `;
  document.head.appendChild(heroAnimationStyle);

  // ======================================================
  // PARALLAX EFFECTS
  // ======================================================

  // Elements for parallax effect
  const parallaxElements = document.querySelectorAll(
    ".geometric-shapes, .shape-grid, .feature-img, .about-img"
  );

  // Parallax effect on mouse move
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    parallaxElements.forEach((element) => {
      const speedFactor = element.classList.contains("geometric-shapes")
        ? 20
        : 10;
      const moveX = mouseX * speedFactor;
      const moveY = mouseY * speedFactor;

      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // Parallax effect on scroll
  const handleParallaxScroll = () => {
    const scrollPosition = getScrollPosition();

    document.querySelectorAll(".shape").forEach((shape, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = -scrollPosition * speed;
      shape.style.transform = `translateY(${yPos}px)`;
    });
  };

  // Throttled scroll handler for parallax
  window.addEventListener("scroll", throttle(handleParallaxScroll, 10));

  // ======================================================
  // SCROLL ANIMATIONS
  // ======================================================

  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    ".services-intro, .service-card, .feature-content, .work-item, .about-content, .contact-content, .client-logo"
  );

  // Add CSS for scroll animations
  const scrollAnimationStyle = document.createElement("style");
  scrollAnimationStyle.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .fade-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .fade-in-left.visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      .fade-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .fade-in-right.visible {
        opacity: 1;
        transform: translateX(0);
      }
      
      .scale-in {
        opacity: 0;
        transform: scale(0.9);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .scale-in.visible {
        opacity: 1;
        transform: scale(1);
      }
    `;
  document.head.appendChild(scrollAnimationStyle);

  // Add animation classes to elements
  animatedElements.forEach((element, index) => {
    if (
      element.classList.contains("services-intro") ||
      element.classList.contains("feature-content") ||
      element.classList.contains("about-content") ||
      element.classList.contains("contact-content")
    ) {
      // Add different animations to child elements
      const leftElement = element.children[0];
      const rightElement = element.children[1];

      if (leftElement) leftElement.classList.add("fade-in-left");
      if (rightElement) rightElement.classList.add("fade-in-right");
    } else if (element.classList.contains("client-logo")) {
      element.classList.add("scale-in");
      element.style.transitionDelay = `${index * 0.1}s`;
    } else {
      element.classList.add("fade-in");

      // Add staggered delay for cards
      if (
        element.classList.contains("service-card") ||
        element.classList.contains("work-item")
      ) {
        element.style.transitionDelay = `${(index % 3) * 0.2}s`;
      }
    }
  });

  // Check if elements are in viewport and animate them
  const animateOnScroll = () => {
    const animationElements = document.querySelectorAll(
      ".fade-in, .fade-in-left, .fade-in-right, .scale-in"
    );

    animationElements.forEach((element) => {
      if (isInViewport(element, 100)) {
        element.classList.add("visible");
      }
    });
  };

  // Throttled scroll handler for animations
  window.addEventListener("scroll", throttle(animateOnScroll, 100));

  // Initial animation check
  setTimeout(animateOnScroll, 500);

  // ======================================================
  // COUNTER ANIMATIONS
  // ======================================================

  // Animate stat counters when in viewport
  const statNumbers = document.querySelectorAll(".stat-number");
  let countersAnimated = false;

  const animateCounters = () => {
    if (countersAnimated) return;

    const aboutStats = document.querySelector(".about-stats");
    if (aboutStats && isInViewport(aboutStats, 100)) {
      statNumbers.forEach((statNumber) => {
        const targetNumber = Number.parseInt(statNumber.textContent);
        animateNumber(statNumber, 0, targetNumber, 2000);
      });
      countersAnimated = true;
    }
  };

  // Throttled scroll handler for counters
  window.addEventListener("scroll", throttle(animateCounters, 200));

  // ======================================================
  // WORK SECTION ENHANCEMENTS
  // ======================================================

  // Work filter functionality
  const workSection = document.querySelector("#work");

  if (workSection) {
    // Create filter buttons
    const createWorkFilters = () => {
      const filterContainer = document.createElement("div");
      filterContainer.className = "work-filters";

      const filters = ["All", "Web Design", "Mobile App", "Branding"];

      filters.forEach((filter, index) => {
        const button = document.createElement("button");
        button.className = index === 0 ? "filter-btn active" : "filter-btn";
        button.textContent = filter;
        button.setAttribute(
          "data-filter",
          filter.toLowerCase().replace(" ", "-")
        );

        button.addEventListener("click", function () {
          // Remove active class from all buttons
          document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.remove("active");
          });

          // Add active class to clicked button
          this.classList.add("active");

          // Filter work items
          const filterValue = this.getAttribute("data-filter");

          document.querySelectorAll(".work-item").forEach((item) => {
            if (filterValue === "all" || item.classList.contains(filterValue)) {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 100);
            } else {
              item.style.opacity = "0";
              item.style.transform = "translateY(20px)";
              setTimeout(() => {
                item.style.display = "none";
              }, 500);
            }
          });
        });

        filterContainer.appendChild(button);
      });

      // Add filter buttons to work section
      const sectionHeader = workSection.querySelector(".section-header");
      sectionHeader.appendChild(filterContainer);

      // Add CSS for filter buttons
      const filterStyle = document.createElement("style");
      filterStyle.textContent = `
          .work-filters {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 30px;
          }
          
          .filter-btn {
            background: none;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-light);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
          }
          
          .filter-btn::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background-color: #000;
            transition: width 0.3s ease;
          }
          
          .filter-btn:hover {
            color: #000;
          }
          
          .filter-btn.active {
            color: #000;
          }
          
          .filter-btn.active::after {
            width: 30px;
          }
        `;
      document.head.appendChild(filterStyle);
    };

    // Add categories to work items
    const workItems = document.querySelectorAll(".work-item");
    const categories = ["web-design", "mobile-app", "branding"];

    workItems.forEach((item, index) => {
      // Assign random category for demo purposes
      const category = categories[index % categories.length];
      item.classList.add(category);
    });

    // Create and add filters
    createWorkFilters();

    // Add lightbox functionality for work items
    const createLightbox = () => {
      // Create lightbox container
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.innerHTML = `
          <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image-container">
              <img class="lightbox-image" src="/placeholder.svg" alt="Project Image">
            </div>
            <div class="lightbox-details">
              <h3 class="lightbox-title"></h3>
              <p class="lightbox-description"></p>
              <div class="lightbox-meta">
                <div class="lightbox-meta-item">
                  <span class="meta-label">Client:</span>
                  <span class="meta-client"></span>
                </div>
                <div class="lightbox-meta-item">
                  <span class="meta-label">Services:</span>
                  <span class="meta-services"></span>
                </div>
                <div class="lightbox-meta-item">
                  <span class="meta-label">Year:</span>
                  <span class="meta-year"></span>
                </div>
              </div>
              <a href="#" class="btn-primary lightbox-link" target="_blank">View Live Project</a>
            </div>
          </div>
        `;

      document.body.appendChild(lightbox);

      // Add CSS for lightbox
      const lightboxStyle = document.createElement("style");
      lightboxStyle.textContent = `
          .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          
          .lightbox.active {
            opacity: 1;
            visibility: visible;
          }
          
          .lightbox-content {
            display: grid;
            grid-template-columns: 1.5fr 1fr;
            gap: 30px;
            width: 90%;
            max-width: 1000px;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
          }
          
          .lightbox.active .lightbox-content {
            transform: scale(1);
          }
          
          .lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
            z-index: 1001;
          }
          
          .lightbox-image-container {
            height: 500px;
            overflow: hidden;
          }
          
          .lightbox-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .lightbox-details {
            padding: 40px;
            display: flex;
            flex-direction: column;
          }
          
          .lightbox-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
          }
          
          .lightbox-description {
            color: var(--text-light);
            margin-bottom: 24px;
          }
          
          .lightbox-meta {
            margin-top: auto;
            margin-bottom: 30px;
          }
          
          .lightbox-meta-item {
            margin-bottom: 12px;
          }
          
          .meta-label {
            font-weight: 600;
            margin-right: 8px;
          }
          
          .lightbox-link {
            align-self: flex-start;
          }
          
          @media (max-width: 768px) {
            .lightbox-content {
              grid-template-columns: 1fr;
            }
            
            .lightbox-image-container {
              height: 300px;
            }
          }
        `;
      document.head.appendChild(lightboxStyle);

      // Lightbox functionality
      const lightboxElement = document.querySelector(".lightbox");
      const lightboxClose = document.querySelector(".lightbox-close");
      const lightboxImage = document.querySelector(".lightbox-image");
      const lightboxTitle = document.querySelector(".lightbox-title");
      const lightboxDescription = document.querySelector(
        ".lightbox-description"
      );
      const lightboxClient = document.querySelector(".meta-client");
      const lightboxServices = document.querySelector(".meta-services");
      const lightboxYear = document.querySelector(".meta-year");
      const lightboxLink = document.querySelector(".lightbox-link");

      // Sample project data
      const projectData = [
        {
          title: "Luxe Boutique E-commerce Platform",
          description:
            "A premium shopping experience that increased conversion rates by 42% and average order value by 28%. The platform features a custom product recommendation engine and seamless checkout process.",
          client: "Luxe Fashion Inc.",
          services: "UI/UX Design, Web Development, E-commerce",
          year: "2023",
          link: "#",
        },
        {
          title: "FinTrack Dashboard App",
          description:
            "An intuitive financial management platform that helped users save an average of 15% more through better visualization. The app includes real-time data tracking and personalized insights.",
          client: "FinTech Solutions",
          services: "Mobile App Design, UI/UX, Development",
          year: "2022",
          link: "#",
        },
        {
          title: "MediConnect Mobile Application",
          description:
            "A healthcare app that improved patient engagement by 67% and streamlined appointment scheduling processes. Features include telemedicine integration and health record management.",
          client: "MediCare Group",
          services: "Mobile App Design, Branding, Development",
          year: "2023",
          link: "#",
        },
      ];

      // Open lightbox when clicking on work item
      workItems.forEach((item, index) => {
        const overlay = item.querySelector(".work-overlay");
        const viewButton = overlay.querySelector(".btn-white-sm");

        viewButton.addEventListener("click", (e) => {
          e.preventDefault();

          // Get project data
          const project = projectData[index % projectData.length];

          // Set lightbox content
          lightboxImage.src = item.querySelector("img").src;
          lightboxTitle.textContent = project.title;
          lightboxDescription.textContent = project.description;
          lightboxClient.textContent = project.client;
          lightboxServices.textContent = project.services;
          lightboxYear.textContent = project.year;
          lightboxLink.href = project.link;

          // Show lightbox
          lightboxElement.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      // Close lightbox
      lightboxClose.addEventListener("click", () => {
        lightboxElement.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      // Close lightbox when clicking outside content
      lightboxElement.addEventListener("click", (e) => {
        if (e.target === lightboxElement) {
          lightboxElement.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    };

    // Initialize lightbox
    createLightbox();
  }

  // ======================================================
  // TESTIMONIAL SLIDER
  // ======================================================

  const testimonialSection = document.querySelector("#testimonial");

  if (testimonialSection) {
    // Create testimonial slider
    const createTestimonialSlider = () => {
      // Sample testimonials data
      const testimonials = [
        {
          quote:
            "Artisan transformed our digital presence completely. Their strategic approach and attention to detail resulted in a 40% increase in user engagement.",
          author: "Maria Lopez",
          position: "VP of Design at Meshery",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
        },
        {
          quote:
            "Working with Artisan was a game-changer for our brand. Their team delivered a website that perfectly captures our vision and has significantly improved our conversion rates.",
          author: "David Chen",
          position: "CEO of TechFlow",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
        },
        {
          quote:
            "The Artisan team exceeded our expectations at every turn. Their attention to detail and commitment to quality is unmatched in the industry.",
          author: "Sarah Johnson",
          position: "Marketing Director at Elevate",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
        },
      ];

      // Create slider container
      const sliderContainer = document.createElement("div");
      sliderContainer.className = "testimonial-slider";

      // Create slider track
      const sliderTrack = document.createElement("div");
      sliderTrack.className = "testimonial-track";

      // Create testimonial slides
      testimonials.forEach((testimonial) => {
        const slide = document.createElement("div");
        slide.className = "testimonial-slide";
        slide.innerHTML = `
            <blockquote>${testimonial.quote}</blockquote>
            <div class="testimonial-author">
              <img src="${testimonial.image}" alt="${testimonial.author}" class="author-img">
              <div class="author-info">
                <p class="author-name">${testimonial.author}</p>
                <p class="author-position">${testimonial.position}</p>
              </div>
            </div>
          `;
        sliderTrack.appendChild(slide);
      });

      // Create navigation
      const sliderNav = document.createElement("div");
      sliderNav.className = "testimonial-nav";

      // Create navigation dots
      testimonials.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = index === 0 ? "nav-dot active" : "nav-dot";
        dot.setAttribute("data-index", index);
        sliderNav.appendChild(dot);
      });

      // Create navigation arrows
      const prevArrow = document.createElement("button");
      prevArrow.className = "nav-arrow prev";
      prevArrow.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;

      const nextArrow = document.createElement("button");
      nextArrow.className = "nav-arrow next";
      nextArrow.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `;

      // Add elements to container
      sliderContainer.appendChild(sliderTrack);
      sliderContainer.appendChild(sliderNav);
      sliderContainer.appendChild(prevArrow);
      sliderContainer.appendChild(nextArrow);

      // Replace existing testimonial content
      const testimonialContent = testimonialSection.querySelector(".container");
      testimonialContent.innerHTML = "";
      testimonialContent.appendChild(sliderContainer);

      // Add CSS for testimonial slider
      const sliderStyle = document.createElement("style");
      sliderStyle.textContent = `
          .testimonial-slider {
            position: relative;
            overflow: hidden;
            padding: 40px 0;
          }
          
          .testimonial-track {
            display: flex;
            transition: transform 0.5s ease;
          }
          
          .testimonial-slide {
            min-width: 100%;
            padding: 0 40px;
            text-align: center;
          }
          
          .testimonial-author {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 40px;
          }
          
          .author-info {
            text-align: left;
          }
          
          .author-name {
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .author-position {
            font-size: 14px;
            color: var(--text-light);
          }
          
          .testimonial-nav {
            display: flex;
            justify-content: center;
            margin-top: 40px;
            gap: 12px;
          }
          
          .nav-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #ddd;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          
          .nav-dot.active {
            background-color: #000;
          }
          
          .nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #fff;
            border: 1px solid #eee;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
          }
          
          .nav-arrow:hover {
            background-color: #000;
            color: #fff;
          }
          
          .nav-arrow.prev {
            left: 20px;
          }
          
          .nav-arrow.next {
            right: 20px;
          }
          
          .nav-arrow svg {
            width: 20px;
            height: 20px;
          }
        `;
      document.head.appendChild(sliderStyle);

      // Slider functionality
      let currentSlide = 0;
      const slideCount = testimonials.length;
      const track = document.querySelector(".testimonial-track");
      const dots = document.querySelectorAll(".nav-dot");

      // Go to slide
      const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        track.style.transform = `translateX(-${index * 100}%)`;

        // Update active dot
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });
        dots[index].classList.add("active");

        currentSlide = index;
      };

      // Next slide
      nextArrow.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
      });

      // Previous slide
      prevArrow.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
      });

      // Dot navigation
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const index = Number.parseInt(dot.getAttribute("data-index"));
          goToSlide(index);
        });
      });

      // Auto slide
      let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);

      // Pause auto slide on hover
      sliderContainer.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
      });

      // Resume auto slide on mouse leave
      sliderContainer.addEventListener("mouseleave", () => {
        slideInterval = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, 5000);
      });
    };

    // Initialize testimonial slider
    createTestimonialSlider();
  }

  // ======================================================
  // FORM VALIDATION AND SUBMISSION
  // ======================================================

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    // Enhanced form validation
    const enhanceFormValidation = () => {
      // Add form labels for accessibility
      const formGroups = contactForm.querySelectorAll(".form-group");

      formGroups.forEach((group) => {
        const input = group.querySelector("input, textarea");
        if (!input) return;

        // Create label
        const label = document.createElement("label");
        label.setAttribute(
          "for",
          input.placeholder.toLowerCase().replace(/\s+/g, "-")
        );
        label.className = "form-label";
        label.textContent = input.placeholder;

        // Set input id
        input.id = input.placeholder.toLowerCase().replace(/\s+/g, "-");

        // Add label before input
        group.insertBefore(label, input);

        // Create validation message element
        const validationMessage = document.createElement("div");
        validationMessage.className = "validation-message";
        group.appendChild(validationMessage);
      });

      // Add CSS for form enhancements
      const formStyle = document.createElement("style");
      formStyle.textContent = `
          .form-group {
            position: relative;
            margin-bottom: 24px;
          }
          
          .form-label {
            position: absolute;
            top: 14px;
            left: 14px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;
            pointer-events: none;
          }
          
          .form-control {
            padding-top: 20px;
            padding-bottom: 8px;
          }
          
          .form-control:focus + .form-label,
          .form-control:not(:placeholder-shown) + .form-label {
            top: 8px;
            font-size: 10px;
            opacity: 0.7;
          }
          
          .form-control::placeholder {
            opacity: 0;
          }
          
          .validation-message {
            position: absolute;
            bottom: -18px;
            left: 0;
            font-size: 12px;
            color: #ff4d4d;
          }
          
          .form-control.error {
            border: 1px solid #ff4d4d;
          }
          
          .form-success-message {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 4px;
            text-align: center;
            margin-top: 20px;
            display: none;
          }
          
          .form-success-message.active {
            display: block;
            animation: fadeIn 0.5s ease;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `;
      document.head.appendChild(formStyle);

      // Create success message
      const successMessage = document.createElement("div");
      successMessage.className = "form-success-message";
      successMessage.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40" style="margin: 0 auto 16px;">
            <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 4L12 14.01L9 11.01" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h3 style="color: #fff; margin-bottom: 8px;">Thank you for your message!</h3>
          <p style="color: rgba(255, 255, 255, 0.7);">We'll get back to you as soon as possible.</p>
        `;
      contactForm.appendChild(successMessage);
    };

    // Initialize form enhancements
    enhanceFormValidation();

    // Form validation function
    const validateForm = () => {
      let isValid = true;
      const inputs = contactForm.querySelectorAll(".form-control");

      inputs.forEach((input) => {
        // Reset validation
        input.classList.remove("error");
        const validationMessage = input.parentElement.querySelector(
          ".validation-message"
        );
        validationMessage.textContent = "";

        // Check if empty
        if (!input.value.trim()) {
          input.classList.add("error");
          validationMessage.textContent = "This field is required";
          isValid = false;
        }

        // Email validation
        if (input.type === "email" && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            input.classList.add("error");
            validationMessage.textContent =
              "Please enter a valid email address";
            isValid = false;
          }
        }
      });

      return isValid;
    };

    // Form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate form
      if (validateForm()) {
        // Show loading state
        const submitButton = this.querySelector("button[type='submit']");
        const originalText = submitButton.textContent;
        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
          // Hide form
          const formElements = this.querySelectorAll(".form-group, button");
          formElements.forEach((element) => {
            element.style.opacity = "0";
            setTimeout(() => {
              element.style.display = "none";
            }, 300);
          });

          // Show success message
          const successMessage = this.querySelector(".form-success-message");
          setTimeout(() => {
            successMessage.classList.add("active");
          }, 300);

          // Reset form
          this.reset();

          // Reset form after delay
          setTimeout(() => {
            successMessage.classList.remove("active");
            formElements.forEach((element) => {
              element.style.display = "";
              setTimeout(() => {
                element.style.opacity = "1";
              }, 10);
            });
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }, 5000);
        }, 1500);
      }
    });
  }

  // ======================================================
  // DARK MODE TOGGLE
  // ======================================================

  // Create dark mode toggle
  const createDarkModeToggle = () => {
    // Create toggle button
    const darkModeToggle = document.createElement("button");
    darkModeToggle.className = "dark-mode-toggle";
    darkModeToggle.innerHTML = `
        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 1V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 21V23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 12H3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

    document.body.appendChild(darkModeToggle);

    // Add CSS for dark mode toggle
    const darkModeStyle = document.createElement("style");
    darkModeStyle.textContent = `
        :root {
          --transition-theme: all 0.3s ease;
        }
        
        body.dark-mode {
          --primary-color: #fff;
          --secondary-color: #111;
          --accent-color: #222;
          --text-color: #f5f5f5;
          --text-light: #aaa;
          background-color: #111;
        }
        
        body.dark-mode header.scrolled {
          background-color: rgba(17, 17, 17, 0.95);
        }
        
        body.dark-mode .service-card:hover {
          border-color: #333;
        }
        
        body.dark-mode .service-icon {
          background-color: #222;
        }
        
        body.dark-mode .feature,
        body.dark-mode .testimonial {
          background-color: #0a0a0a;
        }
        
        body.dark-mode .scroll-progress-bar {
          background-color: #fff;
        }
        
        .dark-mode-toggle {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #000;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: var(--transition-theme);
        }
        
        body.dark-mode .dark-mode-toggle {
          background-color: #fff;
          color: #000;
        }
        
        .dark-mode-toggle svg {
          width: 24px;
          height: 24px;
          transition: var(--transition-theme);
        }
        
        .sun-icon {
          opacity: 1;
          position: absolute;
        }
        
        .moon-icon {
          opacity: 0;
          position: absolute;
        }
        
        body.dark-mode .sun-icon {
          opacity: 0;
        }
        
        body.dark-mode .moon-icon {
          opacity: 1;
        }
      `;
    document.head.appendChild(darkModeStyle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
    }

    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Save theme preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  };

  // Initialize dark mode toggle
  createDarkModeToggle();

  // ======================================================
  // BACK TO TOP BUTTON
  // ======================================================

  // Create back to top button
  const createBackToTopButton = () => {
    // Create button
    const backToTopButton = document.createElement("button");
    backToTopButton.className = "back-to-top";
    backToTopButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

    document.body.appendChild(backToTopButton);

    // Add CSS for back to top button
    const backToTopStyle = document.createElement("style");
    backToTopStyle.textContent = `
        .back-to-top {
          position: fixed;
          bottom: 30px;
          left: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #000;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 100;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }
        
        .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        body.dark-mode .back-to-top {
          background-color: #fff;
          color: #000;
        }
        
        .back-to-top svg {
          width: 24px;
          height: 24px;
        }
      `;
    document.head.appendChild(backToTopStyle);

    // Show/hide button based on scroll position
    const toggleBackToTopButton = () => {
      const scrollPosition = getScrollPosition();
      const button = document.querySelector(".back-to-top");

      if (scrollPosition > 500) {
        button.classList.add("visible");
      } else {
        button.classList.remove("visible");
      }
    };

    // Scroll to top when clicked
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Throttled scroll handler for back to top button
    window.addEventListener("scroll", throttle(toggleBackToTopButton, 200));

    // Initial check
    toggleBackToTopButton();
  };

  // Initialize back to top button
  createBackToTopButton();

  // ======================================================
  // LAZY LOADING IMAGES
  // ======================================================

  // Lazy load images
  const lazyLoadImages = () => {
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute("data-src");

            if (src) {
              img.src = src;
              img.removeAttribute("data-src");

              // Add fade-in animation
              img.style.opacity = "0";
              setTimeout(() => {
                img.style.transition = "opacity 0.5s ease";
                img.style.opacity = "1";
              }, 100);
            }

            observer.unobserve(img);
          }
        });
      });

      // Target all images with data-src attribute
      const lazyImages = document.querySelectorAll("img[data-src]");
      lazyImages.forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const lazyImages = document.querySelectorAll("img[data-src]");

      lazyImages.forEach((img) => {
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
      });
    }
  };
});
