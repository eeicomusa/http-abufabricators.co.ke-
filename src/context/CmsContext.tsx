import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CmsDataState,
  DEFAULT_CMS_STATE,
  SiteIdentity,
  FounderProfile,
  ThemeConfig,
  SeoConfig,
  SectionBlockConfig,
  SectionId,
  MachineProduct,
  CaseProject,
  SeoArticle,
  FaqItem,
  TestimonialItem,
  PartnerBadge,
  CompanyMetrics,
  SteelworkStructureItem,
  BUILTIN_MEDIA_PRESETS,
  BUILTIN_REAL_MEDIA,
  GENERATED_MEDIA
} from '../data/industrialData';
import {
  MediaAsset,
  getAllMediaAssets,
  saveMediaAsset,
  deleteMediaAsset,
  prepareMediaUpload
} from '../utils/mediaStore';

export type CmsTab = 'identity' | 'sections' | 'catalog' | 'media' | 'seo';
export type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

const CMS_STORAGE_KEY = 'abu_fabricators_cms_v2';
const ADMIN_AUTH_STORAGE_KEY = 'abu_admin_auth_v1';
const ADMIN_EMAIL = 'ericomusa92@gmail.com';
const ADMIN_PASSWORD = 'Mimi+wewe=us254';
const CURRENT_SCHEMA_VERSION = 11;

interface StoredCmsData extends CmsDataState {
  schemaVersion?: number;
}

interface CmsContextValue {
  cmsData: CmsDataState;
  mediaAssets: MediaAsset[];
  isAdminAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  loginAdmin: (email: string, password: string) => boolean;
  logoutAdmin: () => void;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  activeTab: CmsTab;
  setActiveTab: (tab: CmsTab) => void;
  selectedSectionId: SectionId;
  setSelectedSectionId: (id: SectionId) => void;
  previewDevice: PreviewDevice;
  setPreviewDevice: (device: PreviewDevice) => void;
  presentationMode: boolean;
  setPresentationMode: (hide: boolean) => void;
  lastSavedAt: number | null;

  // Actions
  updateSiteIdentity: (patch: Partial<SiteIdentity>) => void;
  updateFounder: (patch: Partial<FounderProfile>) => void;
  updateTheme: (patch: Partial<ThemeConfig>) => void;
  updateSeo: (patch: Partial<SeoConfig>) => void;
  updateFooterCopy: (patch: {
    footerAboutText?: string;
    footerFinalHeadline?: string;
    footerFinalSubtext?: string;
  }) => void;
  updateSection: (id: SectionId, patch: Partial<SectionBlockConfig>) => void;
  addCustomSection: (block: SectionBlockConfig) => void;
  deleteCustomSection: (id: SectionId) => void;
  moveSection: (id: SectionId, direction: 'up' | 'down') => void;
  toggleSectionVisibility: (id: SectionId) => void;
  getSection: (id: SectionId) => SectionBlockConfig;

