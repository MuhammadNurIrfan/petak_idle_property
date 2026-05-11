
export type VerificationStatus = "VALID" | "FLAGGED" | "INVALID" | "REJECTED";

export interface Lokasi {
  provinsi: string | null;
  kabupaten_kota: string | null;
  kecamatan: string | null;
  desa_kelurahan: string | null;
}

export interface DataTekstraksi {
  nama_pemilik: string | null;
  nomor_hak_milik: string | null;
  nib: string | null;
  luas_meter_persegi: number | null;
  lokasi: Lokasi;
}

export interface AnalisisKeaslian {
  garuda_visibilitas: boolean;
  stempel_emboss_terdeteksi: boolean;
  indikasi_modifikasi: string | null;
}

export interface ValuatorResponse {
  status_verifikasi: VerificationStatus;
  confidence_score: number;
  data_terekstraksi: DataTekstraksi;
  analisis_keaslian: AnalisisKeaslian;
  rekomendasi_tindakan: string;
  workflow_next_step: string;
}

export interface PropertyOpportunity {
  id: string;
  name: string;
  type: string;
  image: string;
  location: string;
  description: string;
  totalTarget: number;
  raised: number;
  tokenPrice: number;
  totalTokens: number;
  availableTokens: number;
  estimatedYield: number;
  estimatedCapitalGain: number;
  status: 'Sedang Berlangsung' | 'Segera Hadir' | 'Selesai' | 'Penuh';
  renovationPlan: {
    details: string;
    cost: number;
    timeline: string;
  };
  contractAddress: string;
}

export interface UserInvestment {
  assetId: string;
  assetName: string;
  buyPrice: number;
  currentPrice: number;
  totalTokens: number;
  yieldEarned: number;
  status: 'Sedang Disewakan' | 'Dalam Renovasi' | 'Siap Dijual';
}

export interface DividendDistribution {
  id: string;
  source: string;
  period: string;
  amount: string;
  status: 'Tersedia' | 'Sudah Diklaim';
  expiryDate?: string;
  txHash?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalAssetValue: number;
  circulatingTokens: number;
  totalFundsRaised: number;
  totalProfitDistributed: number;
}

export interface UserManagementRecord {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  status: 'Aktif' | 'Nonaktif' | 'Terblokir';
  kycStatus: 'Verified' | 'Pending' | 'Unverified' | 'Rejected';
  createdAt: string;
}

export interface PhysicalPropertyRecord {
  id: string;
  name: string;
  location: string;
  area: number;
  physicalStatus: 'Idle' | 'Dalam Renovasi' | 'Disewakan' | 'Dijual';
  tokenizationStatus: 'Belum' | 'Dalam Proses' | 'Ditokenisasi Penuh';
  originalOwner: string;
}

export interface TokenizationRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  uploaderName: string;
  date: string;
  status: 'Menunggu Validasi' | 'Validasi Berhasil' | 'Validasi Gagal' | 'Siap Minting' | 'Minting Selesai' | 'Ditolak';
}

export interface TokenSaleCampaign {
  id: string;
  propertyName: string;
  targetFunds: number;
  raisedFunds: number;
  status: 'Draft' | 'Aktif' | 'Selesai' | 'Dibatalkan';
  timeLeft?: string;
}

export interface PlatformFinance {
  totalRevenue: number;
  totalExpenses: number;
  walletBalance: number;
}

export interface AuditLogEntry {
  id: string;
  adminName: string;
  action: string;
  targetObject: string;
  timestamp: string;
  ipAddress: string;
}

export type AssetStatus = 'Aktif' | 'Terblokir' | 'Dalam Proses Transfer' | 'Menunggu Validasi' | 'Selesai';

export interface TokenAsset {
  id: string;
  name: string;
  type: 'Tanah' | 'Bangunan' | 'Kendaraan' | 'Lainnya';
  description: string;
  tokenCount: number;
  walletAddress: string;
  status: AssetStatus;
  value: number;
  location?: string;
  documentUrl?: string;
  contractAddress: string;
  tokenId: string;
  standard: 'ERC-721' | 'ERC-1155';
  createdAt: string;
}

export interface Transaction {
  id: string;
  hash: string;
  date: string;
  type: 'Mint' | 'Transfer' | 'Buy' | 'Sell';
  assetName: string;
  amount: string;
  gasFee: string;
  status: 'Berhasil' | 'Gagal' | 'Pending';
  from: string;
  to: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  category: 'Legal Agreement' | 'Terms & Conditions' | 'Privacy Policy' | 'Property Deed' | 'KYC Doc';
  lastUpdated: string;
  status: 'Published' | 'Draft' | 'Archived';
  version: string;
  author: string;
}
