import { throttle, getScrollPosition } from "./utils.js";

/**
 * Parallax effects
 */
export const initParallax = () => {
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
};
