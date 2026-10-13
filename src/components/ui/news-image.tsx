"use client";

import { useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  containerClassName?: string;
}

const FALLBACK_IMAGE = "/placeholder-news.svg";

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
  const imgRef = useRef<HTMLImageElement>(null);

  // If no source is provided or error occurred, use fallback
  const imageSrc = !src || error ? (fallbackSrc || FALLBACK_IMAGE) : src;

  // Reset state whenever the incoming source changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(false);
    setError(false);
  }, [src]);

  // Images restored from cache can finish loading before React hydrates, so
  // onLoad never fires and they would otherwise stay invisible. Check the
  // element directly and reflect its real state.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete) {
      if (img.naturalWidth > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoaded(true);
      } else {
        setError(true);
      }
    }
  }, [imageSrc]);

  // The fallback image failed as well: stop rendering the <img> so the globe
  // placeholder block is shown instead of a stuck invisible image.
  const fallbackFailed = error && loaded;

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-muted flex items-center justify-center", containerClassName)}>
      {/* Show placeholder/skeleton until fully loaded */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-muted transition-opacity duration-300",
        loaded && !error ? "opacity-0" : "opacity-100"
      )}>
        <Globe className="w-8 h-8 text-muted-foreground/30 animate-pulse" />
      </div>
      
      {!fallbackFailed && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300", 
            loaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={() => setLoaded(true)}
          onError={() => {
            if (!error) { // First failure: switch to the fallback source
              setError(true);
            } else { // Fallback failed too: reveal the globe placeholder
              setLoaded(true);
            }
          }}
          referrerPolicy="no-referrer"
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
