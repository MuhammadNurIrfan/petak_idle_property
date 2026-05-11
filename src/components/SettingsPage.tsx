import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Shield, 
  Settings, 
  Lock, 
  Bell, 
  CreditCard, 
  Trash2, 
  Camera, 
  ChevronRight, 
  Smartphone, 
  Globe, 
  Moon, 
  Sun,
  Key,
  Clock,
  Eye,
  Download,
  AlertTriangle,
  ArrowLeft,
  Check
} from 'lucide-react';

interface SettingsPageProps {
  onBack: () => void;
  userEmail: string;
}

type SettingsSection = 'profile' | 'security' | 'preferences' | 'privacy' | 'billing' | 'delete';

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, userEmail }) => {
  const [activeSection, setActiveSection] = useState<SettingsSection | null>('profile');
  const [isSaved, setIsSaved] = useState(false);

  const sections = [
    { id: 'profile', label: 'Profil Saya', icon: User },
    { id: 'password', label: 'Ganti Password', icon: Key },
    { id: 'security', label: 'Keamanan & 2FA', icon: Shield },
    { id: 'preferences', label: 'Preferensi Tampilan', icon: Settings },
    { id: 'privacy', label: 'Data & Privasi', icon: Lock },
    { id: 'billing', label: 'Pembayaran & Tagihan', icon: CreditCard },
    { id: 'delete', label: 'Hapus Akun', icon: Trash2, color: 'text-rose-500' },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const toggleSection = (id: SettingsSection) => {
    setActiveSection(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header/Breadcrumbs */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-zinc-600" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Beranda &gt; Akun</p>
              <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Pengaturan Akun</h1>
            </div>
          </div>
          
          <AnimatePresence>
            {isSaved && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span className="text-xs font-bold">Tersimpan</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div 
              key={section.id} 
              className={`bg-white rounded-[32px] border transition-all duration-300 ${
                activeSection === section.id 
                  ? 'border-emerald-200 shadow-xl shadow-emerald-500/5' 
                  : 'border-zinc-200 hover:border-emerald-300'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleSection(section.id as SettingsSection)}
                className="w-full flex items-center justify-between p-6 sm:p-8 outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    activeSection === section.id ? 'bg-emerald-600 text-white' : 'bg-zinc-50 text-zinc-400'
                  }`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className={`font-black tracking-tight ${activeSection === section.id ? 'text-emerald-900' : 'text-zinc-900'}`}>
                      {section.label}
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-0.5">
                      {section.id === 'profile' ? 'Identitas Personal' : 
                       section.id === 'password' ? 'Keamanan Akses' :
                       section.id === 'security' ? 'Proteksi Akun' :
                       section.id === 'preferences' ? 'Kostumisasi' :
                       section.id === 'privacy' ? 'Izin & Data' :
                       section.id === 'billing' ? 'Metode & Histori' : 'Opsi Lanjut'}
                    </p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                  activeSection === section.id ? 'rotate-90 bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-zinc-50 border-zinc-100 text-zinc-300'
                }`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {activeSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-12 pt-4 border-t border-zinc-50">
                      {/* Profile Content */}
                      {section.id === 'profile' && (
                        <div className="space-y-8">
                          <div className="flex flex-col sm:flex-row items-center gap-8 bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                            <div className="relative group">
                              <div className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-md overflow-hidden flex items-center justify-center">
                                <User className="w-12 h-12 text-zinc-300" />
                              </div>
                              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                                <Camera className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-center sm:text-left">
                              <p className="text-sm font-black text-zinc-900">Foto Profil</p>
                              <p className="text-xs text-zinc-500 font-medium mt-1">Gunakan foto asli untuk mempermudah KYC aset fisik.</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Nama Lengkap</label>
                              <input type="text" placeholder="Masukkan nama lengkap" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Username</label>
                              <input type="text" value="mnirfan_rwa" readOnly className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-mono font-bold text-zinc-500 cursor-not-allowed outline-none" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">E-mail</label>
                              <input type="email" defaultValue={userEmail} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Nomor Telepon</label>
                              <input type="tel" placeholder="+62 8xx xxxx xxxx" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                            </div>
                          </div>

                          <div className="flex justify-end pt-4">
                            <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                              Update Profil Saya
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Password Content */}
                      {section.id === 'password' && (
                        <div className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Kata Sandi Saat Ini</label>
                              <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Kata Sandi Baru</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Konfirmasi Kata Sandi Baru</label>
                                <input type="password" placeholder="••••••••" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end pt-4">
                            <button onClick={handleSave} className="bg-zinc-900 hover:bg-black text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95">
                              Ganti Kata Sandi
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Security Content */}
                      {section.id === 'security' && (
                        <div className="space-y-10">
                          <div className="space-y-6 bg-zinc-50/50 p-6 rounded-3xl border border-zinc-100">
                            <div className="flex items-center justify-between">
                              <h2 className="text-base font-bold flex items-center gap-2">
                                <Shield className="w-5 h-5 text-emerald-600" />
                                Autentikasi Dua Faktor (2FA)
                              </h2>
                              <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                <motion.div layout className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
                              </div>
                            </div>
                            <p className="text-xs text-zinc-500">Berikan lapisan keamanan ekstra pada akun Anda dengan kode verifikasi.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {['Aplikasi Authenticator', 'SMS Verifikasi'].map((method) => (
                                <div key={method} className="p-4 border border-emerald-100 rounded-2xl bg-white flex items-center justify-between group hover:border-emerald-300 transition-all cursor-pointer">
                                  <span className="text-[11px] font-black uppercase text-zinc-600 tracking-tight">{method}</span>
                                  <Check className="w-4 h-4 text-emerald-500" />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h2 className="text-base font-bold flex items-center gap-2">
                              <Smartphone className="w-5 h-5 text-emerald-600" />
                              Sesi Login Aktif
                            </h2>
                            <div className="space-y-3">
                              {[
                                { device: 'MacBook Pro 14"', location: 'Jakarta, Indonesia', time: 'Sekarang (Browser Chrome)', current: true },
                                { device: 'iPhone 15 Pro', location: 'Bandung, Indonesia', time: '2 hari yang lalu (Mobile App)', current: false },
                              ].map((session, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-zinc-200">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                                      <Smartphone className="w-5 h-5 text-zinc-400" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-bold text-zinc-900 tracking-tight">{session.device} {session.current && <span className="text-[9px] bg-emerald-100 text-emerald-700 font-black px-1.5 rounded ml-2">Sesi Sekarang</span>}</p>
                                      <p className="text-[10px] text-zinc-400 uppercase font-black tracking-tight">{session.location} • {session.time}</p>
                                    </div>
                                  </div>
                                  {!session.current && (
                                    <button className="text-[10px] font-black text-rose-500 uppercase hover:underline">Log out</button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Preferences Content */}
                      {section.id === 'preferences' && (
                        <div className="space-y-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                                <Globe className="w-4 h-4" />
                                Bahasa Antarmuka
                              </h3>
                              <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-zinc-700 outline-none transition-all appearance-none cursor-pointer">
                                <option>Bahasa Indonesia</option>
                                <option>English (US)</option>
                              </select>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                                <Clock className="w-4 h-4" />
                                Zona Waktu Dasar
                              </h3>
                              <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-zinc-700 outline-none transition-all appearance-none cursor-pointer">
                                <option>(GMT+07:00) Jakarta</option>
                                <option>(GMT+00:00) London</option>
                              </select>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                                <Sun className="w-4 h-4" />
                                Tema Tampilan
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 border-2 border-emerald-500 bg-emerald-50/50 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/5">
                                  <Sun className="w-6 h-6 text-emerald-600" />
                                  <span className="text-[11px] font-black text-emerald-700 uppercase">Terang</span>
                                </div>
                                <div className="p-5 border-2 border-zinc-100 bg-zinc-50 rounded-2xl flex flex-col items-center gap-2 cursor-pointer grayscale opacity-40">
                                  <Moon className="w-6 h-6 text-zinc-400" />
                                  <span className="text-[11px] font-black text-zinc-400 uppercase">Gelap</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                                <Bell className="w-4 h-4" />
                                Notifikasi In-App
                              </h3>
                              <div className="space-y-3">
                                {['Info Transaksi', 'Update Properti'].map((notif) => (
                                  <div key={notif} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                                     <span className="text-[11px] font-black text-zinc-600 uppercase tracking-tight">{notif}</span>
                                     <div className="w-10 h-5 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                       <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
                                     </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end pt-4">
                             <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg active:scale-95">
                               Terapkan Preferensi
                             </button>
                          </div>
                        </div>
                      )}

                      {/* Data & Privacy Content */}
                      {section.id === 'privacy' && (
                        <div className="space-y-10">
                          <div className="p-6 bg-emerald-50/30 rounded-3xl border border-emerald-100 space-y-4">
                             <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
                                  <Download className="w-5 h-5" />
                                </div>
                                <h2 className="text-base font-bold text-emerald-900 uppercase tracking-tight">Eksportir Data Saya</h2>
                             </div>
                             <p className="text-xs text-emerald-700/80 leading-relaxed font-medium">Anda dapat mengunduh seluruh salinan data validasi aset dan histori aktivitas Anda dalam format .zip.</p>
                             <button className="bg-emerald-600 text-white font-black px-6 py-3 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-emerald-700 transition-all active:scale-95">
                               Request Data Arsip
                             </button>
                          </div>

                          <div className="space-y-6">
                            <h2 className="text-base font-bold flex items-center gap-2">
                              <Eye className="w-5 h-5 text-emerald-600" />
                              Privasi Visibilitas
                            </h2>
                            <div className="space-y-3">
                              {['Tampilkan Portfolio Publik', 'Izin Pencarian Email'].map((perm, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-zinc-200">
                                   <span className="text-sm font-bold text-zinc-700">{perm}</span>
                                   <div className={`w-12 h-6 ${i === 1 ? 'bg-zinc-200' : 'bg-emerald-500'} rounded-full relative p-1 cursor-pointer transition-colors`}>
                                     <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm ${i === 1 ? 'left-1' : 'right-1'}`} />
                                   </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Billing Content */}
                      {section.id === 'billing' && (
                        <div className="space-y-10">
                          <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                              <CreditCard className="w-4 h-4" />
                              Metode Default Pembayaran
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="relative h-44 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-8 text-white shadow-xl overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                   <CreditCard className="w-16 h-16" />
                                </div>
                                <div className="h-full flex flex-col justify-between relative z-10">
                                  <div className="flex justify-between items-start">
                                    <span className="text-[9px] uppercase tracking-[0.2em] font-black text-emerald-400">Personal Debit</span>
                                    <span className="text-xs font-mono font-bold italic">VISA</span>
                                  </div>
                                  <div>
                                    <p className="text-base font-mono tracking-widest mb-1 font-bold">•••• 4212</p>
                                    <p className="text-[9px] uppercase font-black opacity-60">Exp: 09/28 • MN IRFAN</p>
                                  </div>
                                </div>
                              </div>

                              <button className="h-44 border-2 border-dashed border-zinc-200 rounded-3xl flex flex-col items-center justify-center gap-3 text-zinc-400 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50/10 transition-all active:scale-[0.98]">
                                <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-100 group-hover:bg-emerald-100 transition-colors">
                                  <CreditCard className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Tambah Kartu</span>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2 ml-1">
                              <Clock className="w-4 h-4" />
                              Gundah Invoice
                            </h3>
                            <div className="space-y-2 border border-zinc-100 rounded-2xl overflow-hidden">
                              {[
                                { id: 'INV-2024-001', date: '01 Mei 2024', amount: 'Rp 150.000' },
                                { id: 'INV-2024-002', date: '21 Apr 2024', amount: 'Rp 2.450.000' },
                              ].map((inv, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0 cursor-pointer">
                                  <div className="flex items-center gap-4">
                                    <Download className="w-4 h-4 text-zinc-400" />
                                    <div>
                                       <p className="text-xs font-black text-zinc-900 tracking-tight">{inv.id}</p>
                                       <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest">{inv.date}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs font-black text-zinc-900">{inv.amount}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Delete Account Content */}
                      {section.id === 'delete' && (
                        <div className="space-y-8">
                          <div className="p-6 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4">
                             <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                             <div>
                                <h4 className="text-sm font-black text-rose-900 uppercase">Bahaya!</h4>
                                <p className="text-xs text-rose-700 font-medium leading-relaxed mt-1">Seluruh data aset dan token Anda akan dihapus permanen. Tindakan ini tidak dapat dipulihkan kembali.</p>
                             </div>
                          </div>

                          <div className="space-y-5">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Konfirmasi Penghapusan</label>
                              <input type="text" placeholder="HAPUS AKUN SAYA" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-mono font-bold uppercase focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all placeholder:text-zinc-300" />
                            </div>
                            <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-5 rounded-3xl transition-all shadow-xl shadow-rose-600/20 active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                               <Trash2 className="w-5 h-5" />
                               Confirm Termination
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
          Petak Engine &copy; 2026 Settings Hub
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
