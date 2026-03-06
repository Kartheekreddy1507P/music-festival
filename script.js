// Custom HashMap implementation
class HashMap {
  constructor() {
    this.map = {};
  }
  put(key, value) {
    this.map[key] = value;
  }
  get(key) {
    return this.map[key];
  }
  remove(key) {
    delete this.map[key];
  }
  containsKey(key) {
    return key in this.map;
  }
  size() {
    return Object.keys(this.map).length;
  }
  keys() {
    return Object.keys(this.map);
  }
  values() {
    return Object.values(this.map);
  }
  clear() {
    this.map = {};
  }
}

// MinHeap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }
  bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;
      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// Graph implementation
class Graph {
  constructor() {
    this.adjList = new HashMap();
  }
  addVertex(vertex) {
    if (!this.adjList.containsKey(vertex)) {
      this.adjList.put(vertex, []);
    }
  }
  addEdge(vertex1, vertex2) {
    if (!this.adjList.containsKey(vertex1)) this.addVertex(vertex1);
    if (!this.adjList.containsKey(vertex2)) this.addVertex(vertex2);
    this.adjList.get(vertex1).push(vertex2);
    this.adjList.get(vertex2).push(vertex1);
  }
  getNeighbors(vertex) {
    return this.adjList.get(vertex) || [];
  }
  bfs(startVertex) {
    const visited = new Set();
    const queue = [startVertex];
    visited.add(startVertex);
    const result = [];
    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);
      for (const neighbor of this.getNeighbors(vertex)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  }
}

// Trie implementation
class TrieNode {
  constructor() {
    this.children = new HashMap();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.containsKey(char)) {
        node.children.put(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.containsKey(char)) return false;
      node = node.children.get(char);
    }
    return node.isEndOfWord;
  }
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.containsKey(char)) return false;
      node = node.children.get(char);
    }
    return true;
  }
}

// Heap Sort implementation
function heapSort(arr) {
  const heap = new MinHeap();
  for (const num of arr) {
    heap.insert(num);
  }
  const sorted = [];
  while (heap.size() > 0) {
    sorted.push(heap.extractMin());
  }
  return sorted;
}

