import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Halaman Garapan Khosy
import Home from './pages/Home';
import Layanan from './pages/Layanan';

// Halaman Garapan Azka
import FormSkrining from './pages/FormSkrining';
import DetailJadwal from './pages/DetailJadwal';

// Placeholder Halaman Garapan Rayhan
const RiwayatKesehatan = () => <div className="p-16 text-center text-slate-500">Halaman Riwayat & Sertifikat (Garapan Rayhan)</div>;
const KontakFAQ = () => <div className="p-16 text-center text-slate-500">Halaman Pusat Bantuan & FAQ (Garapan Rayhan)</div>;

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/skrining" element={<FormSkrining />} />
            <Route path="/jadwal/:id" element={<DetailJadwal />} />
            <Route path="/riwayat" element={<RiwayatKesehatan />} />
            <Route path="/kontak" element={<KontakFAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}