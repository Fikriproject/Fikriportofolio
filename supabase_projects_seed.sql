-- =========================================================================
-- SQL SCRIPT: SUNTIK 6 PROJECT BESERTA TAHUN KE SUPABASE (public.projects)
-- =========================================================================
-- Cara Penggunaan:
-- 1. Buka dashboard Supabase: https://supabase.com/dashboard/project/eqoeqjsdhpmmmaiagiym
-- 2. Masuk ke menu "SQL Editor" di sidebar kiri
-- 3. Klik "New Query", paste seluruh isi script ini, lalu klik tombol "Run" (atau Ctrl+Enter).
-- =========================================================================

-- 1. Pastikan kolom "Year" tersedia di tabel public.projects
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS "Year" text;

-- 2. Hapus project demo sebelumnya jika ingin tampilan bersih (opsional)
-- DELETE FROM public.projects;

-- 3. Suntik 6 project unggulan beserta tahun pembuatan
INSERT INTO public.projects (
  "Title", 
  "Description", 
  "Img", 
  "Link", 
  "Github", 
  "Features", 
  "TechStack", 
  "Year", 
  is_published, 
  order_index
)
VALUES
(
  'Laksana POS - Modern Point of Sales System',
  'Sistem Point of Sales (POS) modern berbasis React & Vite dengan backend PHP & MySQL. Menampilkan transaksi real-time, manajemen produk & stok, laporan penjualan, dan UI/UX responsif.',
  '/projects/pos-kasir.jpeg',
  NULL,
  'https://github.com/Fikriproject/Laksana-POS-APPS',
  '["Transaksi Kasir Cepat & Real-time", "Manajemen Produk & Stok Inventaris", "Cetak Struk & Riwayat Transaksi", "Multi-perangkat (Desktop & Tablet)", "Laporan Penjualan & Dashboard Analitik"]'::jsonb,
  '["React", "Vite", "PHP", "MySQL", "TailwindCSS", "REST API"]'::jsonb,
  '2025',
  true,
  1
),
(
  'Hydromate - Automatic Plant Watering System',
  'Sistem penyiram tanaman otomatis berbasis IoT yang menggabungkan web dashboard monitoring dengan firmware mikrokontroler telemetri sensor kelembaban tanah dan kendali pompa air secara real-time.',
  '/projects/hydromate.png',
  NULL,
  'https://github.com/Fikriproject/Angvatar-Aplikasi-web',
  '["Monitoring Kelembaban Tanah & Suhu Real-Time", "Penyiraman Otomatis Berdasarkan Threshold Sensor", "Dashboard Web Monitoring Interaktif", "Firmware Kendali Aktuator & Pompa Air", "Pencatatan Log Penyiraman & REST API Endpoint"]'::jsonb,
  '["PHP", "JavaScript", "C++", "Arduino", "ESP8266/ESP32", "MySQL", "IoT Sensors"]'::jsonb,
  '2024',
  true,
  2
),
(
  'Crash Detector - IoT Accident Detection & Emergency Alert',
  'Sistem pendeteksi insiden tabrakan & kecelakaan kendaraan berbasis IoT MPU-6050 & GPS NEO-6M terhubung dengan Web Dashboard real-time, emergency trigger, log rute perjalanan, dan safe-mode recovery.',
  '/projects/crash-detektor.jpeg',
  NULL,
  'https://github.com/Fikriproject/crashdetector',
  '["Deteksi Benturan Otomatis (G-force & Gyro MPU-6050)", "Geolokasi Presisi & Rute via GPS NEO-6M", "Emergency Alert System di Web Dashboard", "Watchdog Timer (WDT) & Safe-Mode Recovery", "Data Logger MicroSD & Postman Test Collection"]'::jsonb,
  '["C++", "Arduino", "ESP32", "PHP", "MySQL", "GPS NEO-6M", "MPU-6050", "Postman"]'::jsonb,
  '2026',
  true,
  3
),
(
  'Tape Ketan Bakung Cirebon - UMKM Landing Page',
  'Landing page promosi dan branding digital untuk produk Tape Ketan Bakung khas Cirebon. Dilengkapi showcase varian produk, visual nusantara, integrasi WhatsApp order, dan optimasi performa web.',
  '/projects/tape-ketan-bakung.jpeg',
  'https://tapeketanbakungcirebon.netlify.app/',
  'https://github.com/Fikriproject/TKBLandingPage',
  '["Katalog & Varian Produk Tape Ketan Bakung", "Pemesanan Langsung via WhatsApp", "Desain Responsif Mobile-Friendly", "Informasi Legalitas Usaha (NIB & Halal)", "Optimasi SEO & Hosting di Netlify"]'::jsonb,
  '["HTML5", "CSS3", "JavaScript", "TailwindCSS", "Netlify", "SEO"]'::jsonb,
  '2026',
  true,
  4
),
(
  'Ionic MQTT - Realtime Sensor Telemetry & Monitoring App',
  'Aplikasi mobile cross-platform berbasis Ionic Framework & Angular yang terhubung langsung ke broker MQTT untuk pemantauan telemetri suhu dan sensor IoT secara real-time dengan latensi rendah.',
  '/projects/ionic-mqtt-thermora.jpeg',
  NULL,
  'https://github.com/Fikriproject/Ionic-mqtt-monitoring-test',
  '["Koneksi Real-time ke Broker MQTT (Pub/Sub)", "Visualisasi Telemetri Suhu & Sensor Realtime", "Notifikasi & Alert Ambang Batas", "Arsitektur Modular Angular & TypeScript", "Dukungan Cross-Platform Android & iOS via Capacitor"]'::jsonb,
  '["Ionic", "Angular", "TypeScript", "MQTT", "Capacitor", "SCSS"]'::jsonb,
  '2025',
  true,
  5
),
(
  'Warkop Teras Tengah - Coffee Shop Commercial Landing Page',
  'Landing page promosi dan branding digital untuk kedai kopi modern Warkop Teras Tengah. Dilengkapi showcase menu kopi andalan, interactive coffee selector, integrasi reservasi/order, dan desain dark vintage yang hangat.',
  '/projects/caffe-teras-tengah.jpeg',
  NULL,
  'https://github.com/Fikriproject/Landing-Page-warkop-teras-tengah',
  '["Katalog Menu Kopi & Minuman Signature", "Interactive Coffee & Beverage Showcase", "Informasi Jam Operasional & Lokasi Kedai", "Desain Dark Aesthetic & Warm Vintage", "Integrasi Fast Contact & Social Links"]'::jsonb,
  '["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox/Grid"]'::jsonb,
  '2026',
  true,
  6
),
(
  'PWS KIA Puskesmas Plumbon - Medical Records System',
  'Proyek kolaborasi bersama Tim IT RSUD Arjawinangun dalam membangun sistem informasi web rekam medis digital untuk Puskesmas Plumbon. Berperan di bidang Embedded Systems & Web Development dalam menyusun tabel data pemantauan dan formulir inputan rekam medis terstandarisasi.',
  '/projects/pws-kia-plumbon.png',
  NULL,
  NULL,
  '["Formulir Input & Entri Rekam Medis Pasien Terstandar", "Penyusunan Tabel Data Pemantauan KIA (Kesehatan Ibu & Anak)", "Antarmuka Responsif & Ergonomis untuk Tenaga Medis", "Validasi Data Inputan Rekam Medis & Riwayat Pasien", "Kolaborasi Sistem Bersama Tim IT RSUD Arjawinangun"]'::jsonb,
  '["PHP", "Bootstrap", "JavaScript", "HTML5", "CSS3", "MySQL"]'::jsonb,
  '2025',
  true,
  7
),
(
  'Smart Hydro - Real-time IoT Hydroponic Monitoring',
  'Proyek kolaborasi sistem monitoring hidroponik pintar berbasis IoT secara real-time. Berkontribusi dalam membangun integrasi komunikasi telemetri data antara hardware sensor dan website dashboard serta merumuskan kalibrasi & normalisasi pembacaan sensor.',
  '/projects/smart-hydro-iot.png',
  'https://hidroponnik-pwa.vercel.app/',
  'https://github.com/Antares023/hidroponnik-pwa',
  '["Integrasi Komunikasi Real-time Perangkat IoT ke Web Dashboard", "Kalibrasi & Normalisasi Data Telemetri Sensor (pH, TDS, Suhu Air)", "Otomatisasi Sirkulasi Nutrisi & Kendali Pompa Pintar", "Penjadwalan Nutrisi Terpadu & Notifikasi Sistem", "Progressive Web App (PWA) Responsif & Cepat"]'::jsonb,
  '["IoT Sensors", "WebSockets / MQTT", "Next.js", "PWA", "TailwindCSS", "C++ / ESP32"]'::jsonb,
  '2026',
  true,
  8
);

-- Tampilkan konfirmasi hasil
SELECT id, "Title", "Year", "Link", "Github" FROM public.projects ORDER BY id ASC;
