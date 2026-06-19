import { useState } from 'react';

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
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered = active === 'all' ? images : images.filter((img) => img.category === active);

  // Only show filters that have images
  const availableFilters = (Object.keys(FILTER_LABELS) as FilterCategory[]).filter(
    (cat) => cat === 'all' || images.some((img) => img.category === cat)
  );

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {availableFilters.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
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
            onClick={() => setLightbox(img)}
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
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors p-2"
            aria-label="Close lightbox"
            onClick={() => setLightbox(null)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-white/60 text-sm">
            {lightbox.alt}
          </p>
        </div>
      )}
    </>
  );
}
