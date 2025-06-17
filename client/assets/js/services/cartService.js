// ============== File: client/assets/js/services/cartService.js (DIEDIT) ==============
import state from '../state.js';
import { showToast } from '../utils/toast.js';
import { render } from '../app.js'; // <-- Impor render secara langsung

/**
 * Menyimpan keranjang ke localStorage agar tidak hilang saat refresh.
 */
function saveCartToLocalStorage() {
    localStorage.setItem('sembakoCart', JSON.stringify(state.cart));
}

export function addToCart(productId, quantity = 1) {
    const existingItem = state.cart.find(item => item.productId === productId);
    const product = state.products.find(p => p.id === productId);

    if (!product) return;

    const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
    if (currentQuantityInCart + quantity > product.stock) {
        showToast(`Stok tidak cukup! Sisa stok: ${product.stock}`, true);
        return;
    }

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({ productId, quantity });
    }
    
    saveCartToLocalStorage();
    showToast(`${product.name} ditambahkan!`);
    render(); // <-- Panggil render secara langsung untuk update UI
}

export function updateCartQuantity(productId, action) {
    const itemIndex = state.cart.findIndex(item => item.productId === productId);
    if (itemIndex === -1) return;

    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const currentItem = state.cart[itemIndex];

    if (action === 'increase') {
        if (currentItem.quantity < product.stock) {
            currentItem.quantity++;
        } else {
            showToast(`Stok maksimum untuk ${product.name} tercapai.`, true);
        }
    } else if (action === 'decrease') {
        currentItem.quantity--;
        if (currentItem.quantity <= 0) {
            state.cart.splice(itemIndex, 1);
        }
    }
    
    saveCartToLocalStorage();
    render(); // <-- Panggil render secara langsung
}

export function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    saveCartToLocalStorage();
    render(); // <-- Panggil render secara langsung
}


// ============== File: client/assets/js/pages/AdminPage.js (DIEDIT) ==============
import { formatRupiah } from '../utils/formatters.js';
import { addProduct, fetchHistory } from '../apiService.js';
import { showToast } from '../utils/toast.js';
import { render } from '../app.js'; // <-- Impor render untuk refresh data

export const renderAdminPage = async () => {
    // ... (kode HTML tetap sama)
    const history = await fetchHistory();
    const totalSales = history.soldProducts.reduce((sum, p) => sum + (p.sold * p.price), 0);
    const topProduct = history.soldProducts[0] || { name: '-', sold: 0 };
    const lowStockProducts = history.soldProducts.filter(p => p.stock < 10);
    
    document.title = 'Admin Dashboard - SembakoNOW';

    const page = document.createElement('div');
    page.className = "container mx-auto p-4";
    page.innerHTML = `
        <h2 class="text-3xl font-extrabold mb-6">Admin Dashboard</h2>
        <div class="grid md:grid-cols-3 gap-4 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Total Penjualan</h4><p class="text-2xl font-bold">${formatRupiah(totalSales)}</p></div>
            <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Barang Paling Laku</h4><p class="text-2xl font-bold">${topProduct.name}</p></div>
            <div class="bg-white p-4 rounded-lg shadow-sm"><h4 class="font-semibold text-gray-500">Stok Menipis</h4><p class="text-2xl font-bold text-orange-500">${lowStockProducts.length} Produk</p></div>
        </div>
        <div class="grid lg:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-bold mb-4">Tambah Barang Baru</h3>
                <form id="add-product-form" class="space-y-4">
                    <div><label class="font-semibold">Nama Barang</label><input type="text" name="name" required class="w-full p-2 border rounded-md mt-1"></div>
                    <div><label class="font-semibold">Kategori</label><input type="text" name="category" required class="w-full p-2 border rounded-md mt-1"></div>
                    <div class="grid grid-cols-2 gap-4">
                        <div><label class="font-semibold">Harga</label><input type="number" name="price" required class="w-full p-2 border rounded-md mt-1"></div>
                        <div><label class="font-semibold">Stok</label><input type="number" name="stock" required class="w-full p-2 border rounded-md mt-1"></div>
                    </div>
                    <button type="submit" class="primary-btn w-full">Tambah Produk</button>
                </form>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-bold mb-4">Riwayat Barang</h3>
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold mb-2">Baru Ditambahkan</h4>
                        <div class="h-48 overflow-y-auto border rounded-md p-2">${history.newProducts.map(p => `<li class="py-1 text-sm list-none"><strong>${p.name}</strong> (Stok: ${p.stock})</li>`).join('')}</div>
                    </div>
                    <div>
                        <h4 class="font-semibold mb-2">Terlaris</h4>
                        <div class="h-48 overflow-y-auto border rounded-md p-2">${history.soldProducts.map(p => `<li class="py-1 text-sm list-none"><strong>${p.name}</strong> (Terjual: ${p.sold})</li>`).join('')}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    page.querySelector('#add-product-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = Object.fromEntries(formData.entries());
        
        const result = await addProduct(productData);
        if (result.success) {
            showToast('Produk baru berhasil ditambahkan!');
            e.target.reset(); // Kosongkan form
            
            // Reload semua data produk dari server untuk menampilkan yang terbaru
            const productsFromServer = await fetchProducts();
            state.products = productsFromServer;
            render(); // <-- Panggil render untuk refresh halaman admin
        } else {
            showToast(`Error: ${result.message}`, true);
        }
    });

    return page.outerHTML;
};
