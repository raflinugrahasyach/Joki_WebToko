import { getProductById } from '../apiService.js';
import { formatCurrency } from '../utils/formatters.js';
import { addToCart } from '../services/cartService.js';
import { cartIcon } from '../utils/icons.js';

export const ProductDetailPage = {
    render: async (id) => {
        if (!id) return `<div class="p-8 text-center text-red-500">ID produk tidak valid.</div>`;
        try {
            const product = await getProductById(id);
            if (!product) return `<div class="p-8 text-center text-red-500">Produk tidak ditemukan.</div>`;
            return `
                <div class="container mx-auto p-4 my-8">
                    <div class="bg-white rounded-lg shadow-lg p-6 md:flex gap-8">
                        <div class="md:w-1/2"><img src="${product.image}" alt="${product.name}" class="w-full rounded-lg shadow-md"></div>
                        <div class="md:w-1/2 mt-6 md:mt-0">
                            <h1 class="text-4xl font-bold text-gray-800">${product.name}</h1>
                            <p class="text-3xl text-blue-600 font-semibold my-4">${formatCurrency(product.price)}</p>
                            <p class="text-gray-600 mb-6 leading-relaxed">${product.description}</p>
                            <button id="add-to-cart-btn" class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                                ${cartIcon} Tambah ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            `;
        } catch (error) {
            return `<div class="p-8 text-center text-red-500">Gagal memuat detail produk.</div>`;
        }
    },
    afterRender: async (id) => {
        if (!id) return;
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', async () => {
                const product = await getProductById(id);
                addToCart(product);
            });
        }
    }
};
