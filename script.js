function videoAnimations() {
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
}

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

function navAnimation() {
  gsap.to("nav", {
    duration: 1, // Animation duration
    background: "#000",
    scrollTrigger: {
      trigger: "body", // The element that triggers the animation
      start: "top top", // When the top of the nav hits the top of the viewport
      end: "bottom top", // When the bottom of the nav hits the top of the viewport
      toggleActions: "play none none reverse", // Play on scroll down, reverse on scroll up
      // markers: true, // Show markers for debugging (optional)
    },
  });
}

function videoSound() {
  let vol = document.querySelector(".video-container i");
  let video = document.querySelector(".video-container video");
  vol.addEventListener("click", () => {
    console.log("clicked");
    video.muted = !video.muted; // Toggle mute/unmute

    if (video.muted) {
      vol.classList.remove("ri-volume-up-fill");
      vol.classList.add("ri-volume-mute-fill"); // Change to mute icon
    } else {
      vol.classList.remove("ri-volume-mute-fill");
      vol.classList.add("ri-volume-up-fill"); // Change to volume icon
    }
  });
}

function menu() {
  var tl = gsap.timeline();
  var open = document.querySelector("nav .menu i");
  var close = document.querySelector("#full i");

  // Timeline animation
  tl.to("#full", {
    right: 0,
    duration: 0.3,
  });
  tl.from("#full h4", {
    x: 150,
    duration: 0.3,
    stagger: 0.3,
    opacity: 0,
  });
  tl.from("#full i", {
    opacity: 0,
  });
  tl.pause();

  open.addEventListener("click", function () {
    tl.play();
  });

  close.addEventListener("click", function () {
    tl.reverse();
  });
}

menu();
navAnimation();
videoAnimations();
videoSound();
