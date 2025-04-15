import { throttle, isInViewport } from "./utils.js";

/**
 * Scroll animations
 */
export const initScrollAnimations = () => {
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
      will-change: opacity, transform;
    }
    
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .fade-in-left {
      opacity: 0;
      transform: translateX(-30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
      will-change: opacity, transform;
    }
    
    .fade-in-left.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    .fade-in-right {
      opacity: 0;
      transform: translateX(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
      will-change: opacity, transform;
    }
    
    .fade-in-right.visible {
      opacity: 1;
      transform: translateX(0);
    }
    
    .scale-in {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 1s ease, transform 1s ease;
      will-change: opacity, transform;
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
      element.style.transitionDelay = `${index * 0.2}s`;
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
        // Add visible class when in viewport
        element.classList.add("visible");
      } else {
        // Remove visible class when out of viewport
        element.classList.remove("visible");
      }
    });
  };

  // Throttled scroll handler for animations
  window.addEventListener("scroll", throttle(animateOnScroll, 100));

  // Initial animation check
  setTimeout(animateOnScroll, 500);
};
