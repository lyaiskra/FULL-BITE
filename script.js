/* =========================================================
   FULL BITE
   Hazle caso al antojo
   ========================================================= */


/* ==================== VARIABLES ==================== */

:root {
  --orange: #ff3b00;
  --orange-dark: #d92f00;
  --yellow: #ffca05;
  --cream: #fff8ed;
  --white: #ffffff;
  --black: #111111;
  --gray: #6b6b6b;
  --light-gray: #eeeeee;
  --dark-gray: #242424;

  --radius: 18px;
  --shadow: 0 12px 35px rgba(0, 0, 0, 0.10);
}


/* ==================== RESET ==================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "DM Sans", sans-serif;
  background: var(--cream);
  color: var(--black);
  overflow-x: hidden;
}

button,
input,
textarea {
  font-family: inherit;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}


/* ==================== HEADER ==================== */

.topbar {
  position: sticky;
  top: 0;
  z-index: 1000;

  width: 100%;
  min-height: 82px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 6%;

  background: rgba(255, 248, 237, 0.95);
  backdrop-filter: blur(12px);

  border-bottom: 1px solid rgba(17, 17, 17, 0.08);
}


/* LOGO */

.brand {
  display: flex;
  align-items: center;

  width: 78px;
  height: 58px;
}

.brand img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


/* NAV */

.nav {
  display: flex;
  align-items: center;
  gap: 34px;
}

.nav a {
  position: relative;

  font-size: 0.9rem;
  font-weight: 700;

  transition: color 0.2s ease;
}

.nav a::after {
  content: "";

  position: absolute;
  left: 0;
  bottom: -7px;

  width: 0;
  height: 2px;

  background: var(--orange);

  transition: width 0.2s ease;
}

.nav a:hover {
  color: var(--orange);
}

.nav a:hover::after {
  width: 100%;
}


/* CART BUTTON */

