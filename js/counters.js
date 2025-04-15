import { throttle, isInViewport, animateNumber } from "./utils.js";

/**
 * Counter animations
 */
export const initCounters = () => {
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
};
