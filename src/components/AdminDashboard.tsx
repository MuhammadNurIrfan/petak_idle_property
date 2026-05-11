import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Building, 
  Zap, 
  ShoppingBag, 
  History, 
  LineChart, 
  FileText, 
  Settings, 
  ShieldAlert,
  Search,
  Filter,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Lock,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  ChevronRight,
  Download,
  Eye,
  Edit2,
  Maximize,
  Play,
  Database,
  ArrowRight,
  ShieldCheck,
  Server,
  BellRing,
  Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from '../lib/utils';
import { 
  AdminStats, 
  UserManagementRecord, 
  PhysicalPropertyRecord, 
  TokenizationRequest, 
  TokenSaleCampaign, 
  PlatformFinance, 
  AuditLogEntry,
  Transaction,
  LegalDocument
} from '../types';

type AdminTab = 
  | 'overview' 
  | 'users' 
  | 'properties' 
  | 'tokenization' 
  | 'campaigns' 
  | 'transactions' 
  | 'finance' 
  | 'content' 
  | 'settings' 
  | 'audit';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Mock Data
  const stats: AdminStats = {
    totalUsers: 1420,
    totalProperties: 48,
    totalAssetValue: 125000000000,
    circulatingTokens: 852000,
    totalFundsRaised: 42500000000,
    totalProfitDistributed: 8400000000
  };

  const users: UserManagementRecord[] = [
    { id: 'usr-001', fullName: 'MN Irfan', username: 'irfannn', email: 'MNIrfan33@gmail.com', phone: '08123456789', status: 'Aktif', kycStatus: 'Verified', createdAt: '2024-01-10' },
    { id: 'usr-002', fullName: 'Budi Santoso', username: 'budis', email: 'budi@example.com', phone: '08198765432', status: 'Aktif', kycStatus: 'Pending', createdAt: '2024-03-15' },
    { id: 'usr-003', fullName: 'Siti Aminah', username: 'sitiam', email: 'siti@example.com', phone: '08521122334', status: 'Terblokir', kycStatus: 'Rejected', createdAt: '2023-11-20' },
  ];

  const properties: PhysicalPropertyRecord[] = [
    { id: 'prop-101', name: 'Apartemen Sudirman Park', location: 'Jakarta Pusat', area: 85, physicalStatus: 'Disewakan', tokenizationStatus: 'Ditokenisasi Penuh', originalOwner: 'PT Surya Properti' },
    { id: 'prop-102', name: 'Ruko Gading Serpong', location: 'Tangerang', area: 120, physicalStatus: 'Dalam Renovasi', tokenizationStatus: 'Dalam Proses', originalOwner: 'Hendrawan' },
    { id: 'prop-103', name: 'Tanah Kavling BSD', location: 'Tangerang Selatan', area: 450, physicalStatus: 'Idle', tokenizationStatus: 'Belum', originalOwner: 'Siti Aminah' },
  ];

  const legalDocuments: LegalDocument[] = [
    { id: 'doc-001', name: 'Terms of Service - Platform v2.4', category: 'Terms & Conditions', lastUpdated: '2024-05-01', status: 'Published', version: '2.4.0', author: 'Legal Team' },
    { id: 'doc-002', name: 'Privacy Policy 2024', category: 'Privacy Policy', lastUpdated: '2024-04-15', status: 'Published', version: '1.2.0', author: 'Legal Team' },
    { id: 'doc-003', name: 'Investor Participation Agreement', category: 'Legal Agreement', lastUpdated: '2024-05-05', status: 'Draft', version: '3.0.0-beta', author: 'Admin' },
    { id: 'doc-004', name: 'Deed of Trust - Tebet House', category: 'Property Deed', lastUpdated: '2024-02-20', status: 'Published', version: '1.0.0', author: 'Notary Public' },
    { id: 'doc-005', name: 'User KYC Guidelines', category: 'KYC Doc', lastUpdated: '2024-03-10', status: 'Archived', version: '0.9.0', author: 'Compliance' },
  ];

  const tokenizationRequests: TokenizationRequest[] = [
    { id: 'req-501', propertyId: 'prop-102', propertyName: 'Ruko Gading Serpong', uploaderName: 'Hendrawan', date: '2024-05-02', status: 'Menunggu Validasi' },
    { id: 'req-502', propertyId: 'prop-101', propertyName: 'Apartemen Sudirman Park', uploaderName: 'Surya', date: '2024-04-15', status: 'Minting Selesai' },
  ];

  const campaigns: TokenSaleCampaign[] = [
    { id: 'cmp-201', propertyName: 'Modern Tebet House', targetFunds: 2500000000, raisedFunds: 1850000000, status: 'Aktif', timeLeft: '8 Hari' },
    { id: 'cmp-202', propertyName: 'Co-Living Serpong', targetFunds: 4000000000, raisedFunds: 4000000000, status: 'Selesai' },
  ];

  const recentTransactions: Transaction[] = [
    { id: 'tx-801', hash: '0x32a...f92', date: '2024-05-09 14:20', type: 'Buy', assetName: 'Tebet House', amount: '500 Token', gasFee: '0.12 MATIC', status: 'Berhasil', from: '0x123...abc', to: '0x456...def' },
    { id: 'tx-802', hash: '0x992...c11', date: '2024-05-08 09:12', type: 'Transfer', assetName: 'Ruko BSD', amount: '100 Token', gasFee: '0.08 MATIC', status: 'Berhasil', from: '0x777...888', to: '0x999...000' },
  ];

  const auditLogs: AuditLogEntry[] = [
    { id: 'log-001', adminName: 'Admin Utama', action: 'Verify KYC', targetObject: 'User: Budi Santoso', timestamp: '2024-05-09 10:15', ipAddress: '192.168.1.45' },
    { id: 'log-002', adminName: 'Manager Properti', action: 'Add Property', targetObject: 'Prop: Tanah BSD', timestamp: '2024-05-08 16:40', ipAddress: '192.168.1.12' },
  ];

  const chartData = [
    { name: 'Sen', m: 400, u: 240 },
    { name: 'Sel', m: 300, u: 139 },
    { name: 'Rab', m: 200, u: 980 },
    { name: 'Kam', m: 278, u: 390 },
    { name: 'Jum', m: 189, u: 480 },
    { name: 'Sab', m: 239, u: 380 },
    { name: 'Min', m: 349, u: 430 },
  ];

   const [isSimulatingDistribution, setIsSimulatingDistribution] = useState(false);
   const [simulationStep, setSimulationStep] = useState(0);

   const handleExecuteDistribution = () => {
      setIsSimulatingDistribution(true);
      setSimulationStep(1);
      
      // Step 1: Validasi Wallet Platform
      setTimeout(() => setSimulationStep(2), 1500);
      // Step 2: Perhitungan Rasio (50:30:20)
      setTimeout(() => setSimulationStep(3), 3000);
      // Step 3: Broadcasting to Blockchain
      setTimeout(() => setSimulationStep(4), 5000);
      // Step 4: Berhasil
      setTimeout(() => {
         setIsSimulatingDistribution(false);
         setSimulationStep(0);
         alert("Distribusi Berhasil! Dana telah dikirim ke 1,420 Investor (50%), 1 Owner (30%), dan Platform Wallet (20%). Transaksi On-chain tercatat.");
      }, 7000);
   };

  const NavItem = ({ id, label, icon: Icon }: { id: AdminTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm tracking-tight mb-1",
        activeTab === id 
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
          : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className={cn("transition-opacity duration-300", !isSidebarOpen && "md:opacity-0")}>{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-[#F0F2F5] -mx-6 -my-8">
      {/* Sidebar */}
      <aside className={cn(
        "bg-white border-r border-zinc-200 transition-all duration-500 flex flex-col z-50",
        isSidebarOpen ? "w-72" : "w-20"
      )}>
        <div className="p-6 flex items-center justify-between mb-4">
           <div className={cn("flex items-center gap-2 overflow-hidden", !isSidebarOpen && "invisible")}>
             <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shrink-0">
               <ShieldAlert className="text-white w-6 h-6" />
             </div>
             <span className="font-black text-xl tracking-tighter text-zinc-900 whitespace-nowrap">PETAK ADMIN</span>
           </div>
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hidden md:block"
           >
             <MoreVertical className="w-5 h-5" />
           </button>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto">
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4 ml-4", !isSidebarOpen && "hidden")}>Menu Utama</p>
          <NavItem id="overview" label="Dashboard" icon={BarChart3} />
          <NavItem id="users" label="Pengguna" icon={Users} />
          <NavItem id="properties" label="Properti" icon={Building} />
          <NavItem id="tokenization" label="Tokenisasi" icon={Zap} />
          <NavItem id="campaigns" label="Kampanye" icon={ShoppingBag} />
          
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 my-6 ml-4", !isSidebarOpen && "hidden")}>Operasional</p>
          <NavItem id="transactions" label="Transaksi" icon={History} />
          <NavItem id="finance" label="Keuangan" icon={LineChart} />
          <NavItem id="content" label="Konten & Legal" icon={FileText} />
          
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 my-6 ml-4", !isSidebarOpen && "hidden")}>Sistem</p>
          <NavItem id="settings" label="Pengaturan" icon={Settings} />
          <NavItem id="audit" label="Log Audit" icon={ShieldAlert} />
        </nav>

        <div className="p-4 border-t border-zinc-100">
           <div className={cn("p-4 bg-zinc-50 rounded-2xl flex items-center gap-3", !isSidebarOpen && "justify-center px-2")}>
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">AD</div>
              <div className={cn("flex-1 overflow-hidden", !isSidebarOpen && "hidden")}>
                 <p className="text-xs font-black text-zinc-900 truncate">Super Admin</p>
                 <p className="text-[10px] font-medium text-zinc-400 truncate">admin@petak.id</p>
              </div>
              <button className={cn("text-zinc-400 hover:text-rose-500", !isSidebarOpen && "hidden")}>
                 <LogOut className="w-4 h-4" />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-8 py-10">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
           <div>
              <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
                {activeTab === 'overview' && 'Overview Dashboard'}
                {activeTab === 'users' && 'Manajemen Pengguna'}
                {activeTab === 'properties' && 'Manajemen Properti'}
                {activeTab === 'tokenization' && 'Antrean Tokenisasi'}
                {activeTab === 'campaigns' && 'Kampanye Crowdfunding'}
                {activeTab === 'transactions' && 'Log Transaksi Platform'}
                {activeTab === 'finance' && 'Keuangan & Distribusi'}
                {activeTab === 'content' && 'Konten & Dokumen Legal'}
                {activeTab === 'settings' && 'Pengaturan Sistem'}
                {activeTab === 'audit' && 'Jejak Audit'}
              </h1>
              <p className="text-zinc-500 font-medium text-sm">Update terakhir: Hari ini, 14:20</p>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                 <input type="text" placeholder="Global Search..." className="pl-11 pr-4 py-3 bg-white border border-zinc-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all w-64 shadow-sm" />
              </div>
              <button className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-black transition-colors relative">
                 <Lock className="w-5 h-5" />
                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-black">2</span>
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
               {/* Stats Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Pengguna', value: stats.totalUsers, color: 'text-zinc-900', icon: Users, sub: '+12% bln ini' },
                    { label: 'Aset Aktif', value: stats.totalProperties, color: 'text-zinc-900', icon: Building, sub: '4 dalam renov' },
                    { label: 'Circulating Tokens', value: stats.circulatingTokens.toLocaleString(), color: 'text-emerald-700', icon: Zap, sub: 'ERC-721/1155' },
                    { label: 'Total Dana Terkumpul', value: `Rp ${(stats.totalFundsRaised / 1000000000).toFixed(1)}M`, color: 'text-zinc-900', icon: ShoppingBag, sub: 'Crowdfunding' }
                  ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-zinc-200 shadow-sm relative overflow-hidden group">
                       <div className="absolute -right-4 -top-4 w-16 h-16 bg-zinc-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                       <div className="flex items-center justify-between mb-4 relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{s.label}</p>
                          <s.icon className="w-4 h-4 text-zinc-300" />
                       </div>
                       <h3 className={cn("text-2xl font-black mb-1 relative z-10", s.color)}>{s.value}</h3>
                       <p className="text-[11px] font-bold text-emerald-500 relative z-10">{s.sub}</p>
                    </div>
                  ))}
               </div>

               {/* Large Stats Section */}
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                     <div className="flex items-center justify-between mb-10">
                        <h3 className="font-black text-zinc-900 flex items-center gap-2">
                           <LineChart className="w-5 h-5 text-emerald-600" />
                           Proyeksi & Pertumbuhan Platform
                        </h3>
                        <div className="flex gap-2">
                           <button className="px-4 py-2 border border-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-500 hover:bg-zinc-50">Hari</button>
                           <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase">Minggu</button>
                        </div>
                     </div>
                     <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={chartData}>
                              <defs>
                                 <linearGradient id="colorU" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                              <YAxis hide />
                              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                              <Area type="monotone" dataKey="u" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorU)" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="lg:col-span-4 bg-zinc-900 rounded-[40px] p-8 text-white flex flex-col justify-between">
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Total Aset Tokenisasi</p>
                        <h3 className="text-4xl font-black tabular-nums">Rp 125,0M</h3>
                        <div className="flex items-center gap-2 mt-4 text-emerald-500 font-bold text-xs">
                           <ArrowUpRight className="w-4 h-4" />
                           <span>+Rp 14.5M bln ini</span>
                        </div>
                     </div>

                     <div className="space-y-4 mt-12">
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                           <div>
                              <p className="text-[10px] font-black text-zinc-500 uppercase mb-1">Profit Terdistribusi</p>
                              <p className="text-lg font-black tracking-tight">Rp 8,4M</p>
                           </div>
                           <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Export Laporan Keuangan</button>
                     </div>
                  </div>
               </div>

               {/* Recent Activity Table */}
               <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-black text-zinc-900 flex items-center gap-2 text-lg">
                        Log Aktivitas Platform Terbaru
                     </h3>
                     <button className="text-[10px] font-black uppercase text-emerald-600 tracking-widest px-4 py-2 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-colors">Lihat Semua</button>
                  </div>
                  <div className="space-y-4">
                     {[
                       { type: 'KYC', name: 'Budi Santoso', status: 'Verification Success', time: '5 Menit Lalu', icon: ShieldAlert, color: 'text-blue-500', bg: 'bg-blue-50' },
                       { type: 'MINT', name: 'Ruko Gading Serpong', status: 'Minting Completed', time: '12 Menit Lalu', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                       { type: 'SALE', name: 'Apartemen Sudiman', status: 'Target 75% Reached', time: '40 Menit Lalu', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-50' }
                     ].map((act, i) => (
                       <div key={i} className="flex items-center justify-between p-4 bg-zinc-50/50 rounded-3xl border border-zinc-50 hover:bg-zinc-50 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", act.bg, act.color)}>
                                <act.icon className="w-5 h-5" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-zinc-900">{act.name}</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">{act.status}</p>
                             </div>
                          </div>
                          <p className="text-xs font-bold text-zinc-400">{act.time}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
               <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900">Manajemen Pengguna</h2>
                    <p className="text-sm text-zinc-500 font-medium">Monitoring status akun, KYC, dan aset user terdaftar.</p>
                  </div>
                  <div className="flex gap-3">
                     <div className="relative">
                        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input type="text" placeholder="Cari nama/email..." className="pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold outline-none focus:border-emerald-500 transition-all w-64" />
                     </div>
                     <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors">
                        <Filter className="w-5 h-5 text-zinc-400" />
                     </button>
                  </div>
               </div>

               <div className="bg-white rounded-[40px] border border-zinc-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                     <table className="w-full">
                        <thead>
                           <tr className="bg-zinc-50 border-b border-zinc-100 text-left">
                              <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Pengguna</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Kontak</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">KYC Status</th>
                              <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Status Akun</th>
                              <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-zinc-400 tracking-widest">Aksi</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-50">
                           {users.map(user => (
                             <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 font-black">
                                         {user.fullName.charAt(0)}
                                      </div>
                                      <div>
                                         <p className="text-sm font-black text-zinc-900">{user.fullName}</p>
                                         <p className="text-[10px] font-bold text-zinc-400 uppercase">@{user.username}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <div className="space-y-1">
                                      <p className="text-xs font-bold text-zinc-700 flex items-center gap-1.5"><Mail className="w-3 h-3 text-zinc-300" /> {user.email}</p>
                                      <p className="text-xs font-bold text-zinc-700 flex items-center gap-1.5"><Phone className="w-3 h-3 text-zinc-300" /> {user.phone}</p>
                                   </div>
                                </td>
                                <td className="px-8 py-6">
                                   <span className={cn(
                                     "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                     user.kycStatus === 'Verified' ? "bg-emerald-100 text-emerald-700" : 
                                     user.kycStatus === 'Pending' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                                   )}>
                                      {user.kycStatus}
                                   </span>
                                </td>
                                <td className="px-8 py-6">
                                   <span className={cn(
                                     "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                     user.status === 'Aktif' ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-400"
                                   )}>
                                      {user.status}
                                   </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex items-center justify-end gap-2">
                                      <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 flex items-center gap-1.5 font-bold text-[10px] uppercase">
                                         <Eye className="w-4 h-4" />
                                      </button>
                                      <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400">
                                         <Edit2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  <div className="p-8 border-t border-zinc-50 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                     <span>Menampilkan 1-10 dari 1,420 user</span>
                     <div className="flex gap-2">
                        <button className="px-4 py-2 bg-zinc-50 rounded-lg hover:bg-zinc-100 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-4 py-2 bg-zinc-100 rounded-lg hover:bg-zinc-200">Next</button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'properties' && (
             <motion.div key="properties" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex-1">
                      <h2 className="text-2xl font-black text-zinc-900">Manajemen Aset Fisik</h2>
                      <p className="text-sm text-zinc-500 font-medium">Inventori properti dari Idle sampai dengan Exit (Capital Gain).</p>
                   </div>
                   <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                      <Plus className="w-5 h-5" />
                      Tambah Properti Baru
                   </button>
                </div>

                <div className="grid grid-cols-1 gap-6">
                   {properties.map(prop => (
                      <div key={prop.id} className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group">
                         <div className="flex flex-col lg:flex-row items-center gap-8">
                            <div className="w-24 h-24 rounded-[32px] bg-zinc-50 border-2 border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                               <Building className="w-10 h-10 text-emerald-600" />
                            </div>
                            <div className="flex-1 space-y-2 text-center lg:text-left">
                               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                                  <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest">{prop.id}</span>
                                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">{prop.physicalStatus}</span>
                               </div>
                               <h3 className="text-xl font-black text-zinc-900">{prop.name}</h3>
                               <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-bold text-zinc-400">
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {prop.location}</span>
                                  <span className="flex items-center gap-1"><Maximize className="w-3 h-3" /> {prop.area} m²</span>
                               </div>
                            </div>
                            <div className="grid grid-cols-2 lg:flex items-center gap-8 text-center lg:text-left pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-zinc-100 lg:pl-10">
                               <div>
                                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status Token</p>
                                  <p className="text-sm font-black text-emerald-600">{prop.tokenizationStatus}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Owner Asli</p>
                                  <p className="text-sm font-black text-zinc-900">{prop.originalOwner}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-3 w-full lg:w-auto">
                               <button className="flex-1 lg:flex-none py-4 px-8 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Kelola Properti</button>
                               <button className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl hover:bg-zinc-100 transition-colors">
                                  <MoreVertical className="w-5 h-5 text-zinc-400" />
                               </button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'tokenization' && (
             <motion.div key="tokenization" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="flex items-center justify-between mb-2">
                   <div>
                      <h2 className="text-2xl font-black text-zinc-900">Validasi & Minting</h2>
                      <p className="text-sm text-zinc-500 font-medium">Queue pengajuan sertifikat SHM untuk diubah menjadi On-Chain Token.</p>
                   </div>
                   <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                      <Clock className="w-4 h-4" />
                      14 Request Pending
                   </div>
                </div>

                <div className="space-y-4">
                   {tokenizationRequests.map(req => (
                      <div key={req.id} className="bg-white p-6 rounded-[32px] border border-zinc-200 flex flex-col md:flex-row items-center gap-8 group">
                         <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center shrink-0 border border-zinc-100 text-zinc-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                            <Zap className="w-8 h-8" />
                         </div>
                         <div className="flex-1 text-center md:text-left space-y-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                               <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{req.id}</span>
                               <span className={cn(
                                 "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded",
                                 req.status === 'Menunggu Validasi' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                               )}>{req.status}</span>
                            </div>
                            <h3 className="text-lg font-black text-zinc-900">{req.propertyName}</h3>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-tight">Oleh: {req.uploaderName} • {req.date}</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <button className="h-12 px-6 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors">Hasil AI Validator</button>
                            <button className="h-12 px-8 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/10">Proceed Minting</button>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'campaigns' && (
             <motion.div key="campaigns" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex-1">
                      <h2 className="text-2xl font-black text-zinc-900">Crowdfunding Campaigns</h2>
                      <p className="text-sm text-zinc-500 font-medium">Manajemen kampanye penjualan token untuk renovasi dan investasi.</p>
                   </div>
                   <button className="bg-zinc-900 hover:bg-black text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-zinc-900/20">
                      <Plus className="w-5 h-5" />
                      Buat Kampanye Baru
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {campaigns.map(cmp => (
                      <div key={cmp.id} className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-8 flex flex-col group">
                         <div className="flex items-start justify-between">
                            <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                               <ShoppingBag className="w-7 h-7" />
                            </div>
                            <span className={cn(
                              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm",
                              cmp.status === 'Aktif' ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-500"
                            )}>
                               {cmp.status}
                            </span>
                         </div>
                         <div className="flex-1">
                            <h3 className="text-2xl font-black text-zinc-900 mb-2 leading-tight">{cmp.propertyName}</h3>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{cmp.id}</p>
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-3">
                               <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                  <span className="text-zinc-400">Penggalangan Dana</span>
                                  <span className="text-emerald-600">{((cmp.raisedFunds / cmp.targetFunds) * 100).toFixed(0)}% Selesai</span>
                               </div>
                               <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500" style={{ width: `${(cmp.raisedFunds / cmp.targetFunds) * 100}%` }} />
                               </div>
                               <div className="flex items-center justify-between">
                                  <p className="text-xs font-bold text-zinc-900">Total Rp {(cmp.targetFunds / 1000000000).toFixed(1)}M</p>
                                  {cmp.timeLeft && <p className="text-xs font-bold text-amber-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {cmp.timeLeft}</p>}
                               </div>
                            </div>
                            <div className="flex gap-3">
                               <button className="flex-1 py-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">View Investors</button>
                               <button className="flex-1 py-4 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all">Edit Settings</button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'transactions' && (
             <motion.div key="transactions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex items-center justify-between">
                   <h2 className="text-2xl font-black text-zinc-900">Log Transaksi Platform</h2>
                   <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600">
                         <Download className="w-4 h-4" />
                         Export CSV
                      </button>
                      <button className="bg-zinc-900 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Filter</button>
                   </div>
                </div>

                <div className="bg-white rounded-[40px] border border-zinc-200 shadow-sm overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full">
                         <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100 text-left">
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Waktu & Hash</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Jenis</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Pengirim / Penerima</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Aset & Jumlah</th>
                               <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-zinc-400 tracking-widest">Aksi</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-zinc-50">
                            {recentTransactions.map(tx => (
                               <tr key={tx.id} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-8 py-6">
                                     <p className="text-xs font-black text-zinc-900">{tx.hash}</p>
                                     <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">{tx.date}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className={cn(
                                       "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                       tx.type === 'Buy' ? "bg-blue-100 text-blue-700" : "bg-zinc-100 text-zinc-700"
                                     )}>{tx.type}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <div className="text-[10px] font-mono font-bold text-zinc-400 space-y-1">
                                        <p><span className="text-zinc-300">FR:</span> {tx.from}</p>
                                        <p><span className="text-zinc-300">TO:</span> {tx.to}</p>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6">
                                     <p className="text-xs font-black text-zinc-900">{tx.assetName}</p>
                                     <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">{tx.amount}</p> 
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                     <button className="text-zinc-300 hover:text-zinc-900 transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                     </button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div key="content" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black text-zinc-900 leading-none">Konten & Legal</h1>
                    <p className="text-zinc-500 font-medium mt-2">Kelola dokumen hukum, persetujuan, dan aset digital platform.</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black flex items-center gap-2">
                       <Plus className="w-4 h-4" />
                       Dokumen Baru
                    </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                 <div className="lg:col-span-1 space-y-4">
                   <div className="bg-white rounded-[32px] border border-zinc-200 p-6 shadow-sm">
                     <h3 className="text-sm font-black text-zinc-900 mb-4 uppercase tracking-widest">Kategori</h3>
                     <div className="space-y-1">
                        {['Semua', 'Legal Agreement', 'Terms & Conditions', 'Privacy Policy', 'Property Deed', 'KYC Doc'].map((cat) => (
                           <button key={cat} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all ${cat === 'Semua' ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:bg-zinc-50'}`}>
                              {cat}
                           </button>
                        ))}
                     </div>
                   </div>

                   <div className="bg-emerald-900 rounded-[32px] p-6 text-white overflow-hidden relative">
                     <div className="relative z-10">
                        <FileText className="w-8 h-8 text-emerald-400 mb-4" />
                        <h3 className="text-lg font-black leading-tight">Backup Dokumen Berkala</h3>
                        <p className="text-xs text-emerald-100/60 mt-2 font-medium">Sistem melakukan backup otomatis ke IPFS setiap 24 jam.</p>
                        <button className="mt-6 w-full py-3 bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">Lihat Storage</button>
                     </div>
                     <Database className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
                   </div>
                 </div>

                 <div className="lg:col-span-3">
                   <div className="bg-white rounded-[40px] border border-zinc-200 shadow-sm overflow-hidden">
                     <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="relative w-full md:w-96">
                           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                           <input type="text" placeholder="Cari dokumen..." className="w-full pl-12 pr-4 py-3 bg-white border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all" />
                        </div>
                        <div className="flex items-center gap-2">
                           <button className="p-3 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all">
                              <Filter className="w-4 h-4 text-zinc-600" />
                           </button>
                        </div>
                     </div>
                     
                     <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                           <thead>
                              <tr className="bg-zinc-50/50">
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Nama Dokumen</th>
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Kategori</th>
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Update Terakhir</th>
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Versi</th>
                                 <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Aksi</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-zinc-100">
                              {legalDocuments.map((doc) => (
                                 <tr key={doc.id} className="hover:bg-zinc-50 transition-colors group">
                                    <td className="px-6 py-4">
                                       <div className="flex items-center gap-3">
                                          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-zinc-200 shadow-sm">
                                             <FileText className="w-5 h-5 text-zinc-600" />
                                          </div>
                                          <div>
                                             <p className="text-sm font-bold text-zinc-900">{doc.name}</p>
                                             <p className="text-[10px] font-medium text-zinc-500">By {doc.author}</p>
                                          </div>
                                       </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tight bg-zinc-100 px-2 py-1 rounded-md">{doc.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className="flex items-center gap-2 text-zinc-500">
                                          <Clock className="w-3.5 h-3.5" />
                                          <span className="text-xs font-medium">{doc.lastUpdated}</span>
                                       </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <div className={cn(
                                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                          doc.status === 'Published' && "bg-emerald-50 text-emerald-600",
                                          doc.status === 'Draft' && "bg-amber-50 text-amber-600",
                                          doc.status === 'Archived' && "bg-zinc-100 text-zinc-500"
                                       )}>
                                          <div className={cn(
                                             "w-1.5 h-1.5 rounded-full",
                                             doc.status === 'Published' && "bg-emerald-600",
                                             doc.status === 'Draft' && "bg-amber-600",
                                             doc.status === 'Archived' && "bg-zinc-500"
                                          )} />
                                          {doc.status}
                                       </div>
                                    </td>
                                    <td className="px-6 py-4">
                                       <span className="text-xs font-mono font-bold text-zinc-400">v{doc.version}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                       <div className="flex items-center gap-2">
                                          <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all">
                                             <Eye className="w-4 h-4" />
                                          </button>
                                          <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all">
                                             <Edit2 className="w-4 h-4" />
                                          </button>
                                          <button className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                             <MoreVertical className="w-4 h-4" />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>

                     <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between mt-auto">
                        <p className="text-xs font-bold text-zinc-400 tracking-tight uppercase">Menampilkan 5 dari 12 Dokumen</p>
                        <div className="flex gap-2">
                           <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-400 cursor-not-allowed">Doc. Sebelumnya</button>
                           <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase text-zinc-900 hover:bg-zinc-50">Doc. Selanjutnya</button>
                        </div>
                     </div>
                   </div>
                 </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'finance' && (
             <motion.div key="finance" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                {/* Simulation Overlay */}
                {isSimulatingDistribution && (
                   <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-center">
                      <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="bg-white rounded-[40px] p-10 max-w-md w-full shadow-2xl border border-white/20"
                      >
                         <div className="flex justify-center mb-6">
                            <div className="relative">
                               <div className="w-20 h-20 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                               <div className="absolute inset-0 flex items-center justify-center">
                                  <Database className="w-8 h-8 text-emerald-600" />
                               </div>
                            </div>
                         </div>
                         
                         <h3 className="text-2xl font-black text-zinc-900 mb-2">Simulasi Smart Contract</h3>
                         <p className="text-zinc-500 font-medium mb-8">Memproses distribusi profit sharing sesuai rasio 50:30:20 secara on-chain...</p>
                         
                         <div className="space-y-4">
                            <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${simulationStep >= 1 ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-50 text-zinc-400'}`}>
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${simulationStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>1</div>
                               <span className="text-sm font-bold">Validasi Wallet & Likuiditas</span>
                            </div>
                            <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${simulationStep >= 2 ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-50 text-zinc-400'}`}>
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${simulationStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>2</div>
                               <span className="text-sm font-bold">Kalkulasi Snapshot Token Holder</span>
                            </div>
                            <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${simulationStep >= 3 ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-50 text-zinc-400'}`}>
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${simulationStep >= 3 ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>3</div>
                               <span className="text-sm font-bold">Distribusi Proporsional (50:30:20)</span>
                            </div>
                            <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${simulationStep >= 4 ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-50 text-zinc-400'}`}>
                               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${simulationStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-zinc-200 text-zinc-500'}`}>4</div>
                               <span className="text-sm font-bold">Finalisasi Ledger On-Chain</span>
                            </div>
                         </div>
                      </motion.div>
                   </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-zinc-900 rounded-[40px] p-8 text-white space-y-10 relative overflow-hidden">
                      <div className="absolute right-0 top-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div>
                         <h2 className="text-2xl font-black text-emerald-500 tracking-tight uppercase mb-8">Platform Revenue</h2>
                         <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                               <div>
                                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-2">Total Pendapatan</p>
                                  <h3 className="text-3xl font-black text-white">Rp 2.45M</h3>
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-2">Saldo Dompet</p>
                                  <h3 className="text-3xl font-black text-white">425.2k MATIC</h3>
                               </div>
                            </div>
                            <div className="h-px bg-white/10" />
                            <div className="flex flex-wrap gap-4">
                               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                  <Zap className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px] font-bold uppercase text-zinc-400">Mint Fees: <span className="text-white">R$ 1.2M</span></span>
                               </div>
                               <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                  <History className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px] font-bold uppercase text-zinc-400">Trade Fees: <span className="text-white">R$ 450jt</span></span>
                               </div>
                            </div>
                         </div>
                      </div>
                      <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 rounded-3xl font-black text-xs uppercase tracking-widest transition-all">Withdraw Platform Fees</button>
                   </div>

                   <div className="bg-white rounded-[40px] border border-zinc-200 p-8 flex flex-col justify-between space-y-10">
                      <div>
                         <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Jadwal Distribusi</h2>
                         <p className="text-sm font-medium text-zinc-400">Kelola dan eksekusi profit sharing kepada pemegang token.</p>
                      </div>
                      <div className="space-y-4">
                         {[
                           { name: 'Lease Profit Q2 2024', status: 'Dijadwalkan', date: '25 Juni 2024', amount: 'Rp 450jt' },
                           { name: 'Capital Gain Tebet Exit', status: 'Pending Approval', date: '30 Mei 2024', amount: 'Rp 1.2M' }
                         ].map((dist, i) => (
                           <div key={i} className="p-5 bg-zinc-50 rounded-[32px] border border-zinc-50 flex items-center justify-between group">
                              <div>
                                 <p className="text-sm font-black text-zinc-900">{dist.name}</p>
                                 <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">{dist.date} • {dist.amount}</p>
                              </div>
                              <button 
                                onClick={handleExecuteDistribution}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                              >
                                 <Play className="w-3 h-3 fill-current" />
                                 Execute
                              </button>
                           </div>
                         ))}
                      </div>
                      <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black">Buat Distribusi Baru</button>
                   </div>
                </div>

                {/* New Section for Profit Sharing Ratio */}
                <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                   <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
                      <div>
                         <h2 className="text-xl font-black text-zinc-900 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-emerald-600" />
                            Konfigurasi Rasio Profit Sharing (Default)
                         </h2>
                         <p className="text-sm font-medium text-zinc-500 mt-1">Pengaturan pembagian dividen otomatis untuk setiap aset yang dikelola.</p>
                      </div>
                      <button className="px-6 py-3 border border-zinc-200 rounded-xl text-xs font-black uppercase text-zinc-900 hover:bg-zinc-50 flex items-center gap-2">
                         <Edit2 className="w-4 h-4" />
                         Ubah Konfigurasi
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[32px] relative overflow-hidden group">
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Token Holders</p>
                            <h3 className="text-4xl font-black text-emerald-700">50%</h3>
                            <p className="text-xs font-medium text-emerald-600/70 mt-2">Diberikan secara harian/bulanan ke dompet investor.</p>
                         </div>
                         <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Users className="w-24 h-24 text-emerald-900" />
                         </div>
                      </div>

                      <div className="p-6 bg-blue-50 border border-blue-100 rounded-[32px] relative overflow-hidden group">
                         <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Original Owner</p>
                            <h3 className="text-4xl font-black text-blue-700">30%</h3>
                            <p className="text-xs font-medium text-blue-600/70 mt-2">Bonus pengelolaan dan sisa kepemilikan aset fisik.</p>
                         </div>
                         <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                            <Building className="w-24 h-24 text-blue-900" />
                         </div>
                      </div>

                      <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-[32px] relative overflow-hidden group">
                         <div className="relative z-10 text-white">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Platform Fee</p>
                            <h3 className="text-4xl font-black text-emerald-500">20%</h3>
                            <p className="text-xs font-medium text-zinc-400 mt-2">Biaya layanan, pajak, dan pemeliharaan ekosistem.</p>
                         </div>
                         <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <ShieldAlert className="w-24 h-24 text-white" />
                         </div>
                      </div>
                   </div>
                   
                   <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-amber-700 leading-relaxed">
                         <strong>Catatan:</strong> Rasio ini adalah nilai default sistem. Admin dapat menyesuaikan rasio secara spesifik per properti pada menu "Detail Properti" jika terdapat kesepakatan kontrak yang berbeda.
                      </p>
                   </div>
                </div>
             </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
               <div>
                 <h1 className="text-3xl font-black text-zinc-900 leading-none">Pengaturan Sistem</h1>
                 <p className="text-zinc-500 font-medium mt-2">Konfigurasi parameter global, integrasi API, dan parameter operasional platform.</p>
               </div>

               <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Left Column: General & Security */}
                  <div className="xl:col-span-2 space-y-8">
                     {/* General Settings */}
                     <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                              <Settings className="w-5 h-5 text-zinc-900" />
                           </div>
                           <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Konfigurasi Umum</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Nama Platform</label>
                              <input type="text" defaultValue="PETAK REAL ESTATE" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-zinc-900 outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">URL Domain Utama</label>
                              <input type="text" defaultValue="https://petak.id" className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-zinc-900 outline-none" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Mata Uang Default</label>
                              <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-zinc-900 outline-none">
                                 <option>IDR (Rupiah)</option>
                                 <option>USD (Dollar)</option>
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Zona Waktu</label>
                              <select className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-zinc-900 outline-none">
                                 <option>Asia/Jakarta (GMT+7)</option>
                                 <option>Asia/Makassar (GMT+8)</option>
                                 <option>Asia/Jayapura (GMT+9)</option>
                              </select>
                           </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-zinc-100 space-y-6">
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-sm font-black text-zinc-900">Mode Maintenance</p>
                                 <p className="text-xs font-medium text-zinc-500">Nonaktifkan akses publik sementara untuk pemeliharaan sistem.</p>
                              </div>
                              <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-pointer">
                                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                              </div>
                           </div>
                           <div className="flex items-center justify-between">
                              <div>
                                 <p className="text-sm font-black text-zinc-900">Registrasi Pengguna Baru</p>
                                 <p className="text-xs font-medium text-zinc-500">Izinkan pengunjung untuk mendaftar akun baru.</p>
                              </div>
                              <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* Security Settings */}
                     <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                           <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center">
                              <ShieldCheck className="w-5 h-5 text-zinc-900" />
                           </div>
                           <h3 className="text-lg font-black text-zinc-900 uppercase tracking-tight">Keamanan & Akses</h3>
                        </div>

                        <div className="space-y-6">
                           <div className="p-4 bg-zinc-50 rounded-2xl flex items-center justify-between group hover:bg-zinc-100 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-400">
                                    <Lock className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-zinc-900">Two-Factor Authentication (2FA)</p>
                                    <p className="text-[10px] font-bold text-emerald-600 uppercase">Wajib untuk Admin</p>
                                 </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-all" />
                           </div>

                           <div className="p-4 bg-zinc-50 rounded-2xl flex items-center justify-between group hover:bg-zinc-100 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-400">
                                    <ShieldAlert className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-zinc-900">IP Whitelist Dashboard Admin</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase">3 IP Terdaftar</p>
                                 </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-all" />
                           </div>

                           <div className="p-4 bg-zinc-50 rounded-2xl flex items-center justify-between group hover:bg-zinc-100 transition-colors cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-400">
                                    <Key className="w-5 h-5" />
                                 </div>
                                 <div>
                                    <p className="text-sm font-black text-zinc-900">Kebijakan Password</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase">Min. 12 Karakter + Simbol</p>
                                 </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-900 transition-all" />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Node & Blockchain Info */}
                  <div className="space-y-8">
                     <div className="bg-zinc-900 rounded-[40px] p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="flex items-center gap-3 mb-8">
                              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                                 <Server className="w-5 h-5 text-emerald-400" />
                              </div>
                              <h3 className="text-lg font-black uppercase tracking-tight">Koneksi Blockchain</h3>
                           </div>
                           <div className="space-y-6">
                              <div className="space-y-2">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Network</p>
                                 <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                       <span className="text-sm font-bold">Polygon Mainnet (Active)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                       <div className="w-2 h-2 rounded-full bg-zinc-500" />
                                       <span className="text-sm font-bold opacity-60">Solana (Secondary/Sync)</span>
                                    </div>
                                 </div>
                              </div>
                              
                              <div className="space-y-2">
                                 <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Bridge Status</p>
                                 <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-800 font-mono text-[10px] text-zinc-400 truncate">
                                    Polygon-Solana Wormhole Gateway: Active
                                 </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                 <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Avg Gas (MATIC)</p>
                                    <p className="text-xl font-black text-emerald-400">0.021 MATIC</p>
                                 </div>
                                 <div className="p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Solana TPS</p>
                                    <p className="text-xl font-black text-white">2,840</p>
                                 </div>
                              </div>

                              <button className="w-full py-4 bg-zinc-800 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all border border-zinc-700">Test Connection</button>
                           </div>
                        </div>
                        <Database className="absolute -right-8 -top-8 w-48 h-48 text-white/5 rotate-12" />
                     </div>

                     <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                           <BellRing className="w-5 h-5 text-zinc-900" />
                           <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Notifikasi Admin</h3>
                        </div>
                        
                        <div className="space-y-4">
                           {['Tokenization Request', 'KYC Verification', 'Withdrawal Request', 'Security Alert'].map((item) => (
                              <div key={item} className="flex items-center justify-between py-2">
                                 <span className="text-xs font-bold text-zinc-600">{item}</span>
                                 <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                                    <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full" />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <button className="w-full py-5 bg-emerald-600 text-white rounded-[32px] font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-700 shadow-lg shadow-emerald-900/10 transition-all active:scale-95 transform">Simpan Perubahan</button>
                  </div>
               </div>
            </motion.div>
          )}

          {activeTab === 'audit' && (
             <motion.div key="audit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
                   <h2 className="text-2xl font-black text-zinc-900">Jejak Audit Sistem</h2>
                   <p className="text-sm text-zinc-400 font-medium mt-1">Transparansi penuh atas setiap tindakan yang dilakukan di Control Panel Admin.</p>
                </div>

                <div className="bg-white rounded-[40px] border border-zinc-200 shadow-sm overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full">
                         <thead>
                            <tr className="bg-zinc-50 border-b border-zinc-100 text-left">
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Admin & IP</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tindakan</th>
                               <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Objek</th>
                               <th className="px-8 py-5 text-right text-[10px] font-black uppercase text-zinc-400 tracking-widest">Waktu</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-zinc-50">
                            {auditLogs.map(log => (
                               <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors">
                                  <td className="px-8 py-6">
                                     <p className="text-xs font-black text-zinc-900">{log.adminName}</p>
                                     <p className="text-[10px] font-mono font-bold text-zinc-400 uppercase">{log.ipAddress}</p>
                                  </td>
                                  <td className="px-8 py-6">
                                     <span className="text-[10px] font-black text-white px-2 py-1 rounded bg-zinc-800 uppercase tracking-tight">{log.action}</span>
                                  </td>
                                  <td className="px-8 py-6">
                                     <p className="text-xs font-bold text-zinc-600">{log.targetObject}</p>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                     <p className="text-xs font-bold text-zinc-400">{log.timestamp}</p>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </motion.div>
          )}

          {false && (activeTab === 'content' || activeTab === 'settings') && (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-20 text-center border-2 border-dashed border-zinc-200 rounded-[40px] bg-white">
               <Settings className="w-16 h-16 text-zinc-200 mb-6" />
               <h3 className="text-xl font-bold text-zinc-900">Modul Sedang Dikembangkan</h3>
               <p className="text-zinc-500 max-w-md mt-2">Halaman {activeTab} saat ini sedang dalam tahap finalisasi implementasi UI dan integrasi data backend.</p>
               <button onClick={() => setActiveTab('overview')} className="mt-8 px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-widest text-xs">Kembali ke Dashboard</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
