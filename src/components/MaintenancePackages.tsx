import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface MaintenanceProps {
  onSelectTier: (tierName: string) => void;
}

export const MaintenancePackages: React.FC<MaintenanceProps> = ({ onSelectTier }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('maintenance-packages');

  return (
    <section
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Asset Reliability & Continuous Production'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'PROTECT YOUR PRODUCTION'}
          </h2>
          <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* 3 Maintenance Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cmsData.maintenanceTiers.map((tier) => {
            const isPopular = tier.id === 'standard';
            return (
              <div
                key={tier.id}
                className={`border rounded-lg p-6 sm:p-8 flex flex-col justify-between relative transition-all shadow-sm ${
                  isPopular ? 'ring-1 ring-[var(--abu-accent)]' : 'hover:border-[var(--abu-accent)]'
                }`}
                style={{
                  backgroundColor: 'var(--abu-bg)',
                  borderColor: isPopular ? 'var(--abu-accent)' : 'var(--abu-border)'
                }}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded">
                    Most Popular for Quarries
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--abu-text-muted)]">
                      {tier.recommendedInterval}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase mt-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[var(--abu-accent)] font-mono font-semibold mt-0.5">
                      {tier.tagline}
                    </p>
                  </div>

                  <div
                    className="text-xs text-[var(--abu-text-muted)] border-y py-3"
                    style={{ borderColor: 'var(--abu-border)' }}
                  >
                    <span className="opacity-75 font-mono block text-[11px] uppercase">Recommended For:</span>
                    <div className="font-semibold text-[var(--abu-text)] mt-0.5">{tier.suitableFor}</div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono uppercase text-[var(--abu-text-muted)] font-bold">
                      Program Inclusions:
                    </div>
                    <ul className="space-y-2 text-xs text-[var(--abu-text-muted)]">
                      {tier.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t" style={{ borderColor: 'var(--abu-border)' }}>
                  <button
                    onClick={() => onSelectTier(tier.name)}
                    className={`w-full py-3 rounded text-xs font-heading font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white'
                        : 'bg-[#0D1B2A] hover:bg-[#16293f] text-white'
                    }`}
                  >
                    <span>ENQUIRE FOR {tier.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center text-xs font-mono text-[var(--abu-text-muted)] italic">
          * Service response schedules from {cmsData.siteIdentity.location} are customized according to site
          geographical location and road accessibility across Kenya.
        </div>
      </div>
    </section>
  );
};
