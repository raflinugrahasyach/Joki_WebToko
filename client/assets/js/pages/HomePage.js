// ============== File: client/assets/js/pages/HomePage.js ==============
import state from '../state.js';
import { renderProductCard } from '../components/ProductCard.js';

export const renderHomePage = () => {
    const categories = [
        { name: 'Sembako', icon: 'wheat' }, { name: 'Makanan Instan', icon: 'pizza' },
        { name: 'Minuman', icon: 'cup-soda' }, { name: 'Perawatan Tubuh', icon: 'bath' },
        { name: 'Kebersihan', icon: 'sparkles' }, { name: 'Ibu & Anak', icon: 'baby' }
    ];
    const trendingProducts = [...state.products].sort((a, b) => b.sold - a.sold).slice(0, 5);
    const newProducts = [...state.products].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 5);

    document.title = 'SembakoNOW - Belanja Sat-set Sampai Depan Rumah';

    const pageContent = `
        <div class="space-y-12">
            <section class="container mx-auto px-4 pt-8 md:pt-16 text-center">
                 <h2 class="text-4xl md:text-6xl font-extrabold tracking-tighter text-gray-900">Belanja Sat-Set,</h2>
                 <h2 class="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">Sampai Depan Rumah</h2>
                 <p class="max-w-2xl mx-auto text-gray-600 mb-8">Kebutuhan harian lengkap, harga hemat, kualitas terjamin. Pesan sekarang, kami antar secepatnya!</p>
                 <div class="flex justify-center">
                    <a href="#products" class="primary-btn nav-link">
                        Mulai Belanja Sekarang <i data-lucide="arrow-right" class="w-4 h-4 ml-2"></i>
                    </a>
                 </div>
            </section>
            
            <section class="container mx-auto px-4">
                <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
                    ${categories.map(cat => `
                        <a href="#products/category/${cat.name}" class="nav-link text-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:border-emerald-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                            <div class="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <i data-lucide="${cat.icon}" class="text-emerald-600"></i>
                            </div>
                            <span class="font-semibold text-sm text-gray-700">${cat.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>

            <section>
                 <div class="container mx-auto px-4"><h3 class="text-2xl font-bold mb-4">Lagi Rame Dicari 🔥</h3></div>
                <div class="flex overflow-x-auto space-x-4 px-4 pb-4 scroll-smooth">
                   ${trendingProducts.map(product => renderProductCard(product, 'w-64 flex-shrink-0')).join('')}
                   <div class="flex-shrink-0 w-24 flex items-center justify-center">
                     <a href="#products" class="nav-link w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-emerald-500 hover:text-white transition-colors">
                        <i data-lucide="arrow-right"></i>
                     </a>
                   </div>
                </div>
            </section>

            <section class="container mx-auto px-4">
                <h3 class="text-2xl font-bold mb-4">Barang Baru Datang ✨</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">${newProducts.map(product => renderProductCard(product)).join('')}</div>
            </section>
            
            <footer class="bg-gray-900 text-white mt-16"><div class="container mx-auto p-8 text-center"><p>&copy; ${new Date().getFullYear()} SembakoNOW. Dibuat dengan ❤ di Indonesia.</p></div></footer>
        </div>
    `;
    return pageContent;
};


// ============== File: client/assets/js/pages/ProductsPage.js ==============
import state from '../state.js';
import { renderProductCard } from '../components/ProductCard.js';

let searchTimeout;

export const handleSearch = (query) => {
    const mainProductsView = document.getElementById('main-products-view');
    const searchResultsContainer = document.getElementById('search-results');
    
    // Pastikan elemen ada sebelum dimanipulasi
    if (!mainProductsView || !searchResultsContainer) return;

    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        query = query.toLowerCase().trim();

        if (!query) {
            searchResultsContainer.classList.add('hidden');
            mainProductsView.classList.remove('hidden');
            return;
        }

        const results = state.products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        mainProductsView.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');
        searchResultsContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4">Hasil untuk "${query}"</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                ${results.length > 0 ? results.map(p => renderProductCard(p)).join('') : `<p class="col-span-full text-center py-8 text-gray-500">Oops, produk tidak ditemukan.</p>`}
            </div>
        `;
        lucide.createIcons();
    }, 300);
};

