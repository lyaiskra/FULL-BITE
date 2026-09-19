const WHATSAPP_NUMBER = "50769275725";

const products = [
  {
    id: "classic",
    name: "Hotdog Clásico",
    category: "hotdogs",
    price: 1.00,
    desc: "Salchicha, pan suave y nuestras salsas clásicas.",
    emoji: "🌭",
    featured: true,
    badge: "CLÁSICO"
  },
  {
    id: "combo-1",
    name: "Combo #1",
    category: "combos",
    price: 1.50,
    desc: "Hotdog Clásico + soda.",
    emoji: "🍽️",
    featured: true,
    badge: "COMBO"
  },
  {
    id: "combo-2",
    name: "Combo #2",
    category: "combos",
    price: 2.00,
    desc: "Hotdog Clásico + papas + soda.",
    emoji: "🍽️",
    featured: true,
    badge: "COMBO"
  },
  {
    id: "fries",
    name: "Papas Fritas",
    category: "papas",
    price: 0.50,
    desc: "Papas crujientes, perfectas para acompañar.",
    emoji: "🍟",
    featured: true,
    badge: "PAPAS"
  },
  {
    id: "soda",
    name: "Soda",
    category: "bebidas",
    price: 0.50,
    desc: "Elige tu sabor disponible en el punto de venta.",
    emoji: "🥤",
    featured: true,
    badge: "BEBIDA"
  }
];

let cart = JSON.parse(localStorage.getItem("fullbite-cart")) || [];
let selectedCategory = "todos";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================
   FORMATO DE PRECIO
========================= */

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


/* =========================
   GUARDAR CARRITO
========================= */

function saveCart() {
  localStorage.setItem("fullbite-cart", JSON.stringify(cart));
}


/* =========================
   CANTIDAD TOTAL
========================= */

function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}


/* =========================
   TOTAL DEL CARRITO
========================= */

function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}


/* =========================
   ACTUALIZAR CONTADOR
========================= */

function updateCartCount() {
  const countElements = $$("[data-cart-count]");

  countElements.forEach((element) => {
    element.textContent = getCartCount();
  });
}


/* =========================
   AGREGAR PRODUCTO
========================= */

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  const existingProduct = cart.find(
    (item) => item.id === productId
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  updateCartCount();

  showNotification(`${product.name} agregado al carrito`);
}


/* =========================
   QUITAR PRODUCTO
========================= */

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);

  saveCart();
  renderCart();
  updateCartCount();
}


/* =========================
   CAMBIAR CANTIDAD
========================= */

function changeQuantity(productId, change) {
  const item = cart.find(
    (product) => product.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
  updateCartCount();
}


/* =========================
   RENDERIZAR PRODUCTOS
========================= */

function renderProducts() {
  const container = $("#products-grid");

  if (!container) return;

  let filteredProducts = products;

  if (selectedCategory !== "todos") {
    filteredProducts = products.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-products">
        <p>No hay productos disponibles en esta categoría.</p>
      </div>
    `;

    return;
  }

  container.innerHTML = filteredProducts
    .map((product) => {
      return `
        <article class="product-card">

          <div class="product-card-top">
            <span class="product-badge">
              ${product.badge}
            </span>
          </div>

          <div class="product-emoji">
            ${product.emoji}
          </div>

          <div class="product-info">

            <h3>${product.name}</h3>

            <p>${product.desc}</p>

            <div class="product-bottom">

              <strong class="product-price">
                ${formatPrice(product.price)}
              </strong>

              <button
                class="add-to-cart"
                type="button"
                data-add-product="${product.id}"
              >
                Agregar
              </button>

            </div>

          </div>

        </article>
      `;
    })
    .join("");
}


/* =========================
   RENDERIZAR CARRITO
========================= */

function renderCart() {
  const cartItems = $("#cart-items");
  const cartTotal = $("#cart-total");

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span>🛒</span>
        <p>Tu carrito está vacío.</p>
        <small>Agrega algo rico para comenzar.</small>
      </div>
    `;

    if (cartTotal) {
      cartTotal.textContent = "$0.00";
    }

    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      return `
        <div class="cart-item">

          <div class="cart-item-icon">
            ${item.emoji}
          </div>

          <div class="cart-item-info">

            <strong>${item.name}</strong>

            <span>
              ${formatPrice(item.price)}
            </span>

            <div class="cart-quantity">

              <button
                type="button"
                data-cart-minus="${item.id}"
              >
                −
              </button>

              <span>${item.quantity}</span>

              <button
                type="button"
                data-cart-plus="${item.id}"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="cart-remove"
            type="button"
            data-cart-remove="${item.id}"
            aria-label="Eliminar ${item.name}"
          >
            ×
          </button>

        </div>
      `;
    })
    .join("");

  if (cartTotal) {
    cartTotal.textContent = formatPrice(getCartTotal());
  }
}


