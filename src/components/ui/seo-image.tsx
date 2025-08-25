import Image from "next/image";
import { cn } from "@/lib/utils";

interface SeoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function SeoImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  className,
  priority = false,
  placeholder,
  blurDataURL,
  ...props
}: SeoImageProps) {
  // Construct default sizes if not provided
  const defaultSizes =
    sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={fill ? defaultSizes : sizes}
      className={cn(
        "transition-opacity",
        fill ? "object-cover" : "",
        className
      )}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      {...props}
    />
  );
}
