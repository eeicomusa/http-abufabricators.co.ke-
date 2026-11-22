import React, { useState } from 'react';
import { X, ArrowRight, UploadCloud, FileText, CheckCircle2, Check } from 'lucide-react';
import { KENYA_COUNTIES } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

interface SendDrawingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SendDrawingModal: React.FC<SendDrawingModalProps> = ({ isOpen, onClose }) => {
  const { cmsData } = useCms();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [county, setCounty] = useState('Nairobi');
  const [service, setService] = useState('Structural Steel Fabrication');
  const [timeline, setTimeline] = useState('Within 1 Month');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setFormError('Please fill in your name and contact phone number.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl border rounded-lg shadow-2xl my-8 overflow-hidden max-h-[90vh] flex flex-col"
        style={{
          backgroundColor: 'var(--abu-bg)',
          borderColor: 'var(--abu-border)',
          color: 'var(--abu-text)'
        }}
      >

        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              CAD &amp; SPECIFICATION REVIEW · {cmsData.siteIdentity.shortName}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-0.5">
              SEND US YOUR DRAWING
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--abu-text-muted)] hover:text-[var(--abu-text)] rounded border cursor-pointer"
            style={{ borderColor: 'var(--abu-border)', backgroundColor: 'var(--abu-bg)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {submitted ? (
            <div className="p-8 bg-emerald-50/60 border border-emerald-300 rounded-lg text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Drawing Transmitted to Engineering Desk
              </h4>
              <p className="text-sm text-[var(--abu-text-muted)]">
                Thank you, <span className="text-[var(--abu-text)] font-semibold">{name}</span>.
                Our mechanical drafting &amp; fabrication team at {cmsData.siteIdentity.address} will analyze your technical files and respond with feasibility, plate thickness checks, and a production estimate.
              </p>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                We will contact you directly at <span className="text-emerald-700 font-semibold">{phone}</span>.
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* File Uploader */}
              <div
                className="p-4 border border-dashed rounded-lg space-y-2"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-mono uppercase text-[var(--abu-text)] font-bold flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4 text-[var(--abu-accent)]" />
                      <span>Upload PDF, CAD (.dwg/.dxf), Image or Sketch</span>
                    </div>
                    <p className="text-[11px] text-[var(--abu-text-muted)] font-mono mt-0.5">
                      Accepts engineering drawings, hand sketches with dimensions, site photos or technical specs.
                    </p>
                  </div>
                  <label
                    className="px-4 py-2 border rounded text-xs font-mono cursor-pointer shrink-0 hover:border-[var(--abu-accent)]"
                    style={{
                      backgroundColor: 'var(--abu-bg)',
                      borderColor: 'var(--abu-border)',
                      color: 'var(--abu-text)'
                    }}
                  >
                    <FileText className="w-3.5 h-3.5 inline mr-1 text-[var(--abu-accent)]" />
                    <span>{fileName ? 'Change File' : 'Browse File'}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFileName(e.target.files[0].name);
                        }
                      }}
                    />
                  </label>
                </div>
                {fileName && (
                  <div className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attached: {fileName}</span>
                  </div>
                )}
              </div>

              {/* Service & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Required Service *
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    <option value="Structural Steel Fabrication">Structural Steel Fabrication</option>
                    <option value="Custom Metal Fabrication">Custom Metal Fabrication</option>
                    <option value="Industrial Welding Services">Industrial Welding Services</option>
                    <option value="Steel Frameworks & Structures">Steel Frameworks &amp; Structures</option>
                    <option value="Fabrication Support Services">Fabrication Support Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Target Completion Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    <option value="Urgent (1-2 Weeks)">Urgent (1 – 2 Weeks)</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="1 - 3 Months">1 – 3 Months</option>
                  </select>
                </div>
              </div>

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Company / Site Name
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0724 151771"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="engineer@company.co.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Project Location (Kenya County)
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>{c} County</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Project Description &amp; Specifications
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Notes on dimensions, tolerances, steel grade, expected structural loads, or special instructions..."
                  className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                />
              </div>

              {formError && (
                <div className="text-xs font-mono text-red-600 font-semibold">{formError}</div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>SUBMIT ENGINEERING REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
