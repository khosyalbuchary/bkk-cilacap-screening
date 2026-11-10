import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, Calendar, CheckCircle, AlertCircle, RefreshCw, QrCode } from 'lucide-react';

export default function DetailJadwal() {
    const location = useLocation();
    const patientData = location.state?.patientData || { fullName: 'Budi Santoso', nik: '3301234567890001' };

    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedPos, setSelectedPos] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchSchedules = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/data/schedules.json');
            setSchedules(response.data);
            if (response.data.length > 0) {
                setSelectedPos(response.data[0]);
            }
        } catch (err) {
            setError('Gagal memuat daftar kuota jadwal pos laboratorium.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    const handleConfirmBooking = () => {
        if (!selectedSlot || !selectedDate) {
            alert('Silakan pilih tanggal dan slot jam pemeriksaan terlebih dahulu.');
            return;
        }
        setShowModal(true);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

            <header className="border-b border-slate-200 pb-4">
                <span className="text-xs font-bold text-bkk-teal uppercase tracking-wide">Langkah Terakhir</span>
                <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Reservasi Lokasi & Jadwal Pemeriksaan</h1>
                <p className="text-slate-600 text-sm mt-1">
                    Pemohon: <strong>{patientData.fullName}</strong> (NIK: {patientData.nik})
                </p>
            </header>

            {/* Error State */}
            {error && (
                <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                    <button onClick={fetchSchedules} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold">
                        <RefreshCw className="w-4 h-4" /> Coba Lagi
                    </button>
                </div>
            )}

            {/* Skeleton Loading */}
            {loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-busy="true">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="h-48 bg-slate-200 animate-pulse rounded-xl"></div>
                    ))}
                </div>
            )}

            {/* Content Grid */}
            {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Pos Selector List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-bold text-slate-900">Pilih Pos Kekarantinaan Kesehatan</h2>
                        <div className="space-y-3">
                            {schedules.map((pos) => (
                                <div
                                    key={pos.id}
                                    onClick={() => setSelectedPos(pos)}
                                    className={`p-5 rounded-xl border cursor-pointer transition ${selectedPos?.id === pos.id
                                            ? 'border-bkk-teal bg-teal-50/40 ring-2 ring-bkk-teal'
                                            : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-slate-900">{pos.name}</h3>
                                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-bkk-teal" /> {pos.address}
                                            </p>
                                        </div>
                                        <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-bkk-blue rounded-full">
                                            Sisa Kuota: {pos.quota}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-600 mt-3">Dokter Penanggung Jawab: {pos.doctor}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date & Slot Picker Sidebar */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit space-y-5">
                        <h2 className="text-lg font-bold text-slate-900">Detail Pertemuan</h2>

                        <div>
                            <label htmlFor="resDate" className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-bkk-teal" /> Pilih Tanggal Kedatangan *
                            </label>
                            <input
                                id="resDate"
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-bkk-teal"
                            />
                        </div>

                        {selectedPos && (
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                                    <Clock className="w-4 h-4 text-bkk-teal" /> Jam Layanan Tersedia *
                                </label>
                                <div className="space-y-2">
                                    {selectedPos.availableSlots.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`w-full p-2 rounded-lg text-xs font-semibold border transition text-left ${selectedSlot === slot
                                                    ? 'bg-bkk-blue text-white border-bkk-blue'
                                                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                                                }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleConfirmBooking}
                            className="w-full bg-bkk-teal hover:bg-cyan-600 text-white font-bold py-3 rounded-xl transition shadow"
                        >
                            Konfirmasi Reservasi
                        </button>
                    </div>

                </div>
            )}

            {/* Modal QR Code Bukti Reservasi */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 text-center">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Reservasi Berhasil!</h3>
                        <p className="text-xs text-slate-600">
                            Tunjukkan bukti tiket fisik / screenshot QR Code ini saat tiba di lokasi pos karantina.
                        </p>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 inline-block my-2">
                            <QrCode className="w-32 h-32 mx-auto text-slate-800" />
                            <span className="text-[10px] font-mono text-slate-500 mt-2 block">ID: BKK-CIL-{Math.floor(100000 + Math.random() * 900000)}</span>
                        </div>

                        <div className="text-left text-xs text-slate-600 space-y-1 bg-slate-100 p-3 rounded-lg">
                            <p><strong>Lokasi:</strong> {selectedPos?.name}</p>
                            <p><strong>Tanggal:</strong> {selectedDate}</p>
                            <p><strong>Jam:</strong> {selectedSlot}</p>
                        </div>

                        <Link
                            to="/riwayat"
                            className="block w-full bg-bkk-blue hover:bg-slate-900 text-white text-sm font-bold py-2.5 rounded-lg transition"
                        >
                            Lihat Riwayat & E-Sertifikat
                        </Link>
                    </div>
                </div>
            )}

        </div>
    );
}