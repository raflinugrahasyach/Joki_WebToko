const state = {
    products: [],
    cart: JSON.parse(localStorage.getItem('sembakoCart')) || [], // Ambil cart dari localStorage
    currentCategory: 'Semua',
    currentProductId: null,
    isLoading: false,
};

export default state;