// Binary Search implementation
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Data structures
const artists = [
  {id:1,name:"Lana Del Rey",genre:"Pop",stage:"Main Stage",time:"8:00 PM",img:"🎤",headliner:false},
  {id:2,name:"The Weeknd",genre:"R&B",stage:"Main Stage",time:"9:30 PM",img:"🎵",headliner:false},
  {id:3,name:"Bad Bunny",genre:"Latin",stage:"Main Stage",time:"11:00 PM",img:"🐰",headliner:false},
  {id:4,name:"Harry Styles",genre:"Pop",stage:"Main Stage",time:"12:30 AM",img:"💇‍♂️",headliner:false},
  {id:5,name:"Taylor Swift",genre:"Pop",stage:"Main Stage",time:"2:00 AM",img:"🐍",headliner:true},
  {id:6,name:"Doja Cat",genre:"Hip-Hop",stage:"Gobi",time:"7:00 PM",img:"🐱",headliner:false},
  {id:7,name:"Megan Thee Stallion",genre:"Hip-Hop",stage:"Gobi",time:"8:30 PM",img:"🐴",headliner:false},
  {id:8,name:"Lil Nas X",genre:"Hip-Hop",stage:"Gobi",time:"10:00 PM",img:"🐎",headliner:false},
  {id:9,name:"Kanye West",genre:"Hip-Hop",stage:"Gobi",time:"11:30 PM",img:"👑",headliner:false},
  {id:10,name:"Travis Scott",genre:"Hip-Hop",stage:"Gobi",time:"1:00 AM",img:"🦄",headliner:false},
  {id:11,name:"Ariana Grande",genre:"Pop",stage:"Sahara",time:"6:00 PM",img:"👸",headliner:false},
  {id:12,name:"Billie Eilish",genre:"Alternative",stage:"Sahara",time:"7:30 PM",img:"👻",headliner:false},
  {id:13,name:"Olivia Rodrigo",genre:"Pop",stage:"Sahara",time:"9:00 PM",img:"🎸",headliner:false},
  {id:14,name:"Dua Lipa",genre:"Pop",stage:"Sahara",time:"10:30 PM",img:"💃",headliner:false},
  {id:15,name:"Lizzo",genre:"R&B",stage:"Sahara",time:"12:00 AM",img:"🦋",headliner:false},
  {id:16,name:"Post Malone",genre:"Hip-Hop",stage:"Mojave",time:"5:00 PM",img:"🍺",headliner:false},
  {id:17,name:"Machine Gun Kelly",genre:"Rock",stage:"Mojave",time:"6:30 PM",img:"🔫",headliner:false},
  {id:18,name:"Twenty One Pilots",genre:"Alternative",stage:"Mojave",time:"8:00 PM",img:"🎭",headliner:false},
  {id:19,name:"The 1975",genre:"Alternative",stage:"Mojave",time:"9:30 PM",img:"📻",headliner:false},
  {id:20,name:"Foo Fighters",genre:"Rock",stage:"Mojave",time:"11:00 PM",img:"🎸",headliner:false},
  {id:21,name:"Marshmello",genre:"EDM",stage:"Yuma",time:"4:00 PM",img:"🤖",headliner:false},
  {id:22,name:"Calvin Harris",genre:"EDM",stage:"Yuma",time:"5:30 PM",img:"🎧",headliner:false},
  {id:23,name:"David Guetta",genre:"EDM",stage:"Yuma",time:"7:00 PM",img:"🎶",headliner:false},
  {id:24,name:"Avicii Tribute",genre:"EDM",stage:"Yuma",time:"8:30 PM",img:"🌟",headliner:false},
  {id:25,name:"Diplo",genre:"EDM",stage:"Yuma",time:"10:00 PM",img:"🎤",headliner:false},
  {id:26,name:"Tame Impala",genre:"Psychedelic",stage:"Sonora",time:"3:00 PM",img:"🌈",headliner:false},
  {id:27,name:"Glass Animals",genre:"Indie",stage:"Sonora",time:"4:30 PM",img:"🦎",headliner:false},
  {id:28,name:"King Gizzard",genre:"Psychedelic",stage:"Sonora",time:"6:00 PM",img:"🦎",headliner:false},
  {id:29,name:"Vampire Weekend",genre:"Indie",stage:"Sonora",time:"7:30 PM",img:"🧛‍♂️",headliner:false},
  {id:30,name:"Phoenix",genre:"Indie",stage:"Sonora",time:"9:00 PM",img:"🐦",headliner:false}
];

const tickets = [
  {id:1,name:"General Admission",tier:"general",price:399,perks:["3-Day Pass","Access to all stages","Camping included"]},
  {id:2,name:"VIP Experience",tier:"vip",price:899,perks:["3-Day Pass","VIP Lounge","Meet & Greet","Priority Entry","Exclusive Merch"]},
  {id:3,name:"Premium Plus",tier:"premium",price:1299,perks:["3-Day Pass","VIP Lounge","Backstage Access","Artist Meet & Greet","Helicopter Transfer","Personal Chef"]}
];

