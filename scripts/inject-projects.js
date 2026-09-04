// Script to inject projects directly to Supabase using service_role key
// Usage: node scripts/inject-projects.js <SUPABASE_SERVICE_ROLE_KEY>

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eqoeqjsdhpmmmaiagiym.supabase.co';
const serviceKey = process.argv[2] || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.log(`
[PETUNJUK PENGGUNAAN]:
Untuk menyuntikkan data secara langsung lewat terminal Node.js tanpa RLS blocking:
Dapatkan "service_role secret" dari Supabase Dashboard > Project Settings > API.
Lalu jalankan:
  node scripts/inject-projects.js <YOUR_SERVICE_ROLE_KEY>

ATAU cara paling mudah:
Buka Supabase SQL Editor dan jalankan file 'supabase_projects_seed.sql'!
`);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const projects = [
  {
    Title: "HadangMU - Live Scoring & Tournament Management System",
    Year: "2026",
    Description: "Aplikasi penilaian dan skor digital terpadu untuk pertandingan olahraga tradisional Hadang (Gobak Sodor). Memudahkan juri dan peserta melihat skor secara live melalui integrasi meja juri mobile, ruang kontrol admin, dan papan skor TV fullscreen secara real-time.",
    Img: "/projects/hadang-mu.png",
    Link: "https://hadangmu.vercel.app/",
    Github: "https://github.com/Fikriproject/Hadang-MU",
    Features: [
      "Papan Skor TV Fullscreen & Live Scoreboard Real-time",
      "Antarmuka Meja Juri Mobile Responsif & Cepat",
      "Panel Ruang Kontrol Admin & Manajemen Pertandingan",
      "Pembaruan Skor Otomatis Tanpa Reload Halaman",
      "Sinkronisasi Data Real-time Multi-Perangkat (TV, HP, Laptop)"
    ],
    TechStack: ["Next.js", "React", "TailwindCSS", "Vercel", "JavaScript", "Realtime WebSockets"],
    is_published: true,
    order_index: 1
  },
  {
    Title: "Laksana POS - Modern Point of Sales System",
    Year: "2025",
    Description: "Sistem Point of Sales (POS) modern berbasis React & Vite dengan backend PHP & MySQL. Menampilkan transaksi real-time, manajemen produk & stok, laporan penjualan, dan UI/UX responsif.",
    Img: "/projects/pos-kasir.jpeg",
    Link: null,
    Github: "https://github.com/Fikriproject/Laksana-POS-APPS",
    Features: [
      "Transaksi Kasir Cepat & Real-time",
      "Manajemen Produk & Stok Inventaris",
      "Cetak Struk & Riwayat Transaksi",
      "Multi-perangkat (Desktop & Tablet)",
      "Laporan Penjualan & Dashboard Analitik"
    ],
    TechStack: ["React", "Vite", "PHP", "MySQL", "TailwindCSS", "REST API"],
    is_published: true,
    order_index: 2
  },
  {
    Title: "Hydromate - Automatic Plant Watering System",
    Year: "2024",
    Description: "Sistem penyiram tanaman otomatis berbasis IoT yang menggabungkan web dashboard monitoring dengan firmware mikrokontroler telemetri sensor kelembaban tanah dan kendali pompa air secara real-time.",
    Img: "/projects/hydromate.png",
    Link: null,
    Github: "https://github.com/Fikriproject/Angvatar-Aplikasi-web",
    Features: [
      "Monitoring Kelembaban Tanah & Suhu Real-Time",
      "Penyiraman Otomatis Berdasarkan Threshold Sensor",
      "Dashboard Web Monitoring Interaktif",
      "Firmware Kendali Aktuator & Pompa Air",
      "Pencatatan Log Penyiraman & REST API Endpoint"
    ],
    TechStack: ["PHP", "JavaScript", "C++", "Arduino", "ESP8266/ESP32", "MySQL", "IoT Sensors"],
    is_published: true,
    order_index: 3
  },
  {
    Title: "Crash Detector - IoT Accident Detection & Emergency Alert",
    Year: "2026",
    Description: "Sistem pendeteksi insiden tabrakan & kecelakaan kendaraan berbasis IoT MPU-6050 & GPS NEO-6M terhubung dengan Web Dashboard real-time, emergency trigger, log rute perjalanan, dan safe-mode recovery.",
    Img: "/projects/crash-detektor.jpeg",
    Link: null,
    Github: "https://github.com/Fikriproject/crashdetector",
    Features: [
      "Deteksi Benturan Otomatis (G-force & Gyro MPU-6050)",
      "Geolokasi Presisi & Rute via GPS NEO-6M",
      "Emergency Alert System di Web Dashboard",
      "Watchdog Timer (WDT) & Safe-Mode Recovery",
      "Data Logger MicroSD & Postman Test Collection"
    ],
    TechStack: ["C++", "Arduino", "ESP32", "PHP", "MySQL", "GPS NEO-6M", "MPU-6050", "Postman"],
    is_published: true,
    order_index: 4
  },
  {
    Title: "Tape Ketan Bakung Cirebon - UMKM Landing Page",
    Year: "2026",
    Description: "Landing page promosi dan branding digital untuk produk Tape Ketan Bakung khas Cirebon. Dilengkapi showcase varian produk, visual nusantara, integrasi WhatsApp order, dan optimasi performa web.",
    Img: "/projects/tape-ketan-bakung.jpeg",
    Link: "https://tapeketanbakungcirebon.netlify.app/",
    Github: "https://github.com/Fikriproject/TKBLandingPage",
    Features: [
      "Katalog & Varian Produk Tape Ketan Bakung",
      "Pemesanan Langsung via WhatsApp",
      "Desain Responsif Mobile-Friendly",
      "Informasi Legalitas Usaha (NIB & Halal)",
      "Optimasi SEO & Hosting di Netlify"
    ],
    TechStack: ["HTML5", "CSS3", "JavaScript", "TailwindCSS", "Netlify", "SEO"],
    is_published: true,
    order_index: 5
  },
  {
    Title: "Ionic MQTT - Realtime Sensor Telemetry & Monitoring App",
    Year: "2025",
    Description: "Aplikasi mobile cross-platform berbasis Ionic Framework & Angular yang terhubung langsung ke broker MQTT untuk pemantauan telemetri suhu dan sensor IoT secara real-time dengan latensi rendah.",
    Img: "/projects/ionic-mqtt-thermora.jpeg",
    Link: null,
    Github: "https://github.com/Fikriproject/Ionic-mqtt-monitoring-test",
    Features: [
      "Koneksi Real-time ke Broker MQTT (Pub/Sub)",
      "Visualisasi Telemetri Suhu & Sensor Realtime",
      "Notifikasi & Alert Ambang Batas",
      "Arsitektur Modular Angular & TypeScript",
      "Dukungan Cross-Platform Android & iOS via Capacitor"
    ],
    TechStack: ["Ionic", "Angular", "TypeScript", "MQTT", "Capacitor", "SCSS"],
    is_published: true,
    order_index: 6
  },
  {
    Title: "Warkop Teras Tengah - Coffee Shop Commercial Landing Page",
    Year: "2026",
    Description: "Landing page promosi dan branding digital untuk kedai kopi modern Warkop Teras Tengah. Dilengkapi showcase menu kopi andalan, interactive coffee selector, integrasi reservasi/order, dan desain dark vintage yang hangat.",
    Img: "/projects/caffe-teras-tengah.jpeg",
    Link: null,
    Github: "https://github.com/Fikriproject/Landing-Page-warkop-teras-tengah",
    Features: [
      "Katalog Menu Kopi & Minuman Signature",
      "Interactive Coffee & Beverage Showcase",
      "Informasi Jam Operasional & Lokasi Kedai",
      "Desain Dark Aesthetic & Warm Vintage",
      "Integrasi Fast Contact & Social Links"
    ],
    TechStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox/Grid"],
    is_published: true,
    order_index: 7
  },
  {
    Title: "PWS KIA Puskesmas Plumbon - Medical Records System",
    Year: "2025",
    Description: "Proyek kolaborasi bersama Tim IT RSUD Arjawinangun dalam membangun sistem informasi web rekam medis digital untuk Puskesmas Plumbon. Berperan sebagai Front-End Developer dalam menyusun tabel data pemantauan dan formulir inputan rekam medis terstandarisasi.",
    Img: "/projects/pws-kia-plumbon.png",
    Link: null,
    Github: null,
    Features: [
      "Formulir Input & Entri Rekam Medis Pasien Terstandar",
      "Penyusunan Tabel Data Pemantauan KIA (Kesehatan Ibu & Anak)",
      "Antarmuka Responsif & Ergonomis untuk Tenaga Medis",
      "Validasi Data Inputan Rekam Medis & Riwayat Pasien",
      "Kolaborasi Sistem Bersama Tim IT RSUD Arjawinangun"
    ],
    TechStack: ["PHP", "Bootstrap", "JavaScript", "HTML5", "CSS3", "MySQL"],
    is_published: true,
    order_index: 8
  },
  {
    Title: "Smart Hydro - Real-time IoT Hydroponic Monitoring",
    Year: "2026",
    Description: "Proyek kolaborasi sistem monitoring hidroponik pintar berbasis IoT secara real-time. Berkontribusi dalam membangun integrasi komunikasi telemetri data antara hardware sensor dan website dashboard serta merumuskan kalibrasi & normalisasi pembacaan sensor.",
    Img: "/projects/smart-hydro-iot.png",
    Link: "https://hidroponnik-pwa.vercel.app/",
    Github: "https://github.com/Antares023/hidroponnik-pwa",
    Features: [
      "Integrasi Komunikasi Real-time Perangkat IoT ke Web Dashboard",
      "Kalibrasi & Normalisasi Data Telemetri Sensor (pH, TDS, Suhu Air)",
      "Otomatisasi Sirkulasi Nutrisi & Kendali Pompa Pintar",
      "Penjadwalan Nutrisi Terpadu & Notifikasi Sistem",
      "Progressive Web App (PWA) Responsif & Cepat"
    ],
    TechStack: ["IoT Sensors", "WebSockets / MQTT", "Next.js", "PWA", "TailwindCSS", "C++ / ESP32"],
    is_published: true,
    order_index: 9
  }
];

async function run() {
  console.log('Menyuntikkan 9 project ke Supabase...');
  for (const p of projects) {
    const { data, error } = await supabase.from('projects').insert(p).select();
    if (error) {
      console.error(`Gagal insert "${p.Title}":`, error.message);
    } else {
      console.log(`Berhasil insert: ${p.Title} (${p.Year})`);
    }
  }
  console.log('Selesai!');
}

run();
