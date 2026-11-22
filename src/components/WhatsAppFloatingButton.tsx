import React, { useState } from 'react';
import { MessageSquare, Phone, Wrench, X, ArrowUpRight } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface WhatsAppFloatingButtonProps {
  onRequestQuote: () => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  onRequestQuote
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;

  const presets = [
    {
      label: 'Structural Steel Fabrication Quote',
      msg: `Hello ${siteIdentity.companyName}, I would like a free quote for structural steel fabrication.`
    },
    {
      label: 'Custom Metal Fabrication',
      msg: `Hello ${siteIdentity.shortName}, I need custom metal fabrication tailored to my project specifications.`
    },
    {
      label: 'Industrial Welding Services',
      msg: `Hello ${siteIdentity.shortName}, I need industrial welding and structural steel services.`
    },
    {
      label: 'Steel Frameworks & Warehouses',
      msg: `Hello ${siteIdentity.shortName}, I need a quotation for warehouse / industrial steel frameworks.`
    },
    {
      label: 'Fabrication Support & Installation',
      msg: `Hello ${siteIdentity.shortName}, I need design consultation and on-site steel installation support.`
    },
    {
      label: 'Crushing & Industrial Machinery',
      msg: `Hello ${siteIdentity.shortName}, I am interested in heavy industrial machinery or custom machine fabrication.`
    },
    {
      label: 'Machinery Repair / Refurbishment',
      msg: `Hello ${siteIdentity.shortName}, I need machinery repair and equipment refurbishment.`
    }
  ];

  return (
    <>
      {/* Desktop Floating WhatsApp Button & Contextual Popup Menu */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        {menuOpen && (
          <div
            className="mb-3 w-80 border rounded-lg shadow-2xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
            style={{
              backgroundColor: 'var(--abu-bg)',
              borderColor: 'var(--abu-border)',
              color: 'var(--abu-text)'
            }}
          >
            <div
              className="flex items-center justify-between pb-2 border-b"
              style={{ borderColor: 'var(--abu-border)' }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">
                  DIRECT WHATSAPP CHANNEL
                </span>
                <div className="text-xs font-heading font-bold text-[var(--abu-text)] uppercase">
                  Talk to {siteIdentity.shortName}
                </div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[var(--abu-text-muted)] hover:text-[var(--abu-text)] p-1 cursor-pointer"
                aria-label="Close presets"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-[var(--abu-text-muted)] font-sans">
              Select your inquiry topic to open a pre-filled direct WhatsApp discussion ({siteIdentity.phoneDisplay}):
            </p>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {presets.map((p, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(p.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left p-2 rounded border text-xs font-mono flex items-center justify-between transition-colors cursor-pointer group hover:border-[var(--abu-accent)]"
                  style={{
                    backgroundColor: 'var(--abu-surface)',
                    borderColor: 'var(--abu-border)',
                    color: 'var(--abu-text)'
                  }}
                >
                  <span className="truncate">{p.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 opacity-80 group-hover:opacity-100 shrink-0 ml-1" />
                </a>
              ))}
            </div>

            <div
              className="pt-2 border-t text-[10px] font-mono text-[var(--abu-text-muted)] text-center"
              style={{ borderColor: 'var(--abu-border)' }}
            >
              {siteIdentity.address}
            </div>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#16a34a] hover:bg-[#15803d] text-white font-heading font-bold uppercase tracking-wider text-sm rounded-full shadow-xl transition-all cursor-pointer group hover:scale-105"
          aria-label="WhatsApp an Engineer"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span>WHATSAPP AN ENGINEER</span>
        </button>
      </div>

      {/* Sticky Mobile Action Bar (Call · WhatsApp · Get Quote) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-md border-t px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
      >
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${siteIdentity.phoneRaw}`}
            className="flex flex-col items-center justify-center py-2 border rounded-md active:scale-95 transition-transform"
            style={{
              backgroundColor: 'var(--abu-surface)',
              borderColor: 'var(--abu-border)',
              color: 'var(--abu-text)'
            }}
          >
            <Phone className="w-4 h-4 text-[var(--abu-accent)]" />
            <span className="text-[10px] font-mono font-bold uppercase mt-0.5">
              Call {siteIdentity.phoneDisplay}
            </span>
          </a>

          <a
            href={`https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
              `Hello ${siteIdentity.companyName}, I would like to discuss a steel fabrication or machinery project.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md active:scale-95 transition-transform shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase mt-0.5">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onRequestQuote}
            className="flex flex-col items-center justify-center py-2 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded-md font-bold uppercase shadow-sm cursor-pointer active:scale-95 transition-transform"
          >
            <Wrench className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase mt-0.5">Get Quote</span>
          </button>
        </div>
      </div>
    </>
  );
};
