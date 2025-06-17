import { getProducts, getProductById } from '../apiService.js';
import { ProductCard } from '../components/ProductCard.js';
import { addToCart } from '../services/cartService.js';

export const ProductsPage = {
    render: async () => `
        <main class="container mx-auto p-4">
            <h1 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Semua Produk</h1>
            <div id="product-list-all" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <p class="col-span-full text-gray-500">Memuat produk...</p>
            </div>
        </main>
    `,
    afterRender: async () => {
        const productListElement = document.getElementById('product-list-all');
        try {
            const products = await getProducts();
            productListElement.innerHTML = products.length ? products.map(ProductCard.render).join('') : '<p>Tidak ada produk yang tersedia.</p>';
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
