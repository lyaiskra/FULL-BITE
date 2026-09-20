/* =========================================================
   FULL BITE
   SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   PRODUCTOS
   ========================================================= */

const products = [
  {
    id: 1,
    name: "Hotdog Clásico",
    price: 1.00,
    category: "hotdogs",
    icon: "🌭",
    description: "Pan, salchicha y los clásicos acompañamientos.",
    badge: "Clásico"
  },

  {
    id: 2,
    name: "Combo #1",
    price: 1.50,
    category: "combos",
    icon: "🌭🥤",
    description: "Hotdog + bebida",
    badge: "Combo"
  },

  {
    id: 3,
    name: "Combo #2",
    price: 2.00,
    category: "combos",
    icon: "🌭🍟🥤",
    description: "Hotdog + papas + bebida",
    badge: "Combo"
  },

  {
    id: 4,
    name: "Papas Fritas",
    price: 0.50,
    category: "papas",
    icon: "🍟",
    description: "Papas crujientes para acompañar tu antojo.",
    badge: "Favorito"
  },

  {
    id: 5,
    name: "Soda",
    price: 0.50,
    category: "bebidas",
    icon: "🥤",
    description: "Una bebida fría para acompañar tu pedido.",
    badge: "Bebida"
  },

  {
    id: 6,
    name: "Vaso de soda",
    price: 0.25,
    category: "bebidas",
    icon: "🥤",
    description: "Una opción pequeña para refrescarte.",
    badge: "Bebida"
  }
];


/* =========================================================
   VARIABLES
   ========================================================= */

let cart = [];

const WHATSAPP_NUMBER = "50769275725";

const CART_STORAGE_KEY = "fullBiteCart";
const ORDER_STORAGE_KEY = "fullBiteOrderNumber";
const OPINION_STORAGE_KEY = "fullBiteOpinion";


/* =========================================================
   ELEMENTOS DEL DOM
   ========================================================= */

const menuProducts = document.getElementById("menuProducts");
const featuredProducts = document.getElementById("featuredProducts");

const filters = document.getElementById("filters");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");

const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");

const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const cartGoMenu = document.getElementById("cartGoMenu");
const sendWhatsAppButton = document.getElementById("sendWhatsApp");

const heroOrderButton = document.getElementById("heroOrder");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

const opinionForm = document.getElementById("opinionForm");
const opinionName = document.getElementById("opinionName");
const opinionRating = document.getElementById("opinionRating");
const opinionText = document.getElementById("opinionText");

const opinionMessage = document.getElementById("opinionMessage");
const savedOpinion = document.getElementById("savedOpinion");


/* =========================================================
   FORMATO DE PRECIOS
   ========================================================= */

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


/* =========================================================
   RENDER DE PRODUCTOS
   ========================================================= */

function createProductCard(product) {
  return `
    <article class="product-card">

      <div class="product-visual">
        <span aria-hidden="true">${product.icon}</span>
      </div>

      <div class="product-info">

        <span class="badge">
          ${product.badge}
        </span>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="price">
            ${formatPrice(product.price)}
          </span>

          <button
            class="add-btn"
            type="button"
            data-add="${product.id}"
            aria-label="Agregar ${product.name}"
          >
            +
          </button>

        </div>

      </div>

    </article>
  `;
}


function renderFeaturedProducts() {
  if (!featuredProducts) return;

  const featured = products.slice(0, 3);

  featuredProducts.innerHTML = featured
    .map(createProductCard)
    .join("");
}


function renderProducts(category = "all") {
  if (!menuProducts) return;

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(product => product.category === category);

  menuProducts.innerHTML = filteredProducts
    .map(createProductCard)
    .join("");
}


/* =========================================================
   AGREGAR PRODUCTOS
   ========================================================= */

function addToCart(productId) {
  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) return;

  const existingItem = cart.find(
    item => item.id === product.id
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart();
  renderCart();

  openCart();
}


/* =========================================================
   CAMBIAR CANTIDAD
   ========================================================= */

function changeQuantity(productId, amount) {
  const item = cart.find(
    cartItem => cartItem.id === Number(productId)
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(
      cartItem => cartItem.id !== Number(productId)
    );
  }

  saveCart();
  renderCart();
}


/* =========================================================
   ELIMINAR PRODUCTO
   ========================================================= */

function removeFromCart(productId) {
  cart = cart.filter(
    item => item.id !== Number(productId)
  );

  saveCart();
  renderCart();
}


