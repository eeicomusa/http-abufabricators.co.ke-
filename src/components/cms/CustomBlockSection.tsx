import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionBlockConfig } from '../../data/industrialData';
import { useCms } from '../../context/CmsContext';

interface CustomBlockSectionProps {
  section: SectionBlockConfig;
  onActionClick: () => void;
}

export const CustomBlockSection: React.FC<CustomBlockSectionProps> = ({
  section,
  onActionClick
}) => {
  const { resolveMediaUrl } = useCms();
  const hasVisuals = Boolean(section.imagePrimary || section.imageSecondary || section.videoUrl);

  return (
    <section
      id={section.id}
      className="py-16 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 ${
            hasVisuals ? 'lg:grid-cols-12 gap-10 items-center' : 'max-w-4xl'
          }`}
        >
          <div className={`${hasVisuals ? 'lg:col-span-6' : ''} space-y-4`}>
            {section.kicker && (
              <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                {section.kicker}
              </div>
            )}
            {section.headline && (
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
                {section.headline}
              </h2>
            )}
            {section.subheadline && (
              <p className="text-base sm:text-lg font-medium text-[var(--abu-text)]">
                {section.subheadline}
              </p>
            )}
            {section.body && (
              <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            )}
            {section.primaryCta && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onActionClick}
                  className="px-6 py-3 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded font-heading font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>{section.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {hasVisuals && (
            <div className="lg:col-span-6 space-y-4">
              {section.videoUrl && (
                <div className="rounded-lg overflow-hidden bg-black border border-[var(--abu-border)] aspect-video shadow-sm">
                  <video
                    src={resolveMediaUrl(section.videoUrl)}
                    poster={section.imagePrimary}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {(section.imagePrimary || section.imageSecondary) && !section.videoUrl && (
                <div
                  className={`grid gap-3 ${
                    section.imagePrimary && section.imageSecondary ? 'grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {section.imagePrimary && (
                    <div className="rounded-lg overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)] shadow-sm">
                      <img
                        src={section.imagePrimary}
                        alt={section.headline || section.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  {section.imageSecondary && (
                    <div className="rounded-lg overflow-hidden aspect-[4/3] bg-[#0D1B2A] border border-[var(--abu-border)] shadow-sm">
                      <img
                        src={section.imageSecondary}
                        alt={section.headline || section.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
