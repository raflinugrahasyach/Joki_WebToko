import { getProducts, addProduct, updateProduct, deleteProduct, getProductById } from '../apiService.js';
import { showToast } from '../utils/toast.js';

export const AdminPage = {
    render: async () => `
        <main class="container mx-auto p-4">
            <h1 class="text-3xl font-bold mb-6">Panel Admin</h1>
            <div class="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 class="text-2xl font-semibold mb-4" id="form-title">Tambah Produk Baru</h2>
                <form id="product-form" class="space-y-4">
                    <input type="hidden" id="product-id">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nama Produk</label>
                        <input type="text" id="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                    </div>
                    <div>
                        <label for="price" class="block text-sm font-medium text-gray-700">Harga</label>
                        <input type="number" id="price" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
                    </div>
                    <div>
                        <label for="image" class="block text-sm font-medium text-gray-700">URL Gambar</label>
                        <input type="text" id="image" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    </div>
                    <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea id="description" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                    </div>
                    <div class="flex gap-4">
                        <button type="submit" id="submit-btn" class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Simpan</button>
                        <button type="button" id="cancel-edit-btn" class="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 hidden">Batal</button>
                    </div>
                </form>
            </div>
            <h2 class="text-2xl font-semibold mb-4">Daftar Produk</h2>
            <div id="admin-product-list" class="space-y-4"><p>Memuat...</p></div>
        </main>
    `,
    afterRender: async () => {
        const listEl = document.getElementById('admin-product-list');
        const form = document.getElementById('product-form');
        const formTitle = document.getElementById('form-title');
        const submitBtn = document.getElementById('submit-btn');
        const cancelBtn = document.getElementById('cancel-edit-btn');
        const idInput = document.getElementById('product-id');

        const resetForm = () => {
            form.reset();
            idInput.value = '';
            formTitle.innerText = 'Tambah Produk Baru';
            submitBtn.innerText = 'Simpan';
            cancelBtn.classList.add('hidden');
        };

        const loadProducts = async () => {
            listEl.innerHTML = '<p>Memuat daftar produk...</p>';
            try {
                const products = await getProducts();
                listEl.innerHTML = products.length ? products.map(p => `
                    <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                        <span>${p.name}</span>
                        <div class="space-x-2">
                            <button data-id="${p.id}" class="edit-btn bg-yellow-500 text-white py-1 px-3 rounded">Edit</button>
                            <button data-id="${p.id}" class="delete-btn bg-red-500 text-white py-1 px-3 rounded">Hapus</button>
                        </div>
                    </div>
                `).join('') : '<p>Tidak ada produk.</p>';
            } catch (err) {
                listEl.innerHTML = '<p class="text-red-500">Gagal memuat produk.</p>';
            }
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const productData = {
                name: form.name.value,
                price: parseFloat(form.price.value),
                description: form.description.value,
                image: form.image.value,
            };

            if (idInput.value) {
                await updateProduct(idInput.value, productData);
                showToast('Produk berhasil diperbarui!', 'success');
            } else {
                await addProduct(productData);
                showToast('Produk berhasil ditambahkan!', 'success');
            }
            resetForm();
            loadProducts();
        });

        cancelBtn.addEventListener('click', resetForm);

        listEl.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('delete-btn')) {
                if (confirm('Yakin hapus produk ini?')) {
                    await deleteProduct(id);
                    showToast('Produk berhasil dihapus.', 'info');
                    loadProducts();
                }
            } else if (e.target.classList.contains('edit-btn')) {
                const p = await getProductById(id);
                form.name.value = p.name;
                form.price.value = p.price;
                form.description.value = p.description;
                form.image.value = p.image;
                idInput.value = p.id;
                formTitle.innerText = 'Edit Produk';
                submitBtn.innerText = 'Update';
                cancelBtn.classList.remove('hidden');
                window.scrollTo(0, 0);
            }
        });

        await loadProducts();
    }
};
