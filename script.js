// =========================================================
// Light Purple IT Portfolio Interactive Script
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Profile image fallback if file is missing
  const profileImg = document.getElementById("profileImg");
  const avatarFallback = document.getElementById("avatarFallback");
  if (profileImg && avatarFallback) {
    profileImg.addEventListener("error", () => {
      profileImg.hidden = true;
      avatarFallback.hidden = false;
    });
  }

  // 3. Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navPills = document.querySelectorAll(".nav-pill");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navPills.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 4. Active navigation highlight on scroll
  const sections = document.querySelectorAll("main section[id]");
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navPills.forEach((pill) => {
          pill.classList.toggle("active", pill.getAttribute("href") === `#${id}`);
        });
      }
    });
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // 5. Toast notification helper
  const toastEl = document.getElementById("toast");
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2800);
  }

  // 6. Copy Email button
  const copyBtn = document.getElementById("copyEmailBtn");
  const emailText = document.getElementById("emailText");
  if (copyBtn && emailText) {
    copyBtn.addEventListener("click", async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast("Email copied to clipboard!");
      } catch {
        showToast(`Email: ${email}`);
      }
    });
  }

  // 7. Contact form submission (client-side confirmation)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("senderName").value.trim();
      showToast(`Thanks, ${name || "friend"}! Your message has been received.`);
      contactForm.reset();
    });
  }

  // 8. Soft Lavender Floating Particle Bokeh Effect
  const canvas = document.getElementById("particle-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 36;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = [];
      const colors = [
        "rgba(192, 132, 252, 0.35)",
        "rgba(168, 85, 247, 0.22)",
        "rgba(233, 213, 255, 0.55)",
        "rgba(240, 171, 252, 0.30)"
      ];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 5 + 2.5,
          dx: (Math.random() - 0.5) * 0.45,
          dy: -Math.random() * 0.45 - 0.15,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    initParticles();
    animateParticles();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }
});
