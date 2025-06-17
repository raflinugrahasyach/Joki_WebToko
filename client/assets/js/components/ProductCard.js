import { formatCurrency } from '../utils/formatters.js';

export const ProductCard = {
    render: (product) => {
        return `
            <div class="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <a href="#/product/${product.id}" class="block">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                </a>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-lg font-semibold text-gray-800 truncate flex-grow">
                        <a href="#/product/${product.id}" class="hover:text-blue-600">${product.name}</a>
                    </h3>
                    <p class="text-gray-600 mt-1 mb-4">${formatCurrency(product.price)}</p>
                    <button data-product-id="${product.id}" class="add-to-cart-btn mt-auto w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
        `;
    }
};
