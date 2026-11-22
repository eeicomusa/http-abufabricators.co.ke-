import React, { useState } from 'react';
import {
  ChevronDown,
  ShieldCheck,
  Clock,
  Truck,
  CreditCard,
  MessageSquare,
  Pencil
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface FaqSectionProps {
  onRequestQuote: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onRequestQuote }) => {
  const { cmsData, getSection, isEditorOpen, openWithTab } = useCms();
  const { faqs, siteIdentity } = cmsData;
  const section = getSection('faq');

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string>(faqs[0]?.id || '');

  const categories = [
    'all',
    'Lead Times',
    'Warranty & Quality',
    'Delivery & Site Work',
    'Pricing & Terms'
  ];

  const filteredFaqs =
    selectedCategory === 'all'
      ? faqs
      : faqs.filter((item) => item.category === selectedCategory);

  const guarantees = [
    {
      icon: Clock,
      title: '7–18 Days Standard Build',
      desc: 'Fast turnaround on structural trusses, hoppers, chutes & custom frames.'
    },
    {
      icon: ShieldCheck,
      title: '12-Month Workmanship Warranty',
      desc: 'Structural integrity guarantee on weldments & custom machine frames.'
    },
    {
      icon: Truck,
      title: 'All 47 Kenyan Counties',
      desc: 'Flatbed & crane delivery with on-site alignment & commissioning.'
    },
    {
      icon: CreditCard,
      title: 'Milestone Billing Clarity',
      desc: 'Inspect steel gauges & witness live trial runs before final handover.'
    }
  ];

  return (
    <section
      id="faq"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker || 'Pre-Project Answers & Guarantees'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'FREQUENTLY ASKED QUESTIONS, WARRANTY & LEAD TIMES'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">
              {section.body}
            </p>
          </div>

          {isEditorOpen && (
            <button
              type="button"
              onClick={() => openWithTab('catalog')}
              className="px-4 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit FAQs in CMS</span>
            </button>
          )}
        </div>

        {/* 4 Warranty / Lead-Time Key Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={i}
                className="p-4 border rounded-lg space-y-1.5 shadow-xs"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
              >
                <div className="flex items-center gap-2 text-[var(--abu-accent)] font-heading font-bold text-sm uppercase">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{g.title}</span>
                </div>
                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded text-xs font-mono font-semibold uppercase transition-colors cursor-pointer ${
                  active
                    ? 'bg-[var(--abu-accent)] text-white shadow-xs'
                    : 'border text-[var(--abu-text)] hover:border-[var(--abu-accent)]'
                }`}
                style={
                  active
                    ? undefined
                    : { backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }
                }
              >
                {cat === 'all' ? 'All Buyer Questions' : cat}
              </button>
            );
          })}
        </div>

        {/* Expandable Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border rounded-lg overflow-hidden transition-colors"
                style={{
                  backgroundColor: 'var(--abu-bg)',
                  borderColor: isOpen ? 'var(--abu-accent)' : 'var(--abu-border)'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="inline-block text-[10px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-heading font-bold text-[var(--abu-text)] uppercase">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[var(--abu-accent)] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[var(--abu-text-muted)] leading-relaxed border-t"
                    style={{ borderColor: 'var(--abu-border)' }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Direct Answer Bar */}
        <div
          className="p-6 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div>
            <div className="text-sm font-heading font-bold uppercase text-[var(--abu-text)]">
              Have a custom drawing or urgent site schedule?
            </div>
            <p className="text-xs text-[var(--abu-text-muted)]">
              Speak directly with our Embakasi engineering desk for lead-time confirmation today.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={`https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
                `Hello ${siteIdentity.companyName}, I have a question regarding lead times and fabrication requirements.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp {siteIdentity.phoneDisplay}</span>
            </a>
            <button
              type="button"
              onClick={onRequestQuote}
              className="px-4 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
