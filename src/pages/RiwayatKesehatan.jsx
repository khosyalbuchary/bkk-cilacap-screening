import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, CheckCircle2, QrCode, X, RefreshCw } from 'lucide-react';

export default function RiwayatKesehatan() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/data/medical-records.json');
      setRecords(response.data);
    } catch (err) {
      setError('Gagal memuat data riwayat kesehatan.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900">Riwayat Kesehatan & E-Sertifikat</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Dokumen rekam jejak pemeriksaan skrining TB & HIV serta sertifikat karantina sah BKK Cilacap.
        </p>
      </header>

      {error && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex justify-between items-center">
          <span className="text-sm">{error}</span>
          <button onClick={fetchRecords} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold">
            <RefreshCw className="w-4 h-4" /> Coba Lagi
          </button>
        </div>
      )}

      {loading && (
        <div className="space-y-4" aria-busy="true">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 bg-slate-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {records.map((item) => (
            <article key={item.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full">{item.id}</span>
                  <span className="text-xs text-slate-500">Tanggal: {item.date}</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{item.category}</h2>
                <p className="text-sm text-slate-600">Lokasi: {item.location}</p>
                <p className="text-xs text-slate-500 italic">{item.notes}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> {item.status}
                </div>
                <button
                  onClick={() => setSelectedCert(item)}
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                >
                  <QrCode className="w-4 h-4" /> Lihat Sertifikat
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative border border-slate-200" role="dialog" aria-modal="true">
            <button onClick={() => setSelectedCert(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1" aria-label="Tutup">
              <X className="w-6 h-6" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-block p-3 bg-teal-50 rounded-full text-teal-600 mb-1">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">E-Sertifikat Clearance Karantina</h2>
              <p className="text-xs text-slate-500 font-mono">{selectedCert.certificateCode}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Nama:</span> <span className="font-semibold text-slate-800">{selectedCert.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">NIK:</span> <span className="font-semibold text-slate-800">{selectedCert.nik}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Jenis Layanan:</span> <span className="font-semibold text-slate-800">{selectedCert.category}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="font-semibold text-emerald-600">{selectedCert.status}</span></div>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl">
              <div className="w-32 h-32 bg-slate-900 text-white flex items-center justify-center text-xs font-mono rounded-lg shadow-inner">
                [MOCK QR CODE]
              </div>
              <span className="text-xs text-slate-400 mt-2">Scan untuk verifikasi keaslian dokumen BKK Cilacap</span>
            </div>

            <button onClick={() => setSelectedCert(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-semibold text-sm transition">
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
}