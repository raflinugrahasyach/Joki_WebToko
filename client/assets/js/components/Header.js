import { getCart } from '../services/cartService.js';
import { cartIcon, menuIcon } from '../utils/icons.js';

export const renderHeader = () => {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;
    
    const cart = getCart();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    headerContainer.innerHTML = `
        <nav class="bg-white shadow-md sticky top-0 z-40">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center py-4">
                    <a href="#/" class="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">WebToko</a>
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="#/" class="text-gray-600 hover:text-blue-600 transition">Home</a>
                        <a href="#/products" class="text-gray-600 hover:text-blue-600 transition">Produk</a>
                        <a href="#/admin" class="text-gray-600 hover:text-blue-600 transition">Admin</a>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="#/cart" class="relative text-gray-600 hover:text-blue-600 transition">
                            ${cartIcon}
                            <span id="cart-count" class="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ${cartItemCount > 0 ? '' : 'hidden'}">
                                ${cartItemCount}
                            </span>
                        </a>
                        <button id="mobile-menu-button" class="md:hidden text-gray-600 hover:text-blue-600">
                           ${menuIcon}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }
};
