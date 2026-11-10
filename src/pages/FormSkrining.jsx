import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ClipboardList, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

export default function FormSkrining() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        nik: '',
        fullName: '',
        email: '',
        phone: '',
        category: 'ABK / Pelaut',
        // Gejala TB
        cough: false,
        fever: false,
        weightLoss: false,
        // Gejala / Riwayat Risk HIV
        riskHistory: false,
        vctConsent: false
    });

    // Validation State
    const [errors, setErrors] = useState({});

    const validateStep1 = () => {
        const errs = {};
        if (!/^\d{16}$/.test(formData.nik)) errs.nik = 'NIK harus berupa 16 digit angka.';
        if (!formData.fullName.trim()) errs.fullName = 'Nama lengkap wajib diisi.';
        if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Format email tidak valid.';
        if (!/^\d{10,13}$/.test(formData.phone)) errs.phone = 'Nomor HP harus 10-13 digit angka.';

        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        const errs = {};
        if (!formData.vctConsent) {
            errs.vctConsent = 'Anda wajib menyetujui lembar persetujuan pemeriksaan karantina.';
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) setStep(3);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Simulasi POST API ke backend/mock server
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // Navigasi ke Halaman Reservasi Jadwal dengan membawa data state
            navigate('/jadwal/POS-01', { state: { patientData: formData } });
        } catch (err) {
            setSubmitError('Gagal mengirim data skrining. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

            <header className="text-center">
                <h1 className="text-3xl font-extrabold text-slate-900">Form Skrining Mandiri TB & HIV</h1>
                <p className="text-slate-600 mt-2 text-sm">
                    Isi data diri dan kuesioner deteksi dini penyakit menular untuk mendapatkan tiket reservasi laboratorium BKK Cilacap.
                </p>
            </header>

            {/* Stepper Progress Bar */}
            <div className="flex justify-between items-center max-w-xl mx-auto px-4">
                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-bkk-teal font-bold' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-bkk-teal text-white' : 'bg-slate-200'}`}>1</div>
                    <span className="hidden sm:inline text-sm">Identitas</span>
                </div>
                <div className="flex-1 h-1 bg-slate-200 mx-4">
                    <div className={`h-full bg-bkk-teal transition-all duration-300 ${step === 2 ? 'w-1/2' : step === 3 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-bkk-teal font-bold' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-bkk-teal text-white' : 'bg-slate-200'}`}>2</div>
                    <span className="hidden sm:inline text-sm">Kuesioner Medis</span>
                </div>
                <div className="flex-1 h-1 bg-slate-200 mx-4">
                    <div className={`h-full bg-bkk-teal transition-all duration-300 ${step === 3 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className={`flex items-center gap-2 ${step === 3 ? 'text-bkk-teal font-bold' : 'text-slate-400'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-bkk-teal text-white' : 'bg-slate-200'}`}>3</div>
                    <span className="hidden sm:inline text-sm">Konfirmasi</span>
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">

                {/* STEP 1: Data Diri */}
                {step === 1 && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <User className="text-bkk-teal" /> Langkah 1: Data Identitas Pemohon
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="nik" className="block text-xs font-bold text-slate-700 mb-1">NIK (16 Digit KTP) *</label>
                                <input
                                    id="nik"
                                    type="text"
                                    maxLength={16}
                                    value={formData.nik}
                                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                                    placeholder="3301234567890001"
                                    className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none ${errors.nik ? 'border-red-500' : 'border-slate-300 focus:ring-2 focus:ring-bkk-teal'}`}
                                />
                                {errors.nik && <p className="text-red-500 text-xs mt-1">{errors.nik}</p>}
                            </div>

                            <div>
                                <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap Sesuai KTP/Paspor *</label>
                                <input
                                    id="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="Contoh: Budi Santoso"
                                    className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none ${errors.fullName ? 'border-red-500' : 'border-slate-300 focus:ring-2 focus:ring-bkk-teal'}`}
                                />
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">Alamat Email Aktif *</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="nama@email.com"
                                    className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none ${errors.email ? 'border-red-500' : 'border-slate-300 focus:ring-2 focus:ring-bkk-teal'}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">Nomor WhatsApp / HP *</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="081234567890"
                                    className={`w-full p-2.5 border rounded-lg text-sm focus:outline-none ${errors.phone ? 'border-red-500' : 'border-slate-300 focus:ring-2 focus:ring-bkk-teal'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="category" className="block text-xs font-bold text-slate-700 mb-1">Kategori Pemohon Karantina</label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-bkk-teal"
                            >
                                <option value="ABK / Pelaut">ABK / Pelaut Kapal Niaga</option>
                                <option value="Penumpang Domestik">Penumpang Kapal Laut Domestik</option>
                                <option value="Pekerja Migran">Pekerja Migran Laut</option>
                                <option value="Masyarakat Pelabuhan">Masyarakat Kawasan Pelabuhan</option>
                            </select>
                        </div>
                    </section>
                )}

                {/* STEP 2: Kuesioner Medis */}
                {step === 2 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <ClipboardList className="text-bkk-teal" /> Langkah 2: Kuesioner Deteksi Gejala
                        </h2>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <h3 className="font-bold text-bkk-blue text-sm mb-2">Deteksi Dini Gejala Tuberkulosis (TB)</h3>
                            <div className="space-y-2 text-sm text-slate-700">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.cough}
                                        onChange={(e) => setFormData({ ...formData, cough: e.target.checked })}
                                        className="w-4 h-4 text-bkk-teal rounded"
                                    />
                                    <span>Mengalami batuk berdahak / kering lebih dari 2 minggu berturut-turut</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.fever}
                                        onChange={(e) => setFormData({ ...formData, fever: e.target.checked })}
                                        className="w-4 h-4 text-bkk-teal rounded"
                                    />
                                    <span>Demam meriang berkepanjangan / berkeringat malam tanpa aktivitas</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.weightLoss}
                                        onChange={(e) => setFormData({ ...formData, weightLoss: e.target.checked })}
                                        className="w-4 h-4 text-bkk-teal rounded"
                                    />
                                    <span>Penurunan berat badan secara drastis dalam 1 bulan terakhir</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                            <h3 className="font-bold text-slate-800 text-sm">Persetujuan Pemeriksaan VCT HIV Sukarela</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Pemeriksaan VCT dilakukan secara rahasia (confidential) sesuai standar Kementerian Kesehatan RI. Hasil tes hanya dikirimkan ke email terdaftar pemohon.
                            </p>
                            <label className="flex items-start gap-2 cursor-pointer pt-2">
                                <input
                                    type="checkbox"
                                    id="vctConsent"
                                    checked={formData.vctConsent}
                                    onChange={(e) => setFormData({ ...formData, vctConsent: e.target.checked })}
                                    className="w-4 h-4 text-bkk-teal rounded mt-0.5"
                                />
                                <span className="text-xs font-semibold text-slate-800">
                                    Saya menyetujui pelaksanaan skrining kesehatan & pemeriksaan laboratorium BKK Cilacap. *
                                </span>
                            </label>
                            {errors.vctConsent && <p className="text-red-500 text-xs">{errors.vctConsent}</p>}
                        </div>
                    </section>
                )}

                {/* STEP 3: Konfirmasi */}
                {step === 3 && (
                    <section className="space-y-6">
                        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                            <CheckCircle2 className="text-bkk-teal" /> Langkah 3: Konfirmasi & Kirim Data
                        </h2>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm space-y-2">
                            <p><strong>NIK:</strong> {formData.nik}</p>
                            <p><strong>Nama:</strong> {formData.fullName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Nomor HP:</strong> {formData.phone}</p>
                            <p><strong>Kategori:</strong> {formData.category}</p>
                            <p><strong>Status Ringkasan Gejala:</strong> {formData.cough || formData.fever || formData.weightLoss ? 'Ada Gejala Terindikasi (Prioritas Lab)' : 'Tidak Ada Gejala Berbahaya'}</p>
                        </div>

                        {submitError && (
                            <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}
                    </section>
                )}

                {/* Action Controls */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-slate-100">
                    {step > 1 ? (
                        <button
                            type="button"
                            onClick={() => setStep(step - 1)}
                            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 text-sm font-semibold"
                        >
                            <ArrowLeft className="w-4 h-4" /> Kembali
                        </button>
                    ) : <div />}

                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-bkk-teal hover:bg-cyan-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow"
                        >
                            Lanjut <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 bg-bkk-blue hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" /> Memproses Data...
                                </>
                            ) : (
                                'Kirim & Pilih Jadwal Pos'
                            )}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}