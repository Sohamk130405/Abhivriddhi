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

function navAnimation() {
  var tl = gsap.timeline();
  tl.from("nav", {
    y: "-100%",
    opacity: 0,
    duration: 0.8,
  });

  tl.from(".nav-links a", {
    y: "-100%",
    opacity: 0,
    stagger: 0.2,
  });
  tl.from(".nav-icons", {
    background: "transparent",
    duration: 0.2,
  });
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

function heroSectionAnimations() {
  const tl = gsap.timeline();

  // Hero section scale-in animation
  tl.from(".hero-section", {
    scale: 0.4,
    duration: 0.5,
    ease: "power2.out",
  });

  // Initial fade and slide animations
  tl.from(".subheading", {
    opacity: 0,
    x: -100,
    duration: 1.2,
    ease: "power2.out",
  })
    .from(
      ".main-heading",
      {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    ) // Start this animation before the last one ends for overlap
    .from(
      ".description",
      {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      },
      "-=0.5"
    ); // Overlap with the main-heading animation

  // Video container animation
  gsap.from(".video-container", {
    opacity: 0,
    scale: 0.2,
    duration: 1.5,
    ease: "elastic.out(1, 0.75)",
  });

  // Continuous text animation for the subheading
  gsap.to(".subheading", {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 1,
    ease: "sine.inOut",
  });
}

function whiteSectionAnimation() {
  // Animate the statistic cards with a stagger effect
  gsap.from(".stat-card", {
    scrollTrigger: {
      trigger: ".statistics-grid",
      start: "top 90%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
  });

  // Animate the numbers inside the stat cards
  gsap.utils.toArray(".stat-card h2").forEach(function (el) {
    let endValue = el.textContent.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    gsap.fromTo(
      el,
      { textContent: 0 },
      {
        textContent: endValue,
        scrollTrigger: {
          trigger: el,
          start: "top 90%", // Trigger animation when the stat card is near the viewport
          toggleActions: "play none none none",
        },
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 }, // Snap to the nearest whole number
        onUpdate: function () {
          el.textContent = Math.floor(el.textContent).toLocaleString(); // Format the number with commas
        },
      }
    );
  });
}

function eventSectionAnimation() {
  // GSAP animations for event sections
  document.addEventListener("DOMContentLoaded", function () {
    // Animate the text when scrolling into view
    gsap.from(".events-content", {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: ".events-section",
        start: "top 80%", // When to trigger the animation
        toggleActions: "play none none none", // Play when scroll hits, no reverse
      },
    });

    // Animating each event card when it comes into view
    gsap.utils.toArray(".event").forEach((event, i) => {
      gsap.from(event, {
        opacity: 0,
        y: 100,
        duration: 1,
        delay: i * 0.3, // Staggering the animation
        scrollTrigger: {
          trigger: event,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // Event listener for hover effect on buttons
    const buttons = document.querySelectorAll(".cta-button");
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    });

    // Video reveal animation
    gsap.utils.toArray(".event-video").forEach((video) => {
      gsap.from(video, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: video,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });
  });
}

function testimonialSectionAnimation() {
  document.addEventListener("DOMContentLoaded", function () {
    // Scroll animations for testimonial sections
    gsap.utils.toArray(".eachdiv").forEach((testimonial, i) => {
      gsap.from(testimonial, {
        opacity: 0,
        x: i % 2 === 0 ? -50 : 50, // Slide from left for even elements, right for odd
        duration: 1,
        scrollTrigger: {
          trigger: testimonial,
          start: "top 80%", // Trigger animation when element is in the viewport
          toggleActions: "play none none none", // Play animation and reverse on scroll back
        },
      });
    });

    // Hover effect on testimonial cards
    const testimonialCards = document.querySelectorAll(".eachdiv");
    testimonialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, duration: 0.3 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
      });
    });

    // Headline fade-in animation
    gsap.from(".testimonials h1", {
      opacity: 0,
      y: -20,
      duration: 1.2,
      scrollTrigger: {
        trigger: ".testimonials h1",
        start: "top 90%", // Start when the heading is in view
        toggleActions: "play none none none", // Reverse the animation on scroll back
      },
    });
  });
}

function contactSectionAnimation() {
  document.addEventListener("DOMContentLoaded", function () {
    // Fade-in effect for the contact section as it scrolls into view
    // Animation for the contact form and image

    gsap.from(".contact-section .container", {
      opacity: 0,
      y: 50, // Slide up the section as it fades in
      duration: 1.2,
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 85%", // Trigger when section is in view
        toggleActions: "play none none none",
      },
    });
    gsap.from(".contact-image", {
      opacity: 0,
      x: -50, // Slide in from the left
      duration: 1,
      scrollTrigger: {
        trigger: ".contact-image",
        start: "top 85%",
      },
    });

    gsap.from(".contact-form", {
      opacity: 0,
      x: 50, // Slide in from the right
      duration: 1,
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 85%",
      },
    });

    // Hover effect for the send button
    const sendButton = document.querySelector(".send-btn");
    sendButton.addEventListener("mouseenter", () => {
      gsap.to(sendButton, {
        scale: 1.05,
        backgroundColor: "#4caf50",
        duration: 0.3,
      });
    });
    sendButton.addEventListener("mouseleave", () => {
      gsap.to(sendButton, {
        scale: 1,
        backgroundColor: "#007bff",
        duration: 0.3,
      });
    });
  });
}

function footerAnimation() {
  document.addEventListener("DOMContentLoaded", function () {
    // Social media icon hover animation

    // Footer text animation on scroll
    gsap.from(".footer-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: ".footer",
        start: "top 90%",
        toggleActions: "restart pause resume pause",
      },
    });

    // Animate links in the footer
    gsap.utils.toArray(".footer-links a").forEach((link, i) => {
      gsap.from(link, {
        opacity: 0,
        x: i % 2 === 0 ? -20 : 20, // Alternate direction for staggered effect
        duration: 0.8,
        scrollTrigger: {
          trigger: link,
          start: "top 90%",
          toggleActions: "restart pause resume pause",
        },
      });
    });
  });
}

menu();
navAnimation();
videoAnimations();
videoSound();
heroSectionAnimations();
whiteSectionAnimation();
eventSectionAnimation();
testimonialSectionAnimation();
contactSectionAnimation();
footerAnimation();
