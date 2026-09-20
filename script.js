/* =========================================================
   FULL BITE — SCRIPT
   ========================================================= */

const products = [
  {
    id: 1,
    name: "Hotdog Clásico",
    category: "hotdogs",
    price: 1.00,
    icon: "🌭",
    description: "Pan, salchicha y los acompañamientos de FULL BITE.",
    badge: "Favorito"
  },
  {
    id: 2,
    name: "Combo #1",
    category: "combos",
    price: 1.50,
    icon: "🌭🥤",
    description: "Hotdog + bebida.",
    badge: "Combo"
  },
  {
    id: 3,
    name: "Combo #2",
    category: "combos",
    price: 2.00,
    icon: "🌭🍟🥤",
    description: "Hotdog + papas + bebida.",
    badge: "Combo"
  },
  {
    id: 4,
    name: "Papas Fritas",
    category: "papas",
    price: 0.50,
    icon: "🍟",
    description: "Papas crujientes para acompañar tu antojo."
  },
  {
    id: 5,
    name: "Soda",
    category: "bebidas",
    price: 0.50,
    icon: "🥤",
    description: "Bebida fría para acompañar tu pedido."
  },
  {
    id: 6,
    name: "Vaso de Soda",
    category: "bebidas",
    price: 0.25,
    icon: "🥤",
    description: "Una opción pequeña para refrescarte."
  }
];

/* =========================================================
   VARIABLES
   ========================================================= */

let cart = JSON.parse(localStorage.getItem("fullBiteCart")) || [];
let currentCategory = "todos";

const menuProducts = document.getElementById("menuProducts");
const featuredProducts = document.getElementById("featuredProducts");

const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const goMenu = document.getElementById("goMenu");
const sendWhatsApp = document.getElementById("sendWhatsApp");

const heroOrder = document.getElementById("heroOrder");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

/* =========================================================
   FORMATO DE PRECIO
   ========================================================= */

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

/* =========================================================
   GENERAR TARJETA DE PRODUCTO
   ========================================================= */

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

        <p>${product.description}</p>

        <div class="product-bottom">
          <strong class="price">${formatPrice(product.price)}</strong>

          <button
            class="add-btn"
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

/* =========================================================
   MOSTRAR PRODUCTOS
   ========================================================= */

function renderProducts() {
  if (!menuProducts) return;

  const filteredProducts =
    currentCategory === "todos"
      ? products
      : products.filter(
          product => product.category === currentCategory
        );

  menuProducts.innerHTML = filteredProducts
    .map(createProductCard)
    .join("");
}

/* =========================================================
   FAVORITOS
   ========================================================= */

function renderFeaturedProducts() {
  if (!featuredProducts) return;

  const featured = products.slice(0, 3);

  featuredProducts.innerHTML = featured
    .map(createProductCard)
    .join("");
}

/* =========================================================
   AGREGAR AL CARRITO
   ========================================================= */

function addToCart(productId) {
  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;

  const existingItem = cart.find(
    item => item.id === productId
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

  openCartPanel();
}

/* =========================================================
   GUARDAR CARRITO
   ========================================================= */

function saveCart() {
  localStorage.setItem(
    "fullBiteCart",
    JSON.stringify(cart)
  );
}

/* =========================================================
   CAMBIAR CANTIDAD
   ========================================================= */

function changeQuantity(productId, amount) {
  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(
      item => item.id !== productId
    );
  }

  saveCart();
  renderCart();
}

/* =========================================================
   RENDER CARRITO
   ========================================================= */

