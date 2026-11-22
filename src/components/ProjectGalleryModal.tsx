import React, { useEffect, useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Columns2,
  Images,
  MapPin,
  Wrench
} from 'lucide-react';

export interface GalleryLightboxPayload {
  title: string;
  subtitle?: string;
  location?: string;
  images: string[];
  initialIndex?: number;
}

interface ProjectGalleryModalProps {
  gallery: GalleryLightboxPayload | null;
  onClose: () => void;
  onDiscussBuild?: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({
  gallery,
  onClose,
  onDiscussBuild
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    if (!gallery) return;
    setActiveIndex(gallery.initialIndex || 0);
    setCompareMode(false);
    setSliderPos(50);
  }, [gallery]);

  useEffect(() => {
    if (!gallery) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % gallery.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gallery, onClose]);

  if (!gallery || gallery.images.length === 0) return null;

  const total = gallery.images.length;
  const currentImg = gallery.images[activeIndex] || gallery.images[0];
  const beforeImg = gallery.images[0];
  const afterImg = gallery.images[total - 1];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[#0D1B2A] border border-white/15 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lightbox Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#08121d] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
              <span>PROGRESS GALLERY</span>
              {gallery.location && (
                <span className="inline-flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3 h-3 text-[var(--abu-accent)]" />
                  {gallery.location}
                </span>
              )}
              <span className="text-slate-400">
                · Photo {activeIndex + 1} of {total}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-heading font-bold text-white uppercase truncate">
              {gallery.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {total >= 2 && (
              <button
                type="button"
                onClick={() => setCompareMode((prev) => !prev)}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  compareMode
                    ? 'bg-[var(--abu-accent)] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {compareMode ? <Images className="w-3.5 h-3.5" /> : <Columns2 className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">
                  {compareMode ? 'Gallery View' : 'Before / After Slider'}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Viewer Area */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[280px] sm:min-h-[430px] max-h-[64vh] overflow-hidden select-none">
          {compareMode && total >= 2 ? (
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[430px]">
              {/* After Image (Full Background) */}
              <img
                src={afterImg}
                alt="Completed / Deployed Stage"
                className="w-full h-full object-contain max-h-[64vh] mx-auto"
                referrerPolicy="no-referrer"
              />
              {/* Before Image Clipped */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img
                  src={beforeImg}
                  alt="Workshop Fabrication Stage"
                  className="w-full h-full object-contain max-h-[64vh] mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[var(--abu-accent)] shadow-lg pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 py-1 rounded bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold whitespace-nowrap shadow">
                  ↔ Drag
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={95}
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                aria-label="Compare workshop stage and final deployment"
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 text-white text-[10px] font-mono uppercase border border-white/20">
                Stage 1 · Fabrication Bay
              </span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold uppercase shadow">
                Stage {total} · Final Build
              </span>
            </div>
          ) : (
            <>
              <img
                src={currentImg}
                alt={`${gallery.title} — Photo ${activeIndex + 1}`}
                className="max-w-full max-h-[64vh] object-contain mx-auto"
                referrerPolicy="no-referrer"
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[var(--abu-accent)] text-white border border-white/20 cursor-pointer transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 hover:bg-[var(--abu-accent)] text-white border border-white/20 cursor-pointer transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Thumbnails & Bottom Action Strip */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#08121d] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {gallery.images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setCompareMode(false);
                  setActiveIndex(idx);
                }}
                className={`w-16 h-11 rounded overflow-hidden border shrink-0 cursor-pointer transition-all ${
                  !compareMode && activeIndex === idx
                    ? 'border-[var(--abu-accent)] ring-2 ring-[var(--abu-accent)]/50 scale-105'
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {onDiscussBuild && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onDiscussBuild();
              }}
              className="px-4 py-2 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Request Similar Build Quote</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