/* =========================================================
   TOTAL DEL CARRITO
   ========================================================= */

function calculateTotal() {
  return cart.reduce((total, item) => {

    const product = products.find(
      productItem => productItem.id === item.id
    );

    if (!product) return total;

    return total + (product.price * item.quantity);

  }, 0);
}


/* =========================================================
   CANTIDAD TOTAL
   ========================================================= */

function calculateQuantity() {
  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
}


/* =========================================================
   RENDER DEL CARRITO
   ========================================================= */

function renderCart() {
  if (!cartItems) return;

  const total = calculateTotal();
  const quantity = calculateQuantity();

  cartCount.textContent = quantity;
  cartTotal.textContent = formatPrice(total);


  if (cart.length === 0) {

    cartItems.innerHTML = "";

    cartItems.style.display = "none";

    cartEmpty.style.display = "flex";

    sendWhatsAppButton.disabled = true;
    sendWhatsAppButton.style.opacity = "0.5";
    sendWhatsAppButton.style.pointerEvents = "none";

    return;
  }


  cartItems.style.display = "block";
  cartEmpty.style.display = "none";

  sendWhatsAppButton.disabled = false;
  sendWhatsAppButton.style.opacity = "1";
  sendWhatsAppButton.style.pointerEvents = "auto";


  cartItems.innerHTML = cart.map(item => {

    const product = products.find(
      productItem => productItem.id === item.id
    );

    if (!product) return "";

    const subtotal =
      product.price * item.quantity;

    return `
      <div class="cart-item">

        <div class="cart-item-icon">
          ${product.icon}
        </div>

        <div>
          <h4>
            ${product.name}
          </h4>

          <p class="cart-item-price">
            ${formatPrice(subtotal)}
          </p>
        </div>

        <div class="qty">

          <button
            type="button"
            data-minus="${product.id}"
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            type="button"
            data-plus="${product.id}"
            aria-label="Aumentar cantidad"
          >
            +
          </button>

        </div>

      </div>
    `;

  }).join("");
}


/* =========================================================
   GUARDAR CARRITO
   ========================================================= */

function saveCart() {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(cart)
  );
}


/* =========================================================
   CARGAR CARRITO
   ========================================================= */

function loadCart() {

  try {

    const savedCart =
      localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      cart = [];
      return;
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      cart = [];
      return;
    }

    cart = parsedCart.filter(item => {

      const productExists = products.some(
        product => product.id === Number(item.id)
      );

      return (
        productExists &&
        Number(item.quantity) > 0
      );

    }).map(item => ({
      id: Number(item.id),
      quantity: Number(item.quantity)
    }));

  } catch (error) {

    cart = [];

    console.warn(
      "No se pudo cargar el carrito.",
      error
    );

  }
}


/* =========================================================
   ABRIR CARRITO
   ========================================================= */

function openCart() {

  cart.classList.add("open");
  cartOverlay.classList.add("open");

  document.body.style.overflow = "hidden";
}


/* =========================================================
   CERRAR CARRITO
   ========================================================= */

function closeCart() {

  cart.classList.remove("open");
  cartOverlay.classList.remove("open");

  document.body.style.overflow = "";
}


/* =========================================================
   NÚMERO DE PEDIDO
   FB-01 → FB-99
   ========================================================= */

function generateOrderNumber() {

  let lastOrder = Number(
    localStorage.getItem(ORDER_STORAGE_KEY) || 0
  );

  if (lastOrder >= 99) {
    lastOrder = 1;
  } else {
    lastOrder++;
  }

  localStorage.setItem(
    ORDER_STORAGE_KEY,
    String(lastOrder)
  );

  return `FB-${String(lastOrder).padStart(2, "0")}`;
}


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
   ========================================================= */

function sendOrderToWhatsApp() {

  if (cart.length === 0) return;

  const orderNumber = generateOrderNumber();

  const total = calculateTotal();

  let message = "";

  message += `*FULL BITE* 🍔\n`;
  message += `*Pedido ${orderNumber}*\n\n`;

  message += `Hola, quiero realizar el siguiente pedido:\n\n`;


  cart.forEach(item => {

    const product = products.find(
      productItem => productItem.id === item.id
    );

    if (!product) return;

    const subtotal =
      product.price * item.quantity;

    message += `• ${product.name} x${item.quantity}`;
    message += ` — ${formatPrice(subtotal)}\n`;

  });


  message += `\n*TOTAL: ${formatPrice(total)}*\n\n`;

  message += `📍 Retiro en Colegio Secundario La Peña\n`;

  message += `🎟️ Número de pedido: *${orderNumber}*`;


  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

}


