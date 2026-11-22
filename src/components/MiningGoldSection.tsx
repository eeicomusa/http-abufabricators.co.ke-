import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { GOLD_MINING_STEPS, GENERATED_MEDIA } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

interface MiningGoldProps {
  onDiscussMiningProject: () => void;
}

export const MiningGoldSection: React.FC<MiningGoldProps> = ({ onDiscussMiningProject }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('mining-solutions');

  return (
    <section
      id="mining-solutions"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Extractive Metallurgical Solutions'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'MINING & GOLD-PROCESSING SOLUTIONS'}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* 6-Step Visual Comminution Workflow */}
        <div
          className="border rounded-lg p-6 sm:p-8 space-y-8 shadow-sm"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          <div className="text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold">
            Mineral Liberation Process Flowsheet:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
            {GOLD_MINING_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="border rounded p-4 flex flex-col justify-between space-y-3 relative group hover:border-[var(--abu-accent)] transition-colors"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
              >
                <div>
                  <div className="text-[10px] font-mono text-[var(--abu-accent)] font-bold">
                    STAGE {step.step}
                  </div>
                  <h4 className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase mt-1">
                    {step.name}
                  </h4>
                  <p className="text-xs text-[var(--abu-text-muted)] mt-2 leading-relaxed">{step.desc}</p>
                </div>
                {idx < GOLD_MINING_STEPS.length - 1 && (
                  <div className="text-right text-[var(--abu-text-muted)] font-mono text-xs hidden lg:block">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Plant Showcase & Equipment Inventory */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 border-t"
            style={{ borderColor: 'var(--abu-border)' }}
          >
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded overflow-hidden bg-[#0D1B2A] aspect-[4/3] border border-[var(--abu-border)] relative">
                <img
                  src={section.imagePrimary || GENERATED_MEDIA.miningBallMill}
                  alt={`Continuous Mineral Grinding Mill and Gravity Recovery System by ${cmsData.siteIdentity.companyName}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white">
                  {cmsData.siteIdentity.shortName} · Continuous Ball Mill &amp; Slurry Comminution
                </div>
              </div>

              <div className="rounded overflow-hidden bg-[#0D1B2A] aspect-[16/9] border border-[var(--abu-border)] relative">
                <img
                  src={section.imageSecondary || GENERATED_MEDIA.goldProcessingTrommel}
                  alt={`Rotary Trommel Washing Plant and CIP CIL Steel Leach Tanks by ${cmsData.siteIdentity.companyName}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white">
                  Rotary Trommel Scrubber &amp; CIP/CIL Tank Structural Circuit
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Mechanized Comminution & Gravity Systems
              </h3>

              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                By replacing inefficient manual crushing with continuous jaw breakers, wet ball mills, and
                centrifugal concentrators, operations increase throughput while eliminating hazardous manual tasks.
              </p>

              {/* Potential Equipment List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono text-[var(--abu-text)]">
                {[
                  'Primary Jaw Breakers',
                  'Heavy Hammer Mills',
                  'Continuous Ball Mills',
                  'Rotary Trommels',
                  'Gravity Sluice Frames',
                  'Custom Plant Structures'
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 p-2 rounded border"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Responsible statement callout */}
              <div
                className="p-3 border rounded flex items-start gap-2.5 text-xs text-[var(--abu-text-muted)]"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-amber)' }}
              >
                <ShieldAlert className="w-4 h-4 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                <p className="font-mono text-[11px] leading-relaxed">
                  Responsible mining advisory: Mineral recovery rates and economic returns depend strictly on unique
                  ore geology, head grade, and mineralogical liberation characteristics.{' '}
                  {cmsData.siteIdentity.companyName} provides heavy mechanical comminution and handling
                  infrastructure; we do not guarantee specific assay yields or financial recovery percentages.
                </p>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={onDiscussMiningProject}
                  className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>DISCUSS YOUR MINING PROJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
