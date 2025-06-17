import state from '../state.js';
import { renderProductCard } from '../components/ProductCard.js';

// Variabel untuk menyimpan timeout pencarian, mencegah request berlebihan
let searchTimeout;

/**
 * Fungsi ini menangani logika pencarian produk.
 * Fungsi ini akan dipanggil oleh event listener global di app.js.
 * @param {string} query - Kata kunci pencarian dari input user.
 */
export const handleSearch = (query) => {
    const mainProductsView = document.getElementById('main-products-view');
    const searchResultsContainer = document.getElementById('search-results');
    
    // Pastikan elemen ada di DOM sebelum dimanipulasi untuk menghindari error
    if (!mainProductsView || !searchResultsContainer) return;

    // Hentikan timeout sebelumnya jika user masih mengetik
    clearTimeout(searchTimeout);

    // Set timeout baru untuk memberi jeda sebelum pencarian dieksekusi
    searchTimeout = setTimeout(() => {
        query = query.toLowerCase().trim();

        // Jika query kosong, tampilkan kembali produk utama dan sembunyikan hasil pencarian
        if (!query) {
            searchResultsContainer.classList.add('hidden');
            mainProductsView.classList.remove('hidden');
            return;
        }

        // Filter produk berdasarkan nama atau kategori yang cocok dengan query
        const results = state.products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
        
        // Sembunyikan tampilan produk utama dan tampilkan kontainer hasil pencarian
        mainProductsView.classList.add('hidden');
        searchResultsContainer.classList.remove('hidden');
        
        // Render hasil pencarian ke dalam kontainer
        searchResultsContainer.innerHTML = `
            <h3 class="text-2xl font-bold mb-4">Hasil untuk "${query}"</h3>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                ${results.length > 0 ? results.map(p => renderProductCard(p)).join('') : `<p class="col-span-full text-center py-8 text-gray-500">Oops, produk tidak ditemukan.</p>`}
            </div>
        `;
        // Inisialisasi kembali ikon Lucide untuk hasil pencarian yang baru dirender
        lucide.createIcons();
    }, 300); // Jeda 300ms untuk menunggu user selesai mengetik (debounce)
};

/**
 * Fungsi utama untuk merender seluruh halaman produk.
 * @returns {string} String HTML yang berisi seluruh konten halaman.
 */
export const renderProductsPage = () => {
    // Ambil semua kategori unik dari data produk, tambahkan 'Semua' di depan
    const categories = ['Semua', ...new Set(state.products.map(p => p.category))];
    
    // Filter produk berdasarkan kategori yang sedang aktif di state global
    const filteredProducts = state.currentCategory === 'Semua' 
        ? state.products 
        : state.products.filter(p => p.category === state.currentCategory);
    
    // Set judul halaman browser sesuai kategori yang aktif
    document.title = `Produk ${state.currentCategory} - SembakoNOW`;

    // Hasilkan string HTML untuk seluruh konten halaman
    const pageContent = `
        <div class="container mx-auto p-4 min-h-screen">
            <!-- Search bar khusus untuk tampilan mobile -->
            <div class="md:hidden relative mb-4">
                 <input id="search-input-mobile" type="text" placeholder="Cari produk apa hari ini?" class="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white shadow-sm">
                 <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
            </div>

            <!-- Kontainer untuk hasil pencarian, awalnya disembunyikan -->
            <div id="search-results" class="hidden"></div>
            
            <!-- Kontainer untuk tampilan produk utama -->
            <div id="main-products-view">
                <h2 class="text-3xl font-extrabold mb-6 tracking-tight">Kategori <span class="text-emerald-500">${state.currentCategory}</span></h2>
                
                <!-- Filter Kategori -->
                <div class="flex space-x-2 overflow-x-auto pb-4 mb-6">
                    ${categories.map(cat => `
                        <a href="#products/category/${cat}" class="nav-link px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300
                            ${state.currentCategory === cat ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}">
                            ${cat}
                        </a>
                    `).join('')}
                </div>
                
                <!-- Grid untuk menampilkan produk-produk yang sudah difilter -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    ${filteredProducts.length > 0 ? filteredProducts.map(product => renderProductCard(product)).join('') : `<p class="col-span-full text-center text-gray-500">Produk tidak ditemukan.</p>`}
                </div>
            </div>
        </div>
    `;
    return pageContent;
};
