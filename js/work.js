/**
 * Work section functionality
 */
export const initWork = () => {
  const workSection = document.querySelector("#work");

  if (workSection) {
    // Create filter buttons
    const createWorkFilters = () => {
      const filterContainer = document.createElement("div");
      filterContainer.className = "work-filters";

      const filters = ["All", "Web Design", "Mobile App", "Branding"];

      filters.forEach((filter, index) => {
        const button = document.createElement("button");
        button.className = index === 0 ? "filter-btn active" : "filter-btn";
        button.textContent = filter;
        button.setAttribute(
          "data-filter",
          filter.toLowerCase().replace(" ", "-")
        );

        button.addEventListener("click", function () {
          // Remove active class from all buttons
          document.querySelectorAll(".filter-btn").forEach((btn) => {
            btn.classList.remove("active");
          });

          // Add active class to clicked button
          this.classList.add("active");

          // Filter work items
          const filterValue = this.getAttribute("data-filter");

          document.querySelectorAll(".work-item").forEach((item) => {
            if (filterValue === "all" || item.classList.contains(filterValue)) {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, 100);
            } else {
              item.style.opacity = "0";
              item.style.transform = "translateY(20px)";
              setTimeout(() => {
                item.style.display = "none";
              }, 500);
            }
          });
        });

        filterContainer.appendChild(button);
      });

      // Add filter buttons to work section
      const sectionHeader = workSection.querySelector(".section-header");
      sectionHeader.appendChild(filterContainer);

      // Add CSS for filter buttons
      const filterStyle = document.createElement("style");
      filterStyle.textContent = `
        .work-filters {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 30px;
        }
        
        .filter-btn {
          background: none;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-light);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .filter-btn::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background-color: #000;
          transition: width 0.3s ease;
        }
        
        .filter-btn:hover {
          color: #000;
        }
        
        .filter-btn.active {
          color: #000;
        }
        
        .filter-btn.active::after {
          width: 30px;
        }
      `;
      document.head.appendChild(filterStyle);
    };

    // Add categories to work items
    const workItems = document.querySelectorAll(".work-item");
    const categories = ["web-design", "mobile-app", "branding"];

    workItems.forEach((item, index) => {
      // Assign random category for demo purposes
      const category = categories[index % categories.length];
      item.classList.add(category);
    });

    // Create and add filters
    createWorkFilters();

    // Add lightbox functionality for work items
    const createLightbox = () => {
      // Create lightbox container
      const lightbox = document.createElement("div");
      lightbox.className = "lightbox";
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <div class="lightbox-image-container">
            <img class="lightbox-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Project Image">
          </div>
          <div class="lightbox-details">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-description"></p>
            <div class="lightbox-meta">
              <div class="lightbox-meta-item">
                <span class="meta-label">Client:</span>
                <span class="meta-client"></span>
              </div>
              <div class="lightbox-meta-item">
                <span class="meta-label">Services:</span>
                <span class="meta-services"></span>
              </div>
              <div class="lightbox-meta-item">
                <span class="meta-label">Year:</span>
                <span class="meta-year"></span>
              </div>
            </div>
            <a href="#" class="btn-primary lightbox-link" target="_blank">View Live Project</a>
          </div>
        </div>
      `;

      document.body.appendChild(lightbox);

      // Add CSS for lightbox
      const lightboxStyle = document.createElement("style");
      lightboxStyle.textContent = `
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .lightbox.active {
          opacity: 1;
          visibility: visible;
        }
        
        .lightbox-content {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 30px;
          width: 90%;
          max-width: 1000px;
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          transform: scale(0.9);
          transition: transform 0.3s ease;
          position: relative;
          max-height: 90vh;
        }
        
        .lightbox.active .lightbox-content {
          transform: scale(1);
        }
        
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 30px;
          color: #fff;
          cursor: pointer;
          z-index: 1001;
        }
        
        .lightbox-image-container {
          height: 500px;
          overflow: hidden;
        }
        
        .lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .lightbox-details {
          padding: 40px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .lightbox-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        
        .lightbox-description {
          color: var(--text-light);
          margin-bottom: 24px;
        }
        
        .lightbox-meta {
          margin-top: auto;
          margin-bottom: 30px;
        }
        
        .lightbox-meta-item {
          margin-bottom: 12px;
        }
        
        .meta-label {
          font-weight: 600;
          margin-right: 8px;
        }
        
        .lightbox-link {
          display: inline-block;
          margin-top: auto;
        }

        @media screen and (max-width: 768px) {
          .lightbox-content {
            grid-template-columns: 1fr;
            width: 95%;
            height: auto;
            max-height: 85vh;
            overflow-y: auto;
            margin: 20px;
            scrollbar-width: thin;
            scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
          }

          .lightbox-content::-webkit-scrollbar {
            width: 6px;
          }

          .lightbox-content::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
          }

          .lightbox-content::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 3px;
            transition: background-color 0.3s ease;
          }

          .lightbox-content::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }

          .lightbox-image-container {
            height: 200px;
          }

          .lightbox-details {
            padding: 20px;
            height: auto;
          }

          .lightbox-title {
            font-size: 20px;
            margin-bottom: 12px;
          }

          .lightbox-description {
            font-size: 14px;
            margin-bottom: 20px;
            line-height: 1.5;
          }

          .lightbox-meta {
            margin: 20px 0;
          }

          .lightbox-meta-item {
            margin-bottom: 8px;
            font-size: 14px;
          }

          .lightbox-close {
            top: 10px;
            right: 10px;
            font-size: 24px;
            background: rgba(0, 0, 0, 0.5);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
          }

          .lightbox-link {
            width: 100%;
            text-align: center;
          }
        }
      `;
      document.head.appendChild(lightboxStyle);

      // Lightbox functionality
      const lightboxElement = document.querySelector(".lightbox");
      const lightboxClose = document.querySelector(".lightbox-close");
      const lightboxImage = document.querySelector(".lightbox-image");
      const lightboxTitle = document.querySelector(".lightbox-title");
      const lightboxDescription = document.querySelector(
        ".lightbox-description"
      );
      const lightboxClient = document.querySelector(".meta-client");
      const lightboxServices = document.querySelector(".meta-services");
      const lightboxYear = document.querySelector(".meta-year");
      const lightboxLink = document.querySelector(".lightbox-link");

      // Sample project data
      const projectData = [
        {
          title: "Luxe Boutique E-commerce Platform",
          description:
            "A premium shopping experience that increased conversion rates by 42% and average order value by 28%. The platform features a custom product recommendation engine and seamless checkout process.",
          client: "Luxe Fashion Inc.",
          services: "UI/UX Design, Web Development, E-commerce",
          year: "2023",
          link: "#",
        },
        {
          title: "FinTrack Dashboard App",
          description:
            "An intuitive financial management platform that helped users save an average of 15% more through better visualization. The app includes real-time data tracking and personalized insights.",
          client: "FinTech Solutions",
          services: "Mobile App Design, UI/UX, Development",
          year: "2022",
          link: "#",
        },
        {
          title: "MediConnect Mobile Application",
          description:
            "A healthcare app that improved patient engagement by 67% and streamlined appointment scheduling processes. Features include telemedicine integration and health record management.",
          client: "MediCare Group",
          services: "Mobile App Design, Branding, Development",
          year: "2023",
          link: "#",
        },
      ];

      // Open lightbox when clicking on work item
      workItems.forEach((item, index) => {
        const overlay = item.querySelector(".work-overlay");
        const viewButton = overlay.querySelector(".btn-white-sm");

        viewButton.addEventListener("click", (e) => {
          e.preventDefault();

          // Get project data
          const project = projectData[index % projectData.length];

          // Set lightbox content
          lightboxImage.src = item.querySelector("img").src;
          lightboxTitle.textContent = project.title;
          lightboxDescription.textContent = project.description;
          lightboxClient.textContent = project.client;
          lightboxServices.textContent = project.services;
          lightboxYear.textContent = project.year;
          lightboxLink.href = project.link;

          // Show lightbox
          lightboxElement.classList.add("active");
          document.body.style.overflow = "hidden";
        });
      });

      // Close lightbox
      lightboxClose.addEventListener("click", () => {
        lightboxElement.classList.remove("active");
        document.body.style.overflow = "auto";
      });

      // Close lightbox when clicking outside content
      lightboxElement.addEventListener("click", (e) => {
        if (e.target === lightboxElement) {
          lightboxElement.classList.remove("active");
          document.body.style.overflow = "auto";
        }
      });
    };

    // Initialize lightbox
    createLightbox();
  }
};
