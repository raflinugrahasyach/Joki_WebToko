import { formatRupiah } from '../utils/formatters.js';

/**
 * Merender sebuah kartu produk tunggal sebagai string HTML.
 * Event listener untuk tombol akan ditangani oleh app.js (event delegation).
 * @param {object} product - Objek produk yang akan dirender.
 * @param {string} [additionalClasses=''] - Kelas CSS tambahan untuk elemen utama kartu.
 * @returns {string} String HTML dari kartu produk.
 */
export const renderProductCard = (product, additionalClasses = '') => {
    return `
        <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${additionalClasses}" data-id="${product.id}">
            <a href="#product/${product.id}" class="block overflow-hidden nav-link">
                <img src="${product.image}" alt="[Gambar ${product.name}]" class="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='https://placehold.co/600x600/e2e8f0/334155?text=Gambar+Error';">
            </a>
            <div class="p-4 flex-grow flex flex-col">
                <p class="text-xs text-gray-500 mb-1">${product.category}</p>
                <h4 class="font-bold text-sm md:text-base flex-grow text-gray-800">
                    <a href="#product/${product.id}" class="hover:text-emerald-600 nav-link">${product.name}</a>
                </h4>
                <div class="flex justify-between items-center mt-4">
                    <p class="text-lg font-extrabold text-emerald-600">${formatRupiah(product.price)}</p>
                    <button class="add-to-cart-btn p-2 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300" data-id="${product.id}">
                        <i data-lucide="plus" class="w-5 h-5 pointer-events-none"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};
