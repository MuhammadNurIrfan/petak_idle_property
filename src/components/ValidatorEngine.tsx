import React from 'react';
import { 
  FileText, 
  RefreshCcw, 
  Upload, 
  Loader2, 
  Zap, 
  AlertCircle, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  User, 
  MapPin, 
  Maximize, 
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ValuatorResponse } from '../types';

interface ValidatorEngineProps {
  onBack: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processFile: (file: File) => void;
  handleUpload: () => void;
  reset: () => void;
  preview: string | null;
  loading: boolean;
  result: ValuatorResponse | null;
  error: string | null;
  file: File | null;
}

const ValidatorEngine: React.FC<ValidatorEngineProps> = ({
  onBack,
  fileInputRef,
  handleFileChange,
  processFile,
  handleUpload,
  reset,
  preview,
  loading,
  result,
  error,
  file
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'VALID': return 'bg-emerald-500';
      case 'FLAGGED': return 'bg-amber-500';
      case 'INVALID': return 'bg-rose-500';
      case 'REJECTED': return 'bg-zinc-700';
      default: return 'bg-blue-500';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'VALID': return 'Valid';
      case 'FLAGGED': return 'Perlu Tinjauan';
      case 'INVALID': return 'Tidak Valid';
      case 'REJECTED': return 'Ditolak';
      default: return 'Menunggu';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-black text-zinc-900">Petak RWA Validator Engine</h2>
          <p className="text-sm text-zinc-400 font-medium">Validasi dokumen legalitas menggunakan AI tingkat lanjut.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                Dokumen Input
              </h2>
              {file && (
                <button 
                  onClick={reset}
                  className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 hover:text-rose-500 transition-colors flex items-center gap-1"
                >
                  <RefreshCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
            
            <div className="p-6">
              {!preview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile) processFile(droppedFile);
                  }}
                  className="border-2 border-dashed border-zinc-200 rounded-xl py-16 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-zinc-400 group-hover:text-emerald-500" />
                  </div>
                  <p className="font-medium text-zinc-700">Unggah Sertifikat SHM</p>
                  <p className="text-sm text-zinc-400 mt-1">Seret & lepas atau klik untuk memilih file</p>
                  <p className="text-xs text-zinc-300 mt-4 uppercase tracking-widest font-bold">Image / PDF</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-zinc-900 aspect-[3/4] border border-zinc-800">
                    <img 
                      src={preview} 
                      alt="Document Preview" 
                      className={`w-full h-full object-contain ${loading ? 'opacity-40 grayscale' : ''}`}
                    />
                    {loading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                        <p className="text-white text-sm font-medium mt-4 animate-pulse">Menganalisis Dokumen...</p>
                      </div>
                    )}
                  </div>
                  
                  {!result && !loading && (
                    <button
                      onClick={handleUpload}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Zap className="w-5 h-5 fill-current" />
                      Jalankan Validasi AI
                    </button>
                  )}
                </div>
              )}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <p className="text-sm text-rose-700">{error}</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-6 text-white overflow-hidden relative">
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
             <h3 className="text-xs uppercase tracking-[0.2em] font-black text-emerald-500 mb-4">Panduan Validasi</h3>
             <ul className="space-y-3 text-sm text-zinc-400">
               <li className="flex items-start gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                 Pastikan Logo Garuda terlihat jelas
               </li>
               <li className="flex items-start gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                 Nomor Hak Milik harus terbaca (tidak terpotong)
               </li>
               <li className="flex items-start gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                 Pencahayaan yang rata untuk deteksi stempel emboss
               </li>
             </ul>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-zinc-200 rounded-3xl"
              >
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                  <Shield className="w-10 h-10 text-zinc-400" />
                </div>
                <h3 className="text-xl font-bold text-zinc-800">Menunggu Analisis</h3>
                <p className="text-zinc-500 mt-2 max-w-md">Silakan unggah dan proses dokumen sertifikat tanah untuk melihat hasil ekstraksi data dan skor verifikasi.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 pb-12"
              >
                {/* Status Banner */}
                <div className={`p-1 rounded-3xl ${getStatusColor(result.status_verifikasi)} shadow-xl shadow-zinc-200 transition-colors`}>
                  <div className="bg-white rounded-[22px] px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl ${getStatusColor(result.status_verifikasi)} flex items-center justify-center shadow-lg`}>
                        {result.status_verifikasi === 'VALID' && <CheckCircle2 className="w-8 h-8 text-white" />}
                        {result.status_verifikasi === 'FLAGGED' && <AlertCircle className="w-8 h-8 text-white" />}
                        {(result.status_verifikasi === 'INVALID' || result.status_verifikasi === 'REJECTED') && <XCircle className="w-8 h-8 text-white" />}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Hasil Verifikasi</p>
                        <h2 className="text-2xl font-black text-zinc-900">{getStatusLabel(result.status_verifikasi)}</h2>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Confidence Score</p>
                      <p className="text-2xl font-mono font-black text-emerald-600">{(result.confidence_score * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Owner & Identity */}
                  <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Identitas Pemilik
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase font-bold">Nama Lengkap</label>
                        <p className={result.data_terekstraksi.nama_pemilik ? "font-bold text-lg" : "italic text-zinc-400"}>
                          {result.data_terekstraksi.nama_pemilik || "Tidak ditemukan"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase font-bold">Nomor Hak</label>
                          <p className="font-mono text-xs font-bold bg-zinc-50 p-2 rounded border border-zinc-100 mt-1">
                            {result.data_terekstraksi.nomor_hak_milik || "-"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-400 uppercase font-bold">NIB</label>
                          <p className="font-mono text-xs font-bold bg-zinc-50 p-2 rounded border border-zinc-100 mt-1">
                            {result.data_terekstraksi.nib || "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Land Stats */}
                  <div className="bg-white rounded-2xl border border-zinc-200 p-6 space-y-4">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-2">
                      <Maximize className="w-3 h-3" />
                      Informasi Bidang
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase font-bold">Luas Tanah</label>
                        <div className="flex items-baseline gap-2">
                           <p className="text-3xl font-black text-zinc-900">{result.data_terekstraksi.luas_meter_persegi?.toLocaleString() || "0"}</p>
                           <p className="text-sm font-bold text-zinc-400">m²</p>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-zinc-400 uppercase font-bold">Lokasi</label>
                        <div className="flex items-start gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-rose-500 mt-1 shrink-0" />
                          <p className="text-sm font-medium leading-relaxed">
                            {result.data_terekstraksi.lokasi.desa_kelurahan}, {result.data_terekstraksi.lokasi.kecamatan}, {result.data_terekstraksi.lokasi.kabupaten_kota}, {result.data_terekstraksi.lokasi.provinsi}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authenticity Matrix */}
                <div className="bg-white rounded-3xl border border-zinc-200 p-8">
                   <h3 className="text-sm uppercase tracking-[0.2em] font-black text-zinc-900 mb-6 flex items-center gap-2">
                     Analisis Forensik Dokumen
                   </h3>
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     <div className="flex flex-col gap-2">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-zinc-500">Logo Garuda</span>
                          {result.analisis_keaslian.garuda_visibilitas ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                       </div>
                       <div className={`h-1.5 rounded-full ${result.analisis_keaslian.garuda_visibilitas ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                       <span className="text-[10px] text-zinc-400">{result.analisis_keaslian.garuda_visibilitas ? 'Terdeteksi' : 'Tidak Terdeteksi'}</span>
                     </div>

                     <div className="flex flex-col gap-2">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-zinc-500">Emboss BPN</span>
                          {result.analisis_keaslian.stempel_emboss_terdeteksi ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                       </div>
                       <div className={`h-1.5 rounded-full ${result.analisis_keaslian.stempel_emboss_terdeteksi ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                       <span className="text-[10px] text-zinc-400">{result.analisis_keaslian.stempel_emboss_terdeteksi ? 'Terdeteksi' : 'Tidak Terdeteksi'}</span>
                     </div>

                     <div className="flex flex-col gap-2">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-zinc-500">Integritas Fisik</span>
                          {!result.analisis_keaslian.indikasi_modifikasi ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                       </div>
                       <div className={`h-1.5 rounded-full ${!result.analisis_keaslian.indikasi_modifikasi ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                       <span className="text-[10px] text-zinc-400 max-w-full truncate">{result.analisis_keaslian.indikasi_modifikasi || 'Aman (No modifications detected)'}</span>
                     </div>
                   </div>
                </div>

                {/* Actions & Next Steps */}
                <div className="bg-emerald-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                  <div className="flex-1 space-y-2 relative z-10 text-center md:text-left">
                    <p className="text-[10px] uppercase tracking-widest font-black text-emerald-400">Rekomendasi Tindakan</p>
                    <h4 className="text-xl font-bold">{result.rekomendasi_tindakan}</h4>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                      <div className="bg-white/10 px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs font-mono uppercase tracking-wider">{result.workflow_next_step}</span>
                      </div>
                    </div>
                  </div>
                  <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-black uppercase text-sm tracking-widest shadow-2xl hover:scale-105 transition-transform active:scale-95 flex items-center gap-2 relative z-10 shrink-0">
                    Selesaikan Tokenisasi
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ValidatorEngine;
