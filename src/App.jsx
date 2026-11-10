import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Halaman Khosy
import Home from './pages/Home';
import Layanan from './pages/Layanan';

// Halaman Azka
import FormSkrining from './pages/FormSkrining';
import DetailJadwal from './pages/DetailJadwal';

// Halaman Rayhan
import RiwayatKesehatan from './pages/RiwayatKesehatan';
import KontakFAQ from './pages/KontakFAQ';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Rute Khosy */}
            <Route path="/" element={<Home />} />
            <Route path="/layanan" element={<Layanan />} />

            {/* Rute Azka */}
            <Route path="/skrining" element={<FormSkrining />} />
            <Route path="/jadwal/:id" element={<DetailJadwal />} />

            {/* Rute Rayhan */}
            <Route path="/riwayat" element={<RiwayatKesehatan />} />
            <Route path="/kontak" element={<KontakFAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}