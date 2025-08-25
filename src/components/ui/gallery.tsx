"use client";

import { useState } from "react";
import { SeoImage } from "./seo-image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { Button } from "./button";

interface ImageItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: ImageItem[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenImage = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
        data-testid="image-gallery"
      >
        {images.map((image, index) => (
          <div
            key={`gallery-${index}`}
            className="relative group aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleOpenImage(index)}
          >
            <SeoImage
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <ZoomIn className="text-white h-8 w-8" />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-4xl p-0 overflow-hidden bg-black border-0"
          onKeyDown={handleKeyDown}
        >
          <div className="relative w-full aspect-video md:aspect-[16/10] lg:aspect-[16/9]">
            {images[activeIndex] && (
              <SeoImage
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority
              />
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-sm bg-black/50 py-2">
              {images[activeIndex]?.alt} ({activeIndex + 1}/{images.length})
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
