const API_BASE_URL = 'http://localhost:3000/api';

const fetchAPI = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
            throw new Error(errorData.message);
        }
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('API Fetch Error:', error.message);
        // Melempar kembali error agar bisa ditangkap oleh pemanggil
        throw error;
    }
};

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
