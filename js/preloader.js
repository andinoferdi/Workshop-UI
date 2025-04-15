document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.querySelector(".preloader");
  const mainContent = document.querySelector(".main-content");
  const progress = document.querySelector(".progress");

  // Create stars
  createStars();

  // Simulate loading progress
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 5;
    if (width > 100) width = 100;
    if (progress) progress.style.width = width + "%";

    if (width >= 100) {
      clearInterval(interval);

      // Hide preloader and show main content after animations complete
      setTimeout(() => {
        preloader.classList.add("fade-out");
        mainContent.classList.add("visible");

        // Remove preloader from DOM after fade out
        setTimeout(() => {
          preloader.style.display = "none";
        }, 600);
      }, 400);
    }
  }, 50);

  function createStars() {
    const starsContainer = document.createElement("div");
    starsContainer.className = "stars";
    preloader.appendChild(starsContainer);

    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size
      const size = Math.random() * 3 + 1;

      // Random opacity and animation duration/delay
      const opacity = Math.random() * 0.7 + 0.3;
      const duration = Math.random() * 4 + 3;
      const delay = Math.random() * 5;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--opacity", opacity);
      star.style.setProperty("--duration", `${duration}s`);
      star.style.setProperty("--delay", `${delay}s`);

      starsContainer.appendChild(star);
    }
  }
});
