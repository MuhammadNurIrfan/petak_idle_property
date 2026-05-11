import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onGoToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Forgot Password States
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryType, setRecoveryType] = useState<'email' | 'phone'>('email');
  const [recoveryInput, setRecoveryInput] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate login
    setTimeout(() => {
      if (
        email === 'demo@petak.id' || 
        email === 'admin@petak.id' || 
        email === 'user@petak.id' || 
        email === 'MNIrfan33@gmail.com'
      ) {
        if (password === 'petak123' || password === 'password' || email === 'MNIrfan33@gmail.com') {
          onLogin(email);
        } else {
          setError('Kata sandi salah.');
          setLoading(false);
        }
      } else {
        setError('Username atau kata sandi salah. Silakan coba lagi.');
        setLoading(false);
      }
    }, 1000);
  };

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simulate sending recovery link/code
    setTimeout(() => {
      setLoading(false);
      setRecoverySuccess(true);
    }, 1500);
  };

  const resetFlow = () => {
    setIsRecoveryMode(false);
    setRecoverySuccess(false);
    setRecoveryInput('');
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-6 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[40px] border border-zinc-200 shadow-2xl shadow-zinc-200/50 overflow-hidden">
          <div className="p-8 sm:p-12">
            {!isRecoveryMode ? (
              <>
                <div className="flex flex-col items-center mb-10">
                  <div className="w-32 h-32 mb-6 bg-zinc-50 rounded-3xl flex items-center justify-center p-2 border border-zinc-100 shadow-sm">
                    <img 
                      src="/src/assets/images/regenerated_image_1778308433588.png" 
                      alt="Petak Logo" 
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h1 className="text-2xl font-black text-zinc-900 tracking-tight">Login Aplikasi</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">Username atau Email</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan Username atau Email"
                        className="block w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-medium placeholder:text-[11px]"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400">Password</label>
                      <button 
                        type="button"
                        onClick={() => setIsRecoveryMode(true)}
                        className="text-[10px] uppercase tracking-widest font-black text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        Lupa Kata Sandi?
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Masukkan Kata Sandi"
                        className="block w-full pl-11 pr-12 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-medium placeholder:text-[11px]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <p className="text-xs font-semibold text-rose-700">{error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Masuk</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-10 text-center">
                  <p className="text-sm text-zinc-500 font-medium">
                    Belum punya akun?{' '}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        onGoToRegister();
                      }}
                      className="text-emerald-600 font-bold hover:underline cursor-pointer"
                    >
                      Daftar Sekarang
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col items-center">
                  <button 
                    onClick={resetFlow}
                    className="self-start mb-6 p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-400 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="w-20 h-20 mb-6 bg-emerald-50 rounded-[28px] border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Lock className="w-10 h-10" />
                  </div>
                  
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight text-center">Lupa Kata Sandi</h2>
                  <p className="text-xs text-zinc-400 font-bold text-center mt-2 leading-relaxed">Pilih metode aktivasi ulang untuk mendapatkan link atau kode verifikasi.</p>
                </div>

                {!recoverySuccess ? (
                  <form onSubmit={handleRecoverySubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-3 p-1.5 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <button
                        type="button"
                        onClick={() => setRecoveryType('email')}
                        className={cn(
                          "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          recoveryType === 'email' ? "bg-white text-emerald-600 shadow-sm border border-zinc-100" : "text-zinc-400 hover:text-zinc-600"
                        )}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecoveryType('phone')}
                        className={cn(
                          "py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                          recoveryType === 'phone' ? "bg-white text-emerald-600 shadow-sm border border-zinc-100" : "text-zinc-400 hover:text-zinc-600"
                        )}
                      >
                        Telepon
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-zinc-400 ml-1">
                        {recoveryType === 'email' ? 'Alamat Email Terdaftar' : 'Nomor Telepon Terdaftar'}
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          {recoveryType === 'email' ? (
                            <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                          ) : (
                            <Phone className="h-5 w-5 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                          )}
                        </div>
                        <input
                          type={recoveryType === 'email' ? 'email' : 'tel'}
                          value={recoveryInput}
                          onChange={(e) => setRecoveryInput(e.target.value)}
                          placeholder={recoveryType === 'email' ? 'contoh@petak.id' : '0812xxxxxxx'}
                          className="block w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-sm font-medium placeholder:text-[11px]"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white font-black py-4 rounded-2xl shadow-xl shadow-zinc-900/10 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Kirim Link Verifikasi</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm mx-auto flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-emerald-900 uppercase tracking-widest">Instruksi Terkirim</h3>
                      <p className="text-[11px] text-emerald-700 font-medium mt-2 leading-relaxed">
                        Silakan periksa {recoveryType === 'email' ? 'e-mail' : 'nomor telepon'} Anda. 
                        Kami telah mengirimkan instruksi untuk mengatur ulang kata sandi Anda.
                      </p>
                    </div>
                    <button 
                      onClick={resetFlow}
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors pt-2 block w-full"
                    >
                      Kembali ke Login
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8 space-y-2">
          <p className="text-zinc-400 text-xs font-medium">
            &copy; 2026 Petak Idle Property. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
