// =========================================================================
// Berkas: client/assets/js/apiService.js
// =========================================================================
const API_BASE_URL = 'http://localhost:3000/api';

export async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Gagal mengambil data produk dari server.');
        }
        return await response.json();
    } catch (error) {
        console.error("Error di fetchProducts:", error);
        return null;
    }
}

export async function fetchProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`Gagal mengambil data produk dengan ID: ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error di fetchProductById:", error);
        return null;
    }
}

export async function submitOrder(orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Gagal membuat pesanan');
        }
        return { success: true, data: result };
    } catch (error) {
        console.error("Error di submitOrder:", error);
        return { success: false, message: error.message };
    }
}

export async function addProduct(productData) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Gagal menambah produk');
        }
        return { success: true, data: result };
    } catch(error) {
        console.error("Error di addProduct:", error);
        return { success: false, message: error.message };
    }
}

export async function fetchHistory() {
     try {
        const response = await fetch(`${API_BASE_URL}/history`);
        if (!response.ok) {
            throw new Error('Gagal mengambil data riwayat');
        }
        return await response.json();
    } catch (error) {
        console.error("Error di fetchHistory:", error);
        return { soldProducts: [], newProducts: [] };
    }
}