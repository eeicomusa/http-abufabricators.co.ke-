import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, X, CheckCircle2 } from 'lucide-react';
import { SeoArticle } from '../data/industrialData';
import { useCms } from '../context/CmsContext';

export const SeoArticlesHub: React.FC = () => {
  const { cmsData, getSection } = useCms();
  const section = getSection('seo-guides');
  const [selectedArticle, setSelectedArticle] = useState<SeoArticle | null>(null);

  return (
    <section
      id="seo-guides"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--abu-accent)]" />
            <span>{section.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
            {section.headline}
          </h2>
          <p className="text-base text-[var(--abu-text-muted)] leading-relaxed">
            {section.body}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cmsData.articles.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-6 flex flex-col justify-between hover:border-[var(--abu-accent)]/60 transition-colors group shadow-xs"
              style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--abu-text-muted)]">
                  <span className="text-[var(--abu-accent)] font-semibold">{article.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--abu-text-muted)]" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-heading text-[var(--abu-text)] uppercase group-hover:text-[var(--abu-accent)] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-[var(--abu-text-muted)] leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                {article.keyTakeaways[0] && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase text-[var(--abu-text-muted)] block mb-1">
                      Key Engineering Focus:
                    </span>
                    <div className="text-[11px] font-mono text-[var(--abu-text)] line-clamp-2">
                      {article.keyTakeaways[0]}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--abu-border)' }}>
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="w-full py-2.5 border rounded text-xs font-mono font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:border-[var(--abu-accent)]"
                  style={{
                    backgroundColor: 'var(--abu-surface)',
                    borderColor: 'var(--abu-border)',
                    color: 'var(--abu-text)'
                  }}
                >
                  <span>Read Technical Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div
            className="relative w-full max-w-3xl border rounded-lg shadow-2xl my-8 overflow-hidden max-h-[85vh] flex flex-col"
            style={{
              backgroundColor: 'var(--abu-bg)',
              borderColor: 'var(--abu-border)',
              color: 'var(--abu-text)'
            }}
          >
            <div
              className="p-5 border-b flex items-center justify-between"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                  {selectedArticle.category} · {selectedArticle.readTime}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--abu-text)] uppercase mt-0.5">
                  {selectedArticle.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 text-[var(--abu-text-muted)] hover:text-[var(--abu-text)] rounded border cursor-pointer"
                style={{ borderColor: 'var(--abu-border)', backgroundColor: 'var(--abu-bg)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {selectedArticle.keyTakeaways.length > 0 && (
                <div
                  className="p-4 border rounded space-y-3"
                  style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
                >
                  <div className="text-xs font-mono uppercase text-[var(--abu-accent)] font-bold">
                    Key Takeaways for Project & Plant Managers:
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--abu-text)]">
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--abu-accent)] mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4 text-sm text-[var(--abu-text-muted)] leading-relaxed font-sans">
                <p>{selectedArticle.fullBody}</p>
                <p>
                  At {cmsData.siteIdentity.companyName}, our engineering team evaluates site conditions,
                  structural loads, and project tolerances before releasing fabrication blueprints. Based on{' '}
                  {cmsData.siteIdentity.address}, we combine proven engineering standards with immediate local support across Kenya.
                </p>
              </div>
            </div>

            <div
              className="p-4 border-t flex justify-end"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
