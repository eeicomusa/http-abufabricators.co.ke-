import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, UploadCloud, FileText, Check, MessageSquare } from 'lucide-react';
import { SPARE_PARTS_LIST, KENYA_COUNTIES, GENERATED_MEDIA } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

export const SparePartsSection: React.FC = () => {
  const { cmsData, getSection } = useCms();
  const section = getSection('spare-parts');

  const [machineType, setMachineType] = useState<string>('Jaw Crusher');
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [partRequired, setPartRequired] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [county, setCounty] = useState<string>('Nairobi');
  const [phone, setPhone] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partRequired.trim() || !phone.trim()) {
      setFormError('Please specify the part required and your contact phone.');
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const whatsappText = `Hello ${cmsData.siteIdentity.companyName}, I need a spare part quote for: Machine: ${machineType}, Brand: ${
    brand || 'Any'
  }, Model: ${model || 'N/A'}, Part: ${partRequired}, Qty: ${quantity}, Location: ${county} County.`;
  const whatsappHref = `https://wa.me/${cmsData.siteIdentity.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section
      id="spare-parts"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
            {section.kicker || 'Wear Parts & Component Replacement'}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline || "DON'T LET A FAILED COMPONENT STOP PRODUCTION"}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
        </div>

        {/* Wear Parts & Fabrication Visual Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg overflow-hidden aspect-[16/9] bg-[#0D1B2A] border border-[var(--abu-border)] relative shadow-sm group">
            <img
              src={section.imagePrimary || GENERATED_MEDIA.wearSpareParts}
              alt="Manganese jaw crusher plates, cone mantles, conveyor rollers, and spherical bearings in Nairobi parts store"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                IN-STOCK WEAR METALLURGY · NAIROBI
              </div>
              <div className="text-sm font-heading font-bold text-white uppercase">
                Manganese Jaw Plates, Cone Mantles, Conveyor Rollers &amp; Bearings
              </div>
            </div>
          </div>

          <div className="rounded-lg overflow-hidden aspect-[16/9] bg-[#0D1B2A] border border-[var(--abu-border)] relative shadow-sm group">
            <img
              src={section.imageSecondary || GENERATED_MEDIA.fabricationWorkshop}
              alt="Custom steel part welding and machining workshop on Fedha Road, Embakasi"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-[10px] font-mono uppercase text-[var(--abu-amber)] font-bold">
                FEDHA ROAD CUSTOM FABRICATION BAY
              </div>
              <div className="text-sm font-heading font-bold text-white uppercase">
                Custom Shaft Machining, Crusher Liners &amp; Screen Mesh Frames
              </div>
            </div>
          </div>
        </div>

        {/* 3 Spare Parts Inventory Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPARE_PARTS_LIST.map((cat, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <h3
                className="text-lg font-bold font-heading uppercase border-b pb-2 text-[var(--abu-accent)]"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                {cat.category}
              </h3>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <div
                    key={i}
                    className="text-xs space-y-1 p-2.5 rounded border"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    <div className="font-bold text-[var(--abu-text)] flex items-center justify-between gap-2">
                      <span>{item.name}</span>
                      <span className="text-[10px] font-mono text-[var(--abu-accent)] shrink-0">
                        {item.leadTime}
                      </span>
                    </div>
                    <div className="text-[11px] text-[var(--abu-text-muted)] font-mono">{item.spec}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* REQUEST A SPARE PART Form Container */}
        <div
          className="border rounded-lg p-6 sm:p-10 shadow-sm"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b"
            style={{ borderColor: 'var(--abu-border)' }}
          >
            <div>
              <span className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                Fast-Track Replacement Service
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-0.5">
                REQUEST A SPARE PART
              </h3>
            </div>
            <div className="text-xs font-mono text-[var(--abu-text-muted)]">
              Need parts today? Call{' '}
              <span className="text-[var(--abu-text)] font-bold">{cmsData.siteIdentity.phoneDisplay}</span>
            </div>
          </div>

          {submitted ? (
            <div
              className="p-8 border border-emerald-500 rounded text-center space-y-4 max-w-lg mx-auto"
              style={{ backgroundColor: 'var(--abu-surface)' }}
            >
              <div className="w-12 h-12 bg-emerald-500/15 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase">
                Spare Part Request Logged
              </h4>
              <p className="text-sm text-[var(--abu-text-muted)]">
                Our parts store at {cmsData.siteIdentity.location} workshop has received your request for: <br />
                <span className="text-[var(--abu-text)] font-semibold">
                  {partRequired} ({quantity} units)
                </span>{' '}
                for your {machineType} in {county} County.
              </p>
              <div className="text-xs font-mono text-[var(--abu-text-muted)]">
                We will check in-stock inventory or foundry patterns and call you at{' '}
                <span className="text-emerald-700 font-bold">{phone}</span> shortly.
              </div>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-[#0D1B2A] text-white text-xs font-mono rounded cursor-pointer"
                >
                  Submit another part
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#22c55e] text-white text-xs font-mono font-bold rounded flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Also WhatsApp This Request</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Machine Category *
                  </label>
                  <select
                    value={machineType}
                    onChange={(e) => setMachineType(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2.5 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  >
                    <option value="Jaw Crusher">Jaw Crusher</option>
                    <option value="Cone Crusher">Cone Crusher</option>
                    <option value="Impact Crusher">Impact Crusher</option>
                    <option value="Vibrating Screen">Vibrating Screen</option>
                    <option value="Conveyor System">Belt Conveyor</option>
                    <option value="Ball Mill / Grinding">Ball Mill / Grinder</option>
                    <option value="Hammer Mill">Hammer Mill</option>
                    <option value="Trommel Screen">Trommel Screen</option>
                    <option value="Custom Machine">Custom Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Machine Brand (Metso, Sandvik, Shanbao, etc.)
                  </label>
                  <input
                    type="text"
                    placeholder={`e.g. ${cmsData.siteIdentity.shortName} / Metso / Shanbao`}
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Machine Model Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PE-600x900 or CH430"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Part Required & Dimensions *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fixed Jaw Plate, Manganese 18%, or 127mm Troughing Idler Roller"
                    value={partRequired}
                    onChange={(e) => setPartRequired(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Quantity Required
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>
              </div>

              {/* Photo Upload & Plate Upload */}
              <div
                className="p-4 border border-dashed rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono uppercase text-[var(--abu-text)] font-bold flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-[var(--abu-accent)]" />
                    <span>Upload Part Photo or Machine Serial Plate</span>
                  </div>
                  <p className="text-[11px] font-mono text-[var(--abu-text-muted)]">
                    A photo of the worn part or the manufacturer nameplate ensures 100% bolt-hole accuracy.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-[var(--abu-surface-alt)] text-[var(--abu-text)] border border-[var(--abu-border)] rounded text-xs font-mono cursor-pointer shrink-0">
                  <FileText className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                  <span>{photoName ? 'Replace Photo' : 'Select Photo'}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setPhotoName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
              {photoName && (
                <div className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Image attached: {photoName}</span>
                </div>
              )}

              {/* Location & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Delivery Destination (County in Kenya)
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
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0724 151771"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded p-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                  />
                </div>
              </div>

              {formError && <div className="text-xs font-mono text-red-600 font-semibold">{formError}</div>}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white font-heading font-bold text-sm uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>SUBMIT SPARE PART REQUEST</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-[#0D1B2A] hover:bg-[#16293f] text-white font-heading font-bold text-sm uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#22c55e]" />
                  <span>WHATSAPP THIS INQUIRY</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
