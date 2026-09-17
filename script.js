/* ==================== CONFIGURACIÓN ==================== */

const WHATSAPP_NUMBER = "50769275725";


/* ==================== PRODUCTOS ==================== */

const products = [

  {
    id:"classic",
    name:"Hotdog Clásico",
    category:"hotdogs",
    price:1.00,
    desc:"Salchicha, pan suave y nuestras salsas clásicas.",
    emoji:"🌭",
    featured:true,
    badge:"CLÁSICO"
  },

  {
    id:"combo-1",
    name:"Combo #1",
    category:"combos",
    price:1.50,
    desc:"Hotdog Clásico + soda.",
    emoji:"🍽️",
    featured:true,
    badge:"COMBO"
  },

  {
    id:"combo-2",
    name:"Combo #2",
    category:"combos",
    price:2.00,
    desc:"Hotdog Clásico + papas + soda.",
    emoji:"🍽️",
    featured:true,
    badge:"COMBO"
  },

  {
    id:"fries",
    name:"Papas Fritas",
    category:"papas",
    price:0.50,
    desc:"Papas crujientes, perfectas para acompañar.",
    emoji:"🍟",
    featured:true,
    badge:"PAPAS"
  },

  {
    id:"donuts",
    name:"Donas",
    category:"postre",
    price:1.00,
    desc:"Donas esponjosas y deliciosas.",
    emoji:"🍩",
    featured:true,
    badge:"POSTRE"
  },

  {
    id:"cookies",
    name:"Galletas",
    category:"postre",
    price:0.50,
    desc:"Galletas crujientes y deliciosas.",
    emoji:"🍪",
    featured:true,
    badge:"POSTRE"
  },

  {
    id:"soda",
    name:"Soda",
    category:"bebidas",
    price:0.50,
    desc:"Elige tu sabor disponible en el punto de venta.",
    emoji:"🥤",
    featured:true,
    badge:"BEBIDA"
  }

];


/* ==================== CARRITO ==================== */

let cart = JSON.parse(
  localStorage.getItem("fullBiteCart") || "[]"
);


let selectedCategory = "todos";


/* ==================== FUNCIONES ==================== */

const $ = id =>
  document.getElementById(id);


const money = n =>
  `$${n.toFixed(2)}`;


function saveCart(){

  localStorage.setItem(
    "fullBiteCart",
    JSON.stringify(cart)
  );

}


/* ==================== AGREGAR AL CARRITO ==================== */

function addToCart(
  productId,
  qty = 1
){

  const product =
    products.find(
      x => x.id === productId
    );


  if(!product) return;


  const existing =
    cart.find(
      x => x.id === productId
    );


  if(existing){

    existing.qty += qty;

  }else{

    cart.push({
      id:product.id,
      qty:qty
    });

  }


  saveCart();

  renderCart();

  openCart();

}


/* ==================== RESTAR PRODUCTO ==================== */

function removeOne(id){

  const item =
    cart.find(
      x => x.id === id
    );


  if(!item) return;


  item.qty--;


  if(item.qty <= 0){

    cart =
      cart.filter(
        x => x.id !== id
      );

  }


  saveCart();

  renderCart();

}


/* ==================== SUMAR PRODUCTO ==================== */

function addOne(id){

  addToCart(id);

}


/* ==================== TOTAL ==================== */

function cartTotal(){

  return cart.reduce(
    (sum,item) => {

      const product =
        products.find(
          x => x.id === item.id
        );


      return sum +
        (
          product
          ? product.price * item.qty
          : 0
        );

    },
    0
  );

}


/* ==================== CANTIDAD DEL CARRITO ==================== */

function cartCount(){

  return cart.reduce(
    (sum,item) =>
      sum + item.qty,
    0
  );

}


/* ==================== TARJETAS ==================== */

function productCard(p){

  return `

    <article class="product-card">

      ${
        p.badge
        ? `<span class="badge">${p.badge}</span>`
        : ""
      }


      <div class="product-visual">

        ${p.emoji}

      </div>


      <div class="product-info">

        <h3>
          ${p.name}
        </h3>


        <p>
          ${p.desc}
        </p>


        <div class="product-bottom">

          <span class="price">
            ${money(p.price)}
          </span>


          <button
            class="add-btn"
            onclick="addToCart('${p.id}')"
          >
            + AGREGAR
          </button>

        </div>

      </div>

    </article>

  `;

}


