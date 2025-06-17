import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import { products as initialProducts } from './initialData.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const defaultData = { products: initialProducts, orders: [] };
const db = await JSONFilePreset('db.json', defaultData);

// API Endpoint untuk mendapatkan semua produk
app.get('/api/products', (req, res) => {
  res.json(db.data.products);
});

// API Endpoint untuk mendapatkan produk tunggal berdasarkan ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = db.data.products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
});

// API Endpoint untuk menambah produk baru
app.post('/api/products', async (req, res) => {
    const { name, category, price, stock, image, description } = req.body;

    if (!name || !category || !price || !stock) {
        return res.status(400).json({ message: 'Data produk tidak lengkap' });
    }

    const newProduct = {
        id: db.data.products.length > 0 ? Math.max(...db.data.products.map(p => p.id)) + 1 : 1,
        name,
        category,
        price: parseFloat(price),
        stock: parseInt(stock),
        image: image || 'https://placehold.co/600x600/e2e8f0/334155?text=New',
        description: description || 'Deskripsi produk belum tersedia.',
        sold: 0,
        dateAdded: new Date().toISOString().split('T')[0]
    };

    db.data.products.push(newProduct);
    await db.write();
    res.status(201).json(newProduct);
});


// API Endpoint untuk membuat pesanan baru
app.post('/api/orders', async (req, res) => {
    const { customerData, cartItems } = req.body;

    if (!customerData || !cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: 'Data pesanan tidak lengkap' });
    }

    // Gunakan transaksi untuk memastikan konsistensi data
    try {
        const tempProducts = JSON.parse(JSON.stringify(db.data.products)); // Buat salinan sementara

        cartItems.forEach(item => {
            const productInDb = tempProducts.find(p => p.id === item.productId);
            if (!productInDb) {
                throw new Error(`Produk dengan ID ${item.productId} tidak ditemukan.`);
            }
            if (productInDb.stock < item.quantity) {
                throw new Error(`Stok untuk produk "${productInDb.name}" tidak mencukupi. Sisa ${productInDb.stock}.`);
            }
            productInDb.stock -= item.quantity;
            productInDb.sold += item.quantity;
        });

        // Jika semua valid, update database asli
        db.data.products = tempProducts;

        const newOrder = {
            id: Date.now(),
            ...customerData,
            items: cartItems,
            orderDate: new Date().toISOString()
        };
        db.data.orders.push(newOrder);

        await db.write();

        res.status(201).json({ message: 'Pesanan berhasil dibuat!', order: newOrder });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API Endpoint untuk mendapatkan riwayat penjualan dan barang baru
app.get('/api/history', (req, res) => {
    const soldProducts = [...db.data.products]
        .filter(p => p.sold > 0)
        .sort((a, b) => b.sold - a.sold);

    const newProducts = [...db.data.products]
        .sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    res.json({ soldProducts, newProducts });
});


app.listen(PORT, () => {
  console.log(`🚀 Server SembakoNOW berjalan di http://localhost:${PORT}`);
});
