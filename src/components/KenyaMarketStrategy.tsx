import React from 'react';
import { MapPin, ShieldCheck, Zap, Truck, Clock } from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const KenyaMarketStrategy: React.FC = () => {
  const { cmsData, getSection } = useCms();
  const section = getSection('kenya-strategy');

  const advantages = [
    {
      icon: Clock,
      title: "Eliminate 12-Week Import Delays",
      desc: `Importing heavy machinery or replacement parts from Europe or Asia via Mombasa Port often involves multi-month delays, demurrage, and customs red tape. ${cmsData.siteIdentity.companyName} fabricates and services locally in ${cmsData.siteIdentity.location}.`
    },
    {
      icon: ShieldCheck,
      title: "Engineered for Tough Kenyan Conditions",
      desc: "East African structural and industrial demands—including heavy commercial warehousing, hard rock processing, and site construction—require reinforced steel frames and certified welding joints built to handle continuous loads."
    },
    {
      icon: Zap,
      title: "Grid & Diesel Power Optimization",
      desc: "We design drive packages and industrial installations that match Kenyan three-phase supply requirements and industrial diesel gen-sets, preventing nuisance tripping and minimizing downtime."
    },
    {
      icon: Truck,
      title: "Direct Transport to Project Sites",
      desc: "Whether your site is within Nairobi, Embakasi, Machakos, Nakuru, or across East Africa, our steelwork and equipment are fabricated in transport-ready modular sections compliant with KeNHA highway standards."
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
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--abu-accent)]" />
            <span>{section.kicker || 'The Kenyan Operational Advantage'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || `ENGINEERED LOCALLY IN ${cmsData.siteIdentity.location.toUpperCase()}.`}
            <span className="block text-[var(--abu-accent)]">BUILT FOR EAST AFRICAN CONDITIONS.</span>
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">
            {section.body}
          </p>
        </div>

        {/* 4 Core Local Engineering Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-6 border rounded-lg space-y-3 hover:border-[var(--abu-accent)]/50 transition-colors shadow-xs"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div
                  className="w-10 h-10 rounded border flex items-center justify-center text-[var(--abu-accent)]"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] leading-relaxed font-sans">
                  {adv.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Strategic Comparison Box */}
        <div
          className="border rounded-lg p-6 sm:p-8 shadow-xs"
          style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
        >
          <div className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold mb-4">
            Direct Comparison: Local Engineering vs. Unsupported Foreign Imports
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: 'var(--abu-border)' }}
          >
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-base text-red-600 uppercase">
                Risks of Unsupported Foreign Imports
              </h4>
              <ul className="space-y-2 text-[var(--abu-text-muted)] font-mono">
                <li>• 8 – 14 weeks shipping delays for replacement parts or structural sections</li>
                <li>• Generic light-gauge frames cracking under heavy Kenyan site loads</li>
                <li>• Zero local warranty or on-site welding technicians available in Kenya</li>
                <li>• Foreign currency exchange risk and high customs clearance surcharges</li>
              </ul>
            </div>

            <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
              <h4 className="font-heading font-bold text-base text-emerald-700 uppercase">
                The {cmsData.siteIdentity.shortName} Local Advantage
              </h4>
              <ul className="space-y-2 text-[var(--abu-text)] font-mono">
                <li>• Direct access to engineering workshop on {cmsData.siteIdentity.address}</li>
                <li>• Heavy structural steel plate (12mm–25mm) customized to project loads</li>
                <li>• Rapid on-site welding and installation technicians dispatched across Kenya</li>
                <li>• Locally fabricated structural frames, hoppers, chutes, and industrial parts</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
