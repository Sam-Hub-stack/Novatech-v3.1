/* NovaTech v3.3 script: categories (fade-in), modal, cart, theme, toasts, accessibility */

const STORAGE_KEY = 'novatech-cart-v3';
const THEME_KEY = 'novatech-theme-v3';

/* DOM references */
const body = document.body;
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartIcon = document.getElementById('cartIcon');
const floatingCart = document.getElementById('floatingCart');
const floatCount = document.getElementById('floatCount');

const cartDrawer = document.getElementById('cartDrawer');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const closeCartEl = document.getElementById('closeCart');
const clearCartBtn = document.getElementById('clearCart');

const productGrid = document.getElementById('productGrid');
const productCards = document.querySelectorAll('.product-card');
const categoryTabs = document.querySelectorAll('.cat-btn');

/* modal */
const modal = document.getElementById('productModal');
const modalBackdrop = modal.querySelector('.modal-backdrop');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalAdd = document.getElementById('modalAdd');
const modalCloseBtn = document.getElementById('modalCloseBtn');

/* toasts */
const toastContainer = document.getElementById('toastContainer');

/* state */
let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let lastFocused = null;

/* --- THEME: init + toggle (luxury fade) --- */
(function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  const dark = saved === 'dark';
  if (dark) { body.classList.add('dark'); themeIcon.className = 'fa fa-sun'; }
  else { body.classList.remove('dark'); themeIcon.className = 'fa fa-moon'; }
  // ensure cart icon visibility set at init
  updateIconContrast();
})();
themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  // animate icon subtle rotate
  themeIcon.style.transform = 'rotate(0deg)';
  requestAnimationFrame(()=> {
    themeIcon.className = isDark ? 'fa fa-sun' : 'fa fa-moon';
    themeIcon.style.transform = isDark ? 'rotate(10deg)' : 'rotate(-10deg)';
  });
  // slow down and reset transform after transition
  setTimeout(()=> { themeIcon.style.transform = ''; updateIconContrast(); }, 950);
});

/* make cart & theme icons contrast correctly */
function updateIconContrast(){
  if (body.classList.contains('dark')) {
    themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun');
    themeIcon.style.color = '#FFD54F';
    themeIcon.style.textShadow = '0 0 8px rgba(255,213,79,0.9)';
    cartIcon.style.color = getComputedStyle(document.documentElement).getPropertyValue('--teal') || '#14b8a6';
    cartIcon.style.textShadow = '0 4px 14px rgba(20,184,166,0.12)';
  } else {
    themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon');
    themeIcon.style.color = '';
    themeIcon.style.textShadow = '0 0 6px rgba(11,119,255,0.12)';
    cartIcon.style.color = '#333';
    cartIcon.style.textShadow = '';
  }
}

/* --- MOBILE MENU --- */
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menu.classList.toggle('show');
});

/* smooth scroll for in-page links */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (menu.classList.contains('show')) { menu.classList.remove('show'); menuToggle.setAttribute('aria-expanded','false'); }
  });
});

/* --- CATEGORIES (fade-in filter) --- */
function showCategory(filter) {
  const cards = productGrid.querySelectorAll('.product-card');
  cards.forEach(card => {
    const cat = card.dataset.category || 'all';
    if (filter === 'all' || filter === cat) {
      card.style.display = '';
      // trigger fade-in animation
      card.classList.remove('fade-in');
      void card.offsetWidth;
      card.classList.add('fade-in');
    } else {
      card.style.display = 'none';
    }
  });
}
categoryTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    showCategory(filter);
  });
});

/* --- CART UI --- */
function formatKsh(n){ return 'KSh ' + Number(n).toLocaleString('en-KE'); }
function getCartCount(){ return cart.reduce((s,i)=> s + i.qty, 0); }
function getCartTotal(){ return cart.reduce((s,i)=> s + i.qty * i.price, 0); }

function updateCartUI(){
  cartItemsEl.innerHTML = '';
  if (!cart.length) {
    cartItemsEl.innerHTML = `<p style="color:var(--muted);text-align:center;padding:18px">Your cart is empty.</p>`;
  } else {
    cart.forEach((it, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'cart-item';
      wrap.innerHTML = `
        <img src="${it.img}" alt="${it.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${it.title}</div>
          <div class="cart-item-meta">${formatKsh(it.price)} &times; ${it.qty}</div>
        </div>
        <div class="cart-item-controls">
          <input class="cart-qty" type="number" min="1" value="${it.qty}" data-idx="${idx}">
          <button class="btn small ghost remove-item" data-idx="${idx}">Remove</button>
        </div>
      `;
      cartItemsEl.appendChild(wrap);
    });
  }
  cartTotalEl.textContent = formatKsh(getCartTotal());
  cartCount.textContent = String(getCartCount()); cartCount.setAttribute('data-count', String(getCartCount()));
  floatCount.textContent = String(getCartCount()); floatCount.setAttribute('data-count', String(getCartCount()));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

/* Add item */
function addToCart(product, qty = 1) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty += qty;
  else cart.push({...product, qty});
  updateCartUI();
  openCart();
  showToast('success', 'Added to cart ✅');
  // subtle pulse
  floatingCart.animate([{ transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 260 });
}

/* Remove */
function removeFromCart(idx){
  const removed = cart[idx];
  cart.splice(idx,1);
  updateCartUI();
  showToast('error', `${removed.title} removed ❌`);
}

/* Update qty */
function updateQty(idx, qty){ qty = Number(qty); if (!qty || qty < 1) qty = 1; cart[idx].qty = qty; updateCartUI(); }

/* Clear */
function clearCart(){ if (!confirm('Clear entire cart?')) return; cart = []; updateCartUI(); showToast('warn','Cart cleared 🗑️'); }

/* Open/close cart (smooth, slow) */
function openCart(){ cartDrawer.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); lastFocused = document.activeElement; cartItemsEl.focus(); }
function closeCart(){ cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); if (lastFocused) lastFocused.focus(); }

