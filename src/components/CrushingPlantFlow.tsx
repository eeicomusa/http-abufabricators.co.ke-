import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { COMPLETE_CRUSHING_STEPS, GENERATED_MEDIA } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

interface CrushingPlantFlowProps {
  onPlanPlantConsultation: () => void;
}

export const CrushingPlantFlow: React.FC<CrushingPlantFlowProps> = ({ onPlanPlantConsultation }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('crushing-flow');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(2);

  const activeStep = COMPLETE_CRUSHING_STEPS[activeStepIndex];

  return (
    <section
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Complete Crushing Plant Engineering'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'FROM RAW ROCK TO FINAL PRODUCT'}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* Process Flow Interactive Stepper */}
        <div
          className="border rounded-lg p-6 sm:p-8 space-y-8 shadow-sm"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          {/* Stepper Navigation Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {COMPLETE_CRUSHING_STEPS.map((step, idx) => {
              const isCurrent = activeStepIndex === idx;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded text-left transition-all border cursor-pointer relative ${
                    isCurrent
                      ? 'border-[var(--abu-accent)] shadow-sm'
                      : 'hover:border-[var(--abu-accent)]/60'
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? 'color-mix(in srgb, var(--abu-accent) 10%, var(--abu-bg))'
                      : 'var(--abu-surface)',
                    borderColor: isCurrent ? 'var(--abu-accent)' : 'var(--abu-border)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--abu-accent)] font-bold">
                      {step.step}
                    </span>
                    {idx < COMPLETE_CRUSHING_STEPS.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-[var(--abu-text-muted)] hidden lg:block" />
                    )}
                  </div>
                  <div className="text-xs font-heading font-bold text-[var(--abu-text)] uppercase mt-1 truncate">
                    {step.name}
                  </div>
                  <div className="text-[10px] text-[var(--abu-text-muted)] truncate">{step.subtitle}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Presentation Card */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border rounded-lg p-6 sm:p-8"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase bg-[var(--abu-accent)] text-white px-2 py-0.5 rounded font-bold">
                  Step {activeStep.step} in Crushing Circuit
                </span>
                <span className="text-xs font-mono text-[var(--abu-text-muted)]">{activeStep.subtitle}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase">
                {activeStep.name}
              </h3>

              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">{activeStep.description}</p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold">
                  System Integration Value:
                </div>
                <div className="flex flex-col sm:flex-row gap-3 text-xs text-[var(--abu-text)]">
                  <div
                    className="flex items-center gap-2 p-2.5 rounded border flex-1"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                    <span>Eliminates inter-stage material surges</span>
                  </div>
                  <div
                    className="flex items-center gap-2 p-2.5 rounded border flex-1"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                    <span>Reduces specific power kW/tonne</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={onPlanPlantConsultation}
                  className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Request Full Plant Flowsheet Design</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Process Diagram / Graphic */}
            <div
              className="lg:col-span-5 border rounded p-4 relative overflow-hidden"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <img
                src={section.imagePrimary || GENERATED_MEDIA.jawCrusherQuarry}
                alt={`${cmsData.siteIdentity.companyName} Integrated Crushing Plant in Operation`}
                className="w-full h-56 object-cover rounded"
                referrerPolicy="no-referrer"
              />
              <div className="mt-3 text-[11px] font-mono text-[var(--abu-text-muted)] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
                <span>Integrated circuit diagram designed for Kenyan basalt & granite geology</span>
              </div>
            </div>
          </div>

          {/* Responsible Statement */}
          <div
            className="text-xs font-mono text-[var(--abu-text-muted)] border-t pt-4 italic"
            style={{ borderColor: 'var(--abu-border)' }}
          >
            * {cmsData.siteIdentity.companyName} custom configures and fabricates plant structures, conveyors, and
            select processing equipment, while sourcing specialized high-torque drives and precision components to
            deliver integrated, turn-key solutions tailored to client specifications.
          </div>
        </div>
      </div>
    </section>
  );
};
