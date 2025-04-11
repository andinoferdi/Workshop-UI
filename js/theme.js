/**
 * Theme functionality for Artisan Design Studio
 */

// Initialize theme functionality
function initTheme() {
  try {
    createDarkModeToggle();
    createBackToTopButton();
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
}

// Create dark mode toggle
function createDarkModeToggle() {
  const darkModeToggle = document.createElement("button");
  darkModeToggle.className = "dark-mode-toggle";
  darkModeToggle.innerHTML = `
    <svg class="sun" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    <svg class="moon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  document.body.appendChild(darkModeToggle);

  // Add CSS for dark mode toggle
  const darkModeStyle = document.createElement("style");
  darkModeStyle.textContent = `
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
      transition: all 0.3s ease;
    }

    body.dark-mode .dark-mode-toggle {
      background-color: #fff;
      color: #000;
    }

    .dark-mode-toggle svg {
      width: 24px;
      height: 24px;
    }

    .dark-mode-toggle .moon {
      display: none;
    }

    body.dark-mode .dark-mode-toggle .sun {
      display: none;
    }

    body.dark-mode .dark-mode-toggle .moon {
      display: block;
    }
  `;
  document.head.appendChild(darkModeStyle);

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    updateDarkModeElements(true);
  }

  // Toggle dark mode
  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = document.body.classList.toggle("dark-mode");
    updateDarkModeElements(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
}

// Update specific elements when dark mode changes
function updateDarkModeElements(isDarkMode) {
  // Update service icons
  const serviceIcons = document.querySelectorAll(".service-icon svg");
  serviceIcons.forEach((icon) => {
    icon.style.stroke = isDarkMode ? "#fff" : "#000";
  });

  // Update learn more links
  const learnMoreLinks = document.querySelectorAll(".learn-more");
  learnMoreLinks.forEach((link) => {
    link.style.color = isDarkMode ? "#aaa" : "";
  });

  // Update buttons with outline style
  const outlineButtons = document.querySelectorAll(".btn-outline");
  outlineButtons.forEach((button) => {
    button.style.color = isDarkMode ? "#fff" : "";
    button.style.borderColor = isDarkMode ? "#fff" : "";
  });
}

// Create back to top button
function createBackToTopButton() {
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
  function toggleBackToTopButton() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollPosition > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  }

  // Scroll to top when clicked
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Throttled scroll handler for back to top button
  window.addEventListener("scroll", () => {
    requestAnimationFrame(toggleBackToTopButton);
  });
}

initTheme();
