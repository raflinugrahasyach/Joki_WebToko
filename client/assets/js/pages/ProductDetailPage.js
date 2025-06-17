// =========================================================================
// Berkas: client/assets/js/pages/ProductDetailPage.js
// =========================================================================
import state from '../state.js';
import { fetchProductById } from '../apiService.js';
import { formatRupiah } from '../utils/formatters.js';
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
                    <button id="add-to-cart-detail-btn" class="primary-btn w-full" data-id="${product.id}">
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