export const renderProductsPage = () => {
    const categories = ['Semua', ...new Set(state.products.map(p => p.category))];
    const filteredProducts = state.currentCategory === 'Semua' 
        ? state.products 
        : state.products.filter(p => p.category === state.currentCategory);
    
    document.title = `Produk ${state.currentCategory} - SembakoNOW`;

    const pageContent = `
        <div class="container mx-auto p-4 min-h-screen">
            <div class="md:hidden relative mb-4">
                 <input id="search-input-mobile" type="text" placeholder="Cari produk apa hari ini?" class="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm">
                 <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
            </div>

            <div id="search-results" class="hidden"></div>
            
            <div id="main-products-view">
                <h2 class="text-3xl font-extrabold mb-6 tracking-tight">Kategori <span class="text-emerald-500">${state.currentCategory}</span></h2>
                <div class="flex space-x-2 overflow-x-auto pb-4 mb-6">
                    ${categories.map(cat => `
                        <button class="category-filter-btn px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300
                            ${state.currentCategory === cat ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}"
                            data-category="${cat}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    ${filteredProducts.length > 0 ? filteredProducts.map(product => renderProductCard(product)).join('') : `<p class="col-span-full text-center text-gray-500">Produk tidak ditemukan.</p>`}
                </div>
            </div>
        </div>
    `;
    return pageContent;
};


// ============== File: client/assets/js/pages/ProductDetailPage.js ==============
import state from '../state.js';
import { fetchProductById } from '../apiService.js';
import { formatRupiah } from '../utils/formatters.js';
import { addToCart } from '../services/cartService.js';
import { renderProductCard } from '../components/ProductCard.js';

export const renderProductDetailPage = async () => {
    const product = await fetchProductById(state.currentProductId);

    if (!product) {
        return `<div class="text-center p-8">Produk tidak ditemukan atau gagal dimuat.</div>`;
    }

    document.title = `${product.name} - SembakoNOW`;
    const relatedProducts = state.products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 5);

    const pageContent = `
        <div class="container mx-auto p-4">
            <a href="#products" class="nav-link inline-flex items-center gap-2 text-emerald-600 hover:underline mb-4">
                <i data-lucide="arrow-left"></i>
                Kembali ke Produk
            </a>
            <div class="bg-white rounded-lg shadow-lg p-4 md:p-8 grid md:grid-cols-2 gap-8">
                <div>
                    <img src="${product.image}" alt="[Gambar ${product.name}]" class="w-full rounded-lg" onerror="this.onerror=null;this.src='https://placehold.co/600x600/e2e8f0/334155?text=Error';">
                </div>
                <div>
                    <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">${product.category}</span>
                    <h2 class="text-3xl font-bold mt-4 mb-2">${product.name}</h2>
                    <p class="text-3xl font-bold text-emerald-600 mb-4">${formatRupiah(product.price)}</p>
                    <p class="text-gray-600 mb-6">${product.description}</p>
                    <div class="flex items-center gap-4 mb-6">
                        <label for="quantity" class="font-semibold">Jumlah:</label>
                        <div class="flex items-center border rounded-md">
                            <button class="quantity-change-btn p-3" data-action="decrease"><i data-lucide="minus" class="w-4 h-4"></i></button>
                            <input id="quantity-input" type="number" value="1" min="1" max="${product.stock}" class="w-12 text-center border-l border-r focus:outline-none">
                            <button class="quantity-change-btn p-3" data-action="increase"><i data-lucide="plus" class="w-4 h-4"></i></button>
                        </div>
                        <span class="text-sm text-gray-500">Stok: ${product.stock}</span>
                    </div>
                    <p class="font-semibold mb-4">Total Harga: <span id="total-price" class="text-emerald-600 text-xl">${formatRupiah(product.price)}</span></p>
                    <button id="add-to-cart-detail-btn" class="primary-btn w-full">
                        <i data-lucide="shopping-cart" class="w-5 h-5 mr-2"></i> Masukkan ke Keranjang
                    </button>
                </div>
            </div>
            <div class="mt-12">
                <h3 class="text-2xl font-bold mb-4">Produk Terkait</h3>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    ${relatedProducts.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>
    `;
    return pageContent;
};


// ============== File: client/assets/js/pages/CartPage.js ==============
import state from '../state.js';
import { formatRupiah } from '../utils/formatters.js';
import { updateCartQuantity, removeFromCart } from '../services/cartService.js';
import { submitOrder } from '../apiService.js';
import { showToast } from '../utils/toast.js';

let isSubmitting = false;

export const renderCartPage = () => {
    const cartDetails = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return { ...product, quantity: item.quantity };
    }).filter(item => item.id);

    const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.title = 'Keranjang Belanja - SembakoNOW';

    const pageContent = `
        <div class="container mx-auto p-4">
            <h2 class="text-3xl font-extrabold mb-6">Keranjang Saya</h2>
            ${cartDetails.length === 0 ? `
                <div class="text-center py-16">
                    <i data-lucide="shopping-cart" class="mx-auto w-16 h-16 text-gray-300"></i>
                    <p class="text-gray-500 mt-4">Keranjang Anda masih kosong.</p>
                    <a href="#products" class="nav-link mt-4 inline-block primary-btn">Mulai Belanja</a>
                </div>
            ` : `
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-4">
                        ${cartDetails.map(item => `
                            <div class="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
                                <img src="${item.image}" alt="[Gambar ${item.name}]" class="w-20 h-20 rounded-md object-cover">
                                <div class="flex-grow">
                                    <h3 class="font-semibold">${item.name}</h3>
                                    <p class="text-emerald-600 font-bold">${formatRupiah(item.price)}</p>
                                </div>
                                <div class="flex items-center border rounded-md">
                                    <button class="cart-quantity-btn p-2" data-id="${item.id}" data-action="decrease"><i data-lucide="minus" class="w-4 h-4"></i></button>
                                    <span class="px-3">${item.quantity}</span>
                                    <button class="cart-quantity-btn p-2" data-id="${item.id}" data-action="increase"><i data-lucide="plus" class="w-4 h-4"></i></button>
                                </div>
                                <p class="font-bold w-28 text-right">${formatRupiah(item.price * item.quantity)}</p>
                                <button class="remove-from-cart-btn text-gray-400 hover:text-red-500" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
                        <h3 class="text-xl font-bold mb-4">Ringkasan & Checkout</h3>
                        <form id="checkout-form">
                            <div class="space-y-3 mb-4">
                                 <input type="text" name="name" required placeholder="Nama Lengkap" class="w-full p-2 border rounded-md">
                                 <input type="tel" name="phone" required placeholder="No. HP" class="w-full p-2 border rounded-md">
                                 <textarea name="address" rows="3" required placeholder="Alamat Lengkap" class="w-full p-2 border rounded-md"></textarea>
                            </div>
                            <div class="flex justify-between mb-2"><span class="text-gray-600">Subtotal</span><span class="font-semibold">${formatRupiah(subtotal)}</span></div>
                            <hr class="my-4">
                            <div class="flex justify-between font-bold text-lg mb-6"><span>Total</span><span>${formatRupiah(subtotal)}</span></div>
                            <button type="submit" class="primary-btn w-full" ${isSubmitting ? 'disabled' : ''}>
                               ${isSubmitting ? '<i data-lucide="loader-2" class="animate-spin mx-auto"></i>' : 'Buat Pesanan'}
                            </button>
                        </form>
                    </div>
                </div>
            `}
        </div>
    `;
    return pageContent;
};


// ============== File: client/assets/js/pages/AdminPage.js ==============
import state from '../state.js';
import { formatRupiah } from '../utils/formatters.js';
import { addProduct, fetchHistory, fetchProducts } from '../apiService.js';
import { showToast } from '../utils/toast.js';

export const renderAdminPage = async () => {
    const history = await fetchHistory();
    const totalSales = history.soldProducts.reduce((sum, p) => sum + (p.sold * p.price), 0);
    const topProduct = history.soldProducts[0] || { name: '-', sold: 0 };
    const lowStockProducts = state.products.filter(p => p.stock < 10);
    
    document.title = 'Admin Dashboard - SembakoNOW';

    const pageContent = `
        <div class="container mx-auto p-4">
            <h2 class="text-3xl font-extrabold mb-6">Admin Dashboard</h2>
            <div class="grid md:grid-cols-3 gap-4 mb-8">
                <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Total Penjualan</h4><p class="text-2xl font-bold">${formatRupiah(totalSales)}</p></div>
                <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Barang Paling Laku</h4><p class="text-2xl font-bold">${topProduct.name}</p></div>
                <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Stok Menipis</h4><p class="text-2xl font-bold text-orange-500">${lowStockProducts.length} Produk</p></div>
            </div>
            <div class="grid lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold mb-4">Tambah Barang Baru</h3>
                    <form id="add-product-form" class="space-y-4">
                        <div><label class="font-semibold">Nama Barang</label><input type="text" name="name" required class="w-full p-2 border rounded-md mt-1"></div>
                        <div><label class="font-semibold">Kategori</label><input type="text" name="category" required class="w-full p-2 border rounded-md mt-1"></div>
                        <div class="grid grid-cols-2 gap-4">
                            <div><label class="font-semibold">Harga</label><input type="number" name="price" required class="w-full p-2 border rounded-md mt-1"></div>
                            <div><label class="font-semibold">Stok</label><input type="number" name="stock" required class="w-full p-2 border rounded-md mt-1"></div>
                        </div>
                        <button type="submit" class="primary-btn w-full">Tambah Produk</button>
                    </form>
                </div>
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold mb-4">Riwayat Barang</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold mb-2">Baru Ditambahkan</h4>
                            <ul class="h-48 overflow-y-auto border rounded-md p-2 space-y-1">${history.newProducts.map(p => `<li class="py-1 text-sm list-none"><strong>${p.name}</strong> (Stok: ${p.stock})</li>`).join('')}</ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Terlaris</h4>
                            <ul class="h-48 overflow-y-auto border rounded-md p-2 space-y-1">${history.soldProducts.map(p => `<li class="py-1 text-sm list-none"><strong>${p.name}</strong> (Terjual: ${p.sold})</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    return pageContent;
};
