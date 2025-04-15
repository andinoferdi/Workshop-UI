/**
 * Utility functions for the website
 */

/**
 * Throttle function to limit the rate at which a function can fire
 */
export const throttle = (func, limit) => {
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
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if an element is in viewport
 */
export const isInViewport = (element, offset = 0) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset &&
    rect.left <=
      (window.innerWidth || document.documentElement.clientWidth) - offset &&
    rect.right >= offset
  );
};

/**
 * Get the current scroll position
 */
export const getScrollPosition = () => {
  return window.pageYOffset || document.documentElement.scrollTop;
};

/**
 * Animate a number from start to end
 */
export const animateNumber = (element, start, end, duration) => {
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
export const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

// Lazy loading for images
export const lazyLoadImages = () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
};

// Cache DOM queries
export const cacheDOM = (selectors) => {
  const elements = {};
  for (const key in selectors) {
    if (typeof selectors[key] === "string") {
      elements[key] = document.querySelector(selectors[key]);
    } else if (Array.isArray(selectors[key])) {
      elements[key] = document.querySelectorAll(selectors[key][0]);
    }
  }
  return elements;
};

// Optimize animations
export const optimizeAnimations = (callback) => {
  return window.requestAnimationFrame(callback);
};

// Global error handler
export const initErrorHandling = () => {
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.error(
      "Error: " +
        msg +
        "\nURL: " +
        url +
        "\nLine: " +
        lineNo +
        "\nColumn: " +
        columnNo +
        "\nError object: " +
        JSON.stringify(error)
    );
    return false;
  };

  window.addEventListener("unhandledrejection", function (event) {
    console.error("Unhandled promise rejection:", event.reason);
  });
};

// Error boundary for async functions
export const errorBoundary = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    console.error("Error caught in boundary:", error);
    // You can add custom error handling here
    throw error;
  }
};