  // Catalog CRUD
  addMachine: (machine: MachineProduct) => void;
  updateMachine: (id: string, patch: Partial<MachineProduct>) => void;
  deleteMachine: (id: string) => void;
  addProject: (project: CaseProject) => void;
  updateProject: (id: string, patch: Partial<CaseProject>) => void;
  deleteProject: (id: string) => void;
  addArticle: (article: SeoArticle) => void;
  updateArticle: (id: string, patch: Partial<SeoArticle>) => void;
  deleteArticle: (id: string) => void;
  addFaq: (faq: FaqItem) => void;
  updateFaq: (id: string, patch: Partial<FaqItem>) => void;
  deleteFaq: (id: string) => void;
  addTestimonial: (item: TestimonialItem) => void;
  updateTestimonial: (id: string, patch: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;
  addPartnerBadge: (badge: PartnerBadge) => void;
  deletePartnerBadge: (id: string) => void;
  updateCompanyMetrics: (patch: Partial<CompanyMetrics>) => void;
  addSteelworkItem: (item: SteelworkStructureItem) => void;
  updateSteelworkItem: (id: string, patch: Partial<SteelworkStructureItem>) => void;
  deleteSteelworkItem: (id: string) => void;

  // Media Library (Images & Videos)
  uploadMediaFile: (
    file: File,
    category?: MediaAsset['category']
  ) => Promise<MediaAsset>;
  removeMediaAsset: (id: string) => Promise<void>;

  // Backup & Reset
  exportCmsJson: () => void;
  importCmsJson: (jsonText: string) => boolean;
  resetAllToDefaults: () => void;
  openSectionInEditor: (id: SectionId) => void;
  openWithTab: (tab: CmsTab, sectionId?: SectionId) => void;
  resolveMediaUrl: (url?: string) => string;
}

const CmsContext = createContext<CmsContextValue | null>(null);

function loadInitialCmsData(): StoredCmsData {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_CMS_STATE, schemaVersion: CURRENT_SCHEMA_VERSION };
    const normalizedRaw = raw.replaceAll('/src/assets/images/', '/assets/images/');
    const parsed = JSON.parse(normalizedRaw) as Partial<StoredCmsData>;
    const parsedVersion = parsed.schemaVersion || 1;
    const needsRealMediaMigration = parsedVersion < 3;
    const needsV6Migration = parsedVersion < 6;
    const needsV7Migration = parsedVersion < 7;
    const needsV9Migration = parsedVersion < 9;
    const needsV11Migration = parsedVersion < CURRENT_SCHEMA_VERSION;

    const isLegacyOrExternalStock = (url?: string) =>
      Boolean(
        url &&
          (url.startsWith('/assets/images/') ||
            url.startsWith('https://albernus-inc-industrial-solutions.ai.studio/assets/images/'))
      );

    const isCustomUserUpload = (url?: string) =>
      Boolean(url && (url.startsWith('data:') || url.startsWith('media://')));

    const defaultMachineryById = new Map(
      DEFAULT_CMS_STATE.machinery.map((item) => [item.id, item])
    );

    const reconciledMachinery =
      Array.isArray(parsed.machinery) && parsed.machinery.length > 0
        ? parsed.machinery.map((item) => {
            const def = defaultMachineryById.get(item.id);
            if (
              def &&
              (!item.image ||
                isLegacyOrExternalStock(item.image) ||
                (needsV11Migration && !isCustomUserUpload(item.image)))
            ) {
              return { ...item, image: def.image };
            }
            return item;
          })
        : DEFAULT_CMS_STATE.machinery;

    const defaultSectionsById = new Map(
      DEFAULT_CMS_STATE.sections.map((item) => [item.id, item])
    );

    let reconciledSections: SectionBlockConfig[] =
      Array.isArray(parsed.sections) && parsed.sections.length > 0
        ? parsed.sections.map((sec) => {
            const def = defaultSectionsById.get(sec.id);
            if (!def) return sec;

            let nextImagePrimary =
              !sec.imagePrimary || isLegacyOrExternalStock(sec.imagePrimary)
                ? def.imagePrimary
                : sec.imagePrimary;

            let nextImageSecondary =
              !sec.imageSecondary || isLegacyOrExternalStock(sec.imageSecondary)
                ? def.imageSecondary
                : sec.imageSecondary;

            if (sec.id === 'hero' && needsV6Migration) {
              if (!isCustomUserUpload(sec.imagePrimary)) {
                nextImagePrimary = BUILTIN_REAL_MEDIA.twinTankCompressorWeld;
              }
              if (!isCustomUserUpload(sec.imageSecondary)) {
                nextImageSecondary = GENERATED_MEDIA.fieldDeploymentSteel;
              }
            }

            if (sec.id === 'industries' && needsV7Migration) {
              if (!isCustomUserUpload(sec.imagePrimary)) {
                nextImagePrimary = GENERATED_MEDIA.warehousePortalFrame;
              }
            }

            if (sec.id === 'crushing-flow' && needsV11Migration) {
              if (!isCustomUserUpload(sec.imagePrimary)) {
                nextImagePrimary = GENERATED_MEDIA.crushingScreeningPlant;
              }
            }

            if (sec.id === 'mining-solutions' && needsV11Migration) {
              if (!isCustomUserUpload(sec.imageSecondary)) {
                nextImageSecondary = GENERATED_MEDIA.goldProcessingTrommel;
              }
            }

            if (sec.id === 'spare-parts' && needsV11Migration) {
              if (!isCustomUserUpload(sec.imagePrimary)) {
                nextImagePrimary = GENERATED_MEDIA.wearSpareParts;
              }
              if (!isCustomUserUpload(sec.imageSecondary)) {
                nextImageSecondary = GENERATED_MEDIA.fabricationWorkshop;
              }
            }

            return {
              ...def,
              ...sec,
              imagePrimary: nextImagePrimary,
              imageSecondary: nextImageSecondary,
              videoUrl: sec.videoUrl || def.videoUrl
            };
          })
        : DEFAULT_CMS_STATE.sections;

