/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { 
  ShieldCheck, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  ChevronRight, 
  MapPin, 
  User, 
  Hash, 
  Maximize, 
  Shield,
  Loader2,
  RefreshCcw,
  Zap,
  LogOut,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeCertificate } from './services/geminiService';
import { ValuatorResponse } from './types';
import { cn } from './lib/utils';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import SettingsPage from './components/SettingsPage';
import UserDashboard from './components/UserDashboard';
import ValidatorEngine from './components/ValidatorEngine';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'login' | 'register' | 'dashboard' | 'settings' | 'validator' | 'admin'>('login');
  const [isAdmin, setIsAdmin] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValuatorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
      if (userEmail === 'controlpanel123@gmail.com' || userEmail === 'admin@petak.id') {
        setIsAdmin(true);
        setView('admin');
      } else {
        setIsAdmin(false);
        setView('dashboard');
      }
    } else {
      setView('login');
      setIsAdmin(false);
    }
  }, [isLoggedIn, userEmail]);

  if (!isLoggedIn) {
    if (view === 'register') {
      return (
        <RegisterPage 
          onBackToLogin={() => setView('login')} 
          onRegisterSuccess={() => {
            setView('login');
            setIsLoggedIn(true);
          }} 
        />
      );
    }
    return (
      <LoginPage 
        onLogin={(email) => {
          setUserEmail(email);
          setIsLoggedIn(true);
        }} 
        onGoToRegister={() => setView('register')} 
      />
    );
  }

  if (view === 'settings') {
    return (
      <SettingsPage 
        userEmail={userEmail} 
        onBack={() => setView(isAdmin ? 'admin' : 'dashboard')} 
      />
    );
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
       setError("Tolong unggah file gambar atau PDF.");
       return;
    }
    
    setFile(selectedFile);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !preview) return;

    setLoading(true);
    setError(null);

    try {
      const base64Data = preview.split(',')[1];
      const analysis = await analyzeCertificate(base64Data, file.type);
      setResult(analysis);
    } catch (err) {
      console.error(err);
      setError("Gagal menganalisis dokumen. Pastikan gambar jelas dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView(isAdmin ? 'admin' : 'dashboard')}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-0.5 border border-zinc-100 shadow-sm overflow-hidden">
              <img
                src="/images/logo-petak-v3.png"
                alt="Petak Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-black text-lg tracking-tight uppercase italic text-emerald-900 leading-tight">Petak RWA</span>
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-tighter">Idle Property</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              {isAdmin && (
                <button 
                  onClick={() => setView(view === 'admin' ? 'dashboard' : 'admin')}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-colors px-4 py-2 rounded-xl",
                    view === 'admin' ? "bg-emerald-600 text-white" : "text-zinc-500 hover:text-emerald-600 bg-zinc-100"
                  )}
                >
                  {view === 'admin' ? 'User Mode' : 'Admin Panel'}
                </button>
              )}
              <button 
                className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  view === 'dashboard' || view === 'validator' ? "text-emerald-600" : "text-zinc-500 hover:text-emerald-600"
                )}
                onClick={() => setView('dashboard')}
              >
                Dashboard
              </button>
            </nav>
            <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block border-r border-zinc-200 pr-4 mr-2">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-zinc-400">Operator</p>
              <p className="text-sm font-medium">{userEmail}</p>
            </div>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all flex items-center gap-2"
              title="Keluar"
            >
              <LogOut className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('settings')}
              className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden hover:border-emerald-500 hover:bg-emerald-50 transition-all group"
              title="Pengaturan Akun"
            >
               <User className="w-6 h-6 text-zinc-400 group-hover:text-emerald-600 transition-colors" />
            </button>
          </div>
          </div>
        </div>
      </header>

      <main className={cn("max-w-7xl mx-auto px-6 py-8", view === 'admin' && "max-w-full")}>
        <AnimatePresence mode="wait">
          {view === 'admin' && (
            <AdminDashboard key="admin" onLogout={() => setIsLoggedIn(false)} />
          )}

          {view === 'dashboard' && (
            <UserDashboard 
              key="dashboard"
              userEmail={userEmail} 
              onStartValidator={() => setView('validator')}
            />
          )}

          {view === 'validator' && (
            <ValidatorEngine 
              key="validator"
              onBack={() => setView('dashboard')}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              processFile={processFile}
              handleUpload={handleUpload}
              reset={reset}
              preview={preview}
              loading={loading}
              result={result}
              error={error}
              file={file}
            />
          )}
        </AnimatePresence>
      </main>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,application/pdf"
      />
    </div>
  );
}
