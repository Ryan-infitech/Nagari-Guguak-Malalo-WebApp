'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, Info } from 'lucide-react';

export default function ProfileDocuments() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Dokumen Saya
              </CardTitle>
              <CardDescription>
                Kelola dokumen identitas dan dokumen penting lainnya
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Development Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <div className="space-y-2">
                <p className="font-medium">🚧 Fitur Dalam Pengembangan</p>
                <p className="text-sm">
                  Fitur manajemen dokumen sedang dalam tahap pengembangan. Anda akan dapat:
                </p>
                <ul className="ml-4 list-disc space-y-1 text-sm">
                  <li>Mengunggah dokumen identitas (KTP, KK, dll)</li>
                  <li>Melihat status verifikasi dokumen</li>
                  <li>Mengunduh salinan dokumen</li>
                  <li>Mengelola dokumen pendukung layanan</li>
                </ul>
                <p className="mt-2 text-sm">
                  Fitur ini akan segera tersedia. Terima kasih atas kesabaran Anda.
                </p>
              </div>
            </AlertDescription>
          </Alert>

          {/* Preview of Future Features */}
          <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p className="mb-2 text-lg font-medium text-gray-600">Area Manajemen Dokumen</p>
            <p className="mx-auto max-w-md text-sm text-gray-500">
              Di sini Anda akan dapat mengunggah, melihat, dan mengelola berbagai dokumen seperti
              KTP, Kartu Keluarga, dan dokumen pendukung lainnya.
            </p>
          </div>

          {/* Planned Features Information */}
          <div className="rounded-lg bg-gray-50 p-6">
            <h4 className="mb-4 flex items-center gap-2 font-medium text-gray-900">
              <Info className="h-4 w-4" />
              Fitur yang Akan Tersedia
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Upload Dokumen</p>
                    <p className="text-xs text-gray-600">
                      Unggah berbagai jenis dokumen dengan drag & drop
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Status Verifikasi</p>
                    <p className="text-xs text-gray-600">
                      Pantau status verifikasi dokumen real-time
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Preview & Download</p>
                    <p className="text-xs text-gray-600">
                      Lihat dan unduh dokumen yang telah diunggah
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Riwayat Dokumen</p>
                    <p className="text-xs text-gray-600">Kelola riwayat dan versi dokumen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Butuh Bantuan?</p>
                <p className="mt-1 text-xs text-green-700">
                  Jika Anda memerlukan bantuan terkait dokumen atau memiliki pertanyaan, silakan
                  hubungi admin melalui menu "Bantuan" atau datang langsung ke kantor nagari.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
