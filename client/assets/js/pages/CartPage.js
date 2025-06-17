// =========================================================================
// Berkas: client/assets/js/pages/CartPage.js
// =========================================================================
import state from '../state.js';
import { formatRupiah } from '../utils/formatters.js';

export const renderCartPage = () => {
    const cartDetails = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return product ? { ...product, quantity: item.quantity } : null;
    }).filter(item => item !== null);

    const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.title = 'Keranjang Belanja - SembakoNOW';

    const pageContent = `
        <div class="container mx-auto p-4">
            <h2 class="text-3xl font-extrabold mb-6">Keranjang Saya</h2>
            ${cartDetails.length === 0 ? `
                <div class="text-center py-16">
                    <i data-lucide="shopping-cart" class="mx-auto w-16 h-16 text-gray-300"></i>
                    <p class="text-gray-500 mt-4">Keranjang Anda masih kosong.</p>
                    <a href="#products" class="nav-link mt-4 inline-block primary-btn">Mulai Belanja</a>
                </div>
            ` : `
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-4">
                        ${cartDetails.map(item => `
                            <div class="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
                                <img src="${item.image}" alt="[Gambar ${item.name}]" class="w-20 h-20 rounded-md object-cover">
                                <div class="flex-grow">
                                    <h3 class="font-semibold">${item.name}</h3>
                                    <p class="text-emerald-600 font-bold">${formatRupiah(item.price)}</p>
                                </div>
                                <div class="flex items-center border rounded-md">
                                    <button class="cart-quantity-btn p-2" data-id="${item.id}" data-action="decrease"><i data-lucide="minus" class="w-4 h-4"></i></button>
                                    <span class="px-3">${item.quantity}</span>
                                    <button class="cart-quantity-btn p-2" data-id="${item.id}" data-action="increase"><i data-lucide="plus" class="w-4 h-4"></i></button>
                                </div>
                                <p class="font-bold w-28 text-right">${formatRupiah(item.price * item.quantity)}</p>
                                <button class="remove-from-cart-btn text-gray-400 hover:text-red-500" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
                        <h3 class="text-xl font-bold mb-4">Ringkasan & Checkout</h3>
                        <form id="checkout-form">
                            <div class="space-y-3 mb-4">
                                 <input type="text" name="name" required placeholder="Nama Lengkap" class="w-full p-2 border rounded-md">
                                 <input type="tel" name="phone" required placeholder="No. HP" class="w-full p-2 border rounded-md">
                                 <textarea name="address" rows="3" required placeholder="Alamat Lengkap" class="w-full p-2 border rounded-md"></textarea>
                            </div>
                            <div class="flex justify-between mb-2"><span class="text-gray-600">Subtotal</span><span class="font-semibold">${formatRupiah(subtotal)}</span></div>
                            <hr class="my-4">
                            <div class="flex justify-between font-bold text-lg mb-6"><span>Total</span><span>${formatRupiah(subtotal)}</span></div>
                            <button type="submit" class="primary-btn w-full">Buat Pesanan</button>
                        </form>
                    </div>
                </div>
            `}
        </div>
    `;
    return pageContent;
};
