// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Sample product data
const products = [
  {
    id: 1,
    title: 'Echo Dot (4th Gen)',
    price: 49.99,
    rating: 4.5,
    image: 'https://m.media-amazon.com/images/I/714Rq4k05UL._AC_UL320_.jpg',
    description: 'Smart speaker with Alexa, Charcoal',
  },
  {
    id: 2,
    title: 'Fire TV Stick 4K',
    price: 39.99,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/51CgKGfMelL._AC_UL320_.jpg',
    description: 'Streaming device with Alexa Voice Remote',
  },
  {
    id: 3,
    title: 'Apple AirPods Pro',
    price: 199.99,
    rating: 4.8,
    image: 'https://m.media-amazon.com/images/I/71bhWgQK-cL._AC_UL320_.jpg',
    description: 'Active Noise Cancellation, Customizable Fit',
  },
  {
    id: 4,
    title: 'Samsung Galaxy S23',
    price: 799.99,
    rating: 4.6,
    image: 'https://m.media-amazon.com/images/I/71qZyM4bKJL._AC_UL320_.jpg',
    description: '128GB, Phantom Black, Unlocked',
  },
  {
    id: 5,
    title: 'Sony WH-1000XM5',
    price: 348.00,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_UL320_.jpg',
    description: 'Industry Leading Noise Canceling Headphones',
  },
  {
    id: 6,
    title: 'Kindle Paperwhite',
    price: 129.99,
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/61n5-6pQ3aL._AC_UL320_.jpg',
    description: '8 GB, 6.8" Display, Adjustable Warm Light',
  },
];

let cart = [];

// Render products
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  updateCartCount();
});

function renderProducts(productList) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-title">${product.title}</div>
      <div class="product-price">$${product.price.toFixed(2)}</div>
      <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}<span style="color:#ccc;">${'★'.repeat(5-Math.floor(product.rating))}</span> (${product.rating})</div>
      <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('add-cart-btn')) {
        showProductModal(product);
      }
    });
    card.querySelector('.add-cart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });
    grid.appendChild(card);
  });
}

// Search functionality
document.querySelector('.header-search').addEventListener('submit', function(e) {
  e.preventDefault();
  const term = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!term) {
    renderProducts(products);
    return;
  }
  const filtered = products.filter(p => p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term));
  renderProducts(filtered);
});

// Product modal
function showProductModal(product) {
  const modal = document.getElementById('productModal');
  const details = document.getElementById('modalDetails');
  details.innerHTML = `
    <img src="${product.image}" alt="${product.title}">
    <h2>${product.title}</h2>
    <div class="product-price">$${product.price.toFixed(2)}</div>
    <div class="product-rating">${'★'.repeat(Math.floor(product.rating))}<span style="color:#ccc;">${'★'.repeat(5-Math.floor(product.rating))}</span> (${product.rating})</div>
    <p>${product.description}</p>
    <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
  `;
  modal.style.display = 'flex';
  details.querySelector('.add-cart-btn').onclick = () => {
    addToCart(product.id);
    modal.style.display = 'none';
  };
}
document.getElementById('closeModal').onclick = () => {
  document.getElementById('productModal').style.display = 'none';
};
window.onclick = (e) => {
  if (e.target === document.getElementById('productModal')) {
    document.getElementById('productModal').style.display = 'none';
  }
  if (e.target === document.getElementById('cartModal')) {
    document.getElementById('cartModal').style.display = 'none';
  }
};

// Cart logic
document.querySelector('.header-cart').onclick = () => {
  showCart();
};
document.getElementById('closeCart').onclick = () => {
  document.getElementById('cartModal').style.display = 'none';
};

function addToCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function showCart() {
  const modal = document.getElementById('cartModal');
  const itemsDiv = document.getElementById('cartItems');
  const totalDiv = document.getElementById('cartTotal');
  itemsDiv.innerHTML = '';
  if (cart.length === 0) {
    itemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    totalDiv.textContent = '';
  } else {
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <span class="cart-item-title">${item.title}</span>
        <span class="cart-item-qty">x${item.qty}</span>
        <button class="cart-item-remove" title="Remove">&times;</button>
      `;
      div.querySelector('.cart-item-remove').onclick = () => {
        removeFromCart(item.id);
      };
      itemsDiv.appendChild(div);
    });
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  }
  modal.style.display = 'flex';
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartCount();
  showCart();
}

// Add CSS for modal
const style = document.createElement('style');
