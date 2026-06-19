import { useState, useEffect, useCallback, useRef } from 'react';

type FilterCategory =
  | 'all'
  | 'property-interior'
  | 'swimming-pool'
  | 'surrounding-area'
  | 'nearby-attractions';

interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  category: FilterCategory;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: 'All',
  'property-interior': 'Property & Interior',
  'swimming-pool': 'Swimming Pool',
  'surrounding-area': 'Surrounding Area',
  'nearby-attractions': 'Nearby Attractions',
};

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [active, setActive] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = active === 'all' ? images : images.filter((img) => img.category === active);
  const isOpen = lightboxIndex !== null;
  const current = isOpen ? filtered[lightboxIndex] : null;

  const availableFilters = (Object.keys(FILTER_LABELS) as FilterCategory[]).filter(
    (cat) => cat === 'all' || images.some((img) => img.category === cat)
  );

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)), [filtered.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null)), [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, prev, next, close]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  // When filter changes, close lightbox to avoid stale index
  const handleFilterChange = (cat: FilterCategory) => {
    setActive(cat);
    setLightboxIndex(null);
  };

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {availableFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterChange(cat)}
            className={`font-body text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm border-2 transition-all duration-200 ${
              active === cat
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-transparent text-on-surface-var border-outline-var hover:border-primary hover:text-primary'
            }`}
          >
            {FILTER_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((img, i) => (
          <div
            key={`${img.src}-${i}`}
            className="break-inside-avoid overflow-hidden rounded-lg cursor-pointer group relative"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              loading="lazy"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && current && (
        <div
          className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 hover:text-white transition-colors p-2 z-10"
            aria-label="Close image viewer"
            onClick={close}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev arrow */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 md:p-4 rounded-full hover:bg-white/10 z-10"
            aria-label="Previous image"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image — clicking the image itself does nothing (prevents accidental close) */}
          <div className="flex items-center justify-center w-full h-full px-16 md:px-24 py-16">
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg select-none"
              draggable={false}
            />
          </div>

          {/* Next arrow */}
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 md:p-4 rounded-full hover:bg-white/10 z-10"
            aria-label="Next image"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter + caption */}
          <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex flex-col items-center gap-1 px-4">
            <p className="font-body text-white/50 text-xs tracking-widest">
              {lightboxIndex! + 1} / {filtered.length}
            </p>
            <p className="font-body text-white/60 text-sm text-center max-w-md">
              {current.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
