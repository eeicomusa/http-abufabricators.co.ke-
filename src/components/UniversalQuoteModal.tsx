import React, { useState, useEffect } from 'react';
import { X, ArrowRight, MessageSquare, Check, UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { KENYA_COUNTIES } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

interface UniversalQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillDivision?: string;
  prefillDetails?: string;
}

export const UniversalQuoteModal: React.FC<UniversalQuoteModalProps> = ({
  isOpen,
  onClose,
  prefillDivision = 'FABRICATION',
  prefillDetails = ''
}) => {
  const { cmsData } = useCms();

  const [selectedDivision, setSelectedDivision] = useState<string>(prefillDivision || 'FABRICATION');
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [county, setCounty] = useState<string>('Nairobi');
  const [timeline, setTimeline] = useState<string>('Within 1 Month');
  const [description, setDescription] = useState<string>(prefillDetails || '');
  const [fileName, setFileName] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Dynamic fields
  const [equipmentType, setEquipmentType] = useState<string>('Jaw Crusher');
  const [capacityTph, setCapacityTph] = useState<string>('80 - 150 TPH');
  const [steelThickness, setSteelThickness] = useState<string>('12mm - 16mm heavy plate');
  const [weldingType, setWeldingType] = useState<string>('Structural / On-site');
  const [machineCondition, setMachineCondition] = useState<string>('Operational but needs overhaul');

  useEffect(() => {
    if (isOpen) {
      setSelectedDivision(prefillDivision || 'FABRICATION');
      setDescription(prefillDetails || '');
      setSubmitted(false);
      setFormError('');
    }
  }, [isOpen, prefillDivision, prefillDetails]);

  if (!isOpen) return null;

  const divisions = [
    { id: 'FABRICATION', label: 'Structural Steel & Fabrication' },
    { id: 'WELDING', label: 'Industrial Welding' },
    { id: 'CUSTOM MACHINE', label: 'Custom Metalwork' },
    { id: 'EQUIPMENT', label: 'Industrial Machinery' },
    { id: 'INSTALLATION', label: 'Steel Frameworks & Installation' },
    { id: 'REPAIR', label: 'Repair & Overhaul' },
    { id: 'MAINTENANCE', label: 'Maintenance' },
    { id: 'SPARE PARTS', label: 'Spare Parts' },
    { id: 'ENGINEERING CONSULTATION', label: 'Engineering Consultation' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !description.trim()) {
      setFormError('Please fill in your name, contact phone, and project requirements.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const whatsappText = `Hello ${cmsData.siteIdentity.companyName}, I submitted a quotation request:
Division: ${selectedDivision}
Name: ${name} (${company || 'Individual'})
Phone: ${phone}
Location: ${county} County
Timeline: ${timeline}
Details: ${description}`;
  const whatsappHref = `https://wa.me/${cmsData.siteIdentity.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-3xl border rounded-lg shadow-2xl my-8 overflow-hidden max-h-[90vh] flex flex-col"
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
              FREE QUOTATION &amp; CONSULTATION · {cmsData.siteIdentity.shortName}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-0.5">
              GET A FREE QUOTE
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {submitted ? (
            <div className="p-8 bg-emerald-50/60 border border-emerald-300 rounded-lg text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Quotation Request Logged
              </h4>
              <p className="text-sm text-[var(--abu-text-muted)]">
                Thank you, <span className="text-[var(--abu-text)] font-semibold">{name}</span>.
                Your quotation request for <span className="text-[var(--abu-text)] font-semibold">{selectedDivision}</span> in{' '}
                <span className="text-[var(--abu-text)] font-semibold">{county}</span> County has been prepared for our fabrication team at{' '}
                {cmsData.siteIdentity.address}.
              </p>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                An {cmsData.siteIdentity.shortName} engineer will review your project parameters and contact you at{' '}
                <span className="text-emerald-700 font-semibold">{phone}</span> (or call {cmsData.siteIdentity.phoneDisplay}).
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Request via WhatsApp ({cmsData.siteIdentity.phoneDisplay})</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Step 1: Select Division */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-2">
                  Select Division / Requirement Category *
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {divisions.map((div) => {
                    const isSelected = selectedDivision.toUpperCase() === div.id.toUpperCase();
                    return (
                      <button
                        type="button"
                        key={div.id}
                        onClick={() => setSelectedDivision(div.id)}
                        className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors border ${
                          isSelected
                            ? 'bg-[var(--abu-accent)] text-white border-[var(--abu-accent)] font-bold shadow-sm'
                            : 'hover:border-[var(--abu-accent)]/60'
                        }`}
                        style={
                          !isSelected
                            ? {
                                backgroundColor: 'var(--abu-surface)',
                                borderColor: 'var(--abu-border)',
                                color: 'var(--abu-text)'
                              }
                            : undefined
                        }
                      >
                        {div.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Division Fields */}
              <div
                className="p-4 border rounded-lg space-y-4"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  {selectedDivision} Specific Parameters
                </div>

                {selectedDivision === 'EQUIPMENT' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                        Equipment Type
                      </label>
                      <select
                        value={equipmentType}
                        onChange={(e) => setEquipmentType(e.target.value)}
                        className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                      >
                        <option value="Jaw Crusher">Primary Jaw Crusher</option>
                        <option value="Cone Crusher">Hydraulic Cone Crusher</option>
                        <option value="Impact Crusher">Impact Crusher</option>
                        <option value="Vibrating Screen">Multi-Deck Vibrating Screen</option>
                        <option value="Conveyor System">Heavy Belt Conveyor</option>
                        <option value="Ball Mill">Mineral Grinding Ball Mill</option>
                        <option value="Trommel Screen">Rotary Trommel Scrubber</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                        Target Throughput Capacity
                      </label>
                      <select
                        value={capacityTph}
                        onChange={(e) => setCapacityTph(e.target.value)}
                        className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                      >
                        <option value="Under 30 TPH">Under 30 Tonnes/Hour</option>
                        <option value="30 - 80 TPH">30 – 80 Tonnes/Hour</option>
                        <option value="80 - 150 TPH">80 – 150 Tonnes/Hour</option>
                        <option value="150 - 300 TPH">150 – 300 Tonnes/Hour</option>
                        <option value="Over 300 TPH">Over 300 Tonnes/Hour</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedDivision === 'FABRICATION' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                        Steel Type / Plate Thickness
                      </label>
                      <select
                        value={steelThickness}
                        onChange={(e) => setSteelThickness(e.target.value)}
                        className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                      >
                        <option value="6mm - 10mm structural plate">6mm – 10mm Standard Structural Plate</option>
                        <option value="12mm - 16mm heavy plate">12mm – 16mm Heavy Wear Plate</option>
                        <option value="20mm+ extra heavy plate">20mm+ Hardox / Manganese Lined</option>
                        <option value="Universal Beams / Columns">Universal Beams / Column Framework</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                        Do You Have CAD / Drawings?
                      </label>
                      <select
                        className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                        style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                      >
                        <option>Yes, CAD drawings available (.dwg / .dxf)</option>
                        <option>Yes, PDF sketches / dimensions</option>
                        <option>No, need {cmsData.siteIdentity.shortName} to take site measurements</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedDivision === 'WELDING' && (
                  <div>
                    <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                      Welding Environment &amp; Process
                    </label>
                    <select
                      value={weldingType}
                      onChange={(e) => setWeldingType(e.target.value)}
                      className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    >
                      <option value={`Workshop welding in ${cmsData.siteIdentity.location}`}>
                        In-Workshop Welding ({cmsData.siteIdentity.location} facility)
                      </option>
                      <option value="On-site mobile welding team">On-Site Mobile Welding Team (at client site)</option>
                      <option value="Hardfacing wear overlay">Heavy Hardfacing &amp; Wear Plate Overlay</option>
                      <option value="Structural gantry / beam welding">Structural Gantry &amp; Access Walkway Welding</option>
                    </select>
                  </div>
                )}

                {selectedDivision === 'REPAIR' && (
                  <div>
                    <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                      Current Machine Condition
                    </label>
                    <select
                      value={machineCondition}
                      onChange={(e) => setMachineCondition(e.target.value)}
                      className="w-full border rounded p-2 text-xs text-[var(--abu-text)]"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    >
                      <option value="Total mechanical breakdown">Catastrophic Mechanical Breakdown (Urgent)</option>
                      <option value="Operating with severe vibration">Operating with Severe Vibration / Noise</option>
                      <option value="Structural fatigue cracks on frame">Visible Structural Fatigue Cracks on Frame</option>
                      <option value="Scheduled preventive overhaul">Scheduled Preventive Off-Season Overhaul</option>
                    </select>
                  </div>
                )}

                {/* Common requirement detail */}
                <div>
                  <label className="block text-xs font-mono text-[var(--abu-text-muted)] mb-1">
                    Describe Scope &amp; Operating Details *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide details: structural dimensions, steel sections, warehouse span, welding scope, or machinery specs..."
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2.5 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  />
                </div>
              </div>

              {/* Drawing Upload Option */}
              <div
                className="p-3 border border-dashed rounded flex items-center justify-between"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="text-xs font-mono text-[var(--abu-text)] flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-[var(--abu-accent)]" />
                  <span>Attach Engineering File (PDF, CAD, Image, Spec)</span>
                </div>
                <label
                  className="px-3 py-1.5 border rounded text-xs font-mono cursor-pointer hover:border-[var(--abu-accent)]"
                  style={{
                    backgroundColor: 'var(--abu-bg)',
                    borderColor: 'var(--abu-border)',
                    color: 'var(--abu-text)'
                  }}
                >
                  <FileText className="w-3.5 h-3.5 inline mr-1 text-[var(--abu-accent)]" />
                  <span>{fileName ? 'Attached' : 'Browse'}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
              {fileName && (
                <div className="text-xs font-mono text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Attached: {fileName}</span>
                </div>
              )}

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eng. David Mwangi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Embakasi Logistics Ltd"
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
                    placeholder="name@company.co.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
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

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Required Project Timeline
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
                    <option value="Budgeting & Planning">Budgeting / Future Project</option>
                  </select>
                </div>
              </div>

              {formError && (
                <div className="text-xs font-mono text-red-600 font-semibold">{formError}</div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>SUBMIT PROJECT QUOTATION REQUEST</span>
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
