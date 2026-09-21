const WHATSAPP_NUMBER = "50769275725";

const products = [
  {
    id: "classic",
    name: "Hotdog Clásico",
    price: 1.00,
    category: "hotdogs",
    description: "Salchicha, pan suave y nuestras salsas clásicas.",
    emoji: "🌭"
  },

  {
    id: "combo-1",
    name: "Combo #1",
    price: 1.50,
    category: "combos",
    description: "Hotdog + bebida.",
    emoji: "🌭🥤"
  },

  {
    id: "combo-2",
    name: "Combo #2",
    price: 2.00,
    category: "combos",
    description: "Hotdog + papas + bebida.",
    emoji: "🌭🍟🥤"
  },

  {
    id: "fries",
    name: "Papas Fritas",
    price: 0.50,
    category: "papas",
    description: "Papas crujientes para acompañar tu pedido.",
    emoji: "🍟"
  },

  {
    id: "soda",
    name: "Soda",
    price: 0.50,
    category: "bebidas",
    description: "Una bebida fría para acompañar.",
    emoji: "🥤"
  }
];


/* =====================================================
   ESTADO DEL CARRITO
===================================================== */

let cart = [];

let selectedCategory = "todos";


/* =====================================================
   ELEMENTOS
===================================================== */

const featuredProducts = document.getElementById("featuredProducts");
const menuProducts = document.getElementById("menuProducts");
const filters = document.getElementById("filters");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartEmpty = document.getElementById("cartEmpty");

const cartElement = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");

const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");

const sendWhatsAppButton = document.getElementById("sendWhatsApp");

const goMenuButton = document.getElementById("goMenu");
const heroOrderButton = document.getElementById("heroOrder");

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");


/* =====================================================
   FORMATO DE PRECIO
===================================================== */

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}


/* =====================================================
   PRODUCTOS
===================================================== */

function renderProducts(container, items) {

  if (!container) return;

  container.innerHTML = "";

  items.forEach(product => {

    const article = document.createElement("article");

    article.className = "product-card";

    article.innerHTML = `
      <div class="product-image">
        ${product.emoji}
      </div>

      <div class="product-info">

        <div class="product-category">
          ${getCategoryName(product.category)}
        </div>

        <h3>
          ${product.name}
        </h3>

        <p>
          ${product.description}
        </p>

        <div class="product-bottom">

          <span class="product-price">
            ${formatPrice(product.price)}
          </span>

          <button
            class="add-button"
            data-id="${product.id}"
          >
            AGREGAR
          </button>

        </div>

      </div>
    `;

    container.appendChild(article);
  });
}


function getCategoryName(category) {

  const categories = {
    hotdogs: "HOT DOGS",
    combos: "COMBOS",
    papas: "PAPAS",
    bebidas: "BEBIDAS"
  };

  return categories[category] || "";
}


/* =====================================================
   PRODUCTOS DESTACADOS
===================================================== */

function renderFeaturedProducts() {

  const featured = products.slice(0, 3);

  renderProducts(featuredProducts, featured);
}


/* =====================================================
   FILTROS DEL MENÚ
===================================================== */

function renderMenuProducts() {

  let filteredProducts;

  if (selectedCategory === "todos") {

    filteredProducts = products;

  } else {

    filteredProducts = products.filter(
      product => product.category === selectedCategory
    );

  }

  renderProducts(menuProducts, filteredProducts);
}


/* =====================================================
   AGREGAR AL CARRITO
===================================================== */

function addToCart(productId) {

  const product = products.find(
    product => product.id === productId
  );

  if (!product) return;

  const existingItem = cart.find(
    item => item.id === productId
  );

  if (existingItem) {

    existingItem.quantity++;

  } else {

    cart.push({
      ...product,
      quantity: 1
    });

  }

  renderCart();
}


/* =====================================================
   CAMBIAR CANTIDAD
===================================================== */

