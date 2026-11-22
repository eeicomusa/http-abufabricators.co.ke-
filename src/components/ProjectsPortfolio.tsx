import React, { useState } from 'react';
import { MapPin, Wrench, CheckCircle2, Film, Plus, Expand, Images } from 'lucide-react';
import { CaseProject } from '../data/industrialData';
import { useCms } from '../context/CmsContext';
import { ProjectGalleryModal, GalleryLightboxPayload } from './ProjectGalleryModal';

interface ProjectsPortfolioProps {
  onDiscussSimilarProject: (project: CaseProject) => void;
}

export const ProjectsPortfolio: React.FC<ProjectsPortfolioProps> = ({ onDiscussSimilarProject }) => {
  const { cmsData, getSection, isEditorOpen, openWithTab, resolveMediaUrl } = useCms();
  const section = getSection('projects');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [activeGallery, setActiveGallery] = useState<{
    payload: GalleryLightboxPayload;
    project: CaseProject;
  } | null>(null);

  const industries = [
    { id: 'all', label: 'All Projects' },
    { id: 'Quarrying & Aggregates', label: 'Quarrying' },
    { id: 'Mining', label: 'Mining Solutions' },
    { id: 'Manufacturing', label: 'Manufacturing & Fabrication' },
    { id: 'Agriculture', label: 'Agriculture & Milling' },
    { id: 'Structural Steel', label: 'Structural Steelwork' },
    { id: 'videos', label: 'Project Videos' }
  ];

  const filteredProjects = cmsData.projects.filter((proj) => {
    if (filterIndustry === 'all') return true;
    if (filterIndustry === 'videos') return Boolean(proj.videoUrl);
    return proj.clientIndustry.toLowerCase().includes(filterIndustry.toLowerCase());
  });

  return (
    <section
      id="projects"
      className="py-20 border-b"
      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b"
          style={{ borderColor: 'var(--abu-border)' }}
        >
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
              {section.kicker}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-[var(--abu-text)] uppercase tracking-tight">
              {section.headline}
            </h2>
            <p className="text-sm sm:text-base text-[var(--abu-text-muted)] leading-relaxed">{section.body}</p>
          </div>

          {isEditorOpen && (
            <button
              type="button"
              onClick={() => openWithTab('catalog')}
              className="px-4 py-2.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-mono font-bold uppercase flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add / Manage Portfolio (CMS)</span>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {industries.map((ind) => {
            const isSelected = filterIndustry === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setFilterIndustry(ind.id)}
                className={`px-4 py-2 rounded text-xs font-medium font-sans transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[var(--abu-accent)] text-white font-bold shadow-sm'
                    : 'text-[var(--abu-text)] hover:border-[var(--abu-accent)] border'
                }`}
                style={
                  isSelected
                    ? undefined
                    : { backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }
                }
              >
                {ind.id === 'videos' && <Film className="w-3.5 h-3.5" />}
                <span>{ind.label}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="border rounded-lg overflow-hidden flex flex-col justify-between group hover:border-[var(--abu-accent)] transition-colors shadow-sm"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-[#0D1B2A]">
                  {proj.videoUrl ? (
                    <video
                      src={resolveMediaUrl(proj.videoUrl)}
                      poster={proj.image}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const imgs = Array.from(
                          new Set([proj.image, ...(proj.gallery || [])].filter(Boolean))
                        );
                        setActiveGallery({
                          project: proj,
                          payload: {
                            title: proj.title,
                            location: proj.location,
                            images: imgs
                          }
                        });
                      }}
                      className="w-full h-full block relative cursor-zoom-in text-left"
                      title="Open Lightbox & Before/After Progress Gallery"
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  )}

                  {!proj.videoUrl && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  )}

                  <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
                    <span className="bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                      {proj.videoUrl && <Film className="w-3 h-3" />}
                      <span>{proj.badge || 'COMPLETED PROJECT'}</span>
                    </span>
                    <span className="bg-[#0D1B2A]/90 backdrop-blur-sm text-white text-[10px] font-mono px-2.5 py-1 rounded border border-white/15 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[var(--abu-amber)]" />
                      <span>{proj.location}</span>
                    </span>
                  </div>

                  {!proj.videoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        const imgs = Array.from(
                          new Set([proj.image, ...(proj.gallery || [])].filter(Boolean))
                        );
                        setActiveGallery({
                          project: proj,
                          payload: {
                            title: proj.title,
                            location: proj.location,
                            images: imgs
                          }
                        });
                      }}
                      className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/75 hover:bg-[var(--abu-accent)] text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/20 transition-colors cursor-pointer"
                    >
                      {proj.gallery && proj.gallery.length > 1 ? (
                        <>
                          <Images className="w-3 h-3 text-[var(--abu-amber)]" />
                          <span>{proj.gallery.length} Stage Photos · Compare</span>
                        </>
                      ) : (
                        <>
                          <Expand className="w-3 h-3" />
                          <span>Zoom Photo</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                      {proj.clientIndustry}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-[var(--abu-text)] uppercase mt-0.5 group-hover:text-[var(--abu-accent)] transition-colors">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div
                      className="p-3 border rounded space-y-1"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    >
                      <span className="text-[var(--abu-text-muted)] font-mono font-bold block uppercase text-[10px]">
                        The Industrial Challenge:
                      </span>
                      <p className="text-[var(--abu-text-muted)]">{proj.challenge}</p>
                    </div>

                    <div
                      className="p-3 border rounded space-y-1"
                      style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                    >
                      <span className="text-[var(--abu-accent)] font-mono font-bold block uppercase text-[10px]">
                        The {cmsData.siteIdentity.shortName} Solution:
                      </span>
                      <p className="text-[var(--abu-text-muted)]">{proj.solution}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-[var(--abu-text-muted)] block mb-1 font-bold">
                      Fabricated Equipment &amp; Systems:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.deliveredEquipment.map((eq, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-[var(--abu-text)] px-2.5 py-1 rounded border"
                          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                        >
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="p-3 border rounded text-xs font-mono text-[var(--abu-text)] font-semibold flex items-center gap-2"
                    style={{ backgroundColor: 'var(--abu-surface-alt)', borderColor: 'var(--abu-border)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--abu-accent)] shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>
                </div>
              </div>

              <div
                className="p-6 pt-4 border-t mt-2 flex justify-end"
                style={{ borderColor: 'var(--abu-border)' }}
              >
                <button
                  onClick={() => onDiscussSimilarProject(proj)}
                  className="w-full sm:w-auto py-2.5 px-4 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white rounded text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>DISCUSS A SIMILAR PROJECT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectGalleryModal
        gallery={activeGallery?.payload || null}
        onClose={() => setActiveGallery(null)}
        onDiscussBuild={
          activeGallery
            ? () => onDiscussSimilarProject(activeGallery.project)
            : undefined
        }
      />
    </section>
  );
};