.cart-button {
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  border-radius: 999px;

  padding: 11px 16px;

  background: var(--black);
  color: var(--white);

  font-weight: 700;

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cart-button:hover {
  transform: translateY(-2px);
  background: var(--orange);
}

.cart-button b {
  min-width: 22px;
  height: 22px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: var(--yellow);
  color: var(--black);

  font-size: 0.75rem;
}


/* MOBILE MENU BUTTON */

.menu-toggle {
  display: none;

  border: none;
  background: transparent;

  font-size: 1.8rem;
  color: var(--black);
}


/* ==================== GENERAL ==================== */

main {
  width: 100%;
}

.section {
  width: min(1180px, 90%);
  margin: 0 auto;

  padding: 90px 0;
}

.eyebrow {
  margin-bottom: 12px;

  color: var(--orange);

  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;

  gap: 30px;

  margin-bottom: 45px;
}

.section-heading.centered {
  display: block;
  text-align: center;
}

.section-heading h2,
.about h2,
.promo h2 {
  font-family: "Anton", sans-serif;

  font-size: clamp(2.6rem, 6vw, 4.7rem);

  line-height: 0.95;
  letter-spacing: 0.5px;
}

.section-heading h2 span,
.about h2 span,
.promo h2 span {
  color: var(--orange);
}

.section-heading.centered > p:last-child {
  max-width: 580px;
  margin: 18px auto 0;

  color: var(--gray);

  line-height: 1.7;
}

.text-link {
  color: var(--orange);

  font-size: 0.9rem;
  font-weight: 800;

  white-space: nowrap;
}

.text-link:hover {
  text-decoration: underline;
}


/* ==================== BUTTONS ==================== */

.btn {
  min-height: 48px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 12px 22px;

  border-radius: 999px;

  font-size: 0.88rem;
  font-weight: 800;

  border: 2px solid transparent;

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: var(--orange);
  color: var(--white);
}

.btn-primary:hover {
  background: var(--orange-dark);
}

.btn-outline {
  border-color: var(--black);
  background: transparent;
  color: var(--black);
}

.btn-outline:hover {
  background: var(--black);
  color: var(--white);
}

.btn-light {
  background: var(--white);
  color: var(--orange);
}

.btn-light:hover {
  background: var(--yellow);
  color: var(--black);
}


/* ==================== HERO ==================== */

.hero {
  position: relative;

  min-height: 650px;

  display: flex;
  align-items: center;

  padding: 90px 8% 100px;

  overflow: hidden;

  background:
    radial-gradient(
      circle at 85% 25%,
      rgba(255, 202, 5, 0.28),
      transparent 30%
    ),
    linear-gradient(
      135deg,
      #fff8ed 0%,
      #fff3dc 100%
    );
}

.hero-copy {
  position: relative;
  z-index: 2;

  width: min(760px, 100%);
}

.hero .eyebrow {
  font-size: 0.85rem;
}

.hero h1 {
  margin-bottom: 24px;

  font-family: "Anton", sans-serif;

  font-size: clamp(4rem, 10vw, 8.5rem);

  line-height: 0.82;

  letter-spacing: 1px;
}

.hero h1 span {
  color: var(--orange);
}

.hero-text {
  max-width: 580px;

  margin-bottom: 30px;

  color: var(--gray);

  font-size: 1.08rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 12px;

  flex-wrap: wrap;
}


/* HERO DECORATIONS */

.hero-decoration {
  position: absolute;
  pointer-events: none;
}

.hero-circle {
  right: -170px;
  bottom: -230px;

  width: 540px;
  height: 540px;

  border-radius: 50%;

  background: var(--yellow);

  opacity: 0.75;
}

.hero-star {
  color: var(--orange);

  font-size: 3rem;
  font-weight: 900;
}

.star-one {
  top: 18%;
  right: 12%;
  transform: rotate(15deg);
}

.star-two {
  right: 31%;
  bottom: 18%;

  font-size: 1.8rem;

  transform: rotate(-15deg);
}

.hero-line {
  right: 7%;
  bottom: 17%;

  width: 110px;
  height: 8px;

  border-radius: 999px;

  background: var(--orange);

  transform: rotate(-8deg);
}


/* ==================== FAVORITOS ==================== */

.favorites {
  background: var(--cream);
}

.product-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 22px;
}


/* ==================== PRODUCT CARDS ==================== */

.product-card {
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 300px;

  padding: 25px;

  background: var(--white);

  border: 1px solid rgba(17, 17, 17, 0.08);

  border-radius: var(--radius);

  box-shadow: var(--shadow);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.product-card:hover {
  transform: translateY(-6px);

  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.14);
}

.product-icon {
  width: 74px;
  height: 74px;

  display: grid;
  place-items: center;

  margin-bottom: 20px;

  border-radius: 20px;

  background: #fff1d2;

  font-size: 2.4rem;
}

.product-card h3 {
  margin-bottom: 8px;

  font-family: "Anton", sans-serif;

  font-size: 1.65rem;
  letter-spacing: 0.3px;
}

.product-card p {
  margin-bottom: 20px;

  color: var(--gray);

  font-size: 0.9rem;
  line-height: 1.5;
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: auto;
}

.product-price {
  color: var(--orange);

  font-size: 1.3rem;
  font-weight: 900;
}

