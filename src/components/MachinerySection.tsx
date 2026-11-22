import React, { useState, useMemo } from 'react';
import { Search, Eye, Wrench } from 'lucide-react';
import { MachineProduct } from '../data/industrialData';
import { useCms } from '../context/CmsContext';
import { MachineDetailModal } from './MachineDetailModal';

interface MachinerySectionProps {
  onRequestQuoteForMachine: (machineName: string) => void;
}

export const MachinerySection: React.FC<MachinerySectionProps> = ({ onRequestQuoteForMachine }) => {
  const { cmsData, getSection } = useCms();
  const section = getSection('machinery');

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMachine, setSelectedMachine] = useState<MachineProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'crushing', label: 'Crushing Equipment' },
    { id: 'screening', label: 'Screening Equipment' },
    { id: 'handling', label: 'Material Handling' },
    { id: 'mining-custom', label: 'Mining & Custom' }
  ];

  const subSections = [
    {
      id: 'crushing',
      title: 'Crushing Equipment',
      subtitle: 'Primary jaw, secondary/tertiary hydraulic cone, and rotor impact crushers',
      matches: (cat: MachineProduct['category']) => cat === 'crushing'
    },
    {
      id: 'screening',
      title: 'Screening Equipment',
      subtitle: 'Multi-deck inclined vibrating screens and rotary trommel scrubbers',
      matches: (cat: MachineProduct['category']) => cat === 'screening'
    },
    {
      id: 'handling',
      title: 'Material Handling',
      subtitle: 'Industrial troughed belt conveyor systems, receiving hoppers, and chutes',
      matches: (cat: MachineProduct['category']) => cat === 'handling'
    },
    {
      id: 'mining-custom',
      title: 'Mining & Custom',
      subtitle: 'Continuous mineral ball mills and custom commercial hammer mills & mixers',
      matches: (cat: MachineProduct['category']) => cat === 'mining' || cat === 'custom'
    }
  ];

  const filteredMachines = useMemo(() => {
    return cmsData.machinery.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' ||
        (activeCategory === 'mining-custom'
          ? item.category === 'mining' || item.category === 'custom'
          : item.category === activeCategory);
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.applications.some((app) => app.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [cmsData.machinery, activeCategory, searchQuery]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallbackApplied === 'true') return;
    const match = img.src.match(/\/assets\/images\/[^/?#]+/);
    if (match) {
      img.dataset.fallbackApplied = 'true';
      img.src = match[0];
    }
  };

  const renderMachineCard = (machine: MachineProduct) => (
    <div
      key={machine.id}
      className="border rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[var(--abu-accent)] transition-colors shadow-sm"
      style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1B2A]">
          <img
            src={machine.image}
            alt={machine.name}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 bg-[#0D1B2A]/90 backdrop-blur-sm px-2.5 py-1 rounded border border-white/15 text-[10px] font-mono text-[var(--abu-amber)] uppercase font-bold">
            {machine.category === 'mining' || machine.category === 'custom'
              ? 'Mining & Custom'
              : machine.category}
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div>
            <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase group-hover:text-[var(--abu-accent)] transition-colors">
              {machine.name}
            </h3>
            <p className="text-xs font-mono text-[var(--abu-text-muted)] mt-1 line-clamp-1">
              {machine.tagline}
            </p>
          </div>

          <p className="text-xs text-[var(--abu-text-muted)] line-clamp-3 leading-relaxed">
            {machine.description}
          </p>

          <div
            className="grid grid-cols-2 gap-2 pt-2 border-t text-[11px] font-mono"
            style={{ borderColor: 'var(--abu-border)' }}
          >
            <div>
              <span className="text-[var(--abu-text-muted)] block">Capacity:</span>
              <span className="text-[var(--abu-text)] font-bold">{machine.capacityRange}</span>
            </div>
            <div>
              <span className="text-[var(--abu-text-muted)] block">Feed Size:</span>
              <span className="text-[var(--abu-text)] font-bold">{machine.feedSizeMax}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-5 pt-3 border-t mt-2 flex items-center justify-between gap-2"
        style={{ borderColor: 'var(--abu-border)' }}
      >
        <button
          onClick={() => setSelectedMachine(machine)}
          className="flex-1 py-2 px-3 bg-white hover:bg-[var(--abu-surface-alt)] text-[var(--abu-text)] border border-[var(--abu-border)] rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
          <span>View Full Specs</span>
        </button>

        <button
          onClick={() => onRequestQuoteForMachine(machine.name)}
          className="py-2 px-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Quote</span>
        </button>
      </div>
    </div>
  );

  const visibleSubSections = subSections
    .filter((sub) => activeCategory === 'all' || sub.id === activeCategory)
    .map((sub) => ({
      ...sub,
      items: filteredMachines.filter((m) => sub.matches(m.category))
    }))
    .filter((sub) => sub.items.length > 0);

  return (
    <section
      id="machinery"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker} · {cmsData.siteIdentity.shortName}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[var(--abu-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search machinery, models, uses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border focus:border-[var(--abu-accent)] rounded pl-9 pr-3 py-2 text-xs text-[var(--abu-text)] placeholder-slate-400 focus:outline-none"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded text-xs font-medium font-sans transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[var(--abu-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--abu-text)] hover:border-[var(--abu-accent)] border'
                }`}
                style={
                  isActive
                    ? undefined
                    : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sub-Sectioned Product Cards Grid */}
        <div className="space-y-12">
          {visibleSubSections.map((sub) => (
            <div key={sub.id} className="space-y-5">
              <div
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-[var(--abu-text-muted)] mt-0.5">{sub.subtitle}</p>
                </div>
                <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  {sub.items.length} {sub.items.length === 1 ? 'Model' : 'Models'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sub.items.map(renderMachineCard)}
              </div>
            </div>
          ))}
        </div>

        {filteredMachines.length === 0 && (
          <div
            className="text-center py-16 border rounded-lg"
            style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
          >
            <p className="text-sm font-mono text-[var(--abu-text-muted)]">
              No equipment found matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-mono text-[var(--abu-accent)] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {selectedMachine && (
        <MachineDetailModal
          machine={selectedMachine}
          onClose={() => setSelectedMachine(null)}
          onRequestQuote={onRequestQuoteForMachine}
        />
      )}
    </section>
  );
};