const foodItems = [
  {id:1,name:"Vegan Buddha Bowl",desc:"Quinoa, roasted veggies, tahini dressing",price:16,emoji:"🥗",exclusive:false,rating:4.8},
  {id:2,name:"Coachella Burger",desc:"Plant-based patty, avocado, sprouts",price:18,emoji:"🍔",exclusive:true,rating:4.6},
  {id:3,name:"Rainbow Salad",desc:"Mixed greens, edible flowers, citrus vinaigrette",price:14,emoji:"🥬",exclusive:false,rating:4.7},
  {id:4,name:"Acai Bowl",desc:"Acai, banana, granola, coconut",price:12,emoji:"🥣",exclusive:false,rating:4.9},
  {id:5,name:"Falafel Wrap",desc:"Chickpea falafel, hummus, veggies",price:15,emoji:"🌯",exclusive:false,rating:4.5},
  {id:6,name:"Mango Sticky Rice",desc:"Sweet mango, coconut rice, sesame",price:10,emoji:"🍚",exclusive:false,rating:4.8},
  {id:7,name:"Kimchi Fried Rice",desc:"Spicy kimchi, tofu, veggies",price:16,emoji:"🍚",exclusive:false,rating:4.4},
  {id:8,name:"Turmeric Latte",desc:"Golden milk, cinnamon, ginger",price:8,emoji:"☕",exclusive:false,rating:4.6},
  {id:9,name:"Matcha Smoothie",desc:"Green tea, banana, almond milk",price:11,emoji:"🥤",exclusive:false,rating:4.7},
  {id:10,name:"Coachella Pizza",desc:"Margherita with heirloom tomatoes",price:20,emoji:"🍕",exclusive:true,rating:4.5}
];

const merchItems = [
  {id:1,name:"Festival T-Shirt",artist:"",price:35,emoji:"👕",badge:"",exclusive:false},
  {id:2,name:"Hoodie",artist:"",price:65,emoji:"🧥",badge:"",exclusive:false},
  {id:3,name:"Baseball Cap",artist:"",price:28,emoji:"🧢",badge:"",exclusive:false},
  {id:4,name:"Water Bottle",artist:"",price:22,emoji:"🥤",badge:"",exclusive:false},
  {id:5,name:"Backpack",artist:"",price:55,emoji:"🎒",badge:"",exclusive:false},
  {id:6,name:"Taylor Swift Tee",artist:"Taylor Swift",price:45,emoji:"👕",badge:"headliner",exclusive:false},
  {id:7,name:"Lana Del Rey Hoodie",artist:"Lana Del Rey",price:75,emoji:"🧥",badge:"collab",exclusive:false},
  {id:8,name:"Coachella Exclusive Beanie",artist:"",price:32,emoji:"🧢",badge:"exclusive",exclusive:true},
  {id:9,name:"VIP Lanyard",artist:"",price:15,emoji:"🎫",badge:"",exclusive:false},
  {id:10,name:"Glow Sticks Pack",artist:"",price:12,emoji:"✨",badge:"",exclusive:false}
];

// State management
let cart = [];
let favorites = [];
let currentUser = null;
let currentTheme = 'dark';
let currentFilter = 'all';
let currentTab = 'overview';

// DOM elements
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const themeToggle = document.querySelector('.theme-toggle');
const cartBtn = document.querySelector('.cart-btn');
const cartBadge = document.querySelector('.cart-badge');
const cartModal = document.querySelector('.cart-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const loginModal = document.querySelector('.login-modal');
const successModal = document.querySelector('.success-modal');
const loginTabs = document.querySelectorAll('.login-tab');
const adminTabs = document.querySelectorAll('.admin-tab');
const filterTabs = document.querySelectorAll('.filter-tab');
const closeBtns = document.querySelectorAll('.close-btn');

// Custom cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'scale(1)';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', currentTheme);
});

