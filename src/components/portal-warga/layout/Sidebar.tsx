'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Bell,
  Book,
  LogOut,
  HomeIcon,
  UserCircle,
  Settings,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useSocket } from '@/contexts/SocketContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { LogoutDialog } from '@/components/ui/logout-dialog';
import { useLogout } from '@/hooks/useLogout';
import { notificationService } from '@/api/services';
import { motion } from 'framer-motion';

interface WargaSidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
}

const WargaSidebar = ({ isMobile = false, onClose, isOpen = false }: WargaSidebarProps) => {
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const { isLogoutDialogOpen, showLogoutDialog, hideLogoutDialog, confirmLogout } = useLogout();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingUnread, setLoadingUnread] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Helper function to get avatar URL from user data structure
  const getAvatarUrl = (userData: any): string | undefined => {
    if (!userData) return undefined;

    // Check if this is the profile data structure with resident
    if (userData.resident?.user?.avatarUrl) return userData.resident.user.avatarUrl;
    if (userData.residentProfile?.user?.avatarUrl) return userData.residentProfile.user.avatarUrl;
    if (userData.resident?.profilePhotoUrl) return userData.resident.profilePhotoUrl;

    // Fallback to direct user data (AuthContext structure)
    if (userData.avatarUrl) return userData.avatarUrl;
    if (userData.avatar) return userData.avatar;
    if (userData.profilePhotoUrl) return userData.profilePhotoUrl;

    return undefined;
  };

  // Load unread count
  const loadUnreadCount = async () => {
    if (!user) return;

    try {
      setLoadingUnread(true);
      const response = await notificationService.getNotificationCount();
      const newUnreadCount = response?.unread || 0;
      setUnreadCount(newUnreadCount);
    } catch (error) {
      console.error('❌ Sidebar: Error loading unread count:', error);
      setUnreadCount(0);
    } finally {
      setLoadingUnread(false);
    }
  };

  // Set mounted state to true on client side and load unread count
  useEffect(() => {
    setMounted(true);
    if (user) {
      loadUnreadCount();
    }
  }, [user]);

  // Socket.IO realtime updates for unread count
  useEffect(() => {
    if (socket && isConnected && user) {
      // Handle new notifications
      const handleNewNotification = () => {
        loadUnreadCount();
      };

      // Handle notification read/updated
      const handleNotificationUpdated = () => {
        loadUnreadCount();
      };

      // Handle bulk read
      const handleBulkRead = () => {
        setUnreadCount(0);
      };

      // Handle notification deleted
      const handleNotificationDeleted = () => {
        loadUnreadCount();
      };

      // Handle all notifications cleared
      const handleNotificationsCleared = () => {
        setUnreadCount(0);
      };

      socket.on('notification:new', handleNewNotification);
      socket.on('notification:updated', handleNotificationUpdated);
      socket.on('notifications:bulk_read', handleBulkRead);
      socket.on('notification:deleted', handleNotificationDeleted);
      socket.on('notifications:cleared', handleNotificationsCleared);

      return () => {
        socket.off('notification:new', handleNewNotification);
        socket.off('notification:updated', handleNotificationUpdated);
        socket.off('notifications:bulk_read', handleBulkRead);
        socket.off('notification:deleted', handleNotificationDeleted);
        socket.off('notifications:cleared', handleNotificationsCleared);
      };
    }
  }, [socket, isConnected, user]);

  const isActive = (path: string) => {
    return pathname === path || (pathname?.startsWith(path) && path !== '/portal-warga');
  };

  const handleLinkClick = (path?: string) => {
    // Refresh unread count when clicking on notification menu
    if (path === '/portal-warga/notifikasi') {
      setTimeout(() => {
        loadUnreadCount();
      }, 500); // Small delay to allow page to load
    }

    if (isMobile && onClose) {
      onClose();
    }
  };

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/portal-warga/dashboard',
    },
    { icon: UserCircle, label: 'Profil Saya', path: '/portal-warga/profile' },
    {
      icon: FileText,
      label: 'Layanan Digital',
      path: '/portal-warga/layanan',
    },
    {
      icon: PlusCircle,
      label: 'Pengajuan',
      path: '/portal-warga/pengajuan',
    },
    { icon: Bell, label: 'Notifikasi', path: '/portal-warga/notifikasi' },
    { icon: Book, label: 'Panduan', path: '/portal-warga/panduan' },
  ];

  // Create base sidebar content to reuse in both desktop and mobile views
  const sidebarContent = (
    <>
      {/* User Profile Section */}
      <div className="bg-gradient-to-r from-[#9bcba7]/20 to-transparent px-4 py-5">
        <div className="mb-1 flex items-center space-x-3">
          <Avatar className="h-12 w-12 rounded-xl border-2 border-white shadow-sm">
            <AvatarImage src={getAvatarUrl(user) || '/avatar-placeholder.png'} alt="User" />
            <AvatarFallback className="rounded-xl bg-[#9bcba7] font-medium text-white">
              {user?.name?.charAt(0) || 'W'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-gray-900">{user?.name || 'Warga'}</h3>
            <Link
              href="/portal-warga/profile"
              className="mt-1 flex items-center text-xs text-[#9bcba7] hover:underline"
            >
              <span>Lihat Profil</span>
              <ChevronRight className="ml-0.5 h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLinkClick(item.path);
                }}
                className={cn(
                  'group flex items-center rounded-xl px-3 py-2.5 text-sm',
                  'relative transition-all duration-200 ease-in-out',
                  isActive(item.path)
                    ? 'bg-[#9bcba7] font-medium text-white'
                    : 'text-gray-700 hover:bg-[#9bcba7]/10'
                )}
              >
                <div
                  className={cn(
                    'relative mr-2.5 flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                    isActive(item.path)
                      ? 'bg-white/20 text-white'
                      : 'bg-[#9bcba7]/10 text-[#9bcba7] group-hover:bg-[#9bcba7]/20'
                  )}
                >
                  <item.icon className="h-4 w-4" />

                  {/* Notification Badge for Bell icon */}
                  {item.path === '/portal-warga/notifikasi' && (
                    <>
                      {loadingUnread ? (
                        <div className="absolute -right-1 -top-1 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-gray-300" />
                      ) : unreadCount > 0 ? (
                        <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center border-2 border-white bg-red-500 p-0 text-[10px] font-semibold text-white hover:bg-red-500">
                          {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                      ) : null}
                    </>
                  )}
                </div>
                <span className="flex-1">{item.label}</span>

                {/* Unread count text for notification menu (secondary indicator) */}
                {item.path === '/portal-warga/notifikasi' && (
                  <>
                    {loadingUnread ? (
                      <div className="ml-auto h-5 w-8 animate-pulse rounded bg-gray-200" />
                    ) : unreadCount > 0 ? (
                      <Badge
                        variant="secondary"
                        className={cn(
                          'ml-auto',
                          isActive(item.path)
                            ? 'bg-white/20 text-white hover:bg-white/20'
                            : 'bg-red-50 text-red-600 hover:bg-red-50'
                        )}
                      >
                        {unreadCount}
                      </Badge>
                    ) : null}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Actions */}
      <div className="mt-auto space-y-2 bg-gray-50 p-3">
        <Link
          href="/"
          onClick={(e) => {
            e.stopPropagation();
            handleLinkClick('/');
          }}
          className="flex items-center justify-center rounded-lg py-2.5 text-sm text-gray-600 transition-all hover:text-[#9bcba7]"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          <span>Beranda</span>
        </Link>

        <button
          onClick={(e) => {
            e.stopPropagation();
            showLogoutDialog();
            handleLinkClick();
          }}
          className="flex w-full items-center justify-center rounded-lg py-2.5 text-sm text-gray-600 transition-all duration-200 hover:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Keluar</span>
        </button>
      </div>
    </>
  );

  // For mobile view
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm duration-300 animate-in fade-in"
            onClick={onClose}
            aria-hidden="true"
          />
        )}

        {/* Mobile Sidebar */}
        <motion.aside
          ref={sidebarRef}
          className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl"
          initial={{ x: '-100%' }}
          animate={{ x: isOpen ? 0 : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full flex-col">{mounted && sidebarContent}</div>
        </motion.aside>

        {/* Logout Confirmation Dialog for Mobile */}
        <LogoutDialog
          open={isLogoutDialogOpen}
          onOpenChange={hideLogoutDialog}
          onConfirm={confirmLogout}
          userName={user?.name}
        />
      </>
    );
  }

  // For desktop view
  return (
    <>
      <aside className="flex h-full w-64 flex-col overflow-hidden border-r border-gray-100 bg-white shadow-sm">
        {mounted && sidebarContent}
      </aside>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        open={isLogoutDialogOpen}
        onOpenChange={hideLogoutDialog}
        onConfirm={confirmLogout}
        userName={user?.name}
      />
    </>
  );
};

export default WargaSidebar;
