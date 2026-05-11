
import { GoogleGenAI, Type } from "@google/genai";
import { ValuatorResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzeCertificate(base64Data: string, mimeType: string): Promise<ValuatorResponse> {
  const prompt = `
ROLE:
Anda adalah "Petak RWA Validator Engine", sebuah sistem AI spesialis analisis dokumen legalitas tanah (Sertifikat Hak Milik/SHM) untuk proses tokenisasi Real-World Assets.

TASK:
1. Analisis gambar/PDF yang diunggah oleh tim lapangan.
2. Ekstrak data krusial tanpa mengubah format teks asli.
3. Verifikasi indikator keaslian (Logo Garuda, Stempel Emboss, Nomor Hak, NIB).
4. Berikan penilaian kelayakan untuk lanjut ke tahap minting blockchain.

OUTPUT RULES:
- Respons WAJIB dalam format JSON murni.
- DILARANG memberikan penjelasan teks di luar JSON (tanpa markdown \`\`\`json).
- Jika gambar bukan sertifikat tanah, set status_verifikasi ke "REJECTED".
- Gunakan nilai null jika data tidak ditemukan atau tidak terbaca.

JSON SCHEMA:
{
  "status_verifikasi": "VALID" | "FLAGGED" | "INVALID" | "REJECTED",
  "confidence_score": 0.0 - 1.0,
  "data_terekstraksi": {
    "nama_pemilik": "String",
    "nomor_hak_milik": "String (Format: XX.XX.XX.XX.X.XXXXX)",
    "nib": "String (Nomor Identitas Bidang)",
    "luas_meter_persegi": Number,
    "lokasi": {
      "provinsi": "String",
      "kabupaten_kota": "String",
      "kecamatan": "String",
      "desa_kelurahan": "String"
    }
  },
  "analisis_keaslian": {
    "garuda_visibilitas": Boolean,
    "stempel_emboss_terdeteksi": Boolean,
    "indikasi_modifikasi": "String atau null"
  },
  "rekomendasi_tindakan": "String instruksi untuk tim Ops",
  "workflow_next_step": "String (e.g., 'READY_FOR_MINTING', 'MANUAL_REVIEW', or 'RE-UPLOAD')"
}

Instruksi Tambahan: 
- Periksa apakah nama pemilik sesuai dengan identitas pengunggah (jika ada konteks tambahan).
- Jika ada coretan pada nomor sertifikat, beri status FLAGGED.
- Pastikan angka pada luas tanah diekstraksi sebagai tipe data Number.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status_verifikasi: { type: Type.STRING },
          confidence_score: { type: Type.NUMBER },
          data_terekstraksi: {
            type: Type.OBJECT,
            properties: {
              nama_pemilik: { type: Type.STRING },
              nomor_hak_milik: { type: Type.STRING },
              nib: { type: Type.STRING },
              luas_meter_persegi: { type: Type.NUMBER },
              lokasi: {
                type: Type.OBJECT,
                properties: {
                  provinsi: { type: Type.STRING },
                  kabupaten_kota: { type: Type.STRING },
                  kecamatan: { type: Type.STRING },
                  desa_kelurahan: { type: Type.STRING }
                }
              }
            }
          },
          analisis_keaslian: {
            type: Type.OBJECT,
            properties: {
              garuda_visibilitas: { type: Type.BOOLEAN },
              stempel_emboss_terdeteksi: { type: Type.BOOLEAN },
              indikasi_modifikasi: { type: Type.STRING }
            }
          },
          rekomendasi_tindakan: { type: Type.STRING },
          workflow_next_step: { type: Type.STRING }
        },
        required: ["status_verifikasi", "confidence_score", "data_terekstraksi", "analisis_keaslian", "rekomendasi_tindakan", "workflow_next_step"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as ValuatorResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    throw new Error("Invalid response format from AI engine.");
  }
}