/* =========================================================
   FILTROS DEL MENÚ
   ========================================================= */

function setupFilters() {

  if (!filters) return;

  filters.addEventListener("click", event => {

    const button =
      event.target.closest(".filter-btn");

    if (!button) return;

    const category =
      button.dataset.filter;

    document
      .querySelectorAll(".filter-btn")
      .forEach(filterButton => {
        filterButton.classList.remove("active");
      });

    button.classList.add("active");

    renderProducts(category);

  });
}


/* =========================================================
   BOTONES DE PRODUCTOS
   ========================================================= */

document.addEventListener("click", event => {

  const addButton =
    event.target.closest("[data-add]");

  if (addButton) {

    const productId =
      Number(addButton.dataset.add);

    addToCart(productId);

    return;
  }


  const plusButton =
    event.target.closest("[data-plus]");

  if (plusButton) {

    const productId =
      Number(plusButton.dataset.plus);

    changeQuantity(productId, 1);

    return;
  }


  const minusButton =
    event.target.closest("[data-minus]");

  if (minusButton) {

    const productId =
      Number(minusButton.dataset.minus);

    changeQuantity(productId, -1);

  }

});


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

function closeMobileMenu() {

  if (!nav) return;

  nav.classList.remove("open");

  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


function toggleMobileMenu() {

  if (!nav) return;

  const isOpen =
    nav.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    toggleMobileMenu
  );

}


if (nav) {

  nav.addEventListener("click", event => {

    if (event.target.closest("a")) {
      closeMobileMenu();
    }

  });

}


/* =========================================================
   BOTONES DEL CARRITO
   ========================================================= */

if (openCartButton) {

  openCartButton.addEventListener(
    "click",
    openCart
  );

}


if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );

}


if (cartGoMenu) {

  cartGoMenu.addEventListener(
    "click",
    () => {

      closeCart();

      document
        .getElementById("menu")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}


if (sendWhatsAppButton) {

  sendWhatsAppButton.addEventListener(
    "click",
    sendOrderToWhatsApp
  );

}


/* =========================================================
   BOTÓN "PEDIR AHORA" DEL HERO
   ========================================================= */

if (heroOrderButton) {

  heroOrderButton.addEventListener(
    "click",
    () => {

      document
        .getElementById("menu")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}


/* =========================================================
   OPINIONES
   ========================================================= */

function renderSavedOpinion() {

  if (!savedOpinion) return;

  const saved =
    localStorage.getItem(OPINION_STORAGE_KEY);

  if (!saved) {
    savedOpinion.innerHTML = "";
    return;
  }

  try {

    const opinion = JSON.parse(saved);

    const stars =
      "★".repeat(Number(opinion.rating)) +
      "☆".repeat(5 - Number(opinion.rating));


    savedOpinion.innerHTML = `
      <div class="saved-opinion-content">

        <strong>
          ${opinion.name}
        </strong>

        <span>
          ${stars}
        </span>

        <p>
          ${opinion.text}
        </p>

      </div>
    `;

  } catch (error) {

    savedOpinion.innerHTML = "";

    console.warn(
      "No se pudo cargar la opinión.",
      error
    );

  }

}


if (opinionForm) {

  opinionForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const name =
        opinionName.value.trim();

      const rating =
        Number(opinionRating.value);

      const text =
        opinionText.value.trim();


      if (
        !name ||
        !rating ||
        !text
      ) {

        opinionMessage.textContent =
          "Completa todos los campos.";

        return;
      }


      const opinion = {
        name,
        rating,
        text
      };


      localStorage.setItem(
        OPINION_STORAGE_KEY,
        JSON.stringify(opinion)
      );


      opinionMessage.textContent =
        "¡Gracias por tu opinión!";


      opinionForm.reset();

      renderSavedOpinion();

    }
  );

}


/* =========================================================
   TECLA ESC
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeCart();
      closeMobileMenu();

    }

  }
);


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

function init() {

  loadCart();

  renderFeaturedProducts();

  renderProducts("all");

  renderCart();

  renderSavedOpinion();

  setupFilters();

}


document.addEventListener(
  "DOMContentLoaded",
  init
);
