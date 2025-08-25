"use client";
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import LeafletMap, { MapPosition } from '@/components/ui/LeafletMapDynamic';

interface LocationPickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLocationSelect: (position: MapPosition) => void;
  initialPosition?: MapPosition | null;
  title?: string;
}

const LocationPickerDialog: React.FC<LocationPickerDialogProps> = ({
  open,
  onOpenChange,
  onLocationSelect,
  initialPosition,
  title = "Pilih Lokasi di Peta",
}) => {
  const [selectedPosition, setSelectedPosition] = useState<MapPosition | null>(
    initialPosition || null
  );
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    if (initialPosition) {
      setSelectedPosition(initialPosition);
    }
  }, [initialPosition]);

  const handleLocationSelect = (position: MapPosition) => {
    setSelectedPosition(position);
  };

  const handleConfirm = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition);
      onOpenChange(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation tidak didukung oleh browser ini');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Nagari-Guguak-Malalo/1.0',
              },
            }
          );
          
          const data = await response.json();
          const address = data.display_name || 'Alamat tidak ditemukan';
          
          const currentPosition: MapPosition = {
            lat: latitude,
            lng: longitude,
            address,
          };
          
          setSelectedPosition(currentPosition);
        } catch (error) {
          console.error('Error getting address:', error);
          setSelectedPosition({
            lat: latitude,
            lng: longitude,
          });
        } finally {
          setIsGettingLocation(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        
        let message = 'Tidak dapat mengakses lokasi';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Akses lokasi ditolak. Silakan izinkan akses lokasi di browser Anda.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Informasi lokasi tidak tersedia.';
            break;
          case error.TIMEOUT:
            message = 'Waktu permintaan lokasi habis.';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Location Button */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Klik pada peta untuk memilih lokasi atau gunakan lokasi saat ini
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex items-center gap-2"
            >
              {isGettingLocation ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
              {isGettingLocation ? 'Mengambil...' : 'Lokasi Saya'}
            </Button>
          </div>

          {/* Map */}
          <div className="border rounded-lg overflow-hidden">
            <LeafletMap
              center={selectedPosition ? [selectedPosition.lat, selectedPosition.lng] : undefined}
              zoom={selectedPosition ? 15 : 13}
              onLocationSelect={handleLocationSelect}
              selectedPosition={selectedPosition}
              height="500px"
              searchable={true}
              defaultTileLayer="satellite"
              className="w-full"
            />
          </div>

          {/* Selected Location Info */}
          {selectedPosition && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Lokasi Terpilih:</h4>
              {selectedPosition.address && (
                <p className="text-sm text-gray-700 mb-1">{selectedPosition.address}</p>
              )}
              <p className="text-xs text-gray-500">
                Koordinat: {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedPosition}
            className="bg-[#7ca186] hover:bg-[#6a8f73]"
          >
            Pilih Lokasi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPickerDialog;
