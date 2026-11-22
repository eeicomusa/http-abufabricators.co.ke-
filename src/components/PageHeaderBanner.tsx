import React from 'react';
import { ChevronRight, Phone, ArrowRight } from 'lucide-react';
import { PAGE_DEFINITIONS, PageRoute } from '../utils/router';
import { useCms } from '../context/CmsContext';

interface PageHeaderBannerProps {
  route: Exclude<PageRoute, '/'>;
  onNavigate: (target: PageRoute) => void;
  onRequestQuote: () => void;
}

export const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  route,
  onNavigate,
  onRequestQuote
}) => {
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;
  const meta = PAGE_DEFINITIONS[route];

  return (
    <section
      className="border-b relative overflow-hidden py-12 sm:py-14"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      {/* Website Background Image (Landingaone.jpg) with Frosted White/Surface Tint */}
      {cmsData.theme.backgroundImageUrl && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src={cmsData.theme.backgroundImageUrl}
            alt="ABU Fabricators Background"
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--abu-surface) 92%, transparent) 0%, color-mix(in srgb, var(--abu-surface) 84%, transparent) 100%)'
            }}
          />
        </div>
      )}

      {/* Subtle Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--abu-text) 1px, transparent 1px), linear-gradient(90deg, var(--abu-text) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--abu-text-muted)] mb-4">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-[var(--abu-accent)] font-semibold transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--abu-accent)] font-bold uppercase">{meta.label}</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {meta.kicker}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {meta.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">
              {meta.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${siteIdentity.phoneRaw}`}
              className="px-4 py-2.5 border rounded font-mono text-xs font-bold text-[var(--abu-text)] hover:border-[var(--abu-accent)] flex items-center gap-2 transition-colors"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <Phone className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
              <span>{siteIdentity.phoneDisplay}</span>
            </a>
            {route !== '/contact' && (
              <button
                onClick={onRequestQuote}
                className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