function renderCart() {
  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = "";
    cartEmpty.style.display = "flex";
  } else {
    cartEmpty.style.display = "none";

    cartItems.innerHTML = cart
      .map(item => {
        const product = products.find(
          product => product.id === item.id
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
              <h4>${product.name}</h4>

              <small>
                ${formatPrice(product.price)} c/u
              </small>

              <div class="qty">
                <button
                  data-quantity="${product.id}"
                  data-change="-1"
                  aria-label="Reducir cantidad"
                >
                  −
                </button>

                <span>${item.quantity}</span>

                <button
                  data-quantity="${product.id}"
                  data-change="1"
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <strong>
              ${formatPrice(subtotal)}
            </strong>
          </div>
        `;
      })
      .join("");
  }

  updateCartTotals();
}

/* =========================================================
   TOTALES
   ========================================================= */

function updateCartTotals() {
  const total = cart.reduce((sum, item) => {
    const product = products.find(
      product => product.id === item.id
    );

    if (!product) return sum;

    return sum + product.price * item.quantity;
  }, 0);

  const quantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cartTotal) {
    cartTotal.textContent = formatPrice(total);
  }

  if (cartCount) {
    cartCount.textContent = quantity;
  }
}

/* =========================================================
   ABRIR / CERRAR CARRITO
   ========================================================= */

function openCartPanel() {
  cartElement?.classList.add("open");
  cartOverlay?.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCartPanel() {
  cartElement?.classList.remove("open");
  cartOverlay?.classList.remove("open");
  document.body.style.overflow = "";
}

openCart?.addEventListener(
  "click",
  openCartPanel
);

closeCart?.addEventListener(
  "click",
  closeCartPanel
);

cartOverlay?.addEventListener(
  "click",
  closeCartPanel
);

goMenu?.addEventListener("click", () => {
  closeCartPanel();

  document
    .getElementById("menu")
    ?.scrollIntoView({
      behavior: "smooth"
    });
});

/* =========================================================
   BOTONES DE PRODUCTOS
   ========================================================= */

document.addEventListener("click", event => {
  const addButton =
    event.target.closest("[data-add]");

  if (addButton) {
    const productId = Number(
      addButton.dataset.add
    );

    addToCart(productId);
    return;
  }

  const quantityButton =
    event.target.closest("[data-quantity]");

  if (quantityButton) {
    const productId = Number(
      quantityButton.dataset.quantity
    );

    const change = Number(
      quantityButton.dataset.change
    );

    changeQuantity(productId, change);
  }
});

/* =========================================================
   FILTROS DEL MENÚ
   ========================================================= */

document
  .getElementById("filters")
  ?.addEventListener("click", event => {
    const filter =
      event.target.closest(".filter");

    if (!filter) return;

    currentCategory =
      filter.dataset.category;

    document
      .querySelectorAll(".filter")
      .forEach(button => {
        button.classList.remove("active");
      });

    filter.classList.add("active");

    renderProducts();
  });

/* =========================================================
   PEDIR AHORA
   ========================================================= */

heroOrder?.addEventListener("click", () => {
  if (cart.length === 0) {
    document
      .getElementById("menu")
      ?.scrollIntoView({
        behavior: "smooth"
      });

    return;
  }

  openCartPanel();
});

/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

document
  .querySelectorAll(".nav a")
  .forEach(link => {
    link.addEventListener("click", () => {
      nav?.classList.remove("open");
    });
  });

/* =========================================================
   NÚMERO DE PEDIDO
   FB-01 → FB-99
   ========================================================= */

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

  return `FB-${String(lastOrder).padStart(
    2,
    "0"
  )}`;
}

/* =========================================================
   ENVIAR PEDIDO A WHATSAPP
   ========================================================= */

sendWhatsApp?.addEventListener(
  "click",
  () => {
    if (cart.length === 0) {
      alert(
        "Tu carrito está vacío. Agrega algo al pedido primero."
      );
      return;
    }

    const orderNumber =
      generateOrderNumber();

    let message =
      `*FULL BITE* 🍔\n` +
      `*Pedido ${orderNumber}*\n\n`;

    let total = 0;

    cart.forEach(item => {
      const product = products.find(
        product => product.id === item.id
      );

      if (!product) return;

      const subtotal =
        product.price * item.quantity;

      total += subtotal;

      message +=
        `• ${product.name} x${item.quantity} — ` +
        `${formatPrice(subtotal)}\n`;
    });

    message +=
      `\n*TOTAL: ${formatPrice(total)}*` +
      `\n\nHola, quiero realizar este pedido.`;

    const phone = "50769275725";

    const whatsappURL =
      `https://wa.me/${phone}?text=` +
      encodeURIComponent(message);

    window.open(
      whatsappURL,
      "_blank"
    );
  }
);

/* =========================================================
   OPINIONES
   ========================================================= */

const opinionForm =
  document.getElementById("opinionForm");

const opinionName =
  document.getElementById("opinionName");

const opinionRating =
  document.getElementById("opinionRating");

const opinionText =
  document.getElementById("opinionText");

const opinionMessage =
  document.getElementById("opinionMessage");

const savedOpinion =
  document.getElementById("savedOpinion");

/* =========================================================
   MOSTRAR OPINIÓN GUARDADA
   ========================================================= */

function renderSavedOpinion() {
  if (!savedOpinion) return;

  const opinion =
    JSON.parse(
      localStorage.getItem(
        "fullBiteOpinion"
      )
    );

  if (!opinion) {
    savedOpinion.innerHTML = "";
    return;
  }

  const stars =
    "★".repeat(opinion.rating) +
    "☆".repeat(5 - opinion.rating);

  savedOpinion.innerHTML = `
    <div class="saved-opinion-card">
      <strong>
        Tu opinión, ${escapeHTML(opinion.name)}
      </strong>

      <div class="saved-opinion-stars">
        ${stars}
      </div>

      <p>
        “${escapeHTML(opinion.text)}”
      </p>
    </div>
  `;
}

/* =========================================================
   SEGURIDAD PARA TEXTO DEL USUARIO
   ========================================================= */

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   GUARDAR OPINIÓN
   ========================================================= */

opinionForm?.addEventListener(
  "submit",
  event => {
    event.preventDefault();

    const name =
      opinionName.value.trim();

    const rating =
      Number(opinionRating.value);

    const text =
      opinionText.value.trim();

    if (!name || !rating || !text) {
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
      "fullBiteOpinion",
      JSON.stringify(opinion)
    );

    opinionMessage.textContent =
      "¡Gracias por tu opinión!";

    opinionForm.reset();

    renderSavedOpinion();

    setTimeout(() => {
      opinionMessage.textContent = "";
    }, 3500);
  }
);

/* =========================================================
   ESC PARA CERRAR CARRITO
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {
    if (event.key === "Escape") {
      closeCartPanel();
    }
  }
);

/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

renderProducts();
renderFeaturedProducts();
renderCart();
renderSavedOpinion();
