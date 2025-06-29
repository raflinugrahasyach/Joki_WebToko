import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import { products as initialProducts } from './initialData.js';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import fs from 'fs';

console.log("Server script starting...");

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// --- PERBAIKAN DATABASE UNTUK VERCEL (Sudah Benar) ---
console.log("Initializing database path...");
const dbPath = process.env.VERCEL ? path.join(os.tmpdir(), 'db.json') : path.join(__dirname, 'db.json');
console.log(`Database path set to: ${dbPath}`);

if (process.env.VERCEL && !fs.existsSync(dbPath)) {
    console.log("db.json not found in /tmp, creating a new one...");
    fs.writeFileSync(dbPath, JSON.stringify({ products: initialProducts, orders: [] }));
    console.log("db.json created successfully in /tmp.");
}

const defaultData = { products: initialProducts, orders: [] };
const db = await JSONFilePreset(dbPath, defaultData);
console.log("Database initialized successfully.");

// =================================================================
// ===== PERBAIKAN KUNCI: PATH UNTUK FILE STATIS & FRONTEND =====
// =================================================================
// Daripada '../client', kita gunakan path absolut dari root proyek di Vercel.
const clientPath = path.resolve(process.cwd(), 'client');
console.log(`Path to client folder resolved to: ${clientPath}`);
app.use(express.static(clientPath));


// === DEFINISI API ENDPOINTS (Tidak ada perubahan) ===
app.get('/api/products', async (req, res) => {
    console.log("GET /api/products hit");
    await db.read();
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
    if (!customerData || !cartItems || !cartItems.length) return res.status(400).json({ message: 'Data pesanan tidak lengkap' });
    try {
        await db.read();
        cartItems.forEach(item => {
            const productInDb = db.data.products.find(p => p.id === item.productId);
            if (productInDb) {
                if (productInDb.stock >= item.quantity) {
                    productInDb.stock -= item.quantity;
                    productInDb.sold += item.quantity;
                } else { throw new Error(`Stok untuk ${productInDb.name} tidak mencukupi.`); }
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

app.post('/api/products', async (req, res) => {
    const { name, category, price, stock } = req.body;
    if (!name || !category || !price || !stock) return res.status(400).json({ message: 'Data produk tidak lengkap' });
    await db.read();
    const newProduct = { id: (db.data.products[db.data.products.length-1]?.id || 0) + 1, name, category, price: parseFloat(price), stock: parseInt(stock), image: 'https://placehold.co/600x600/e2e8f0/334155?text=New', description: 'Deskripsi baru.', sold: 0, dateAdded: new Date().toISOString().split('T')[0] };
    db.data.products.push(newProduct);
    await db.write();
    res.status(201).json(newProduct);
});

app.get('/api/history', async (req, res) => {
    await db.read();
    const soldProducts = [...db.data.products].filter(p => p.sold > 0).sort((a, b) => b.sold - a.sold);
    const newProducts = [...db.data.products].sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    res.json({ soldProducts, newProducts });
});


// =================================================================
// ===== PERBAIKAN KUNCI: CATCH-ALL ROUTE UNTUK FRONTEND =====
// =================================================================
app.get('*', (req, res) => {
    // Kita pastikan untuk menyajikan index.html dari path yang sudah kita perbaiki.
    const indexPath = path.join(clientPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Client entry point (index.html) not found at path: ' + indexPath);
    }
});

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server SembakoNOW berjalan di port ${PORT}`);
});