    // Ensure newly added standard sections ('testimonials', 'faq') exist cleanly
    const existingSectionIds = new Set(reconciledSections.map((s) => s.id));
    const missingStandardSections = DEFAULT_CMS_STATE.sections.filter(
      (s) => !existingSectionIds.has(s.id)
    );
    if (missingStandardSections.length > 0) {
      reconciledSections = [...reconciledSections, ...missingStandardSections];
    }

    const defaultProjectsById = new Map(
      DEFAULT_CMS_STATE.projects.map((item) => [item.id, item])
    );

    let reconciledProjects =
      Array.isArray(parsed.projects) && parsed.projects.length > 0
        ? parsed.projects.map((p) => {
            const def = defaultProjectsById.get(p.id);
            if (!def) return p;
            const updatedImage =
              !p.image || isLegacyOrExternalStock(p.image) ? def.image : p.image;
            const updatedGallery =
              !p.gallery ||
              p.gallery.length === 0 ||
              p.gallery.some((img) => isLegacyOrExternalStock(img))
                ? def.gallery
                : p.gallery;
            return { ...p, image: updatedImage, gallery: updatedGallery };
          })
        : DEFAULT_CMS_STATE.projects;

    if (needsRealMediaMigration && Array.isArray(parsed.projects)) {
      const existingIds = new Set(parsed.projects.map((p) => p.id));
      const newDefaultProjects = DEFAULT_CMS_STATE.projects.filter(
        (p) => !existingIds.has(p.id)
      );
      reconciledProjects = [...newDefaultProjects, ...reconciledProjects];
    }

    const parsedTheme: Partial<ThemeConfig> = parsed.theme || {};
    const reconciledTheme: ThemeConfig = {
      ...DEFAULT_CMS_STATE.theme,
      ...parsedTheme,
      backgroundImageUrl:
        needsRealMediaMigration && !parsedTheme.backgroundImageUrl
          ? DEFAULT_CMS_STATE.theme.backgroundImageUrl
          : parsedTheme.backgroundImageUrl ?? DEFAULT_CMS_STATE.theme.backgroundImageUrl,
      backgroundImageOpacity:
        parsedTheme.backgroundImageOpacity ?? DEFAULT_CMS_STATE.theme.backgroundImageOpacity
    };

