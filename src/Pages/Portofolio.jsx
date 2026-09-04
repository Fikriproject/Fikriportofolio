import React, { useEffect, useState, useCallback } from "react";

import { supabase } from "../supabase"; 

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks disesuaikan dengan gambar
const techStacks = [
  // Row 1
  { icon: "cplusplus.svg", language: "C++", level: "Advanced" },
  { icon: "arduino.svg", language: "Arduino", level: "Advanced" },
  { icon: "espressif.svg", language: "ESP8266", level: "Advanced" },
  { icon: "espressif.svg", language: "ESP32", level: "Advanced" },
  { icon: "espressif.svg", language: "ESP32-CAM", level: "Intermediate" },
  { icon: "html.svg", language: "HTML", level: "Advanced" },

  // Row 2
  { icon: "css.svg", language: "CSS", level: "Advanced" },
  { icon: "bootstrap.svg", language: "Bootstrap", level: "Advanced" },
  { icon: "javascript.svg", language: "JavaScript", level: "Advanced" },
  { icon: "nodejs.svg", language: "Node.js", level: "Advanced" },
  { icon: "php.svg", language: "PHP", level: "Intermediate" },
  { icon: "laravel.svg", language: "Laravel", level: "Intermediate" },

  // Row 3
  { icon: "codeigniter.svg", language: "CodeIgniter", level: "Beginner" },
  { icon: "vite.svg", language: "Vite", level: "Advanced" },
  { icon: "python.svg", language: "Python", level: "Advanced" },
  { icon: "tensorflow.svg", language: "TensorFlow", level: "Intermediate" },
  { icon: "yolo.svg", language: "YOLO", level: "Intermediate" },
  { icon: "mysql.svg", language: "MySQL", level: "Advanced" },

  // Row 4
  { icon: "firebase.svg", language: "Firebase", level: "Intermediate" },
  { icon: "github.svg", language: "GitHub", level: "Advanced" },
  { icon: "vercel.svg", language: "Vercel", level: "Advanced" },
  { icon: "laragon.svg", language: "Laragon", level: "Advanced" },
  { icon: "postman.svg", language: "Postman", level: "Advanced" },
  { icon: "mqtt.svg", language: "MQTT", level: "Advanced" },
];

export const DEFAULT_PROJECTS = [
  {
    id: 1,
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
    TechStack: ["React", "Vite", "PHP", "MySQL", "TailwindCSS", "REST API"]
  },
  {
    id: 2,
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
    TechStack: ["PHP", "JavaScript", "C++", "Arduino", "ESP8266/ESP32", "MySQL", "IoT Sensors"]
  },
  {
    id: 3,
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
    TechStack: ["C++", "Arduino", "ESP32", "PHP", "MySQL", "GPS NEO-6M", "MPU-6050", "Postman"]
  },
  {
    id: 4,
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
    TechStack: ["HTML5", "CSS3", "JavaScript", "TailwindCSS", "Netlify", "SEO"]
  },
  {
    id: 5,
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
    TechStack: ["Ionic", "Angular", "TypeScript", "MQTT", "Capacitor", "SCSS"]
  },
  {
    id: 6,
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
    TechStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox/Grid"]
  },
  {
    id: 7,
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
    TechStack: ["PHP", "Bootstrap", "JavaScript", "HTML5", "CSS3", "MySQL"]
  },
  {
    id: 8,
    Title: "Smart Hydro - Real-time IoT Hydroponic Monitoring",
    Year: "2026",
    Description: "Proyek kolaborasi sistem monitoring hidroponik pintar berbasis IoT secara real-time. Berperan dalam membangun integrasi komunikasi telemetri data antara hardware sensor dan website dashboard serta merumuskan kalibrasi & normalisasi pembacaan sensor.",
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
    TechStack: ["IoT Sensors", "WebSockets / MQTT", "Next.js", "PWA", "TailwindCSS", "C++ / ESP32"]
  }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari Supabase secara paralel
      const [projectsResponse, certificatesResponse] = await Promise.all([
        supabase.from("projects").select("*").order('id', { ascending: false }),
        supabase.from("certificates").select("*").order('id', { ascending: false }), 
      ]);

      // Supabase mengembalikan data dalam properti 'data'
      const rawProjectData = projectsResponse.data || [];
      const projectData = rawProjectData.length > 0 ? rawProjectData : DEFAULT_PROJECTS;
      const certificateData = certificatesResponse.data || [];

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      
      // Dispatch custom event to notify other components (like About)
      window.dispatchEvent(new Event("portfolioDataUpdated"));
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem("projects", JSON.stringify(DEFAULT_PROJECTS));
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#0B0F17] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#06b6d4]">
          <span style={{
            color: '#2563eb',
            backgroundImage: 'linear-gradient(45deg, #2563eb 10%, #06b6d4 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(37, 99, 235, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(37, 99, 235, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(6, 182, 212, 0.25))",
                  boxShadow: "0 4px 15px -3px rgba(37, 99, 235, 0.2)",
                  "& .lucide": {
                    color: "#38bdf8",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5 transition-all duration-300" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                      Year={project.Year}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} Title={certificate.Title} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6 gap-4">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} Level={stack.level} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}