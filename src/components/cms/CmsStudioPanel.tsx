import React, { useState } from 'react';
import {
  X,
  Palette,
  Layout,
  Package,
  Image as ImageIcon,
  Search,
  Monitor,
  Tablet,
  Smartphone,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Download,
  RotateCcw,
  Check,
  ExternalLink,
  Pencil,
  Sparkles,
  Film,
  HelpCircle,
  Star,
  UserCheck,
  Building2
} from 'lucide-react';
import { useCms, CmsTab } from '../../context/CmsContext';
import {
  MachineProduct,
  CaseProject,
  SeoArticle,
  FaqItem,
  TestimonialItem,
  SteelworkStructureItem,
  SectionBlockConfig,
  BUILTIN_LOGOS,
  BUILTIN_REAL_MEDIA,
  GENERATED_MEDIA
} from '../../data/industrialData';
import { MediaAsset } from '../../utils/mediaStore';
import { extractLogoPalette } from '../../utils/colorExtractor';

type MediaTarget =
  | null
  | { type: 'logo' }
  | { type: 'site-bg' }
  | { type: 'founder-photo' }
  | { type: 'section-primary'; id: SectionBlockConfig['id'] }
  | { type: 'section-secondary'; id: SectionBlockConfig['id'] }
  | { type: 'section-video'; id: SectionBlockConfig['id'] }
  | { type: 'machine'; id: string }
  | { type: 'project'; id: string }
  | { type: 'project-gallery'; id: string }
  | { type: 'project-video'; id: string }
  | { type: 'steelwork'; id: string };

