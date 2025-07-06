import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (file: File | null) => void;
  className?: string;
  label?: string;
  aspectRatio?: "square" | "video" | "auto";
  maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  initialImage,
  onImageChange,
  className,
  label = "Upload Gambar",
  aspectRatio = "auto",
  maxSizeMB = 5,
}) => {
  const [preview, setPreview] = useState<string | undefined>(initialImage);
  const [error, setError] = useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      setPreview(undefined);
      onImageChange(null);
      return;
    }

    // Check file size
    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      setError(`Ukuran file terlalu besar. Maksimal ${maxSizeMB}MB.`);
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diperbolehkan.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onImageChange(file);
  };

  const handleClearImage = () => {
    setPreview(undefined);
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && <p className="text-sm font-medium mb-1">{label}</p>}

      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 transition-all",
          {
            "aspect-square": aspectRatio === "square",
            "aspect-video": aspectRatio === "video",
          },
          preview ? "border-green-200 bg-green-50" : "hover:border-gray-400"
        )}
      >
        {preview ? (
          <div className="relative h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ) : (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-full py-8 cursor-pointer"
          >
            <div className="p-3 rounded-full bg-gray-100 mb-2">
              <Image className="h-6 w-6 text-gray-500" />
            </div>
            <p className="text-sm font-medium text-gray-700">
              Klik untuk upload gambar
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG atau WEBP (Maks. {maxSizeMB}MB)
            </p>
          </label>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={inputRef}
      />
    </div>
  );
};

export default ImageUploader;
