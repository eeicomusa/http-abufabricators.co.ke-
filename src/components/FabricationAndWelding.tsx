import React from 'react';
import { ArrowRight, Hammer, Flame, CheckCircle2, Building2, Wrench, Layers } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface FabricationAndWeldingProps {
  onRequestFabricationQuote: () => void;
  onRequestWeldingQuote: () => void;
}

export const FabricationAndWelding: React.FC<FabricationAndWeldingProps> = ({
  onRequestFabricationQuote,
  onRequestWeldingQuote
}) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('fabrication');

  const coreServices = [
    {
      icon: Layers,
      title: 'Structural Steel Fabrication',
      desc: 'Beams, columns, trusses, frames, and complete structural systems engineered for strength and longevity.'
    },
    {
      icon: Hammer,
      title: 'Custom Metal Fabrication',
      desc: 'Tailored steel solutions designed and fabricated to your exact drawings, dimensions, and specifications.'
    },
    {
      icon: Flame,
      title: 'Industrial Welding Services',
      desc: 'High-quality welding for heavy structural joints, industrial frames, and demanding site applications.'
    },
    {
      icon: Building2,
      title: 'Steel Frameworks & Structures',
      desc: 'Warehouses, industrial buildings, equipment platforms, and commercial steelwork fabricated to spec.'
    },
    {
      icon: Wrench,
      title: 'Fabrication Support Services',
      desc: 'Complete end-to-end delivery from design consultation and workshop trials to on-site installation support.'
    }
  ];

  const weldingProcesses = [
    {
      title: 'MIG / MAG Welding',
      desc: 'High-deposition semi-automatic metal inert/active gas welding for structural frames, sheet steel and heavy trusses.'
    },
    {
      title: 'TIG Welding',
      desc: 'High-precision tungsten inert gas welding for stainless steel, food-grade hoppers, pressure pipe and critical alloy joints.'
    },
    {
      title: 'ARC / Stick (MMAW)',
      desc: 'Deep-penetration shielded metal arc welding ideal for heavy outdoor field installations and structural beams.'
    },
    {
      title: 'Structural Welding',
      desc: 'Heavy multi-pass welds on universal columns, equipment support towers, and seismic equipment skids.'
    },
    {
      title: 'Heavy-Duty Hardfacing',
      desc: 'Abrasion-resistant tungsten and high-chromium carbide weld overlays on excavator buckets, jaw teeth, and chutes.'
    },
    {
      title: 'Machine Repair Welding',
      desc: 'Specialized pre-heat gouging and stress-relieved crack repair for cast and forged heavy machinery frames.'
    },
    {
      title: 'High-Pressure Pipe Welding',
      desc: 'Full-penetration circumferential root and cap welding on industrial slurry lines, water mains, and air lines.'
    },
    {
      title: 'On-Site Mobile Welding',
      desc: 'Mobile diesel generator welding units dispatched directly to quarries, mines, and construction sites across Kenya.'
    },
    {
      title: 'Custom Welding & Fabrication',
      desc: `Built to your exact shop drawings or engineering blueprints at our ${cmsData.siteIdentity.location} workshop.`
    }
  ];

  return (
    <section
      id="fabrication"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Our Core Services */}
        <div>
          <div className="max-w-3xl mb-10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Quality, Safety & Reliability'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'Our Core Services'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">
              {section.body}
            </p>
          </div>

          {/* 5 Core Services Highlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {coreServices.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="border rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-[var(--abu-accent)] transition-colors shadow-sm"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded bg-white border border-[var(--abu-border)] flex items-center justify-center text-[var(--abu-accent)] shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-[var(--abu-text)] uppercase leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <button
                    onClick={onRequestFabricationQuote}
                    className="pt-3 border-t border-[var(--abu-border)] flex items-center justify-between text-[11px] font-mono font-bold text-[var(--abu-accent)] hover:text-[var(--abu-text)] transition-colors cursor-pointer uppercase"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* 3 Detailed Fabrication Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Structural Steel */}
            <div
              className="border rounded-lg p-6 flex flex-col justify-between space-y-4 hover:border-[var(--abu-accent)] transition-colors"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-white border border-[var(--abu-border)] flex items-center justify-center text-[var(--abu-accent)]">
                  <Hammer className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                  STRUCTURAL STEEL
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                  Engineered industrial infrastructure designed for extreme operational load capacity.
                </p>
                <ul className="space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Beams, Columns & Roof Trusses</li>
                  <li>• Warehouses & Commercial Steelwork</li>
                  <li>• Heavy Stairs & Safety Handrails</li>
                  <li>• Equipment Support Towers</li>
                  <li>• Machine Frames & Gantries</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[var(--abu-border)]">
                <button
                  onClick={onRequestFabricationQuote}
                  className="w-full py-2 bg-white hover:bg-[var(--abu-surface-alt)] text-[var(--abu-text)] border border-[var(--abu-border)] rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Steelwork Spec</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                </button>
              </div>
            </div>

            {/* Heavy Fabrication */}
            <div
              className="border rounded-lg p-6 flex flex-col justify-between space-y-4 hover:border-[var(--abu-accent)] transition-colors"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-white border border-[var(--abu-border)] flex items-center justify-center text-[var(--abu-accent)]">
                  <Hammer className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                  HEAVY FABRICATION
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                  Heavy-gauge plate fabrication engineered against abrasive rock flow and impact shock.
                </p>
                <ul className="space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Crusher Frames & Bases</li>
                  <li>• Dump Truck Receiving Hoppers</li>
                  <li>• Transfer Chutes & Deflectors</li>
                  <li>• Heavy Conveyor Trusses</li>
                  <li>• Complete Plant Frameworks</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[var(--abu-border)]">
                <button
                  onClick={onRequestFabricationQuote}
                  className="w-full py-2 bg-white hover:bg-[var(--abu-surface-alt)] text-[var(--abu-text)] border border-[var(--abu-border)] rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Request Heavy Plate Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                </button>
              </div>
            </div>

            {/* Custom Fabrication */}
            <div
              className="border rounded-lg p-6 flex flex-col justify-between space-y-4 hover:border-[var(--abu-accent)] transition-colors"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded bg-white border border-[var(--abu-border)] flex items-center justify-center text-[var(--abu-accent)]">
                  <Hammer className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                  CUSTOM FABRICATION
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                  Built according to customer drawings, measurements or engineering requirements.
                </p>
                <ul className="space-y-1.5 text-xs text-[var(--abu-text-muted)] font-mono">
                  <li>• Design Consultation & CAD Blueprints</li>
                  <li>• Precision Plasma/Oxy-Fuel Cutting</li>
                  <li>• Heavy Hydraulic Plate Pressing</li>
                  <li>• Pre-Assembly Trial Fitment</li>
                  <li>• Installation Support Across Kenya</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-[var(--abu-border)]">
                <button
                  onClick={onRequestFabricationQuote}
                  className="w-full py-2 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>GET A FREE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Industrial Welding Services */}
        <div className="pt-12 border-t border-[var(--abu-border)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                Workshop & On-Site Welding Services
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
                INDUSTRIAL WELDING SERVICES
              </h2>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                Welding is the structural backbone of every steel framework and industrial machine.
                Our experienced welders specialize in high-strength joint geometry, multi-pass full penetration,
                and hardfacing overlays designed to extend structural and component life.
              </p>
            </div>

            <div className="lg:col-span-5 flex lg:justify-end">
              <button
                onClick={onRequestWeldingQuote}
                className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Flame className="w-4 h-4" />
                <span>REQUEST WELDING ASSESSMENT</span>
              </button>
            </div>
          </div>

          {/* 9 Welding Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weldingProcesses.map((w, idx) => (
              <div
                key={idx}
                className="border rounded p-4 space-y-2 hover:border-[var(--abu-accent)] transition-colors"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                  <h4 className="text-sm font-heading font-bold text-[var(--abu-text)] uppercase">
                    {w.title}
                  </h4>
                </div>
                <p className="text-xs text-[var(--abu-text-muted)] font-sans leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Authentic Workshop & Site Steelwork Visuals Card */}
          <div
            className="mt-8 border rounded-lg p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)]">
                <img
                  src={section.imagePrimary || '/assets/aistudio/IMG-20261115-WA0025_6528335a.jpg'}
                  alt={`${cmsData.siteIdentity.companyName} Heavy Structural Welding in Progress`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)]">
                <img
                  src={section.imageSecondary || '/assets/aistudio/IMG-20261115-WA0022_75991aab.jpg'}
                  alt={`${cmsData.siteIdentity.companyName} Structural Steel Platform & Stairways`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                Welding &amp; Structural Erection Across Kenyan Industries
              </span>
              <h4 className="text-lg font-bold font-heading text-[var(--abu-text)] uppercase">
                Field &amp; Workshop Welding Applications
              </h4>
              <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                We deploy our welding capability across Construction, Warehousing, Mining, Quarrying,
                Manufacturing, Agriculture, Transport, Energy, and Water Infrastructure.
                Whether erecting warehouse trusses, structural access stairways, or fabricating heavy industrial hoppers,
                we ensure optimal pre-heat, joint root penetration, and quality inspection.
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[var(--abu-text-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)]" />
                <span>On-site mobile welding generator rigs dispatched from Fedha Road, Embakasi across Kenya.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
