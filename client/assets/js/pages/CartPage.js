import { getCart, updateQuantity, removeFromCart, clearCart } from '../services/cartService.js';
import { formatCurrency } from '../utils/formatters.js';
import { renderHeader } from '../components/Header.js';

export const CartPage = {
    render: () => {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (cart.length === 0) {
            return `
                <main class="container mx-auto p-8 text-center">
                    <h1 class="text-3xl font-bold mb-4">Keranjang Belanja Kosong</h1>
                    <p class="text-gray-500 mb-6">Sepertinya Anda belum menambahkan produk apapun.</p>
                    <a href="#/products" class="mt-4 inline-block bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition">Mulai Belanja</a>
                </main>
            `;
        }

        return `
            <main class="container mx-auto p-4">
                <h1 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Keranjang Anda</h1>
                <div id="cart-items-container" class="space-y-4">
                    ${cart.map(item => `
                        <div class="cart-item flex items-center justify-between bg-white p-4 rounded-lg shadow">
                            <div class="flex items-center gap-4">
                                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                                <div>
                                    <h3 class="font-semibold text-lg">${item.name}</h3>
                                    <p class="text-gray-600">${formatCurrency(item.price)}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input w-16 text-center border rounded">
                                <p class="font-semibold w-24 text-right">${formatCurrency(item.price * item.quantity)}</p>
                                <button data-id="${item.id}" class="remove-btn text-red-500 hover:text-red-700 font-bold text-2xl">&times;</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="mt-8 p-6 bg-white rounded-lg shadow">
                    <div class="flex justify-between items-center">
                        <h2 class="text-2xl font-bold">Total</h2>
                        <p id="subtotal" class="text-2xl font-bold">${formatCurrency(subtotal)}</p>
                    </div>
                    <div class="flex justify-end gap-4 mt-6">
                         <button id="clear-cart-btn" class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Kosongkan Keranjang</button>
                         <button class="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600">Checkout</button>
                    </div>
                </div>
            </main>
        `;
    },
    afterRender: () => {
        const rerender = () => {
            document.getElementById('root').innerHTML = CartPage.render();
            CartPage.afterRender();
            renderHeader();
        };

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', e => {
                updateQuantity(parseInt(e.target.dataset.id), parseInt(e.target.value));
                rerender();
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', e => {
                removeFromCart(parseInt(e.target.dataset.id));
                rerender();
            });
        });

        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                clearCart();
                rerender();
            });
        }
    }
};
