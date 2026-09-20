const WHATSAPP_NUMBER = "50769275725";


/* =========================================================
   PRODUCTOS
   ========================================================= */

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
    desc: "Hotdog + bebida.",
    emoji: "🍽️",
    featured: true,
    badge: "COMBO"
  },

  {
    id: "combo-2",
    name: "Combo #2",
    category: "combos",
    price: 2.00,
    desc: "Hotdog + papas + bebida.",
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
  },

  {
    id: "cup-soda",
    name: "Vaso de soda",
    category: "bebidas",
    price: 0.25,
    desc: "Bebida fría servida en vaso.",
    emoji: "🥤",
    featured: false,
    badge: "BEBIDA"
  }

];


/* =========================================================
   CARRITO
   ========================================================= */

let cart = JSON.parse(
  localStorage.getItem("fullBiteCart") || "[]"
);

let selectedCategory = "todos";


/* =========================================================
   FUNCIONES BÁSICAS
   ========================================================= */

const $ = id => document.getElementById(id);

const money = number =>
  `$${number.toFixed(2)}`;


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
   AGREGAR PRODUCTO
   ========================================================= */

function addToCart(productId, qty = 1) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) return;


  const existing = cart.find(
    item => item.id === productId
  );


  if (existing) {

    existing.qty += qty;

  } else {

    cart.push({
      id: product.id,
      qty: qty
    });

  }


  saveCart();
  renderCart();
  openCart();

}


/* =========================================================
   QUITAR UNA UNIDAD
   ========================================================= */

function removeOne(id) {

  const item = cart.find(
    product => product.id === id
  );

  if (!item) return;


  item.qty--;


  if (item.qty <= 0) {

    cart = cart.filter(
      product => product.id !== id
    );

  }


  saveCart();
  renderCart();

}


/* =========================================================
   AÑADIR UNA UNIDAD
   ========================================================= */

function addOne(id) {

  addToCart(id);

}


/* =========================================================
   TOTAL DEL CARRITO
   ========================================================= */

function cartTotal() {

  return cart.reduce(
    (total, item) => {

      const product = products.find(
        product => product.id === item.id
      );

      return total +
        (product
          ? product.price * item.qty
          : 0
        );

    },
    0
  );

}


/* =========================================================
   CANTIDAD TOTAL
   ========================================================= */

function cartCount() {

  return cart.reduce(
    (total, item) => total + item.qty,
    0
  );

}


/* =========================================================
   TARJETA DE PRODUCTO
   ========================================================= */

function productCard(product) {

  return `

    <article class="product-card">

      ${
        product.badge
          ? `<span class="badge">${product.badge}</span>`
          : ""
      }

      <div class="product-icon">
        ${product.emoji}
      </div>


      <div class="product-info">

        <h3>
          ${product.name}
        </h3>


        <p>
          ${product.desc}
        </p>


        <div class="product-bottom">

          <span class="product-price">
            ${money(product.price)}
          </span>


          <button
            class="add-btn"
            onclick="addToCart('${product.id}')"
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

  const featured =
    products
      .filter(product => product.featured)
      .slice(0, 3);


  $("featuredProducts").innerHTML =
    featured
      .map(productCard)
      .join("");


  const menuProducts =
    selectedCategory === "todos"
      ? products
      : products.filter(
          product =>
            product.category === selectedCategory
        );


  $("menuProducts").innerHTML =
    menuProducts
      .map(productCard)
      .join("");

}


/* =========================================================
   MOSTRAR CARRITO
   ========================================================= */

function renderCart() {

  $("cartCount").textContent =
    cartCount();


  $("cartTotal").textContent =
    money(cartTotal());


  $("cartItems").innerHTML =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );


      if (!product) return "";


      return `

        <div class="cart-item">


          <div class="cart-item-icon">
            ${product.emoji}
          </div>


          <div class="cart-item-info">

            <h4>
              ${product.name}
            </h4>


            <small>
              ${money(product.price)}
            </small>


            <div class="cart-item-controls">

              <button
                onclick="removeOne('${product.id}')"
                aria-label="Disminuir cantidad"
              >
                −
              </button>


              <span>
                ${item.qty}
              </span>


              <button
                onclick="addOne('${product.id}')"
                aria-label="Aumentar cantidad"
              >
                +
              </button>

            </div>

          </div>


          <div class="cart-item-price">
            ${money(product.price * item.qty)}
          </div>


        </div>

      `;

    }).join("");


  const empty =
    cart.length === 0;


  $("cartEmpty").style.display =
    empty ? "flex" : "none";


  $("cartItems").style.display =
    empty ? "none" : "block";


  $("sendWhatsApp").disabled =
    empty;


  $("sendWhatsApp").style.opacity =
    empty ? "0.5" : "1";

}


/* =========================================================
   ABRIR CARRITO
   ========================================================= */

function openCart() {

  $("cart").classList.add("active");

  $("cartOverlay").classList.add("active");

}


/* =========================================================
   CERRAR CARRITO
   ========================================================= */

function closeCart() {

  $("cart").classList.remove("active");

  $("cartOverlay").classList.remove("active");

}


/* =========================================================
   NÚMERO DE PEDIDO
   FB-01 → FB-99
   ========================================================= */

function generateOrderNumber() {

  let lastOrder =
    Number(
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


/* =========================================================
   ENVIAR PEDIDO POR WHATSAPP
   ========================================================= */

function sendWhatsApp() {

  if (!cart.length) return;


  const orderNumber =
    generateOrderNumber();


  const lines =
    cart.map(item => {

      const product =
        products.find(
          product => product.id === item.id
        );


      return `• ${item.qty}x ${product.name} — ${money(product.price * item.qty)}`;

    });


  const total =
    money(cartTotal());


  const message =
`Hola, quiero realizar un pedido en FULL BITE.

*Pedido: ${orderNumber}*

${lines.join("\n")}

*Total: ${total}*

¿Me confirman el pedido?`;


  const encodedMessage =
    encodeURIComponent(message);


  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
    "_blank"
  );


  $("orderInfo").innerHTML =
    `Número de pedido: <strong>${orderNumber}</strong>`;

}


/* =========================================================
   FILTROS DEL MENÚ
   ========================================================= */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(
            item =>
              item.classList.remove("active")
          );


        button.classList.add("active");


        selectedCategory =
          button.dataset.category;


        renderProducts();

      }
    );

  });


/* =========================================================
   EVENTOS DEL CARRITO
   ========================================================= */

$("openCart")
  .addEventListener(
    "click",
    openCart
  );


$("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


$("cartOverlay")
  .addEventListener(
    "click",
    closeCart
  );


$("goMenu")
  .addEventListener(
    "click",
    () => {

      closeCart();

      $("menu").scrollIntoView({
        behavior: "smooth"
      });

    }
  );


$("sendWhatsApp")
  .addEventListener(
    "click",
    sendWhatsApp
  );


/* =========================================================
   BOTÓN PEDIR AHORA
   ========================================================= */

$("heroOrder")
  .addEventListener(
    "click",
    () => {

      $("menu").scrollIntoView({
        behavior: "smooth"
      });

    }
  );


/* =========================================================
   MENÚ MÓVIL
   ========================================================= */

$("menuToggle")
  .addEventListener(
    "click",
    () => {

      $("nav").classList.toggle("active");

    }
  );


document
  .querySelectorAll(".nav a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        $("nav").classList.remove("active");

      }
    );

  });


/* =========================================================
   INICIALIZAR
   ========================================================= */

renderProducts();

renderCart();
