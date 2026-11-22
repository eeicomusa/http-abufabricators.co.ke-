import React from 'react';
import { ArrowRight, Box } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { GENERATED_MEDIA } from '../data/industrialData';

interface ConveyorsProps {
  onRequestConveyorQuote: () => void;
}

export const ConveyorsSection: React.FC<ConveyorsProps> = ({ onRequestConveyorQuote }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('conveyors');

  const conveyorUnits = [
    {
      title: 'Lattice Truss Belt Conveyors',
      desc: 'Deep rigid structural steel lattice trusses allowing long spans between bents, ideal for quarry stockpiles and overland ore transfers.'
    },
    {
      title: 'Channel Frame Conveyors',
      desc: 'Low-profile heavy channel steel conveyor beds designed for compact factory processing lines and crusher inter-connections.'
    },
    {
      title: 'Screw Conveyors (Augers)',
      desc: 'Enclosed tubular or U-trough screw flighting for conveying bulk powders, cement, grain, and mineral fines without dust leakage.'
    },
    {
      title: 'Heavy Receiving Hoppers',
      desc: 'Reinforced 12mm–20mm thick steel dump hoppers with manganese wear liner plates engineered for direct tipper truck dumping.'
    },
    {
      title: 'Rock-Box Transfer Chutes',
      desc: 'Stone-on-stone dead bed chutes that utilize the material itself to absorb impact, drastically reducing steel wear.'
    },
    {
      title: 'Radial & Telescopic Stackers',
      desc: 'Mobile or fixed radial pivot conveyors that generate vast semi-circular stockpiles, cutting wheel loader operating hours.'
    }
  ];

  return (
    <section
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Bulk Material Handling Systems'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'MOVE MATERIAL. IMPROVE PRODUCTION.'}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* Visual Showcase + Capability Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 rounded overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)] relative">
            <img
              src={section.imagePrimary || GENERATED_MEDIA.conveyorGantry}
              alt={`Heavy Duty Industrial Conveyor System by ${cmsData.siteIdentity.companyName}`}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white">
              {cmsData.siteIdentity.shortName} · Structural Truss Belt Conveyor & Transfer Chute Network
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conveyorUnits.map((u, i) => (
              <div
                key={i}
                className="p-4 border rounded space-y-2 hover:border-[var(--abu-accent)] transition-colors"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                  <h4 className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase">{u.title}</h4>
                </div>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Applications Callout & CTA */}
        <div
          className="border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
              Industries Served by Our Conveyors:
            </div>
            <div className="text-sm font-semibold text-[var(--abu-text)]">
              Mining · Quarrying · Manufacturing · Agriculture · Recycling · Construction
            </div>
          </div>
          <button
            onClick={onRequestConveyorQuote}
            className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>REQUEST CONVEYOR QUOTATION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
