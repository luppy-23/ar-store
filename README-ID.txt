AR STORE — FITUR TRANSAKSI & NOMINAL MANUAL

Isi paket:
- index.html: website hitam-orange Anomali Roblox.
- assets/: logo Anomali Roblox.
- functions/api/users.js dan avatar.js: API proxy pencarian profil/avatar Roblox untuk Cloudflare Pages.

Fitur baru:
1. Setiap pesanan membuat kode AR-YYYYMMDD-XXXXXX.
2. Menu Cek Transaksi mencari kode dan menampilkan detail/status.
3. Nominal manual Robux dengan harga otomatis Rp160 per Robux (100 = Rp16.000).
4. Harga nominal manual ditampilkan di samping kolom nominal.

Deploy: Upload semua isi paket ke root repository GitHub, lalu hubungkan repository ke Cloudflare Pages. Framework None, build command kosong, output directory /.

PENTING: Penyimpanan transaksi versi ini memakai localStorage browser. Kode transaksi dapat dicek dari browser/perangkat yang sama. Untuk transaksi lintas perangkat dan status pembayaran real-time, perlu database backend (mis. Cloudflare D1/KV) dan integrasi payment gateway. Status awal pesanan adalah Menunggu Pembayaran; sistem ini belum menerima/memverifikasi pembayaran atau mengirim Robux secara otomatis.
