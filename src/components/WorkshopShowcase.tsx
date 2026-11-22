import React, { useState } from 'react';
import { MapPin, CheckCircle2, ShieldCheck, Film, Expand } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BUILTIN_REAL_MEDIA } from '../data/industrialData';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

export const WorkshopShowcase: React.FC = () => {
  const { cmsData, getSection, resolveMediaUrl } = useCms();
  const section = getSection('workshop');
  const [gallery, setGallery] = useState<GalleryLightboxPayload | null>(null);

  const primaryPhoto = section.imagePrimary || BUILTIN_REAL_MEDIA.crusherStandChuteBay;
  const secondaryPhoto = section.imageSecondary || BUILTIN_REAL_MEDIA.jawCrusherScreenYard;

  const fieldWorkPhotos = [
    {
      src: BUILTIN_REAL_MEDIA.landingBackground,
      label: 'ACTIVE FIELD QUARRY',
      caption: 'Diesel Jaw Crusher & 2-Deck Screen Producing Gravel'
    },
    {
      src: BUILTIN_REAL_MEDIA.structuralBatchingTower,
      label: 'SITE STEEL ERECTION',
      caption: 'Elevated Access Stairs & Concrete Batching Tower'
    },
    {
      src: BUILTIN_REAL_MEDIA.quarryFieldDelivery,
      label: 'CRANE TRUCK DISPATCH',
      caption: 'Remote Bush Quarry Offloading & Rigging'
    },
    {
      src: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
      label: 'EMBAKASI WELDING BAY',
      caption: 'Live Heavy Welding on Twin-Tank Mobile Skid'
    }
  ];

  const openWorkshopLightbox = (index: number) => {
    setGallery({
      title: `${cmsData.siteIdentity.shortName} — Embakasi Fabrication & Field Deployment`,
      location: cmsData.siteIdentity.location,
      images: [
        primaryPhoto,
        secondaryPhoto,
        ...fieldWorkPhotos.map((p) => p.src)
      ],
      initialIndex: index
    });
  };

  const operations = [
    {
      title: 'Heavy Welding',
      desc: 'MIG/MAG, TIG, multi-pass stick, and hardfacing overlays on thick plate assemblies.'
    },
    {
      title: 'Precision Cutting',
      desc: 'Oxy-fuel and high-definition plasma cutting of structural plate from 6mm to 40mm+.'
    },
    {
      title: 'Machining & Grinding',
      desc: 'Shaft turning, keyway milling, flange facing, and bearing seat resurfacing.'
    },
    {
      title: 'Plate Fabrication',
      desc: 'Rolling cylindrical shells, press-braking transition cones, and stiffener assembly.'
    },
    {
      title: 'Mechanical Assembly',
      desc: 'Torque-controlled bolt tensioning, bearing press fitment, and dynamic balancing.'
    },
    {
      title: 'Quality Inspection',
      desc: 'Dimensional vernier checks, weld visual examination, runout tests, and trial runs.'
    }
  ];

  return (
    <section
      id="workshop"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--abu-accent)]" />
              <span>
                {section.kicker} · {cmsData.siteIdentity.location}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          <div
            className="flex items-center gap-2 text-xs font-mono text-[var(--abu-text-muted)] px-4 py-3 rounded border shrink-0 shadow-xs"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <ShieldCheck className="w-5 h-5 text-[var(--abu-accent)]" />
            <div>
              <div className="text-[var(--abu-text)] font-bold">100% In-House Fabrication</div>
              <div className="text-[11px] text-[var(--abu-text-muted)]">Strict Quality Inspections</div>
            </div>
          </div>
        </div>

        {/* Visual Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => openWorkshopLightbox(0)}
            className="rounded-lg overflow-hidden aspect-[16/10] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left"
          >
            <img
              src={primaryPhoto}
              alt={`${cmsData.siteIdentity.shortName} Heavy Structural Fabrication Bay`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono flex items-center gap-1 border border-white/15">
              <Expand className="w-3 h-3 text-[var(--abu-amber)]" />
              <span>Gallery</span>
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                FABRICATION BAYS
              </span>
              <h3 className="text-lg font-heading font-bold text-white uppercase">
                Heavy Structural Steel Frames, Chutes &amp; Hoppers
              </h3>
              <p className="text-xs text-neutral-200 font-mono mt-0.5">
                Fabricated and primed at our {cmsData.siteIdentity.location} facility.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => openWorkshopLightbox(1)}
            className="rounded-lg overflow-hidden aspect-[16/10] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left"
          >
            <img
              src={secondaryPhoto}
              alt={`Machinery Assembly and Operational Testing at ${cmsData.siteIdentity.shortName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono flex items-center gap-1 border border-white/15">
              <Expand className="w-3 h-3 text-[var(--abu-amber)]" />
              <span>Gallery</span>
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                COMMISSIONING YARD
              </span>
              <h3 className="text-lg font-heading font-bold text-white uppercase">
                Pre-Dispatch Trial Assembly &amp; Quality Testing
              </h3>
              <p className="text-xs text-neutral-200 font-mono mt-0.5">
                Every crusher and vibrating screen is tested before site delivery.
              </p>
            </div>
          </button>
        </div>

        {/* 4-Card Live Field Work & Deployment Photo Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--abu-text-muted)]">
            <span className="font-bold text-[var(--abu-text)]">
              Real Field Deployments &amp; Workshop Action Photos
            </span>
            <span>Click any photo to zoom</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {fieldWorkPhotos.map((item, idx) => (
              <button
                key={item.label}
                type="button"
                onClick={() => openWorkshopLightbox(idx + 2)}
                className="rounded-lg overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left shadow-xs hover:border-[var(--abu-accent)] transition-colors"
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <div className="text-[9px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                    {item.label}
                  </div>
                  <div className="text-[11px] font-heading font-bold text-white leading-tight line-clamp-2">
                    {item.caption}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Workshop Commissioning Video */}
        {section.videoUrl && (
          <div
            className="border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center shadow-sm"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <div className="lg:col-span-6 bg-black aspect-video lg:aspect-[16/10]">
              <video
                src={resolveMediaUrl(section.videoUrl)}
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                <Film className="w-4 h-4" />
                <span>LIVE WORKSHOP COMMISSIONING VIDEO</span>
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase">
                Machinery Tested Live Before Handover
              </h3>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                Watch our fabricated diesel-powered belt-feed agro-processing mill undergo live running trials prior
                to customer dispatch. You can replace or upload new machinery and workshop videos anytime from the CMS
                Media Library.
              </p>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                Location: <span className="text-[var(--abu-text)] font-bold">{cmsData.siteIdentity.address}</span>
              </div>
            </div>
          </div>
        )}

        {/* 6 Operations Capabilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {operations.map((op, idx) => (
            <div
              key={idx}
              className="p-4 border rounded space-y-1.5"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                <h4 className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase">{op.title}</h4>
              </div>
              <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed font-sans">{op.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <ProjectGalleryModal gallery={gallery} onClose={() => setGallery(null)} />
    </section>
  );
};
