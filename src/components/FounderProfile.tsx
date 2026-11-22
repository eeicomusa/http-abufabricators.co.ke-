import React from 'react';
import { Award, CheckCircle2, Cog, MapPin, Pencil, Quote, ShieldCheck, Wrench } from 'lucide-react';
import { useCms } from '../context/CmsContext';

const CREDENTIAL_PILLARS = [
  {
    icon: Award,
    label: 'Qualification',
    value: 'Certified Mechanical & Automotive Engineer'
  },
  {
    icon: Cog,
    label: 'Industry Sectors',
    value: 'Mining, Manufacturing, Production & Agricultural Machinery'
  },
  {
    icon: Wrench,
    label: 'Field & Workshop Scope',
    value: 'Assembly, Installation, Diagnostics, Overhauls & Maintenance'
  },
  {
    icon: ShieldCheck,
    label: 'Fabrication Standards',
    value: 'Structural Steelwork, Welding & Mechanical Frameworks'
  }
];

export const FounderProfile: React.FC = () => {
  const { cmsData, isEditorOpen, openWithTab, resolveMediaUrl } = useCms();
  const { siteIdentity, founder } = cmsData;
  const resolvedPhoto = resolveMediaUrl(founder.photoUrl || '/assets/aistudio/Owner_602b7a0a.jpg');

  return (
    <section
      id="founder-profile"
      className="py-16 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              Leadership &amp; Engineering Credentials · {siteIdentity.shortName}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              Meet Our Founder &amp; Lead Engineer
            </h2>
          </div>

          {isEditorOpen && (
            <button
              type="button"
              onClick={() => openWithTab('identity')}
              className="self-start md:self-auto px-3 py-1.5 rounded bg-[#ff6200] hover:bg-[#e05600] text-white text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Founder Bio &amp; Photo</span>
            </button>
          )}
        </div>

        {/* Main Founder Profile Card */}
        <div
          className="border rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          {/* Left Portrait Column */}
          <div className="lg:col-span-5 relative bg-[#0D1B2A] min-h-[360px] lg:min-h-[480px]">
            <img
              src={resolvedPhoto}
              alt={`${founder.name} — ${siteIdentity.companyName}`}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-5 left-5 right-5 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                <Award className="w-3.5 h-3.5" />
                <span>{founder.experienceYears}</span>
              </div>
              <div className="text-xl font-heading font-bold text-white uppercase leading-tight">
                {founder.name}
              </div>
              <div className="text-xs text-slate-200 font-mono leading-snug">{founder.role}</div>
            </div>
          </div>

          {/* Right Biography & Credentials Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Credentials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CREDENTIAL_PILLARS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="p-3 rounded-lg border flex items-start gap-2.5"
                      style={{
                        backgroundColor: 'var(--abu-bg)',
                        borderColor: 'var(--abu-border)'
                      }}
                    >
                      <Icon className="w-4 h-4 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--abu-accent)] font-bold">
                          {item.label}
                        </div>
                        <div className="text-xs font-semibold text-[var(--abu-text)] leading-snug">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <blockquote
                className="p-4 border-l-4 rounded-r text-sm sm:text-base italic text-[var(--abu-text)] font-medium leading-relaxed"
                style={{
                  backgroundColor: 'var(--abu-bg)',
                  borderLeftColor: 'var(--abu-accent)'
                }}
              >
                <Quote className="w-4 h-4 text-[var(--abu-accent)] mb-1 inline mr-1.5" />
                {founder.quote}
              </blockquote>

              {/* Full Professional Background */}
              <div className="space-y-3 text-sm text-[var(--abu-text-muted)] leading-relaxed">
                <p>{founder.bioParagraph1}</p>
                <p>{founder.bioParagraph2}</p>
                {founder.bioParagraph3 && <p>{founder.bioParagraph3}</p>}
              </div>

              {/* Key Competencies Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '10+ Years Experience',
                  'Mechanical & Automotive Engineering',
                  'Heavy Machinery Overhauls',
                  'Structural Steelwork & Welding',
                  'Preventive & Corrective Maintenance'
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium border text-[var(--abu-text)]"
                    style={{
                      backgroundColor: 'var(--abu-bg)',
                      borderColor: 'var(--abu-border)'
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-[var(--abu-accent)] shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            <div
              className="pt-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--abu-text-muted)]"
              style={{ borderColor: 'var(--abu-border)' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                <span>{siteIdentity.address}</span>
              </span>
              <span className="text-[var(--abu-accent)] font-bold">{founder.milestoneNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
