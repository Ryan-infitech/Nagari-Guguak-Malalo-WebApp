import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1 text-sm text-gray-600', className)}
    >
      <ol className="flex items-center space-x-1">
        {/* Home link */}
        <li>
          <Link
            href="/"
            className="flex items-center transition-colors hover:text-[#7ca186]"
            title="Beranda"
          >
            <Home className="h-4 w-4" />
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="mx-1 h-4 w-4 text-gray-400" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[#7ca186]"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn('text-gray-500', item.current && 'font-medium text-gray-900')}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper function to generate UMKM breadcrumb
export function generateUMKMBreadcrumb(umkm: any) {
  return [
    {
      label: 'UMKM',
      href: '/umkm',
    },
    {
      label: umkm.category?.name || 'Kategori',
      href: `/umkm?category=${umkm.categoryId}`,
    },
    {
      label: umkm.name,
      current: true,
    },
  ];
}
