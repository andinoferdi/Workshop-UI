/**
 * Main JavaScript file for Artisan Design Studio
 * Initializes all components and functionality
 */

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize all components
    initPreloader();
    initCursor();
    initNavigation();
    initScrollAnimations();
    initTheme();
  } catch (error) {
    console.error('Error initializing components:', error);
  }
});
