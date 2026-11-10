import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, HelpCircle, Mail, Phone, MapPin, Send, RefreshCw } from 'lucide-react';

export default function KontakFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const fetchFaqs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/data/faqs.json');
      setFaqs(response.data);
    } catch (err) {
      setError('Gagal memuat data pusat bantuan FAQ.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900">Pusat Bantuan & FAQ Karantina</h1>
        <p className="text-slate-600 mt-2 text-sm">
          Punya pertanyaan seputar prosedur skrining TB & HIV atau kendala sertifikat? Temukan jawabannya di sini atau hubungi tim kami.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-xl">
            <HelpCircle className="w-6 h-6 text-teal-600" />
            <span>Pertanyaan yang Sering Diajukan (FAQ)</span>
          </div>

          {error && (
            <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex justify-between items-center text-sm">
              <span>{error}</span>
              <button onClick={fetchFaqs} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded text-xs">
                <RefreshCw className="w-4 h-4" /> Coba Lagi
              </button>
            </div>
          )}

          {loading && (
            <div className="space-y-3" aria-busy="true">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-16 bg-slate-200 animate-pulse rounded-xl"></div>
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={faq.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left font-semibold text-slate-800 flex justify-between items-center hover:bg-slate-50 focus:outline-none"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-600 border-t border-slate-100 pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Kirim Pesan / Pengaduan Kendala</h2>

            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm space-y-2">
                <p className="font-bold">Pesan Berhasil Terkirim!</p>
                <p>Terima kasih, laporan Anda telah diterima oleh petugas helpdesk BKK Class I Cilacap.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="mt-2 bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    placeholder="Masukkan nama Anda..."
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">Email Aktif</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    placeholder="nama@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 mb-1">Isi Kendala / Pertanyaan</label>
                  <textarea
                    id="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    placeholder="Jelaskan kendala skrining atau sertifikat Anda..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-4 h-4" /> Kirim Pesan Bantuan
                </button>
              </form>
            )}
          </div>

          <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 space-y-4 text-sm text-slate-700">
            <h3 className="font-bold text-slate-900">Kontak Resmi Pos Pelabuhan</h3>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Jl. Pelabuhan Tanjung Intan No. 1, Cilacap</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600 shrink-0" />
                <span>(0282) 534xxx / Hotline Karantina</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600 shrink-0" />
                <span>bkk.cilacap@kemkes.go.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}