/**
 * Animations and preloader functionality for Artisan Design Studio
 */

// Initialize preloader
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

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
            document.body.classList.add("loaded");
            animateHeroElements();
          }, 500);
        }, 500);
      }
    }, 50);
  };

  startPreloader();
}

// Initialize scroll animations
function initScrollAnimations() {
  const animateOnScroll = () => {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((element) => {
      if (isInViewport(element, 50)) {
        element.classList.add("animated");
      }
    });

    // Animate counters
    const counterElements = document.querySelectorAll(".counter");
    counterElements.forEach((counter) => {
      if (
        isInViewport(counter, 50) &&
        !counter.classList.contains("counted")
      ) {
        const target = parseInt(counter.getAttribute("data-target"));
        animateNumber(counter, 0, target, 2000);
        counter.classList.add("counted");
      }
    });

    // Animate progress bars
    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar) => {
      if (
        isInViewport(bar, 50) &&
        !bar.classList.contains("animated")
      ) {
        const target = bar.getAttribute("data-width");
        bar.style.width = target + "%";
        bar.classList.add("animated");
      }
    });
  };

  // Add scroll event listener for animations
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check
}

// Animate hero elements
function animateHeroElements() {
  const heroElements = document.querySelectorAll(".hero-animate");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("animated");
    }, index * 200);
  });
}