// Load theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
currentTheme = savedTheme;
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Countdown timer
function updateCountdown() {
  const targetDate = new Date('2026-04-11T00:00:00').getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.querySelector('.countdown-num[data-unit="days"]').textContent = days.toString().padStart(2, '0');
    document.querySelector('.countdown-num[data-unit="hours"]').textContent = hours.toString().padStart(2, '0');
    document.querySelector('.countdown-num[data-unit="minutes"]').textContent = minutes.toString().padStart(2, '0');
    document.querySelector('.countdown-num[data-unit="seconds"]').textContent = seconds.toString().padStart(2, '0');
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Render lineup
function renderLineup() {
  const lineupContainer = document.querySelector('.lineup-section .container');
  const stages = ['Main Stage', 'Gobi', 'Sahara', 'Mojave', 'Yuma', 'Sonora'];

  lineupContainer.innerHTML = '';

  stages.forEach(stage => {
    const stageArtists = artists.filter(artist => artist.stage === stage);
    const headliners = stageArtists.filter(artist => artist.headliner);
    const others = stageArtists.filter(artist => !artist.headliner);

    const stageBlock = document.createElement('div');
    stageBlock.className = 'stage-block';

    stageBlock.innerHTML = `
      <h3 class="stage-name ${headliners.length > 0 ? 'headliner-stage' : ''}">${stage}</h3>
      ${headliners.length > 0 ? `
        <div class="stage-headliner-grid">
          ${headliners.map(artist => createArtistCard(artist)).join('')}
        </div>
      ` : ''}
      <div class="artists-grid">
        ${others.map(artist => createArtistCard(artist)).join('')}
      </div>
    `;

    lineupContainer.appendChild(stageBlock);
  });
}

function createArtistCard(artist) {
  const isFavorited = favorites.includes(artist.id);
  return `
    <div class="artist-card ${artist.headliner ? 'headliner' : ''} ${isFavorited ? 'favorited' : ''}" data-id="${artist.id}">
      ${artist.headliner ? '<div class="headliner-badge">HEADLINER</div>' : ''}
      <div class="fav-btn ${isFavorited ? 'active' : ''}" onclick="toggleFavorite(${artist.id}, event)">♥</div>
      <div class="artist-img">${artist.img}</div>
      <div class="artist-info">
        <div class="artist-name">${artist.name}</div>
        <div class="artist-genre">${artist.genre}</div>
        <div class="artist-time">${artist.time}</div>
      </div>
    </div>
  `;
}

// Toggle favorite
function toggleFavorite(artistId, event) {
  event.stopPropagation();
  if (favorites.includes(artistId)) {
    favorites = favorites.filter(id => id !== artistId);
  } else {
    favorites.push(artistId);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderLineup();
  renderFavoritesBar();
  showToast(favorites.includes(artistId) ? 'Added to favorites' : 'Removed from favorites');
}

// Render favorites bar
function renderFavoritesBar() {
  const favBar = document.querySelector('.favorites-bar');
  if (favorites.length === 0) {
    favBar.classList.remove('has-items');
    return;
  }

  favBar.classList.add('has-items');
  const favChips = document.querySelector('.fav-chips');
  favChips.innerHTML = favorites.map(id => {
    const artist = artists.find(a => a.id === id);
    return `
      <div class="fav-chip">
        ${artist.name}
        <button class="chip-remove" onclick="toggleFavorite(${id}, event)">×</button>
      </div>
    `;
  }).join('');
}

// Render tickets
function renderTickets() {
  const ticketsGrid = document.querySelector('.tickets-grid');
  ticketsGrid.innerHTML = tickets.map(ticket => `
    <div class="ticket-card ${ticket.tier}">
      <div class="ticket-tier">${ticket.tier.toUpperCase()}</div>
      <div class="ticket-name">${ticket.name}</div>
      <div class="ticket-price">$${ticket.price}</div>
      <ul class="ticket-perks">
        ${ticket.perks.map(perk => `<li>${perk}</li>`).join('')}
      </ul>
      <div class="qty-control">
        <button class="qty-btn" onclick="updateQty(${ticket.id}, -1)">-</button>
        <div class="qty-display" data-id="${ticket.id}">0</div>
        <button class="qty-btn" onclick="updateQty(${ticket.id}, 1)">+</button>
      </div>
      <button class="btn btn-primary" onclick="addToCart(${ticket.id}, 'ticket')">Add to Cart</button>
    </div>
  `).join('');
}

// Update quantity
function updateQty(itemId, delta) {
  const qtyDisplay = document.querySelector(`.qty-display[data-id="${itemId}"]`);
  let qty = parseInt(qtyDisplay.textContent) + delta;
  qty = Math.max(0, qty);
  qtyDisplay.textContent = qty;
}

// Add to cart
function addToCart(itemId, type) {
  let item;
  if (type === 'ticket') {
    item = tickets.find(t => t.id === itemId);
  } else if (type === 'food') {
    item = foodItems.find(f => f.id === itemId);
  } else if (type === 'merch') {
    item = merchItems.find(m => m.id === itemId);
  }

  if (!item) return;

  const qty = parseInt(document.querySelector(`.qty-display[data-id="${itemId}"]`).textContent);
  if (qty === 0) return;

  const existingItem = cart.find(cartItem => cartItem.id === itemId && cartItem.type === type);
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({...item, qty, type});
  }

  updateCartBadge();
  updateQty(itemId, -qty);
  showToast(`${qty} ${item.name} added to cart`);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartBadge.textContent = totalItems;
  cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Render cart
function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');

  if (cart.length === 0) {
    cartItems.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text2);">Your cart is empty</div>';
    cartTotal.innerHTML = '';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji || '🎫'}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price} × ${item.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${index})">×</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  cartTotal.innerHTML = `
    <div class="cart-total-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="cart-total-row">
      <span>Tax</span>
      <span>$${tax.toFixed(2)}</span>
    </div>
    <div class="cart-total-final">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
}

