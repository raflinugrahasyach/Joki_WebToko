// ============== File: client/assets/js/components/MobileNav.js ==============
import state from '../state.js';

export const renderMobileNav = () => {
    const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const links = [
        { href: '#home', icon: 'home', label: 'Home' },
        { href: '#products', icon: 'layout-grid', label: 'Produk' },
        { href: '#cart', icon: 'shopping-bag', label: 'Keranjang', badge: cartItemCount },
        { href: '#admin', icon: 'user-round', label: 'Admin' }
    ];

    const mobileNavEl = document.getElementById('mobile-nav');
    if (mobileNavEl) {
        mobileNavEl.innerHTML = links.map(link => `
            <a href="${link.href}" class="nav-link flex-1 text-center text-gray-600 hover:text-emerald-600 transition-colors py-2 rounded-lg">
                <div class="relative inline-block">
                    <i data-lucide="${link.icon}"></i>
                    ${link.badge > 0 ? `<span class="absolute -top-1 -right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">${link.badge}</span>` : ''}
                </div>
                <span class="block text-xs font-medium">${link.label}</span>
            </a>
        `).join('');
    }
};


// ============== File: client/assets/js/components/ProductCard.js ==============
import { formatRupiah } from '../utils/formatters.js';

export const renderProductCard = (product, additionalClasses = '') => {
    return `
        <div class="product-card bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 ${additionalClasses}" data-id="${product.id}">
            <a href="#product/${product.id}" class="block overflow-hidden nav-link">
                <img src="${product.image}" alt="[Gambar ${product.name}]" class="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null;this.src='https://placehold.co/600x600/e2e8f0/334155?text=Error';">
            </a>
            <div class="p-4 flex-grow flex flex-col">
                <p class="text-xs text-gray-500 mb-1">${product.category}</p>
                <h4 class="font-bold text-sm md:text-base flex-grow text-gray-800">
                    <a href="#product/${product.id}" class="hover:text-emerald-600 nav-link">${product.name}</a>
                </h4>
                <div class="flex justify-between items-center mt-4">
                    <p class="text-lg font-extrabold text-emerald-600">${formatRupiah(product.price)}</p>
                    <button class="add-to-cart-btn p-2 rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300" data-id="${product.id}">
                        <i data-lucide="plus" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
};
