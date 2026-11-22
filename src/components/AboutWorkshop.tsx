import React from 'react';
import { MapPin, ShieldCheck, Phone, Download } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BUILTIN_REAL_MEDIA } from '../data/industrialData';
import { generateCompanyProfilePdf } from '../utils/pdfGenerator';

export const AboutWorkshop: React.FC = () => {
  const { cmsData, getSection } = useCms();
  const { siteIdentity } = cmsData;
  const section = getSection('about');

  return (
    <section
      id="about"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker} · {siteIdentity.location}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'About ABU Fabricators'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">
              {section.body}
            </p>
          </div>

          <button
            type="button"
            onClick={() => generateCompanyProfilePdf(cmsData, true)}
            className="px-5 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded-md font-heading font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Company Profile PDF</span>
          </button>
        </div>

        {/* 2-Column Story / Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                WHO WE ARE
              </span>
              <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Precision Metalwork &amp; Structural Steel Solutions
              </h3>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                {siteIdentity.companyName} is a Kenyan steel fabrication company committed to delivering
                precision metalwork and industrial solutions.
              </p>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                Our skilled team specializes in structural steel fabrication, custom welding, and the
                production of durable steel structures for construction, industrial, and commercial projects.
                Every project is handled with a strong focus on quality, safety, and reliability.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[var(--abu-border)]">
              <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                WHERE WE ARE LOCATED
              </span>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                We are proudly based on {siteIdentity.address}, where we serve clients across Nairobi and
                all 47 counties of Kenya.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[var(--abu-border)]">
              <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                OUR ENGINEERING PHILOSOPHY
              </span>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                At {siteIdentity.shortName}, we believe in building strong foundations — both in the
                structures we create and in the relationships we maintain with our clients.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div
              className="border rounded-lg p-6 space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[var(--abu-accent)]" />
                <h4 className="font-heading font-bold text-lg text-[var(--abu-text)] uppercase">
                  Location &amp; Facilities
                </h4>
              </div>
              <div className="text-xs font-mono text-[var(--abu-text-muted)] space-y-2.5">
                <div>
                  <span className="opacity-70 block uppercase text-[10px]">Company Name:</span>
                  <span className="text-[var(--abu-text)] font-bold">{siteIdentity.companyName}</span>
                </div>
                <div>
                  <span className="opacity-70 block uppercase text-[10px]">Primary Workshop:</span>
                  <span className="text-[var(--abu-text)] font-semibold">{siteIdentity.address}</span>
                </div>
                <div>
                  <span className="opacity-70 block uppercase text-[10px]">Direct Phone / WhatsApp:</span>
                  <a
                    href={`tel:${siteIdentity.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 text-[var(--abu-accent)] font-bold hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{siteIdentity.phoneDisplay}</span>
                  </a>
                </div>
                <div>
                  <span className="opacity-70 block uppercase text-[10px]">Service Area:</span>
                  <span className="text-[var(--abu-text)]">{siteIdentity.coverage}</span>
                </div>
                <div>
                  <span className="opacity-70 block uppercase text-[10px]">Working Hours:</span>
                  <span className="text-[var(--abu-text)]">{siteIdentity.workingHours}</span>
                </div>
              </div>
            </div>

            <div
              className="border rounded-lg p-6 space-y-3"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                OUR COMMITMENT TO QUALITY
              </span>
              <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed font-sans">
                As Kenya accelerates infrastructure construction, commercial warehousing, mining value
                addition, and industrial manufacturing, {siteIdentity.shortName} continuously expands
                local fabrication capacity to build dependable structures and systems on schedule.
              </p>
            </div>
          </div>
        </div>

        {/* Field Proof Showcase Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              src: BUILTIN_REAL_MEDIA.landingBackground,
              tag: 'QUARRY PRODUCTION',
              title: 'Diesel Jaw Crusher & Screen Operating On-Site'
            },
            {
              src: BUILTIN_REAL_MEDIA.structuralBatchingTower,
              tag: 'CIVIL STEELWORK',
              title: 'Elevated Access Stairs & Batching Plant Erection'
            },
            {
              src: BUILTIN_REAL_MEDIA.quarryFieldDelivery,
              tag: 'NATIONWIDE DELIVERY',
              title: 'Remote County Crane Truck Offloading & Commissioning'
            }
          ].map((photo) => (
            <div
              key={photo.tag}
              className="rounded-lg overflow-hidden aspect-[16/10] bg-[#0D1B2A] border border-[var(--abu-border)] relative shadow-xs group"
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                  {photo.tag}
                </div>
                <div className="text-xs font-heading font-bold text-white uppercase leading-tight">
                  {photo.title}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quality & Safety Section */}
        <div className="pt-8 border-t border-[var(--abu-border)]">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)]" />
              <span>Safety &amp; Quality Management</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase">
              BUILT WITH QUALITY AND SAFETY IN MIND
            </h3>
            <p className="text-xs sm:text-sm text-[var(--abu-text-muted)]">
              Rigorous inspection protocols govern every structure and component leaving our Embakasi workshop.
              We prioritize mechanical safety, structural integrity, and on-time delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Material Inspection',
                desc: 'Verification of raw steel grades, plate thickness micrometer checks, and structural alignment.'
              },
              {
                title: 'Dimensional Inspection',
                desc: 'Precision diagonal measurements, shaft runout dial indicators, and bolt hole pitch tolerance verification.'
              },
              {
                title: 'Welding Quality',
                desc: 'Joint bevel preparation, strict slag removal, crack inspection, and controlled interpass cooling.'
              },
              {
                title: 'Equipment Testing',
                desc: 'Dry-run testing monitoring bearing thermal rise, drive belt alignment, and vibration amplitudes.'
              }
            ].map((q, idx) => (
              <div
                key={idx}
                className="p-4 border rounded space-y-2"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="text-sm font-heading font-bold uppercase text-[var(--abu-accent)]">
                  {q.title}
                </div>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed font-sans">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
