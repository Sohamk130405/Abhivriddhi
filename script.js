// Select all video containers and videos
const videoContainers = document.querySelectorAll(".event-video");

// Loop through each video container and attach event listeners
videoContainers.forEach((container) => {
  const videoElement = container.querySelector("video"); // Select the video element within each container

  container.addEventListener("mouseover", () => {
    videoElement.muted = false; // Enable sound on hover
    videoElement.play(); // Play video on hover
  });

  container.addEventListener("mouseout", () => {
    videoElement.pause(); // Pause video on mouse out
    videoElement.currentTime = 0; // Optionally reset to the beginning
  });
});

function toggleFAQ(index) {
  const faqs = document.querySelectorAll(".faq-item");

  faqs.forEach((faq, i) => {
    const answer = faq.querySelector(".faq-answer");
    const icon = faq.querySelector(".faq-icon");

    if (i === index) {
      if (answer.style.display === "none" || answer.style.display === "") {
        // Show answer with animation
        gsap.to(answer, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        answer.style.display = "block";

        // Rotate icon
        gsap.to(icon, {
          rotate: 180,
          duration: 0.3,
          ease: "power2.out",
        });
        icon.classList.remove("ri-add-line");
        icon.classList.add("ri-subtract-line");
      } else {
        // Hide answer with animation
        gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            answer.style.display = "none";
          },
        });

        // Reset icon
        gsap.to(icon, {
          rotate: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        icon.classList.remove("ri-subtract-line");
        icon.classList.add("ri-add-line");
      }
    } else {
      // Close all other FAQs
      const otherAnswer = faq.querySelector(".faq-answer");
      const otherIcon = faq.querySelector(".faq-icon");

      gsap.to(otherAnswer, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          otherAnswer.style.display = "none";
        },
      });

      // Reset icon for other FAQs
      gsap.to(otherIcon, { rotate: 0, duration: 0.3, ease: "power2.out" });
      otherIcon.classList.remove("ri-subtract-line");
      otherIcon.classList.add("ri-add-line");
    }
  });
}
