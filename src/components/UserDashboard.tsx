import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Coins, 
  ArrowLeftRight, 
  History, 
  PlusCircle, 
  Wallet, 
  ExternalLink, 
  Copy, 
  QrCode, 
  MoreVertical,
  Search,
  Filter,
  TrendingUp,
  LandPlot,
  Building2,
  Car,
  ChevronRight,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  FileSearch,
  FileText,
  Upload,
  AlertTriangle,
  Zap,
  Info,
  Download,
  MapPin,
  CheckCircle2,
  ShoppingBag,
  CircleDollarSign,
  BarChart3,
  Globe,
  Timer,
  GanttChartSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '../lib/utils';
import { TokenAsset, Transaction, PropertyOpportunity, UserInvestment, DividendDistribution } from '../types';

interface UserDashboardProps {
  userEmail: string;
  onStartValidator: () => void;
}

type TabType = 'home' | 'assets' | 'tokenization' | 'transfer' | 'history' | 'detail' | 'marketplace' | 'yield' | 'report' | 'validator-log';

const UserDashboard: React.FC<UserDashboardProps> = ({ userEmail, onStartValidator }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [tokenStep, setTokenStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<'tanah' | 'rumah' | 'kendaraan' | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<TokenAsset | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<PropertyOpportunity | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock Data
  const portfolioData = [
    { name: 'Tanah', value: 4500000000, color: '#10B981' }, // Emerald
    { name: 'Bangunan', value: 2800000000, color: '#6366F1' }, // Indigo
    { name: 'Kendaraan', value: 850000000, color: '#F59E0B' }, // Amber
  ];

  const monthlyHistory = [
    { month: 'Jan', value: 7200000000 },
    { month: 'Feb', value: 7400000000 },
    { month: 'Mar', value: 7800000000 },
    { month: 'Apr', value: 8150000000 },
  ];

  const assets: TokenAsset[] = [
    {
      id: 'ast-001',
      name: 'SHM No. 4212 - Kebon Jeruk',
      type: 'Tanah',
      description: 'Tanah pekarangan seluas 450m2 di area strategis Jakarta Barat.',
      tokenCount: 1,
      walletAddress: '0x71C...4f21',
      status: 'Aktif',
      value: 4500000000,
      location: 'Jakarta Barat, DKI Jakarta',
      contractAddress: '0x321a...888b',
      tokenId: '1042',
      standard: 'ERC-721',
      createdAt: '2024-01-15'
    },
    {
       id: 'ast-002',
       name: 'Ruko Business Park - BSD',
       type: 'Bangunan',
       description: 'Unit Ruko 3 Lantai di kawasan komersial BSD City.',
       tokenCount: 1000,
       walletAddress: '0x71C...4f21',
       status: 'Aktif',
       value: 2800000000,
       location: 'Tangerang, Banten',
       contractAddress: '0x992c...112e',
       tokenId: '502',
       standard: 'ERC-1155',
       createdAt: '2024-02-28'
    }
  ];

  const transactions: Transaction[] = [
    {
      id: 'tx-001',
      hash: '0x882a...991c',
      date: '2024-05-09 14:20',
      type: 'Mint',
      assetName: 'SHM No. 4212',
      amount: '1 Token',
      gasFee: '0.012 SOL',
      status: 'Berhasil',
      from: '0x000...000',
      to: '0x71C...4f21'
    },
    {
      id: 'tx-002',
      hash: '0x12f3...44ed',
      date: '2024-05-08 09:12',
      type: 'Transfer',
      assetName: 'Ruko BSD',
      amount: '250 Token',
      gasFee: '0.005 SOL',
      status: 'Berhasil',
      from: '0x71C...4f21',
      to: '0x221b...ff02'
    },
    {
      id: 'tx-003',
      hash: '0x451...e02',
      date: '2024-05-05 16:45',
      type: 'Transfer',
      assetName: 'Modern Tebet House',
      amount: '120 Token',
      gasFee: '0.002 SOL',
      status: 'Berhasil',
      from: '0x123...abc',
      to: '0x71C...4f21'
    },
    {
      id: 'tx-004',
      hash: '0x71C...4f21',
      date: '2024-05-01 10:30',
      type: 'Mint',
      assetName: 'The Arkhaven Bali',
      amount: '10 Token',
      gasFee: '0.05 SOL',
      status: 'Berhasil',
      from: '0x000...000',
      to: '0x71C...4f21'
    }
  ];

  const investmentOpportunities: PropertyOpportunity[] = [
    {
      id: 'prop-001',
      name: 'Modern Renovation - Tebet House',
      type: 'Rumah',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
      location: 'Tebet, Jakarta Selatan',
      description: 'Proyek renovasi rumah tua menjadi hunian modern minimalis dengan target capital gain tinggi melalui strategi buy-rehab-sell.',
      totalTarget: 2500000000,
      raised: 1850000000,
      tokenPrice: 1000000,
      totalTokens: 2500,
      availableTokens: 650,
      estimatedYield: 8.5,
      estimatedCapitalGain: 15,
      status: 'Sedang Berlangsung',
      renovationPlan: {
        details: 'Upgrade interior mewah, penambahan rooftop garden, dan optimasi tata cahaya.',
        cost: 450000000,
        timeline: '6 Bulan'
      },
      contractAddress: '0xabc...123'
    },
    {
      id: 'prop-002',
      name: 'Co-Living Space - Gading Serpong',
      type: 'Ruko',
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=800',
      location: 'Gading Serpong, Tangerang',
      description: 'Konversi ruko 3 lantai menjadi unit hunian bersama (co-living) premium untuk pasar profesional muda.',
      totalTarget: 4000000000,
      raised: 4000000000,
      tokenPrice: 500000,
      totalTokens: 8000,
      availableTokens: 0,
      estimatedYield: 12,
      estimatedCapitalGain: 10,
      status: 'Penuh',
      renovationPlan: {
        details: 'Partisi 12 kamar tidur dengan kamar mandi dalam, area lounge bersama, dan dapur komunal.',
        cost: 800000000,
        timeline: '8 Bulan'
      },
      contractAddress: '0xdef...456'
    },
    {
      id: 'prop-003',
      name: 'The Arkhaven - Uluwatu Villa',
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
      location: 'Uluwatu, Bali',
      description: 'Investment opportunity dalam villa mewah dengan pemandangan laut 180 derajat. Yield tinggi dari pasar sewa harian wisatawan mancanegara.',
      totalTarget: 8500000000,
      raised: 2100000000,
      tokenPrice: 5000000,
      totalTokens: 1700,
      availableTokens: 1280,
      estimatedYield: 14.2,
      estimatedCapitalGain: 12,
      status: 'Sedang Berlangsung',
      renovationPlan: {
        details: 'Refurbishment furnitur desainer, optimasi sistem infinity pool, dan branding digital marketing.',
        cost: 600000000,
        timeline: '3 Bulan'
      },
      contractAddress: '0xghi...789'
    },
    {
      id: 'prop-004',
      name: 'Creative Hub - SCBD Loft',
      type: 'Apartemen',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      location: 'Senopati, Jakarta Selatan',
      description: 'Transformasi unit loft industrial menjadi private creative office & co-working space eksklusif di pusat bisnis Jakarta.',
      totalTarget: 3200000000,
      raised: 950000000,
      tokenPrice: 2000000,
      totalTokens: 1600,
      availableTokens: 1125,
      estimatedYield: 10.5,
      estimatedCapitalGain: 18,
      status: 'Sedang Berlangsung',
      renovationPlan: {
        details: 'Instalasi smart office system, high-speed fiber backbone, dan peredam suara studio recording.',
        cost: 350000000,
        timeline: '4 Bulan'
      },
      contractAddress: '0xjkl...012'
    },
    {
      id: 'prop-005',
      name: 'Boutique Hotel - Dago Highland',
      type: 'Lainnya',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      location: 'Dago, Bandung',
      description: 'Pengambilalihan dan efisiensi operasional hotel butik 20 kamar dengan pemandangan kota Bandung yang ikonik.',
      totalTarget: 12500000000,
      raised: 5200000000,
      tokenPrice: 10000000,
      totalTokens: 1250,
      availableTokens: 730,
      estimatedYield: 9.8,
      estimatedCapitalGain: 25,
      status: 'Sedang Berlangsung',
      renovationPlan: {
        details: 'Renovasi fasad eksterior, penambahan cafe rooftop, dan integrasi PMS (Property Management System) AI.',
        cost: 1500000000,
        timeline: '12 Bulan'
      },
      contractAddress: '0xmno...345'
    }
  ];

  const portfolioInvestments: UserInvestment[] = [
    {
      assetId: 'inv-001',
      assetName: 'Ruko BSD Business Park',
      buyPrice: 500000,
      currentPrice: 550000,
      totalTokens: 500,
      yieldEarned: 12500000,
      status: 'Sedang Disewakan'
    },
    {
      assetId: 'inv-002',
      assetName: 'Villa Seminyak Peak',
      buyPrice: 10000000,
      currentPrice: 10800000,
      totalTokens: 2,
      yieldEarned: 0,
      status: 'Dalam Renovasi'
    },
    {
      assetId: 'inv-003',
      assetName: 'Modern Tebet House',
      buyPrice: 1000000,
      currentPrice: 1150000,
      totalTokens: 100,
      yieldEarned: 850000,
      status: 'Sedang Disewakan'
    },
    {
      assetId: 'inv-004',
      assetName: 'Co-Living Serpong',
      buyPrice: 500000,
      currentPrice: 525000,
      totalTokens: 1500,
      yieldEarned: 4500000,
      status: 'Sedang Disewakan'
    }
  ];

  const distributions: DividendDistribution[] = [
    {
      id: 'dist-001',
      source: 'Lease Profit Share - Ruko BSD',
      period: 'Q1 2024',
      amount: '750,000 IDR',
      status: 'Tersedia'
    },
    {
      id: 'dist-002',
      source: 'Capital Gain - Kebon Jeruk Exit',
      period: 'Sept 2023',
      amount: '12,500,000 IDR',
      status: 'Sudah Diklaim',
      txHash: '0x991a...bb02'
    },
    {
      id: 'dist-003',
      source: 'Lease Profit Share - Co-Living Serpong',
      period: 'Q1 2024',
      amount: '4,500,000 IDR',
      status: 'Tersedia'
    }
  ];

  const financialReportData = [
    { month: 'Jan', revenue: 125000000, expense: 45000000, profit: 80000000 },
    { month: 'Feb', revenue: 132000000, expense: 48000000, profit: 84000000 },
    { month: 'Mar', revenue: 145000000, expense: 52000000, profit: 93000000 },
    { month: 'Apr', revenue: 158000000, expense: 55000000, profit: 103000000 },
    { month: 'Mei', revenue: 165000000, expense: 58000000, profit: 107000000 },
  ];

  const expenseBreakdown = [
    { name: 'Pemeliharaan', value: 15000000, color: '#10B981' },
    { name: 'Pajak & Legal', value: 8500000, color: '#059669' },
    { name: 'Manajemen', value: 12000000, color: '#34D399' },
    { name: 'Asuransi', value: 4500000, color: '#065F46' },
  ];

  const propertyOperationalData = [
    { name: 'Ruko Business Park BSD', type: 'Komersial', income: '125.400.000', growth: '+5.2%', yield: '12.4%' },
    { name: 'Tebet Modern House', type: 'Residential', income: '42.800.000', growth: '+2.1%', yield: '8.5%' },
    { name: 'Villa Seminyak Peak', type: 'Hospitality', income: '285.000.000', growth: '+12.5%', yield: '15.2%' },
    { name: 'Co-Living Gading Serpong', type: 'Shared Housing', income: '98.500.000', growth: '+8.4%', yield: '10.8%' },
  ];

  const handleExportExcel = () => {
    // Financial Data Sheet
    const financialWS = XLSX.utils.json_to_sheet(financialReportData);
    
    // Property Data Sheet
    const propertyWS = XLSX.utils.json_to_sheet(propertyOperationalData);
    
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, financialWS, "Monthly Report");
    XLSX.utils.book_append_sheet(wb, propertyWS, "Property Details");
    
    XLSX.writeFile(wb, "Petak_Financial_Report.xlsx");
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text("Laporan Keuangan Konsolidasi - Petak Real Estate", 14, 20);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 30);
    
    // Monthly Table
    doc.setFontSize(14);
    doc.text("Performa Bulanan (YTD 2024)", 14, 45);
    autoTable(doc, {
      head: [['Bulan', 'Pendapatan (Rp)', 'Pengeluaran (Rp)', 'Laba Bersih (Rp)']],
      body: financialReportData.map(d => [
        d.month, 
        d.revenue.toLocaleString(), 
        d.expense.toLocaleString(), 
        d.profit.toLocaleString()
      ]),
      startY: 50,
    });
    
    // Property Table
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.text("Rincian Operasional Per Aset", 14, finalY);
    autoTable(doc, {
      head: [['Nama Properti', 'Tipe', 'Pendapatan Bersih (Rp)', 'Growth', 'Yield']],
      body: propertyOperationalData.map(p => [p.name, p.type, p.income, p.growth, p.yield]),
      startY: finalY + 5,
    });
    
    doc.save("Petak_Financial_Report.pdf");
  };

  const handleSmartContractAudit = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Smart Contract Security Audit Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`Project: ${selectedOpportunity?.name || 'Asset Registry'}`, 14, 30);
    doc.text(`Scanner: Petak Security Engine v2.1`, 14, 35);
    doc.text(`Date: ${new Date().toLocaleDateString('id-ID')}`, 14, 40);
    
    autoTable(doc, {
      head: [['Check Item', 'Status', 'Risk Level']],
      body: [
        ['Re-entrancy Guard', 'PASSED', 'Low'],
        ['Overflow/Underflow', 'PASSED', 'Low'],
        ['Access Control', 'PASSED', 'Low'],
        ['Token standard (SPL/ERC)', 'PASSED', 'Low'],
        ['Ownership Logic', 'PASSED', 'Low'],
      ],
      startY: 50,
    });
    
    doc.save(`Audit_${selectedOpportunity?.name.replace(/\s+/g, '_') || 'Petak'}.pdf`);
  };

  const handleValuasiKJPP = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Laporan Valuasi Properti (KJPP)", 14, 20);
    doc.setFontSize(12);
    doc.text(`Nama Properti: ${selectedOpportunity?.name || 'Aset Petak'}`, 14, 35);
    doc.text(`Lokasi: ${selectedOpportunity?.location || '-'}`, 14, 45);
    
    doc.setFontSize(10);
    doc.text("Berdasarkan standar penilaian Indonesia (SPI), nilai pasar wajar (Fair Market Value) dari aset tersebut adalah sebagai berikut:", 14, 60, { maxWidth: 180 });

    autoTable(doc, {
      head: [['Komponen', 'Nilai (IDR)']],
      body: [
        ['Nilai Tanah', 'Rp 1.850.000.000'],
        ['Nilai Bangunan', 'Rp 650.000.000'],
        ['Fasilitas & Sarana', 'Rp 150.000.000'],
        ['TOTAL VALUASI', `Rp ${(selectedOpportunity?.totalTarget || 0).toLocaleString()}`],
      ],
      startY: 75,
    });
    
    doc.save(`Valuasi_${selectedOpportunity?.name.replace(/\s+/g, '_') || 'Petak'}.pdf`);
  };

  const handleDownloadProspectus = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Prospektus Penawaran Toko Properti - Petak", 14, 20);
    
    doc.setFontSize(12);
    doc.text(`Properti: ${selectedOpportunity?.name || 'Aset Petak'}`, 14, 35);
    doc.text(`ID Properti: PTK-${selectedOpportunity?.id || '001'}`, 14, 42);
    
    doc.setFontSize(10);
    doc.text("Ringkasan Investasi:", 14, 55);
    doc.text(`- Total Pendanaan: Rp ${(selectedOpportunity?.totalTarget || 0).toLocaleString()}`, 14, 62);
    doc.text(`- Harga per Token: Rp ${(selectedOpportunity?.tokenPrice || 0).toLocaleString()}`, 14, 69);
    doc.text(`- Estimasi Yield: ${selectedOpportunity?.estimatedYield}%`, 14, 76);
    doc.text(`- Tenor Investasi: 5 - 10 Tahun`, 14, 83);

    autoTable(doc, {
      head: [['Ringkasan Hukum', 'Status']],
      body: [
        ['IMB / PBG', 'Terverifikasi (Aktif)'],
        ['Sertifikat (SHM/HGB)', 'Terverifikasi (Clean & Clear)'],
        ['PBB Terakhir', 'Lunas (2023)'],
        ['Asuransi Properti', 'Aktif (Manulife Asset)'],
      ],
      startY: 95,
    });

    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.text("Pernyataan Risiko: Investasi properti memiliki risiko likuiditas dan pasar. Pastikan Anda membaca seluruh dokumen sebelum berinvestasi.", 14, finalY, { maxWidth: 180 });
    
    doc.save(`Prospektus_${selectedOpportunity?.name.replace(/\s+/g, '_') || 'Petak'}.pdf`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('0x71C742367831f24212f3e8f9'); // Mock wallet
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: TabType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        "flex items-center gap-2 px-6 py-4 border-b-2 transition-all font-bold text-sm tracking-tight",
        activeTab === id 
          ? "border-emerald-600 text-emerald-900 bg-emerald-50/30" 
          : "border-transparent text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
      )}
    >
      <Icon className={cn("w-4 h-4", activeTab === id ? "text-emerald-600" : "text-zinc-400")} />
      {label}
    </button>
  );

  return (
    <div className="space-y-8 pb-20">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-zinc-200 sticky top-16 z-40 -mt-8 -mx-6 mb-8 px-6 overflow-x-auto">
        <div className="flex items-center max-w-7xl mx-auto">
          <NavItem id="home" label="Dashboard" icon={LayoutDashboard} />
          <NavItem id="marketplace" label="Marketplace" icon={ShoppingBag} />
          <NavItem id="assets" label="Aset Saya" icon={Coins} />
          <NavItem id="tokenization" label="Tokenisasi" icon={PlusCircle} />
          <NavItem id="yield" label="Yield" icon={CircleDollarSign} />
          <NavItem id="transfer" label="Wallet" icon={ArrowLeftRight} />
          <NavItem id="history" label="Riwayat" icon={History} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-900/20">
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-2">Total Nilai Portofolio</p>
                <h2 className="text-4xl font-black tabular-nums">Rp 8.15 M</h2>
                <div className="flex items-center gap-2 mt-4 text-emerald-400 text-xs font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.4% Bulan Ini</span>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-8 border border-zinc-200 shadow-sm relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:scale-150 transition-transform duration-700" />
                <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400 mb-2">Aset Terverifikasi</p>
                <div className="flex items-end gap-3">
                   <h2 className="text-4xl font-black text-zinc-900">12</h2>
                   <p className="text-xs font-bold text-zinc-400 mb-2">Unit RWA</p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center">
                        <Coins className="w-3 h-3 text-zinc-400" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight ml-2">+4 dalam proses</span>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[32px] p-8 text-white shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Dompet On-Chain</p>
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-emerald-500" />
                  </div>
                </div>
                <div className="space-y-4">
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
                     <span className="text-xs font-mono font-medium opacity-60">0x71C...4f21</span>
                     <button onClick={handleCopy} className="text-emerald-500 hover:text-emerald-400 transition-colors">
                       <Copy className="w-4 h-4" />
                     </button>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                     <button onClick={() => setActiveTab('transfer')} className="bg-white/10 hover:bg-white/20 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all">Kirim</button>
                     <button onClick={() => setActiveTab('transfer')} className="bg-emerald-600 hover:bg-emerald-700 py-3 rounded-2xl text-[10px] uppercase font-black tracking-widest transition-all">Terima</button>
                   </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                <h3 className="font-black text-zinc-900 mb-8 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                   Pertumbuhan Nilai Portfolio
                </h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyHistory}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        cursor={{ fill: '#F9FAFB' }}
                      />
                      <Bar dataKey="value" fill="#059669" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                <h3 className="font-black text-zinc-900 mb-8 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                   Distribusi Aset
                </h3>
                <div className="flex items-center gap-8">
                  <div className="h-64 w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-4">
                    {portfolioData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-bold text-zinc-600 tracking-tight">{item.name}</span>
                        </div>
                        <span className="text-xs font-black text-zinc-900">
                          {((item.value / 8150000000) * 100).toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Tracking Section */}
            <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-black text-zinc-900 flex items-center gap-2 text-lg">
                    <GanttChartSquare className="w-5 h-5 text-emerald-600" />
                    Kinerja Investasi Aktif
                  </h3>
                  <div className="flex gap-4">
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-zinc-400">Total Yield</p>
                        <p className="text-sm font-black text-emerald-600">Rp 2.5 jt</p>
                     </div>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead>
                        <tr className="border-b border-zinc-100">
                           <th className="text-left py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest px-4">Properti</th>
                           <th className="text-left py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest px-4">Keuntungan/Kerugian</th>
                           <th className="text-left py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest px-4">Total Yield</th>
                           <th className="text-left py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest px-4">Status</th>
                           <th className="text-right py-4 text-[10px] font-black uppercase text-zinc-400 tracking-widest px-4">Aksi</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-50">
                        {portfolioInvestments.map((inv, i) => {
                          const gainLoss = ((inv.currentPrice - inv.buyPrice) / inv.buyPrice) * 100;
                          return (
                            <tr key={i} className="group hover:bg-zinc-50 transition-colors">
                               <td className="py-6 px-4">
                                  <p className="text-sm font-black text-zinc-900">{inv.assetName}</p>
                                  <p className="text-[10px] font-bold text-zinc-400 uppercase">{inv.totalTokens} Token</p>
                               </td>
                               <td className="py-6 px-4">
                                  <div className="flex items-center gap-1.5">
                                     <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                     <span className="text-sm font-black text-emerald-600">+{gainLoss.toFixed(1)}%</span>
                                     <span className="text-[10px] font-bold text-zinc-400">(Rp {((inv.currentPrice - inv.buyPrice) * inv.totalTokens).toLocaleString()})</span>
                                  </div>
                               </td>
                               <td className="py-6 px-4">
                                  <p className="text-sm font-black text-zinc-900">Rp {inv.yieldEarned.toLocaleString()}</p>
                               </td>
                               <td className="py-6 px-4">
                                  <span className={cn(
                                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight",
                                    inv.status === 'Sedang Disewakan' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                  )}>
                                    {inv.status}
                                  </span>
                               </td>
                               <td className="py-6 px-4 text-right">
                                  <button className="text-xs font-black uppercase text-emerald-600 hover:underline">Detail Kinerja</button>
                               </td>
                            </tr>
                          );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Quick Listing */}
            <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="font-black text-zinc-900 flex items-center gap-2 text-lg">
                   Portfolio Aset Terbaru
                 </h3>
                 <button onClick={() => setActiveTab('assets')} className="text-xs font-black uppercase text-emerald-600 tracking-widest hover:underline px-4 py-2 bg-emerald-50 rounded-xl">Lihat Semua</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assets.map(asset => (
                  <div key={asset.id} className="p-6 rounded-[32px] border border-zinc-100 bg-zinc-50/50 hover:border-emerald-300 transition-all cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {asset.type === 'Tanah' && <LandPlot className="w-6 h-6 text-emerald-600" />}
                        {asset.type === 'Bangunan' && <Building2 className="w-6 h-6 text-emerald-600" />}
                      </div>
                      <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">Active</div>
                    </div>
                    <h4 className="font-black text-zinc-900 mb-1 group-hover:text-emerald-700 transition-colors">{asset.name}</h4>
                    <div className="flex items-center gap-2 mb-4 text-zinc-400 text-xs">
                       <MapPin className="w-3 h-3" />
                       <span className="font-medium truncate">{asset.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                       <div className="text-left">
                          <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Estimasi Nilai</p>
                          <p className="font-black text-emerald-900">Rp {(asset.value / 1000000000).toFixed(1)}M</p>
                       </div>
                       <button 
                         onClick={() => { setSelectedAsset(asset); setActiveTab('detail'); }}
                         className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                       >
                         <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ASSETS LIST VIEW */}
        {activeTab === 'assets' && (
          <motion.div
            key="assets"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
               <div>
                  <h2 className="text-2xl font-black text-zinc-900">Daftar Aset Tokenisasi</h2>
                  <p className="text-sm text-zinc-400 font-medium">Manajemen aset fisik yang telah terhubung ke jaringan blockchain.</p>
               </div>
               <button 
                 onClick={() => setActiveTab('tokenization')}
                 className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-4 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
               >
                 <PlusCircle className="w-5 h-5" />
                 Tokenisasi Aset Baru
               </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {assets.map(asset => (
                <div key={asset.id} className="bg-white p-6 rounded-[32px] border border-zinc-200 hover:shadow-xl hover:shadow-zinc-200/50 transition-all group">
                   <div className="flex flex-col lg:flex-row items-center gap-8">
                     <div className="w-24 h-24 rounded-[32px] bg-zinc-50 border-2 border-zinc-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                        {asset.type === 'Tanah' && <LandPlot className="w-10 h-10 text-emerald-600" />}
                        {asset.type === 'Bangunan' && <Building2 className="w-10 h-10 text-emerald-600" />}
                     </div>
                     <div className="flex-1 space-y-1 text-center lg:text-left">
                       <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded tracking-widest">{asset.type}</span>
                          <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded tracking-widest">{asset.status}</span>
                       </div>
                       <h3 className="text-lg font-black text-zinc-900">{asset.name}</h3>
                       <p className="text-xs text-zinc-400 font-medium">{asset.location}</p>
                     </div>
                     <div className="grid grid-cols-2 lg:flex items-center gap-8 text-center lg:text-left border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-8">
                        <div>
                           <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1">Total Token</p>
                           <p className="text-sm font-bold text-zinc-700">{asset.tokenCount.toLocaleString()}</p>
                        </div>
                        <div>
                           <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1">Valuasi</p>
                           <p className="text-sm font-black text-emerald-700">Rp {(asset.value / 1000000000).toFixed(1)}M</p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                           <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1">On-Chain ID</p>
                           <p className="text-xs font-mono font-bold text-zinc-900">{asset.tokenId}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button 
                          onClick={() => { setSelectedAsset(asset); setActiveTab('detail'); }}
                          className="flex-1 lg:flex-none h-14 px-6 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all"
                        >
                          Lihat Detail
                        </button>
                        <button 
                          onClick={() => setActiveTab('transfer')}
                          className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                        >
                          <ArrowLeftRight className="w-5 h-5" />
                        </button>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TOKENIZATION VIEW */}
        {activeTab === 'tokenization' && (
          <motion.div
            key="tokenization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
               <h2 className="text-2xl font-black text-zinc-900">Tokenisasi Aset RWA</h2>
               <p className="text-sm text-zinc-400 font-medium mt-1">Ubah aset fisik properti Anda menjadi instrumen digital liquid.</p>
               
               <div className="mt-12 space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Kategori Aset</label>
                          <div className="grid grid-cols-3 gap-4">
                            {[
                              { id: 'tanah', label: 'Tanah', icon: LandPlot },
                              { id: 'rumah', label: 'Rumah', icon: Building2 },
                              { id: 'kendaraan', label: 'Kendaraan', icon: Car }
                            ].map((cat) => (
                              <button 
                                key={cat.id} 
                                onClick={() => setSelectedCategory(cat.id as any)}
                                className={`p-6 border-2 rounded-[32px] flex flex-col items-center gap-2 transition-all ${(selectedCategory === cat.id || (!selectedCategory && cat.id === 'tanah')) ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-100 hover:border-emerald-200'}`}
                              >
                                <cat.icon className={`w-8 h-8 ${(selectedCategory === cat.id || (!selectedCategory && cat.id === 'tanah')) ? 'text-emerald-600' : 'text-zinc-300'}`} />
                                <span className={`text-[10px] font-black uppercase tracking-tight ${(selectedCategory === cat.id || (!selectedCategory && cat.id === 'tanah')) ? 'text-emerald-700' : 'text-zinc-400'}`}>{cat.label}</span>
                              </button>
                            ))}
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Dokumen Legalitas (SHM/BPKB)</label>
                          <div className="border-2 border-dashed border-zinc-200 rounded-[32px] py-12 flex flex-col items-center justify-center bg-zinc-50/50 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all cursor-pointer group">
                             <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-6 h-6 text-zinc-400" />
                             </div>
                             <p className="text-xs font-bold text-zinc-600 uppercase tracking-tight">Klik untuk Unggah</p>
                             <p className="text-[10px] text-zinc-400 font-medium mt-1">PDF atau Gambar (Maks 10MB)</p>
                          </div>
                       </div>
                    </div>

                    <div className="bg-zinc-50 rounded-[40px] p-8 border border-zinc-100 space-y-6">
                       <div className="flex items-center gap-3 text-emerald-600">
                          <FileSearch className="w-6 h-6" />
                          <h3 className="font-black uppercase tracking-tight">Validator Preview</h3>
                       </div>
                       <div className="aspect-[4/3] bg-zinc-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-zinc-200">
                          <div className="text-center p-8">
                             <FileText className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                             <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">AI Engine siap memvalidasi</p>
                          </div>
                       </div>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500">Auto-Scan OCR</span>
                            <div className="w-8 h-4 bg-emerald-500 rounded-full" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-zinc-500">Audit Kediklatan</span>
                            <div className="w-8 h-4 bg-emerald-500 rounded-full" />
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-8 bg-emerald-900 rounded-[32px] text-white">
                    <div className="flex items-center gap-4">
                       <Zap className="w-6 h-6 text-emerald-400" />
                       <div>
                         <p className="text-[10px] uppercase font-black text-emerald-400">Verifikasi Otomatis</p>
                         <p className="text-sm font-bold">Lakukan scan instan sertifikat Anda sebelum pengajuan final.</p>
                       </div>
                    </div>
                    <button 
                      onClick={onStartValidator}
                      className="bg-white text-emerald-900 font-black px-8 py-4 rounded-2xl uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95"
                    >
                      Mulai Validasi AI
                    </button>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-8">
              <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Status Pelacakan Pengajuan
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'SHM 9928 - Pondok Indah', status: 'Menunggu Validasi', date: '02 Mei 2024', process: '80%' },
                  { name: 'BPKB Toyota Alphard 2023', status: 'Dalam Proses Minting', date: '30 Apr 2024', process: '45%' },
                  { name: 'Villa Seminyak Kuta', status: 'Ditolak', date: '15 Apr 2024', process: 'Gagal' },
                ].map((track, i) => (
                  <div key={i} className="p-6 rounded-[32px] border border-zinc-100 bg-zinc-50/50 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                       <h4 className="font-black text-zinc-900">{track.name}</h4>
                       <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-1">{track.date} • {track.status}</p>
                    </div>
                    <div className="w-full md:w-48 h-3 bg-zinc-200 rounded-full overflow-hidden">
                       <div className={`h-full ${track.status === 'Ditolak' ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} style={{ width: track.process === '80%' ? '80%' : track.process === '45%' ? '45%' : '100%' }} />
                    </div>
                    <button 
                      onClick={() => setActiveTab('validator-log')}
                      className="h-12 px-6 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                    >
                      Lihat Log Validator
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* VALIDATOR LOG TIMELINE VIEW */}
        {activeTab === 'validator-log' && (
          <motion.div
            key="validator-log"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex items-center justify-between">
               <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setActiveTab('tokenization')}
                    className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center hover:bg-zinc-100 transition-all shadow-inner"
                  >
                    <ArrowLeftRight className="w-5 h-5 rotate-180 text-zinc-600" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 leading-none">Validator Logs Timeline</h2>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-2">ID: PTK-TX-9928 Pondok Indah</p>
                  </div>
               </div>
               <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  Status: Menunggu Validasi (80%)
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm relative overflow-hidden">
                     <div className="absolute top-0 left-[47px] bottom-0 w-0.5 bg-zinc-100" />
                     
                     <div className="space-y-12">
                        {[
                          { 
                            title: 'Minting Smart Contract', 
                            desc: 'Proses generate token RWA pada jaringan blockchain Polygon/Solana.', 
                            time: 'Menunggu Antrian', 
                            status: 'pending', 
                            icon: Zap 
                          },
                          { 
                            title: 'Validasi AI & OCR', 
                            desc: 'Membaca data SHM secara otomatis dan mencocokkan dengan data BPN.', 
                            time: '10 Mei 2024, 14:20', 
                            status: 'completed', 
                            icon: CheckCircle2 
                          },
                          { 
                            title: 'Verifikasi Legalitas', 
                            desc: 'Pengecekan keaslian sertifikat oleh partner hukum Petak.', 
                            time: '09 Mei 2024, 09:15', 
                            status: 'completed', 
                            icon: ShieldCheck 
                          },
                          { 
                            title: 'Pengajuan Tokenisasi', 
                            desc: 'Data awal diterima oleh sistem Petak RWA.', 
                            time: '02 Mei 2024, 11:30', 
                            status: 'completed', 
                            icon: FileText 
                          },
                        ].map((log, i) => (
                           <div key={i} className="relative flex gap-8">
                              <div className={cn(
                                "relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2",
                                log.status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-zinc-200 text-zinc-300"
                              )}>
                                 <log.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 pb-4">
                                 <div className="flex items-center justify-between mb-1">
                                    <h4 className={cn("text-sm font-black", log.status === 'completed' ? "text-zinc-900" : "text-zinc-400")}>{log.title}</h4>
                                    <span className="text-[10px] font-bold text-zinc-400 font-mono italic">{log.time}</span>
                                 </div>
                                 <p className="text-xs text-zinc-500 font-medium leading-relaxed">{log.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
                     <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-6">Informasi Aset</h3>
                     <div className="space-y-4">
                        <div className="aspect-video bg-zinc-100 rounded-3xl overflow-hidden border border-zinc-100 mb-6">
                           <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" alt="Asset" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-zinc-50">
                           <span className="text-xs font-bold text-zinc-400 uppercase">Tipe Aset</span>
                           <span className="text-xs font-black text-zinc-900">Tanah & Bangunan</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-zinc-50">
                           <span className="text-xs font-bold text-zinc-400 uppercase">Luas</span>
                           <span className="text-xs font-black text-zinc-900">250 m²</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                           <span className="text-xs font-bold text-zinc-400 uppercase">Valuasi Estimasi</span>
                           <span className="text-xs font-black text-emerald-600">Rp 1.25 Miliar</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-zinc-900 p-8 rounded-[40px] border border-zinc-800 shadow-xl overflow-hidden relative">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
                     <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4">Butuh Bantuan?</h3>
                     <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-6">Jika pengajuan Anda tertahan lebih dari 7 hari kerja, silakan hubungi tim validator kami.</p>
                     <a 
                       href="https://wa.me/6281398701763?text=Halo%20Validator%20Petak%2C%20saya%20ingin%20bertanya%20mengenai%20status%20pengajuan%20tokenisasi%20aset%20saya."
                       target="_blank"
                       rel="noopener noreferrer"
                       className="w-full py-4 bg-white text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-100 transition-colors block text-center"
                     >
                       Chat Support Validator
                     </a>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* MARKETPLACE VIEW */}
        {activeTab === 'marketplace' && (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {!selectedOpportunity ? (
              <>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900">Peluang Investasi Properti</h2>
                    <p className="text-sm text-zinc-400 font-medium mt-1">Temukan aset RWA eksklusif untuk investasi jangka panjang.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                      <input type="text" placeholder="Cari properti..." className="pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs outline-none focus:border-emerald-300 transition-all font-bold" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {investmentOpportunities.map(opp => (
                    <div key={opp.id} className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={opp.image} alt={opp.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-6 left-6 flex gap-2">
                          <span className={cn(
                            "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg",
                            opp.status === 'Sedang Berlangsung' ? "bg-emerald-600" : "bg-zinc-800"
                          )}>
                            {opp.status}
                          </span>
                        </div>
                        <div className="absolute bottom-6 left-6 scale-90 origin-left">
                           <div className="bg-zinc-900/80 backdrop-blur-sm px-3 py-2 rounded-2xl flex items-center gap-2 border border-white/10 text-white">
                             <Timer className="w-3 h-3 text-amber-400" />
                             <span className="text-[10px] font-black">12 Hari Tersisa</span>
                           </div>
                        </div>
                        <div className="absolute top-6 right-6">
                           <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-2xl flex items-center gap-2 border border-white/20">
                             <TrendingUp className="w-3 h-3 text-emerald-600" />
                             <span className="text-[10px] font-black text-emerald-900">{opp.estimatedYield}% Yield</span>
                           </div>
                        </div>
                      </div>
                      <div className="p-8 flex-1 flex flex-col space-y-6">
                        <div>
                          <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-1">{opp.type} • {opp.location}</p>
                          <h3 className="text-xl font-black text-zinc-900 leading-tight">{opp.name}</h3>
                        </div>
                        
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase text-zinc-400">
                             <span>Progress Dana</span>
                             <span>{((opp.raised / opp.totalTarget) * 100).toFixed(0)}%</span>
                           </div>
                           <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                             <div className="h-full bg-emerald-500" style={{ width: `${(opp.raised / opp.totalTarget) * 100}%` }} />
                           </div>
                           <div className="flex justify-between mt-1">
                             <p className="text-xs font-bold text-zinc-900">Rp {(opp.raised / 1000000).toLocaleString()}jt</p>
                             <p className="text-xs font-bold text-zinc-400">Target Rp {(opp.totalTarget / 1000000000).toFixed(1)}M</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Harga/Token</p>
                              <p className="text-sm font-black text-zinc-900">Rp {(opp.tokenPrice / 1000).toLocaleString()}rb</p>
                           </div>
                           <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Tersedia</p>
                              <p className="text-sm font-black text-zinc-900">{opp.availableTokens} Token</p>
                           </div>
                        </div>

                        <button 
                          onClick={() => setSelectedOpportunity(opp)}
                          className="w-full py-5 bg-zinc-900 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-[0.98]"
                        >
                          Lihat Detail Properti
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-8">
                 <button 
                   onClick={() => setSelectedOpportunity(null)}
                   className="flex items-center gap-2 text-xs font-black uppercase text-zinc-400 hover:text-emerald-600 transition-colors"
                 >
                   <ArrowLeftRight className="w-4 h-4 rotate-180" />
                   Kembali ke Marketplace
                 </button>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-8">
                       <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm">
                          <img src={selectedOpportunity.image} alt={selectedOpportunity.name} className="w-full h-96 object-cover" />
                          <div className="p-8 space-y-6">
                             <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                   <h2 className="text-3xl font-black text-zinc-900 mb-1">{selectedOpportunity.name}</h2>
                                   <p className="text-sm text-zinc-400 font-medium flex items-center gap-1">
                                      <MapPin className="w-4 h-4 text-rose-500" />
                                      {selectedOpportunity.location}
                                   </p>
                                </div>
                                <div className="flex gap-3">
                                   <div className="bg-emerald-50 px-4 py-3 rounded-2xl border border-emerald-100 text-center">
                                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Est. Yield</p>
                                      <p className="text-xl font-black text-emerald-900">{selectedOpportunity.estimatedYield}%</p>
                                   </div>
                                   <div className="bg-blue-50 px-4 py-3 rounded-2xl border border-blue-100 text-center">
                                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Cap. Gain</p>
                                      <p className="text-xl font-black text-blue-900">{selectedOpportunity.estimatedCapitalGain}%</p>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="h-px bg-zinc-100" />

                             <div className="space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                                   <FileSearch className="w-4 h-4 text-emerald-600" />
                                   Deskripsi Proyek
                                </h3>
                                <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                                   {selectedOpportunity.description}
                                </p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                <div className="p-6 bg-zinc-50 rounded-[32px] border border-zinc-100 space-y-4">
                                   <div className="flex items-center justify-between">
                                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                         <PlusCircle className="w-3 h-3" />
                                         Rencana Renovasi & RAB
                                      </h4>
                                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Budgeted</span>
                                   </div>
                                   <p className="text-xs font-bold text-zinc-900 leading-relaxed">
                                      {selectedOpportunity.renovationPlan.details}
                                   </p>
                                   <div className="space-y-2 border-t border-zinc-100 pt-3">
                                      <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 uppercase">
                                         <span>Pekerjaan Sipil & Struktur (45%)</span>
                                         <span className="text-zinc-900 font-black">Rp {(selectedOpportunity.renovationPlan.cost * 0.45 / 1000000).toFixed(1)}jt</span>
                                      </div>
                                      <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 uppercase">
                                         <span>MEP & Finishing (35%)</span>
                                         <span className="text-zinc-900 font-black">Rp {(selectedOpportunity.renovationPlan.cost * 0.35 / 1000000).toFixed(1)}jt</span>
                                      </div>
                                      <div className="flex justify-between items-center text-[9px] font-bold text-zinc-500 uppercase">
                                         <span>Interior & FF&E (20%)</span>
                                         <span className="text-zinc-900 font-black">Rp {(selectedOpportunity.renovationPlan.cost * 0.20 / 1000000).toFixed(1)}jt</span>
                                      </div>
                                   </div>
                                   <div className="flex gap-4 mt-2 pt-3 border-t border-zinc-100">
                                      <div>
                                         <p className="text-[8px] font-black text-zinc-400 uppercase">Total RAB</p>
                                         <p className="text-xs font-black text-zinc-900">Rp {(selectedOpportunity.renovationPlan.cost / 1000000).toLocaleString()}jt</p>
                                      </div>
                                      <div>
                                         <p className="text-[8px] font-black text-zinc-400 uppercase">Durasi</p>
                                         <p className="text-xs font-black text-zinc-900">{selectedOpportunity.renovationPlan.timeline}</p>
                                      </div>
                                   </div>
                                </div>
                                <div className="p-6 bg-zinc-50 rounded-[32px] border border-zinc-100 space-y-3">
                                   <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                      <ShieldCheck className="w-3 h-3" />
                                      Legalitas Awal
                                   </h4>
                                   <div className="space-y-2">
                                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-200">
                                         <span className="text-[10px] font-bold">SHM Terverifikasi</span>
                                         <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                      </div>
                                      <button 
                                        onClick={handleDownloadProspectus}
                                        className="w-full flex items-center justify-center gap-2 p-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/10"
                                      >
                                         <Download className="w-4 h-4" />
                                         Download Prospektus
                                      </button>
                                   </div>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                       <div className="bg-zinc-900 rounded-[40px] p-8 text-white shadow-xl space-y-8">
                          <div className="text-center">
                             <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Partisipasi Investasi</p>
                             <h3 className="text-2xl font-black">Beli Token RWA</h3>
                          </div>

                          <div className="space-y-4">
                             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-zinc-500">Harga per Token</span>
                                   <span className="text-sm font-black text-emerald-400">Rp {(selectedOpportunity.tokenPrice / 1000).toLocaleString()}rb</span>
                                </div>
                                <div className="flex justify-between items-center">
                                   <span className="text-xs font-bold text-zinc-500">Tersedia</span>
                                   <span className="text-sm font-black text-white">{selectedOpportunity.availableTokens} / {selectedOpportunity.totalTokens}</span>
                                </div>
                             </div>

                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Jumlah Pembelian</label>
                                <input 
                                  type="number" 
                                  placeholder="0" 
                                  value={purchaseAmount || ''}
                                  onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg font-black outline-none focus:border-emerald-500 transition-all" 
                                />
                             </div>

                             <div className="space-y-2">
                                <label className="text-[10px] font-black text-zinc-500 uppercase ml-1">Metode Pembayaran</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none appearance-none cursor-pointer">
                                   <option className="bg-zinc-900">USDT (Solana)</option>
                                   <option className="bg-zinc-900">USDC (Solana)</option>
                                   <option className="bg-zinc-900">USDT (Polygon)</option>
                                   <option className="bg-zinc-900">USDC (Polygon)</option>
                                   <option className="bg-zinc-900">IDR (Virtual Account)</option>
                                </select>
                             </div>

                             <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                <div className="flex justify-between items-center mb-1">
                                   <span className="text-[10px] font-bold text-emerald-400 uppercase">Total Biaya</span>
                                   <span className="text-xs font-mono font-bold text-white">Rp {(purchaseAmount * (selectedOpportunity?.tokenPrice || 0)).toLocaleString()}</span>
                                </div>
                                <p className="text-[8px] text-zinc-500 leading-relaxed font-medium capitalize">Sistem Petak menanggung gas fee untuk investor baru.</p>
                             </div>

                             <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-600/20 active:scale-[0.98]">
                                Beli Token Sekarang
                             </button>
                             <p className="text-[10px] text-zinc-500 text-center font-bold uppercase tracking-tight">On-Chain Settlement via Smart Contract</p>
                          </div>
                       </div>

                       <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-6">
                           <h4 className="text-xs font-black uppercase tracking-widest text-zinc-900">Data Transparansi</h4>
                           <div className="space-y-3">
                              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                 <span className="text-[10px] font-black text-zinc-400">Sale Contract</span>
                                 <span className="text-[10px] font-mono font-bold text-emerald-700">{selectedOpportunity.contractAddress}</span>
                              </div>
                              <button 
                                onClick={handleSmartContractAudit}
                                className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors group"
                              >
                                 <span className="text-xs font-bold text-zinc-900 group-hover:text-emerald-600">Smart Contract Audit</span>
                                 <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-emerald-600" />
                              </button>
                              <button 
                                onClick={handleValuasiKJPP}
                                className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-colors group"
                              >
                                 <span className="text-xs font-bold text-zinc-900 group-hover:text-emerald-600">Laporan Valuasi KJPP</span>
                                 <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-emerald-600" />
                              </button>
                           </div>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </motion.div>
        )}

        {/* YIELD VIEW */}
        {activeTab === 'yield' && (
          <motion.div
            key="yield"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-8">
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900">Klaim Keuntungan & Distribusi</h2>
                    <p className="text-sm text-zinc-400 font-medium mt-1">Tarik hasil bagi sewa dan profit capital gain Anda ke dompet.</p>
                  </div>

                  <div className="space-y-4">
                     {distributions.map(dist => (
                       <div key={dist.id} className="p-6 bg-zinc-50 border border-zinc-100 rounded-[32px] flex flex-col sm:flex-row items-center gap-6 group hover:border-emerald-300 transition-all">
                          <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0",
                            dist.status === 'Tersedia' ? "bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/10" : "bg-zinc-100 text-zinc-400"
                          )}>
                             <CircleDollarSign className="w-8 h-8" />
                          </div>
                          <div className="flex-1 text-center sm:text-left">
                             <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                                <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{dist.period}</span>
                                <span className={cn(
                                  "text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest",
                                  dist.status === 'Tersedia' ? "bg-emerald-600 text-white" : "bg-zinc-200 text-zinc-500"
                                )}>
                                  {dist.status}
                                </span>
                             </div>
                             <h3 className="text-lg font-black text-zinc-900">{dist.source}</h3>
                             <p className="text-xl font-black text-emerald-600 mt-1">{dist.amount}</p>
                          </div>
                          {dist.status === 'Tersedia' ? (
                            <button className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                               Klaim Sekarang
                            </button>
                          ) : (
                            <div className="flex flex-col items-center sm:items-end">
                               <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Hash Transaksi</p>
                               <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                                  {dist.txHash}
                                  <ExternalLink className="w-3 h-3" />
                               </div>
                            </div>
                          )}
                       </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-emerald-900 rounded-[40px] p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
                     <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                     <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2">Total Keuntungan Diklaim</p>
                     <div className="space-y-1">
                        <h4 className="text-4xl font-black tracking-tight">Rp 45.8 jt</h4>
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-tight">+12% vs Kuartal Lalu</p>
                     </div>
                     <div className="h-px bg-white/10" />
                     <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                           <span className="font-bold opacity-60">Lease Profit</span>
                           <span className="font-black text-emerald-400">Rp 12.3 jt</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                           <span className="font-bold opacity-60">Capital Gain</span>
                           <span className="font-black text-emerald-400">Rp 33.5 jt</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                         <Info className="w-4 h-4 text-emerald-600" />
                         <h4 className="text-xs font-black uppercase tracking-widest">Informasi Transparansi</h4>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                         Seluruh perhitungan bagi hasil didasarkan pada laporan keuangan properti yang diaudit setiap kuartal. Data dapat diverifikasi langsung melalui smart-contract distribusi pada jaringan Polygon & Solana.
                      </p>
                      <button 
                        onClick={() => setActiveTab('report')}
                        className="w-full py-4 text-emerald-600 border border-emerald-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-colors"
                      >
                         Lihat Laporan Keuangan
                      </button>
                  </div>

                  <div className="p-8 bg-zinc-50 rounded-[40px] border border-zinc-100">
                     <div className="flex items-center gap-2 text-rose-500 mb-4">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Legal Disclaimer</h4>
                     </div>
                     <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                        Investasi dalam aset RWA (Real World Asset) melalui tokenisasi melibatkan risiko yang signifikan, termasuk risiko likuiditas, fluktuasi harga pasar properti, dan risiko teknis blockchain. Kinerja masa lalu tidak menjamin hasil di masa depan. Pastikan Anda memahami seluruh dokumen legal dan risiko sebelum melakukan pembelian token.
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* FINANCIAL REPORT VIEW */}
        {activeTab === 'report' && (
          <motion.div
            key="report"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-between bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
               <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setActiveTab('yield')}
                    className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center hover:bg-zinc-100 transition-all shadow-inner"
                  >
                    <ArrowLeftRight className="w-5 h-5 rotate-180 text-zinc-600" />
                  </button>
                  <div>
                    <h2 className="text-2xl font-black text-zinc-900 leading-none">Laporan Keuangan Konsolidasi</h2>
                    <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                       <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                       Audit Terakhir: 10 Mei 2024 oleh Ernst & Young Indonesia
                    </p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <button 
                    onClick={handleExportExcel}
                    className="flex items-center gap-2 px-5 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-all"
                  >
                     <Download className="w-4 h-4" />
                     Excel
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 px-5 py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                  >
                     <FileText className="w-4 h-4" />
                     Download PDF
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { label: 'Pendapatan Kotor', value: 'Rp 725.0 jt', icon: TrendingUp, color: 'text-emerald-600' },
                 { label: 'Total Pengeluaran', value: 'Rp 258.0 jt', icon: Zap, color: 'text-amber-600' },
                 { label: 'Laba Bersih (NOI)', value: 'Rp 467.0 jt', icon: CircleDollarSign, color: 'text-zinc-900' },
                 { label: 'Okupansi Rata-rata', value: '94.5%', icon: Building2, color: 'text-emerald-700' },
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-6 rounded-[32px] border border-zinc-200 shadow-sm group hover:border-emerald-200 transition-all">
                    <div className={cn("w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-50")}>
                       <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-1">{stat.label}</p>
                    <h4 className="text-xl font-black text-zinc-900">{stat.value}</h4>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-8 flex items-center justify-between">
                     Grafik Performa Pendapatan vs Pengeluaran
                     <span className="text-[10px] font-bold text-zinc-400 capitalize bg-zinc-50 px-3 py-1 rounded-full">YTD 2024</span>
                  </h3>
                  <div className="h-[350px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialReportData}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                           <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9CA3AF' }} />
                           <YAxis hide />
                           <Tooltip 
                             contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                           />
                           <Bar name="Pendapatan" dataKey="revenue" fill="#10B981" radius={[10, 10, 0, 0]} barSize={24} />
                           <Bar name="Pengeluaran" dataKey="expense" fill="#E5E7EB" radius={[10, 10, 0, 0]} barSize={24} />
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               <div className="lg:col-span-4 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm flex flex-col">
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-8">Rincian Pengeluaran</h3>
                  <div className="h-48 w-full mb-8">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie
                             data={expenseBreakdown}
                             innerRadius={50}
                             outerRadius={70}
                             paddingAngle={5}
                             dataKey="value"
                           >
                             {expenseBreakdown.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                           </Pie>
                           <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="space-y-4 flex-1">
                     {expenseBreakdown.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs font-bold text-zinc-600 leading-none">{item.name}</span>
                           </div>
                           <span className="text-xs font-black text-zinc-900">Rp {(item.value / 1000000).toFixed(1)} jt</span>
                        </div>
                     ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-zinc-50">
                     <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">Total Efisiensi</p>
                        <p className="text-lg font-black text-emerald-900">+15.4% YoY</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-zinc-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest text">Rincian Operasional Per Aset</h3>
                  <div className="flex items-center gap-2">
                     <Filter className="w-4 h-4 text-zinc-400" />
                     <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Semua Kategori</span>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-zinc-50/50">
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Nama Properti</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Tipe Unit</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Pendapatan Bersih</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest">Growth</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-zinc-400 tracking-widest text-right">Yield</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-100">
                        {propertyOperationalData.map((row, i) => (
                           <tr key={i} className="hover:bg-zinc-50 transition-colors">
                              <td className="px-8 py-6">
                                 <p className="text-sm font-black text-zinc-900">{row.name}</p>
                              </td>
                              <td className="px-8 py-6">
                                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight bg-zinc-100 px-2 py-1 rounded-md">{row.type}</span>
                              </td>
                              <td className="px-8 py-6 font-mono font-bold text-xs text-zinc-600">Rp {row.income}</td>
                              <td className="px-8 py-6">
                                 <span className="text-xs font-black text-emerald-600">{row.growth}</span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <span className="text-sm font-black text-zinc-900">{row.yield}</span>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-8 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center shadow-sm">
                        <FileSearch className="w-6 h-6 text-emerald-600" />
                     </div>
                     <div>
                        <p className="text-xs font-black text-zinc-900 leading-none">Verifikasi Smart Contract</p>
                        <p className="text-[10px] font-medium text-zinc-400 mt-1">Data sinkron dengan on-chain registry</p>
                     </div>
                  </div>
                  <button className="px-6 py-3 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-50 hover:text-emerald-600 transition-all">Check on Polygonscan</button>
               </div>
            </div>
          </motion.div>
        )}

        {/* ASSET DETAIL VIEW */}
        {activeTab === 'detail' && selectedAsset && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => { setSelectedAsset(null); setActiveTab('assets'); }}
                 className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-all shadow-sm"
               >
                 <ArrowLeftRight className="w-5 h-5 rotate-180" />
               </button>
               <h2 className="text-2xl font-black text-zinc-900">Detail Aset Tokenisasi</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               <div className="lg:col-span-8 space-y-8">
                  {/* Physical Info */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="font-black text-zinc-900 uppercase tracking-widest text-sm flex items-center gap-2">
                         <Info className="w-4 h-4 text-emerald-600" />
                         Informasi Aset Fisik
                       </h3>
                       <button className="text-[10px] font-black uppercase text-emerald-600 tracking-widest flex items-center gap-1 hover:underline">
                         <Download className="w-3 h-3" />
                         Lihat Dokumen Asli
                       </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                       <div className="p-6 bg-zinc-50 rounded-[32px] border border-zinc-100">
                          <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-2">Deskripsi Legalitas</p>
                          <p className="text-sm font-bold text-zinc-900">{selectedAsset.description}</p>
                       </div>
                       <div className="p-6 bg-zinc-50 rounded-[32px] border border-zinc-100">
                          <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-2">Lokasi Terdaftar</p>
                          <p className="text-sm font-bold text-zinc-900">{selectedAsset.location}</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4 col-span-1 sm:col-span-2">
                          <div className="p-6 border border-zinc-100 rounded-[32px]">
                             <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1">Nomor Hak</p>
                             <p className="text-lg font-black text-zinc-900 tracking-tight">SHM-4212</p>
                          </div>
                          <div className="p-6 border border-zinc-100 rounded-[32px]">
                             <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest mb-1">Luas Tercatat</p>
                             <p className="text-lg font-black text-zinc-900 tracking-tight">450 m²</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* Blockchain Info */}
                  <div className="bg-white rounded-[40px] border border-zinc-200 p-8 shadow-sm">
                    <h3 className="font-black text-zinc-900 uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Data On-Chain Blockchain
                    </h3>
                    <div className="space-y-4">
                       <div className="flex items-center justify-between p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                         <div>
                           <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Alamat Smart Contract</p>
                           <p className="text-xs font-mono font-bold text-emerald-700 truncate max-w-[200px] sm:max-w-md">{selectedAsset.contractAddress}</p>
                         </div>
                         <ExternalLink className="w-4 h-4 text-zinc-300" />
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Token ID</p>
                            <p className="text-sm font-black text-zinc-900">{selectedAsset.tokenId}</p>
                          </div>
                          <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                            <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Standar Token</p>
                            <p className="text-sm font-black text-zinc-900">{selectedAsset.standard}</p>
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 space-y-6">
                       <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400">Riwayat Kepemilikan On-Chain</h4>
                       <div className="space-y-3">
                          {[
                            { from: '0x000...000', to: '0x71C...4f21', date: '15 Jan 2024', type: 'Mint' },
                            { from: '0x71C...4f21', to: '0x221...ff02', date: '20 Apr 2024', type: 'Transfer' }
                          ].map((hist, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white border border-zinc-100 rounded-2xl hover:bg-zinc-50 transition-colors">
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                     {hist.type === 'Mint' ? <PlusCircle className="w-4 h-4" /> : <ArrowLeftRight className="w-4 h-4" />}
                                  </div>
                                  <div>
                                     <p className="text-[11px] font-black tracking-tight">{hist.from} → {hist.to}</p>
                                     <p className="text-[10px] text-zinc-400 font-bold uppercase">{hist.date}</p>
                                  </div>
                               </div>
                               <button className="text-emerald-600">
                                 <ExternalLink className="w-4 h-4" />
                               </button>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-zinc-900 rounded-[40px] p-8 text-white shadow-xl space-y-8">
                     <p className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-500">Aksi Aset Terkait</p>
                     <div className="space-y-3">
                        <button onClick={() => setActiveTab('transfer')} className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                           <ArrowLeftRight className="w-4 h-4" />
                           Kirim Token
                        </button>
                        <button className="w-full py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                           <Coins className="w-4 h-4" />
                           Jual / Listing Aset
                        </button>
                        <button className="w-full py-5 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                           <TrendingUp className="w-4 h-4" />
                           Staking / Yield
                        </button>
                     </div>
                     <div className="h-px bg-white/10" />
                     <button className="w-full py-5 text-rose-500 hover:bg-rose-500/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" />
                        Burn Token (De-Tokenize)
                     </button>
                  </div>

                  <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-6">
                    <p className="text-[10px] uppercase font-black text-zinc-400 tracking-widest">Bagikan Sertifikat</p>
                    <div className="aspect-square bg-zinc-50 rounded-[32px] flex items-center justify-center border border-zinc-100 p-8">
                       <QRCodeSVG value={`petak-rwa-asset-${selectedAsset.id}`} size={180} />
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* WALLET / TRANSFER VIEW */}
        {activeTab === 'transfer' && (
          <motion.div
            key="transfer"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Send Token */}
               <div className="bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm space-y-8">
                  <div>
                    <h2 className="text-xl font-black text-zinc-900 uppercase tracking-tight">Kirim Token RWA</h2>
                    <p className="text-xs text-zinc-400 font-medium mt-1">Transfer kepemilikan aset Anda secara on-chain.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Pilih Aset</label>
                       <select className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold text-zinc-700 outline-none appearance-none cursor-pointer hover:border-emerald-300 transition-all">
                         {assets.map(asset => <option key={asset.id}>{asset.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Alamat Penerima</label>
                       <input type="text" placeholder="0x..." className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-mono font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-zinc-400 ml-1">Jumlah Token</label>
                       <input type="number" defaultValue="1" className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" />
                    </div>
                    
                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between">
                       <span className="text-[10px] uppercase font-black text-zinc-400 tracking-tight">Estimasi Gas Fee</span>
                       <span className="text-xs font-mono font-black text-emerald-700">0.012 SOL (~$1.50)</span>
                    </div>

                    <button className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all">
                       Konfirmasi Pengiriman
                    </button>
                  </div>
               </div>

               {/* Receive Token */}
               <div className="bg-zinc-900 p-8 rounded-[40px] text-white space-y-8 flex flex-col items-center">
                  <div className="text-center">
                    <h2 className="text-xl font-black uppercase tracking-tight">Terima Token</h2>
                    <p className="text-xs text-zinc-500 font-medium mt-1">Gunakan alamat ini untuk menerima aset RWA.</p>
                  </div>

                  <div className="p-6 bg-white rounded-[40px]">
                     <QRCodeSVG value="0x71C742367831f24212f3e8f9" size={200} />
                  </div>

                  <div className="w-full space-y-4">
                     <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
                        <span className="text-xs font-mono font-medium opacity-60 truncate">0x71C74236...4f21</span>
                        <button onClick={handleCopy} className="text-emerald-500 hover:text-emerald-400 transition-colors shrink-0">
                          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                     </div>
                     <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-3xl flex items-start gap-4">
                        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-1" />
                        <p className="text-[10px] text-rose-200/80 leading-relaxed font-medium">
                          PENTING: Hanya kirim token berbasis Polygon (MATIC) atau Solana (SOL) ke alamat ini. Pengiriman token dari jaringan lain dapat berakibat pada hilangnya aset secara permanen.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {/* HISTORY VIEW */}
        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-8 rounded-[40px] border border-zinc-200 shadow-sm">
               <div>
                  <h2 className="text-2xl font-black text-zinc-900">Riwayat Transaksi</h2>
                  <p className="text-sm text-zinc-400 font-medium mt-1">Lacak seluruh aktivitas on-chain dompet Anda.</p>
               </div>
               <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input type="text" placeholder="Cari Tx Hash..." className="pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs outline-none focus:border-emerald-300 transition-all font-bold" />
                  </div>
                  <button className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors">
                    <Filter className="w-4 h-4 text-zinc-500" />
                  </button>
               </div>
            </div>

            <div className="bg-white rounded-[40px] border border-zinc-200 overflow-hidden shadow-sm">
               <div className="overflow-x-auto">
                 <table className="w-full">
                    <thead>
                       <tr className="bg-zinc-50/50 border-b border-zinc-100">
                          <th className="px-8 py-5 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Transaksi</th>
                          <th className="px-8 py-5 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Jenis</th>
                          <th className="px-8 py-5 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Aset</th>
                          <th className="px-8 py-5 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Waktu</th>
                          <th className="px-8 py-5 text-left text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-5 text-right text-[10px] font-black text-zinc-400 uppercase tracking-widest">Aksi</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                       {transactions.map(tx => (
                         <tr key={tx.id} className="hover:bg-zinc-50/80 transition-colors group">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                    tx.type === 'Mint' ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                                  )}>
                                     {tx.type === 'Mint' ? <PlusCircle className="w-5 h-5" /> : <ArrowLeftRight className="w-5 h-5" />}
                                  </div>
                                  <div>
                                     <p className="text-xs font-black text-zinc-900 tracking-tight">{tx.hash}</p>
                                     <p className="text-[10px] text-zinc-400 font-bold uppercase">Gas: {tx.gasFee}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <span className={cn(
                                 "text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-tight",
                                 tx.type === 'Mint' ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                               )}>{tx.type}</span>
                            </td>
                            <td className="px-8 py-6">
                               <p className="text-xs font-bold text-zinc-600 tracking-tight">{tx.assetName}</p>
                               <p className="text-[10px] font-black text-zinc-400 uppercase">{tx.amount}</p>
                            </td>
                            <td className="px-8 py-6">
                               <p className="text-xs font-bold text-zinc-500">{tx.date}</p>
                            </td>
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-1.5 text-emerald-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="text-[10px] font-black uppercase tracking-widest">{tx.status}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right">
                               <button className="p-2 hover:bg-white rounded-lg transition-all border border-transparent hover:border-zinc-200">
                                  <ExternalLink className="w-4 h-4 text-zinc-400" />
                               </button>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
               <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em]">
                  <span>Showing 2 of 28 transactions</span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-all opacity-50 cursor-not-allowed">Prev</button>
                    <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-all">Next</button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;
