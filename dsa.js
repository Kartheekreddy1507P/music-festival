// ============================================================
// DATA STRUCTURES & ALGORITHMS (DSA) IMPLEMENTATIONS
// ============================================================

// 1. HASH MAP — O(1) average case lookup, insertion, deletion
class HashMap {
  constructor(size = 64) {
    this.table = new Array(size);
    this.size = size;
  }

  hash(key) {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = (h * 31 + key.charCodeAt(i)) % this.size;
    }
    return h;
  }

  set(key, val) {
    const i = this.hash(key);
    if (!this.table[i]) this.table[i] = [];
    const ex = this.table[i].find(e => e[0] === key);
    if (ex) {
      ex[1] = val;
    } else {
      this.table[i].push([key, val]);
    }
  }

  get(key) {
    const i = this.hash(key);
    if (!this.table[i]) return null;
    const e = this.table[i].find(e => e[0] === key);
    return e ? e[1] : null;
  }
}

// 2. MIN-HEAP — Priority queue with O(log n) operations
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop() {
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return min;
  }

  _bubbleUp() {
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p] <= this.heap[i]) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let s = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.heap[l] < this.heap[s]) s = l;
      if (r < n && this.heap[r] < this.heap[s]) s = r;
      if (s === i) break;
      [this.heap[i], this.heap[s]] = [this.heap[s], this.heap[i]];
      i = s;
    }
  }

  size() {
    return this.heap.length;
  }
}

// 3. GRAPH WITH BFS — Graph traversal, stage adjacency
class Graph {
  constructor() {
    this.adj = {};
  }

  addEdge(u, v) {
    if (!this.adj[u]) this.adj[u] = [];
    if (!this.adj[v]) this.adj[v] = [];
    this.adj[u].push(v);
    this.adj[v].push(u);
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const order = [];
    visited.add(start);

    while (queue.length) {
      const n = queue.shift();
      order.push(n);
      (this.adj[n] || []).forEach(nb => {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
        }
      });
    }
    return order;
  }
}

// 4. TRIE — Autocomplete & prefix search for artist names
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let n = this.root;
    for (const c of word.toLowerCase()) {
      if (!n.children[c]) n.children[c] = new TrieNode();
      n = n.children[c];
    }
    n.isEnd = true;
  }

  search(prefix) {
    let n = this.root;
    for (const c of prefix.toLowerCase()) {
      if (!n.children[c]) return [];
      n = n.children[c];
    }
    return this._collect(n, prefix);
  }

  _collect(node, prefix) {
    const res = [];
    if (node.isEnd) res.push(prefix);
    for (const [c, child] of Object.entries(node.children)) {
      res.push(...this._collect(child, prefix + c));
    }
    return res;
  }
}

// 5. HEAP SORT — O(n log n) sorting algorithm
function heapSort(arr) {
  const n = arr.length;
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let l = 2 * i + 1;
  let r = 2 * i + 2;
  let largest = i;

  if (l < n && arr[l].count > arr[largest].count) largest = l;
  if (r < n && arr[r].count > arr[largest].count) largest = r;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// 6. BINARY SEARCH — O(log n) search on sorted array
function binarySearch(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid].price === target) {
      return mid;
    } else if (arr[mid].price < target) {
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  return -1;
}
