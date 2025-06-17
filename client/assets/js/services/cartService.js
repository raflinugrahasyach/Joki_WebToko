import { renderHeader } from '../components/Header.js';
import { showToast } from '../utils/toast.js';

const CART_KEY = 'shopping_cart';

export const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

const saveCartAndUpdateUI = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderHeader();
};

export const addToCart = (productToAdd) => {
    let cart = getCart();
    const existingProduct = cart.find(item => item.id === productToAdd.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }
    saveCartAndUpdateUI(cart);
    showToast(`"${productToAdd.name}" telah ditambahkan.`, 'success');
};

export const updateQuantity = (productId, newQuantity) => {
    let cart = getCart();
    if (newQuantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    } else {
        const productInCart = cart.find(item => item.id === productId);
        if (productInCart) productInCart.quantity = newQuantity;
    }
    saveCartAndUpdateUI(cart);
};

export const removeFromCart = (productId) => {
    let cart = getCart();
    const updatedCart = cart.filter(item => item.id !== productId);
    saveCartAndUpdateUI(updatedCart);
    showToast("Produk dihapus dari keranjang.", "info");
};

export const clearCart = () => {
    saveCartAndUpdateUI([]);
    showToast("Keranjang berhasil dikosongkan.", "success");
};
