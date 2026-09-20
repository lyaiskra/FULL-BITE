/* =========================================================
   FULL BITE
   script.js
   ========================================================= */


/* =========================
   PRODUCTOS
========================= */

const products = [
  {
    id: 1,
    name: "Hotdog Clásico",
    category: "hotdogs",
    price: 1.00,
    icon: "🌭",
    description: "Pan, salchicha y los clásicos acompañamientos.",
    badge: "CLÁSICO"
  },

  {
    id: 2,
    name: "Combo #1",
    category: "combos",
    price: 1.50,
    icon: "🌭🥤",
    description: "Hotdog + bebida",
    badge: "COMBO"
  },

  {
    id: 3,
    name: "Combo #2",
    category: "combos",
    price: 2.00,
    icon: "🌭🍟🥤",
    description: "Hotdog + papas + bebida",
    badge: "COMBO"
  },

  {
    id: 4,
    name: "Papas Fritas",
    category: "papas",
    price: 0.50,
    icon: "🍟",
    description: "Papas fritas para acompañar tu antojo.",
    badge: ""
  },

  {
    id: 5,
    name: "Soda",
    category: "bebidas",
    price: 0.50,
    icon: "🥤",
    description: "Una bebida fría para acompañar.",
    badge: ""
  },

  {
    id: 6,
    name: "Vaso de soda",
    category: "bebidas",
    price: 0.25,
    icon: "🥤",
    description: "Vaso de soda.",
    badge: ""
  }
];


/* =========================
   VARIABLES
========================= */

const cart = [];

const featuredProducts = document.getElementById(
  "featuredProducts"
);

const menuProducts = document.getElementById(
  "menuProducts"
);

const cartElement = document.getElementById("cart");

const cartOverlay = document.getElementById(
  "cartOverlay"
);

const cartItems = document.getElementById(
  "cartItems"
);

const cartEmpty = document.getElementById(
  "cartEmpty"
);

const cartCount = document.getElementById(
  "cartCount"
);

const cartTotal = document.getElementById(
  "cartTotal"
);

const openCartButton = document.getElementById(
  "openCart"
);

const closeCartButton = document.getElementById(
  "closeCart"
);

const sendWhatsAppButton = document.getElementById(
  "sendWhatsApp"
);

const emptyCartMenu = document.getElementById(
  "emptyCartMenu"
);

const menuToggle = document.getElementById(
  "menuToggle"
);

const nav = document.getElementById("nav");

const heroOrder = document.getElementById(
  "heroOrder"
);


/* =========================
   FORMATO DE PRECIO
========================= */

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


/* =========================
   CREAR PRODUCTO
========================= */

