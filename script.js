document.addEventListener("DOMContentLoaded", () => {
  const predictionForm = document.getElementById("prediction-form");
  const predictionResult = document.getElementById("prediction-result");
  const cropNameElement = document.getElementById("crop-name");
  const cropDetailsElement = document.getElementById("crop-details");
  const resetPredictionBtn = document.getElementById("reset-prediction");
  const contactForm = document.getElementById("contact-form");

  // Crop prediction function (simulated)
  function predictCrop(formData) {
    // This is a simplified prediction logic
    // In a real-world scenario, this would be replaced with an API call to a machine learning model
    const crops = [
      {
        name: "Wheat",
        conditions: "Thrives in moderate temperatures, well-drained soil",
        idealNitrogen: [50, 100],
        idealPH: [6.0, 7.5],
      },
      {
        name: "Rice",
        conditions: "Requires high humidity and warm temperatures",
        idealNitrogen: [100, 150],
        idealPH: [5.5, 6.5],
      },
      {
        name: "Corn",
        conditions: "Prefers warm climates with consistent moisture",
        idealNitrogen: [150, 200],
        idealPH: [5.8, 7.0],
      },
      {
        name: "Soybeans",
        conditions: "Adaptable to various climates, prefers well-drained soil",
        idealNitrogen: [50, 100],
        idealPH: [6.0, 7.0],
      },
    ];

    // Simple matching logic based on input parameters
    const matchedCrop = crops.find(
      (crop) =>
        formData.nitrogen >= crop.idealNitrogen[0] &&
        formData.nitrogen <= crop.idealNitrogen[1] &&
        formData.ph >= crop.idealPH[0] &&
        formData.ph <= crop.idealPH[1]
    );

    return matchedCrop || crops[0]; // Default to first crop if no match
  }

  // Handle prediction form submission
  predictionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      nitrogen: parseFloat(document.getElementById("nitrogen").value),
      phosphorus: parseFloat(document.getElementById("phosphorus").value),
      potassium: parseFloat(document.getElementById("potassium").value),
      temperature: parseFloat(document.getElementById("temperature").value),
      humidity: parseFloat(document.getElementById("humidity").value),
      ph: parseFloat(document.getElementById("ph").value),
      rainfall: parseFloat(document.getElementById("rainfall").value),
    };

    // Simulate loading
    predictionForm.classList.add("hidden");
    predictionResult.classList.remove("hidden");

    // Predict crop
    const predictedCrop = predictCrop(formData);

    // Display result
    cropNameElement.textContent = predictedCrop.name;
    cropDetailsElement.innerHTML = `
            <p><strong>Growing Conditions:</strong> ${predictedCrop.conditions}</p>
            <p><strong>Ideal Nitrogen Range:</strong> ${predictedCrop.idealNitrogen[0]} - ${predictedCrop.idealNitrogen[1]} units</p>
            <p><strong>Ideal pH Range:</strong> ${predictedCrop.idealPH[0]} - ${predictedCrop.idealPH[1]}</p>
        `;
  });

  // Reset prediction
  resetPredictionBtn.addEventListener("click", () => {
    predictionResult.classList.add("hidden");
    predictionForm.classList.remove("hidden");
    predictionForm.reset();
  });

  // Contact form submission (simulated)
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
});
