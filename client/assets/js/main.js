// --- DATABASE ---
// In a real application, this data would come from a server API.
const initialProducts = [
    { id: 1, name: 'Beras Premium 5 Kg', category: 'Sembako', price: 75000, stock: 50, sold: 120, dateAdded: '2023-10-01', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Beras', description: 'Beras pulen dan berkualitas tinggi, cocok untuk konsumsi keluarga sehari-hari. Diproses secara higienis.' },
    { id: 2, name: 'Minyak Goreng 2L', category: 'Sembako', price: 34000, stock: 100, sold: 250, dateAdded: '2023-10-01', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Minyak', description: 'Minyak goreng jernih dari kelapa sawit pilihan, menghasilkan gorengan yang renyah dan lezat.' },
    { id: 3, name: 'Gula Pasir 1 Kg', category: 'Sembako', price: 16000, stock: 200, sold: 180, dateAdded: '2023-10-02', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Gula', description: 'Gula pasir putih bersih, manisnya pas untuk segala jenis minuman dan masakan.' },
    { id: 4, name: 'Tepung Terigu 1 Kg', category: 'Sembako', price: 13000, stock: 150, sold: 95, dateAdded: '2023-10-05', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Tepung', description: 'Tepung terigu serbaguna, cocok untuk membuat aneka kue, roti, dan gorengan.' },
    { id: 5, name: 'Telur Ayam 1 Kg', category: 'Makanan', price: 30000, stock: 30, sold: 150, dateAdded: '2023-10-10', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Telur', description: 'Telur ayam segar langsung dari peternak lokal. Kaya akan protein dan nutrisi.' },
    { id: 6, name: 'Mie Instan 1 Dus', category: 'Makanan', price: 52000, stock: 80, sold: 210, dateAdded: '2023-10-03', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Mie+Instan', description: 'Satu dus berisi 40 bungkus mie instan rasa ayam bawang. Solusi cepat untuk lapar.' },
    { id: 7, name: 'Kopi Kapal Api Special 165g', category: 'Minuman', price: 15000, stock: 70, sold: 80, dateAdded: '2023-10-08', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Kopi', description: 'Kopi bubuk instan dengan aroma dan rasa yang khas dan mantap.' },
    { id: 8, name: 'Teh Celup Sariwangi isi 50', category: 'Minuman', price: 10000, stock: 120, sold: 110, dateAdded: '2023-10-07', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Teh', description: 'Teh celup asli, memberikan kehangatan dan kesegaran di setiap cangkir.' },
    { id: 9, name: 'Sabun Mandi Lifebuoy Total 10', category: 'Alat Mandi', price: 4000, stock: 250, sold: 300, dateAdded: '2023-10-01', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Sabun', description: 'Sabun batang anti-bakteri untuk melindungi keluarga dari kuman penyebab penyakit.' },
    { id: 10, name: 'Deterjen Rinso Anti Noda 770g', category: 'Rumah Tangga', price: 22000, stock: 60, sold: 75, dateAdded: '2023-10-06', image: 'https://placehold.co/600x600/e2e8f0/334155?text=Deterjen', description: 'Deterjen bubuk dengan teknologi penghilang noda, membuat pakaian bersih cemerlang.' },
];

// --- APPLICATION STATE ---
const state = {
    products: initialProducts,
    cart: [], // { productId, quantity }
    currentPage: 'home',
    currentCategory: 'Semua',
    currentProductId: null,
};

// --- UTILITY FUNCTIONS ---
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};

// --- RENDER FUNCTIONS (HTML TEMPLATES) ---

// Header for Desktop
const Header = () => {
    const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    return `
        <header class="hidden md:flex bg-white shadow-md sticky top-0 z-40 items-center justify-between p-4">
            <a href="#home" class="flex items-center gap-2">
                <i data-lucide="shopping-basket" class="text-emerald-600"></i>
                <h1 class="text-xl font-bold text-slate-800">TokoSembako</h1>
            </a>
            <div class="flex-1 max-w-lg mx-8">
                 <div class="relative">
                    <input id="search-input-desktop" type="text" placeholder="Cari produk di sini..." class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-100">
                    <i data-lucide="search" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
            </div>
            <nav class="flex items-center gap-6">
                <a href="#home" class="nav-link font-medium text-slate-600 hover:text-emerald-600 transition-colors">Home</a>
                <a href="#products" class="nav-link font-medium text-slate-600 hover:text-emerald-600 transition-colors">Produk</a>
                <a href="#admin" class="nav-link font-medium text-slate-600 hover:text-emerald-600 transition-colors">Admin</a>
                <a href="#cart" class="nav-link relative">
                    <i data-lucide="shopping-cart" class="text-slate-600 hover:text-emerald-600 transition-colors"></i>
                    <span id="cart-badge-desktop" class="absolute -top-2 -right-3 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center ${cartItemCount > 0 ? '' : 'hidden'}">${cartItemCount}</span>
                </a>
            </nav>
        </header>
    `;
};

const renderHomePage = () => {
    const categories = [
        { name: 'Sembako', icon: 'wheat' },
        { name: 'Makanan', icon: 'utensils-crossed' },
        { name: 'Minuman', icon: 'cup-soda' },
        { name: 'Alat Mandi', icon: 'bath' },
        { name: 'Rumah Tangga', icon: 'home' },
        { name: 'Produk Baru', icon: 'sparkles' }
    ];
    
    const bestSellers = [...state.products].sort((a, b) => b.sold - a.sold).slice(0, 4);

    return `
        ${Header()}
        <main>
            <!-- Hero Section -->
            <section class="bg-emerald-600 text-white p-6 md:p-12 text-center md:text-left md:flex items-center justify-center">
                <div class="md:w-1/2">
                    <h2 class="text-3xl md:text-5xl font-bold mb-4">Belanja Sembako Mudah dan Terjangkau</h2>
                    <p class="mb-6">Dapatkan semua kebutuhan harian Anda dengan harga terbaik, langsung diantar ke depan pintu rumah.</p>
                    <a href="#products" class="bg-white text-emerald-700 font-bold py-3 px-6 rounded-full hover:bg-emerald-50 transition-transform transform hover:scale-105 inline-block">
                        Belanja Sekarang
                    </a>
                </div>
                <div class="hidden md:block md:w-1/3">
                    <img src="https://placehold.co/400x400/6ee7b7/1e3a8a?text=Sembako+Fresh" alt="[Gambar Ilustrasi Sembako]" class="rounded-lg">
                </div>
            </section>
            
            <!-- Category Section (Inspired by Dagangan) -->
            <section class="p-4 md:p-8">
                <h3 class="text-xl font-bold mb-4 text-center">Kategori Populer</h3>
                <div class="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    ${categories.map(cat => `
                        <a href="#products/category/${cat.name}" class="category-link text-center bg-white p-4 rounded-lg shadow-sm hover:shadow-lg hover:border-emerald-500 border border-transparent transition-all duration-300 transform hover:-translate-y-1">
                            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                <i data-lucide="${cat.icon}" class="text-emerald-600"></i>
                            </div>
                            <span class="font-semibold text-sm">${cat.name}</span>
                        </a>
                    `).join('')}
                </div>
            </section>

            <!-- Promo Section -->
            <section class="p-4 md:p-8 bg-slate-100">
                <h3 class="text-xl font-bold mb-4 text-center">Promo Hari Ini</h3>
                <div class="bg-red-500 text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div class="text-center md:text-left">
                        <p class="text-lg font-medium">DISKON SPESIAL!</p>
                        <h4 class="text-3xl font-bold">Potongan Harga hingga 20%</h4>
                        <p>Untuk produk-produk pilihan. Jangan sampai kehabisan!</p>
                    </div>
                    <a href="#products" class="bg-white text-red-500 font-bold py-2 px-5 rounded-full hover:bg-red-100 transition-colors">Lihat Promo</a>
                </div>
            </section>

            <!-- Best Sellers Section -->
            <section class="p-4 md:p-8">
                <h3 class="text-xl font-bold mb-4 text-center">Barang Terlaris</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${bestSellers.map(product => renderProductCard(product)).join('')}
                </div>
            </section>

            <!-- Testimonials Section -->
            <section class="p-4 md:p-8 bg-slate-100">
                 <h3 class="text-xl font-bold mb-4 text-center">Kata Pelanggan</h3>
                 <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <p class="text-slate-600 italic mb-4">"Aplikasinya gampang banget dipake. Harga juga bersaing, pengiriman cepat. Recommended!"</p>
                        <div class="flex items-center">
                            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" class="w-10 h-10 rounded-full mr-4" alt="[Foto Pelanggan 1]">
                            <div>
                                <p class="font-semibold">Budi Santoso</p>
                                <p class="text-sm text-slate-500">Pelanggan Setia</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <p class="text-slate-600 italic mb-4">"Sangat membantu buat saya yang jarang ke pasar. Semua kebutuhan dapur ada di sini."</p>
                        <div class="flex items-center">
                            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704e" class="w-10 h-10 rounded-full mr-4" alt="[Foto Pelanggan 2]">
                            <div>
                                <p class="font-semibold">Siti Aminah</p>
                                <p class="text-sm text-slate-500">Ibu Rumah Tangga</p>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-sm">
                        <p class="text-slate-600 italic mb-4">"Fitur adminnya simpel tapi lengkap. Mudah untuk tambah dan monitor stok barang."</p>
                        <div class="flex items-center">
                            <img src="https://i.pravatar.cc/40?u=a042581f4e29026704f" class="w-10 h-10 rounded-full mr-4" alt="[Foto Pelanggan 3]">
                            <div>
                                <p class="font-semibold">Rian Hidayat</p>
                                <p class="text-sm text-slate-500">Mitra Warung</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

            <!-- Footer -->
            <footer class="bg-slate-800 text-white p-8 mt-8">
                <div class="container mx-auto grid md:grid-cols-4 gap-8">
                    <div>
                        <h4 class="font-bold text-lg mb-4">TokoSembako</h4>
                        <p class="text-slate-400">Jalan Merdeka No. 123, Jakarta Pusat, Indonesia</p>
                        <p class="text-slate-400">support@tokosembako.com</p>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-4">Tautan</h4>
                        <ul>
                            <li><a href="#home" class="text-slate-400 hover:text-white">Home</a></li>
                            <li><a href="#products" class="text-slate-400 hover:text-white">Produk</a></li>
                            <li><a href="#cart" class="text-slate-400 hover:text-white">Keranjang</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg mb-4">Ikuti Kami</h4>
                        <div class="flex gap-4">
                            <a href="#" class="text-slate-400 hover:text-white"><i data-lucide="facebook"></i></a>
                            <a href="#" class="text-slate-400 hover:text-white"><i data-lucide="instagram"></i></a>
                            <a href="#" class="text-slate-400 hover:text-white"><i data-lucide="twitter"></i></a>
                        </div>
                    </div>
                     <div>
                        <h4 class="font-bold text-lg mb-4">Newsletter</h4>
                        <p class="text-slate-400 mb-2">Dapatkan info promo terbaru dari kami.</p>
                        <div class="flex">
                            <input type="email" placeholder="Email Anda" class="w-full rounded-l-md px-3 py-2 text-slate-800 focus:outline-none">
                            <button class="bg-emerald-600 px-4 rounded-r-md hover:bg-emerald-700">Kirim</button>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    `;
};

const renderProductCard = (product) => {
    return `
        <div class="product-card bg-white rounded-lg shadow-sm overflow-hidden flex flex-col" data-id="${product.id}">
            <a href="#product/${product.id}" class="block">
                <img src="${product.image}" alt="[Gambar ${product.name}]" class="w-full h-32 md:h-48 object-cover">
            </a>
            <div class="p-3 flex-grow flex flex-col">
                <h4 class="font-semibold text-sm md:text-base flex-grow">
                    <a href="#product/${product.id}" class="hover:text-emerald-600">${product.name}</a>
                </h4>
                <p class="text-lg font-bold text-emerald-600 my-2">${formatRupiah(product.price)}</p>
                <button class="add-to-cart-btn w-full bg-emerald-500 text-white font-semibold py-2 rounded-md hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2" data-id="${product.id}">
                    <i data-lucide="plus" class="w-4 h-4"></i> Keranjang
                </button>
            </div>
        </div>
    `;
}

const renderProductsPage = () => {
    const categories = ['Semua', ...new Set(state.products.map(p => p.category))];
    const filteredProducts = state.currentCategory === 'Semua' 
        ? state.products 
        : state.products.filter(p => p.category === state.currentCategory);

    return `
        ${Header()}
        <main class="container mx-auto p-4">
            <div class="md:hidden relative mb-4">
                 <input id="search-input-mobile" type="text" placeholder="Cari produk..." class="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                 <i data-lucide="search" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>

            <div id="search-results" class="hidden"></div>
            
            <div id="main-products-view">
                <h2 class="text-2xl font-bold mb-4">Semua Produk</h2>

                <!-- Category Filters -->
                <div class="flex space-x-2 overflow-x-auto pb-4 mb-4">
                    ${categories.map(cat => `
                        <button class="category-filter-btn px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors
                            ${state.currentCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 hover:bg-emerald-100'}"
                            data-category="${cat}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>

                <!-- Product Grid -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    ${filteredProducts.map(product => renderProductCard(product)).join('')}
                </div>
            </div>
        </main>
    `;
};

const renderProductDetailPage = () => {
    const product = state.products.find(p => p.id === state.currentProductId);
    if (!product) return `<p>Produk tidak ditemukan.</p>`;

    return `
        ${Header()}
        <main class="container mx-auto p-4">
            <a href="#products" class="inline-flex items-center gap-2 text-emerald-600 hover:underline mb-4">
                <i data-lucide="arrow-left"></i>
                Kembali ke Produk
            </a>
            <div class="bg-white rounded-lg shadow-lg p-4 md:p-8 grid md:grid-cols-2 gap-8">
                <!-- Product Image -->
                <div>
                    <img src="${product.image}" alt="[Gambar ${product.name}]" class="w-full rounded-lg">
                </div>
                
                <!-- Product Details -->
                <div>
                    <span class="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">${product.category}</span>
                    <h2 class="text-3xl font-bold mt-4 mb-2">${product.name}</h2>
                    <p class="text-3xl font-bold text-emerald-600 mb-4">${formatRupiah(product.price)}</p>
                    <p class="text-slate-600 mb-6">${product.description}</p>
                    
                    <div class="flex items-center gap-4 mb-6">
                        <label for="quantity" class="font-semibold">Jumlah:</label>
                        <div class="flex items-center border rounded-md">
                            <button class="quantity-change-btn p-2" data-action="decrease" data-id="${product.id}">
                                <i data-lucide="minus" class="w-4 h-4"></i>
                            </button>
                            <input id="quantity-input" type="number" value="1" min="1" max="${product.stock}" class="w-12 text-center border-l border-r focus:outline-none">
                            <button class="quantity-change-btn p-2" data-action="increase" data-id="${product.id}">
                                <i data-lucide="plus" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                    
                    <p class="font-semibold mb-2">Total Harga: <span id="total-price" class="text-emerald-600">${formatRupiah(product.price)}</span></p>

                    <button class="add-to-cart-detail-btn w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2" data-id="${product.id}">
                        <i data-lucide="shopping-cart"></i> Masukkan ke Keranjang
                    </button>
                </div>
            </div>
        </main>
    `;
};

const renderCartPage = () => {
    const cartDetails = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return { ...product, quantity: item.quantity };
    });

    const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `
        ${Header()}
        <main class="container mx-auto p-4">
            <h2 class="text-2xl font-bold mb-4">Keranjang Belanja</h2>
            ${cartDetails.length === 0 ? `
                <div class="text-center py-16">
                    <i data-lucide="shopping-cart" class="mx-auto w-16 h-16 text-slate-300"></i>
                    <p class="text-slate-500 mt-4">Keranjang Anda masih kosong.</p>
                    <a href="#products" class="mt-4 inline-block bg-emerald-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-emerald-600">Mulai Belanja</a>
                </div>
            ` : `
                <div class="grid lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-4">
                        <!-- Cart Items -->
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
                                <button class="remove-from-cart-btn text-slate-400 hover:text-red-500" data-id="${item.id}"><i data-lucide="trash-2"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    <!-- Order Summary -->
                    <div class="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
                        <h3 class="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                        <div class="flex justify-between mb-2">
                            <span class="text-slate-600">Subtotal</span>
                            <span class="font-semibold">${formatRupiah(subtotal)}</span>
                        </div>
                         <div class="flex justify-between mb-4 text-slate-600">
                            <span>Ongkos Kirim</span>
                            <span class="font-semibold">Gratis</span>
                        </div>
                        <hr class="my-4">
                        <div class="flex justify-between font-bold text-lg mb-6">
                            <span>Total</span>
                            <span>${formatRupiah(subtotal)}</span>
                        </div>
                        <a href="#checkout" class="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2">
                            Checkout <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                </div>
            `}
        </main>
    `;
};

const renderCheckoutPage = () => {
     const cartDetails = state.cart.map(item => {
        const product = state.products.find(p => p.id === item.productId);
        return { ...product, quantity: item.quantity };
    });
    const subtotal = cartDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartDetails.length === 0) {
        return `<div class="text-center p-8">Tidak ada item untuk di-checkout. <a href="#products" class="text-emerald-600 underline">Kembali belanja</a>.</div>`;
    }

    return `
        ${Header()}
        <main class="container mx-auto p-4">
            <h2 class="text-2xl font-bold mb-4">Checkout</h2>
            <form id="checkout-form" class="grid lg:grid-cols-3 gap-8">
                <!-- Buyer Information -->
                <div class="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold mb-4">Data Pembeli</h3>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label for="name" class="block font-semibold mb-1">Nama Lengkap</label>
                            <input type="text" id="name" required class="w-full p-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                        </div>
                         <div>
                            <label for="phone" class="block font-semibold mb-1">No. HP</label>
                            <input type="tel" id="phone" required class="w-full p-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                        </div>
                        <div class="sm:col-span-2">
                            <label for="address" class="block font-semibold mb-1">Alamat Lengkap</label>
                            <textarea id="address" rows="4" required class="w-full p-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"></textarea>
                        </div>
                    </div>

                    <h3 class="text-xl font-bold mt-8 mb-4">Metode Pembayaran</h3>
                    <div class="space-y-3">
                        <label class="flex items-center p-4 border rounded-lg has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-500">
                            <input type="radio" name="payment" value="cod" class="w-5 h-5" checked>
                            <span class="ml-4 font-semibold">Bayar di Tempat (COD)</span>
                        </label>
                         <label class="flex items-center p-4 border rounded-lg has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-500">
                            <input type="radio" name="payment" value="bank_transfer" class="w-5 h-5">
                            <span class="ml-4 font-semibold">Transfer Bank</span>
                        </label>
                         <label class="flex items-center p-4 border rounded-lg has-[:checked]:bg-emerald-50 has-[:checked]:border-emerald-500">
                            <input type="radio" name="payment" value="ewallet" class="w-5 h-5">
                            <span class="ml-4 font-semibold">E-Wallet (GoPay/OVO)</span>
                        </label>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-24">
                    <h3 class="text-xl font-bold mb-4">Ringkasan Pesanan</h3>
                    <div class="space-y-2 mb-4">
                    ${cartDetails.map(item => `
                        <div class="flex justify-between text-sm">
                            <span>${item.name} (x${item.quantity})</span>
                            <span class="font-medium">${formatRupiah(item.price * item.quantity)}</span>
                        </div>
                    `).join('')}
                    </div>
                    <hr class="my-4">
                    <div class="flex justify-between mb-2">
                        <span class="text-slate-600">Subtotal</span>
                        <span class="font-semibold">${formatRupiah(subtotal)}</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg mb-6">
                        <span>Total</span>
                        <span>${formatRupiah(subtotal)}</span>
                    </div>
                    <button type="submit" class="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600">
                        Buat Pesanan
                    </button>
                </div>
            </form>
        </main>
    `;
};

const renderAdminPage = () => {
    const totalSales = state.products.reduce((sum, p) => sum + (p.sold * p.price), 0);
    const topProduct = [...state.products].sort((a,b) => b.sold - a.sold)[0];
    const lowStockProducts = state.products.filter(p => p.stock < 10);
    const newProducts = [...state.products].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    const soldProducts = [...state.products].filter(p => p.sold > 0).sort((a,b) => b.sold - a.sold);

    return `
        ${Header()}
        <main class="container mx-auto p-4">
            <h2 class="text-2xl font-bold mb-6">Dashboard Admin</h2>
            
            <!-- Quick Stats -->
            <div class="grid md:grid-cols-3 gap-4 mb-8">
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-semibold text-slate-500">Total Penjualan</h4>
                    <p class="text-2xl font-bold">${formatRupiah(totalSales)}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-semibold text-slate-500">Barang Paling Laku</h4>
                    <p class="text-2xl font-bold">${topProduct.name}</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h4 class="font-semibold text-slate-500">Stok Menipis</h4>
                    <p class="text-2xl font-bold text-orange-500">${lowStockProducts.length} Produk</p>
                </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Add New Product Form -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold mb-4">Tambah Barang Baru</h3>
                    <form id="add-product-form" class="space-y-4">
                        <div>
                            <label for="productName" class="font-semibold">Nama Barang</label>
                            <input type="text" id="productName" required class="w-full p-2 border rounded-md mt-1">
                        </div>
                        <div>
                            <label for="productCategory" class="font-semibold">Kategori</label>
                            <input type="text" id="productCategory" required class="w-full p-2 border rounded-md mt-1">
                        </div>
                         <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="productPrice" class="font-semibold">Harga</label>
                                <input type="number" id="productPrice" required class="w-full p-2 border rounded-md mt-1">
                            </div>
                            <div>
                                <label for="productStock" class="font-semibold">Stok</label>
                                <input type="number" id="productStock" required class="w-full p-2 border rounded-md mt-1">
                            </div>
                        </div>
                        <div>
                            <label for="productImage" class="font-semibold">Gambar Produk</label>
                            <input type="file" id="productImage" class="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 mt-1">
                        </div>
                        <button type="submit" class="w-full bg-emerald-500 text-white font-bold py-2 rounded-lg hover:bg-emerald-600">Tambah Produk</button>
                    </form>
                </div>

                <!-- History Section -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold mb-4">Riwayat Barang</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold mb-2">Baru Ditambahkan</h4>
                            <div class="h-48 overflow-y-auto border rounded-md p-2">
                                <ul class="divide-y">
                                    ${newProducts.map(p => `
                                        <li class="py-2 text-sm"><strong>${p.name}</strong> - Stok: ${p.stock} (Ditambahkan: ${p.dateAdded})</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Sudah Terjual</h4>
                            <div class="h-48 overflow-y-auto border rounded-md p-2">
                                <ul class="divide-y">
                                    ${soldProducts.map(p => `
                                        <li class="py-2 text-sm"><strong>${p.name}</strong> - Terjual: ${p.sold} unit</li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
};


// --- ROUTER & RENDER LOGIC ---
const app = document.getElementById('app');

const render = () => {
    window.scrollTo(0, 0);
    const hash = window.location.hash || '#home';
    
    if (hash.startsWith('#product/')) {
        state.currentProductId = parseInt(hash.split('/')[1]);
        state.currentPage = 'productDetail';
    } else if (hash.startsWith('#products/category/')) {
        state.currentCategory = decodeURIComponent(hash.split('/')[2]);
        state.currentPage = 'products';
    } else {
        state.currentPage = hash.substring(1) || 'home';
        if(state.currentPage === 'products') state.currentCategory = 'Semua';
    }

    switch(state.currentPage) {
        case 'home':
            app.innerHTML = renderHomePage();
            break;
        case 'products':
            app.innerHTML = renderProductsPage();
            break;

        case 'productDetail':
            app.innerHTML = renderProductDetailPage();
            break;
        case 'cart':
            app.innerHTML = renderCartPage();
            break;
        case 'checkout':
            app.innerHTML = renderCheckoutPage();
            break;
        case 'admin':
            app.innerHTML = renderAdminPage();
            break;
        default:
            app.innerHTML = renderHomePage();
    }
    
    // Re-initialize icons
    lucide.createIcons();
    // Update cart badges
    updateCartBadges();
    // Add event listeners for the current page
    addPageEventListeners();
};

// --- EVENT HANDLERS & LOGIC ---

function addToCart(productId, quantity = 1) {
    const existingItem = state.cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({ productId, quantity });
    }
    showToast(`Produk ditambahkan ke keranjang!`);
    render(); // Re-render to update UI
}

function updateCartQuantity(productId, action) {
    const itemIndex = state.cart.findIndex(item => item.productId === productId);
    if (itemIndex === -1) return;

    if (action === 'increase') {
        state.cart[itemIndex].quantity++;
    } else if (action === 'decrease') {
        state.cart[itemIndex].quantity--;
        if (state.cart[itemIndex].quantity <= 0) {
            state.cart.splice(itemIndex, 1);
        }
    }
    render();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.productId !== productId);
    render();
}

function updateCartBadges() {
    const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const mobileBadge = document.getElementById('cart-badge-mobile');
    const desktopBadge = document.getElementById('cart-badge-desktop');
    
    if (cartItemCount > 0) {
        if(mobileBadge) {
            mobileBadge.textContent = cartItemCount;
            mobileBadge.classList.remove('hidden');
            mobileBadge.classList.add('flex');
        }
        if(desktopBadge) {
            desktopBadge.textContent = cartItemCount;
            desktopBadge.classList.remove('hidden');
        }
    } else {
        if(mobileBadge) mobileBadge.classList.add('hidden');
        if(desktopBadge) desktopBadge.classList.add('hidden');
    }
}

function handleSearch(query) {
    const searchResultsContainer = document.getElementById('search-results');
    const mainProductsView = document.getElementById('main-products-view');
    query = query.toLowerCase();
    
    if (!query) {
        searchResultsContainer.classList.add('hidden');
        mainProductsView.classList.remove('hidden');
        return;
    }
    
    const results = state.products.filter(p => p.name.toLowerCase().includes(query));
    
    mainProductsView.classList.add('hidden');
    searchResultsContainer.classList.remove('hidden');
    
    if (results.length > 0) {
        searchResultsContainer.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Hasil Pencarian untuk "${query}"</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${results.map(p => renderProductCard(p)).join('')}
            </div>
        `;
    } else {
        searchResultsContainer.innerHTML = `<p class="text-center text-slate-500 py-8">Tidak ada produk yang cocok dengan "${query}".</p>`;
    }
    lucide.createIcons();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 md:bottom-auto md:top-24 right-1/2 translate-x-1/2 md:right-8 md:translate-x-0 bg-slate-800 text-white py-2 px-5 rounded-full shadow-lg text-sm z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// --- GLOBAL EVENT LISTENERS ---
function addPageEventListeners() {
    // Universal navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = link.getAttribute('href');
        });
    });

    // Add to cart buttons (on product cards)
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            addToCart(productId);
        });
    });

    // Product detail page logic
    if (state.currentPage === 'productDetail') {
        const quantityInput = document.getElementById('quantity-input');
        const totalPriceEl = document.getElementById('total-price');
        const product = state.products.find(p => p.id === state.currentProductId);
        
        const updateTotalPrice = () => {
            const quantity = parseInt(quantityInput.value);
            totalPriceEl.textContent = formatRupiah(product.price * quantity);
        };
        
        document.querySelectorAll('.quantity-change-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                let quantity = parseInt(quantityInput.value);
                const action = e.currentTarget.dataset.action;
                if(action === 'increase' && quantity < product.stock) quantity++;
                if(action === 'decrease' && quantity > 1) quantity--;
                quantityInput.value = quantity;
                updateTotalPrice();
            });
        });
        quantityInput.addEventListener('change', updateTotalPrice);

        document.querySelector('.add-to-cart-detail-btn').addEventListener('click', (e) => {
             const productId = parseInt(e.currentTarget.dataset.id);
             const quantity = parseInt(quantityInput.value);
             addToCart(productId, quantity);
        });
    }

    // Cart page logic
    if(state.currentPage === 'cart') {
        document.querySelectorAll('.cart-quantity-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const productId = parseInt(e.currentTarget.dataset.id);
                const action = e.currentTarget.dataset.action;
                updateCartQuantity(productId, action);
            });
        });
        document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const productId = parseInt(e.currentTarget.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    // Products page logic
    if (state.currentPage === 'products') {
        document.querySelectorAll('.category-filter-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const category = e.currentTarget.dataset.category;
                state.currentCategory = category;
                render();
            });
        });
    }
    
    // Search functionality
    const searchInputDesktop = document.getElementById('search-input-desktop');
    if (searchInputDesktop) {
        searchInputDesktop.addEventListener('keyup', (e) => handleSearch(e.target.value));
    }
    const searchInputMobile = document.getElementById('search-input-mobile');
    if (searchInputMobile) {
        searchInputMobile.addEventListener('keyup', (e) => handleSearch(e.target.value));
    }

    // Admin form
    if(state.currentPage === 'admin') {
        const addProductForm = document.getElementById('add-product-form');
        addProductForm.addEventListener('submit', e => {
            e.preventDefault();
            const newProduct = {
                id: state.products.length + 1,
                name: document.getElementById('productName').value,
                category: document.getElementById('productCategory').value,
                price: parseInt(document.getElementById('productPrice').value),
                stock: parseInt(document.getElementById('productStock').value),
                sold: 0,
                dateAdded: new Date().toISOString().split('T')[0],
                image: 'https://placehold.co/600x600/e2e8f0/334155?text=New',
                description: 'Deskripsi default untuk produk baru.'
            };
            state.products.push(newProduct);
            showToast('Produk baru berhasil ditambahkan!');
            render(); // Re-render admin page
        });
    }
    
    // Checkout Form
    if(state.currentPage === 'checkout') {
        document.getElementById('checkout-form').addEventListener('submit', e => {
            e.preventDefault();
            showToast('Pesanan berhasil dibuat! (Simulasi)');
            state.cart = []; // Empty the cart
            window.location.hash = '#home'; // Go back to home
        });
    }
}


// --- INITIALIZATION ---
window.addEventListener('hashchange', render);
document.addEventListener('DOMContentLoaded', render);
