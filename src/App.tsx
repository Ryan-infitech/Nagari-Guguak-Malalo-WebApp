import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import LayananDigital from "./pages/LayananDigital";
import UMKM from "./pages/UMKM";
import UMKMDetail from "./pages/UMKMDetail";
import Pariwisata from "./pages/Pariwisata";
import PariwisataDetail from "./pages/PariwisataDetail";
import InformasiPublik from "./pages/InformasiPublik";
import BeritaDetail from "./pages/BeritaDetail";
import Kontak from "./pages/Kontak";
import PortalWarga from "./pages/PortalWarga";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/layanan" element={<LayananDigital />} />
          <Route path="/layanan/:category" element={<LayananDigital />} />
          <Route path="/umkm" element={<UMKM />} />
          <Route path="/umkm/:id" element={<UMKMDetail />} />
          <Route path="/pariwisata" element={<Pariwisata />} />
          <Route path="/pariwisata/:id" element={<PariwisataDetail />} />
          <Route path="/informasi" element={<InformasiPublik />} />
          <Route path="/informasi/berita/:id" element={<BeritaDetail />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/portal-warga" element={<PortalWarga />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