/* =========================
   ABRIR CARRITO
========================= */

function openCart() {
  const cartDrawer = $("#cart-drawer");
  const cartOverlay = $("#cart-overlay");

  if (cartDrawer) {
    cartDrawer.classList.add("active");
  }

  if (cartOverlay) {
    cartOverlay.classList.add("active");
  }

  document.body.classList.add("cart-open");
}


/* =========================
   CERRAR CARRITO
========================= */

function closeCart() {
  const cartDrawer = $("#cart-drawer");
  const cartOverlay = $("#cart-overlay");

  if (cartDrawer) {
    cartDrawer.classList.remove("active");
  }

  if (cartOverlay) {
    cartOverlay.classList.remove("active");
  }

  document.body.classList.remove("cart-open");
}


/* =========================
   WHATSAPP
========================= */

function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    showNotification("Tu carrito está vacío.");
    return;
  }

  let message = "Hola, FULL BITE. Quiero hacer este pedido:%0A%0A";

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;

    message += `${item.quantity}x ${item.name} - ${formatPrice(subtotal)}%0A`;
  });

  message += `%0A*Total: ${formatPrice(getCartTotal())}*`;
  message += `%0A%0AGracias.`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(whatsappURL, "_blank");
}


/* =========================
   NOTIFICACIÓN
========================= */

function showNotification(message) {
  let notification = $("#fullbite-notification");

  if (!notification) {
    notification = document.createElement("div");

    notification.id = "fullbite-notification";
    notification.className = "fullbite-notification";

    document.body.appendChild(notification);
  }

  notification.textContent = message;

  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2200);
}


/* =========================
   FILTROS DEL MENÚ
========================= */

function setupFilters() {
  const filterButtons = $$(".filter-btn");

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      selectedCategory =
        button.dataset.category || "todos";

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      renderProducts();

    });

  });
}


/* =========================
   EVENTOS DEL CARRITO
========================= */

function setupCartEvents() {

  document.addEventListener("click", (event) => {

    const addButton =
      event.target.closest("[data-add-product]");

    if (addButton) {

      const productId =
        addButton.dataset.addProduct;

      addToCart(productId);

      return;
    }


    const plusButton =
      event.target.closest("[data-cart-plus]");

    if (plusButton) {

      changeQuantity(
        plusButton.dataset.cartPlus,
        1
      );

      return;
    }


    const minusButton =
      event.target.closest("[data-cart-minus]");

    if (minusButton) {

      changeQuantity(
        minusButton.dataset.cartMinus,
        -1
      );

      return;
    }


    const removeButton =
      event.target.closest("[data-cart-remove]");

    if (removeButton) {

      removeFromCart(
        removeButton.dataset.cartRemove
      );

      return;
    }

  });

}


/* =========================
   BOTONES DEL CARRITO
========================= */

function setupCartButtons() {

  const cartButtons =
    $$("[data-open-cart]");

  cartButtons.forEach((button) => {
    button.addEventListener("click", openCart);
  });


  const closeButtons =
    $$("[data-close-cart]");

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeCart);
  });


  const overlay =
    $("#cart-overlay");

  if (overlay) {
    overlay.addEventListener("click", closeCart);
  }


  const whatsappButton =
    $("#whatsapp-order");

  if (whatsappButton) {
    whatsappButton.addEventListener(
      "click",
      sendOrderToWhatsApp
    );
  }

}


/* =========================
   PEDIR AHORA DESDE HERO
========================= */

function setupHeroOrder() {

  const heroOrder =
    $("#hero-order");

  if (!heroOrder) return;

  heroOrder.addEventListener("click", () => {

    if (cart.length > 0) {
      openCart();
    } else {

      const menu =
        $("#menu");

      if (menu) {
        menu.scrollIntoView({
          behavior: "smooth"
        });
      }

    }

  });

}


/* =========================
   MENÚ MÓVIL
========================= */

function setupMobileMenu() {

  const menuButton =
    $("#mobile-menu-btn");

  const mobileMenu =
    $("#mobile-menu");

  if (!menuButton || !mobileMenu) return;


  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    menuButton.classList.toggle("active");

  });


  const links =
    mobileMenu.querySelectorAll("a");

  links.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");

      menuButton.classList.remove("active");

    });

  });

}


/* =========================
   SCROLL SUAVE
========================= */

function setupSmoothScroll() {

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

}


/* =========================
   INICIO
========================= */

document.addEventListener("DOMContentLoaded", () => {

  renderProducts();

  renderCart();

  updateCartCount();

  setupFilters();

  setupCartEvents();

  setupCartButtons();

  setupHeroOrder();

  setupMobileMenu();

  setupSmoothScroll();

});
