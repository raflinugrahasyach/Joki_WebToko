# Proyek Website Toko Sembako Online

Ini adalah proyek website e-commerce untuk toko sembako yang dibuat menggunakan HTML, Tailwind CSS, dan JavaScript murni. Proyek ini bersifat *client-side* (hanya frontend) dan menggunakan data dummy yang tersimpan dalam file JavaScript untuk menyimulasikan fungsionalitas backend.

## Struktur File


.
├── index.html              # File HTML utama sebagai kerangka aplikasi
├── assets/
│   ├── css/
│   │   └── style.css       # File CSS kustom (saat ini kosong)
│   └── js/
│       └── main.js         # File JavaScript utama yang berisi semua logika aplikasi
└── README.md               # File ini


## Fitur Utama

- **Desain Responsif (Mobile First):** Tampilan dioptimalkan untuk perangkat mobile dan desktop.
- **Single Page Application (SPA):** Navigasi antar halaman terasa cepat tanpa perlu reload, menggunakan hash routing (`#`).
- **Halaman Dinamis:** Semua konten dirender menggunakan JavaScript, memungkinkan pembaruan UI secara instan.
- **Manajemen Keranjang:** Tambah, ubah jumlah, dan hapus barang dari keranjang belanja. Total harga diperbarui secara otomatis.
- **Fitur Produk:** Tampilan daftar produk, filter per kategori, dan halaman detail untuk setiap produk.
- **Pencarian Produk:** Fitur pencarian real-time untuk menemukan produk berdasarkan nama.
- **Panel Admin Sederhana:**
    - Dashboard dengan statistik penjualan.
    - Form untuk menambah produk baru.
    - Riwayat barang yang ditambahkan dan terjual.
- **Proses Checkout (Simulasi):** Form data pembeli dan pilihan metode pembayaran.

## Cara Menjalankan

1.  **Simpan Semua File:** Pastikan `index.html`, `assets/css/style.css`, dan `assets/js/main.js` disimpan sesuai dengan struktur folder di atas.
2.  **Buka `index.html`:** Cukup buka file `index.html` di browser favorit Anda (seperti Chrome, Firefox, atau Edge).
3.  **Selesai!** Website akan langsung berjalan secara lokal di browser Anda.

## Teknologi yang Digunakan

-   **HTML5:** Untuk struktur dan markup konten.
-   **Tailwind CSS v3:** Untuk styling modern dan responsif dengan pendekatan *utility-first*. Dimuat melalui CDN.
-   **JavaScript (ES6+):** Untuk semua logika interaktif, termasuk routing, manipulasi DOM, dan manajemen state aplikasi.
-   **Lucide Icons:** Untuk ikon-ikon yang bersih dan modern. Dimuat melalui CDN.
