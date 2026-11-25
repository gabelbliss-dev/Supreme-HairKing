const products = [
  {
    name: "Bone Straight Bundles",
    category: "HUMAN HAIR · STRAIGHT",
    price: 100,
    oldPrice: 470,
    image: "images/Bone Straight.jpg",
    reviews: 74,
    colors: ["#111", "#3a2117", "#6f4736"],
    colorNote: "Natural black",
    isNew: true,
  },
  {
    name: "Loose Deep Wave Bundles",
    category: "HUMAN HAIR · WAVY",
    price: 150,
    oldPrice: 220,
    image:
      "images/Loose Deep Wave Human Hair Bundles and Closure Loose Wave Bundles With Lace Closure Big.jpg",
    reviews: 62,
    colors: ["#111", "#3a2117"],
    colorNote: "Natural black",
    isNew: true,
  },
  {
    name: "Bounce Wave Bundles",
    category: "HUMAN HAIR · WAVY",
    price: 0,
    image: "images/bounce.jpg",
    reviews: 31,
    colors: ["#111", "#5e3a2d"],
    colorNote: "2 textures",
    isNew: true,
  },
  {
    name: "Pixie Curl Bundles",
    category: "HUMAN HAIR · CURLY",
    price: 0,
    image: "images/pixie curl.jpg",
    reviews: 28,
    colors: ["#111"],
    colorNote: "Natural black",
    isNew: true,
  },
  {
    name: "Honey Blonde Straight Weave",
    category: "HUMAN HAIR · COLOURED",
    price: 0,
    image: "images/XCCOCO Hair Ombre Honey Blonde Straight Weave Dark….jpg",
    reviews: 19,
    colors: ["#b88b45", "#3a2117"],
    colorNote: "Ombre blonde",
    isNew: true,
  },
];
const cart = [];
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const formatPrice = (n) => usd.format(n);
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );

function renderCard(p) {
  const colors = p.colors
    .map((color) => `<i class="swatch" style="background:${color}"></i>`)
    .join("");
  return `<article class="product-card"><div class="product-image"><span class="new-badge">New</span><button class="favorite" aria-label="Save ${escapeHtml(p.name)}">♡</button><img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy"></div><p class="product-meta">${p.category}</p><h3>${escapeHtml(p.name)}</h3><div class="price">${formatPrice(p.price)}${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}</div><div class="swatches">${colors}<span class="color-note">${p.colorNote || ""}</span></div>${p.colorNote ? "" : `<p class="style-count">${p.colors.length} colours</p>`}<button class="quick-add" data-name="${escapeHtml(p.name)}">ADD TO BAG</button></article>`;
}
function renderProducts() {
  const term = document.querySelector("#search").value.trim().toLowerCase();
  const filtered = products.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(term),
  );
  const best = document.querySelector("#best-grid");
  const fresh = document.querySelector("#new-grid");
  best.innerHTML = filtered.length
    ? filtered.slice(0, 4).map(renderCard).join("")
    : '<p class="empty-results">No products found. Try another search.</p>';
  fresh.innerHTML = filtered.length
    ? filtered.map(renderCard).join("")
    : '<p class="empty-results">No products found. Try another search.</p>';
}
function renderCart() {
  document.querySelector("#cart-count").textContent = cart.reduce(
    (sum, item) => sum + item.qty,
    0,
  );
  document.querySelector("#cart-items").innerHTML = cart.length
    ? cart
        .map(
          (item) =>
            `<div class="cart-row"><img src="${item.image}" alt=""><div><b>${escapeHtml(item.name)}</b><small>${formatPrice(item.price)} · Qty ${item.qty}${item.size ? ` · Size ${escapeHtml(item.size)}` : ""}</small></div><button class="remove-item" data-name="${escapeHtml(item.name)}" aria-label="Remove ${escapeHtml(item.name)}">×</button></div>`,
        )
        .join("")
    : '<p class="empty-results">Your bag is waiting for something good.</p>';
  document.querySelector("#cart-total").textContent = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.qty, 0),
  );
}
function toast(message) {
  const el = document.querySelector(".toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2000);
}
function addToCart(product, size = "") {
  const item = cart.find((p) => p.name === product.name && p.size === size);
  item ? item.qty++ : cart.push({ ...product, size, qty: 1 });
  renderCart();
  toast(`${product.name} added to your bag`);
}
renderProducts();
renderCart();

document.querySelector("#search").addEventListener("input", renderProducts);
document.body.addEventListener("click", (e) => {
  const favorite = e.target.closest(".favorite");
  if (favorite) {
    favorite.classList.toggle("saved");
    favorite.textContent = favorite.classList.contains("saved") ? "♥" : "♡";
    toast(
      favorite.classList.contains("saved")
        ? "Added to your wishlist"
        : "Removed from wishlist",
    );
    return;
  }
  const add = e.target.closest(".quick-add");
  if (add) {
    const product = products.find((p) => p.name === add.dataset.name);
    if (product) addToCart(product);
    return;
  }
});
document.querySelector(".add-size").addEventListener("click", () => {
  const product = products.find((p) => p.name === "Bone Straight Bundles");
  const size = document.querySelector(".sizes .active").textContent;
  addToCart(product, size);
});
document.querySelector(".sizes").addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  document
    .querySelectorAll(".sizes button")
    .forEach((button) =>
      button.classList.toggle("active", button === e.target),
    );
  document.querySelector(".add-size span").textContent = e.target.textContent;
});
document.querySelector(".cart-icon").addEventListener("click", () => {
  document.querySelector(".cart-panel").classList.add("open");
  document.querySelector(".cart-panel").setAttribute("aria-hidden", "false");
});
document.querySelector(".close-cart").addEventListener("click", () => {
  document.querySelector(".cart-panel").classList.remove("open");
  document.querySelector(".cart-panel").setAttribute("aria-hidden", "true");
});
document.querySelector("#cart-items").addEventListener("click", (e) => {
  const button = e.target.closest(".remove-item");
  if (!button) return;
  const index = cart.findIndex((p) => p.name === button.dataset.name);
  if (index >= 0) cart.splice(index, 1);
  renderCart();
});
document
  .querySelector(".checkout")
  .addEventListener("click", () =>
    toast(cart.length ? "Checkout is coming soon" : "Your bag is empty"),
  );
document.querySelector(".newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  toast("Thanks for joining the Supreme HairKing list!");
  e.currentTarget.reset();
});
document
  .querySelector(".footer-close")
  .addEventListener("click", () =>
    document.querySelector(".newsletter").remove(),
  );
document.querySelector(".menu-toggle").addEventListener("click", (e) => {
  const open = document.querySelector(".nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach((link) =>
  link.addEventListener("click", () => {
    document.querySelector(".nav").classList.remove("open");
    document
      .querySelector(".menu-toggle")
      .setAttribute("aria-expanded", "false");
  }),
);
