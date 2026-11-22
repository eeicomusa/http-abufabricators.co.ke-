import React from 'react';
import { ArrowRight, Cog, Hammer, Wrench } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface OnePartnerProps {
  onNavigateDivision: (division: string) => void;
  onOpenQuote: () => void;
}

export const OnePartnerSection: React.FC<OnePartnerProps> = ({
  onNavigateDivision,
  onOpenQuote
}) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('one-partner');

  return (
    <section
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold mb-2">
              {section.kicker} · {cmsData.siteIdentity.location}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline}
            </h2>
          </div>
          <div className="text-left md:text-right">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center gap-2 px-5 py-3 border rounded font-heading font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer hover:border-[var(--abu-accent)]"
              style={{
                backgroundColor: 'var(--abu-surface)',
                borderColor: 'var(--abu-border)',
                color: 'var(--abu-text)'
              }}
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4 text-[var(--abu-accent)]" />
            </button>
          </div>
        </div>

        {/* 3 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {/* Card 1: Machinery */}
          <div
            className="border rounded-lg overflow-hidden flex flex-col group hover:border-[var(--abu-accent)] transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1B2A]">
              <img
                src="/assets/aistudio/IMG-20261115-WA0008_9b9e602c.jpg"
                alt={`Industrial Machinery Design and Supply by ${cmsData.siteIdentity.shortName}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-white/95 rounded border border-[var(--abu-border)] shadow-sm">
                <Cog className="w-5 h-5 text-[var(--abu-accent)]" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase tracking-wide">
                  MACHINERY
                </h3>
                <p className="mt-2 text-sm text-[var(--abu-text-muted)] leading-relaxed">
                  Design, manufacture and supply practical machinery for industrial applications.
                  From primary jaw crushers and screens to conveyors and automated feed systems.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Crushing & Quarry Plants</li>
                  <li>• Heavy Vibrating Screens</li>
                  <li>• Material Handling Conveyors</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateDivision('machinery')}
                className="pt-4 border-t border-[var(--abu-border)] flex items-center justify-between text-xs font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] transition-colors cursor-pointer uppercase"
              >
                <span>View Machinery Range</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Fabrication */}
          <div
            className="border rounded-lg overflow-hidden flex flex-col group hover:border-[var(--abu-accent)] transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1B2A]">
              <img
                src="/assets/aistudio/IMG-20261115-WA0015_9196c273.jpg"
                alt="Structural Steel and Industrial Fabrication Workshop"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-white/95 rounded border border-[var(--abu-border)] shadow-sm">
                <Hammer className="w-5 h-5 text-[var(--abu-accent)]" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase tracking-wide">
                  FABRICATION
                </h3>
                <p className="mt-2 text-sm text-[var(--abu-text-muted)] leading-relaxed">
                  Structural steel beams, columns, trusses, industrial frameworks, dump truck hoppers,
                  transfer chutes, and custom metal fabrication tailored to your specifications.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Structural Steel Frameworks</li>
                  <li>• Custom Metal Fabrication</li>
                  <li>• Industrial & Structural Welding</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateDivision('fabrication')}
                className="pt-4 border-t border-[var(--abu-border)] flex items-center justify-between text-xs font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] transition-colors cursor-pointer uppercase"
              >
                <span>Explore Core Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 3: Services */}
          <div
            className="border rounded-lg overflow-hidden flex flex-col group hover:border-[var(--abu-accent)] transition-colors shadow-sm"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1B2A]">
              <img
                src="/assets/aistudio/IMG-20261115-WA0022_75991aab.jpg"
                alt="Installation, Maintenance and Structural Erection Services"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 p-2 bg-white/95 rounded border border-[var(--abu-border)] shadow-sm">
                <Wrench className="w-5 h-5 text-[var(--abu-accent)]" />
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase tracking-wide">
                  SERVICES
                </h3>
                <p className="mt-2 text-sm text-[var(--abu-text-muted)] leading-relaxed">
                  From design consultation to installation support, maintenance, repair, and technical
                  assistance—keeping projects moving on schedule across Kenya.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Design & Installation Support</li>
                  <li>• Machine Refurbishment</li>
                  <li>• Wear Parts & Maintenance Plans</li>
                </ul>
              </div>
              <button
                onClick={() => onNavigateDivision('maintenance')}
                className="pt-4 border-t border-[var(--abu-border)] flex items-center justify-between text-xs font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] transition-colors cursor-pointer uppercase"
              >
                <span>Maintenance & Repairs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Central Philosophy & Founder Leadership Banner */}
        <div
          className="mt-12 p-6 sm:p-10 border rounded-lg relative overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-accent)' }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none opacity-10"
            style={{ background: 'linear-gradient(to left, var(--abu-accent), transparent)' }}
          />
          <div className="lg:col-span-8 relative z-10 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              Core Engineering Philosophy &amp; Leadership
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              WE DON'T JUST SELL STEELWORK. WE ENGINEER SOLUTIONS.
            </h3>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">
              {section.body}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateDivision('about')}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[var(--abu-accent)] hover:text-[var(--abu-text)] cursor-pointer transition-colors"
              >
                <span>Read Founder Story &amp; Company History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-4 relative z-10 p-3 border rounded-lg flex items-center gap-4 shadow-xs"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <img
              src={cmsData.founder.photoUrl || '/assets/aistudio/Owner_602b7a0a.jpg'}
              alt={cmsData.founder.name}
              className="w-20 h-24 object-cover rounded border border-[var(--abu-border)] shrink-0 bg-[#0D1B2A]"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 space-y-1">
              <div className="text-[10px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                FOUNDER
              </div>
              <div className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase leading-tight">
                {cmsData.founder.name}
              </div>
              <p className="text-[11px] text-[var(--abu-text-muted)] line-clamp-2">
                {cmsData.founder.experienceYears}
              </p>
              <button
                onClick={() => onNavigateDivision('about')}
                className="text-[11px] font-mono font-bold text-[var(--abu-accent)] hover:underline cursor-pointer"
              >
                Full Profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
