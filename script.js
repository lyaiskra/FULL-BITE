const WHATSAPP_NUMBER = "50769275725";

const products = [
  {
    id: 1,
    name: "Hotdog Clásico",
    description: "Pan, salchicha y los ingredientes clásicos.",
    price: 1.00,
    category: "hotdogs",
    emoji: "🌭",
    featured: true
  },
  {
    id: 2,
    name: "Combo #1",
    description: "Hotdog Clásico + bebida.",
    price: 1.50,
    category: "combos",
    emoji: "🍽️",
    featured: true
  },
  {
    id: 3,
    name: "Combo #2",
    description: "Hotdog Clásico + papas + bebida.",
    price: 2.00,
    category: "combos",
    emoji: "🍽️",
    featured: true
  },
  {
    id: 4,
    name: "Papas Fritas",
    description: "Papas fritas crujientes y recién preparadas.",
    price: 0.50,
    category: "papas",
    emoji: "🍟",
    featured: false
  },
  {
    id: 5,
    name: "Soda",
    description: "Una bebida fría para acompañar tu pedido.",
    price: 0.50,
    category: "bebidas",
    emoji: "🥤",
    featured: false
  },
  {
    id: 6,
    name: "Vaso de soda",
    description: "Vaso de soda fría.",
    price: 0.25,
    category: "bebidas",
    emoji: "🥤",
    featured: false
  }
];

let cart = [];
let selectedRating = 0;

const menuProducts = document.getElementById("menuProducts");
const featuredProducts = document.getElementById("featuredProducts");
const filters = document.getElementById("filters");
const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const goMenu = document.getElementById("goMenu");
const heroOrder = document.getElementById("heroOrder");
const sendWhatsApp = document.getElementById("sendWhatsApp");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const feedbackForm = document.getElementById("feedbackForm");
const ratingContainer = document.getElementById("rating");

document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderMenuProducts("todos");
  updateCart();
  setupEvents();
});

function setupEvents() {

  // FILTROS DEL MENÚ
  if (filters) {
    filters.addEventListener("click", (event) => {
      const button = event.target.closest(".filter");

      if (!button) return;

      const category = button.dataset.category;

      document.querySelectorAll(".filter").forEach(filter => {
        filter.classList.remove("active");
      });

      button.classList.add("active");

      renderMenuProducts(category);
    });
  }

  // ABRIR CARRITO
  if (openCart) {
    openCart.addEventListener("click", () => {
      openCartPanel();
    });
  }

  // CERRAR CARRITO
  if (closeCart) {
    closeCart.addEventListener("click", () => {
      closeCartPanel();
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      closeCartPanel();
    });
  }

  // IR AL MENÚ
  if (goMenu) {
    goMenu.addEventListener("click", () => {
      closeCartPanel();

      document.getElementById("menu")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // BOTÓN PEDIR AHORA
  if (heroOrder) {
    heroOrder.addEventListener("click", () => {

      if (cart.length === 0) {
        document.getElementById("menu")?.scrollIntoView({
          behavior: "smooth"
        });

        return;
      }

      openCartPanel();
    });
  }

  // ENVIAR PEDIDO
  if (sendWhatsApp) {
    sendWhatsApp.addEventListener("click", sendOrderToWhatsApp);
  }

  // MENÚ MÓVIL
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  if (nav) {
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  // ESTRELLAS DE OPINIÓN
  if (ratingContainer) {
    ratingContainer.addEventListener("click", (event) => {

      const button = event.target.closest("[data-rating]");

      if (!button) return;

      selectedRating = Number(button.dataset.rating);

      updateRating();
    });
  }

  // FORMULARIO DE OPINIÓN
  if (feedbackForm) {
    feedbackForm.addEventListener("submit", sendFeedback);
  }

  // ESC PARA CERRAR EL CARRITO
  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      cartElement?.classList.contains("open")
    ) {
      closeCartPanel();
    }
  });

  // BOTONES AGREGAR +
  document.addEventListener("click", (event) => {

    const button = event.target.closest(".add-btn");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    addToCart(productId);
  });
}


// ================================
// PRODUCTOS DESTACADOS
// ================================

function renderFeaturedProducts() {

  if (!featuredProducts) return;

  const featured = products.filter(product => product.featured);

  featuredProducts.innerHTML = featured
    .map(product => createProductCard(product))
    .join("");
}


// ================================
// MENÚ
// ================================

function renderMenuProducts(category = "todos") {

  if (!menuProducts) return;

  let filteredProducts;

  if (category === "todos") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      product => product.category === category
    );
  }

  menuProducts.innerHTML = filteredProducts
    .map(product => createProductCard(product))
    .join("");
}


// ================================
// TARJETA DE PRODUCTO
// ================================

function createProductCard(product) {

  return `
    <article class="product-card">

      ${
        product.featured
          ? `<span class="badge">MÁS PEDIDO</span>`
          : ""
      }

      <div class="product-visual">
        ${product.emoji}
      </div>

      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
      </div>

      <div class="product-bottom">

        <span class="price">
          $${product.price.toFixed(2)}
        </span>

        <button
          class="add-btn"
          type="button"
          data-product-id="${product.id}"
        >
          AGREGAR +
        </button>

      </div>

    </article>
  `;
}


// ================================
// AGREGAR AL CARRITO
// ================================

function addToCart(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === productId
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  updateCart();
  openCartPanel();
}


// ================================
// ELIMINAR PRODUCTO
// ================================

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  updateCart();
}


// ================================
// CAMBIAR CANTIDAD
// ================================

