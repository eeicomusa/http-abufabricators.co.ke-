import React, { useState } from 'react';
import {
  ShieldCheck,
  FileCheck2,
  Download,
  MessageSquare,
  CheckCircle2,
  ClipboardCheck,
  Award
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import {
  QUALITY_COMPLIANCE_STANDARDS,
  TENDER_PACK_CHECKLIST
} from '../data/industrialData';
import { generateTenderCapabilityDossierPdf } from '../utils/pdfGenerator';

interface QualityComplianceSectionProps {
  onOpenQuote: (details: string) => void;
}

export const QualityComplianceSection: React.FC<QualityComplianceSectionProps> = ({
  onOpenQuote
}) => {
  const { cmsData, getSection } = useCms();
  const { siteIdentity } = cmsData;
  const section = getSection('quality-compliance');

  const [tenderRef, setTenderRef] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [packDownloaded, setPackDownloaded] = useState(false);

  const handleDownloadDossier = () => {
    generateTenderCapabilityDossierPdf(cmsData, tenderRef.trim(), organizationName.trim(), true);
    setPackDownloaded(true);
    setTimeout(() => setPackDownloaded(false), 4500);
  };

  const whatsappTenderMsg = [
    `Hello ${siteIdentity.companyName}, I am requesting an official stamped Tender & Pre-Qualification Capability Pack.`,
    organizationName ? `Organization: ${organizationName}` : '',
    tenderRef ? `Tender / RFQ Ref: ${tenderRef}` : '',
    `Please share CR12, KRA Tax Compliance, and capability documentation.`
  ]
    .filter(Boolean)
    .join('\n');

  const whatsappUrl = `https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
    whatsappTenderMsg
  )}`;

  return (
    <section
      id="quality-compliance"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>{section.kicker || 'Standards, Weld QA & Procurement Readiness'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || 'QUALITY ASSURANCE, WELD INSPECTION & TENDER READINESS'}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: 4-Pillar Quality Assurance & Weld Inspection Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITY_COMPLIANCE_STANDARDS.map((qa) => (
              <div
                key={qa.id}
                className="p-5 border rounded-lg space-y-3 shadow-sm hover:border-[var(--abu-accent)] transition-colors"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-[var(--abu-accent)]">
                    {qa.code}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
                <h3 className="text-base font-heading font-extrabold text-[var(--abu-text)] uppercase leading-snug">
                  {qa.title}
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">{qa.summary}</p>
                <ul
                  className="pt-2 border-t space-y-1.5 text-[11px] font-mono text-[var(--abu-text)]"
                  style={{ borderColor: 'var(--abu-border)' }}
                >
                  {qa.checkpoints.map((cp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right 5 Cols: One-Click Tender & Procurement Capability Pack Request */}
          <div
            className="lg:col-span-5 border-2 rounded-lg p-6 space-y-5 shadow-md"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-accent)' }}
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1B2A] text-white text-[10px] font-mono uppercase font-bold">
                <FileCheck2 className="w-3.5 h-3.5 text-[var(--abu-amber)]" />
                <span>ONE-CLICK PROCUREMENT DESK</span>
              </div>
              <h3 className="text-2xl font-heading font-extrabold text-[var(--abu-text)] uppercase pt-1">
                Tender &amp; Capability Pack Request
              </h3>
              <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">
                For corporate procurement officers, parastatals, NGOs, and main contractors pre-qualifying{' '}
                {siteIdentity.shortName}. Review readiness items below and generate an instant capability dossier or request stamped originals.
              </p>
            </div>

            {/* Pre-Qualification Checklist */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase font-bold text-[var(--abu-text-muted)]">
                Standard Tender Compliance Checklist:
              </div>
              {TENDER_PACK_CHECKLIST.map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 rounded border flex items-start justify-between gap-3"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                >
                  <div className="flex items-start gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[var(--abu-text)]">{doc.documentTitle}</div>
                      <div className="text-[10px] text-[var(--abu-text-muted)]">{doc.notes}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 shrink-0">
                    {doc.statusLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Optional Customizer Inputs for Dossier Header */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--abu-text-muted)] mb-1">
                  Procuring Entity (Optional)
                </label>
                <input
                  type="text"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  placeholder="e.g. Acme Contractors Ltd"
                  className="w-full px-3 py-2 rounded border text-xs text-[var(--abu-text)] focus:outline-none focus:border-[var(--abu-accent)]"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono uppercase text-[var(--abu-text-muted)] mb-1">
                  Tender / RFQ No. (Optional)
                </label>
                <input
                  type="text"
                  value={tenderRef}
                  onChange={(e) => setTenderRef(e.target.value)}
                  placeholder="e.g. TND/KE/2026/04"
                  className="w-full px-3 py-2 rounded border text-xs text-[var(--abu-text)] focus:outline-none focus:border-[var(--abu-accent)]"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                />
              </div>
            </div>

            {packDownloaded && (
              <div className="p-2.5 rounded border border-emerald-500/40 bg-emerald-50 text-emerald-800 text-xs font-mono">
                Capability Dossier generated. Print/Save-as-PDF dialog opened and HTML copy saved.
              </div>
            )}

            {/* One-Click Actions */}
            <div className="space-y-2.5 pt-1">
              <button
                type="button"
                onClick={handleDownloadDossier}
                className="w-full py-3 px-4 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Capability Dossier</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Stamped Copy</span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    onOpenQuote(
                      `Tender / Vendor Pre-Qualification Pack Request.${
                        organizationName ? ` Company: ${organizationName}.` : ''
                      }${tenderRef ? ` Tender Ref: ${tenderRef}.` : ''}`
                    )
                  }
                  className="py-2.5 px-3 bg-[#0D1B2A] hover:bg-[#1a2e45] text-white rounded text-xs font-mono font-bold uppercase cursor-pointer transition-colors"
                >
                  Formal RFQ Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
