# 🛡️ Sistem Informasi Skrining Penyakit Menular (TB & HIV) Terintegrasi
### Balai Kekarantinaan Kesehatan Class I Cilacap

Aplikasi web berbasis React.js modern yang dikembangkan untuk memfasilitasi deteksi dini, pendaftaran skrining mandiri, dan transparansi sertifikasi kesehatan bagi awak kapal (ABK), masyarakat pelabuhan, dan pemudik di wilayah kerja Pelabuhan Tanjung Intan Cilacap.

Proyek ini dibuat untuk memenuhi **Tugas Besar I (UTS) Mata Kuliah Perancangan dan Pemrograman Web** — Fakultas Informatika, Telkom University.

---

## 🛠️ Tech Stack & Dependencies

* **Frontend Framework:** React.js (Vite)
* **Styling & UI:** Tailwind CSS v3
* **HTTP Client:** Axios (Data Fetching Mock API)
* **Icons:** Lucide React
* **Routing:** React Router DOM v6
* **Language:** JavaScript (ES6+)

---

## 👥 Pembagian Tugas & Anggota Kelompok

**Kelas:** SE-0801  
**Program Studi:** S1 Rekayasa Perangkat Lunak  

| Nama Anggota | NIM | Branch Git | Responsibilitas & Garapan Halaman |
| :--- | :--- | :--- | :--- |
| **Khosy AlBuchary** *(Lead)* | 103122400030 | `feature/home-portal` | **1. Beranda (`/`)** — Hero section, Live Stat Counter Widget, Alur Skrining.<br>**2. Katalog Layanan (`/layanan`)** — Live search bar, category filter pills, responsive grid cards, pagination.<br>*Setup core architecture, layout global (Navbar/Footer), & routing.* |
| **Azka** | - | `feature/skrining-form` | **3. Form Skrining Mandiri (`/skrining`)** — Form interaktif multi-step, client-side validation (NIK/Paspor/Email).<br>**4. Reservasi & Jadwal (`/jadwal/:id`)** — Pemilihan slot lokasi/pos laboratorium BKK Cilacap. |
| **Raihan Dhimas S.N** | 103122400012 | `feature/hasil-monitoring` | **5. Riwayat & Sertifikat (`/riwayat`)** — Status Clearance Badge & Modal QR Code E-Sertifikat Karantina.<br>**6. Pusat Bantuan & FAQ (`/kontak`)** — Accessible Accordion FAQ & Form pengaduan interaktif. |

---

## 📌 Fitur Utama Aplikasi

1. **Live Stat Counter API:** Mengonsumsi data dinamis statistik populasi terskrining TB & HIV pelabuhan.
2. **Katalog & Filter Layanan:** Pencarian kata kunci real-time, penyaringan kategori medis, dan paginasi interaktif.
3. **Multi-Step Form Skrining:** Form pendaftaran deteksi dini dengan validasi input client-side.
4. **UI Loading Skeleton & Error Retry:** Penanganan state UX profesional saat data dimuat atau terjadi kendala jaringan.
5. **E-Sertifikat Karantina (QR Code):** Verifikasi status bebas penyakit menular berbasis digital.
6. **Accessible Navigation:** Komponen responsif multi-device (Mobile/Tablet/Desktop) dengan navigasi keyboard dasar.

---

## 🚀 Petunjuk Setup & Pengoperasian (Setup Instructions)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

### 1. Clone Repository
```bash
git clone [https://github.com/khosyalbuchary/bkk-cilacap-screening.git](https://github.com/khosyalbuchary/bkk-cilacap-screening.git)
cd bkk-cilacap-screening