function changeQuantity(productId, change) {

  const item = cart.find(
    item => item.id === productId
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {

    cart = cart.filter(
      item => item.id !== productId
    );

  }

  renderCart();
}


/* =====================================================
   ELIMINAR PRODUCTO
===================================================== */

function removeFromCart(productId) {

  cart = cart.filter(
    item => item.id !== productId
  );

  renderCart();
}


/* =====================================================
   RENDER DEL CARRITO
===================================================== */

function renderCart() {

  if (!cartItems) return;

  cartItems.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;


  if (cart.length === 0) {

    cartItems.style.display = "none";

    if (cartEmpty) {
      cartEmpty.style.display = "block";
    }

  } else {

    cartItems.style.display = "block";

    if (cartEmpty) {
      cartEmpty.style.display = "none";
    }


    cart.forEach(item => {

      totalItems += item.quantity;

      totalPrice += item.price * item.quantity;


      const cartItem = document.createElement("div");

      cartItem.className = "cart-item";

      cartItem.innerHTML = `

        <div class="cart-item-info">

          <h3>
            ${item.name}
          </h3>

          <p>
            ${formatPrice(item.price)}
          </p>

        </div>


        <div class="cart-quantity">

          <button
            class="quantity-button"
            data-action="decrease"
            data-id="${item.id}"
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <span class="quantity-number">
            ${item.quantity}
          </span>

          <button
            class="quantity-button"
            data-action="increase"
            data-id="${item.id}"
            aria-label="Aumentar cantidad"
          >
            +
          </button>

        </div>


        <button
          class="remove-item"
          data-action="remove"
          data-id="${item.id}"
        >
          ELIMINAR
        </button>

      `;

      cartItems.appendChild(cartItem);

    });

  }


  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  if (cartTotal) {
    cartTotal.textContent = formatPrice(totalPrice);
  }

  if (sendWhatsAppButton) {
    sendWhatsAppButton.disabled = cart.length === 0;
  }

}


/* =====================================================
   NÚMERO DE PEDIDO
   FB-01 → FB-99
===================================================== */

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


/* =====================================================
   ENVIAR PEDIDO POR WHATSAPP
===================================================== */

function sendWhatsApp() {

  if (cart.length === 0) {
    return;
  }


  const orderNumber = generateOrderNumber();


  let total = 0;


  let message =
    `*FULL BITE* 🍴%0A` +
    `*Hazle caso al antojo*%0A%0A`;


  message +=
    `*Número de pedido: ${orderNumber}*%0A%0A`;


  message +=
    `*Mi pedido:*%0A`;


  cart.forEach(item => {

    const subtotal = item.price * item.quantity;

    total += subtotal;


    message +=
      `• ${item.quantity}x ${item.name} — ${formatPrice(subtotal)}%0A`;

  });


  message +=
    `%0A*TOTAL: ${formatPrice(total)}*%0A%0A`;


  message +=
    `Hola, quiero realizar este pedido. Gracias. 🍴`;


  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}


/* =====================================================
   ABRIR CARRITO
===================================================== */

function openCart() {

  cartElement.classList.add("active");
  cartOverlay.classList.add("active");

  document.body.style.overflow = "hidden";
}


/* =====================================================
   CERRAR CARRITO
===================================================== */

function closeCart() {

  cartElement.classList.remove("active");
  cartOverlay.classList.remove("active");

  document.body.style.overflow = "";
}


/* =====================================================
   EVENTOS DE PRODUCTOS
===================================================== */

document.addEventListener("click", event => {

  const addButton = event.target.closest(".add-button");

  if (addButton) {

    const productId = addButton.dataset.id;

    addToCart(productId);

    openCart();

    return;
  }


  const quantityButton =
    event.target.closest(".quantity-button");


  if (quantityButton) {

    const productId =
      quantityButton.dataset.id;

    const action =
      quantityButton.dataset.action;


    if (action === "increase") {

      changeQuantity(productId, 1);

    }

    if (action === "decrease") {

      changeQuantity(productId, -1);

    }

    return;
  }


  const removeButton =
    event.target.closest(".remove-item");


  if (removeButton) {

    removeFromCart(
      removeButton.dataset.id
    );

  }

});


/* =====================================================
   FILTROS
===================================================== */

if (filters) {

  filters.addEventListener("click", event => {

    const filter =
      event.target.closest(".filter");

    if (!filter) return;


    document
      .querySelectorAll(".filter")
      .forEach(button => {
        button.classList.remove("active");
      });


    filter.classList.add("active");


    selectedCategory =
      filter.dataset.category;


    renderMenuProducts();

  });

}


/* =====================================================
   CARRITO
===================================================== */

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


/* =====================================================
   BOTÓN PEDIR AHORA
===================================================== */

if (heroOrderButton) {

  heroOrderButton.addEventListener(
    "click",
    openCart
  );

}


/* =====================================================
   BOTÓN VER MENÚ DESDE CARRITO
===================================================== */

if (goMenuButton) {

  goMenuButton.addEventListener("click", () => {

    closeCart();

    document
      .getElementById("menu")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  });

}


/* =====================================================
   WHATSAPP
===================================================== */

if (sendWhatsAppButton) {

  sendWhatsAppButton.addEventListener(
    "click",
    sendWhatsApp
  );

}


/* =====================================================
   MENÚ MÓVIL
===================================================== */

if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    nav.classList.toggle("active");

  });

}


if (nav) {

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

    });

  });

}


/* =====================================================
   INICIALIZACIÓN
===================================================== */

renderFeaturedProducts();

renderMenuProducts();

renderCart();
