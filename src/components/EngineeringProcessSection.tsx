import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { BUILTIN_REAL_MEDIA } from '../data/industrialData';

interface EngineeringProcessProps {
  onStartProject: () => void;
}

export const EngineeringProcessSection: React.FC<EngineeringProcessProps> = ({ onStartProject }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('engineering-process');

  const steps = [
    {
      step: '01',
      title: 'Consult',
      desc: "Understand the customer's core industrial problem, throughput objectives, and site constraints."
    },
    {
      step: '02',
      title: 'Assess',
      desc: 'Evaluate the raw material hardness, geology, moisture, bulk density, and available power parameters.'
    },
    {
      step: '03',
      title: 'Design',
      desc: 'Develop detailed 3D mechanical models, structural stress calculations, and manufacturing drawings.'
    },
    {
      step: '04',
      title: 'Fabricate',
      desc: `Cut, roll, weld, and machine heavy steel components at our ${cmsData.siteIdentity.location} industrial facility.`
    },
    {
      step: '05',
      title: 'Assemble',
      desc: 'Workshop trial fitment, bearing installation, drive alignment, and preliminary vibration/speed run testing.'
    },
    {
      step: '06',
      title: 'Install',
      desc: 'Site rigging, crane positioning, optical pulley alignment, and commissioning at customer site across Kenya.'
    },
    {
      step: '07',
      title: 'Support',
      desc: 'Continuous technical support, scheduled preventive maintenance, and rapid local spare-parts supply.'
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
            {section.kicker || 'How We Operate · Design → Fabricate → Install'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'FROM IDEA TO INDUSTRIAL SOLUTION'}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* 3-Step Core Visual Workflow (Design -> Fabricate -> Install) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: 'STAGE 01',
              title: 'DESIGN & CONSULTATION',
              desc: 'Site measurements, structural drawings, plate specifications, and transparent quotation.',
              image: BUILTIN_REAL_MEDIA.crusherStandChuteBay,
              caption: 'Dimensional Fabrication Layout · Fedha Road'
            },
            {
              num: 'STAGE 02',
              title: 'PRECISION FABRICATION',
              desc: `Cutting, forming, and certified heavy welding inside our ${cmsData.siteIdentity.location} workshop.`,
              image: BUILTIN_REAL_MEDIA.twinTankCompressorWeld,
              caption: 'Multi-Pass Welding & Pressure Frame Build'
            },
            {
              num: 'STAGE 03',
              title: 'DELIVERY & INSTALLATION',
              desc: 'On-time transport, crane rigging, site erection, and final safety inspection across Kenya.',
              image: BUILTIN_REAL_MEDIA.quarryFieldDelivery,
              caption: 'Remote Quarry & Site Crane Erection'
            }
          ].map((phase, i) => (
            <div
              key={phase.num}
              className="rounded-lg border overflow-hidden shadow-xs flex flex-col justify-between group hover:border-[var(--abu-accent)] transition-colors"
              style={{
                backgroundColor: 'var(--abu-surface)',
                borderColor: 'var(--abu-border)'
              }}
            >
              <div>
                <div className="aspect-[16/10] bg-[#0D1B2A] relative overflow-hidden">
                  <img
                    src={phase.image}
                    alt={`${phase.title} — ${cmsData.siteIdentity.shortName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[var(--abu-amber)]">
                      {phase.num}
                    </span>
                    <span className="text-[10px] font-mono text-white/90">{phase.caption}</span>
                  </div>
                </div>
                <div
                  className="p-5 border-t-2"
                  style={{ borderTopColor: i === 1 ? 'var(--abu-accent)' : '#0D1B2A' }}
                >
                  <h3 className="text-lg font-heading font-extrabold text-[var(--abu-text)] uppercase">
                    {phase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] mt-2 leading-relaxed">
                    {phase.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 7-Step Detailed Engineering Pipeline Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {steps.map((st, idx) => (
            <div
              key={st.step}
              className="border rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-[var(--abu-accent)] transition-colors group relative"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-mono font-bold text-[var(--abu-accent)]">{st.step}</span>
                  <span className="text-[10px] font-mono text-[var(--abu-text-muted)] uppercase">
                    Phase {idx + 1}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--abu-text)] uppercase mt-2 group-hover:text-[var(--abu-accent)] transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] mt-2 leading-relaxed">{st.desc}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[var(--abu-accent)] font-mono text-xs font-bold">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div
          className="p-6 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
        >
          <div>
            <div className="text-sm font-bold text-[var(--abu-text)] font-heading uppercase">
              Ready to start Step 01 with {cmsData.siteIdentity.shortName} engineers?
            </div>
            <div className="text-xs font-mono text-[var(--abu-text-muted)] mt-0.5">
              Discuss your structural steelwork or machinery project for an immediate review.
            </div>
          </div>
          <button
            onClick={onStartProject}
            className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