.add-btn {
  width: 42px;
  height: 42px;

  display: grid;
  place-items: center;

  border: none;
  border-radius: 50%;

  background: var(--black);
  color: var(--white);

  font-size: 1.3rem;
  font-weight: 800;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.add-btn:hover {
  background: var(--orange);
  transform: scale(1.06);
}


/* ==================== PROMO ==================== */

.promo {
  position: relative;

  width: 90%;
  max-width: 1180px;

  margin: 20px auto 90px;

  min-height: 390px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 40px;

  padding: 60px;

  overflow: hidden;

  border-radius: 28px;

  background:
    linear-gradient(
      120deg,
      var(--orange),
      #ff5b1a
    );

  color: var(--white);
}

.promo::after {
  content: "";

  position: absolute;

  right: -100px;
  bottom: -160px;

  width: 400px;
  height: 400px;

  border-radius: 50%;

  background: rgba(255, 202, 5, 0.8);
}

.promo-copy {
  position: relative;
  z-index: 2;

  max-width: 650px;
}

.promo .eyebrow {
  color: var(--yellow);
}

.promo h2 span {
  color: var(--yellow);
}

.promo-copy > p:not(.eyebrow) {
  max-width: 560px;

  margin: 25px 0;

  line-height: 1.7;
  opacity: 0.94;
}

.promo-sticker {
  position: relative;
  z-index: 2;

  width: 150px;
  height: 150px;

  display: grid;
  place-items: center;

  flex-shrink: 0;

  border-radius: 50%;

  background: var(--yellow);

  color: var(--black);

  font-size: 3rem;
  font-weight: 900;

  text-align: center;

  transform: rotate(8deg);

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
}

.promo-sticker small {
  font-size: 0.75rem;
  letter-spacing: 2px;
}


/* ==================== FILTERS ==================== */

.filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  gap: 10px;

  margin: 35px 0 45px;
}

.filter {
  padding: 10px 18px;

  border: 1px solid rgba(17, 17, 17, 0.15);

  border-radius: 999px;

  background: var(--white);
  color: var(--black);

  font-size: 0.85rem;
  font-weight: 700;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.filter:hover,
.filter.active {
  border-color: var(--orange);

  background: var(--orange);
  color: var(--white);
}


/* ==================== CÓMO PEDIR ==================== */

.steps {
  background: #fff2df;
}

.steps-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
}

.step-card {
  position: relative;

  padding: 28px 22px;

  background: var(--white);

  border-radius: var(--radius);

  border: 1px solid rgba(17, 17, 17, 0.07);

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
}

.step-card > b {
  position: absolute;

  top: 18px;
  right: 20px;

  color: rgba(17, 17, 17, 0.14);

  font-family: "Anton", sans-serif;

  font-size: 2rem;
}

.step-icon {
  width: 65px;
  height: 65px;

  display: grid;
  place-items: center;

  margin-bottom: 20px;

  border-radius: 18px;

  background: #fff0d0;

  font-size: 2rem;
}

.step-card h3 {
  margin-bottom: 10px;

  font-family: "Anton", sans-serif;

  font-size: 1.5rem;
}

.step-card p {
  color: var(--gray);

  font-size: 0.9rem;
  line-height: 1.6;
}


/* ==================== NOSOTROS ==================== */

.about {
  display: grid;

  grid-template-columns: 0.8fr 1.2fr;

  align-items: center;

  gap: 80px;
}

.about-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 320px;

  border-radius: 30px;

  background:
    radial-gradient(
      circle,
      rgba(255, 202, 5, 0.75),
      transparent 65%
    );
}

.about-logo img {
  width: min(260px, 70%);

  object-fit: contain;
}

.about > div:last-child > p:not(.eyebrow) {
  max-width: 650px;

  margin: 25px 0;

  color: var(--gray);

  line-height: 1.8;
}

.info-row {
  display: flex;

  gap: 30px;

  flex-wrap: wrap;
}

.info-row > div {
  display: flex;
  align-items: flex-start;

  gap: 12px;
}

.info-row strong {
  font-size: 1.4rem;
}

.info-row span {
  font-size: 0.9rem;
  font-weight: 700;
}

.info-row small {
  color: var(--gray);
  font-weight: 500;
}


/* ==================== FOOTER ==================== */

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 25px;

  padding: 35px 6%;

  background: var(--black);

  color: var(--white);

  flex-wrap: wrap;
}

.footer-brand img {
  width: 80px;
}

footer > p {
  color: var(--yellow);

  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #dddddd;

  font-size: 0.85rem;
}

.footer-links a:hover {
  color: var(--yellow);
}

