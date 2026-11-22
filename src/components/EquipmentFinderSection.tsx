import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface EquipmentFinderProps {
  onSelectProductRecommendation: (recommendation: {
    industry: string;
    requirement: string;
    notes: string;
  }) => void;
  onRequestQuoteWithPrefill: (prefill: { division: string; details: string }) => void;
}

export const EquipmentFinderSection: React.FC<EquipmentFinderProps> = ({
  onRequestQuoteWithPrefill
}) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('equipment-finder');

  const [selectedIndustry, setSelectedIndustry] = useState<string>('Quarry');
  const [selectedRequirement, setSelectedRequirement] = useState<string>('Crushing');

  const industries = [
    'Mining',
    'Quarry',
    'Construction',
    'Manufacturing',
    'Agriculture',
    'Recycling',
    'Food Processing',
    'Water & Energy',
    'Other'
  ];

  const requirements = [
    'Crushing',
    'Screening',
    'Conveying',
    'Processing',
    'Fabrication',
    'Welding',
    'Custom machinery',
    'Repair',
    'Maintenance'
  ];

  const getRecommendation = () => {
    if (selectedRequirement === 'Crushing') {
      if (selectedIndustry === 'Mining') {
        return {
          headline: 'Primary Jaw Breaker + Fine Grinding Stage',
          summary:
            'For extractive mineral veins, we recommend a heavy cast-steel primary jaw crusher paired with an integrated secondary hammer/ball mill grinding circuit to liberate target ore.',
          suggestedUnits: ['PE Series Primary Jaw Station', 'Continuous Wet Ball Mill', 'Manganese Grizzly Feeder'],
          division: 'EQUIPMENT'
        };
      }
      return {
        headline: 'Complete Closed-Circuit Quarry Crushing Plant',
        summary:
          'A heavy-duty primary jaw crusher coupled with a secondary hydraulic cone or impactor, fed by a vibrating grizzly feeder, ensures high-tonnage concrete ballast with minimum flaky fines.',
        suggestedUnits: ['Heavy Primary Jaw Crusher', 'Secondary Hydraulic Cone Unit', 'Multi-Deck Sizing Screen'],
        division: 'EQUIPMENT'
      };
    } else if (selectedRequirement === 'Screening') {
      return {
        headline: 'High-Amplitude Multi-Deck Sizing & Scalping System',
        summary:
          'Circular motion or horizontal vibrating screens engineered with huck-bolted sideplates. Available with high-tensile wire mesh or polyurethane decks to prevent wet clay blinding.',
        suggestedUnits: ['2-to-4 Deck Vibrating Screen', 'Rotary Trommel Scrubber', 'Modular Polyurethane Panels'],
        division: 'EQUIPMENT'
      };
    } else if (selectedRequirement === 'Conveying') {
      return {
        headline: 'Heavy Troughed Overland Belt & Truss Conveyor Circuit',
        summary:
          'Rigid lattice steel trusses designed to handle high tonnage without excessive support bents. Fitted with 3-roll troughing idlers, vulcanized rubber belting, and crowned lagging drive drums.',
        suggestedUnits: ['Lattice Truss Belt Conveyor', 'Heavy Dump Hoppers', 'Adjustable Radial Stacker'],
        division: 'EQUIPMENT'
      };
    } else if (selectedRequirement === 'Fabrication') {
      return {
        headline: 'Heavy Industrial Steelwork & Custom Plant Chassis',
        summary:
          'Structural steel fabrication built strictly to your drawings or engineering measurements. Includes beams, columns, trusses, machine platforms, heavy chutes, and hoppers.',
        suggestedUnits: ['Structural Beams & Trusses', 'Reinforced Dump Hoppers', 'Industrial Platforms & Catwalks'],
        division: 'FABRICATION'
      };
    } else if (selectedRequirement === 'Welding') {
      return {
        headline: 'High-Duty Structural & Hardfacing Welding Solutions',
        summary:
          'Certified MIG/MAG, TIG, heavy stick welding, and wear-resistant hardfacing overlays to rebuild fatigued machine chassis and extend abrasive wear resistance.',
        suggestedUnits: ['Heavy Structural Welding', 'Hardfacing Abrasion Overlay', 'On-Site Mobile Welding Rig'],
        division: 'WELDING'
      };
    } else if (selectedRequirement === 'Custom machinery') {
      return {
        headline: 'Bespoke Mechanical Engineering & Purpose-Built Machine',
        summary: `When off-the-shelf equipment cannot resolve your specific material characteristics, ${cmsData.siteIdentity.companyName} designs and builds custom processing machines from scratch at our ${cmsData.siteIdentity.location} workshop.`,
        suggestedUnits: ['Custom Industrial Shredders', 'Agro-Processing Hammer Mills', 'Specialized Feeders & Mixers'],
        division: 'CUSTOM MACHINE'
      };
    } else if (selectedRequirement === 'Repair' || selectedRequirement === 'Maintenance') {
      return {
        headline: 'Comprehensive Machine Refurbishment & Preventive Program',
        summary:
          'Non-destructive crack testing, spherical roller bearing replacements, frame re-squaring, shaft dynamic balancing, and routine site servicing across Kenya.',
        suggestedUnits: ['8-Step Machine Refurbishment', 'Scheduled Maintenance Tiers', 'Emergency Breakdown Response'],
        division: 'MAINTENANCE'
      };
    }

    return {
      headline: 'Tailored Industrial Engineering Solution',
      summary:
        'Our engineering department will evaluate your site throughput, material density, and power availability to prepare a custom proposal.',
      suggestedUnits: ['Technical Site Survey', 'Mechanical Flowsheet Design', 'Full Manufacturing Estimate'],
      division: 'ENGINEERING CONSULTATION'
    };
  };

  const rec = getRecommendation();
  const whatsappText = `Hello ${cmsData.siteIdentity.companyName}, I used your Equipment Finder for ${selectedIndustry} needing ${selectedRequirement}. Please provide preliminary engineering consultation.`;
  const whatsappHref = `https://wa.me/${cmsData.siteIdentity.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  const handleRequestQuote = () => {
    onRequestQuoteWithPrefill({
      division: rec.division,
      details: `Inquiry from Equipment Finder: Industry: ${selectedIndustry}, Requirement: ${selectedRequirement}. Recommended direction: ${rec.headline}`
    });
  };

  return (
    <section
      className="py-16 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Interactive Technical Assistant'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'WHAT ARE YOU LOOKING FOR?'}
          </h2>
          <p className="text-sm text-[var(--abu-text-muted)]">{section.body}</p>
        </div>

        {/* Interactive Selector Box */}
        <div
          className="border rounded-lg p-6 sm:p-8 space-y-8 shadow-sm"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          {/* Step 1: Industry */}
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-3 tracking-wider">
              Step 1: Select Your Industry Sector
            </label>
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => {
                const isSelected = selectedIndustry === ind;
                return (
                  <button
                    key={ind}
                    onClick={() => setSelectedIndustry(ind)}
                    className={`px-3.5 py-2 rounded text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--abu-accent)] text-white shadow-sm font-bold'
                        : 'text-[var(--abu-text)] hover:border-[var(--abu-accent)] border'
                    }`}
                    style={
                      isSelected
                        ? undefined
                        : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                    }
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Requirement */}
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-3 tracking-wider">
              Step 2: What Do You Need to Achieve?
            </label>
            <div className="flex flex-wrap gap-2">
              {requirements.map((req) => {
                const isSelected = selectedRequirement === req;
                return (
                  <button
                    key={req}
                    onClick={() => setSelectedRequirement(req)}
                    className={`px-3.5 py-2 rounded text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--abu-accent)] text-white shadow-sm font-bold'
                        : 'text-[var(--abu-text)] hover:border-[var(--abu-accent)] border'
                    }`}
                    style={
                      isSelected
                        ? undefined
                        : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                    }
                  >
                    {req}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Output Card: Preliminary Recommendation */}
          <div
            className="p-6 border rounded-lg space-y-6"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-accent)' }}
          >
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4"
              style={{ borderColor: 'var(--abu-border)' }}
            >
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  Preliminary Direction
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--abu-text)] uppercase mt-0.5">
                  {rec.headline}
                </h3>
              </div>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                Industry: <span className="text-[var(--abu-text)] font-semibold">{selectedIndustry}</span> · Need:{' '}
                <span className="text-[var(--abu-text)] font-semibold">{selectedRequirement}</span>
              </div>
            </div>

            <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">{rec.summary}</p>

            <div>
              <div className="text-xs font-mono uppercase text-[var(--abu-text-muted)] mb-2 font-bold">
                Typical Recommended Machine Components:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {rec.suggestedUnits.map((unit) => (
                  <div
                    key={unit}
                    className="flex items-center gap-2 p-2.5 border rounded text-xs text-[var(--abu-text)] font-medium"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                    <span>{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Note regarding preliminary advice */}
            <div className="text-[11px] font-mono text-[var(--abu-text-muted)] italic">
              * Note: The above provides a preliminary engineering direction only. Actual equipment sizing depends on
              rock compressive strength, target feed sizing, power availability, and site layout. Consult an{' '}
              {cmsData.siteIdentity.shortName} engineer for exact sizing.
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleRequestQuote}
                className="px-5 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>REQUEST DETAILED QUOTE FOR THIS SETUP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#0D1B2A] hover:bg-[#16293f] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                <span>WHATSAPP THIS CONFIGURATION</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
