/**
 * Hero section animations
 */
export const animateHeroElements = () => {
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
