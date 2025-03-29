document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");
  const predictBtn = document.getElementById("predictBtn");
  const nitrogenInput = document.getElementById("nitrogen");
  const phosphorusInput = document.getElementById("phosphorus");
  const potassiumInput = document.getElementById("potassium");
  const temperatureInput = document.getElementById("temperature");
  const humidityInput = document.getElementById("humidity");
  const phInput = document.getElementById("ph");
  const rainfallInput = document.getElementById("rainfall");
  const loadingSpinner = document.getElementById("loading");
  const resultContent = document.getElementById("resultContent");
  const resultCrop = document.getElementById("resultCrop");

  // Navbar Toggle
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Dark mode toggle
  if (themeToggle) {
    // Check if user previously enabled dark mode
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-theme");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");

      if (document.body.classList.contains("dark-theme")) {
        localStorage.setItem("darkMode", "enabled");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem("darkMode", "disabled");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      if (hamburger && hamburger.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed navbar
          behavior: "smooth",
        });
      }
    });
  });

  // Highlight active section in navbar
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links li");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.querySelector("a").getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });

  // Form validation
  function validateInputs() {
    const inputs = [
      { element: nitrogenInput, name: "N", min: 0, max: 300 },
      { element: phosphorusInput, name: "P", min: 0, max: 300 },
      { element: potassiumInput, name: "K", min: 0, max: 300 },
      { element: temperatureInput, name: "Temperature", min: 0, max: 50 },
      { element: humidityInput, name: "Humidity", min: 0, max: 100 },
      { element: phInput, name: "pH", min: 0, max: 14 },
      { element: rainfallInput, name: "Rainfall", min: 0, max: 500 },
    ];

    let isValid = true;
    let errorMessage = "";

    inputs.forEach((input) => {
      if (!input.element.value) {
        isValid = false;
        errorMessage = `Please enter a value for ${input.name}`;
        input.element.focus();
        return;
      }

      const value = parseFloat(input.element.value);
      if (isNaN(value)) {
        isValid = false;
        errorMessage = `${input.name} must be a number`;
        input.element.focus();
        return;
      }

      if (value < input.min || value > input.max) {
        isValid = false;
        errorMessage = `${input.name} must be between ${input.min} and ${input.max}`;
        input.element.focus();
        return;
      }
    });

    return { isValid, errorMessage };
  }

  // Crop prediction
  if (predictBtn) {
    predictBtn.addEventListener("click", () => {
      const validation = validateInputs();

      if (!validation.isValid) {
        showError(validation.errorMessage);
        return;
      }

      // Show loading spinner
      loadingSpinner.classList.remove("hidden");
      resultContent.innerHTML = "";
      resultCrop.classList.add("hidden");

      // Prepare data for prediction
      const data = {
        N: parseFloat(nitrogenInput.value),
        P: parseFloat(phosphorusInput.value),
        K: parseFloat(potassiumInput.value),
        temperature: parseFloat(temperatureInput.value),
        humidity: parseFloat(humidityInput.value),
        ph: parseFloat(phInput.value),
        rainfall: parseFloat(rainfallInput.value),
      };

      // Send prediction request
      fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          // Hide loading spinner
          loadingSpinner.classList.add("hidden");

          if (result.success) {
            showPredictionResult(result.prediction, result.confidence);
          } else {
            showError(result.error || "An error occurred during prediction");
          }
        })
        .catch((error) => {
          loadingSpinner.classList.add("hidden");
          showError("Failed to connect to the server. Please try again.");
          console.error("Error:", error);
        });
    });
  }

  function showPredictionResult(crop, confidence) {
    resultContent.classList.add("hidden");
    resultCrop.classList.remove("hidden");

    // Capitalize the crop name
    const formattedCrop = crop
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Create a Wikipedia URL for the crop
    let wikiUrl;
    switch (crop.toLowerCase()) {
      case "blackgram":
        wikiUrl = "https://en.wikipedia.org/wiki/Vigna_mungo";
        break;
      case "kidneybeans":
        wikiUrl = "https://en.wikipedia.org/wiki/Kidney_bean";
        break;
      case "mothbeans":
        wikiUrl = "https://en.wikipedia.org/wiki/Vigna_aconitifolia";
        break;
      case "mungbean":
        wikiUrl = "https://en.wikipedia.org/wiki/Mung_bean";
        break;
      case "orange":
        wikiUrl = "https://en.wikipedia.org/wiki/Orange_(fruit)";
        break;
      case "pigeonpeas":
        wikiUrl = "https://en.wikipedia.org/wiki/Pigeon_pea";
        break;
      case "grapes":
        wikiUrl = "https://en.wikipedia.org/wiki/Grape";
        break;
      default:
        // For most crops, just use the crop name
        wikiUrl = `https://en.wikipedia.org/wiki/${
          crop.charAt(0).toUpperCase() + crop.slice(1).toLowerCase()
        }`;
    }

    // Update the crop name with a link
    resultCrop.querySelector(
      ".crop-name"
    ).innerHTML = `<a href="${wikiUrl}" target="_blank">${formattedCrop} <i class="fas fa-external-link-alt"></i></a>`;

    // Set confidence percentage
    resultCrop.querySelector(".percentage").textContent = confidence + "%";

    // Animate the progress bar
    const progress = resultCrop.querySelector(".progress");
    progress.style.width = "0%";

    setTimeout(() => {
      progress.style.width = confidence + "%";
    }, 100);
  }

  function showError(message) {
    resultCrop.classList.add("hidden");
    resultContent.classList.remove("hidden");
    resultContent.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>${message}</p>
            </div>
        `;
  }

  // Contact form handling
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      if (nameInput && emailInput && messageInput) {
        // Show success message (in a real app, this would send data to a server)
        contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                `;
      }
    });
  }

  // Add animations on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".stat-card, .crop-tag, .hero-content, .hero-image"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 50) {
        element.classList.add("animate");
      }
    });
  };

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Initial check on page load
});