export const CmsStudioPanel: React.FC = () => {
  const {
    cmsData,
    mediaAssets,
    isAdminAuthenticated,
    isEditorOpen,
    setIsEditorOpen,
    activeTab,
    setActiveTab,
    selectedSectionId,
    setSelectedSectionId,
    previewDevice,
    setPreviewDevice,
    setPresentationMode,
    lastSavedAt,
    updateSiteIdentity,
    updateFounder,
    updateTheme,
    updateSeo,
    updateFooterCopy,
    updateSection,
    addCustomSection,
    deleteCustomSection,
    moveSection,
    toggleSectionVisibility,
    getSection,
    addMachine,
    updateMachine,
    deleteMachine,
    addProject,
    updateProject,
    deleteProject,
    addArticle,
    updateArticle,
    deleteArticle,
    addFaq,
    updateFaq,
    deleteFaq,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addPartnerBadge,
    deletePartnerBadge,
    updateCompanyMetrics,
    addSteelworkItem,
    updateSteelworkItem,
    deleteSteelworkItem,
    uploadMediaFile,
    removeMediaAsset,
    exportCmsJson,
    importCmsJson,
    resetAllToDefaults
  } = useCms();

  const [catalogSubTab, setCatalogSubTab] = useState<
    'machines' | 'projects' | 'steelwork' | 'articles' | 'faqs' | 'reviews'
  >('projects');
  const [editingMachineId, setEditingMachineId] = useState<string | null>(null);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingSteelworkId, setEditingSteelworkId] = useState<string | null>(null);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [newPartnerName, setNewPartnerName] = useState<string>('');
  const [newPartnerSector, setNewPartnerSector] = useState<string>('');
  const [backupNotice, setBackupNotice] = useState<string>('');
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [mediaFilter, setMediaFilter] = useState<
    'all' | 'videos' | 'images' | MediaAsset['category']
  >('all');
  const [mediaAssignTarget, setMediaAssignTarget] = useState<MediaTarget>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [autoExtractOnLogo, setAutoExtractOnLogo] = useState<boolean>(true);
  const [extractedSwatches, setExtractedSwatches] = useState<{ label: string; hex: string }[]>([]);
  const [extractStatus, setExtractStatus] = useState<string>('');

  if (!isAdminAuthenticated || !isEditorOpen) return null;

  const selectedSection = getSection(selectedSectionId);
  const isVideoTarget =
    mediaAssignTarget?.type === 'section-video' || mediaAssignTarget?.type === 'project-video';

  const runLogoColorExtraction = async (logoSrc: string) => {
    try {
      setExtractStatus('Extracting logo palette...');
      const result = await extractLogoPalette(logoSrc);
      updateTheme(result.theme);
      setExtractedSwatches(result.swatches);
      setExtractStatus(
        `Applied palette (${result.theme.backgroundColor} bg · ${result.theme.accentColor} accent)`
      );
      setTimeout(() => setExtractStatus(''), 4000);
    } catch {
      setExtractStatus('Could not read pixels from this image');
    }
  };

  const applyNewLogo = async (logoUrl: string, forceExtract = false) => {
    updateSiteIdentity({ logoUrl });
    if (autoExtractOnLogo || forceExtract) {
      await runLogoColorExtraction(logoUrl);
    }
  };

  const getPersistableUrl = (asset: MediaAsset) =>
    asset.mediaType === 'video' && !asset.id.startsWith('builtin-')
      ? `media://${asset.id}`
      : asset.dataUrl;

  const handleUploadFiles = async (
    files: FileList | null,
    category: MediaAsset['category'] = 'general',
    autoAssign?:
      | 'logo'
      | 'machine'
      | 'project'
      | 'project-gallery'
      | 'project-video'
      | 'steelwork'
      | 'site-bg'
      | 'founder'
  ) => {
    if (!files || files.length === 0) return;
    setUploadStatus('Uploading media...');
    try {
      for (let i = 0; i < files.length; i++) {
        const asset = await uploadMediaFile(files[i], category);
        if (autoAssign === 'project-gallery' && editingProjectId) {
          const targetProject = cmsData.projects.find((p) => p.id === editingProjectId);
          if (targetProject) {
            const currentGallery = targetProject.gallery || [targetProject.image];
            if (!currentGallery.includes(asset.dataUrl)) {
              updateProject(editingProjectId, { gallery: [...currentGallery, asset.dataUrl] });
            }
          }
          continue;
        }
        if (i === 0) {
          if (autoAssign === 'logo') {
            await applyNewLogo(asset.dataUrl);
          } else if (autoAssign === 'site-bg') {
            updateTheme({ backgroundImageUrl: asset.dataUrl });
          } else if (autoAssign === 'founder') {
            updateFounder({ photoUrl: asset.dataUrl });
          } else if (autoAssign === 'machine' && editingMachineId) {
            updateMachine(editingMachineId, { image: asset.dataUrl });
          } else if (autoAssign === 'project' && editingProjectId) {
            updateProject(editingProjectId, { image: asset.dataUrl });
          } else if (autoAssign === 'steelwork' && editingSteelworkId) {
            updateSteelworkItem(editingSteelworkId, { image: asset.dataUrl });
          } else if (autoAssign === 'project-video' && editingProjectId) {
            updateProject(editingProjectId, { videoUrl: getPersistableUrl(asset) });
          }
        }
      }
      setUploadStatus(`Uploaded ${files.length} file(s)`);
      setTimeout(() => setUploadStatus(''), 2500);
    } catch {
      setUploadStatus('Upload failed');
    }
  };

  const handleAssignMedia = (dataUrl: string) => {
    if (!mediaAssignTarget) return;
    if (mediaAssignTarget.type === 'logo') {
      applyNewLogo(dataUrl);
    } else if (mediaAssignTarget.type === 'site-bg') {
      updateTheme({ backgroundImageUrl: dataUrl });
    } else if (mediaAssignTarget.type === 'founder-photo') {
      updateFounder({ photoUrl: dataUrl });
    } else if (mediaAssignTarget.type === 'section-primary') {
      updateSection(mediaAssignTarget.id, { imagePrimary: dataUrl });
    } else if (mediaAssignTarget.type === 'section-secondary') {
      updateSection(mediaAssignTarget.id, { imageSecondary: dataUrl });
    } else if (mediaAssignTarget.type === 'section-video') {
      updateSection(mediaAssignTarget.id, { videoUrl: dataUrl });
    } else if (mediaAssignTarget.type === 'machine') {
      updateMachine(mediaAssignTarget.id, { image: dataUrl });
    } else if (mediaAssignTarget.type === 'project') {
      updateProject(mediaAssignTarget.id, { image: dataUrl });
    } else if (mediaAssignTarget.type === 'project-gallery') {
      const targetProject = cmsData.projects.find((p) => p.id === mediaAssignTarget.id);
      if (targetProject) {
        const currentGallery = targetProject.gallery || [targetProject.image];
        if (!currentGallery.includes(dataUrl)) {
          updateProject(mediaAssignTarget.id, { gallery: [...currentGallery, dataUrl] });
        }
      }
    } else if (mediaAssignTarget.type === 'project-video') {
      updateProject(mediaAssignTarget.id, { videoUrl: dataUrl });
    } else if (mediaAssignTarget.type === 'steelwork') {
      updateSteelworkItem(mediaAssignTarget.id, { image: dataUrl });
    }
    setMediaAssignTarget(null);
  };

  const handleCreateCustomBlock = () => {
    const newId = `custom-${Date.now()}` as const;
    const newBlock: SectionBlockConfig = {
      id: newId,
      label: 'Custom Elementor Block',
      visible: true,
      isCustomBlock: true,
      targetPage: '/',
      kicker: 'Featured Showcase',
      headline: 'NEW INDUSTRIAL ENGINEERING SHOWCASE',
      subheadline: 'Built & Commissioned by ABU Fabricators and Services K. Limited',
      body: 'Add your project narrative, structural capability details, or client announcement here. Upload or pick a photo or workshop video to display alongside this section.',
      primaryCta: 'Request a Quote',
      imagePrimary: BUILTIN_REAL_MEDIA.jawCrusherScreenYard
    };
    addCustomSection(newBlock);
    setSelectedSectionId(newId);
  };

  const handleCreateNewMachine = () => {
    const newId = `machine-${Date.now()}`;
    const newMachine: MachineProduct = {
      id: newId,
      name: 'New Fabricated Machinery Unit',
      category: 'custom',
      tagline: 'Engineered and fabricated by ABU Fabricators and Services K. Limited.',
      description:
        'Custom heavy-duty machine built at our Fedha Road, Embakasi workshop for industrial production.',
      image: BUILTIN_REAL_MEDIA.jawCrusherScreenYard,
      applications: ['Industrial Processing', 'Quarry / Manufacturing'],
      specs: [
        { label: 'Capacity', value: 'Custom configured on request' },
        { label: 'Construction', value: 'Heavy-duty mild steel / wear alloy' }
      ],
      advantages: ['Built locally in Kenya', 'Readily available spare parts'],
      capacityRange: 'Custom Spec',
      feedSizeMax: 'Custom Spec',
      powerRange: 'Electric / Diesel',
      maintenanceNotes: 'Routine lubrication and fastener torque checks.'
    };
    addMachine(newMachine);
    setEditingMachineId(newId);
  };

  const handleCreateNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: CaseProject = {
      id: newId,
      badge: 'COMPLETED PROJECT',
      title: 'New Portfolio Fabrication Project',
      clientIndustry: 'Structural Steel',
      location: 'Nairobi, Kenya',
      challenge: 'Describe the client operational requirement or engineering challenge.',
      solution: 'Describe how ABU Fabricators engineered, fabricated, and delivered the solution.',
      deliveredEquipment: ['Custom Steel Frame', 'Fabricated Assembly'],
      metrics: 'Delivered on schedule · Verified quality inspection',
      image: BUILTIN_REAL_MEDIA.structuralBatchingTower
    };
    addProject(newProject);
    setEditingProjectId(newId);
  };

  const handleCreateNewArticle = () => {
    const newId = `guide-${Date.now()}`;
    const newArticle: SeoArticle = {
      id: newId,
      title: 'New Industrial Engineering Guide for Kenya',
      readTime: '5 min read',
      category: 'Industrial Fabrication',
      excerpt: 'Practical insights for Kenyan plant managers and quarry operators.',
      keyTakeaways: ['Verify material grade', 'Prioritize local spares support'],
      fullBody: 'Write your full technical guide content here for SEO and customer education.'
    };
    addArticle(newArticle);
    setEditingArticleId(newId);
  };

  const handleCreateNewFaq = () => {
    const newId = `faq-${Date.now()}`;
    const newFaq: FaqItem = {
      id: newId,
      category: 'Lead Times',
      question: 'New Buyer Question (Click to Edit)',
      answer: 'Provide clear warranty, fabrication lead time, delivery, or payment details here.'
    };
    addFaq(newFaq);
    setEditingFaqId(newId);
  };

  const handleCreateNewTestimonial = () => {
    const newId = `test-${Date.now()}`;
    const newItem: TestimonialItem = {
      id: newId,
      clientName: 'New Client Representative',
      roleOrCompany: 'Operations Manager · Quarry / Contractor',
      county: 'Nairobi County',
      projectType: 'Custom Structural Fabrication',
      quote:
        'ABU Fabricators delivered rugged steel fabrication on schedule with dependable workshop follow-up.',
      rating: 5
    };
    addTestimonial(newItem);
    setEditingTestimonialId(newId);
  };

  const handleCreateNewSteelwork = () => {
    const newId = `sw-${Date.now()}`;
    const newItem: SteelworkStructureItem = {
      id: newId,
      title: 'New Custom Steel Structure',
      category: 'Portal Frames & Warehouses',
      steelGrade: 'BS EN 10025 S275 / S355 Universal Beams',
      typicalSpanOrCapacity: 'Custom Span / Tonnage',
      finishSpec: 'Red Oxide + Industrial Alkyd Enamel',
      description:
        'Fabricated and erected by ABU Fabricators and Services K. Limited from our Fedha Road, Embakasi workshop.',
      image: GENERATED_MEDIA.fieldDeploymentSteel
    };
    addSteelworkItem(newItem);
    setEditingSteelworkId(newId);
  };

  const themePresets = [
    {
      name: 'ABU Pure White & Logo Orange (Default)',
      accentColor: '#FF6B00',
      accentHoverColor: '#E05E00',
      amberHighlight: '#FFB703',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F7F8FA',
      surfaceAltColor: '#EDF2F7',
      borderColor: '#E2E8F0',
      textColor: '#0D1B2A',
      textMutedColor: '#4A5568'
    },
    {
      name: 'Clean Pearl & Deep Navy Steel',
      accentColor: '#EA580C',
      accentHoverColor: '#C2410C',
      amberHighlight: '#F59E0B',
      backgroundColor: '#FFFFFF',
      surfaceColor: '#F8FAFC',
      surfaceAltColor: '#F1F5F9',
      borderColor: '#CBD5E1',
      textColor: '#0F172A',
      textMutedColor: '#475569'
    },
    {
      name: 'ABU Carbon Dark & Arc Orange',
      accentColor: '#FF6200',
      accentHoverColor: '#E05600',
      amberHighlight: '#FF9500',
      backgroundColor: '#0F1216',
      surfaceColor: '#161B22',
      surfaceAltColor: '#12161C',
      borderColor: '#252B34',
      textColor: '#EEF1F5',
      textMutedColor: '#9CA3AF'
    }
  ];

  const tabs: { id: CmsTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'identity', label: 'Identity', icon: Palette },
    { id: 'sections', label: 'Elementor', icon: Layout },
    { id: 'catalog', label: 'Portfolio', icon: Package },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'seo', label: 'SEO', icon: Search }
  ];

  const editingMachine = cmsData.machinery.find((m) => m.id === editingMachineId) || null;
  const editingProject = cmsData.projects.find((p) => p.id === editingProjectId) || null;
  const editingSteelwork =
    (cmsData.steelworkGallery || []).find((s) => s.id === editingSteelworkId) || null;
  const editingArticle = cmsData.articles.find((a) => a.id === editingArticleId) || null;
  const editingFaq = cmsData.faqs.find((f) => f.id === editingFaqId) || null;
  const editingTestimonial =
    cmsData.testimonials.find((t) => t.id === editingTestimonialId) || null;

  const isSectionVisualSupported = (id: string) =>
    [
      'hero',
      'industries',
      'workshop',
      'fabrication',
      'maintenance',
      'crushing-flow',
      'conveyors',
      'mining-solutions',
      'custom-machine',
      'spare-parts'
    ].includes(id) || id.startsWith('custom-');

  const pickerAssets = mediaAssets.filter((m) =>
    isVideoTarget ? m.mediaType === 'video' : m.mediaType !== 'video'
  );

  const filteredLibraryAssets = mediaAssets.filter((m) => {
    if (mediaFilter === 'all') return true;
    if (mediaFilter === 'videos') return m.mediaType === 'video';
    if (mediaFilter === 'images') return m.mediaType !== 'video';
    return m.category === mediaFilter;
  });

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-50 w-full sm:w-[400px] bg-[#10141a] border-r border-[#2a313c] text-neutral-100 flex flex-col shadow-2xl">
      {/* Studio Top Bar */}
      <div className="px-4 py-3 bg-[#0a0d12] border-b border-[#252b34] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-[#ff6200] flex items-center justify-center font-heading font-bold text-xs text-white shrink-0">
            WP
          </div>
          <div className="min-w-0">
            <div className="text-xs font-heading font-bold uppercase tracking-wider text-white truncate">
              ABU WordPress + Elementor
            </div>
            <div className="text-[10px] font-mono text-emerald-400 truncate">
              {lastSavedAt ? 'Auto-saved locally' : 'Ready'}
            </div>
          </div>
        </div>

        {/* Device Preview Controls */}
        <div className="hidden sm:flex items-center gap-1 bg-[#161b22] p-0.5 rounded border border-[#252b34]">
          <button
            type="button"
            onClick={() => setPreviewDevice('desktop')}
            className={`p-1 rounded cursor-pointer ${
              previewDevice === 'desktop' ? 'bg-[#ff6200] text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Desktop Preview"
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('tablet')}
            className={`p-1 rounded cursor-pointer ${
              previewDevice === 'tablet' ? 'bg-[#ff6200] text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Tablet Preview"
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setPreviewDevice('mobile')}
            className={`p-1 rounded cursor-pointer ${
              previewDevice === 'mobile' ? 'bg-[#ff6200] text-white' : 'text-neutral-400 hover:text-white'
            }`}
            title="Mobile Preview"
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsEditorOpen(false)}
          className="p-1.5 rounded bg-[#161b22] hover:bg-[#252b34] text-neutral-300 hover:text-white border border-[#30363d] cursor-pointer"
          title="Close Editor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-5 border-b border-[#252b34] bg-[#0d1117]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-1 flex flex-col items-center justify-center gap-1 text-[10px] font-mono uppercase transition-colors cursor-pointer border-b-2 ${
                active
                  ? 'border-[#ff6200] text-[#ff6200] bg-[#161b22] font-bold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Media Picker Banner if choosing an image or video */}
        {mediaAssignTarget && (
          <div className="p-3 bg-[#ff6200]/15 border border-[#ff6200] rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#ff6200] uppercase text-[11px]">
                {isVideoTarget ? 'Select or Upload Video for Slot' : 'Select or Upload Image for Slot'}
              </span>
              <button
                type="button"
                onClick={() => setMediaAssignTarget(null)}
                className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
            <label className="block w-full py-2 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white text-center font-mono font-bold rounded cursor-pointer">
              <Upload className="w-3.5 h-3.5 inline mr-1.5" />
              {isVideoTarget ? 'Upload New Video From Device' : 'Upload New Photo From Device'}
              <input
                type="file"
                accept={isVideoTarget ? 'video/*' : 'image/*'}
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    const asset = await uploadMediaFile(files[0], 'general');
                    handleAssignMedia(getPersistableUrl(asset));
                  }
                }}
              />
            </label>
            <div className="grid grid-cols-3 gap-2 max-h-52 overflow-y-auto pt-1">
              {pickerAssets.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleAssignMedia(getPersistableUrl(m))}
                  className="aspect-square rounded overflow-hidden border border-[#30363d] hover:border-[#ff6200] bg-black cursor-pointer relative"
                  title={m.name}
                >
                  {m.mediaType === 'video' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center bg-slate-900">
                      <Film className="w-5 h-5 text-[#ff6200]" />
                      <span className="text-[9px] font-mono text-neutral-300 line-clamp-2 mt-1">
                        {m.name}
                      </span>
                    </div>
                  ) : (
                    <img src={m.dataUrl} alt={m.name} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: SITE IDENTITY, WEBSITE BACKGROUND, FOUNDER & COLOR SCHEME */}
        {activeTab === 'identity' && (
          <div className="space-y-5">
            {/* Website Background Image (Landingaone.jpg) */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Website Background Image (Custom Site Wallpaper)
              </div>

              {cmsData.theme.backgroundImageUrl ? (
                <div className="relative rounded overflow-hidden border border-[#30363d] aspect-[16/7] bg-black">
                  <img
                    src={cmsData.theme.backgroundImageUrl}
                    alt="Website Background"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="p-4 rounded border border-dashed border-[#30363d] text-center text-[11px] text-neutral-400">
                  No background image active
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <label className="py-2 px-2 bg-[#ff6200] hover:bg-[#e05600] text-white rounded text-center font-mono font-bold cursor-pointer flex items-center justify-center gap-1">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload BG</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadFiles(e.target.files, 'general', 'site-bg')}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setMediaAssignTarget({ type: 'site-bg' })}
                  className="py-2 px-2 bg-[#0d1117] hover:bg-[#21262d] text-neutral-200 border border-[#30363d] rounded font-mono cursor-pointer"
                >
                  Pick from Media
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>Background Visibility (White Readability Wash)</span>
                  <span className="text-white font-bold">
                    {Math.round((cmsData.theme.backgroundImageOpacity ?? 0.1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={0.35}
                  step={0.02}
                  value={cmsData.theme.backgroundImageOpacity ?? 0.1}
                  onChange={(e) =>
                    updateTheme({ backgroundImageOpacity: parseFloat(e.target.value) })
                  }
                  className="w-full accent-[#ff6b00] cursor-pointer"
                />
              </div>

              {cmsData.theme.backgroundImageUrl && (
                <button
                  type="button"
                  onClick={() => updateTheme({ backgroundImageUrl: '' })}
                  className="text-[10px] font-mono text-neutral-400 hover:text-red-400 underline cursor-pointer"
                >
                  Clear Background Image
                </button>
              )}
            </div>

            {/* Founder & Owner Story Editor */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Founder Profile &amp; History (About Page)</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={cmsData.founder.photoUrl || BUILTIN_REAL_MEDIA.founderPhoto}
                  alt={cmsData.founder.name}
                  className="w-16 h-20 object-cover rounded border border-[#30363d] bg-black shrink-0"
                />
                <div className="flex-1 space-y-1.5">
                  <label className="block py-1.5 px-2 bg-[#ff6200] hover:bg-[#e05600] text-white text-center font-mono text-[11px] rounded cursor-pointer font-bold">
                    Upload Founder Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleUploadFiles(e.target.files, 'general', 'founder')}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setMediaAssignTarget({ type: 'founder-photo' })}
                    className="w-full py-1 px-2 bg-[#0d1117] border border-[#30363d] text-neutral-300 text-[11px] font-mono rounded cursor-pointer"
                  >
                    Pick from Library
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Founder Name</label>
                <input
                  type="text"
                  value={cmsData.founder.name}
                  onChange={(e) => updateFounder({ name: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Title / Role</label>
                <input
                  type="text"
                  value={cmsData.founder.role}
                  onChange={(e) => updateFounder({ role: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Experience Badge</label>
                <input
                  type="text"
                  value={cmsData.founder.experienceYears}
                  onChange={(e) => updateFounder({ experienceYears: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Founder Quote</label>
                <textarea
                  rows={2}
                  value={cmsData.founder.quote}
                  onChange={(e) => updateFounder({ quote: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Founder History — Paragraph 1
                </label>
                <textarea
                  rows={3}
                  value={cmsData.founder.bioParagraph1}
                  onChange={(e) => updateFounder({ bioParagraph1: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Founder History — Paragraph 2
                </label>
                <textarea
                  rows={3}
                  value={cmsData.founder.bioParagraph2}
                  onChange={(e) => updateFounder({ bioParagraph2: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Founder History — Paragraph 3
                </label>
                <textarea
                  rows={3}
                  value={cmsData.founder.bioParagraph3 || ''}
                  onChange={(e) => updateFounder({ bioParagraph3: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Logo Manager */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Brand Logo (Supports Logo with Contact / Location Details)
              </div>

              <div className="bg-white p-3 rounded flex items-center justify-center border border-[#30363d]">
                <img
                  src={cmsData.siteIdentity.logoUrl}
                  alt="Current Brand Logo"
                  className="max-h-24 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <label className="py-2 px-2.5 bg-[#ff6200] hover:bg-[#e05600] text-white rounded text-center font-mono font-bold cursor-pointer flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleUploadFiles(e.target.files, 'logo', 'logo')}
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setMediaAssignTarget({ type: 'logo' });
                  }}
                  className="py-2 px-2.5 bg-[#0d1117] hover:bg-[#21262d] text-neutral-200 border border-[#30363d] rounded font-mono cursor-pointer"
                >
                  Choose from Library
                </button>
              </div>

              {/* Automatic Color Extraction Controls */}
              <div className="p-2.5 bg-[#0d1117] border border-[#252b34] rounded space-y-2">
                <label className="flex items-center justify-between gap-2 cursor-pointer">
                  <span className="text-[10px] font-mono text-neutral-300">
                    Auto-extract theme colors on logo upload
                  </span>
                  <input
                    type="checkbox"
                    checked={autoExtractOnLogo}
                    onChange={(e) => setAutoExtractOnLogo(e.target.checked)}
                    className="accent-[#ff6b00] cursor-pointer"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => runLogoColorExtraction(cmsData.siteIdentity.logoUrl)}
                  className="w-full py-1.5 px-2 bg-[#161b22] hover:bg-[#21262d] border border-[#ff6b00]/60 text-[#ff6b00] hover:text-white rounded font-mono font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Extract &amp; Apply Colors from Current Logo</span>
                </button>

                {extractStatus && (
                  <div className="text-[10px] font-mono text-emerald-400">{extractStatus}</div>
                )}

                {extractedSwatches.length > 0 && (
                  <div className="grid grid-cols-5 gap-1 pt-1">
                    {extractedSwatches.map((s) => (
                      <div key={s.label} className="text-center" title={`${s.label}: ${s.hex}`}>
                        <div
                          className="h-4 w-full rounded border border-white/20"
                          style={{ backgroundColor: s.hex }}
                        />
                        <div className="text-[9px] font-mono text-neutral-400 truncate mt-0.5">
                          {s.hex}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Switch between the two provided ABU logos */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-neutral-400">Quick-Switch Uploaded Logos:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => applyNewLogo(BUILTIN_LOGOS.emblemAfricaKenya)}
                    className={`p-1.5 bg-white rounded border-2 cursor-pointer ${
                      cmsData.siteIdentity.logoUrl === BUILTIN_LOGOS.emblemAfricaKenya
                        ? 'border-[#ff6200]'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={BUILTIN_LOGOS.emblemAfricaKenya}
                      alt="ABU Logo Africa Kenya"
                      className="h-12 w-full object-contain"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => applyNewLogo(BUILTIN_LOGOS.cleanOrangeBlack)}
                    className={`p-1.5 bg-white rounded border-2 cursor-pointer ${
                      cmsData.siteIdentity.logoUrl === BUILTIN_LOGOS.cleanOrangeBlack
                        ? 'border-[#ff6200]'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={BUILTIN_LOGOS.cleanOrangeBlack}
                      alt="ABU Logo Clean"
                      className="h-12 w-full object-contain"
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-neutral-400 mb-1">
                  Logo Header Frame Style
                </label>
                <select
                  value={cmsData.siteIdentity.logoFrameStyle}
                  onChange={(e) =>
                    updateSiteIdentity({
                      logoFrameStyle: e.target.value as 'white-badge' | 'transparent' | 'bordered-card'
                    })
                  }
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                >
                  <option value="transparent">Seamless / Transparent (Best on White Header)</option>
                  <option value="white-badge">Clean White Badge (Framed)</option>
                  <option value="bordered-card">Deep Navy Framed Plate</option>
                </select>
              </div>
            </div>

            {/* Company Name, Numbers & Locations */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Company Details, Numbers &amp; Location
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Full Company Name</label>
                <input
                  type="text"
                  value={cmsData.siteIdentity.companyName}
                  onChange={(e) => updateSiteIdentity({ companyName: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Short Name</label>
                  <input
                    type="text"
                    value={cmsData.siteIdentity.shortName}
                    onChange={(e) => updateSiteIdentity({ shortName: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Header Sub-label</label>
                  <input
                    type="text"
                    value={cmsData.siteIdentity.subLabel}
                    onChange={(e) => updateSiteIdentity({ subLabel: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Primary Tagline</label>
                <input
                  type="text"
                  value={cmsData.siteIdentity.tagline}
                  onChange={(e) => updateSiteIdentity({ tagline: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Display Phone</label>
                  <input
                    type="text"
                    value={cmsData.siteIdentity.phoneDisplay}
                    onChange={(e) =>
                      updateSiteIdentity({
                        phoneDisplay: e.target.value,
                        phoneRaw: e.target.value.replace(/\s+/g, '')
                      })
                    }
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">WhatsApp Number (254...)</label>
                  <input
                    type="text"
                    value={cmsData.siteIdentity.whatsappNumber}
                    onChange={(e) =>
                      updateSiteIdentity({ whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })
                    }
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={cmsData.siteIdentity.email}
                  onChange={(e) => updateSiteIdentity({ email: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Primary Location</label>
                <input
                  type="text"
                  value={cmsData.siteIdentity.location}
                  onChange={(e) => updateSiteIdentity({ location: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Full Workshop Address</label>
                <input
                  type="text"
                  value={cmsData.siteIdentity.address}
                  onChange={(e) => updateSiteIdentity({ address: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">Service Coverage Statement</label>
                <input
                  type="text"
                  value={cmsData.siteIdentity.coverage}
                  onChange={(e) => updateSiteIdentity({ coverage: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Logo-Derived Color Scheme Customizer */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Logo-Derived Color Scheme
              </div>

              <div className="space-y-1.5">
                {themePresets.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => updateTheme(preset)}
                    className="w-full p-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-[11px] font-mono text-neutral-200">{preset.name}</span>
                    <div className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.backgroundColor }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.accentColor }}
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/20"
                        style={{ backgroundColor: preset.amberHighlight }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#252b34]">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Brand Orange (--abu-accent)</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={cmsData.theme.accentColor}
                      onChange={(e) =>
                        updateTheme({ accentColor: e.target.value, accentHoverColor: e.target.value })
                      }
                      className="w-7 h-7 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-neutral-300">
                      {cmsData.theme.accentColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Page Background (--abu-bg)</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={cmsData.theme.backgroundColor}
                      onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-neutral-300">
                      {cmsData.theme.backgroundColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Heading Navy (--abu-text)</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={cmsData.theme.textColor}
                      onChange={(e) => updateTheme({ textColor: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-neutral-300">
                      {cmsData.theme.textColor}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Sparks Highlight (--abu-amber)</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={cmsData.theme.amberHighlight}
                      onChange={(e) => updateTheme({ amberHighlight: e.target.value })}
                      className="w-7 h-7 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-[11px] text-neutral-300">
                      {cmsData.theme.amberHighlight}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ELEMENTOR PAGE BUILDER */}
        {activeTab === 'sections' && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={handleCreateCustomBlock}
              className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Elementor Content Block</span>
            </button>

            <div className="p-3 bg-[#161b22] border border-[#252b34] rounded-lg space-y-2">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Section Navigator (Reorder · Hide · Edit Visuals)
              </div>
              <p className="text-[11px] text-neutral-400">
                Select any section below—or click "Edit" on the live page—to modify headlines, text, buttons, photos, and videos.
              </p>

              <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                {cmsData.sections.map((sec) => {
                  const isSel = selectedSectionId === sec.id;
                  return (
                    <div
                      key={sec.id}
                      className={`p-2 rounded border flex items-center justify-between gap-2 ${
                        isSel
                          ? 'bg-[#ff6200]/15 border-[#ff6200]'
                          : 'bg-[#0d1117] border-[#252b34] hover:border-[#38414f]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSectionId(sec.id);
                          setTimeout(() => {
                            const el = document.getElementById(sec.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 80);
                        }}
                        className={`text-left text-[11px] font-mono truncate flex-1 cursor-pointer ${
                          sec.visible ? 'text-white' : 'text-neutral-500 line-through'
                        }`}
                      >
                        {sec.isCustomBlock ? `★ ${sec.label}` : sec.label}
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveSection(sec.id, 'up')}
                          className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(sec.id, 'down')}
                          className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSectionVisibility(sec.id)}
                          className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                          title="Toggle Visibility"
                        >
                          {sec.visible ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3 text-amber-400" />
                          )}
                        </button>
                        {sec.isCustomBlock && (
                          <button
                            type="button"
                            onClick={() => deleteCustomSection(sec.id)}
                            className="p-1 text-neutral-400 hover:text-red-400 cursor-pointer"
                            title="Delete Custom Block"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Active Section Inspector */}
            <div className="p-3.5 bg-[#161b22] border border-[#ff6200]/40 rounded-lg space-y-3">
              <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                <span className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                  Editing: {selectedSection.label}
                </span>
                <button
                  type="button"
                  onClick={() => toggleSectionVisibility(selectedSection.id)}
                  className="text-[10px] font-mono text-neutral-300 hover:text-white cursor-pointer"
                >
                  {selectedSection.visible ? 'Visible' : 'Hidden'}
                </button>
              </div>

              {selectedSection.isCustomBlock && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">Block Label</label>
                    <input
                      type="text"
                      value={selectedSection.label}
                      onChange={(e) => updateSection(selectedSection.id, { label: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">Display on Page</label>
                    <select
                      value={selectedSection.targetPage || '/'}
                      onChange={(e) =>
                        updateSection(selectedSection.id, {
                          targetPage: e.target.value as SectionBlockConfig['targetPage']
                        })
                      }
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                    >
                      <option value="/">Home (/)</option>
                      <option value="/services">Services (/services)</option>
                      <option value="/machinery">Machinery (/machinery)</option>
                      <option value="/projects">Projects (/projects)</option>
                      <option value="/about">About Us (/about)</option>
                      <option value="/guides">Guides (/guides)</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedSection.kicker !== undefined && (
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Kicker / Eyebrow</label>
                  <input
                    type="text"
                    value={selectedSection.kicker || ''}
                    onChange={(e) => updateSection(selectedSection.id, { kicker: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              )}

              {selectedSection.headline !== undefined && (
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Section Headline</label>
                  <input
                    type="text"
                    value={selectedSection.headline || ''}
                    onChange={(e) => updateSection(selectedSection.id, { headline: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              )}

              {selectedSection.subheadline !== undefined && (
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Subheadline</label>
                  <input
                    type="text"
                    value={selectedSection.subheadline || ''}
                    onChange={(e) => updateSection(selectedSection.id, { subheadline: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              )}

              {selectedSection.body !== undefined && (
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 mb-1">Description / Body Copy</label>
                  <textarea
                    rows={4}
                    value={selectedSection.body || ''}
                    onChange={(e) => updateSection(selectedSection.id, { body: e.target.value })}
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                  />
                </div>
              )}

              {selectedSection.primaryCta !== undefined && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 mb-1">Primary Button</label>
                    <input
                      type="text"
                      value={selectedSection.primaryCta || ''}
                      onChange={(e) => updateSection(selectedSection.id, { primaryCta: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                    />
                  </div>
                  {selectedSection.secondaryCta !== undefined && (
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Secondary Button</label>
                      <input
                        type="text"
                        value={selectedSection.secondaryCta || ''}
                        onChange={(e) => updateSection(selectedSection.id, { secondaryCta: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Section Images & Video Visual Controls */}
              {isSectionVisualSupported(selectedSection.id) && (
                <div className="space-y-2 pt-2 border-t border-[#252b34]">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">
                    Section Photos &amp; Video
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setMediaAssignTarget({
                          type: 'section-primary',
                          id: selectedSection.id
                        })
                      }
                      className="p-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded text-center cursor-pointer space-y-1"
                    >
                      {selectedSection.imagePrimary ? (
                        <img
                          src={selectedSection.imagePrimary}
                          alt="Primary"
                          className="h-14 w-full object-cover rounded"
                        />
                      ) : (
                        <div className="h-14 w-full rounded bg-slate-900 flex items-center justify-center text-[10px] text-neutral-500">
                          No Image
                        </div>
                      )}
                      <span className="block text-[10px] font-mono text-[#ff6200]">Change Image 1</span>
                    </button>

                    {(selectedSection.id === 'hero' ||
                      selectedSection.id === 'workshop' ||
                      selectedSection.id === 'fabrication' ||
                      selectedSection.id === 'maintenance' ||
                      selectedSection.id === 'mining-solutions' ||
                      selectedSection.id === 'spare-parts' ||
                      selectedSection.isCustomBlock) && (
                      <button
                        type="button"
                        onClick={() =>
                          setMediaAssignTarget({
                            type: 'section-secondary',
                            id: selectedSection.id
                          })
                        }
                        className="p-2 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] rounded text-center cursor-pointer space-y-1"
                      >
                        {selectedSection.imageSecondary ? (
                          <img
                            src={selectedSection.imageSecondary}
                            alt="Secondary"
                            className="h-14 w-full object-cover rounded"
                          />
                        ) : (
                          <div className="h-14 w-full rounded bg-slate-900 flex items-center justify-center text-[10px] text-neutral-500">
                            No Image
                          </div>
                        )}
                        <span className="block text-[10px] font-mono text-[#ff6200]">Change Image 2</span>
                      </button>
                    )}
                  </div>

                  {(selectedSection.id === 'workshop' || selectedSection.isCustomBlock) && (
                    <div className="p-2 bg-[#0d1117] border border-[#30363d] rounded space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-300 flex items-center gap-1">
                          <Film className="w-3 h-3 text-[#ff6200]" />
                          <span>Section Video</span>
                        </span>
                        {selectedSection.videoUrl && (
                          <button
                            type="button"
                            onClick={() => updateSection(selectedSection.id, { videoUrl: '' })}
                            className="text-red-400 hover:underline cursor-pointer"
                          >
                            Remove Video
                          </button>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setMediaAssignTarget({
                            type: 'section-video',
                            id: selectedSection.id
                          })
                        }
                        className="w-full py-1.5 px-2 bg-[#161b22] hover:bg-[#ff6200] text-neutral-200 hover:text-white rounded text-[11px] font-mono font-bold cursor-pointer"
                      >
                        {selectedSection.videoUrl ? 'Change / Upload Video' : 'Attach / Upload Video'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer CTA Editor */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-2">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Footer Call-To-Action Block
              </div>
              <input
                type="text"
                value={cmsData.footerFinalHeadline}
                onChange={(e) => updateFooterCopy({ footerFinalHeadline: e.target.value })}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
              />
              <textarea
                rows={3}
                value={cmsData.footerFinalSubtext}
                onChange={(e) => updateFooterCopy({ footerFinalSubtext: e.target.value })}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* TAB 3: PORTFOLIO, PRODUCTS, GUIDES, FAQS & REVIEWS CRUD */}
        {activeTab === 'catalog' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1 p-1 bg-[#0d1117] rounded border border-[#252b34]">
              <button
                type="button"
                onClick={() => setCatalogSubTab('projects')}
                className={`flex-1 min-w-[30%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'projects' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Portfolio ({cmsData.projects.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab('machines')}
                className={`flex-1 min-w-[30%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'machines' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Products ({cmsData.machinery.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab('steelwork')}
                className={`flex-1 min-w-[30%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'steelwork' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Steelwork ({(cmsData.steelworkGallery || []).length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab('articles')}
                className={`flex-1 min-w-[30%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'articles' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Guides ({cmsData.articles.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab('faqs')}
                className={`flex-1 min-w-[45%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'faqs' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Buyer FAQs ({cmsData.faqs.length})
              </button>
              <button
                type="button"
                onClick={() => setCatalogSubTab('reviews')}
                className={`flex-1 min-w-[45%] py-1.5 px-1 rounded text-[10px] font-mono cursor-pointer ${
                  catalogSubTab === 'reviews' ? 'bg-[#ff6200] text-white font-bold' : 'text-neutral-400'
                }`}
              >
                Reviews &amp; Stats ({cmsData.testimonials.length})
              </button>
            </div>

            {/* PRODUCTS / MACHINES MANAGER */}
            {catalogSubTab === 'machines' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCreateNewMachine}
                  className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Fabricated Product / Machine</span>
                </button>

                {editingMachine ? (
                  <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                      <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold">
                        Edit Product
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingMachineId(null)}
                        className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={editingMachine.image}
                        alt={editingMachine.name}
                        className="w-20 h-16 object-cover rounded border border-[#30363d] bg-black"
                      />
                      <div className="flex-1 space-y-1.5">
                        <label className="block py-1.5 px-2 bg-[#ff6200] text-white text-center font-mono text-[11px] rounded cursor-pointer">
                          Upload Product Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadFiles(e.target.files, 'product', 'machine')}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setMediaAssignTarget({ type: 'machine', id: editingMachine.id })}
                          className="w-full py-1 px-2 bg-[#0d1117] border border-[#30363d] text-neutral-300 text-[11px] font-mono rounded cursor-pointer"
                        >
                          Pick from Media Library
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Product Name</label>
                      <input
                        type="text"
                        value={editingMachine.name}
                        onChange={(e) => updateMachine(editingMachine.id, { name: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Category</label>
                        <select
                          value={editingMachine.category}
                          onChange={(e) =>
                            updateMachine(editingMachine.id, {
                              category: e.target.value as MachineProduct['category']
                            })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        >
                          <option value="crushing">Crushing</option>
                          <option value="screening">Screening</option>
                          <option value="handling">Material Handling</option>
                          <option value="mining">Mining</option>
                          <option value="custom">Custom Machinery</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Capacity</label>
                        <input
                          type="text"
                          value={editingMachine.capacityRange}
                          onChange={(e) =>
                            updateMachine(editingMachine.id, { capacityRange: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={editingMachine.tagline}
                        onChange={(e) => updateMachine(editingMachine.id, { tagline: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingMachine.description}
                        onChange={(e) =>
                          updateMachine(editingMachine.id, { description: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Feed Size</label>
                        <input
                          type="text"
                          value={editingMachine.feedSizeMax}
                          onChange={(e) =>
                            updateMachine(editingMachine.id, { feedSizeMax: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Power Range</label>
                        <input
                          type="text"
                          value={editingMachine.powerRange}
                          onChange={(e) =>
                            updateMachine(editingMachine.id, { powerRange: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cmsData.machinery.map((m) => (
                      <div
                        key={m.id}
                        className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center gap-3"
                      >
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-12 h-10 object-cover rounded shrink-0 bg-black"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{m.name}</div>
                          <div className="text-[10px] font-mono text-neutral-400 uppercase">
                            {m.category} · {m.capacityRange}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingMachineId(m.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 hover:text-white cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteMachine(m.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROJECTS PORTFOLIO MANAGER */}
            {catalogSubTab === 'projects' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCreateNewProject}
                  className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Portfolio Project</span>
                </button>

                {editingProject ? (
                  <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                      <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold">
                        Edit Portfolio Project
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingProjectId(null)}
                        className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={editingProject.image}
                        alt={editingProject.title}
                        className="w-20 h-16 object-cover rounded border border-[#30363d] bg-black"
                      />
                      <div className="flex-1 space-y-1.5">
                        <label className="block py-1.5 px-2 bg-[#ff6200] text-white text-center font-mono text-[11px] rounded cursor-pointer">
                          Upload Project Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadFiles(e.target.files, 'project', 'project')}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => setMediaAssignTarget({ type: 'project', id: editingProject.id })}
                          className="w-full py-1 px-2 bg-[#0d1117] border border-[#30363d] text-neutral-300 text-[11px] font-mono rounded cursor-pointer"
                        >
                          Pick Photo from Library
                        </button>
                      </div>
                    </div>

                    {/* Multi-Photo Gallery Stage Manager (Lightbox & Before/After) */}
                    <div className="p-2.5 bg-[#0d1117] border border-[#252b34] rounded space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-300 font-bold uppercase">
                          Multi-Photo Progress Gallery ({(editingProject.gallery || []).length})
                        </span>
                      </div>
                      {(editingProject.gallery || []).length > 0 && (
                        <div className="grid grid-cols-4 gap-1.5">
                          {(editingProject.gallery || []).map((imgUrl, gIdx) => (
                            <div
                              key={`${imgUrl}-${gIdx}`}
                              className="relative aspect-square rounded overflow-hidden border border-[#30363d] bg-black"
                            >
                              <img src={imgUrl} alt={`Stage ${gIdx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => {
                                  const next = (editingProject.gallery || []).filter((_, i) => i !== gIdx);
                                  updateProject(editingProject.id, { gallery: next });
                                }}
                                className="absolute top-0.5 right-0.5 p-0.5 bg-black/80 hover:bg-red-700 text-white rounded cursor-pointer"
                                title="Remove Stage Photo"
                              >
                                <X className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-1.5">
                        <label className="py-1.5 px-2 bg-[#161b22] hover:bg-[#ff6200] text-neutral-200 hover:text-white border border-[#30363d] rounded text-center text-[10px] font-mono cursor-pointer">
                          + Upload Stage Photo
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) =>
                              handleUploadFiles(e.target.files, 'project', 'project-gallery')
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setMediaAssignTarget({ type: 'project-gallery', id: editingProject.id })
                          }
                          className="py-1.5 px-2 bg-[#161b22] hover:bg-[#252b34] text-neutral-200 border border-[#30363d] rounded text-[10px] font-mono cursor-pointer"
                        >
                          + From Media Library
                        </button>
                      </div>
                    </div>

                    {/* Optional Video Upload/Picker for Portfolio */}
                    <div className="p-2.5 bg-[#0d1117] border border-[#252b34] rounded space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-neutral-300 flex items-center gap-1 font-bold">
                          <Film className="w-3.5 h-3.5 text-[#ff6200]" />
                          <span>Portfolio Video (Optional)</span>
                        </span>
                        {editingProject.videoUrl && (
                          <button
                            type="button"
                            onClick={() => updateProject(editingProject.id, { videoUrl: '' })}
                            className="text-red-400 hover:underline cursor-pointer"
                          >
                            Remove Video
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <label className="py-1.5 px-2 bg-[#161b22] hover:bg-[#ff6200] text-neutral-200 hover:text-white border border-[#30363d] rounded text-center text-[10px] font-mono cursor-pointer">
                          Upload Video
                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) =>
                              handleUploadFiles(e.target.files, 'project', 'project-video')
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setMediaAssignTarget({ type: 'project-video', id: editingProject.id })
                          }
                          className="py-1.5 px-2 bg-[#161b22] hover:bg-[#252b34] text-neutral-200 border border-[#30363d] rounded text-[10px] font-mono cursor-pointer"
                        >
                          Pick Video
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Badge Label</label>
                        <input
                          type="text"
                          value={editingProject.badge}
                          onChange={(e) => updateProject(editingProject.id, { badge: e.target.value })}
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingProject.location}
                          onChange={(e) => updateProject(editingProject.id, { location: e.target.value })}
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Project Title</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={(e) => updateProject(editingProject.id, { title: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Client Industry</label>
                      <input
                        type="text"
                        value={editingProject.clientIndustry}
                        onChange={(e) =>
                          updateProject(editingProject.id, { clientIndustry: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Fabricated Equipment (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={editingProject.deliveredEquipment.join(', ')}
                        onChange={(e) =>
                          updateProject(editingProject.id, {
                            deliveredEquipment: e.target.value
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean)
                          })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Challenge</label>
                      <textarea
                        rows={2}
                        value={editingProject.challenge}
                        onChange={(e) => updateProject(editingProject.id, { challenge: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Solution</label>
                      <textarea
                        rows={2}
                        value={editingProject.solution}
                        onChange={(e) => updateProject(editingProject.id, { solution: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Outcome Metrics</label>
                      <input
                        type="text"
                        value={editingProject.metrics}
                        onChange={(e) => updateProject(editingProject.id, { metrics: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cmsData.projects.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center gap-3"
                      >
                        <div className="relative w-12 h-10 rounded shrink-0 bg-black overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                          {p.videoUrl && (
                            <span className="absolute bottom-0.5 right-0.5 bg-[#ff6200] text-white p-0.5 rounded">
                              <Film className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{p.title}</div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate">
                            {p.badge} · {p.location}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingProjectId(p.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 hover:text-white cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProject(p.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SEO GUIDES / ARTICLES MANAGER */}
            {catalogSubTab === 'articles' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCreateNewArticle}
                  className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Engineering Guide</span>
                </button>

                {editingArticle ? (
                  <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                      <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold">
                        Edit Guide Article
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingArticleId(null)}
                        className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) => updateArticle(editingArticle.id, { title: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      placeholder="Article Title"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={editingArticle.category}
                        onChange={(e) => updateArticle(editingArticle.id, { category: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        placeholder="Category"
                      />
                      <input
                        type="text"
                        value={editingArticle.readTime}
                        onChange={(e) => updateArticle(editingArticle.id, { readTime: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        placeholder="Read Time"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editingArticle.excerpt}
                      onChange={(e) => updateArticle(editingArticle.id, { excerpt: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      placeholder="Excerpt"
                    />
                    <textarea
                      rows={5}
                      value={editingArticle.fullBody}
                      onChange={(e) => updateArticle(editingArticle.id, { fullBody: e.target.value })}
                      className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      placeholder="Full Body"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cmsData.articles.map((a) => (
                      <div
                        key={a.id}
                        className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-white truncate">{a.title}</div>
                          <div className="text-[10px] font-mono text-neutral-400">
                            {a.category} · {a.readTime}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingArticleId(a.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteArticle(a.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* BUYER FAQ & WARRANTY MANAGER */}
            {catalogSubTab === 'faqs' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCreateNewFaq}
                  className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Add Buyer FAQ Item</span>
                </button>

                {editingFaq ? (
                  <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                      <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold">
                        Edit Buyer FAQ
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingFaqId(null)}
                        className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Category</label>
                      <select
                        value={editingFaq.category}
                        onChange={(e) =>
                          updateFaq(editingFaq.id, {
                            category: e.target.value as FaqItem['category']
                          })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      >
                        <option value="Lead Times">Lead Times</option>
                        <option value="Warranty & Quality">Warranty &amp; Quality</option>
                        <option value="Delivery & Site Work">Delivery &amp; Site Work</option>
                        <option value="Pricing & Terms">Pricing &amp; Terms</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Question</label>
                      <input
                        type="text"
                        value={editingFaq.question}
                        onChange={(e) => updateFaq(editingFaq.id, { question: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Answer</label>
                      <textarea
                        rows={4}
                        value={editingFaq.answer}
                        onChange={(e) => updateFaq(editingFaq.id, { answer: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cmsData.faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-[10px] font-mono text-[#ff6200] uppercase">
                            {faq.category}
                          </div>
                          <div className="font-bold text-white truncate">{faq.question}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingFaqId(faq.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFaq(faq.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TESTIMONIALS, COUNTIES COUNTER & CONTRACTOR BADGES */}
            {catalogSubTab === 'reviews' && (
              <div className="space-y-4">
                {/* Company Delivery Counters */}
                <div className="p-3 bg-[#161b22] border border-[#252b34] rounded-lg space-y-2.5">
                  <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                    Counties &amp; Delivery Counters
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Counties Served
                      </label>
                      <input
                        type="text"
                        value={cmsData.companyMetrics.countiesServed}
                        onChange={(e) => updateCompanyMetrics({ countiesServed: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Delivered Projects
                      </label>
                      <input
                        type="text"
                        value={cmsData.companyMetrics.completedProjectsCount}
                        onChange={(e) =>
                          updateCompanyMetrics({ completedProjectsCount: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        On-Time Delivery
                      </label>
                      <input
                        type="text"
                        value={cmsData.companyMetrics.onTimeDeliveryRate}
                        onChange={(e) =>
                          updateCompanyMetrics({ onTimeDeliveryRate: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Warranty Period
                      </label>
                      <input
                        type="text"
                        value={cmsData.companyMetrics.warrantyPeriod}
                        onChange={(e) => updateCompanyMetrics({ warrantyPeriod: e.target.value })}
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Client Testimonials */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleCreateNewTestimonial}
                    className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Star className="w-4 h-4" />
                    <span>Add Client Review / Testimonial</span>
                  </button>

                  {editingTestimonial ? (
                    <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                        <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold">
                          Edit Client Testimonial
                        </span>
                        <button
                          type="button"
                          onClick={() => setEditingTestimonialId(null)}
                          className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                      <input
                        type="text"
                        value={editingTestimonial.clientName}
                        onChange={(e) =>
                          updateTestimonial(editingTestimonial.id, { clientName: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        placeholder="Client Name"
                      />
                      <input
                        type="text"
                        value={editingTestimonial.roleOrCompany}
                        onChange={(e) =>
                          updateTestimonial(editingTestimonial.id, { roleOrCompany: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        placeholder="Role & Company"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingTestimonial.county}
                          onChange={(e) =>
                            updateTestimonial(editingTestimonial.id, { county: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                          placeholder="County"
                        />
                        <input
                          type="text"
                          value={editingTestimonial.projectType}
                          onChange={(e) =>
                            updateTestimonial(editingTestimonial.id, { projectType: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                          placeholder="Project Delivered"
                        />
                      </div>
                      <textarea
                        rows={3}
                        value={editingTestimonial.quote}
                        onChange={(e) =>
                          updateTestimonial(editingTestimonial.id, { quote: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        placeholder="Client Feedback Quote"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cmsData.testimonials.map((item) => (
                        <div
                          key={item.id}
                          className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-white truncate">{item.clientName}</div>
                            <div className="text-[10px] font-mono text-neutral-400 truncate">
                              {item.county} · {item.projectType}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEditingTestimonialId(item.id)}
                            className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTestimonial(item.id)}
                            className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Partner & Contractor Sector Badges */}
                <div className="p-3 bg-[#161b22] border border-[#252b34] rounded-lg space-y-2.5">
                  <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                    Client Sector &amp; Contractor Badges
                  </div>
                  <div className="space-y-1.5">
                    {cmsData.partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="flex items-center justify-between gap-2 p-2 bg-[#0d1117] border border-[#252b34] rounded"
                      >
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate">{partner.name}</div>
                          <div className="text-[10px] font-mono text-neutral-400 truncate">
                            {partner.sector}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => deletePartnerBadge(partner.id)}
                          className="p-1 text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <input
                      type="text"
                      value={newPartnerName}
                      onChange={(e) => setNewPartnerName(e.target.value)}
                      placeholder="Badge Name"
                      className="bg-[#0d1117] border border-[#30363d] rounded p-1.5 text-[11px] text-white"
                    />
                    <input
                      type="text"
                      value={newPartnerSector}
                      onChange={(e) => setNewPartnerSector(e.target.value)}
                      placeholder="Sector / Region"
                      className="bg-[#0d1117] border border-[#30363d] rounded p-1.5 text-[11px] text-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPartnerName.trim()) return;
                      addPartnerBadge({
                        id: `partner-${Date.now()}`,
                        name: newPartnerName.trim(),
                        sector: newPartnerSector.trim() || 'Kenya Industrial Client'
                      });
                      setNewPartnerName('');
                      setNewPartnerSector('');
                    }}
                    className="w-full py-1.5 px-2 bg-[#0d1117] hover:bg-[#ff6200] text-neutral-200 hover:text-white border border-[#30363d] rounded text-[11px] font-mono font-bold cursor-pointer"
                  >
                    + Add Contractor / Sector Badge
                  </button>
                </div>
              </div>
            )}

            {/* BUILDING STEELWORK GALLERY MANAGER */}
            {catalogSubTab === 'steelwork' && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleCreateNewSteelwork}
                  className="w-full py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white font-heading font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Steel Structure Card</span>
                </button>

                {editingSteelwork ? (
                  <div className="p-3.5 bg-[#161b22] border border-[#ff6200] rounded-lg space-y-3">
                    <div className="flex items-center justify-between border-b border-[#252b34] pb-2">
                      <span className="font-mono text-[10px] uppercase text-[#ff6200] font-bold flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Edit Steel Structure</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingSteelworkId(null)}
                        className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
                      >
                        Done
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={editingSteelwork.image}
                        alt={editingSteelwork.title}
                        className="w-20 h-16 object-cover rounded border border-[#30363d] bg-black"
                      />
                      <div className="flex-1 space-y-1.5">
                        <label className="block py-1.5 px-2 bg-[#ff6200] text-white text-center font-mono text-[11px] rounded cursor-pointer">
                          Upload Structure Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadFiles(e.target.files, 'project', 'steelwork')}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            setMediaAssignTarget({ type: 'steelwork', id: editingSteelwork.id })
                          }
                          className="w-full py-1 px-2 bg-[#0d1117] border border-[#30363d] text-neutral-300 text-[11px] font-mono rounded cursor-pointer"
                        >
                          Pick Photo from Library
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingSteelwork.title}
                        onChange={(e) =>
                          updateSteelworkItem(editingSteelwork.id, { title: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">Category</label>
                      <select
                        value={editingSteelwork.category}
                        onChange={(e) =>
                          updateSteelworkItem(editingSteelwork.id, {
                            category: e.target.value as SteelworkStructureItem['category']
                          })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      >
                        <option value="Portal Frames & Warehouses">Portal Frames &amp; Warehouses</option>
                        <option value="Mezzanines & Platforms">Mezzanines &amp; Platforms</option>
                        <option value="Tanks & Silos">Tanks &amp; Silos</option>
                        <option value="Staircases & Catwalks">Staircases &amp; Catwalks</option>
                        <option value="Gates & Heavy Doors">Gates &amp; Heavy Doors</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                          Span / Capacity
                        </label>
                        <input
                          type="text"
                          value={editingSteelwork.typicalSpanOrCapacity}
                          onChange={(e) =>
                            updateSteelworkItem(editingSteelwork.id, {
                              typicalSpanOrCapacity: e.target.value
                            })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                          Steel Grade
                        </label>
                        <input
                          type="text"
                          value={editingSteelwork.steelGrade}
                          onChange={(e) =>
                            updateSteelworkItem(editingSteelwork.id, { steelGrade: e.target.value })
                          }
                          className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Coating / Finish Spec
                      </label>
                      <input
                        type="text"
                        value={editingSteelwork.finishSpec}
                        onChange={(e) =>
                          updateSteelworkItem(editingSteelwork.id, { finishSpec: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editingSteelwork.description}
                        onChange={(e) =>
                          updateSteelworkItem(editingSteelwork.id, { description: e.target.value })
                        }
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {(cmsData.steelworkGallery || []).map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 bg-[#161b22] border border-[#252b34] rounded flex items-center justify-between gap-2"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-10 object-cover rounded border border-[#30363d] shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-white truncate">{item.title}</div>
                          <div className="text-[10px] font-mono text-[#ff6200] truncate">
                            {item.category} · {item.typicalSpanOrCapacity}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditingSteelworkId(item.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-[#252b34] rounded text-neutral-300 cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteSteelworkItem(item.id)}
                          className="p-1.5 bg-[#0d1117] hover:bg-red-900/50 rounded text-neutral-400 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: WORDPRESS MEDIA LIBRARY (IMAGES & VIDEOS) */}
        {activeTab === 'media' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#161b22] border border-dashed border-[#ff6200]/60 rounded-lg text-center space-y-2">
              <div className="text-xs font-mono uppercase font-bold text-white">
                Upload Photos &amp; Videos
              </div>
              <p className="text-[11px] text-neutral-400">
                Upload multiple photos or MP4/WebM workshop videos from your phone or computer. Saved persistently in your browser database.
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6200] hover:bg-[#e05600] text-white font-mono font-bold rounded cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Select Photos / Videos</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    handleUploadFiles(
                      e.target.files,
                      mediaFilter === 'all' || mediaFilter === 'videos' || mediaFilter === 'images'
                        ? 'product'
                        : mediaFilter
                    )
                  }
                />
              </label>
              {uploadStatus && (
                <div className="text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{uploadStatus}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['all', 'images', 'videos', 'logo', 'product', 'project', 'workshop'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setMediaFilter(cat)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase cursor-pointer ${
                      mediaFilter === cat
                        ? 'bg-[#ff6200] text-white font-bold'
                        : 'bg-[#161b22] text-neutral-400 border border-[#252b34]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {filteredLibraryAssets.map((m) => {
                const isCustom = !m.id.startsWith('builtin-');
                const isVideo = m.mediaType === 'video';
                return (
                  <div
                    key={m.id}
                    className="bg-[#161b22] border border-[#252b34] rounded overflow-hidden flex flex-col"
                  >
                    <div className="aspect-[4/3] bg-black relative">
                      {isVideo ? (
                        <video
                          src={m.dataUrl}
                          controls
                          preload="metadata"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img src={m.dataUrl} alt={m.name} className="w-full h-full object-cover" />
                      )}
                      {isVideo && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#ff6200] text-white text-[9px] font-mono font-bold rounded">
                          VIDEO
                        </span>
                      )}
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => removeMediaAsset(m.id)}
                          className="absolute top-1 right-1 p-1 bg-black/75 hover:bg-red-700 text-white rounded cursor-pointer"
                          title="Delete Media"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="p-2 space-y-1.5">
                      <div className="text-[10px] font-mono text-neutral-300 truncate" title={m.name}>
                        {m.name}
                      </div>
                      {isVideo ? (
                        <button
                          type="button"
                          onClick={() => updateSection('workshop', { videoUrl: getPersistableUrl(m) })}
                          className="w-full py-1 px-1.5 bg-[#0d1117] hover:bg-[#ff6200] text-[10px] font-mono text-neutral-300 hover:text-white rounded cursor-pointer"
                        >
                          Set Workshop Video
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            type="button"
                            onClick={() => updateTheme({ backgroundImageUrl: m.dataUrl })}
                            className="py-1 px-1.5 bg-[#0d1117] hover:bg-[#ff6200] text-[10px] font-mono text-neutral-300 hover:text-white rounded cursor-pointer"
                          >
                            Set Site BG
                          </button>
                          <button
                            type="button"
                            onClick={() => updateFounder({ photoUrl: m.dataUrl })}
                            className="py-1 px-1.5 bg-[#0d1117] hover:bg-[#ff6200] text-[10px] font-mono text-neutral-300 hover:text-white rounded cursor-pointer"
                          >
                            Set Founder
                          </button>
                          <button
                            type="button"
                            onClick={() => updateSiteIdentity({ logoUrl: m.dataUrl })}
                            className="py-1 px-1.5 bg-[#0d1117] hover:bg-[#ff6200] text-[10px] font-mono text-neutral-300 hover:text-white rounded cursor-pointer"
                          >
                            Set Logo
                          </button>
                          <button
                            type="button"
                            onClick={() => updateSection('hero', { imagePrimary: m.dataUrl })}
                            className="py-1 px-1.5 bg-[#0d1117] hover:bg-[#ff6200] text-[10px] font-mono text-neutral-300 hover:text-white rounded cursor-pointer"
                          >
                            Set Hero
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: SEO & BACKUP */}
        {activeTab === 'seo' && (
          <div className="space-y-4">
            {/* Live Google Search Preview */}
            <div className="p-3.5 bg-white text-slate-900 rounded-lg space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-500">
                Google Search Result Preview
              </div>
              <div className="text-xs text-emerald-700 truncate">{cmsData.seo.canonicalUrl}</div>
              <div className="text-sm font-bold text-blue-700 leading-snug">
                {cmsData.seo.metaTitle}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2">{cmsData.seo.metaDescription}</div>
            </div>

            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-3">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Search Engine Metadata (Live Head Sync)
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  SEO Page Title ({cmsData.seo.metaTitle.length} chars)
                </label>
                <input
                  type="text"
                  value={cmsData.seo.metaTitle}
                  onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Meta Description ({cmsData.seo.metaDescription.length} chars)
                </label>
                <textarea
                  rows={3}
                  value={cmsData.seo.metaDescription}
                  onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Target Kenya SEO Keywords
                </label>
                <textarea
                  rows={2}
                  value={cmsData.seo.keywords}
                  onChange={(e) => updateSeo({ keywords: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  OpenGraph Share Title (WhatsApp / LinkedIn)
                </label>
                <input
                  type="text"
                  value={cmsData.seo.ogTitle}
                  onChange={(e) => updateSeo({ ogTitle: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-neutral-400 mb-1">
                  Canonical Site URL
                </label>
                <input
                  type="text"
                  value={cmsData.seo.canonicalUrl}
                  onChange={(e) => updateSeo({ canonicalUrl: e.target.value })}
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded p-2 text-xs text-white"
                />
              </div>
            </div>

            {/* Backup & Restore */}
            <div className="p-3.5 bg-[#161b22] border border-[#252b34] rounded-lg space-y-2.5">
              <div className="font-mono uppercase text-[10px] text-[#ff6200] font-bold">
                Site Backup, Export &amp; Reset
              </div>

              <button
                type="button"
                onClick={exportCmsJson}
                className="w-full py-2 px-3 bg-[#0d1117] hover:bg-[#21262d] text-white border border-[#30363d] rounded font-mono flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#ff6200]" />
                <span>Export Site Content (.JSON)</span>
              </button>

              <label className="w-full py-2 px-3 bg-[#0d1117] hover:bg-[#21262d] text-white border border-[#30363d] rounded font-mono flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#ff6200]" />
                <span>Import Site Backup (.JSON)</span>
                <input
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = () => {
                      const ok = importCmsJson(reader.result as string);
                      setBackupNotice(
                        ok
                          ? 'Backup imported successfully.'
                          : 'Invalid CMS backup JSON file.'
                      );
                      setTimeout(() => setBackupNotice(''), 4000);
                    };
                    reader.readAsText(file);
                  }}
                />
              </label>

              {backupNotice && (
                <div className="text-[11px] font-mono text-amber-300 bg-[#0d1117] border border-amber-500/40 rounded px-2.5 py-1.5">
                  {backupNotice}
                </div>
              )}

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="w-full py-2 px-3 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-900/50 rounded font-mono flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Default Brand Content</span>
                </button>
              ) : (
                <div className="p-2.5 bg-red-950/60 border border-red-700/60 rounded space-y-2">
                  <div className="text-[11px] text-red-200 font-mono">
                    Restore all sections, FAQs, and styling back to factory defaults?
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        resetAllToDefaults();
                        setConfirmReset(false);
                        setBackupNotice('Site content restored to brand defaults.');
                        setTimeout(() => setBackupNotice(''), 3000);
                      }}
                      className="py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-mono font-bold cursor-pointer"
                    >
                      Confirm Reset
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReset(false)}
                      className="py-1.5 px-2 bg-[#0d1117] text-neutral-300 border border-[#30363d] rounded text-[11px] font-mono cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Studio Bottom Action Bar */}
      <div className="p-3 bg-[#0a0d12] border-t border-[#252b34] flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsEditorOpen(false);
            setPresentationMode(true);
          }}
          className="flex-1 py-2.5 px-3 bg-[#161b22] hover:bg-[#21262d] text-neutral-200 border border-[#30363d] rounded text-[11px] font-mono cursor-pointer flex items-center justify-center gap-1.5"
          title="Hide editor tools for clean client presentation (Press Ctrl+E to reopen)"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Client Preview</span>
        </button>

        <button
          type="button"
          onClick={() => setIsEditorOpen(false)}
          className="flex-1 py-2.5 px-3 bg-[#ff6200] hover:bg-[#e05600] text-white rounded text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
        >
          Publish &amp; View
        </button>
      </div>
    </aside>
  );
};
