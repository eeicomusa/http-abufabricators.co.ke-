import React from 'react';
import { Award, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface AccreditationBody {
  id: string;
  acronym: string;
  title: string;
  category: string;
  description: string;
  complianceRef: string;
  accentHex: string;
  badgeRingHex: string;
}

const ACCREDITATION_BODIES: AccreditationBody[] = [
  {
    id: 'iek',
    acronym: 'IEK',
    title: 'Institution of Engineers of Kenya',
    category: 'Professional Engineering Body',
    description:
      'Engineering practice aligned with IEK mechanical, automotive, and structural standards across industrial machinery installation, plant erection, and fabrication supervision.',
    complianceRef: 'Mechanical & Automotive Discipline',
    accentHex: '#FF6B00',
    badgeRingHex: '#0D1B2A'
  },
  {
    id: 'ebk',
    acronym: 'EBK',
    title: 'Engineers Board of Kenya',
    category: 'Statutory Engineering Standards',
    description:
      'Design checks, load calculations, structural tolerances, and commissioning sign-offs structured to support statutory Kenyan engineering accountability.',
    complianceRef: 'Engineers Act Compliance',
    accentHex: '#0D1B2A',
    badgeRingHex: '#FF6B00'
  },
  {
    id: 'doshs',
    acronym: 'DOSHS',
    title: 'OSH & Workshop Safety Compliance',
    category: 'Workplace & Lifting Safety',
    description:
      'Fabrication bays, overhead lifting rigs, rotating machine guards, and mobile site welding crews operated under Kenya OSHA workplace safety protocols.',
    complianceRef: 'OSHA 2007 · Guarding & PPE',
    accentHex: '#059669',
    badgeRingHex: '#0D1B2A'
  },
  {
    id: 'aws-bs',
    acronym: 'AWS D1.1',
    title: 'BS EN 10025 & AWS Welding Code',
    category: 'Structural Steel & Weld Quality',
    description:
      'Verified S275/S355 structural steel plate sourcing, bevelled joint preparation, multi-pass penetration checks, and non-destructive dye/visual weld inspection.',
    complianceRef: 'BS EN 10025 · S275 / S355',
    accentHex: '#D97706',
    badgeRingHex: '#0D1B2A'
  },
  {
    id: 'kebs-nca',
    acronym: 'KEBS / NCA',
    title: 'Industrial Plant & Contractor Readiness',
    category: 'Kenyan Construction & Tender Fit',
    description:
      'Workshop-tested quarry crushers, commercial warehouse portal frames, and steel infrastructure fabricated to support NCA contractor and KEBS equipment specs.',
    complianceRef: 'Dry-Run Tested Before Dispatch',
    accentHex: '#2563EB',
    badgeRingHex: '#0D1B2A'
  }
];

const AccreditationEmblem: React.FC<{ item: AccreditationBody }> = ({ item }) => (
  <svg
    viewBox="0 0 88 88"
    className="w-16 h-16 shrink-0"
    role="img"
    aria-label={`${item.acronym} Accreditation Seal`}
  >
    {/* Outer stamped steel gear / seal ring */}
    <circle
      cx="44"
      cy="44"
      r="40"
      fill="#FFFFFF"
      stroke={item.badgeRingHex}
      strokeWidth="3"
    />
    <circle
      cx="44"
      cy="44"
      r="33"
      fill="none"
      stroke={item.accentHex}
      strokeWidth="1.75"
      strokeDasharray="4 3"
    />
    {/* Top & Bottom Industrial Rivet Accents */}
    <circle cx="44" cy="10" r="2.2" fill={item.accentHex} />
    <circle cx="44" cy="78" r="2.2" fill={item.accentHex} />
    {/* Center Ribbon Band */}
    <rect
      x="11"
      y="31"
      width="66"
      height="26"
      rx="4"
      fill={item.badgeRingHex}
    />
    <text
      x="44"
      y="48"
      textAnchor="middle"
      fill="#FFFFFF"
      fontSize={item.acronym.length > 6 ? '11' : '13'}
      fontWeight="800"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      letterSpacing="0.5"
    >
      {item.acronym}
    </text>
  </svg>
);

export const ProfessionalAccreditations: React.FC = () => {
  const { cmsData } = useCms();
  const { siteIdentity, founder } = cmsData;

  return (
    <section
      id="professional-accreditations"
      className="py-16 border-b"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              <Award className="w-4 h-4" />
              <span>Professional Accreditations &amp; Engineering Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              Certified Engineering Authority &amp; Regulatory Alignment
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">
              Backed by {founder.experienceYears}, {siteIdentity.companyName} fabricates, installs,
              and overhauls heavy machinery and structural steelwork in alignment with Kenyan
              professional engineering bodies and international welding codes.
            </p>
          </div>

          <div
            className="px-4 py-3 rounded-lg border flex items-center gap-3 shrink-0 shadow-xs"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <ShieldCheck className="w-6 h-6 text-[var(--abu-accent)] shrink-0" />
            <div className="text-xs font-mono">
              <div className="font-bold text-[var(--abu-text)] uppercase">
                Verified Mechanical &amp; Structural Governance
              </div>
              <div className="text-[var(--abu-text-muted)]">
                Pre-dispatch inspection &amp; weld QA records on all projects
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation Badges & Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACCREDITATION_BODIES.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 flex flex-col justify-between gap-4 hover:border-[var(--abu-accent)] transition-colors shadow-xs"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div className="flex items-start gap-4">
                <AccreditationEmblem item={item} />
                <div className="min-w-0 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--abu-accent)] font-bold">
                    {item.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[var(--abu-text)] uppercase leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] leading-relaxed">
                {item.description}
              </p>

              <div
                className="pt-3 border-t flex items-center justify-between gap-2 text-[11px] font-mono"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                <span className="inline-flex items-center gap-1.5 text-[var(--abu-text)] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item.complianceRef}</span>
                </span>
                <FileCheck2 className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
