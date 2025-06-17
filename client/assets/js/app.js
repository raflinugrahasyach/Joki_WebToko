import state from './state.js';
import { fetchProducts } from './apiService.js';
import { renderHeader } from './components/Header.js';
import { renderMobileNav } from './components/MobileNav.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderProductsPage } from './pages/ProductsPage.js';
import { renderProductDetailPage } from './pages/ProductDetailPage.js';
import { renderCartPage } from './pages/CartPage.js';
import { renderAdminPage } from './pages/AdminPage.js';

const app = document.getElementById('app');
const headerContainer = document.getElementById('header-container');

/**
 * Fungsi ini HANYA bertanggung jawab untuk menggambar UI berdasarkan state saat ini.
 * Fungsi ini tidak lagi mengambil data.
 */
export const render = async () => {
    // Jika aplikasi masih dalam proses inisialisasi, jangan lakukan apa-apa.
    if (state.isLoading) return;

    try {
        // Selalu render komponen navigasi utama
        headerContainer.innerHTML = renderHeader();
        renderMobileNav();

        // Router utama
        const hash = window.location.hash || '#home';

        if (hash.startsWith('#product/')) {
            state.currentProductId = parseInt(hash.split('/')[1]);
            app.innerHTML = await renderProductDetailPage();
        } else if (hash.startsWith('#products/category/')) {
            state.currentCategory = decodeURIComponent(hash.split('/')[2]);
            app.innerHTML = renderProductsPage();
        } else {
            const page = hash.substring(1) || 'home';
            if (page === 'products') state.currentCategory = 'Semua';

            switch (page) {
                case 'home':
                    app.innerHTML = renderHomePage();
                    break;
                case 'products':
                    app.innerHTML = renderProductsPage();
                    break;
                case 'cart':
                    app.innerHTML = renderCartPage();
                    break;
                case 'admin':
                    app.innerHTML = await renderAdminPage();
                    break;
                default:
                    app.innerHTML = renderHomePage();
            }
        }
        
        // Perbarui ikon setelah konten baru dirender
        lucide.createIcons();

    } catch (error) {
        console.error("Terjadi error saat rendering halaman:", error);
        renderErrorScreen("Gagal memuat halaman. Coba refresh browser Anda.");
    }
};

/**
 * Fungsi untuk menampilkan pesan error yang jelas kepada pengguna.
 */
const renderErrorScreen = (message) => {
    app.innerHTML = `
        <div class="w-full h-screen flex flex-col items-center justify-center text-center p-4">
            <i data-lucide="server-crash" class="w-24 h-24 text-red-400 mb-4"></i>
            <h2 class="text-2xl font-bold text-red-600 mb-2">Oops! Terjadi Kesalahan</h2>
            <p class="text-gray-600 max-w-md">${message}</p>
            <p class="text-gray-500 mt-4 text-sm">Pastikan server backend Anda (node --watch server.js) sudah berjalan dengan benar di terminal.</p>
        </div>
    `;
    lucide.createIcons();
};

/**
 * Fungsi inisialisasi aplikasi.
 * Hanya berjalan sekali saat aplikasi pertama kali dimuat.
 */
const init = async () => {
    try {
        state.isLoading = true;
        // Tampilkan loading spinner saat data diambil
        app.innerHTML = `<div class="w-full h-screen flex items-center justify-center"><i data-lucide="loader-2" class="animate-spin h-10 w-10 text-emerald-500"></i></div>`;
        lucide.createIcons();
        
        // Ambil data produk dari server
        const productsFromServer = await fetchProducts();
        
        // Jika gagal mengambil data, lempar error untuk ditangkap oleh blok catch
        if (!productsFromServer || productsFromServer.length === 0) {
            throw new Error("Tidak dapat mengambil data produk dari server.");
        }

        // Jika berhasil, simpan data ke state dan matikan status loading
        state.products = productsFromServer;
        state.isLoading = false;

        // Setelah semua siap, pasang event listener dan render halaman pertama kali
        document.addEventListener('statechange', render);
        window.addEventListener('hashchange', render);
        
        // Panggil render() untuk pertama kali untuk menampilkan halaman sesuai URL
        render();

    } catch (error) {
        console.error("Gagal inisialisasi aplikasi:", error);
        state.isLoading = false;
        // Tampilkan pesan error jika inisialisasi gagal
        renderErrorScreen(error.message);
    }
};

// Mulai seluruh aplikasi ketika halaman sudah dimuat
document.addEventListener('DOMContentLoaded', init);
