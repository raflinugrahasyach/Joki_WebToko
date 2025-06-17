import { renderHeader } from './components/Header.js';
import { renderMobileNav } from './components/MobileNav.js';
import { HomePage } from './pages/HomePage.js';
import { ProductsPage } from './pages/ProductsPage.js';
import { ProductDetailPage } from './pages/ProductDetailPage.js';
import { CartPage } from './pages/CartPage.js';
import { AdminPage } from './pages/AdminPage.js';

const routes = {
    '/': HomePage,
    '/products': ProductsPage,
    '/product': ProductDetailPage,
    '/cart': CartPage,
    '/admin': AdminPage,
};

const router = async () => {
    const root = document.getElementById('root');
    
    renderHeader();
    renderMobileNav();

    let request = window.location.hash.slice(1) || '/';
    const urlParts = request.split('/');
    const resource = `/${urlParts[1] || ''}`;
    const id = urlParts[2];
    
    const page = routes[resource] || HomePage;
    
    root.innerHTML = `<div class="text-center p-8"><p class="text-gray-600">Memuat konten...</p></div>`;
    
    try {
        root.innerHTML = await page.render(id);
        if (page.afterRender) {
            await page.afterRender(id);
        }
    } catch (error) {
        console.error("Gagal merender halaman:", error);
        root.innerHTML = `<p class="text-red-500 text-center p-8">Terjadi kesalahan saat memuat halaman ini. Pastikan server backend berjalan.</p>`;
    }
};

window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);
