// Utility functions shared across all pages

// Set active nav link based on current page
export function setActiveNavLink(sectionId) {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"

  const sectionMap = {
    home: "index.html",
    about: "about.html",
    articles: "articles.html",
    gallery: "gallery.html",
    contact: "contact.html",
  }

  const expectedFile = sectionMap[sectionId] || "index.html"

  if (currentPage === expectedFile || (sectionId === "home" && currentPage === "")) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
      if (link.dataset.section === sectionId) {
        link.classList.add("active")
      }
    })
  }
}

// Mobile menu toggle
export function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      mobileMenu.classList.toggle("active")
    })

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("active")
      })
    })

    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("active")
      }
    })
  }
}

export function setupNavbarScroll() {
  const navbar = document.getElementById("navbar")
  const lastScrollTop = 0

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.pageYOffset

      if (scrollY > 100) {
        navbar.classList.add("scroll-effect")
        navbar.classList.add("animate-nav-slide")
      } else {
        navbar.classList.remove("scroll-effect")
      }
    },
    { passive: true },
  )
}

// Responsive breakpoint detection and scroll-to-top functionality
export function setupResponsiveHandler() {
  let isMobile = window.innerWidth < 768

  window.addEventListener("resize", () => {
    const wasSmall = isMobile
    isMobile = window.innerWidth < 768

    if (wasSmall !== isMobile) {
      const mobileMenu = document.getElementById("mobile-menu")
      if (mobileMenu && !isMobile) {
        mobileMenu.classList.add("hidden")
      }
    }
  })

  return isMobile
}

// Scroll-to-top button functionality
export function setupScrollToTop() {
  const scrollBtn = document.getElementById("scroll-to-top")

  if (scrollBtn) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.pageYOffset > 300) {
          scrollBtn.classList.remove("opacity-0", "pointer-events-none")
          scrollBtn.classList.add("opacity-100")
        } else {
          scrollBtn.classList.add("opacity-0", "pointer-events-none")
          scrollBtn.classList.remove("opacity-100")
        }
      },
      { passive: true },
    )

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Smooth scroll for anchor links
export function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerOffset = window.innerWidth < 640 ? 70 : window.innerWidth < 1024 ? 85 : 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Intersection Observer for scroll animations
export function setupScrollAnimations() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    {
      threshold: window.innerWidth < 768 ? 0.05 : 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  document.querySelectorAll(".animate-fade-in").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(40px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(el)
  })

  document.querySelectorAll(".animate-slide-in-left").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateX(-30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(el)
  })

  document.querySelectorAll(".animate-slide-in-right").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateX(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    revealObserver.observe(el)
  })
}

// Section detection and active nav link update
export function setupSectionDetection() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link[data-section]")

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -66% 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id

        navLinks.forEach((link) => {
          link.classList.remove("active")
          link.style.animation = "none"
        })

        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`)
        if (activeLink) {
          void activeLink.offsetWidth
          activeLink.classList.add("active")
          activeLink.style.animation = "none"
          void activeLink.offsetWidth
          activeLink.style.animation = "nav-active-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })
}

// Auto-demo feature for home section
export function setupDemoFeature() {
  const demoFeatures = document.querySelectorAll("#demo-features .feature-box")

  if (demoFeatures.length === 0) return

  let currentIndex = 0
  const demoInterval = setInterval(() => {
    demoFeatures.forEach((box, index) => {
      box.classList.remove("demo-active")
    })

    demoFeatures[currentIndex].classList.add("demo-active")
    currentIndex = (currentIndex + 1) % demoFeatures.length
  }, 2000)

  demoFeatures.forEach((box) => {
    box.addEventListener("click", () => {
      clearInterval(demoInterval)
      demoFeatures.forEach((b) => b.classList.remove("demo-active"))
      box.classList.add("demo-active")
    })
  })
}

export function setupModalHandlers() {
  document.querySelectorAll('[data-modal="article"]').forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id")
      window.openArticleModal(id)
    })
  })

  document.querySelectorAll('[data-modal="gallery"]').forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id")
      window.openGalleryModal(id)
    })
  })
}
