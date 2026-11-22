import React from 'react';
import { Cog, Flame, HardHat, Hammer, Wrench } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const TrustBar: React.FC = () => {
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;

  const pillars = [
    {
      title: 'STRUCTURAL STEEL',
      desc: 'Beams, columns, trusses, frames & complete systems.',
      icon: Hammer
    },
    {
      title: 'CUSTOM FABRICATION',
      desc: 'Tailored steelwork engineered to exact specs.',
      icon: Cog
    },
    {
      title: 'INDUSTRIAL WELDING',
      desc: 'Certified high-strength structural & field welding.',
      icon: Flame
    },
    {
      title: 'STEEL FRAMEWORKS',
      desc: 'Warehouses, industrial & commercial structures.',
      icon: HardHat
    },
    {
      title: 'SUPPORT & MACHINERY',
      desc: 'Design consultation, installation & plant systems.',
      icon: Wrench
    }
  ];

  const metrics = [
    {
      value: 'DESIGN · FABRICATE · INSTALL',
      label: 'End-to-End Turnkey Execution'
    },
    {
      value: 'FEDHA RD, EMBAKASI',
      label: 'Equipped Nairobi Fabrication Workshop'
    },
    {
      value: 'KENYA & EAST AFRICA',
      label: 'On-Site Erection & Mobile Welding Teams'
    },
    {
      value: siteIdentity.phoneDisplay,
      label: 'Direct Engineering Line & WhatsApp Quotes'
    }
  ];

  return (
    <section
      className="border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      {/* Authority Capability Metrics Strip */}
      <div className="bg-[#0D1B2A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
            {metrics.map((m, i) => (
              <div key={i} className={`pt-3 sm:pt-0 ${i !== 0 ? 'sm:pl-5' : ''}`}>
                <div className="text-sm font-heading font-extrabold tracking-wide text-[var(--abu-amber)] uppercase">
                  {m.value}
                </div>
                <div className="text-[11px] font-mono text-slate-300 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 Core Capabilities Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[var(--abu-border)]">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`pt-4 sm:pt-0 ${idx !== 0 ? 'sm:pl-6' : ''} flex flex-col justify-start space-y-1.5`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                  <span className="font-heading font-bold text-sm tracking-wide text-[var(--abu-text)] uppercase">
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
