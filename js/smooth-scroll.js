/**
 * Smooth scrolling functionality
 */
export const initSmoothScroll = () => {
  // Enhanced smooth scrolling with advanced easing
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get header height for offset
        const headerHeight = document.getElementById("header").offsetHeight;

        // Calculate target position with better accuracy
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;

        // Optimized smooth scroll with cubic-bezier easing
        let startTime = null;
        // Adjust duration based on distance for more natural feel
        const duration = Math.min(
          Math.max(Math.abs(distance) * 0.5, 500),
          1000
        );

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);

          // Improved easing function (cubic-bezier)
          const easeOutQuint = (t) => {
            return 1 - Math.pow(1 - t, 5);
          };

          window.scrollTo({
            top: startPosition + distance * easeOutQuint(progress),
            behavior: "auto", // Using our custom easing instead of 'smooth'
          });

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            // Ensure we land exactly on target
            window.scrollTo({
              top: targetPosition,
              behavior: "auto",
            });

            // Update URL hash without scrolling
            if (history.pushState) {
              history.pushState(null, null, targetId);
            } else {
              location.hash = targetId;
            }
          }
        };

        requestAnimationFrame(animation);
      }
    });
  });
};
