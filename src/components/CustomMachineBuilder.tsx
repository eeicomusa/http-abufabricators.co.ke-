import React, { useState } from 'react';
import { ArrowRight, UploadCloud, CheckCircle2, FileText, Check } from 'lucide-react';
import { KENYA_COUNTIES } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

export const CustomMachineBuilder: React.FC = () => {
  const { cmsData, getSection } = useCms();
  const section = getSection('custom-machine');

  const [industry, setIndustry] = useState<string>('Manufacturing');
  const [needType, setNeedType] = useState<string>('New machine');
  const [description, setDescription] = useState<string>('');
  const [county, setCounty] = useState<string>('Nairobi');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const industries = [
    'Mining',
    'Construction',
    'Manufacturing',
    'Agriculture',
    'Recycling',
    'Food Processing',
    'Water',
    'Energy',
    'Other'
  ];

  const needTypes = [
    'New machine',
    'Machine modification',
    'Production line',
    'Conveyor',
    'Fabrication',
    'Welding',
    'Repair',
    'Automation',
    'Maintenance',
    'Other'
  ];

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !contactPhone.trim()) {
      setFormError('Please fill in your project description and phone number.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  return (
    <section
      id="custom-machine"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Custom Machine Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Bespoke Engineering Division'} · {cmsData.siteIdentity.location}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'WE BUILD MACHINES FOR REAL INDUSTRIAL PROBLEMS'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-lg overflow-hidden aspect-[16/10] bg-[#0D1B2A] border border-[var(--abu-border)] relative shadow-sm">
              <img
                src={section.imagePrimary || '/assets/aistudio/IMG-20261115-WA0023_548f68df.jpg'}
                alt={`Custom Fabricated Machinery by ${cmsData.siteIdentity.shortName}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-white">
                {cmsData.siteIdentity.shortName} · Custom-Built Block Press &amp; Purpose-Engineered Machines
              </div>
            </div>
          </div>
        </div>

        {/* 5 Capability Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12">
          {[
            {
              title: 'Material Handling',
              items: ['Conveyors', 'Feeders', 'Hoppers & Chutes', 'Bucket Elevators']
            },
            {
              title: 'Processing Machinery',
              items: ['Crushing Units', 'Grinding Mills', 'Mixers & Blenders', 'Washing Drums']
            },
            {
              title: 'Agricultural Machines',
              items: ['Grain Feed Mills', 'Silage Processors', 'Dryer Platforms', 'Sorting Drums']
            },
            {
              title: 'Recycling Machinery',
              items: ['Sorting Conveyors', 'Industrial Shredders', 'Baling Presses', 'Trommel Screens']
            },
            {
              title: 'Manufacturing Units',
              items: ['Custom Fixtures', 'Assembly Lines', 'Heavy Machine Frames', 'Skid Bases']
            }
          ].map((cat, idx) => (
            <div
              key={idx}
              className="border p-4 rounded text-xs space-y-2"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div className="font-heading font-bold uppercase tracking-wide text-sm text-[var(--abu-accent)]">
                {cat.title}
              </div>
              <ul className="space-y-1 text-[var(--abu-text-muted)] font-mono text-[11px]">
                {cat.items.map((it, i) => (
                  <li key={i}>• {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* "BUILD YOUR MACHINE" Lead Generator Form */}
        <div
          className="border rounded-lg p-6 sm:p-10 relative overflow-hidden shadow-sm"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              Interactive Machine Proposal Engine
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-1">
              HAVE A MACHINE OR STEELWORK IDEA?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] mt-2">
              Share your operational concept or submit your engineering drawing. Our mechanical engineering and
              fabrication team on Fedha Road, Embakasi will review feasibility and prepare a quotation.
            </p>
          </div>

          {submitted ? (
            <div
              className="p-8 border border-emerald-500 rounded-lg text-center space-y-4 max-w-xl mx-auto"
              style={{ backgroundColor: 'var(--abu-surface)' }}
            >
              <div className="w-12 h-12 bg-emerald-500/15 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Specification Received
              </h4>
              <p className="text-sm text-[var(--abu-text-muted)]">
                Thank you, <span className="text-[var(--abu-text)] font-semibold">{contactName || 'Client'}</span>.
                Your custom requirements for{' '}
                <span className="text-[var(--abu-text)] font-semibold">{industry}</span> in{' '}
                <span className="text-[var(--abu-text)] font-semibold">{county}</span> County have been forwarded
                directly to our engineering desk on {cmsData.siteIdentity.location}.
              </p>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                An {cmsData.siteIdentity.shortName} engineer will contact you at{' '}
                <span className="text-emerald-700 font-bold">{contactPhone}</span> to discuss design parameters.
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-[#0D1B2A] hover:bg-[#16293f] text-white text-xs font-mono rounded cursor-pointer"
              >
                Submit another requirement
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question 1 */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-2">
                  What industry are you in?
                </label>
                <div className="flex flex-wrap gap-2">
                  {industries.map((ind) => (
                    <button
                      type="button"
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                        industry === ind
                          ? 'bg-[var(--abu-accent)] text-white font-bold'
                          : 'text-[var(--abu-text)] border hover:border-[var(--abu-accent)]'
                      }`}
                      style={
                        industry === ind
                          ? undefined
                          : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                      }
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-2">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {needTypes.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setNeedType(t)}
                      className={`px-3 py-1.5 rounded text-xs font-medium cursor-pointer transition-colors ${
                        needType === t
                          ? 'bg-[var(--abu-accent)] text-white font-bold'
                          : 'text-[var(--abu-text)] border hover:border-[var(--abu-accent)]'
                      }`}
                      style={
                        needType === t
                          ? undefined
                          : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                      }
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-2">
                  Describe your requirement (Material, capacity, dimensions, steel grade) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Example: We need a custom structural steel warehouse truss and mezzanine frame or a 40-tonne per hour heavy receiving hopper in Embakasi, Nairobi..."
                  className="w-full border focus:border-[var(--abu-accent)] rounded p-3 text-xs sm:text-sm text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                />
              </div>

              {/* Upload drawing */}
              <div
                className="p-4 border border-dashed rounded-lg"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono uppercase text-[var(--abu-text)] font-bold flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-[var(--abu-accent)]" />
                      <span>Upload Drawing, Photograph or Technical Specification</span>
                    </div>
                    <p className="text-[11px] text-[var(--abu-text-muted)] font-mono">
                      Accepts PDF drawings, CAD (.dwg/.dxf), sketches, photos of existing steelwork or site plates.
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[var(--abu-surface-alt)] text-[var(--abu-text)] border border-[var(--abu-border)] rounded text-xs font-mono cursor-pointer shrink-0">
                    <FileText className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                    <span>{fileName ? 'Replace File' : 'Browse Files'}</span>
                    <input
                      type="file"
                      onChange={handleSimulateFileUpload}
                      className="hidden"
                      accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.zip"
                    />
                  </label>
                </div>
                {fileName && (
                  <div className="mt-2 text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Attached: {fileName}</span>
                  </div>
                )}
              </div>

              {/* Contact & Location Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Project Location (Kenya County)
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2.5 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    {KENYA_COUNTIES.map((c) => (
                      <option key={c} value={c}>
                        {c} County
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Your Name / Company
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Samuel Kimani, Quarry Ops"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
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
                    placeholder="0724 151771"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>
              </div>

              {formError && <div className="text-xs font-mono text-red-600 font-semibold">{formError}</div>}

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white font-heading font-bold text-base uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>SEND TO OUR ENGINEERING TEAM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
