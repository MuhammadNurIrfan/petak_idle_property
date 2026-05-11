import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Chrome, 
  Wallet, 
  ShieldCheck, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface RegisterPageProps {
  onBackToLogin: () => void;
  onRegisterSuccess: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onBackToLogin, onRegisterSuccess }) => {
  const handleGoogleRegister = () => {
    // Simulate Google registration
    setTimeout(onRegisterSuccess, 800);
  };

  const handleWalletRegister = (provider: string) => {
    // Simulate Wallet registration
    console.log(`Connecting to ${provider}...`);
    setTimeout(onRegisterSuccess, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-6 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="bg-white rounded-[40px] border border-zinc-200 shadow-2xl shadow-zinc-200/50 overflow-hidden p-8 sm:p-12">
          
          <button 
            onClick={onBackToLogin}
            className="group flex items-center gap-2 text-zinc-400 hover:text-emerald-600 transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-emerald-100 group-hover:bg-emerald-50">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">Kembali ke Login</span>
          </button>

          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Daftar Akun Baru</span>
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight">Mulai Perjalanan RWA Anda di Petak.</h1>
            <p className="text-zinc-500 text-sm mt-3">Gunakan identitas digital atau wallet Anda untuk proses onboarding yang aman dan cepat.</p>
          </div>

          <div className="space-y-4">
            {/* Google Registration */}
            <button 
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-between p-5 rounded-3xl border-2 border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Chrome className="w-6 h-6 text-zinc-700" />
                </div>
                <div className="text-left">
                  <p className="font-black text-zinc-900 leading-none mb-1">Daftar dengan Google</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Single Sign-On</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-emerald-500 transition-colors" />
            </button>

            <div className="py-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-100" />
              <span className="text-[10px] uppercase font-black text-zinc-300 tracking-[0.2em]">Atau dengan Wallet</span>
              <div className="h-px flex-1 bg-zinc-100" />
            </div>

            {/* Web3 Wallets */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleWalletRegister('Phantom')}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group"
              >
                <div className="w-14 h-14 bg-[#AB9FF2]/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Wallet className="w-7 h-7 text-[#AB9FF2]" />
                </div>
                <span className="font-black text-sm text-zinc-900">Phantom</span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter mt-1">Solana Network</span>
              </button>

              <button 
                onClick={() => handleWalletRegister('Trust Wallet')}
                className="flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-zinc-100 hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group"
              >
                <div className="w-14 h-14 bg-[#3375BB]/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-[#3375BB]" />
                </div>
                <span className="font-black text-sm text-zinc-900">Trust Wallet</span>
                <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter mt-1">Multi-Chain</span>
              </button>
            </div>
          </div>

          <div className="mt-12 p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
             <div className="flex items-start gap-3">
               <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                 <ShieldCheck className="w-3 h-3 text-white" />
               </div>
               <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                 Dengan mendaftar, Anda menyetujui <span className="font-bold text-zinc-900 underline decoration-emerald-200">Syarat & Ketentuan</span> dan <span className="font-bold text-zinc-900 underline decoration-emerald-200">Kebijakan Privasi</span> Petak RWA Engine dalam pemrosesan data legalitas aset.
               </p>
             </div>
          </div>
        </div>

        <p className="text-center mt-8 text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Petak RWA Protocol &copy; 2026
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
