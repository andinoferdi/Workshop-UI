import { initHeader } from "./header.js";
import { animateHeroElements } from "./hero.js";
import { initParallax } from "./parallax.js";
import { initWork } from "./work.js";
import { initTestimonials } from "./testimonials.js";
import { initCounters } from "./counters.js";
import { initScrollAnimations } from "./scroll-animations.js";
import { initSmoothScroll } from "./smooth-scroll.js";
import { lazyLoadImages } from "./utils.js";

// Form submission handler
async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  try {
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Validate form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      throw new Error("Please fill in all required fields");
    }

    if (!isValidEmail(data.email)) {
      throw new Error("Please enter a valid email address");
    }

    // Simulate API call (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await Swal.fire({
      title: "Success!",
      text: "Your message has been sent successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    form.reset();
  } catch (error) {
    console.error("Form submission error:", error);
    await Swal.fire({
      title: "Error!",
      text:
        error.message ||
        "There was a problem sending your message. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Make handleSubmit available globally
window.handleSubmit = handleSubmit;

// Initialize all functionality
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Initialize core functionality
    initHeader();
    initParallax();
    initWork();
    initTestimonials();
    initCounters();
    initScrollAnimations();
    initSmoothScroll();

    // Initialize performance optimizations
    lazyLoadImages();

    // Initialize hero animations after a slight delay
    setTimeout(() => {
      animateHeroElements();
    }, 100);

    // Initialize contact form if it exists
    initContactForm();
  } catch (error) {
    console.error("Initialization error:", error);
    // Show user-friendly error message
    Swal.fire({
      title: "Oops!",
      text: "Something went wrong while loading the page. Please refresh to try again.",
      icon: "error",
      confirmButtonText: "Refresh",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
  }
});

// Contact form initialization
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return; // Exit if form doesn't exist

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (!submitButton) return; // Exit if button doesn't exist

  // Add input validation listeners
  const inputs = contactForm.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateInput(this);
    });
    input.addEventListener("blur", function () {
      validateInput(this);
    });
  });

  function validateInput(input) {
    if (input.hasAttribute("required") && !input.value.trim()) {
      input.setCustomValidity("This field is required");
    } else if (input.type === "email" && input.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value.trim())) {
        input.setCustomValidity("Please enter a valid email address");
      } else {
        input.setCustomValidity("");
      }
    } else {
      input.setCustomValidity("");
    }

    // Update submit button state
    submitButton.disabled = !contactForm.checkValidity();
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!this.checkValidity()) {
      e.stopPropagation();
      return;
    }

    try {
      submitButton.disabled = true;
      submitButton.classList.add("loading");

      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success message
      await Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      this.reset();
      inputs.forEach(validateInput);
    } catch (error) {
      console.error("Form submission error:", error);
      await Swal.fire({
        title: "Error!",
        text: "There was a problem sending your message. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
    }
  });
}
