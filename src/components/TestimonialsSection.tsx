import React from 'react';
import { MapPin, Star, Award, ShieldCheck, CheckCircle2, Pencil } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const TestimonialsSection: React.FC = () => {
  const { cmsData, getSection, isEditorOpen, openWithTab } = useCms();
  const { testimonials, partners, companyMetrics } = cmsData;
  const section = getSection('testimonials');

  const metricCards = [
    { label: 'National Footprint', value: companyMetrics.countiesServed },
    { label: 'Delivered Projects', value: companyMetrics.completedProjectsCount },
    { label: 'Schedule Track Record', value: companyMetrics.onTimeDeliveryRate },
    { label: 'Structural Guarantee', value: companyMetrics.warrantyPeriod }
  ];

  return (
    <section
      id="testimonials"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Verified Kenyan Track Record'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">
              {section.body}
            </p>
          </div>

          {isEditorOpen && (
            <button
              type="button"
              onClick={() => openWithTab('catalog')}
              className="px-4 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Reviews &amp; Counters (CMS)</span>
            </button>
          )}
        </div>

        {/* 4 Completed Counties / Track Record Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metricCards.map((m, idx) => (
            <div
              key={idx}
              className="p-5 border rounded-lg shadow-xs relative overflow-hidden"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div
                className="w-1 absolute left-0 top-0 bottom-0"
                style={{ backgroundColor: 'var(--abu-accent)' }}
              />
              <div className="text-[11px] font-mono uppercase text-[var(--abu-text-muted)] font-bold">
                {m.label}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-1">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Client Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 border rounded-lg flex flex-col justify-between space-y-4 shadow-xs hover:border-[var(--abu-accent)] transition-colors"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 text-[var(--abu-amber)]">
                    {Array.from({ length: Math.max(1, Math.min(5, t.rating || 5)) }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--abu-text)] bg-[var(--abu-surface)] px-2.5 py-1 rounded border border-[var(--abu-border)]">
                    <MapPin className="w-3 h-3 text-[var(--abu-accent)]" />
                    <span>{t.county}</span>
                  </span>
                </div>

                <p className="text-sm text-[var(--abu-text)] leading-relaxed italic">
                  “{t.quote}”
                </p>
              </div>

              <div
                className="pt-4 border-t flex flex-wrap items-center justify-between gap-2"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                <div>
                  <div className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase">
                    {t.clientName}
                  </div>
                  <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                    {t.roleOrCompany}
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  {t.projectType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Contractor Trust & Engineering Standards Strip */}
        <div
          className="p-6 border rounded-lg space-y-4"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--abu-text-muted)] font-bold">
            <Award className="w-4 h-4 text-[var(--abu-accent)]" />
            <span>Contractor Standards &amp; Industry Sectors Served</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {partners.map((p) => (
              <div
                key={p.id}
                className="p-3.5 border rounded flex items-start gap-2.5"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                {p.name.toLowerCase().includes('nca') || p.name.toLowerCase().includes('kebs') ? (
                  <ShieldCheck className="w-4 h-4 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-heading font-bold text-[var(--abu-text)] uppercase leading-tight">
                    {p.name}
                  </div>
                  <div className="text-[10px] font-mono text-[var(--abu-text-muted)] mt-0.5">
                    {p.sector}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