footer small {
  width: 100%;

  color: #999;

  font-size: 0.75rem;
}


/* ==================== CARRITO ==================== */

.cart-overlay {
  position: fixed;

  inset: 0;

  z-index: 1500;

  background: rgba(0, 0, 0, 0.55);

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

.cart-overlay.active {
  opacity: 1;
  visibility: visible;
}

.cart {
  position: fixed;

  top: 0;
  right: 0;

  z-index: 1600;

  width: min(430px, 94vw);
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: var(--white);

  box-shadow: -15px 0 45px rgba(0, 0, 0, 0.18);

  transform: translateX(100%);

  transition: transform 0.3s ease;
}

.cart.active {
  transform: translateX(0);
}

.cart-head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 25px;

  border-bottom: 1px solid var(--light-gray);
}

.cart-head h2 {
  font-family: "Anton", sans-serif;

  font-size: 2rem;
}

.cart-head button {
  width: 40px;
  height: 40px;

  border: none;
  border-radius: 50%;

  background: var(--light-gray);

  font-size: 1.8rem;
  line-height: 1;
}

.cart-items {
  flex: 1;

  overflow-y: auto;

  padding: 20px;
}

.cart-empty {
  display: none;

  flex: 1;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 30px;

  text-align: center;
}

.cart-empty.show {
  display: flex;
}

.cart-empty span {
  font-size: 3rem;

  margin-bottom: 15px;
}

.cart-empty h3 {
  margin-bottom: 8px;

  font-size: 1.2rem;
}

.cart-empty p {
  margin-bottom: 20px;

  color: var(--gray);
}


/* CART ITEM */

.cart-item {
  display: grid;

  grid-template-columns: 55px 1fr auto;

  gap: 12px;

  align-items: center;

  padding: 15px 0;

  border-bottom: 1px solid var(--light-gray);
}

.cart-item-icon {
  width: 55px;
  height: 55px;

  display: grid;
  place-items: center;

  border-radius: 14px;

  background: #fff1d2;

  font-size: 1.7rem;
}

.cart-item-info h4 {
  margin-bottom: 4px;

  font-size: 0.95rem;
}

.cart-item-info small {
  color: var(--gray);
}

.cart-item-controls {
  display: flex;
  align-items: center;

  gap: 7px;

  margin-top: 8px;
}

.cart-item-controls button {
  width: 26px;
  height: 26px;

  border: none;
  border-radius: 50%;

  background: var(--light-gray);

  font-weight: 800;
}

.cart-item-controls span {
  min-width: 20px;

  text-align: center;

  font-size: 0.85rem;
  font-weight: 700;
}

.cart-item-price {
  font-weight: 800;
  white-space: nowrap;
}


/* CART FOOTER */

.cart-footer {
  padding: 20px;

  border-top: 1px solid var(--light-gray);

  background: var(--cream);
}

.cart-total {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;
}

.cart-total span {
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1px;
}

.cart-total strong {
  color: var(--orange);

  font-size: 1.5rem;
}

.whatsapp-btn {
  width: 100%;

  padding: 14px 18px;

  border: none;
  border-radius: 999px;

  background: #25d366;
  color: var(--white);

  font-size: 0.85rem;
  font-weight: 800;

  transition:
    transform 0.2s ease,
    filter 0.2s ease;
}

.whatsapp-btn:hover {
  transform: translateY(-2px);
  filter: brightness(0.95);
}

.cart-footer > small {
  display: block;

  margin-top: 12px;

  color: var(--gray);

  font-size: 0.72rem;
  line-height: 1.5;

  text-align: center;
}

#orderInfo {
  margin: 12px 0;

  color: var(--orange);

  font-size: 0.85rem;
  font-weight: 800;

  text-align: center;
}


/* ==================== RESPONSIVE ==================== */

