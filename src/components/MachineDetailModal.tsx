import React, { useState } from 'react';
import { X, ArrowRight, MessageSquare, Download, CheckCircle2, Shield, Settings } from 'lucide-react';
import { MachineProduct } from '../data/industrialData';
import { useCms } from '../context/CmsContext';
import { generateMachineSpecPdf } from '../utils/pdfGenerator';

interface MachineDetailModalProps {
  machine: MachineProduct | null;
  onClose: () => void;
  onRequestQuote: (machineName: string) => void;
}

export const MachineDetailModal: React.FC<MachineDetailModalProps> = ({
  machine,
  onClose,
  onRequestQuote
}) => {
  const { cmsData } = useCms();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  if (!machine) return null;

  const photos = [machine.image, ...(machine.gallery || [])].filter(Boolean);
  const activePhoto = photos[activePhotoIndex] || machine.image;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === 'true') return;
    const match = img.src.match(/\/assets\/images\/[^/?#]+/);
    if (match) {
      img.dataset.fallbackApplied = 'true';
      img.src = match[0];
    }
  };

  const handleDownloadBrochure = () => {
    generateMachineSpecPdf(machine, cmsData, true);
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  const whatsappMessage = `Hello ${cmsData.siteIdentity.companyName}, I am interested in the ${machine.name} for my operation in Kenya. Please provide technical documentation and pricing.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-4xl border rounded-lg shadow-2xl my-8 overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: 'var(--abu-bg)',
          borderColor: 'var(--abu-border)',
          color: 'var(--abu-text)'
        }}
      >

        {/* Modal Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              MACHINERY &amp; EQUIPMENT SPECIFICATION
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-0.5">
              {machine.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--abu-text-muted)] hover:text-[var(--abu-text)] rounded border transition-colors cursor-pointer"
            style={{ borderColor: 'var(--abu-border)', backgroundColor: 'var(--abu-bg)' }}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Image & Gallery */}
            <div className="md:col-span-6 space-y-2">
              <div
                className="rounded overflow-hidden bg-slate-900 aspect-[4/3] border relative"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                <img
                  src={activePhoto}
                  alt={machine.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-sm p-2 rounded text-[11px] font-mono text-white">
                  {cmsData.siteIdentity.shortName} · Manufactured &amp; Commissioned for East Africa
                </div>
              </div>
              {photos.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {photos.map((photo, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`w-16 h-12 rounded overflow-hidden border shrink-0 cursor-pointer ${
                        activePhotoIndex === idx ? 'border-[var(--abu-accent)] ring-2 ring-[var(--abu-accent)]/30' : 'opacity-70'
                      }`}
                      style={activePhotoIndex !== idx ? { borderColor: 'var(--abu-border)' } : undefined}
                    >
                      <img
                        src={photo}
                        alt=""
                        onError={handleImageError}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Overview & Quick Metrics */}
            <div className="md:col-span-6 space-y-4">
              <div className="text-xs font-mono text-[var(--abu-accent)] uppercase font-bold">
                {machine.tagline}
              </div>
              <p className="text-sm text-[var(--abu-text-muted)] leading-relaxed">
                {machine.description}
              </p>

              {/* Quick specs box */}
              <div
                className="p-4 border rounded space-y-2"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div
                  className="text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold border-b pb-1"
                  style={{ borderColor: 'var(--abu-border)' }}
                >
                  Operating Envelope:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[var(--abu-text-muted)] font-mono text-[11px]">Capacity Range:</span>
                    <div className="text-[var(--abu-text)] font-bold">{machine.capacityRange}</div>
                  </div>
                  <div>
                    <span className="text-[var(--abu-text-muted)] font-mono text-[11px]">Max Feed Size:</span>
                    <div className="text-[var(--abu-text)] font-bold">{machine.feedSizeMax}</div>
                  </div>
                  <div>
                    <span className="text-[var(--abu-text-muted)] font-mono text-[11px]">Drive Power:</span>
                    <div className="text-[var(--abu-text)] font-bold">{machine.powerRange}</div>
                  </div>
                  <div>
                    <span className="text-[var(--abu-text-muted)] font-mono text-[11px]">Service &amp; Spares:</span>
                    <div className="text-emerald-700 font-bold">{cmsData.siteIdentity.location}</div>
                  </div>
                </div>
              </div>

              {/* Maintenance summary */}
              <div className="text-xs text-[var(--abu-text-muted)] font-mono">
                <span className="text-[var(--abu-text)] font-bold">Maintenance Guidance: </span>
                {machine.maintenanceNotes}
              </div>
            </div>

          </div>

          {/* Technical Specifications Table */}
          <div>
            <h4 className="text-base font-bold font-heading text-[var(--abu-text)] uppercase mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[var(--abu-accent)]" />
              <span>Technical Specifications (Full Parameters)</span>
            </h4>
            <div className="border rounded overflow-hidden" style={{ borderColor: 'var(--abu-border)' }}>
              <table className="w-full text-left text-xs">
                <thead
                  className="text-[var(--abu-text-muted)] font-mono uppercase"
                  style={{ backgroundColor: 'var(--abu-surface-alt)' }}
                >
                  <tr>
                    <th className="py-2.5 px-4 border-b" style={{ borderColor: 'var(--abu-border)' }}>
                      Engineering Parameter
                    </th>
                    <th className="py-2.5 px-4 border-b" style={{ borderColor: 'var(--abu-border)' }}>
                      Specification Value
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--abu-border)' }}>
                  {machine.specs.map((item, idx) => (
                    <tr
                      key={idx}
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'var(--abu-bg)' : 'var(--abu-surface)'
                      }}
                    >
                      <td className="py-2 px-4 font-mono text-[var(--abu-text-muted)]">{item.label}</td>
                      <td className="py-2 px-4 font-semibold text-[var(--abu-text)]">{item.value}</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: 'var(--abu-surface-alt)' }}>
                    <td className="py-2 px-4 font-mono text-[var(--abu-text-muted)]">
                      Custom Engineering &amp; Dimensions
                    </td>
                    <td className="py-2 px-4 text-[var(--abu-accent)] font-mono italic font-medium">
                      Technical specifications and custom drawings available on request.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Advantages & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div
              className="p-4 border rounded"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Engineering Advantages</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--abu-text)]">
                {machine.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--abu-accent)] mt-0.5 shrink-0" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="p-4 border rounded"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div className="text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-2">
                Typical Applications
              </div>
              <div className="flex flex-wrap gap-1.5">
                {machine.applications.map((app, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono text-[var(--abu-text)] px-2.5 py-1 rounded border"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    {app}
                  </span>
                ))}
              </div>
              <div
                className="mt-4 pt-3 border-t text-[11px] font-mono text-[var(--abu-text-muted)]"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                Spare parts &amp; fabrication support available from {cmsData.siteIdentity.companyName} in{' '}
                {cmsData.siteIdentity.location}.
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer / CTAs */}
        <div
          className="p-5 border-t flex flex-wrap items-center justify-between gap-3"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >

          <button
            onClick={handleDownloadBrochure}
            className="px-4 py-2.5 border rounded text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-colors hover:border-[var(--abu-accent)]"
            style={{
              backgroundColor: 'var(--abu-bg)',
              borderColor: 'var(--abu-border)',
              color: 'var(--abu-text)'
            }}
          >
            <Download className="w-4 h-4 text-[var(--abu-accent)]" />
            <span>
              {downloadSuccess ? 'Specification Sheet Downloaded' : 'Download Technical Spec PDF'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`https://wa.me/${cmsData.siteIdentity.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Engineer</span>
            </a>

            <button
              onClick={() => {
                onRequestQuote(machine.name);
                onClose();
              }}
              className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
