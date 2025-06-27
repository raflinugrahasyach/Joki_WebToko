/**
 * Berkas: apiService.js
 * Deskripsi: Pusat semua komunikasi antara frontend (client) dengan backend (server).
 * Semua permintaan data (fetch) ke server didefinisikan di sini.
 */

// Path relatif '/api' digunakan agar fleksibel. Saat dijalankan lokal,
// ini akan merujuk ke server lokal. Saat di-deploy di Vercel, ini akan
// otomatis merujuk ke server di domain yang sama.
const API_BASE_URL = '/api';

/**
 * Fungsi pembungkus (wrapper) untuk 'fetch' agar penanganan error lebih konsisten.
 * @param {string} url - URL endpoint API yang akan dipanggil.
 * @param {object} options - Opsi untuk fetch (method, headers, body, dll).
 * @returns {Promise<any>} Data JSON dari respons server.
 */
const fetchAPI = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        // Jika respons bukan 'ok' (misal, status 404 atau 500), kita tangani sebagai error.
        if (!response.ok) {
            // Coba baca pesan error dari body JSON, jika gagal, buat pesan error standar.
            const errorData = await response.json().catch(() => ({ 
                message: `Terjadi kesalahan HTTP. Status: ${response.status}` 
            }));
            throw new Error(errorData.message);
        }

        // Jika status 204 (No Content), seperti pada DELETE, kembalikan null karena tidak ada body.
        if (response.status === 204) {
            return null;
        }

        return await response.json();

    } catch (error) {
        console.error('Kesalahan pada pemanggilan API:', error.message);
        // Lempar kembali error agar fungsi yang memanggil bisa menangkapnya (misal, untuk menampilkan toast).
        throw error;
    }
};

// --- API untuk Produk ---
export const getProducts = () => fetchAPI(`${API_BASE_URL}/products`);
export const getProductById = (id) => fetchAPI(`${API_BASE_URL}/products/${id}`);
export const addProduct = (productData) => fetchAPI(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
});
export const updateProduct = (id, productData) => fetchAPI(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
});
export const deleteProduct = (id) => fetchAPI(`${API_BASE_URL}/products/${id}`, { method: 'DELETE' });

// --- API untuk Pesanan (Order) ---
export const submitOrder = (orderData) => fetchAPI(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
});

// --- API untuk Riwayat (History) ---
export const fetchHistory = () => fetchAPI(`${API_BASE_URL}/history`);
