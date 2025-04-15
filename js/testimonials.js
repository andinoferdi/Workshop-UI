/**
 * Testimonial slider functionality
 */
export const initTestimonials = () => {
  const testimonialSection = document.querySelector("#testimonial");

  if (testimonialSection) {
    // Create testimonial slider
    const createTestimonialSlider = () => {
      // Sample testimonials data
      const testimonials = [
        {
          quote:
            "Anro Studio transformed our digital presence completely. Their strategic approach and attention to detail resulted in a 40% increase in user engagement.",
          author: "Maria Lopez",
          position: "VP of Design at Meshery",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
        },
        {
          quote:
            "Working with Anro Studio was a game-changer for our brand. Their team delivered a website that perfectly captures our vision and has significantly improved our conversion rates.",
          author: "David Chen",
          position: "CEO of TechFlow",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80",
        },
        {
          quote:
            "The Anro Studio team exceeded our expectations at every turn. Their attention to detail and commitment to quality is unmatched in the industry.",
          author: "Sarah Johnson",
          position: "Marketing Director at Elevate",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
        },
      ];

      // Create slider container
      const sliderContainer = document.createElement("div");
      sliderContainer.className = "testimonial-slider";

      // Create slider track
      const sliderTrack = document.createElement("div");
      sliderTrack.className = "testimonial-track";

      // Create testimonial slides
      testimonials.forEach((testimonial) => {
        const slide = document.createElement("div");
        slide.className = "testimonial-slide";
        slide.innerHTML = `
          <blockquote>${testimonial.quote}</blockquote>
          <div class="testimonial-author">
            <img src="${testimonial.image}" alt="${testimonial.author}" class="author-img">
            <div class="author-info">
              <p class="author-name">${testimonial.author}</p>
              <p class="author-position">${testimonial.position}</p>
            </div>
          </div>
        `;
        sliderTrack.appendChild(slide);
      });

      // Create navigation
      const sliderNav = document.createElement("div");
      sliderNav.className = "testimonial-nav";

      // Create navigation dots
      testimonials.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = index === 0 ? "nav-dot active" : "nav-dot";
        dot.setAttribute("data-index", index);
        sliderNav.appendChild(dot);
      });

      // Create navigation arrows
      const prevArrow = document.createElement("button");
      prevArrow.className = "nav-arrow prev";
      prevArrow.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      const nextArrow = document.createElement("button");
      nextArrow.className = "nav-arrow next";
      nextArrow.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;

      // Add elements to container
      sliderContainer.appendChild(sliderTrack);
      sliderContainer.appendChild(sliderNav);
      sliderContainer.appendChild(prevArrow);
      sliderContainer.appendChild(nextArrow);

      // Replace existing testimonial content
      const testimonialContent = testimonialSection.querySelector(".container");
      testimonialContent.innerHTML = "";
      testimonialContent.appendChild(sliderContainer);

      // Add CSS for testimonial slider
      const sliderStyle = document.createElement("style");
      sliderStyle.textContent = `
        .testimonial-slider {
          position: relative;
          overflow: hidden;
          padding: 40px 0;
        }
        
        .testimonial-track {
          display: flex;
          transition: transform 0.5s ease;
        }
        
        .testimonial-slide {
          min-width: 100%;
          padding: 0 40px;
          text-align: center;
        }
        
        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
        }
        
        .author-info {
          text-align: left;
        }
        
        .author-name {
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .author-position {
          font-size: 14px;
          color: var(--text-light);
        }
        
        .testimonial-nav {
          display: flex;
          justify-content: center;
          margin-top: 40px;
          gap: 12px;
        }
        
        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #ddd;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .nav-dot.active {
          background-color: #000;
        }
        
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #fff;
          border: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }
        
        .nav-arrow:hover {
          background-color: #000;
          color: #fff;
        }
        
        .nav-arrow.prev {
          left: 20px;
        }
        
        .nav-arrow.next {
          right: 20px;
        }
        
        .nav-arrow svg {
          width: 20px;
          height: 20px;
        }
      `;
      document.head.appendChild(sliderStyle);

      // Slider functionality
      let currentSlide = 0;
      const slideCount = testimonials.length;
      const track = document.querySelector(".testimonial-track");
      const dots = document.querySelectorAll(".nav-dot");

      // Go to slide
      const goToSlide = (index) => {
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        track.style.transform = `translateX(-${index * 100}%)`;

        // Update active dot
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });
        dots[index].classList.add("active");

        currentSlide = index;
      };

      // Next slide
      nextArrow.addEventListener("click", () => {
        goToSlide(currentSlide + 1);
      });

      // Previous slide
      prevArrow.addEventListener("click", () => {
        goToSlide(currentSlide - 1);
      });

      // Dot navigation
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          const index = Number.parseInt(dot.getAttribute("data-index"));
          goToSlide(index);
        });
      });

      // Auto slide
      let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);

      // Pause auto slide on hover
      sliderContainer.addEventListener("mouseenter", () => {
        clearInterval(slideInterval);
      });

      // Resume auto slide on mouse leave
      sliderContainer.addEventListener("mouseleave", () => {
        slideInterval = setInterval(() => {
          goToSlide(currentSlide + 1);
        }, 5000);
      });
    };

    // Initialize testimonial slider
    createTestimonialSlider();
  }
};
