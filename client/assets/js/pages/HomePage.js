import { getProducts, getProductById } from '../apiService.js';
import { ProductCard } from '../components/ProductCard.js';
import { addToCart } from '../services/cartService.js';

export const HomePage = {
    render: async () => `
        <div class="container mx-auto p-4">
            <section class="hero bg-blue-600 text-white rounded-lg p-8 md:p-12 mb-8 text-center shadow-lg">
                <h1 class="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di WebToko</h1>
                <p class="text-lg md:text-xl mb-6">Temukan produk-produk terbaik dengan penawaran luar biasa.</p>
                <a href="#/products" class="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition">Belanja Sekarang</a>
            </section>
            <section>
                <h2 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Produk Unggulan</h2>
                <div id="product-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <p class="col-span-full text-gray-500">Memuat produk...</p>
                </div>
            </section>
        </div>
    `,
    afterRender: async () => {
        const productListElement = document.getElementById('product-list');
        try {
            const products = (await getProducts()).slice(0, 4);
            productListElement.innerHTML = products.length ? products.map(ProductCard.render).join('') : '<p>Tidak ada produk.</p>';
        } catch (error) {
            productListElement.innerHTML = '<p class="text-red-500">Gagal memuat produk. Pastikan server backend berjalan.</p>';
        }
        
        productListElement.addEventListener('click', async (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const id = e.target.dataset.productId;
                const product = await getProductById(id);
                addToCart(product);
            }
        });
    }
};
