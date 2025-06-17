export const renderMobileNav = () => {
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    if (!mobileNavContainer) return;

    mobileNavContainer.innerHTML = `
        <div id="mobile-nav" class="hidden md:hidden bg-white shadow-lg">
            <a href="#/" class="block text-gray-600 hover:bg-gray-100 p-4">Home</a>
            <a href="#/products" class="block text-gray-600 hover:bg-gray-100 p-4">Produk</a>
            <a href="#/admin" class="block text-gray-600 hover:bg-gray-100 p-4">Admin</a>
        </div>
    `;
};
