import React, { useState } from 'react';
import { ArrowRight, MessageSquare, Wrench, ShieldCheck, MapPin, Phone } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { GENERATED_MEDIA } from '../data/industrialData';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

interface HeroProps {
  onStartProject: () => void;
  onRequestQuote: () => void;
  onExploreCapabilities: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartProject,
  onRequestQuote,
  onExploreCapabilities
}) => {
  const { cmsData, getSection } = useCms();
  const { siteIdentity } = cmsData;
  const hero = getSection('hero');
  const [heroGallery, setHeroGallery] = useState<GalleryLightboxPayload | null>(null);

  const primaryHeroPhoto =
    hero.imagePrimary || '/assets/aistudio/IMG-20261115-WA0025_6528335a.jpg';
  const secondaryHeroPhoto =
    hero.imageSecondary || GENERATED_MEDIA.fieldDeploymentSteel;

  const whatsappUrl = `https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteIdentity.companyName}, I would like a free consultation and quotation for a steel fabrication or industrial project.`
  )}`;

  return (
    <section
      id="hero"
      className="relative border-b overflow-hidden"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      {/* Website Background Image (Landingaone.jpg by default) with Clean White Frosted Overlay */}
      {cmsData.theme.backgroundImageUrl && (
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <img
            src={cmsData.theme.backgroundImageUrl}
            alt="ABU Fabricators Background"
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, color-mix(in srgb, var(--abu-bg) 92%, transparent) 0%, color-mix(in srgb, var(--abu-bg) 82%, transparent) 55%, color-mix(in srgb, var(--abu-bg) 90%, transparent) 100%)'
            }}
          />
        </div>
      )}

      {/* Subtle Engineering Blueprint Grid on White Canvas */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--abu-text) 1px, transparent 1px), linear-gradient(90deg, var(--abu-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20 relative z-10">
        {/* Top Kicker - Location & Brand Core */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-10"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[var(--abu-text-muted)]">
            <MapPin className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
            <span className="font-semibold text-[var(--abu-text)]">{siteIdentity.address}</span>
            <span className="opacity-40 hidden sm:inline">/</span>
            <span className="hidden sm:inline">{siteIdentity.coverage}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono tracking-wider">
            <a
              href={`tel:${siteIdentity.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-[var(--abu-text)] hover:text-[var(--abu-accent)] font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
              <span>Call {siteIdentity.phoneDisplay}</span>
            </a>
            <span className="hidden md:inline text-[var(--abu-accent)] font-bold">{siteIdentity.tagline}</span>
          </div>
        </div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Proposition & CTA Engine */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {hero.kicker}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-[var(--abu-text)] tracking-tight leading-[1.03] uppercase text-balance">
              {hero.headline}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[var(--abu-text)] leading-relaxed max-w-2xl">
              {hero.subheadline}
            </p>

            {/* Core Capability Labels */}
            <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-[var(--abu-text-muted)]">
              <span className="text-[var(--abu-text)] font-bold">STRUCTURAL STEEL</span>
              <span className="text-[var(--abu-accent)]">·</span>
              <span className="text-[var(--abu-text)] font-bold">CUSTOM FABRICATION</span>
              <span className="text-[var(--abu-accent)]">·</span>
              <span className="text-[var(--abu-text)] font-bold">INDUSTRIAL WELDING</span>
              <span className="text-[var(--abu-accent)]">·</span>
              <span className="text-[var(--abu-text)] font-bold">STEEL FRAMEWORKS</span>
              <span className="text-[var(--abu-accent)]">·</span>
              <span className="text-[var(--abu-text)] font-bold">INSTALLATION SUPPORT</span>
            </div>

            {/* Primary Action Button Cluster */}
            <div className="pt-3 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <button
                onClick={onStartProject}
                className="px-6 py-3.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white font-heading font-bold text-base uppercase tracking-wider rounded-md transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{hero.primaryCta || 'Get a Free Quote'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestQuote}
                className="px-6 py-3.5 font-heading font-bold text-base uppercase tracking-wider rounded-md transition-colors border flex items-center justify-center gap-2 cursor-pointer hover:border-[var(--abu-accent)]"
                style={{
                  backgroundColor: 'var(--abu-surface)',
                  borderColor: 'var(--abu-border)',
                  color: 'var(--abu-text)'
                }}
              >
                <Wrench className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>{hero.secondaryCta || 'Our Services'}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-[#0D1B2A] hover:bg-[#16293f] text-white font-heading font-bold text-base uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                <span>CALL / WHATSAPP {siteIdentity.phoneDisplay}</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[var(--abu-text-muted)] font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>Heavy-Gauge Structural Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>Quality Workmanship &amp; On-Time Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>Same-Day Quote Response</span>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Split Composition */}
          <div className="lg:col-span-5 space-y-4">
            <div
              className="grid grid-cols-2 gap-3 p-2 border rounded-lg shadow-lg"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <button
                type="button"
                onClick={() =>
                  setHeroGallery({
                    title: `${siteIdentity.shortName} — Workshop & Field Deployment Showcase`,
                    location: siteIdentity.location,
                    images: [primaryHeroPhoto, secondaryHeroPhoto],
                    initialIndex: 0
                  })
                }
                className="relative group overflow-hidden rounded bg-[#0D1B2A] aspect-[3/4] cursor-zoom-in text-left"
              >
                <img
                  src={primaryHeroPhoto}
                  alt={`${siteIdentity.companyName} Heavy Industrial Fabrication and Welding Workshop`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-amber)] font-bold">
                    WORKSHOP
                  </div>
                  <div className="text-sm font-heading font-bold text-white uppercase leading-tight">
                    Fabrication &amp; Welding
                  </div>
                  <div className="text-[11px] text-neutral-200">{siteIdentity.location}</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setHeroGallery({
                    title: `${siteIdentity.shortName} — Structural Steel & Plant Field Deployment`,
                    location: 'Kenya & East Africa',
                    images: [primaryHeroPhoto, secondaryHeroPhoto],
                    initialIndex: 1
                  })
                }
                className="relative group overflow-hidden rounded bg-[#0D1B2A] aspect-[3/4] cursor-zoom-in text-left"
              >
                <img
                  src={secondaryHeroPhoto}
                  alt="Structural Steelwork and Industrial Batching Plant Field Deployment in Kenya"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-amber)] font-bold">
                    FIELD DEPLOYMENT
                  </div>
                  <div className="text-sm font-heading font-bold text-white uppercase leading-tight">
                    Structural Steel &amp; Plant
                  </div>
                  <div className="text-[11px] text-neutral-200">Kenya &amp; East Africa</div>
                </div>
              </button>
            </div>

            <div
              className="border p-4 rounded-md flex items-center justify-between"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div>
                <div className="text-xs font-mono uppercase text-[var(--abu-text-muted)]">
                  Explore machinery & equipment?
                </div>
                <div className="text-sm font-bold text-[var(--abu-text)] font-heading uppercase">
                  Browse fabricated systems & crushers
                </div>
              </div>
              <button
                onClick={onExploreCapabilities}
                className="text-xs font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] flex items-center gap-1.5 uppercase transition-colors cursor-pointer"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Short Intro Paragraph Below Hero */}
        <div
          className="mt-12 p-6 sm:p-8 rounded-lg border-l-4 border border-[var(--abu-border)] shadow-sm"
          style={{
            backgroundColor: 'var(--abu-surface)',
            borderLeftColor: 'var(--abu-accent)'
          }}
        >
          <p className="text-sm sm:text-base text-[var(--abu-text)] leading-relaxed max-w-5xl">
            {hero.body}
          </p>
        </div>
      </div>

      <ProjectGalleryModal
        gallery={heroGallery}
        onClose={() => setHeroGallery(null)}
        onDiscussBuild={onStartProject}
      />
    </section>
  );
};