/* ==================== MOSTRAR PRODUCTOS ==================== */

function renderProducts(){

  const featured =
    products
      .filter(
        p => p.featured
      )
      .slice(0,3);


  $("featuredProducts").innerHTML =
    featured
      .map(productCard)
      .join("");


  const list =
    selectedCategory === "todos"
    ? products
    : products.filter(
        p =>
          p.category === selectedCategory
      );


  $("menuProducts").innerHTML =
    list
      .map(productCard)
      .join("");

}


/* ==================== MOSTRAR CARRITO ==================== */

function renderCart(){

  $("cartCount").textContent =
    cartCount();


  $("cartTotal").textContent =
    money(cartTotal());


  $("cartItems").innerHTML =
    cart.map(item => {

      const product =
        products.find(
          x => x.id === item.id
        );


      if(!product) return "";


      return `

        <div class="cart-item">


          <div class="cart-item-icon">

            ${product.emoji}

          </div>


          <div>

            <h4>
              ${product.name}
            </h4>


            <p>
              ${money(
                product.price * item.qty
              )}
            </p>


            <div class="qty">


              <button
                onclick="removeOne('${product.id}')"
              >
                −
              </button>


              <b>
                ${item.qty}
              </b>


              <button
                onclick="addOne('${product.id}')"
              >
                +
              </button>


            </div>

          </div>


          <button
            aria-label="Eliminar"
            onclick="
              cart = cart.filter(
                x => x.id !== '${product.id}'
              );

              saveCart();

              renderCart();
            "
          >
            ✕
          </button>


        </div>

      `;

    }).join("");


  const empty =
    cart.length === 0;


  $("cartEmpty").style.display =
    empty
    ? "block"
    : "none";


  $("cartItems").style.display =
    empty
    ? "none"
    : "block";


  $("sendWhatsApp").disabled =
    empty;


  $("sendWhatsApp").style.opacity =
    empty
    ? ".5"
    : "1";

}


/* ==================== ABRIR CARRITO ==================== */

function openCart(){

  $("cart")
    .classList
    .add("open");


  $("cartOverlay")
    .classList
    .add("open");

}


/* ==================== CERRAR CARRITO ==================== */

function closeCart(){

  $("cart")
    .classList
    .remove("open");


  $("cartOverlay")
    .classList
    .remove("open");

}


/* ==================== WHATSAPP ==================== */

function sendWhatsApp(){

  if(!cart.length)
    return;


  const lines =
    cart.map(item => {

      const product =
        products.find(
          x => x.id === item.id
        );


      return `• ${item.qty}x ${product.name} — ${money(
        product.price * item.qty
      )}`;

    });


  const message =
    `Hola, quiero realizar un pedido en FULL BITE.%0A%0A` +

    `*Pedido:*%0A` +

    `${lines.join("%0A")}%0A%0A` +

    `*Total: ${money(cartTotal())}*%0A%0A` +

    `¿Me confirman el pedido?`;


  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    "_blank"
  );

}


/* ==================== FILTROS ==================== */

document
  .querySelectorAll(".filter")
  .forEach(btn => {

    btn.addEventListener(
      "click",
      () => {


        document
          .querySelectorAll(".filter")
          .forEach(
            x =>
              x.classList
                .remove("active")
          );


        btn.classList.add("active");


        selectedCategory =
          btn.dataset.category;


        renderProducts();

      }
    );

  });


/* ==================== CARRITO ==================== */

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


      $("menu")
        .scrollIntoView({
          behavior:"smooth"
        });

    }
  );


$("sendWhatsApp")
  .addEventListener(
    "click",
    sendWhatsApp
  );


/* ==================== BOTÓN PEDIR AHORA ==================== */

$("heroOrder")
  .addEventListener(
    "click",
    () => {

      $("menu")
        .scrollIntoView({
          behavior:"smooth"
        });

    }
  );


/* ==================== MENÚ MÓVIL ==================== */

$("menuToggle")
  .addEventListener(
    "click",
    () => {

      $("nav")
        .classList
        .toggle("open");

    }
  );


document
  .querySelectorAll(".nav a")
  .forEach(a => {

    a.addEventListener(
      "click",
      () => {

        $("nav")
          .classList
          .remove("open");

      }
    );

  });


/* ==================== INICIAR ==================== */

renderProducts();

renderCart();
