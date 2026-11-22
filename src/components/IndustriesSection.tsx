import React, { useState } from 'react';
import {
  Pickaxe,
  Mountain,
  HardHat,
  Factory,
  Wheat,
  Recycle,
  Droplets,
  Zap,
  Truck,
  Utensils,
  ArrowRight,
  HelpCircle,
  Expand,
  ShieldCheck
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { GENERATED_MEDIA } from '../data/industrialData';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

interface IndustriesProps {
  onSelectIndustry: (industryId: string) => void;
  onRequestCustomConsultation: () => void;
}

export const IndustriesSection: React.FC<IndustriesProps> = ({
  onSelectIndustry,
  onRequestCustomConsultation
}) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('industries');
  const [gallery, setGallery] = useState<GalleryLightboxPayload | null>(null);

  const portalFrameImage = section.imagePrimary || GENERATED_MEDIA.warehousePortalFrame;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pickaxe':
        return Pickaxe;
      case 'Mountain':
        return Mountain;
      case 'HardHat':
        return HardHat;
      case 'Factory':
        return Factory;
      case 'Wheat':
        return Wheat;
      case 'Recycle':
        return Recycle;
      case 'Droplets':
        return Droplets;
      case 'Zap':
        return Zap;
      case 'Truck':
        return Truck;
      case 'Utensils':
        return Utensils;
      default:
        return Factory;
    }
  };

  return (
    <section
      id="industries"
      className="py-20 border-b relative overflow-hidden"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      {/* Subtle Full-Width Architectural Portal Frame Atmospheric Backdrop */}
      <div className="absolute inset-x-0 top-0 h-[440px] pointer-events-none select-none overflow-hidden">
        <img
          src={portalFrameImage}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center opacity-[0.09]"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, color-mix(in srgb, var(--abu-bg) 55%, transparent) 0%, var(--abu-bg) 96%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Authoritative Corporate Header + High-Resolution Portal Frame Primary Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Sector Expertise Across Kenya & East Africa'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'INDUSTRIES WE SERVE'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
            <div
              className="pt-3 border-t flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--abu-text)]"
              style={{ borderColor: 'var(--abu-border)' }}
            >
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>BS EN 10025 S275 / S355 Portal Steel</span>
              </span>
              <span className="text-[var(--abu-border)]">|</span>
              <span className="font-semibold">10 Core East African Sectors</span>
            </div>
          </div>

          {/* Primary Architectural Steel Portal Frame Visual Showcase */}
          <div className="lg:col-span-6">
            <button
              type="button"
              onClick={() =>
                setGallery({
                  title: `${cmsData.siteIdentity.shortName} — Clear-Span Industrial Steel Portal Framing`,
                  location: 'Kenya & East Africa Industrial Corridors',
                  images: [portalFrameImage],
                  initialIndex: 0
                })
              }
              className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left shadow-lg hover:border-[var(--abu-accent)] transition-colors block"
            >
              <img
                src={portalFrameImage}
                alt={`High-resolution clear-span warehouse steel portal frame engineered by ${cmsData.siteIdentity.companyName}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/90 via-[#0D1B2A]/20 to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono inline-flex items-center gap-1.5 border border-white/20">
                <Expand className="w-3 h-3 text-[var(--abu-amber)]" />
                <span>Inspect Steelwork</span>
              </span>
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-amber)] font-bold">
                    TURNKEY INDUSTRIAL INFRASTRUCTURE
                  </span>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-white uppercase leading-tight">
                    Clear-Span Warehouse Portal Frames &amp; Plant Structures
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-200 bg-black/55 px-2.5 py-1 rounded border border-white/15 shrink-0 self-start sm:self-auto">
                  Fedha Rd → All 47 Counties
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 10 Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cmsData.industries.map((ind) => {
            const Icon = getIcon(ind.icon);
            return (
              <div
                key={ind.id}
                className="border rounded-lg p-6 flex flex-col justify-between hover:border-[var(--abu-accent)] transition-colors group shadow-sm"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className="w-10 h-10 rounded border flex items-center justify-center text-[var(--abu-accent)]"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--abu-text-muted)]">
                      Kenya Industry
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase group-hover:text-[var(--abu-accent)] transition-colors">
                      {ind.name}
                    </h3>
                    <p className="mt-2 text-xs text-[var(--abu-text-muted)] leading-relaxed">{ind.description}</p>
                  </div>

                  {/* Typical equipment */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-[var(--abu-text-muted)] block mb-1">
                      Key Equipment Solutions:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.equipmentNeeds.map((item) => (
                        <span
                          key={item}
                          className="text-[11px] font-mono text-[var(--abu-text)] px-2 py-0.5 rounded border"
                          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Kenya Context */}
                  <div className="text-[11px] font-mono text-[var(--abu-text-muted)] border-l-2 border-[var(--abu-accent)] pl-2.5">
                    {ind.kenyaContext}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--abu-border)] flex justify-end">
                  <button
                    onClick={() => onSelectIndustry(ind.id)}
                    className="text-xs font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] flex items-center gap-1.5 uppercase transition-colors cursor-pointer"
                  >
                    <span>Request Industry Spec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 11th Card: "OTHER INDUSTRIES" Banner */}
          <div
            className="border-2 border-dashed border-[var(--abu-accent)]/60 rounded-lg p-6 flex flex-col justify-between"
            style={{ backgroundColor: 'var(--abu-surface-alt)' }}
          >
            <div className="space-y-4">
              <div
                className="w-10 h-10 rounded border border-[var(--abu-accent)]/50 flex items-center justify-center text-[var(--abu-accent)]"
                style={{ backgroundColor: 'var(--abu-bg)' }}
              >
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">OTHER INDUSTRIES</h3>
                <p className="mt-2 text-xs text-[var(--abu-text-muted)] leading-relaxed">
                  Have a unique industrial requirement or specialized fabrication application? Our engineering
                  and fabrication team on {cmsData.siteIdentity.location} will analyze your operational needs
                  and custom-build a durable solution.
                </p>
              </div>
              <ul className="text-xs text-[var(--abu-text-muted)] font-mono space-y-1">
                <li>• Bespoke production tooling</li>
                <li>• Heavy transport trailer retrofits</li>
                <li>• Municipal waste & water skids</li>
              </ul>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--abu-border)]">
              <button
                onClick={onRequestCustomConsultation}
                className="w-full py-2.5 px-4 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white text-xs font-heading font-bold uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
              >
                TALK TO OUR ENGINEERING TEAM
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProjectGalleryModal
        gallery={gallery}
        onClose={() => setGallery(null)}
        onDiscussBuild={onRequestCustomConsultation}
      />
    </section>
  );
};
