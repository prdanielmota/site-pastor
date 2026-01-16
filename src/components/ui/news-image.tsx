"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1491396023581-4344e51f45dc?q=80&w=1000&auto=format&fit=crop";

export function NewsImage({ 
  src, 
  alt, 
  fallbackSrc, 
  className, 
  containerClassName,
  ...props 
}: NewsImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // If no source is provided or error occurred, use fallback
  const imageSrc = !src || error ? (fallbackSrc || FALLBACK_IMAGE) : src;

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted flex items-center justify-center", containerClassName)}>
      {/* Show placeholder/skeleton until fully loaded */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-muted transition-opacity duration-300",
        loaded ? "opacity-0" : "opacity-100"
      )}>
        <Globe className="w-8 h-8 text-muted-foreground/30 animate-pulse" />
      </div>
      
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300", 
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) { // Prevent infinite loop if fallback also fails
            setError(true);
            // Don't setLoaded(true) here immediately to allow fallback to load
          }
        }}
        referrerPolicy="no-referrer"
        loading="lazy"
        {...props}
      />
    </div>
  );
}