@media (max-width: 950px) {

  .nav {
    gap: 20px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about {
    grid-template-columns: 1fr;

    gap: 40px;
  }

  .about-logo {
    min-height: 260px;
  }

}


/* ==================== TABLET ==================== */

@media (max-width: 760px) {

  .topbar {
    min-height: 70px;

    padding: 10px 5%;
  }

  .brand {
    width: 70px;
    height: 50px;
  }

  .nav {
    position: absolute;

    top: 70px;
    left: 0;

    width: 100%;

    display: none;
    flex-direction: column;
    align-items: stretch;

    gap: 0;

    padding: 10px 5% 20px;

    background: var(--cream);

    border-bottom: 1px solid rgba(17, 17, 17, 0.08);
  }

  .nav.active {
    display: flex;
  }

  .nav a {
    padding: 13px 0;
  }

  .menu-toggle {
    display: block;
  }

  .cart-button {
    margin-left: auto;
    margin-right: 12px;
  }


  /* HERO */

  .hero {
    min-height: 570px;

    padding: 80px 7%;
  }

  .hero h1 {
    font-size: clamp(4rem, 16vw, 6.5rem);
  }

  .hero-text {
    font-size: 1rem;
  }

  .hero-circle {
    right: -250px;
    bottom: -220px;

    width: 500px;
    height: 500px;
  }

  .star-one {
    right: 8%;
    top: 13%;
  }

  .star-two {
    right: 30%;
    bottom: 12%;
  }

  .hero-line {
    right: 7%;
    bottom: 9%;
  }


  /* SECTIONS */

  .section {
    padding: 70px 0;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-heading .text-link {
    margin-top: -15px;
  }


  /* PROMO */

  .promo {
    flex-direction: column;
    align-items: flex-start;

    padding: 45px 35px;
  }

  .promo-sticker {
    width: 115px;
    height: 115px;

    font-size: 2.4rem;
  }

}


/* ==================== MOBILE ==================== */

@media (max-width: 560px) {

  .cart-button > span:nth-child(2) {
    display: none;
  }

  .cart-button {
    padding: 10px 12px;
  }


  .hero {
    min-height: 550px;

    padding: 70px 6%;
  }

  .hero .eyebrow {
    font-size: 0.72rem;
  }

  .hero h1 {
    margin-bottom: 20px;

    font-size: clamp(3.7rem, 18vw, 5.2rem);
  }

  .hero-text {
    max-width: 95%;

    font-size: 0.95rem;
  }

  .hero-actions {
    align-items: stretch;
    flex-direction: column;

    width: min(300px, 100%);
  }

  .hero-actions .btn {
    width: 100%;
  }

  .hero-circle {
    right: -280px;
    bottom: -250px;

    width: 500px;
    height: 500px;
  }

  .hero-star {
    font-size: 2rem;
  }

  .star-one {
    top: 10%;
    right: 9%;
  }

  .star-two {
    bottom: 11%;
    right: 18%;
  }

  .hero-line {
    display: none;
  }


  /* PRODUCTOS */

  .product-grid {
    grid-template-columns: 1fr;
  }


  /* STEPS */

  .steps-grid {
    grid-template-columns: 1fr;
  }


  /* PROMO */

  .promo {
    width: 90%;

    margin-bottom: 60px;

    padding: 40px 25px;

    border-radius: 22px;
  }

  .promo h2 {
    font-size: 3rem;
  }


  /* ABOUT */

  .about-logo {
    min-height: 220px;
  }

  .about-logo img {
    width: 190px;
  }

  .info-row {
    flex-direction: column;

    gap: 20px;
  }


  /* FOOTER */

  footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .footer-links {
    flex-direction: column;

    gap: 10px;
  }

}


/* ==================== SMALL MOBILE ==================== */

@media (max-width: 380px) {

  .hero {
    padding-left: 5%;
    padding-right: 5%;
  }

  .hero h1 {
    font-size: 3.5rem;
  }

  .section-heading h2,
  .about h2 {
    font-size: 2.8rem;
  }

}
