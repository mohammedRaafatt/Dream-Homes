document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show")
        }
      }
    })
  })

  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value

      if (!name || !email || !phone) {
        showFormMessage("Please fill in all required fields.", "error")
        return
      }

      showFormMessage("Thank you! Your inquiry has been submitted. We will contact you within 24 hours.", "success")

      this.reset()
    })
  }

  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Thank you for subscribing to our newsletter!")
      this.reset()
    })
  }

  const backToTopButton = document.getElementById("backToTop")
  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show")
      } else {
        backToTopButton.classList.remove("show")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  const lightModeBtn = document.getElementById("lightModeBtn")
  const darkModeBtn = document.getElementById("darkModeBtn")
  const body = document.body

  const currentTheme = localStorage.getItem("theme") || "light"
  if (currentTheme === "dark") {
    body.classList.add("dark-mode")
    darkModeBtn.classList.add("active")
    lightModeBtn.classList.remove("active")
  }

  if (lightModeBtn) {
    lightModeBtn.addEventListener("click", () => {
      body.classList.remove("dark-mode")
      lightModeBtn.classList.add("active")
      darkModeBtn.classList.remove("active")
      localStorage.setItem("theme", "light")
    })
  }

  if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {
      body.classList.add("dark-mode")
      darkModeBtn.classList.add("active")
      lightModeBtn.classList.remove("active")
      localStorage.setItem("theme", "dark")
    })
  }

  const chatbotToggle = document.getElementById("chatbotToggle")
  const chatbotWindow = document.getElementById("chatbotWindow")
  const chatbotClose = document.getElementById("chatbotClose")
  const chatbotInput = document.getElementById("chatbotInput")
  const chatbotSend = document.getElementById("chatbotSend")
  const chatbotBody = document.getElementById("chatbotBody")
  const chatbotBadge = document.querySelector(".chatbot-badge")

  if (chatbotToggle) {
    chatbotToggle.addEventListener("click", () => {
      chatbotWindow.classList.toggle("active")
      if (chatbotWindow.classList.contains("active")) {
        chatbotInput.focus()
        if (chatbotBadge) chatbotBadge.style.display = "none"
      }
    })
  }

  if (chatbotClose) {
    chatbotClose.addEventListener("click", () => {
      chatbotWindow.classList.remove("active")
    })
  }

  function sendMessage(message) {
    if (!message.trim()) return

    const userMessageDiv = document.createElement("div")
    userMessageDiv.className = "chatbot-message user-message"
    userMessageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-user"></i>
      </div>
      <div class="message-content">
        <p>${message}</p>
        <span class="message-time">Just now</span>
      </div>
    `

    const quickReplies = chatbotBody.querySelector(".chatbot-quick-replies")
    if (quickReplies) {
      quickReplies.remove()
    }

    chatbotBody.appendChild(userMessageDiv)
    chatbotInput.value = ""

    chatbotBody.scrollTop = chatbotBody.scrollHeight

    setTimeout(() => {
      const botResponse = getBotResponse(message)
      const botMessageDiv = document.createElement("div")
      botMessageDiv.className = "chatbot-message bot-message"
      botMessageDiv.innerHTML = `
        <div class="message-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <p>${botResponse}</p>
          <span class="message-time">Just now</span>
        </div>
      `
      chatbotBody.appendChild(botMessageDiv)
      chatbotBody.scrollTop = chatbotBody.scrollHeight
    }, 1000)
  }

  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("viewing") || lowerMessage.includes("schedule")) {
      return "Great! I can help you schedule a viewing. Please fill out the contact form or call us at +1 (555) 123-4567 to book your preferred time slot."
    } else if (lowerMessage.includes("property") || lowerMessage.includes("details")) {
      return "This stunning 5-bedroom luxury villa features 4,500 sq ft of living space, modern amenities, and is priced at $2,850,000. Would you like to know more about specific features?"
    } else if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "The property is listed at $2,850,000. We also have financing options available. Would you like me to connect you with our mortgage specialist?"
    } else if (lowerMessage.includes("financing") || lowerMessage.includes("mortgage")) {
      return "We offer various financing options with competitive rates. You can use our mortgage calculator on the page, or speak with our financial advisor for personalized assistance."
    } else if (lowerMessage.includes("location")) {
      return "This property is located in the prestigious Beverly Hills area of Los Angeles, CA. It's close to top schools, shopping centers, and entertainment venues."
    } else {
      return "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore the property details on this page or call us at +1 (555) 123-4567."
    }
  }

  if (chatbotSend) {
    chatbotSend.addEventListener("click", () => {
      sendMessage(chatbotInput.value)
    })
  }

  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage(chatbotInput.value)
      }
    })
  }

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("quick-reply-btn") || e.target.closest(".quick-reply-btn")) {
      const btn = e.target.classList.contains("quick-reply-btn") ? e.target : e.target.closest(".quick-reply-btn")
      const message = btn.getAttribute("data-message")
      sendMessage(message)
    }
  })

  document.addEventListener("click", (e) => {
    if (
      chatbotWindow &&
      !chatbotWindow.contains(e.target) &&
      chatbotToggle &&
      !chatbotToggle.contains(e.target) &&
      chatbotWindow.classList.contains("active")
    ) {
      chatbotWindow.classList.remove("active")
    }
  })

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".why-card, .contact-info-box, .feature-box").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })

  const images = document.querySelectorAll("img")
  images.forEach((img) => {
    img.addEventListener("error", function () {
      console.log("Image failed to load:", this.src)
    })
  })

  document.addEventListener("click", (event) => {
    const navbar = document.querySelector(".navbar-collapse")
    const toggler = document.querySelector(".navbar-toggler")

    if (
      navbar &&
      toggler &&
      navbar.classList.contains("show") &&
      !navbar.contains(event.target) &&
      !toggler.contains(event.target)
    ) {
      navbar.classList.remove("show")
    }
  })
})

function calculateMortgage() {
  const principal = 2850000 
  const annualRate = Number.parseFloat(document.getElementById("interestRate").value)
  const years = Number.parseInt(document.getElementById("loanTerm").value)

  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12

  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

  const resultDiv = document.getElementById("mortgageResult")
  resultDiv.innerHTML = `
        <h5 class="text-gold mb-2">Estimated Monthly Payment</h5>
        <h3 class="text-navy">$${monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3>
        <p class="text-muted mb-0 mt-2">Based on ${years} year term at ${annualRate}% interest</p>
    `
}

function showFormMessage(message, type) {
  const messageDiv = document.getElementById("formMessage")
  messageDiv.textContent = message
  messageDiv.className = type
  messageDiv.style.display = "block"

  setTimeout(() => {
    messageDiv.style.display = "none"
  }, 5000)
}
