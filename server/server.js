import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { initialData } from './initialData.js';

// --- Konfigurasi Database ---
const adapter = new JSONFile('db.json');
const db = new Low(adapter, initialData);
await db.read();

// --- Konfigurasi Server Express ---
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES API ---

// GET: Mendapatkan semua produk
app.get('/api/products', (req, res) => {
    const { products } = db.data;
    res.status(200).json(products);
});

// GET: Mendapatkan satu produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = db.data.products.find(p => p.id === productId);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Produk tidak ditemukan.' });
    }
});

// POST: Menambahkan produk baru
app.post('/api/products', async (req, res) => {
    try {
        const { products } = db.data;
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: req.body.name || 'Produk Baru',
            price: parseFloat(req.body.price) || 0,
            description: req.body.description || '',
            image: req.body.image || 'https://placehold.co/600x400/EEE/31343C?text=Gambar+Produk'
        };
        products.push(newProduct);
        await db.write();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan produk.', error: error.message });
    }
});

// PUT: Memperbarui produk berdasarkan ID
app.put('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const productIndex = db.data.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            const originalProduct = db.data.products[productIndex];
            db.data.products[productIndex] = { ...originalProduct, ...req.body };
            await db.write();
            res.status(200).json(db.data.products[productIndex]);
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan untuk diperbarui.' });
        }
    } catch (error) {
         res.status(500).json({ message: 'Gagal memperbarui produk.', error: error.message });
    }
});

// DELETE: Menghapus produk berdasarkan ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);
        const initialLength = db.data.products.length;
        db.data.products = db.data.products.filter(p => p.id !== productId);
        if (db.data.products.length < initialLength) {
            await db.write();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan untuk dihapus.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus produk.', error: error.message });
    }
});

// --- Menjalankan Server ---
app.listen(port, () => {
    console.log(`🚀 Server API berjalan di http://localhost:${port}`);
});
