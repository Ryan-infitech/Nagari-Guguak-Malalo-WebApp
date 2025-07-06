import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, ShieldCheck } from "lucide-react";
import { DataTable } from "@/components/admin/shared/DataTable";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import AdminBreadcrumbs from "@/components/admin/shared/AdminBreadcrumbs";
import { useToast } from "@/components/ui/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Example user data
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  status: "active" | "inactive";
  lastActive: string;
}

export const mockUsersData: User[] = [
  {
    id: "1",
    name: "Administrator",
    email: "admin@nagari-guguakmalalo.id",
    role: "admin",
    status: "active",
    lastActive: "Hari ini, 10:24",
  },
  {
    id: "2",
    name: "Tim Digital",
    email: "digital@nagari-guguakmalalo.id",
    role: "editor",
    status: "active",
    lastActive: "Kemarin, 15:30",
  },
  {
    id: "3",
    name: "Petugas Layanan",
    email: "layanan@nagari-guguakmalalo.id",
    role: "editor",
    status: "active",
    lastActive: "3 hari lalu",
  },
  {
    id: "4",
    name: "Operator Data",
    email: "data@nagari-guguakmalalo.id",
    role: "viewer",
    status: "inactive",
    lastActive: "2 minggu lalu",
  },
];

const UsersList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUsersData);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      // In a real app, make API call to delete
      setUsers(users.filter((item) => item.id !== deleteId));
      toast({
        title: "Pengguna dihapus",
        description: "Pengguna berhasil dihapus dari sistem",
      });
      setIsDeleteDialogOpen(false);
    }
  };

  // Define columns for the data table
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt={row.original.name} />
            <AvatarFallback className="bg-green-100 text-green-800">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-gray-500">{row.original.email}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Peran",
      cell: ({ row }) => {
        let badgeClass = "";
        let roleName = "";

        switch (row.original.role) {
          case "admin":
            badgeClass = "bg-purple-100 text-purple-800 hover:bg-purple-100";
            roleName = "Administrator";
            break;
          case "editor":
            badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
            roleName = "Editor";
            break;
          case "viewer":
            badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
            roleName = "Pembaca";
            break;
          default:
            badgeClass = "bg-gray-100";
            roleName = row.original.role;
        }

        return <Badge className={badgeClass}>{roleName}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          className={
            row.original.status === "active"
              ? "bg-green-100 text-green-800 hover:bg-green-100"
              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
          }
        >
          {row.original.status === "active" ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    {
      accessorKey: "lastActive",
      header: "Terakhir Aktif",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate(`/admin/users/edit/${row.original.id}`)}
            >
              <Edit className="h-4 w-4 mr-2" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/users/permissions/${row.original.id}`)
              }
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              <span>Hak Akses</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDelete(row.original.id)}
              disabled={row.original.id === "1"} // Prevent deleting main admin
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Hapus</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Manajemen Pengguna
          </h1>
          <AdminBreadcrumbs items={[{ label: "Pengguna" }]} className="mt-1" />
        </div>
        <Button onClick={() => navigate("/admin/users/tambah")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        searchPlaceholder="Cari pengguna..."
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Hapus Pengguna"
        description="Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait pengguna akan dihapus secara permanen."
        confirmLabel="Hapus"
        cancelLabel="Batal"
        onConfirm={confirmDelete}
        variant="destructive"
      />
    </div>
  );
};

export default UsersList;