function createProductCard(product) {
  return `
    <article class="product-card">

      ${
        product.badge
          ? `<span class="badge">${product.badge}</span>`
          : ""
      }

      <div class="product-visual">
        ${product.icon}
      </div>

      <div class="product-info">

        <h3>${product.name}</h3>

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


/* =========================
   MOSTRAR MENÚ
========================= */

function renderProducts(filter = "all") {

  if (!menuProducts) return;

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter(
          product => product.category === filter
        );

  menuProducts.innerHTML =
    filteredProducts
      .map(createProductCard)
      .join("");

}


/* =========================
   DESTACADOS
========================= */

function renderFeaturedProducts() {

  if (!featuredProducts) return;

  const featured = products.slice(0, 3);

  featuredProducts.innerHTML =
    featured
      .map(createProductCard)
      .join("");

}


/* =========================
   AGREGAR AL CARRITO
========================= */

function addToCart(productId) {

  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === product.id
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

  openCart();

}


/* =========================
   CAMBIAR CANTIDAD
========================= */

function changeQuantity(productId, amount) {

  const item = cart.find(
    product => product.id === Number(productId)
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    const index = cart.indexOf(item);

    if (index !== -1) {
      cart.splice(index, 1);
    }

  }

  updateCart();

}


/* =========================
   MOSTRAR CARRITO
========================= */

function renderCart() {

  if (!cartItems) return;

  if (cart.length === 0) {

    cartItems.innerHTML = "";

    cartEmpty.style.display = "flex";

    return;

  }

  cartEmpty.style.display = "none";

  cartItems.innerHTML = cart
    .map(item => {

      const subtotal =
        item.price * item.quantity;

      return `
        <div class="cart-item">

          <div class="cart-item-icon">
            ${item.icon}
          </div>

          <div>

            <h4>
              ${item.name}
            </h4>

            <span class="cart-item-price">
              ${formatPrice(subtotal)}
            </span>

            <div class="qty">

              <button
                type="button"
                data-quantity="${item.id}"
                data-change="-1"
                aria-label="Disminuir cantidad"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                data-quantity="${item.id}"
                data-change="1"
                aria-label="Aumentar cantidad"
              >
                +
              </button>

            </div>

          </div>

        </div>
      `;
    })
    .join("");

}


/* =========================
   ACTUALIZAR CARRITO
========================= */

function updateCart() {

  renderCart();

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (cartTotal) {
    cartTotal.textContent =
      formatPrice(totalPrice);
  }

}


/* =========================
   ABRIR CARRITO
========================= */

function openCart() {

  if (!cartElement || !cartOverlay) return;

  cartElement.classList.add("open");

  cartOverlay.classList.add("open");

  document.body.classList.add("cart-open");

}


/* =========================
   CERRAR CARRITO
========================= */

function closeCart() {

  if (!cartElement || !cartOverlay) return;

  cartElement.classList.remove("open");

  cartOverlay.classList.remove("open");

  document.body.classList.remove("cart-open");

}


/* =========================
   NÚMERO DE PEDIDO
   FB-01 → FB-99
========================= */

function generateOrderNumber() {

  let lastOrder = Number(
    localStorage.getItem(
      "fullBiteOrderNumber"
    ) || 0
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


/* =========================
   ENVIAR A WHATSAPP
========================= */

function sendWhatsAppOrder() {

  if (cart.length === 0) {

    alert(
      "Agrega al menos un producto a tu pedido."
    );

    return;
  }

  const orderNumber =
    generateOrderNumber();

  let total = 0;

  const orderLines = cart.map(item => {

    const subtotal =
      item.price * item.quantity;

    total += subtotal;

    return (
      `• ${item.name} x${item.quantity}` +
      ` — ${formatPrice(subtotal)}`
    );

  });


  const message =
`Hola, FULL BITE. Quiero realizar el siguiente pedido:

PEDIDO: ${orderNumber}

${orderLines.join("\n")}

TOTAL: ${formatPrice(total)}

Quedo pendiente. ¡Gracias!`;


  const phone =
    "50769275725";

  const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =========================
   FILTROS DEL MENÚ
========================= */

function setupFilters() {

  const filterButtons =
    document.querySelectorAll(
      ".filter-btn"
    );

  filterButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        filterButtons.forEach(
          item =>
            item.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
          button.dataset.filter;

        renderProducts(filter);

      }
    );

  });

}


/* =========================
   CLICS EN PRODUCTOS
========================= */

document.addEventListener(
  "click",
  event => {

    const addButton =
      event.target.closest(
        "[data-add]"
      );

    if (addButton) {

      addToCart(
        addButton.dataset.add
      );

      return;
    }


    const quantityButton =
      event.target.closest(
        "[data-quantity]"
      );

    if (quantityButton) {

      changeQuantity(
        quantityButton.dataset.quantity,
        Number(
          quantityButton.dataset.change
        )
      );

    }

  }
);


/* =========================
   CARRITO
========================= */

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

if (sendWhatsAppButton) {

  sendWhatsAppButton.addEventListener(
    "click",
    sendWhatsAppOrder
  );

}

if (emptyCartMenu) {

  emptyCartMenu.addEventListener(
    "click",
    closeCart
  );

}


/* =========================
   BOTÓN PEDIR AHORA
========================= */

if (heroOrder) {

  heroOrder.addEventListener(
    "click",
    () => {

      if (cart.length > 0) {

        openCart();

      } else {

        const menu =
          document.getElementById(
            "menu"
          );

        if (menu) {
          menu.scrollIntoView({
            behavior: "smooth"
          });
        }

      }

    }
  );

}


/* =========================
   MENÚ MÓVIL
========================= */

if (menuToggle && nav) {

  menuToggle.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );


  nav.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          nav.classList.remove(
            "open"
          );

        }
      );

    });

}


/* =========================
   OPINIONES
========================= */

const opinionForm =
  document.getElementById(
    "opinionForm"
  );

const opinionName =
  document.getElementById(
    "opinionName"
  );

const opinionRating =
  document.getElementById(
    "opinionRating"
  );

const opinionText =
  document.getElementById(
    "opinionText"
  );

const opinionMessage =
  document.getElementById(
    "opinionMessage"
  );

const savedOpinion =
  document.getElementById(
    "savedOpinion"
  );


function loadSavedOpinion() {

  if (!savedOpinion) return;

  const saved =
    localStorage.getItem(
      "fullBiteOpinion"
    );

  if (!saved) return;

  try {

    const opinion =
      JSON.parse(saved);

    const stars =
      "★".repeat(
        Number(opinion.rating)
      ) +
      "☆".repeat(
        5 - Number(opinion.rating)
      );

    savedOpinion.innerHTML = `
      <div class="saved-opinion-card">

        <strong>
          ${opinion.name}
        </strong>

        <div>
          ${stars}
        </div>

        <p>
          ${opinion.text}
        </p>

      </div>
    `;

  } catch (error) {

    console.error(
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
        opinionRating.value;

      const text =
        opinionText.value.trim();


      if (
        !name ||
        !rating ||
        !text
      ) {

        if (opinionMessage) {

          opinionMessage.textContent =
            "Completa todos los campos.";

        }

        return;
      }


      const opinion = {
        name,
        rating,
        text
      };


      localStorage.setItem(
        "fullBiteOpinion",
        JSON.stringify(opinion)
      );


      if (opinionMessage) {

        opinionMessage.textContent =
          "¡Gracias por compartir tu opinión!";

      }


      opinionForm.reset();

      loadSavedOpinion();

    }
  );

}


/* =========================
   ESC PARA CERRAR
========================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      closeCart();

      if (nav) {
        nav.classList.remove(
          "open"
        );
      }

    }

  }
);


/* =========================
   INICIALIZAR
========================= */

function init() {

  renderProducts();

  renderFeaturedProducts();

  updateCart();

  setupFilters();

  loadSavedOpinion();

}


init();
