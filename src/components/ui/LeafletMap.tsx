'use client';
import React, { useEffect, useRef, useState } from 'react';

export interface MapPosition {
  lat: number;
  lng: number;
  address?: string;
}

interface TileLayerInfo {
  layer: any;
  name: string;
}

interface TileLayers {
  openstreetmap: TileLayerInfo;
  satellite: TileLayerInfo;
  terrain: TileLayerInfo;
  dark: TileLayerInfo;
}

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
  onLocationSelect?: (position: MapPosition) => void;
  selectedPosition?: MapPosition | null;
  height?: string;
  searchable?: boolean;
  className?: string;
  defaultTileLayer?: 'openstreetmap' | 'satellite' | 'terrain' | 'dark';
  showAttribution?: boolean; // New prop to control attribution visibility
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center = [-0.59915, 100.4981], // Default: Guguak Malalo coordinates
  zoom = 13,
  onLocationSelect,
  selectedPosition,
  height = '400px',
  searchable = true,
  className = '',
  defaultTileLayer = 'openstreetmap',
  showAttribution = false, // Default to false for cleaner mobile experience
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const layerControlRef = useRef<any>(null);
  const currentTileLayerRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [L, setL] = useState<any>(null);
  const [tileLayers, setTileLayers] = useState<TileLayers | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(defaultTileLayer);

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const leaflet = (await import('leaflet')).default;

        // Import CSS dynamically
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        // Fix for default markers
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl:
            'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });

        setL(leaflet);
        setTileLayers(getTileLayers(leaflet));
      } catch (error) {
        console.error('Failed to load Leaflet:', error);
      }
    };

    loadLeaflet();
  }, []);

  // Define tile layers function
  const getTileLayers = (leaflet: any): TileLayers => ({
    openstreetmap: {
      layer: leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }),
      name: 'Peta Standar',
    },
    satellite: {
      layer: leaflet.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 19,
        }
      ),
      name: 'Satelit',
    },
    terrain: {
      layer: leaflet.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        maxZoom: 17,
      }),
      name: 'Topografi',
    },
    dark: {
      layer: leaflet.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }),
      name: 'Mode Gelap',
    },
  });

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current || !L || !tileLayers) return;

    // Add custom CSS for responsive popups
    const style = document.createElement('style');
    style.textContent = `
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      }
      
      .custom-popup .leaflet-popup-content {
        margin: 0;
        line-height: 1.4;
      }
      
      .custom-popup .leaflet-popup-tip {
        border-radius: 2px;
      }
      
      /* Hide attribution conditionally */
      ${
        !showAttribution
          ? `
      .leaflet-control-attribution {
        display: none !important;
      }
      `
          : `
      /* Hide attribution on mobile devices */
      @media (max-width: 768px) {
        .leaflet-control-attribution {
          display: none !important;
        }
      }
      
      /* Make attribution smaller on tablets */
      @media (min-width: 769px) and (max-width: 1024px) {
        .leaflet-control-attribution {
          font-size: 8px !important;
          background: rgba(255, 255, 255, 0.8) !important;
          padding: 2px 4px !important;
          max-width: 50% !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }
      }
      
      /* Desktop - keep attribution but make it smaller */
      @media (min-width: 1025px) {
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255, 255, 255, 0.9) !important;
          padding: 3px 6px !important;
        }
      }
      `
      }
      
      @media (max-width: 640px) {
        .custom-popup .leaflet-popup-content-wrapper {
          max-width: 250px !important;
        }
        
        .leaflet-popup-close-button {
          padding: 8px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const map = L.map(mapRef.current, {
      attributionControl: showAttribution, // Control attribution visibility
    }).setView(center, zoom);

    // Get tile layers (use tileLayers from state)
    if (!tileLayers) {
      console.error('Tile layers not available');
      return;
    }

    // Add default tile layer
    const defaultLayer = tileLayers[defaultTileLayer].layer;
    defaultLayer.addTo(map);
    currentTileLayerRef.current = defaultLayer;

    // Create layer control for switching between different map types
    const baseMaps: { [key: string]: any } = {};
    Object.entries(tileLayers).forEach(([key, { layer, name }]) => {
      baseMaps[name] = layer;
    });

    const layerControl = L.control.layers(baseMaps).addTo(map);
    layerControlRef.current = layerControl;

    // Handle layer change events
    map.on('baselayerchange', (e: any) => {
      const layerName = e.name;
      const layerKey = Object.entries(tileLayers).find(
        ([_, { name }]) => name === layerName
      )?.[0] as keyof TileLayers;
      if (layerKey) {
        setCurrentLayer(layerKey);
      }
    });

    // Handle map clicks
    map.on('click', async (e: any) => {
      const { lat, lng } = e.latlng;

      // Remove existing marker
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      // Add new marker
      const marker = L.marker([lat, lng]).addTo(map);
      markerRef.current = marker;

      // Get address from coordinates (reverse geocoding)
      try {
        const address = await reverseGeocode(lat, lng);
        const position: MapPosition = { lat, lng, address };

        // Show popup with address
        marker
          .bindPopup(
            `
          <div class="p-3 max-w-xs">
            <p class="text-sm font-medium text-gray-800 mb-2 break-words">${address || 'Alamat tidak ditemukan'}</p>
            <p class="text-xs text-gray-500">Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}</p>
          </div>
        `,
            {
              maxWidth: 280,
              className: 'custom-popup',
              offset: [0, -10],
              autoPan: true,
              autoPanPadding: [20, 20],
            }
          )
          .openPopup();

        onLocationSelect?.(position);
      } catch (error) {
        console.error('Error getting address:', error);
        const position: MapPosition = { lat, lng };
        onLocationSelect?.(position);
      }
    });

    mapInstanceRef.current = map;
    setIsMapReady(true);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, onLocationSelect, defaultTileLayer, L, tileLayers]);

  // Update marker when selectedPosition changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedPosition || !L) return;

    const map = mapInstanceRef.current;

    // Remove existing marker
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    // Add marker for selected position
    const marker = L.marker([selectedPosition.lat, selectedPosition.lng]).addTo(map);
    markerRef.current = marker;

    // Center map on selected position
    map.setView([selectedPosition.lat, selectedPosition.lng]);

    // Show popup if address is available
    if (selectedPosition.address) {
      marker
        .bindPopup(
          `
        <div class="p-3 max-w-xs">
          <p class="text-sm font-medium text-gray-800 mb-2 break-words">${selectedPosition.address}</p>
          <p class="text-xs text-gray-500">Lat: ${selectedPosition.lat.toFixed(6)}<br/>Lng: ${selectedPosition.lng.toFixed(6)}</p>
        </div>
      `,
          {
            maxWidth: 280,
            className: 'custom-popup',
            offset: [0, -10],
            autoPan: true,
            autoPanPadding: [20, 20],
          }
        )
        .openPopup();
    }
  }, [selectedPosition, L]);

  // Reverse geocoding function
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Nagari-Guguak-Malalo/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Geocoding failed');

      const data = await response.json();
      return data.display_name || 'Alamat tidak ditemukan';
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Alamat tidak ditemukan';
    }
  };

  // Search for location
  const searchLocation = async () => {
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ' Indonesia'
        )}&limit=5`,
        {
          headers: {
            'User-Agent': 'Nagari-Guguak-Malalo/1.0',
          },
        }
      );

      if (!response.ok) throw new Error('Search failed');

      const results = await response.json();
      if (results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        // Center map on search result
        mapInstanceRef.current.setView([lat, lng], 15);

        // Remove existing marker
        if (markerRef.current) {
          mapInstanceRef.current.removeLayer(markerRef.current);
        }

        // Add marker for search result
        const marker = L.marker([lat, lng]).addTo(mapInstanceRef.current);
        markerRef.current = marker;

        const position: MapPosition = {
          lat,
          lng,
          address: result.display_name,
        };

        marker
          .bindPopup(
            `
          <div class="p-3 max-w-xs">
            <p class="text-sm font-medium text-gray-800 mb-2 break-words">${result.display_name}</p>
            <p class="text-xs text-gray-500">Lat: ${lat.toFixed(6)}<br/>Lng: ${lng.toFixed(6)}</p>
          </div>
        `,
            {
              maxWidth: 280,
              className: 'custom-popup',
              offset: [0, -10],
              autoPan: true,
              autoPanPadding: [20, 20],
            }
          )
          .openPopup();

        onLocationSelect?.(position);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchLocation();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Loading state - show until Leaflet is ready */}
      {(!L || !tileLayers) && (
        <div
          className="flex w-full items-center justify-center rounded-lg border bg-gray-50"
          style={{ height }}
        >
          <div className="text-center">
            <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600">Memuat peta...</p>
          </div>
        </div>
      )}

      {/* Map container - only show when ready */}
      {L && tileLayers && (
        <>
          {searchable && (
            <div className="mb-3 space-y-2">
              {/* Search Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Cari lokasi (contoh: Jalan Sudirman, Jakarta)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={searchLocation}
                  disabled={isSearching || !searchQuery.trim()}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSearching ? 'Mencari...' : 'Cari'}
                </button>
              </div>

              {/* Quick Layer Switch */}
              <div className="flex gap-1">
                {Object.entries(tileLayers).map(([key, layerInfo]: [string, any]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() =>
                      switchTileLayer(key as 'openstreetmap' | 'satellite' | 'terrain' | 'dark')
                    }
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      currentLayer === key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {layerInfo.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={mapRef} className="w-full rounded-lg border shadow-sm" style={{ height }} />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-gray-500">Klik pada peta untuk memilih lokasi</p>
            <p className="text-xs text-gray-400">
              Mode: {tileLayers[currentLayer]?.name || currentLayer}
            </p>
          </div>
        </>
      )}
    </div>
  );

  // Helper function to switch tile layers programmatically
  function switchTileLayer(layerKey: 'openstreetmap' | 'satellite' | 'terrain' | 'dark') {
    if (!mapInstanceRef.current || !currentTileLayerRef.current || !tileLayers) return;

    const map = mapInstanceRef.current;
    const newLayer = tileLayers[layerKey].layer;

    // Remove current layer
    map.removeLayer(currentTileLayerRef.current);

    // Add new layer
    newLayer.addTo(map);
    currentTileLayerRef.current = newLayer;
    setCurrentLayer(layerKey);
  }
};

export default LeafletMap;
