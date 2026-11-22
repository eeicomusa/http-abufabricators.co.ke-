import React, { useState } from 'react';
import { ArrowRight, Building2, Maximize2, Pencil, ShieldCheck, Layers } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { SteelworkStructureItem } from '../data/industrialData';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

interface StructuralSteelGalleryProps {
  onRequestSteelworkQuote: (item: SteelworkStructureItem) => void;
}

const CATEGORIES: Array<'All' | SteelworkStructureItem['category']> = [
  'All',
  'Portal Frames & Warehouses',
  'Mezzanines & Platforms',
  'Tanks & Silos',
  'Staircases & Catwalks',
  'Gates & Heavy Doors'
];

export const StructuralSteelGallery: React.FC<StructuralSteelGalleryProps> = ({
  onRequestSteelworkQuote
}) => {
  const { cmsData, getSection, isAdminAuthenticated, isEditorOpen, openWithTab, presentationMode } =
    useCms();
  const section = getSection('steelwork-gallery');
  const [selectedCategory, setSelectedCategory] = useState<'All' | SteelworkStructureItem['category']>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryLightboxPayload | null>(null);

  const items = cmsData.steelworkGallery || [];
  const filtered =
    selectedCategory === 'All' ? items : items.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="steelwork-gallery"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{section.kicker || 'Structural Building & Commercial Steelwork'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'STEEL STRUCTURES BUILT TO ORDER'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          {isAdminAuthenticated && !isEditorOpen && !presentationMode && (
            <button
              type="button"
              onClick={() => openWithTab('catalog', 'steelwork-gallery')}
              className="self-start lg:self-end px-4 py-2 border rounded text-xs font-mono font-bold text-[var(--abu-text)] hover:border-[var(--abu-accent)] hover:text-[var(--abu-accent)] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Manage Steelwork Gallery (CMS)</span>
            </button>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded text-xs font-mono uppercase transition-colors border cursor-pointer ${
                  active
                    ? 'bg-[var(--abu-accent)] text-white border-[var(--abu-accent)] font-bold shadow-sm'
                    : 'text-[var(--abu-text-muted)] hover:text-[var(--abu-text)] hover:border-[var(--abu-accent)]'
                }`}
                style={!active ? { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' } : undefined}
              >
                {category === 'All' ? `All Steel Structures (${items.length})` : category}
              </button>
            );
          })}
        </div>

        {/* Grid of Structural Steel Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:border-[var(--abu-accent)] transition-all group"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div>
                {/* Image Header with Lightbox Zoom */}
                <button
                  type="button"
                  onClick={() =>
                    setActiveLightbox({
                      title: item.title,
                      location: `${item.category} · ${item.typicalSpanOrCapacity}`,
                      images: [item.image],
                      initialIndex: 0
                    })
                  }
                  className="w-full relative aspect-[16/10] bg-[#0D1B2A] overflow-hidden cursor-zoom-in block text-left"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} — ${cmsData.siteIdentity.companyName}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-[#0D1B2A]/90 border border-white/15 rounded text-[10px] font-mono font-bold uppercase text-white">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 rounded text-[10px] font-mono text-white inline-flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[var(--abu-amber)]" />
                    <span>Zoom</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-xs font-mono font-bold text-[var(--abu-amber)]">
                    {item.typicalSpanOrCapacity}
                  </div>
                </button>

                {/* Structural Specs Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-heading font-extrabold text-[var(--abu-text)] uppercase leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">{item.description}</p>

                  <div
                    className="p-3 rounded border space-y-1.5 text-[11px] font-mono"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <div className="flex items-start gap-2">
                      <Layers className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                      <span className="text-[var(--abu-text)]">
                        <strong>Steel Spec:</strong> {item.steelGrade}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[var(--abu-text-muted)]">
                        <strong>Coating:</strong> {item.finishSpec}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 pb-5 pt-1">
                <button
                  type="button"
                  onClick={() => onRequestSteelworkQuote(item)}
                  className="w-full py-2.5 px-4 bg-[#0D1B2A] hover:bg-[var(--abu-accent)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Request Steelwork Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectGalleryModal
        gallery={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />
    </section>
  );
};
