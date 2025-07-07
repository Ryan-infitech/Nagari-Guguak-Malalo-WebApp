import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Index from "./pages/Index";
import Profil from "./pages/Profil";
import LayananDigital from "./pages/LayananDigital";
import LayananDetail from "./pages/LayananDetail";
import UMKM from "./pages/UMKM";
import UMKMDetail from "./pages/UMKMDetail";
import Pariwisata from "./pages/Pariwisata";
import PariwisataDetail from "./pages/PariwisataDetail";
import InformasiPublik from "./pages/InformasiPublik";
import BeritaDetail from "./pages/BeritaDetail";
import Kontak from "./pages/Kontak";
import PortalWarga from "./pages/PortalWarga";
import LoginPortal from "./pages/LoginPortal";
import TeamDeveloper from "./pages/TeamDeveloper";
import NotFound from "./pages/NotFound";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Sitemap from "./pages/Sitemap";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import AdminNews from "./pages/admin/news/NewsList";
import AdminNewsForm from "./pages/admin/news/NewsForm";
import AdminServices from "./pages/admin/services/ServicesList";
import AdminServiceForm from "./pages/admin/services/ServiceForm";
import AdminUMKM from "./pages/admin/umkm/UmkmList";
import AdminUMKMForm from "./pages/admin/umkm/UmkmForm";
import AdminTourism from "./pages/admin/tourism/TourismList";
import AdminTourismForm from "./pages/admin/tourism/TourismForm";
import AdminUsers from "./pages/admin/users/UsersList";
import AdminUserForm from "./pages/admin/users/UserForm";
import EventList from "./pages/admin/events/EventList";
import EventForm from "./pages/admin/events/EventForm";
// Import the new components for UMKM Programs
import UmkmProgramList from "./pages/admin/umkm/UmkmProgramList";
import UmkmProgramForm from "./pages/admin/umkm/UmkmProgramForm";
import UMKMProgramDetail from "./pages/UmkmProgramDetail";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/layanan" element={<LayananDigital />} />
            <Route path="/layanan/:category" element={<LayananDigital />} />
            <Route
              path="/layanan/:category/:serviceId"
              element={<LayananDetail />}
            />
            <Route
              path="/layanan/:category/:serviceId/detail"
              element={<LayananDetail />}
            />
            <Route path="/umkm/program/:id" element={<UMKMProgramDetail />} />
            <Route path="/umkm/:id" element={<UMKMDetail />} />
            <Route path="/umkm" element={<UMKM />} />
            <Route path="/pariwisata" element={<Pariwisata />} />
            <Route path="/pariwisata/:id" element={<PariwisataDetail />} />
            <Route path="/informasi" element={<InformasiPublik />} />
            <Route path="/informasi/berita/:id" element={<BeritaDetail />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/login" element={<LoginPortal />} />
            <Route path="/portal-warga" element={<PortalWarga />} />
            <Route path="/team-developer" element={<TeamDeveloper />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/sitemap" element={<Sitemap />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="berita" element={<AdminNews />} />
              <Route path="berita/tambah" element={<AdminNewsForm />} />
              <Route path="berita/edit/:id" element={<AdminNewsForm />} />
              <Route path="layanan" element={<AdminServices />} />
              <Route path="layanan/tambah" element={<AdminServiceForm />} />
              <Route path="layanan/edit/:id" element={<AdminServiceForm />} />
              <Route path="umkm" element={<AdminUMKM />} />
              <Route path="umkm/tambah" element={<AdminUMKMForm />} />
              <Route path="umkm/edit/:id" element={<AdminUMKMForm />} />

              {/* UMKM Program routes */}
              <Route path="umkm/program" element={<UmkmProgramList />} />
              <Route path="umkm/program/tambah" element={<UmkmProgramForm />} />
              <Route
                path="umkm/program/edit/:id"
                element={<UmkmProgramForm />}
              />
              <Route path="umkm/program/:id" element={<UMKMProgramDetail />} />

              <Route path="pariwisata" element={<AdminTourism />} />
              <Route path="pariwisata/tambah" element={<AdminTourismForm />} />
              <Route
                path="pariwisata/edit/:id"
                element={<AdminTourismForm />}
              />
              <Route path="pengguna" element={<AdminUsers />} />
              <Route path="pengguna/tambah" element={<AdminUserForm />} />
              <Route path="pengguna/edit/:id" element={<AdminUserForm />} />

              {/* Add Event routes */}
              <Route path="events" element={<EventList />} />
              <Route path="events/tambah" element={<EventForm />} />
              <Route path="events/edit/:id" element={<EventForm />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
