import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  Check,
  Send,
  ExternalLink,
  Clock,
  Calendar
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { WorkshopLocationMap } from './WorkshopLocationMap';

interface ContactSectionProps {
  onOpenDetailedSpecModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenDetailedSpecModal }) => {
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('Structural Steel Fabrication');
  const [contactNotes, setContactNotes] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Workshop Visit & Inspection Scheduler state
  const [visitPurpose, setVisitPurpose] = useState('Inspect Steelwork & Machine Fabrication');
  const [visitDate, setVisitDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().slice(0, 10);
  });
  const [visitSlot, setVisitSlot] = useState('10:30 AM');
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitBooked, setVisitBooked] = useState(false);

  const whatsappUrl = `https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteIdentity.companyName}, I am ready to start a fabrication project and would like a free consultation and quotation.`
  )}`;

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Fedha Road, Embakasi, Nairobi, Kenya'
  )}`;

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      setContactError('Please enter your name and phone / WhatsApp number.');
      return;
    }
    setContactError('');
    setContactSubmitted(true);
  };

  const quickInquiryWhatsapp = `https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteIdentity.companyName},\nName: ${contactName}\nPhone: ${contactPhone}\nService: ${contactService}\nDetails: ${
      contactNotes || 'Requesting a free consultation and quotation.'
    }`
  )}`;

  return (
    <section
      id="contact"
      className="py-16 sm:py-20"
      style={{ backgroundColor: 'var(--abu-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Direct Contact Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            className="border rounded-lg p-6 space-y-2 shadow-xs"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
              <MapPin className="w-4 h-4" />
              <span>Workshop Address</span>
            </div>
            <div className="text-base font-heading font-bold text-[var(--abu-text)]">
              {siteIdentity.address}
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[var(--abu-accent)] hover:underline pt-1"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div
            className="border rounded-lg p-6 space-y-2 shadow-xs"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
              <Phone className="w-4 h-4" />
              <span>Call or WhatsApp Direct</span>
            </div>
            <a
              href={`tel:${siteIdentity.phoneRaw}`}
              className="block text-2xl font-extrabold font-mono text-[var(--abu-text)] hover:text-[var(--abu-accent)] transition-colors"
            >
              {siteIdentity.phoneDisplay}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

          <div
            className="border rounded-lg p-6 space-y-2 shadow-xs"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
              <Clock className="w-4 h-4" />
              <span>Hours &amp; Online</span>
            </div>
            <div className="text-sm font-semibold text-[var(--abu-text)]">{siteIdentity.workingHours}</div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--abu-text-muted)]">
              <Mail className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
              <span className="truncate">{siteIdentity.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--abu-text-muted)]">
              <Globe className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
              <span className="truncate">{cmsData.seo.canonicalUrl}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Interactive Grid: Short Inquiry Form + Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Short Direct Inquiry Form */}
          <div
            className="lg:col-span-6 border rounded-lg p-6 sm:p-8 shadow-sm flex flex-col justify-between"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            {contactSubmitted ? (
              <div className="my-auto p-6 bg-emerald-50/70 border border-emerald-300 rounded-lg text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[var(--abu-text)] uppercase">
                  Inquiry Ready to Send
                </h3>
                <p className="text-sm text-[var(--abu-text-muted)]">
                  Thank you, <span className="font-semibold text-[var(--abu-text)]">{contactName}</span>. Our team at{' '}
                  {siteIdentity.address} has prepared your request for{' '}
                  <span className="font-semibold text-[var(--abu-text)]">{contactService}</span>.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={quickInquiryWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-mono font-bold uppercase flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp ({siteIdentity.phoneDisplay})</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactPhone('');
                      setContactNotes('');
                    }}
                    className="px-4 py-2.5 border rounded text-xs font-mono font-semibold text-[var(--abu-text)] cursor-pointer"
                    style={{ borderColor: 'var(--abu-border)', backgroundColor: 'var(--abu-bg)' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickInquiry} className="space-y-4">
                <div className="border-b pb-3" style={{ borderColor: 'var(--abu-border)' }}>
                  <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                    FAST QUOTATION DESK
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-[var(--abu-text)] uppercase mt-0.5">
                    Send a Project Inquiry
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Kamau"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full border focus:border-[var(--abu-accent)] rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:outline-none"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0724 151771"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full border focus:border-[var(--abu-accent)] rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:outline-none"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Required Service
                  </label>
                  <select
                    value={contactService}
                    onChange={(e) => setContactService(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    <option value="Structural Steel Fabrication">Structural Steel Fabrication</option>
                    <option value="Custom Metal Fabrication">Custom Metal Fabrication</option>
                    <option value="Industrial Welding Services">Industrial Welding Services</option>
                    <option value="Steel Frameworks & Structures">Steel Frameworks &amp; Structures</option>
                    <option value="Fabrication Support Services">Fabrication Support Services</option>
                    <option value="Industrial Machinery & Repairs">Industrial Machinery &amp; Repairs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                    Project Brief &amp; Location
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe dimensions, steelwork scope, warehouse size, or site location..."
                    value={contactNotes}
                    onChange={(e) => setContactNotes(e.target.value)}
                    className="w-full border focus:border-[var(--abu-accent)] rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:outline-none"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  />
                </div>

                {contactError && (
                  <div className="text-xs font-mono text-red-600 font-semibold">{contactError}</div>
                )}

                <div className="pt-1 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Free Quote Request</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenDetailedSpecModal}
                    className="py-3 px-4 border rounded font-heading font-bold text-xs uppercase tracking-wider text-[var(--abu-text)] hover:border-[var(--abu-accent)] transition-colors cursor-pointer"
                    style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                  >
                    Attach Drawings
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Interactive Fedha Road Map */}
          <div className="lg:col-span-6">
            <WorkshopLocationMap />
          </div>
        </div>

        {/* Workshop Visit & Inspection Scheduler */}
        <div
          className="border rounded-lg p-6 sm:p-8 shadow-sm space-y-6"
          style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--abu-border)' }}>
            <div>
              <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>BOOK A FEDHA ROAD WORKSHOP VISIT</span>
              </span>
              <h2 className="text-2xl font-heading font-bold text-[var(--abu-text)] uppercase mt-1">
                Schedule Fabrication Inspection or Machine Trial Run
              </h2>
              <p className="text-xs sm:text-sm text-[var(--abu-text-muted)] mt-1">
                Visit our workshop opposite Nairobi Gospel Church to verify steel grades, review drawings with our lead engineer, or witness a machine test run.
              </p>
            </div>
            <div className="text-xs font-mono text-[var(--abu-text-muted)] shrink-0">
              {siteIdentity.workingHours}
            </div>
          </div>

          {visitBooked ? (
            <div className="p-6 bg-emerald-50/70 border border-emerald-300 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase font-bold text-emerald-700 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Workshop Visit Scheduled</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-[var(--abu-text)] uppercase">
                  {visitorName} · {visitDate} at {visitSlot}
                </h3>
                <p className="text-xs text-[var(--abu-text-muted)] font-mono">
                  Purpose: {visitPurpose} · Tel: {visitorPhone}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <a
                  href={`https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${siteIdentity.companyName}, I would like to confirm my Fedha Road workshop visit:\nName: ${visitorName}\nPhone: ${visitorPhone}\nDate: ${visitDate} at ${visitSlot}\nPurpose: ${visitPurpose}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Confirm via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setVisitBooked(false)}
                  className="px-4 py-2.5 border rounded text-xs font-mono font-semibold text-[var(--abu-text)] cursor-pointer"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                >
                  Reschedule
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!visitorName.trim() || !visitorPhone.trim()) return;
                setVisitBooked(true);
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
            >
              <div className="lg:col-span-2">
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Visit Purpose
                </label>
                <select
                  value={visitPurpose}
                  onChange={(e) => setVisitPurpose(e.target.value)}
                  className="w-full border rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:border-[var(--abu-accent)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                >
                  <option value="Inspect Steelwork & Machine Fabrication">
                    Inspect Steelwork &amp; Machine Fabrication
                  </option>
                  <option value="Discuss Structural Drawings & Quotation">
                    Discuss Structural Drawings &amp; Quotation
                  </option>
                  <option value="Witness Live Crusher / Mill Trial Run">
                    Witness Live Crusher / Mill Trial Run
                  </option>
                  <option value="Source Spare Parts / Crusher Liners">
                    Source Spare Parts / Crusher Liners
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:border-[var(--abu-accent)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Time Slot (EAT)
                </label>
                <select
                  value={visitSlot}
                  onChange={(e) => setVisitSlot(e.target.value)}
                  className="w-full border rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:border-[var(--abu-accent)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                >
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full border rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:border-[var(--abu-accent)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-mono uppercase text-[var(--abu-text-muted)] font-bold mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0724 151771"
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                  className="w-full border rounded px-3 py-2.5 text-sm text-[var(--abu-text)] focus:border-[var(--abu-accent)] focus:outline-none"
                  style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Workshop Visit</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
