/**
 * Custom cursor functionality for Artisan Design Studio
 */

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorActive = false;

function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  // Add cursor styles
  const cursorStyle = document.createElement("style");
  cursorStyle.textContent = `
    .cursor {
      opacity: 0;
      mix-blend-mode: difference;
      transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    }
    .cursor-follower {
      opacity: 0;
      mix-blend-mode: difference;
      transition: transform 0.6s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
    }
    .cursor.visible, .cursor-follower.visible {
      opacity: 1;
    }
    .cursor.follower-hover {
      transform: translate(-50%, -50%) scale(1.5);
    }
    .cursor-follower.follower-hover {
      transform: translate(-50%, -50%) scale(1.3);
    }
  `;
  document.head.appendChild(cursorStyle);

  // Mouse move handler
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) cursor.classList.add("visible");
    if (cursorFollower) cursorFollower.classList.add("visible");
  });

  // Mouse down effect
  document.addEventListener("mousedown", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    if (cursorFollower) cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)";
    cursorActive = true;
  });

  // Mouse up effect
  document.addEventListener("mouseup", () => {
    if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
    if (cursorFollower) cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    cursorActive = false;
  });

  // Enhanced hover effects for interactive elements
  const cursorInteractiveElements = document.querySelectorAll(
    "a, button, .menu-toggle, .work-item, .service-card, .client-logo, input, textarea, .social-icon"
  );

  cursorInteractiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor) cursor.classList.add("follower-hover");
      if (cursorFollower) cursorFollower.classList.add("follower-hover");
      if (el.dataset.cursorText && cursor) {
        cursor.innerHTML = `<span>${el.dataset.cursorText}</span>`;
      }
    });

    el.addEventListener("mouseleave", () => {
      if (cursor) cursor.classList.remove("follower-hover");
      if (cursorFollower) cursorFollower.classList.remove("follower-hover");
      if (cursor) cursor.innerHTML = "";
    });
  });

  // Start cursor animation
  animateCursor();
}

// Enhanced cursor animation with smooth movement
function animateCursor() {
  cursorX = lerp(cursorX, mouseX, 0.1);
  cursorY = lerp(cursorY, mouseY, 0.1);

  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (cursor && cursorFollower) {
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorFollower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
}

// Define lerp function
function lerp(start, end, fraction) {
  return start + (end - start) * fraction;
}