// Remove from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout
function checkout() {
  if (cart.length === 0) return;

  // Simulate checkout process
  showSuccessModal();
  cart = [];
  updateCartBadge();
  renderCart();
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Render food
function renderFood() {
  const foodGrid = document.querySelector('.food-grid');
  foodGrid.innerHTML = foodItems.map(item => `
    <div class="food-card ${item.exclusive ? 'exclusive' : ''}">
      <div class="food-img">${item.emoji}</div>
      <div class="food-info">
        <div class="food-name">${item.name}</div>
        <div class="food-desc">${item.desc}</div>
        <div class="food-price">$${item.price}</div>
        <div class="food-footer">
          <div class="star-rating">
            ${Array.from({length: 5}, (_, i) => `<span class="star ${i < Math.floor(item.rating) ? 'active' : ''}" onclick="rateFood(${item.id}, ${i + 1})">★</span>`).join('')}
          </div>
          <button class="fav-food-btn ${favorites.includes(item.id) ? 'active' : ''}" onclick="toggleFavorite(${item.id}, event)">♥</button>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${item.id}, 'food')">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Rate food
function rateFood(foodId, rating) {
  const item = foodItems.find(f => f.id === foodId);
  if (item) {
    item.rating = rating;
    renderFood();
  }
}

// Render merch
function renderMerch() {
  const merchGrid = document.querySelector('.merch-grid');
  merchGrid.innerHTML = merchItems.map(item => `
    <div class="merch-card ${item.badge ? item.badge : ''}">
      ${item.badge ? `<div class="merch-badge ${item.badge}-badge">${item.badge.toUpperCase()}</div>` : ''}
      <div class="merch-img">${item.emoji}</div>
      <div class="merch-info">
        <div class="merch-name">${item.name}</div>
        ${item.artist ? `<div class="merch-artist">${item.artist}</div>` : ''}
        <div class="merch-price">$${item.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart(${item.id}, 'merch')">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Admin panel
function renderAdminPanel() {
  const adminContent = document.querySelectorAll('.admin-content');
  adminContent.forEach(content => content.classList.remove('active'));

  if (currentTab === 'overview') {
    document.querySelector('.admin-content.overview').classList.add('active');
    renderAdminStats();
  } else if (currentTab === 'analytics') {
    document.querySelector('.admin-content.analytics').classList.add('active');
    renderAnalytics();
  } else if (currentTab === 'users') {
    document.querySelector('.admin-content.users').classList.add('active');
    renderUserTable();
  }
}

function renderAdminStats() {
  const stats = [
    {label: 'Total Sales', value: '$2.4M'},
    {label: 'Tickets Sold', value: '45,231'},
    {label: 'Active Users', value: '12,456'},
    {label: 'Avg Order Value', value: '$89.50'}
  ];

  const statsGrid = document.querySelector('.admin-stats');
  statsGrid.innerHTML = stats.map(stat => `
    <div class="stat-card">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

function renderAnalytics() {
  const analyticsData = [
    {stage: 'Main Stage', attendance: '95%', revenue: '$1.2M'},
    {stage: 'Gobi', attendance: '87%', revenue: '$850K'},
    {stage: 'Sahara', attendance: '82%', revenue: '$720K'},
    {stage: 'Mojave', attendance: '78%', revenue: '$650K'},
    {stage: 'Yuma', attendance: '91%', revenue: '$780K'},
    {stage: 'Sonora', attendance: '85%', revenue: '$700K'}
  ];

  const analyticsTable = document.querySelector('.analytics-table');
  analyticsTable.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Stage</th>
          <th>Attendance</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>
        ${analyticsData.map(data => `
          <tr>
            <td>${data.stage}</td>
            <td>${data.attendance}</td>
            <td>${data.revenue}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderUserTable() {
  const users = [
    {id: 1, name: 'John Doe', email: 'john@example.com', tickets: 3, spent: '$299'},
    {id: 2, name: 'Jane Smith', email: 'jane@example.com', tickets: 2, spent: '$199'},
    {id: 3, name: 'Bob Johnson', email: 'bob@example.com', tickets: 1, spent: '$399'},
    {id: 4, name: 'Alice Brown', email: 'alice@example.com', tickets: 4, spent: '$499'},
    {id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', tickets: 2, spent: '$249'}
  ];

  const userTable = document.querySelector('.user-table');
  userTable.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Tickets</th>
          <th>Spent</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.tickets}</td>
            <td>${user.spent}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Fireworks animation
function createFirework(x, y) {
  const canvas = document.getElementById('fireworks-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 60,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.1;
      particle.life--;

      if (particle.life <= 0) {
        particles.splice(index, 1);
        return;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// Show toast
function showToast(message) {
  const toast = document.querySelector('.toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Show success modal
function showSuccessModal() {
  successModal.classList.add('open');
  setTimeout(() => successModal.classList.remove('open'), 3000);
}

// Modal controls
cartBtn.addEventListener('click', () => {
  renderCart();
  modalOverlay.classList.add('open');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('open');
  }
});

closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    loginModal.classList.remove('open');
    successModal.classList.remove('open');
  });
});

// Login tabs
loginTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    loginTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Admin tabs
adminTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    adminTabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    currentTab = e.target.dataset.tab;
    renderAdminPanel();
  });
});

// Filter tabs
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    // Apply filter logic here
  });
});

// Load data from localStorage
function loadData() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartBadge();
  }

  const savedFavorites = localStorage.getItem('favorites');
  if (savedFavorites) {
    favorites = JSON.parse(savedFavorites);
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderLineup();
  renderTickets();
  renderFood();
  renderMerch();
  renderFavoritesBar();
  renderAdminPanel();

  // Add click handlers for artist cards
  document.addEventListener('click', (e) => {
    if (e.target.closest('.artist-card')) {
      const card = e.target.closest('.artist-card');
      const artistId = parseInt(card.dataset.id);
      const artist = artists.find(a => a.id === artistId);
      if (artist) {
        createFirework(e.clientX, e.clientY);
      }
    }
  });

  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Window resize
window.addEventListener('resize', () => {
  const canvas = document.getElementById('fireworks-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});