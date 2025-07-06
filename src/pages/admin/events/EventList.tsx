import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
} from "lucide-react";

// Mock data
const mockEventsData = [
  {
    id: "1",
    name: "Festival Danau Singkarak",
    category: "Budaya",
    location: "Danau Singkarak",
    status: "upcoming",
    date: "2024-03-15",
    endDate: "2024-03-17",
    participants: 45,
    maxParticipants: 500,
    lastUpdate: "2024-01-15",
  },
  {
    id: "2",
    name: "Lomba Fotografi Alam",
    category: "Seni",
    location: "Air Terjun Sarasah",
    status: "ongoing",
    date: "2024-02-01",
    endDate: "2024-02-28",
    participants: 23,
    maxParticipants: 100,
    lastUpdate: "2024-01-10",
  },
  {
    id: "3",
    name: "Workshop Kerajinan Tradisional",
    category: "Ekonomi",
    location: "Balai Nagari",
    status: "completed",
    date: "2024-01-15",
    endDate: "2024-01-16",
    participants: 30,
    maxParticipants: 50,
    lastUpdate: "2024-01-05",
  },
];

const EventList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredEvents = mockEventsData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return (
          <Badge variant="default" className="bg-blue-500">
            Akan Datang
          </Badge>
        );
      case "ongoing":
        return (
          <Badge variant="default" className="bg-green-500">
            Berlangsung
          </Badge>
        );
      case "completed":
        return <Badge variant="secondary">Selesai</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus event "${name}"?`)) {
      toast({
        title: "Event dihapus",
        description: `${name} berhasil dihapus`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Event & Festival</h1>
        <AdminBreadcrumbs
          items={[{ label: "Event & Festival" }]}
          className="mt-1"
        />
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card
          className="bg-green-50 border-green-200 cursor-pointer hover:bg-green-100 transition-colors"
          onClick={() => navigate("/admin/pariwisata")}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Objek Wisata</h3>
                <p className="text-sm text-green-700">
                  Kelola destinasi wisata
                </p>
              </div>
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">
                  Event & Festival
                </h3>
                <p className="text-sm text-blue-700">
                  Kelola acara dan festival
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Event & Festival</CardTitle>
            <Button onClick={() => navigate("/admin/events/tambah")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari event..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Semua Status</option>
                <option value="upcoming">Akan Datang</option>
                <option value="ongoing">Berlangsung</option>
                <option value="completed">Selesai</option>
                <option value="cancelled">Dibatalkan</option>
              </select>
            </div>
          </div>

          {/* Events Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Event</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Peserta</TableHead>
                <TableHead>Terakhir Diperbarui</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.name}</TableCell>
                  <TableCell>{event.category}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{getStatusBadge(event.status)}</TableCell>
                  <TableCell>
                    {new Date(event.date).toLocaleDateString("id-ID")}
                    {event.endDate && event.endDate !== event.date && (
                      <span>
                        {" "}
                        - {new Date(event.endDate).toLocaleDateString("id-ID")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {event.participants}/{event.maxParticipants}
                  </TableCell>
                  <TableCell>
                    {new Date(event.lastUpdate).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => navigate(`/admin/events/${event.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            navigate(`/admin/events/${event.id}/edit`)
                          }
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(event.id, event.name)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredEvents.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Tidak ada event yang ditemukan
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventList;
