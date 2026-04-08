// ── Menu Data ──────────────────────────────────────────────────
const menuData = {
  starters: [
    { name: "Bruschetta al Pomodoro", desc: "Toasted bread, fresh tomato, basil & olive oil", price: "$9", emoji: "🍅", badge: "Popular" },
    { name: "Carpaccio di Manzo", desc: "Thin-sliced beef, arugula, capers, lemon dressing", price: "$14", emoji: "🥩", badge: null },
    { name: "Burrata e Prosciutto", desc: "Creamy burrata, cured prosciutto, honey drizzle", price: "$16", emoji: "🧀", badge: "Chef's Pick" },
    { name: "Zuppa di Pomodoro", desc: "Slow-cooked tomato soup with croutons", price: "$10", emoji: "🍲", badge: null },
  ],
  mains: [
    { name: "Spaghetti Carbonara", desc: "Pancetta, egg, Pecorino Romano, black pepper", price: "$22", emoji: "🍝", badge: "Popular" },
    { name: "Risotto ai Tartufi", desc: "Arborio rice, black truffle, Parmesan, white wine", price: "$34", emoji: "🍚", badge: "Seasonal" },
    { name: "Branzino al Forno", desc: "Oven-baked sea bass, lemon, capers, olives", price: "$38", emoji: "🐟", badge: null },
    { name: "Osso Buco Milanese", desc: "Braised veal shanks, gremolata, saffron risotto", price: "$42", emoji: "🍖", badge: "Chef's Pick" },
  ],
  desserts: [
    { name: "Tiramisù Classico", desc: "Espresso-soaked ladyfingers, mascarpone cream", price: "$11", emoji: "☕", badge: "Popular" },
    { name: "Panna Cotta", desc: "Vanilla cream, wild berry coulis", price: "$9", emoji: "🍮", badge: null },
    { name: "Cannoli Siciliani", desc: "Crispy shells, ricotta, pistachios, chocolate chips", price: "$10", emoji: "🥐", badge: null },
    { name: "Gelato Artigianale", desc: "Three scoops of house-made gelato, seasonal flavors", price: "$8", emoji: "🍨", badge: "Fan Fave" },
  ],
  drinks: [
    { name: "Aperol Spritz", desc: "Aperol, prosecco, soda water, orange slice", price: "$13", emoji: "🍊", badge: null },
    { name: "Chianti Classico", desc: "Smooth Tuscan red, glass or bottle", price: "$14", emoji: "🍷", badge: "Popular" },
    { name: "Limoncello", desc: "House-made lemon liqueur, served chilled", price: "$9", emoji: "🍋", badge: null },
    { name: "San Pellegrino", desc: "Sparkling or still, 500ml bottle", price: "$5", emoji: "💧", badge: null },
  ],
};

const bgColors = ["#c0392b", "#e67e22", "#27ae60", "#8e44ad", "#2980b9", "#d35400", "#16a085", "#c0392b"];

function renderMenu(tab) {
  const grid = document.getElementById("menu-grid");
  const items = menuData[tab];
  grid.innerHTML = items
    .map(
      (item, i) => `
    <div class="menu-card reveal">
      <div class="menu-card-img" style="--bg: ${bgColors[i % bgColors.length]}; background: ${bgColors[i % bgColors.length]};">
        ${item.emoji}
      </div>
      <div class="menu-card-body">
        <h4>${item.name}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="menu-card-footer">
        <span class="menu-price">${item.price}</span>
        ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ""}
      </div>
    </div>`
    )
    .join("");
  // Trigger reveal animation
  requestAnimationFrame(() => {
    grid.querySelectorAll(".reveal").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 80);
    });
  });
}

// ── Tab Switching ───────────────────────────────────────────────
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.tab);
  });
});

// ── Navbar Scroll ───────────────────────────────────────────────
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ── Mobile Nav Toggle ───────────────────────────────────────────
document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("open");
});

// Close mobile nav on link click
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("open");
  });
});

// ── Scroll Reveal ───────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function observeRevealElements() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => observer.observe(el));
}

// Add reveal class to sections
document.querySelectorAll(".about .container > *, .testimonial-card, .gallery-item, .contact .container > *").forEach((el) => {
  el.classList.add("reveal");
});
observeRevealElements();

// ── Reservation Form ────────────────────────────────────────────
document.getElementById("reservation-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const success = document.getElementById("form-success");
  success.classList.add("visible");
  e.target.reset();
  setTimeout(() => success.classList.remove("visible"), 5000);
});

// ── Set min date for reservation ────────────────────────────────
const dateInput = document.getElementById("res-date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

// ── Init ────────────────────────────────────────────────────────
renderMenu("starters");