function changeQuantity(productId, change) {

  const item = cart.find(
    product => product.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  updateCart();
}


// ================================
// ACTUALIZAR CARRITO
// ================================

function updateCart() {

  if (!cartItems) return;

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (cartTotal) {
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }

  if (cart.length === 0) {

    cartItems.innerHTML = "";

    if (cartEmpty) {
      cartEmpty.style.display = "flex";
    }

    return;
  }

  if (cartEmpty) {
    cartEmpty.style.display = "none";
  }

  cartItems.innerHTML = cart
    .map(item => createCartItem(item))
    .join("");
}


// ================================
// PRODUCTO DENTRO DEL CARRITO
// ================================

function createCartItem(item) {

  const subtotal = item.price * item.quantity;

  return `
    <div class="cart-item">

      <div class="cart-item-icon">
        ${item.emoji}
      </div>

      <div>

        <h4>${item.name}</h4>

        <p>
          $${subtotal.toFixed(2)}
        </p>

        <div class="qty">

          <button
            type="button"
            onclick="changeQuantity(${item.id}, -1)"
          >
            −
          </button>

          <b>${item.quantity}</b>

          <button
            type="button"
            onclick="changeQuantity(${item.id}, 1)"
          >
            +
          </button>

        </div>

      </div>

      <button
        type="button"
        onclick="removeFromCart(${item.id})"
        aria-label="Eliminar ${item.name}"
      >
        ✕
      </button>

    </div>
  `;
}


// ================================
// ABRIR CARRITO
// ================================

function openCartPanel() {

  if (!cartElement || !cartOverlay) return;

  cartElement.classList.add("open");
  cartOverlay.classList.add("open");

  document.body.classList.add("cart-open");
}


// ================================
// CERRAR CARRITO
// ================================

function closeCartPanel() {

  if (!cartElement || !cartOverlay) return;

  cartElement.classList.remove("open");
  cartOverlay.classList.remove("open");

  document.body.classList.remove("cart-open");
}


// ================================
// NÚMERO DE PEDIDO
// ================================

function generateOrderNumber() {

  let lastOrder = Number(
    localStorage.getItem("fullBiteOrderNumber") || 0
  );

  if (lastOrder >= 99) {
    lastOrder = 1;
  } else {
    lastOrder++;
  }

  localStorage.setItem(
    "fullBiteOrderNumber",
    String(lastOrder)
  );

  return `FB-${String(lastOrder).padStart(2, "0")}`;
}


// ================================
// ENVIAR PEDIDO A WHATSAPP
// ================================

function sendOrderToWhatsApp() {

  if (cart.length === 0) {

    alert(
      "Agrega al menos un producto antes de enviar tu pedido."
    );

    return;
  }

  const orderNumber = generateOrderNumber();

  let message =
    `*FULL BITE — NUEVO PEDIDO*%0A%0A`;

  message +=
    `*Número de pedido:* ${orderNumber}%0A%0A`;

  message +=
    `*Pedido:*%0A`;

  cart.forEach(item => {

    const subtotal =
      item.price * item.quantity;

    message +=
      `• ${item.name} x${item.quantity} — $${subtotal.toFixed(2)}%0A`;
  });

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  message +=
    `%0A*TOTAL: $${total.toFixed(2)}*%0A%0A`;

  message +=
    `📌 *Presenta este número al retirar tu pedido:* ${orderNumber}`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(
    whatsappURL,
    "_blank"
  );

  showOrderNumber(orderNumber);
}


// ================================
// MOSTRAR NÚMERO DE PEDIDO
// ================================

function showOrderNumber(orderNumber) {

  const orderInfo =
    document.getElementById("orderInfo");

  if (!orderInfo) return;

  orderInfo.innerHTML = `
    Tu pedido fue preparado para enviarse por WhatsApp.
    <br>
    <strong>
      Número de pedido: ${orderNumber}
    </strong>
    <br>
    Presenta este número al retirar tu pedido.
  `;
}


// ================================
// ESTRELLAS
// ================================

function updateRating() {

  if (!ratingContainer) return;

  const buttons =
    ratingContainer.querySelectorAll(
      "[data-rating]"
    );

  buttons.forEach(button => {

    const rating =
      Number(button.dataset.rating);

    if (rating <= selectedRating) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }

  });
}


// ================================
// ENVIAR OPINIÓN
// ================================

function sendFeedback(event) {

  event.preventDefault();

  const name =
    document.getElementById("feedbackName")
      ?.value
      .trim() || "Anónimo";

  const comment =
    document.getElementById("feedbackComment")
      ?.value
      .trim();

  if (!comment) {

    alert(
      "Escribe un comentario antes de enviarlo."
    );

    return;
  }

  if (selectedRating === 0) {

    alert(
      "Selecciona una calificación de estrellas."
    );

    return;
  }

  const stars =
    "★".repeat(selectedRating) +
    "☆".repeat(5 - selectedRating);

  let message =
    `*FULL BITE — OPINIÓN*%0A%0A`;

  message +=
    `*Nombre:* ${encodeURIComponent(name)}%0A`;

  message +=
    `*Calificación:* ${encodeURIComponent(stars)}%0A%0A`;

  message +=
    `*Comentario:*%0A${encodeURIComponent(comment)}`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(
    whatsappURL,
    "_blank"
  );

  feedbackForm.reset();

  selectedRating = 0;

  updateRating();

  alert("¡Gracias por tu opinión!");
}


// ================================
// FUNCIONES GLOBALES
// ================================

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
