import React, { useState } from 'react';
import { Truck, MapPin, Wrench, ShieldCheck, ArrowRight, Search } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { KENYA_DISPATCH_CORRIDORS, CountyDispatchCorridor } from '../data/industrialData';

interface CountyDispatchSectionProps {
  onBookDispatch: (corridor: CountyDispatchCorridor) => void;
}

export const CountyDispatchSection: React.FC<CountyDispatchSectionProps> = ({
  onBookDispatch
}) => {
  const { getSection } = useCms();
  const section = getSection('county-dispatch');

  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(KENYA_DISPATCH_CORRIDORS[0].id);

  const matchingCorridors = query.trim()
    ? KENYA_DISPATCH_CORRIDORS.filter(
        (c) =>
          c.regionName.toLowerCase().includes(query.toLowerCase()) ||
          c.counties.some((ct) => ct.toLowerCase().includes(query.toLowerCase()))
      )
    : KENYA_DISPATCH_CORRIDORS;

  const activeCorridor =
    KENYA_DISPATCH_CORRIDORS.find((c) => c.id === selectedId) ||
    matchingCorridors[0] ||
    KENYA_DISPATCH_CORRIDORS[0];

  return (
    <section
      id="county-dispatch"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header + Search County Input */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>{section.kicker || 'Nationwide Logistics & Field Crews'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline || 'KENYA COUNTY DELIVERY & MOBILE CREW DISPATCH'}
            </h2>
            <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          <div className="w-full lg:w-80">
            <label className="block text-[10px] font-mono uppercase text-[var(--abu-text-muted)] mb-1">
              Quick Filter by County or Town
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--abu-text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuery(val);
                  const firstMatch = KENYA_DISPATCH_CORRIDORS.find(
                    (c) =>
                      c.regionName.toLowerCase().includes(val.toLowerCase()) ||
                      c.counties.some((ct) => ct.toLowerCase().includes(val.toLowerCase()))
                  );
                  if (firstMatch) setSelectedId(firstMatch.id);
                }}
                placeholder="e.g. Nakuru, Migori, Mombasa..."
                className="w-full pl-9 pr-3 py-2.5 rounded border text-xs text-[var(--abu-text)] focus:outline-none focus:border-[var(--abu-accent)]"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
              />
            </div>
          </div>
        </div>

        {/* Corridor Selector + Active Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Region List */}
          <div className="lg:col-span-5 space-y-2">
            {matchingCorridors.map((corridor) => {
              const isSelected = corridor.id === activeCorridor.id;
              return (
                <button
                  key={corridor.id}
                  type="button"
                  onClick={() => setSelectedId(corridor.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--abu-accent)] shadow-sm'
                      : 'hover:border-[var(--abu-accent)]/60'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--abu-bg)' : 'var(--abu-surface)',
                    borderColor: isSelected ? 'var(--abu-accent)' : 'var(--abu-border)'
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-bold text-sm uppercase text-[var(--abu-text)]">
                      {corridor.regionName}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[var(--abu-accent)] text-white'
                          : 'bg-[#0D1B2A] text-white'
                      }`}
                    >
                      {corridor.transitTime}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--abu-text-muted)] mt-1 truncate">
                    {corridor.counties.join(' · ')}
                  </div>
                </button>
              );
            })}

            {matchingCorridors.length === 0 && (
              <div
                className="p-4 border rounded-lg text-xs font-mono text-[var(--abu-text-muted)]"
                style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
              >
                All 47 Kenyan counties and East African corridors are served from Fedha Road. Select a corridor or request custom low-loader logistics below.
              </div>
            )}
          </div>

          {/* Right: Active Dispatch Specification Panel */}
          <div
            className="lg:col-span-7 border rounded-lg p-6 sm:p-8 space-y-6 shadow-sm"
            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--abu-border)' }}>
              <div>
                <div className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  DISPATCH ORIGIN: FEDHA ROAD, EMBAKASI, NAIROBI
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-1">
                  {activeCorridor.regionName}
                </h3>
              </div>
              <div className="px-3 py-1.5 rounded bg-[#0D1B2A] text-white text-xs font-mono font-bold">
                {activeCorridor.transitTime}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div
                className="p-4 rounded border space-y-1"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="font-mono uppercase text-[10px] text-[var(--abu-text-muted)] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                  <span>Haulage &amp; Offloading Class</span>
                </div>
                <div className="font-bold text-[var(--abu-text)]">{activeCorridor.vehicleClass}</div>
              </div>

              <div
                className="p-4 rounded border space-y-1"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="font-mono uppercase text-[10px] text-[var(--abu-text-muted)] flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                  <span>Mobile Field Crew Turnaround</span>
                </div>
                <div className="font-bold text-[var(--abu-text)]">{activeCorridor.mobileCrewSla}</div>
              </div>
            </div>

            <div
              className="p-4 rounded border flex items-start gap-2.5 text-xs"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono uppercase text-[10px] text-[var(--abu-text-muted)] font-bold block">
                  Recommended Climate Coating Specification:
                </span>
                <span className="font-bold text-[var(--abu-text)]">
                  {activeCorridor.coatingRecommendation}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-[var(--abu-text-muted)]">
                Corridor Logistics &amp; Erection Highlights:
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--abu-text)]">
                {activeCorridor.highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t" style={{ borderColor: 'var(--abu-border)' }}>
              <div className="text-[11px] font-mono text-[var(--abu-text-muted)]">
                Counties covered: <strong className="text-[var(--abu-text)]">{activeCorridor.counties.join(', ')}</strong>
              </div>
              <button
                type="button"
                onClick={() => onBookDispatch(activeCorridor)}
                className="px-5 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              >
                <span>Quote Delivery &amp; Site Crew</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