cartBtn.addEventListener('click', openCart);
floatingCart.addEventListener('click', openCart);
closeCartEl.addEventListener('click', closeCart);
clearCartBtn.addEventListener('click', clearCart);

/* click outside to close cart */
document.addEventListener('click', (e) => {
  if (!cartDrawer.classList.contains('open')) return;
  const inside = cartDrawer.contains(e.target) || e.target.closest('.floating-cart') || e.target.closest('.cart-btn');
  if (!inside) closeCart();
});

/* cart delegation */
cartItemsEl.addEventListener('click', (e) => {
  const rem = e.target.closest('.remove-item');
  if (rem) { const idx = Number(rem.dataset.idx); removeFromCart(idx); }
});
cartItemsEl.addEventListener('input', (e) => {
  if (e.target.classList.contains('cart-qty')) {
    const idx = Number(e.target.dataset.idx);
    const val = Number(e.target.value);
    if (!Number.isFinite(val) || val < 1) { e.target.value = 1; return; }
    updateQty(idx, val);
  }
});

/* --- PRODUCTS (click behavior & details modal) --- */
productGrid.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.add-cart');
  const detailsBtn = e.target.closest('.details');
  const card = e.target.closest('.product-card');
  if (!card) return;
  const meta = card.querySelector('.meta');
  const product = {
    id: meta.dataset.id,
    title: meta.dataset.title,
    price: Number(meta.dataset.price),
    img: meta.dataset.img,
    desc: meta.dataset.desc
  };

  if (addBtn) { addToCart(product, 1); return; }
  if (detailsBtn) { openModal(product); return; }
  // clicking card (not button) opens modal
  if (!e.target.closest('button')) openModal(product);
});

/* modal functions */
function openModal(product){
  modalImg.src = product.img;
  modalImg.alt = product.title;
  modalTitle.textContent = product.title;
  modalDesc.textContent = product.desc || '';
  modalPrice.textContent = formatKsh(product.price);
  modal.dataset.product = JSON.stringify(product);
  lastFocused = document.activeElement;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  setTimeout(()=> modalClose.focus(), 180);
}
function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  if (lastFocused) lastFocused.focus();
}
modalBackdrop.addEventListener('click', (ev) => { if (ev.target.dataset.close === 'true') closeModal(); });
modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);

/* modal add action */
modalAdd.addEventListener('click', () => {
  const prod = JSON.parse(modal.dataset.product || '{}');
  if (prod && prod.id) addToCart(prod, 1);
  closeModal();
});

/* keyboard: Esc closes modal & cart */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('show')) closeModal();
    if (cartDrawer.classList.contains('open')) closeCart();
  }
});

/* accessibility: basic focus trap while modal open */
document.addEventListener('focus', function(e){
  if (!modal.classList.contains('show')) return;
  if (!modal.contains(e.target)) { e.stopImmediatePropagation(); modalClose.focus(); }
}, true);

/* keyboard support for product cards */
productCards.forEach(c => {
  c.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const meta = c.querySelector('.meta');
      const product = {
        id: meta.dataset.id, title: meta.dataset.title, price: Number(meta.dataset.price), img: meta.dataset.img, desc: meta.dataset.desc
      };
      openModal(product);
    }
  });
});

/* --- TOASTS (top-right) --- */
function showToast(type = 'info', message = '') {
  const el = document.createElement('div');
  el.className = `toast ${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warn' ? 'warn' : 'info'}`;
  el.innerHTML = `<span>${message}</span>`;
  toastContainer.appendChild(el);
  // auto remove after 2.2s (show 2s)
  setTimeout(()=> {
    el.style.transition = 'opacity .35s, transform .35s';
    el.style.opacity = '0'; el.style.transform = 'translateY(-8px) scale(.98)';
    setTimeout(()=> el.remove(), 380);
  }, 2000);
}

/* --- INITIAL render --- */
updateCartUI();
showCategory('all');

/* ensure icon contrast when resizing or theme toggles externally */
window.addEventListener('storage', (e) => {
  if (e.key === THEME_KEY) updateIconContrast();
});
