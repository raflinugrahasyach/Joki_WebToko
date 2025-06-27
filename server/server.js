import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import { products as initialProducts } from './initialData.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os'; // <-- BARU: Impor modul 'os'

// Konfigurasi Server
const app = express();
const PORT = process.env.PORT || 3000;

// Setup __dirname untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// --- PERBAIKAN PENTING UNTUK VERCEL ---
// Tentukan path database: gunakan folder /tmp di Vercel, atau folder lokal saat development
const dbPath = process.env.VERCEL ? path.join(os.tmpdir(), 'db.json') : path.join(__dirname, 'db.json');
const defaultData = { products: initialProducts, orders: [] };
const db = await JSONFilePreset(dbPath, defaultData);


// --- Sajikan file statis dari folder client ---
app.use(express.static(path.join(__dirname, '../client')));


// === DEFINISI API ENDPOINTS (Tidak ada perubahan di sini) ===
app.get('/api/products', (req, res) => {
  res.json(db.data.products);
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = db.data.products.find(p => p.id === productId);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Produk tidak ditemukan' });
});

app.post('/api/orders', async (req, res) => {
    const { customerData, cartItems } = req.body;
    if (!customerData || !cartItems || !cartItems.length) {
        return res.status(400).json({ message: 'Data pesanan tidak lengkap' });
    }
    try {
        // Operasi database...
        await db.read(); // Baca data terbaru sebelum memodifikasi
        cartItems.forEach(item => {
            const productInDb = db.data.products.find(p => p.id === item.productId);
            if (productInDb) {
                if (productInDb.stock >= item.quantity) {
                    productInDb.stock -= item.quantity;
                    productInDb.sold += item.quantity;
                } else {
                    throw new Error(`Stok untuk ${productInDb.name} tidak mencukupi.`);
                }
            }
        });
        const newOrder = { id: Date.now(), ...customerData, items: cartItems, orderDate: new Date().toISOString() };
        db.data.orders.push(newOrder);
        await db.write();
        res.status(201).json({ message: 'Pesanan berhasil dibuat!', order: newOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ... (Endpoint lainnya tetap sama) ...
app.post('/api/products', async (req, res) => {
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock) return res.status(400).json({ message: 'Data produk tidak lengkap' });
    await db.read();
    const newProduct = { id: (db.data.products[db.data.products.length-1]?.id || 0) + 1, name, category, price: parseFloat(price), stock: parseInt(stock), image: 'https://placehold.co/600x600/e2e8f0/334155?text=New', description: 'Deskripsi baru.', sold: 0, dateAdded: new Date().toISOString().split('T')[0] };
    db.data.products.push(newProduct);
    await db.write();
    res.status(201).json(newProduct);
});

app.get('/api/history', (req, res) => {
    const soldProducts = [...db.data.products].filter(p => p.sold > 0).sort((a, b) => b.sold - a.sold);
    const newProducts = [...db.data.products].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    res.json({ soldProducts, newProducts });
});


// --- Catch-all route untuk menyajikan index.html dari frontend ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

// Menjalankan Server
app.listen(PORT, () => {
  console.log(`🚀 Server SembakoNOW berjalan di http://localhost:${PORT}`);
});
