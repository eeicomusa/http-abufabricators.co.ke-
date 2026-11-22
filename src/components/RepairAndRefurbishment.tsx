import React, { useState } from 'react';
import { ArrowRight, Wrench, CheckCircle2, RotateCcw, Expand } from 'lucide-react';
import { REFURBISHMENT_PROCESS, BUILTIN_REAL_MEDIA } from '../data/industrialData';
import { useCms } from '../context/CmsContext';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

interface RepairRefurbProps {
  onRequestAssessment: () => void;
}

export const RepairAndRefurbishment: React.FC<RepairRefurbProps> = ({ onRequestAssessment }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('maintenance');
  const [gallery, setGallery] = useState<GalleryLightboxPayload | null>(null);
  const fieldRigPhoto = section.imagePrimary || BUILTIN_REAL_MEDIA.quarryFieldDelivery;
  const workshopRebuildPhoto = section.imageSecondary || BUILTIN_REAL_MEDIA.crusherStandChuteBay;

  return (
    <section
      id="maintenance"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Plant Availability & Life Extension'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'KEEP YOUR EQUIPMENT WORKING'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          <div>
            <button
              onClick={onRequestAssessment}
              className="px-6 py-3.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Wrench className="w-4 h-4" />
              <span>REQUEST MACHINE ASSESSMENT</span>
            </button>
          </div>
        </div>

        {/* 12 Core Repair Services Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            'Crusher Overhauls',
            'Conveyor Belt Repairs',
            'Structural Crack Repairs',
            'Bearing Replacement',
            'Wear-Part Changeouts',
            'Machine Modifications',
            'Shaft Alignment',
            'Housing Machining',
            'Welding Hardfacing',
            'Screen Re-springing',
            'Hydraulic Repairs',
            'Equipment Inspections'
          ].map((srv, idx) => (
            <div
              key={idx}
              className="p-3 border rounded text-xs text-[var(--abu-text)] flex items-center gap-2 font-medium"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
              <span className="font-mono text-[11px] truncate">{srv}</span>
            </div>
          ))}
        </div>

        {/* Field Rigging & Structural Rebuild Visual Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() =>
              setGallery({
                title: `${cmsData.siteIdentity.shortName} — Field Rigging & Remote Quarry Deployment`,
                location: 'Remote County Site, Kenya',
                images: [fieldRigPhoto, workshopRebuildPhoto],
                initialIndex: 0
              })
            }
            className="rounded-lg overflow-hidden aspect-[16/9] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left shadow-sm"
          >
            <img
              src={fieldRigPhoto}
              alt="ABU Fabricators crane-truck offloading and remote site mechanical installation"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono inline-flex items-center gap-1 border border-white/15">
              <Expand className="w-3 h-3 text-[var(--abu-amber)]" />
              <span>Zoom</span>
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                ON-SITE RIGGING &amp; ERECTION
              </span>
              <h3 className="text-lg font-heading font-bold text-white uppercase">
                Crane-Assisted Crusher &amp; Screen Field Installation
              </h3>
            </div>
          </button>

          <button
            type="button"
            onClick={() =>
              setGallery({
                title: `${cmsData.siteIdentity.shortName} — Structural Stand & Chute Overhaul`,
                location: cmsData.siteIdentity.location,
                images: [fieldRigPhoto, workshopRebuildPhoto],
                initialIndex: 1
              })
            }
            className="rounded-lg overflow-hidden aspect-[16/9] bg-[#0D1B2A] border border-[var(--abu-border)] relative group cursor-zoom-in text-left shadow-sm"
          >
            <img
              src={workshopRebuildPhoto}
              alt="Structural steel crusher support frame and heavy hopper refurbishment at Embakasi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/75 text-white text-[10px] font-mono inline-flex items-center gap-1 border border-white/15">
              <Expand className="w-3 h-3 text-[var(--abu-amber)]" />
              <span>Zoom</span>
            </span>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                WORKSHOP REBUILD &amp; REINFORCEMENT
              </span>
              <h3 className="text-lg font-heading font-bold text-white uppercase">
                Heavy Frame Resurfacing, Gusseting &amp; Chute Liners
              </h3>
            </div>
          </button>
        </div>

        {/* 8-Stage Refurbishment Lifecycle */}
        <div
          className="border rounded-lg p-6 sm:p-10 space-y-8 shadow-sm"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
              Engineering Lifecycle
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-1">
              RESTORE. UPGRADE. RETURN TO PRODUCTION.
            </h3>
            <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] mt-2">
              Instead of discarding fatigued machinery or waiting months for expensive overseas imports, our
              structured 8-step refurbishment process restores equipment to original factory performance at a
              fraction of the capital cost.
            </p>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REFURBISHMENT_PROCESS.map((step) => (
              <div
                key={step.step}
                className="p-4 border rounded flex flex-col justify-between space-y-3 group hover:border-[var(--abu-accent)] transition-colors"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[var(--abu-accent)] font-bold">
                      PHASE {step.step}
                    </span>
                    <RotateCcw className="w-3.5 h-3.5 text-[var(--abu-text-muted)] group-hover:text-[var(--abu-accent)] transition-colors" />
                  </div>
                  <h4 className="text-base font-heading font-bold text-[var(--abu-text)] uppercase mt-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--abu-text-muted)] mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Refurbishment Visual Showcase */}
          <div
            className="p-6 border rounded-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="md:col-span-5 rounded overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)]">
              <img
                src={BUILTIN_REAL_MEDIA.jawCrusherScreenYard}
                alt={`Refurbished Jaw Crusher and Screening Plant by ${cmsData.siteIdentity.companyName}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="md:col-span-7 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                Proven Reliability in Kenya
              </span>
              <h4 className="text-xl font-heading font-bold text-[var(--abu-text)] uppercase">
                Why Machine Refurbishment Makes Economic Sense
              </h4>
              <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] leading-relaxed">
                Refurbishing an existing jaw crusher or heavy vibrating screen saves up to 55% in capital outlay
                compared to procuring brand-new equipment, while avoiding the 8-to-14 week overseas shipping delays
                at Mombasa port. Every machine rebuilt at {cmsData.siteIdentity.location} undergoes rigorous 4-hour
                temperature and vibration testing before handover.
              </p>
              <div className="pt-2">
                <button
                  onClick={onRequestAssessment}
                  className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Schedule Site Mechanical Survey</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectGalleryModal gallery={gallery} onClose={() => setGallery(null)} />
    </section>
  );
};