    return {
      ...DEFAULT_CMS_STATE,
      ...parsed,
      schemaVersion: CURRENT_SCHEMA_VERSION,
      siteIdentity: { ...DEFAULT_CMS_STATE.siteIdentity, ...(parsed.siteIdentity || {}) },
      founder: needsV9Migration
        ? {
            ...DEFAULT_CMS_STATE.founder,
            ...(parsed.founder || {}),
            name: DEFAULT_CMS_STATE.founder.name,
            role: DEFAULT_CMS_STATE.founder.role,
            experienceYears: DEFAULT_CMS_STATE.founder.experienceYears,
            bioParagraph1: DEFAULT_CMS_STATE.founder.bioParagraph1,
            bioParagraph2: DEFAULT_CMS_STATE.founder.bioParagraph2,
            bioParagraph3: DEFAULT_CMS_STATE.founder.bioParagraph3,
            milestoneNote: DEFAULT_CMS_STATE.founder.milestoneNote
          }
        : { ...DEFAULT_CMS_STATE.founder, ...(parsed.founder || {}) },
      theme: reconciledTheme,
      seo: needsV11Migration
        ? {
            ...DEFAULT_CMS_STATE.seo,
            ...(parsed.seo || {}),
            metaTitle: DEFAULT_CMS_STATE.seo.metaTitle,
            ogTitle: DEFAULT_CMS_STATE.seo.ogTitle
          }
        : { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) },
      sections: reconciledSections,
      machinery: reconciledMachinery,
      projects: reconciledProjects,
      articles:
        Array.isArray(parsed.articles) && parsed.articles.length > 0
          ? parsed.articles
          : DEFAULT_CMS_STATE.articles,
      faqs:
        Array.isArray(parsed.faqs) && parsed.faqs.length > 0
          ? parsed.faqs
          : DEFAULT_CMS_STATE.faqs,
      testimonials:
        Array.isArray(parsed.testimonials) && parsed.testimonials.length > 0
          ? parsed.testimonials
          : DEFAULT_CMS_STATE.testimonials,
      partners:
        Array.isArray(parsed.partners) && parsed.partners.length > 0
          ? parsed.partners
          : DEFAULT_CMS_STATE.partners,
      companyMetrics: {
        ...DEFAULT_CMS_STATE.companyMetrics,
        ...(parsed.companyMetrics || {})
      },
      steelworkGallery:
        Array.isArray(parsed.steelworkGallery) && parsed.steelworkGallery.length > 0
          ? parsed.steelworkGallery
          : DEFAULT_CMS_STATE.steelworkGallery
    };
  } catch {
    return { ...DEFAULT_CMS_STATE, schemaVersion: CURRENT_SCHEMA_VERSION };
  }
}

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cmsData, setCmsData] = useState<StoredCmsData>(loadInitialCmsData);
  const [uploadedMedia, setUploadedMedia] = useState<MediaAsset[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpenState] = useState(false);
  const [activeTab, setActiveTab] = useState<CmsTab>('identity');
  const [selectedSectionId, setSelectedSectionId] = useState<SectionId>('hero');
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');
  const [presentationMode, setPresentationMode] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  const setIsEditorOpen = useCallback(
    (open: boolean) => {
      if (open && !isAdminAuthenticated) {
        setIsLoginModalOpen(true);
        return;
      }
      setIsEditorOpenState(open);
    },
    [isAdminAuthenticated]
  );

  const loginAdmin = useCallback((email: string, password: string): boolean => {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem(ADMIN_AUTH_STORAGE_KEY, '1');
      } catch {
        // Ignore storage errors
      }
      setIsLoginModalOpen(false);
      setPresentationMode(false);
      setIsEditorOpenState(true);
      return true;
    }
    return false;
  }, []);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    setIsEditorOpenState(false);
    setIsLoginModalOpen(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Load IndexedDB media (both images & videos) on mount
  useEffect(() => {
    getAllMediaAssets().then(setUploadedMedia).catch(() => {});
  }, []);

  // Keyboard shortcut Ctrl+E / Cmd+E to toggle CMS editor cleanly even in presentation mode
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        if (!isAdminAuthenticated) {
          setIsLoginModalOpen(true);
          return;
        }
        setPresentationMode(false);
        setIsEditorOpenState((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isAdminAuthenticated]);

  // Persist CMS data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        CMS_STORAGE_KEY,
        JSON.stringify({ ...cmsData, schemaVersion: CURRENT_SCHEMA_VERSION })
      );
      setLastSavedAt(Date.now());
    } catch {
      // Ignore quota errors
    }
  }, [cmsData]);

  // Apply live Theme CSS variables to :root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--abu-bg', cmsData.theme.backgroundColor);
    root.style.setProperty('--abu-surface', cmsData.theme.surfaceColor);
    root.style.setProperty('--abu-surface-alt', cmsData.theme.surfaceAltColor);
    root.style.setProperty('--abu-border', cmsData.theme.borderColor);
    root.style.setProperty('--abu-text', cmsData.theme.textColor);
    root.style.setProperty('--abu-text-muted', cmsData.theme.textMutedColor);
    root.style.setProperty('--abu-accent', cmsData.theme.accentColor);
    root.style.setProperty('--abu-accent-hover', cmsData.theme.accentHoverColor);
    root.style.setProperty('--abu-amber', cmsData.theme.amberHighlight);
  }, [cmsData.theme]);

  // Apply live SEO Head metadata & JSON-LD
  useEffect(() => {
    document.title = cmsData.seo.metaTitle || cmsData.siteIdentity.companyName;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el && content) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', cmsData.seo.metaDescription);
    setMeta('meta[name="keywords"]', cmsData.seo.keywords);
    setMeta('meta[property="og:title"]', cmsData.seo.ogTitle);
    setMeta('meta[property="og:description"]', cmsData.seo.ogDescription);
    setMeta('meta[property="og:site_name"]', cmsData.siteIdentity.companyName);
    setMeta('meta[name="twitter:title"]', cmsData.seo.ogTitle);
    setMeta('meta[name="twitter:description"]', cmsData.seo.ogDescription);

    const ldScript = document.getElementById('abu-seo-jsonld');
    if (ldScript) {
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: cmsData.siteIdentity.companyName,
        alternateName: cmsData.siteIdentity.shortName,
        url: cmsData.seo.canonicalUrl,
        description: cmsData.seo.metaDescription,
        telephone: cmsData.siteIdentity.phoneDisplay,
        email: cmsData.siteIdentity.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: cmsData.siteIdentity.address,
          addressLocality: cmsData.siteIdentity.location,
          addressCountry: 'KE'
        },
        areaServed: ['Kenya', 'East Africa']
      });
    }
  }, [cmsData.seo, cmsData.siteIdentity]);

  const mediaAssets: MediaAsset[] = [
    ...uploadedMedia,
    ...BUILTIN_MEDIA_PRESETS.map((p) => ({ ...p, createdAt: 0 }))
  ];

  const updateSiteIdentity = useCallback((patch: Partial<SiteIdentity>) => {
    setCmsData((prev) => ({
      ...prev,
      siteIdentity: { ...prev.siteIdentity, ...patch }
    }));
  }, []);

  const updateFounder = useCallback((patch: Partial<FounderProfile>) => {
    setCmsData((prev) => ({
      ...prev,
      founder: { ...prev.founder, ...patch }
    }));
  }, []);

  const updateTheme = useCallback((patch: Partial<ThemeConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      theme: { ...prev.theme, ...patch }
    }));
  }, []);

  const updateSeo = useCallback((patch: Partial<SeoConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      seo: { ...prev.seo, ...patch }
    }));
  }, []);

  const updateFooterCopy = useCallback(
    (patch: {
      footerAboutText?: string;
      footerFinalHeadline?: string;
      footerFinalSubtext?: string;
    }) => {
      setCmsData((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const updateSection = useCallback((id: SectionId, patch: Partial<SectionBlockConfig>) => {
    setCmsData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, ...patch } : s))
    }));
  }, []);

  const addCustomSection = useCallback((block: SectionBlockConfig) => {
    setCmsData((prev) => ({
      ...prev,
      sections: [...prev.sections, block]
    }));
  }, []);

  const deleteCustomSection = useCallback((id: SectionId) => {
    setCmsData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id)
    }));
  }, []);

  const moveSection = useCallback((id: SectionId, direction: 'up' | 'down') => {
    setCmsData((prev) => {
      const idx = prev.sections.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.sections.length) return prev;
      const copy = [...prev.sections];
      const [item] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, item);
      return { ...prev, sections: copy };
    });
  }, []);

  const toggleSectionVisibility = useCallback((id: SectionId) => {
    setCmsData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    }));
  }, []);

  const getSection = useCallback(
    (id: SectionId): SectionBlockConfig => {
      return (
        cmsData.sections.find((s) => s.id === id) ||
        DEFAULT_CMS_STATE.sections.find((s) => s.id === id) || {
          id,
          label: id,
          visible: true
        }
      );
    },
    [cmsData.sections]
  );

  const addMachine = useCallback((machine: MachineProduct) => {
    setCmsData((prev) => ({
      ...prev,
      machinery: [machine, ...prev.machinery]
    }));
  }, []);

  const updateMachine = useCallback((id: string, patch: Partial<MachineProduct>) => {
    setCmsData((prev) => ({
      ...prev,
      machinery: prev.machinery.map((m) => (m.id === id ? { ...m, ...patch } : m))
    }));
  }, []);

  const deleteMachine = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      machinery: prev.machinery.filter((m) => m.id !== id)
    }));
  }, []);

  const addProject = useCallback((project: CaseProject) => {
    setCmsData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects]
    }));
  }, []);

  const updateProject = useCallback((id: string, patch: Partial<CaseProject>) => {
    setCmsData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...patch } : p))
    }));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  }, []);

  const addArticle = useCallback((article: SeoArticle) => {
    setCmsData((prev) => ({
      ...prev,
      articles: [article, ...prev.articles]
    }));
  }, []);

  const updateArticle = useCallback((id: string, patch: Partial<SeoArticle>) => {
    setCmsData((prev) => ({
      ...prev,
      articles: prev.articles.map((a) => (a.id === id ? { ...a, ...patch } : a))
    }));
  }, []);

  const deleteArticle = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id)
    }));
  }, []);

  const addFaq = useCallback((faq: FaqItem) => {
    setCmsData((prev) => ({ ...prev, faqs: [faq, ...prev.faqs] }));
  }, []);

  const updateFaq = useCallback((id: string, patch: Partial<FaqItem>) => {
    setCmsData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...patch } : f))
    }));
  }, []);

  const deleteFaq = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id)
    }));
  }, []);

  const addTestimonial = useCallback((item: TestimonialItem) => {
    setCmsData((prev) => ({ ...prev, testimonials: [item, ...prev.testimonials] }));
  }, []);

  const updateTestimonial = useCallback((id: string, patch: Partial<TestimonialItem>) => {
    setCmsData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t))
    }));
  }, []);

  const deleteTestimonial = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((t) => t.id !== id)
    }));
  }, []);

  const addPartnerBadge = useCallback((badge: PartnerBadge) => {
    setCmsData((prev) => ({ ...prev, partners: [...prev.partners, badge] }));
  }, []);

  const deletePartnerBadge = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      partners: prev.partners.filter((p) => p.id !== id)
    }));
  }, []);

  const updateCompanyMetrics = useCallback((patch: Partial<CompanyMetrics>) => {
    setCmsData((prev) => ({
      ...prev,
      companyMetrics: { ...prev.companyMetrics, ...patch }
    }));
  }, []);

  const addSteelworkItem = useCallback((item: SteelworkStructureItem) => {
    setCmsData((prev) => ({
      ...prev,
      steelworkGallery: [item, ...prev.steelworkGallery]
    }));
  }, []);

  const updateSteelworkItem = useCallback(
    (id: string, patch: Partial<SteelworkStructureItem>) => {
      setCmsData((prev) => ({
        ...prev,
        steelworkGallery: prev.steelworkGallery.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        )
      }));
    },
    []
  );

  const deleteSteelworkItem = useCallback((id: string) => {
    setCmsData((prev) => ({
      ...prev,
      steelworkGallery: prev.steelworkGallery.filter((item) => item.id !== id)
    }));
  }, []);

  const uploadMediaFile = useCallback(
    async (file: File, category: MediaAsset['category'] = 'general'): Promise<MediaAsset> => {
      const prepared = await prepareMediaUpload(file);
      const asset: MediaAsset = {
        id: `media-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        dataUrl: prepared.dataUrl,
        mediaType: prepared.mediaType,
        mimeType: prepared.mimeType,
        blob: prepared.blob,
        category,
        createdAt: Date.now()
      };
      await saveMediaAsset(asset);
      setUploadedMedia((prev) => [asset, ...prev]);
      return asset;
    },
    []
  );

  const removeMediaAsset = useCallback(async (id: string) => {
    await deleteMediaAsset(id);
    setUploadedMedia((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const exportCmsJson = useCallback(() => {
    const payload = JSON.stringify(cmsData, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abu-fabricators-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cmsData]);

  const importCmsJson = useCallback((jsonText: string): boolean => {
    try {
      const parsed = JSON.parse(jsonText) as Partial<CmsDataState>;
      if (!parsed.siteIdentity || !parsed.sections) return false;
      setCmsData({
        ...DEFAULT_CMS_STATE,
        ...parsed,
        schemaVersion: CURRENT_SCHEMA_VERSION,
        siteIdentity: { ...DEFAULT_CMS_STATE.siteIdentity, ...parsed.siteIdentity },
        founder: { ...DEFAULT_CMS_STATE.founder, ...(parsed.founder || {}) },
        theme: { ...DEFAULT_CMS_STATE.theme, ...(parsed.theme || {}) },
        seo: { ...DEFAULT_CMS_STATE.seo, ...(parsed.seo || {}) }
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const resetAllToDefaults = useCallback(() => {
    localStorage.removeItem(CMS_STORAGE_KEY);
    setCmsData({ ...DEFAULT_CMS_STATE, schemaVersion: CURRENT_SCHEMA_VERSION });
  }, []);

  const openSectionInEditor = useCallback(
    (id: SectionId) => {
      if (!isAdminAuthenticated) {
        setIsLoginModalOpen(true);
        return;
      }
      setPresentationMode(false);
      setIsEditorOpenState(true);
      setActiveTab('sections');
      setSelectedSectionId(id);
    },
    [isAdminAuthenticated]
  );

  const openWithTab = useCallback(
    (tab: CmsTab, sectionId?: SectionId) => {
      if (!isAdminAuthenticated) {
        setIsLoginModalOpen(true);
        return;
      }
      setPresentationMode(false);
      setIsEditorOpenState(true);
      setActiveTab(tab);
      if (sectionId) setSelectedSectionId(sectionId);
    },
    [isAdminAuthenticated]
  );

  const resolveMediaUrl = useCallback(
    (url?: string): string => {
      if (!url) return '';
      if (url.startsWith('media://')) {
        const targetId = url.slice('media://'.length);
        const found = mediaAssets.find((m) => m.id === targetId);
        return found?.dataUrl || '';
      }
      return url;
    },
    [mediaAssets]
  );

  return (
    <CmsContext.Provider
      value={{
        cmsData,
        mediaAssets,
        isAdminAuthenticated,
        isLoginModalOpen,
        setIsLoginModalOpen,
        loginAdmin,
        logoutAdmin,
        isEditorOpen,
        setIsEditorOpen,
        activeTab,
        setActiveTab,
        selectedSectionId,
        setSelectedSectionId,
        previewDevice,
        setPreviewDevice,
        presentationMode,
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
        resetAllToDefaults,
        openSectionInEditor,
        openWithTab,
        resolveMediaUrl
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export function useCms(): CmsContextValue {
  const ctx = useContext(CmsContext);
  if (!ctx) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return ctx;
}
