"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMapComponent = dynamic(
  () => import('./LeafletMap'),
  { 
    ssr: false,
    loading: () => (
      <div 
        className="w-full bg-gray-50 rounded-lg flex items-center justify-center border shadow-sm" 
        style={{ height: '400px' }}
      >
        <div className="text-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="text-sm text-gray-500">Memuat peta...</p>
        </div>
      </div>
    )
  }
);

export * from './LeafletMap';
export default LeafletMapComponent;
