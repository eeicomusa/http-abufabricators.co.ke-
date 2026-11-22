import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { OnePartnerSection } from './components/OnePartnerSection';
import { EquipmentFinderSection } from './components/EquipmentFinderSection';
import { IndustriesSection } from './components/IndustriesSection';
import { MachinerySection } from './components/MachinerySection';
import { CrushingPlantFlow } from './components/CrushingPlantFlow';
import { MiningGoldSection } from './components/MiningGoldSection';
import { CustomMachineBuilder } from './components/CustomMachineBuilder';
import { FabricationAndWelding } from './components/FabricationAndWelding';
import { RepairAndRefurbishment } from './components/RepairAndRefurbishment';
import { ConveyorsSection } from './components/ConveyorsSection';
import { MaintenancePackages } from './components/MaintenancePackages';
import { EngineeringProcessSection } from './components/EngineeringProcessSection';
import { WorkshopShowcase } from './components/WorkshopShowcase';
import { ProjectsPortfolio } from './components/ProjectsPortfolio';
import { SparePartsSection } from './components/SparePartsSection';
import { KenyaMarketStrategy } from './components/KenyaMarketStrategy';
import { SeoArticlesHub } from './components/SeoArticlesHub';
import { AboutWorkshop } from './components/AboutWorkshop';
import { FounderProfile } from './components/FounderProfile';
import { ProfessionalAccreditations } from './components/ProfessionalAccreditations';
import { PageHeaderBanner } from './components/PageHeaderBanner';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { UniversalQuoteModal } from './components/UniversalQuoteModal';
import { SendDrawingModal } from './components/SendDrawingModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CmsStudioPanel } from './components/cms/CmsStudioPanel';
import { AdminLoginModal } from './components/cms/AdminLoginModal';
import { EditableSectionWrapper } from './components/cms/EditableSectionWrapper';
import { WpAdminBar } from './components/cms/WpAdminBar';
import { CustomBlockSection } from './components/cms/CustomBlockSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { StructuralSteelGallery } from './components/StructuralSteelGallery';
import { CountyDispatchSection } from './components/CountyDispatchSection';
import { QualityComplianceSection } from './components/QualityComplianceSection';
import { useCms } from './context/CmsContext';
import { CaseProject, SectionId } from './data/industrialData';
import {
  PageRoute,
  PAGE_DEFINITIONS,
  PAGE_SECTIONS,
  getRouteForSection,
  normalizePathToRoute
} from './utils/router';

export default function App() {
  const { cmsData, isEditorOpen, selectedSectionId, previewDevice } = useCms();

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    normalizePathToRoute(window.location.pathname, window.location.hash)
  );
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [quoteDivision, setQuoteDivision] = useState('FABRICATION');
  const [quoteDetails, setQuoteDetails] = useState('');
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  // Listen for Google Maps Platform quota events
  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizePathToRoute(window.location.pathname, window.location.hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Automatically switch page in live preview when selecting a section inside CMS Studio
  useEffect(() => {
    if (!isEditorOpen) return;
    const selectedSec = cmsData.sections.find((s) => s.id === selectedSectionId);
    const target = getRouteForSection(selectedSectionId, selectedSec?.targetPage);
    setCurrentRoute((prev) => {
      if (target.route !== prev) {
        window.history.pushState(null, '', target.route);
        return target.route;
      }
      return prev;
    });
  }, [isEditorOpen, selectedSectionId, cmsData.sections]);

  const navigateTo = useCallback(
    (target: string) => {
      let nextRoute: PageRoute;
      let scrollTargetId: string | undefined;

      if (target.startsWith('/')) {
        nextRoute = normalizePathToRoute(target);
      } else {
        const resolved = getRouteForSection(target);
        nextRoute = resolved.route;
        scrollTargetId = resolved.hash;
      }

      if (nextRoute !== currentRoute) {
        window.history.pushState(null, '', nextRoute);
        setCurrentRoute(nextRoute);
        if (scrollTargetId) {
          setTimeout(() => {
            const el = document.getElementById(scrollTargetId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (scrollTargetId) {
        const el = document.getElementById(scrollTargetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentRoute]
  );

  const handleOpenQuoteWithDivision = (division: string, details = '') => {
    setQuoteDivision(division.toUpperCase());
    setQuoteDetails(details);
    setQuoteModalOpen(true);
  };

  const handleMachineQuote = (machineName: string) => {
    handleOpenQuoteWithDivision(
      'EQUIPMENT',
      `Inquiry for ${machineName}. Please provide technical specifications and pricing for Kenya delivery.`
    );
  };

  const handleDiscussProject = (project: CaseProject) => {
    handleOpenQuoteWithDivision(
      'FABRICATION',
      `Interested in an engineering setup similar to "${project.title}" in ${project.location}. Industry: ${project.clientIndustry}.`
    );
  };

  const renderSectionContent = (id: SectionId): React.ReactNode => {
    switch (id) {
      case 'hero':
        return (
          <Hero
            onStartProject={() => handleOpenQuoteWithDivision('FABRICATION')}
            onRequestQuote={() => navigateTo('/services')}
            onExploreCapabilities={() => navigateTo('/machinery')}
          />
        );
      case 'trust-bar':
        return <TrustBar />;
      case 'one-partner':
        return (
          <OnePartnerSection
            onNavigateDivision={(div) => navigateTo(div)}
            onOpenQuote={() => handleOpenQuoteWithDivision('CUSTOM MACHINE')}
          />
        );
      case 'equipment-finder':
        return (
          <EquipmentFinderSection
            onSelectProductRecommendation={({ industry, requirement, notes }) => {
              handleOpenQuoteWithDivision(
                'EQUIPMENT',
                `Equipment recommendation: Industry: ${industry}, Requirement: ${requirement}. Note: ${notes}`
              );
            }}
            onRequestQuoteWithPrefill={({ division, details }) => {
              handleOpenQuoteWithDivision(division, details);
            }}
          />
        );
      case 'industries':
        return (
          <IndustriesSection
            onSelectIndustry={(indId) => {
              handleOpenQuoteWithDivision(
                'FABRICATION',
                `Inquiry regarding fabrication & equipment for ${indId} sector in Kenya.`
              );
            }}
            onRequestCustomConsultation={() => {
              handleOpenQuoteWithDivision(
                'ENGINEERING CONSULTATION',
                'Requesting custom engineering consultation for unique industrial requirement.'
              );
            }}
          />
        );
      case 'machinery':
        return <MachinerySection onRequestQuoteForMachine={handleMachineQuote} />;
      case 'crushing-flow':
        return (
          <CrushingPlantFlow
            onPlanPlantConsultation={() => {
              handleOpenQuoteWithDivision(
                'EQUIPMENT',
                'Requesting complete crushing plant flowsheet design and equipment configuration.'
              );
            }}
          />
        );
      case 'mining-solutions':
        return (
          <MiningGoldSection
            onDiscussMiningProject={() => {
              handleOpenQuoteWithDivision(
                'EQUIPMENT',
                'Requesting engineering discussion for mining comminution & processing equipment in Kenya.'
              );
            }}
          />
        );
      case 'custom-machine':
        return <CustomMachineBuilder />;
      case 'fabrication':
        return (
          <FabricationAndWelding
            onRequestFabricationQuote={() => handleOpenQuoteWithDivision('FABRICATION')}
            onRequestWeldingQuote={() => handleOpenQuoteWithDivision('WELDING')}
          />
        );
      case 'maintenance':
        return (
          <RepairAndRefurbishment
            onRequestAssessment={() => {
              handleOpenQuoteWithDivision(
                'REPAIR',
                'Requesting site mechanical assessment or workshop refurbishment for machinery in Kenya.'
              );
            }}
          />
        );
      case 'conveyors':
        return (
          <ConveyorsSection
            onRequestConveyorQuote={() =>
              handleOpenQuoteWithDivision(
                'EQUIPMENT',
                'Requesting quotation for industrial troughed belt conveyor system.'
              )
            }
          />
        );
      case 'maintenance-packages':
        return (
          <MaintenancePackages
            onSelectTier={(tierName) => {
              handleOpenQuoteWithDivision(
                'MAINTENANCE',
                `Inquiry regarding ${tierName} Maintenance Agreement for plant in Kenya.`
              );
            }}
          />
        );
      case 'engineering-process':
        return (
          <EngineeringProcessSection
            onStartProject={() => handleOpenQuoteWithDivision('FABRICATION')}
          />
        );
      case 'workshop':
        return <WorkshopShowcase />;
      case 'projects':
        return <ProjectsPortfolio onDiscussSimilarProject={handleDiscussProject} />;
      case 'spare-parts':
        return <SparePartsSection />;
      case 'kenya-strategy':
        return <KenyaMarketStrategy />;
      case 'seo-guides':
        return <SeoArticlesHub />;
      case 'about':
        return (
          <>
            <FounderProfile />
            <ProfessionalAccreditations />
            <AboutWorkshop />
          </>
        );
      case 'testimonials':
        return <TestimonialsSection />;
      case 'faq':
        return <FaqSection onRequestQuote={() => handleOpenQuoteWithDivision('FABRICATION')} />;
      case 'steelwork-gallery':
        return (
          <StructuralSteelGallery
            onRequestSteelworkQuote={(item) =>
              handleOpenQuoteWithDivision(
                'FABRICATION',
                `Steelwork inquiry: ${item.title} (${item.category}, ${item.typicalSpanOrCapacity}). Steel Spec: ${item.steelGrade}.`
              )
            }
          />
        );
      case 'county-dispatch':
        return (
          <CountyDispatchSection
            onBookDispatch={(corridor) =>
              handleOpenQuoteWithDivision(
                'LOGISTICS & SITE CREW',
                `County Dispatch & Rigging Inquiry for ${corridor.regionName} (${corridor.counties.join(', ')}). Haulage: ${corridor.vehicleClass}.`
              )
            }
          />
        );
      case 'quality-compliance':
        return (
          <QualityComplianceSection
            onOpenQuote={(details) => handleOpenQuoteWithDivision('TENDER & PROCUREMENT', details)}
          />
        );
      default: {
        const customSec = cmsData.sections.find((s) => s.id === id);
        if (customSec?.isCustomBlock) {
          return (
            <CustomBlockSection
              section={customSec}
              onActionClick={() => handleOpenQuoteWithDivision('FABRICATION')}
            />
          );
        }
        return null;
      }
    }
  };

  const previewFrameClass =
    isEditorOpen && previewDevice === 'tablet'
      ? 'max-w-[768px] mx-auto border-x border-[var(--abu-border)] shadow-2xl'
      : isEditorOpen && previewDevice === 'mobile'
      ? 'max-w-[390px] mx-auto border-x border-[var(--abu-border)] shadow-2xl'
      : 'w-full';

  const activeSectionsForPage =
    currentRoute === '/contact'
      ? []
      : cmsData.sections.filter((sec) =>
          sec.isCustomBlock
            ? (sec.targetPage || '/') === currentRoute
            : PAGE_SECTIONS[currentRoute].includes(sec.id)
        );

  const siteBgOpacity = Math.max(0, Math.min(0.45, cmsData.theme.backgroundImageOpacity ?? 0.1));

  return (
    <div
      className="min-h-screen text-[var(--abu-text)] flex flex-col selection:bg-[var(--abu-accent)] selection:text-white relative"
      style={{ backgroundColor: 'var(--abu-bg)', color: 'var(--abu-text)' }}
    >
      {/* Subtle Fixed Site-Wide Background Image (Landingaone.jpg) Preserving White Backdrop Crispness */}
      {cmsData.theme.backgroundImageUrl && siteBgOpacity > 0 && (
        <div
          className="fixed inset-0 pointer-events-none z-[1] overflow-hidden mix-blend-multiply"
          style={{ opacity: siteBgOpacity * 0.45 }}
          aria-hidden="true"
        >
          <img
            src={cmsData.theme.backgroundImageUrl}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Docked WordPress + Elementor CMS Studio Sidebar */}
      <CmsStudioPanel />

      {/* Main Website Canvas */}
      <div className={`flex-1 flex flex-col transition-all duration-200 relative z-[2] ${isEditorOpen ? 'sm:pl-[400px]' : ''}`}>
        <div className={`${previewFrameClass} flex flex-col min-h-screen`}>
          {/* WordPress-style Admin Top Bar */}
          <WpAdminBar currentRoute={currentRoute} onNavigate={navigateTo} />

          {/* Google Maps Platform Quota Notice */}
          {mapsQuotaExceeded && (
            <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
              <span>
                Google Maps Platform quota reached. If you are the app owner, visit{' '}
                <a
                  href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-amber-950 hover:text-amber-800"
                >
                  maps developer site
                </a>{' '}
                for instructions to update your account.
              </span>
            </div>
          )}

          {/* Top Navigation Bar */}
          <Navbar
            currentRoute={currentRoute}
            onRequestQuote={() => handleOpenQuoteWithDivision('FABRICATION')}
            onNavigate={navigateTo}
          />

          {/* Main Page Content */}
          <main className="flex-1">
            {currentRoute !== '/' && (
              <PageHeaderBanner
                route={currentRoute}
                onNavigate={(r) => navigateTo(r)}
                onRequestQuote={() => handleOpenQuoteWithDivision('FABRICATION')}
              />
            )}

            {currentRoute === '/contact' ? (
              <ContactSection onOpenDetailedSpecModal={() => handleOpenQuoteWithDivision('FABRICATION')} />
            ) : (
              activeSectionsForPage.map((sec) => (
                <EditableSectionWrapper key={sec.id} sectionId={sec.id}>
                  {renderSectionContent(sec.id)}
                </EditableSectionWrapper>
              ))
            )}

            {/* Quick Page Directory Strip on Home Page */}
            {currentRoute === '/' && (
              <section
                className="py-16 border-b"
                style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                        Explore ABU Fabricators
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[var(--abu-text)] uppercase mt-1">
                        Dedicated Pages For Every Division
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(['/services', '/about', '/projects', '/machinery', '/guides', '/contact'] as PageRoute[]).map(
                      (r) => {
                        const page = PAGE_DEFINITIONS[r];
                        return (
                          <a
                            key={r}
                            href={r}
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(r);
                            }}
                            className="p-5 border rounded-lg hover:border-[var(--abu-accent)] transition-all group flex flex-col justify-between shadow-xs"
                            style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
                          >
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-mono uppercase text-[var(--abu-accent)] font-bold">
                                {page.label}
                              </span>
                              <h3 className="text-lg font-heading font-bold text-[var(--abu-text)] uppercase group-hover:text-[var(--abu-accent)] transition-colors">
                                {page.title}
                              </h3>
                              <p className="text-xs text-[var(--abu-text-muted)] line-clamp-2">{page.subtitle}</p>
                            </div>
                            <div className="pt-4 mt-3 border-t border-[var(--abu-border)] flex items-center justify-between text-xs font-mono font-bold text-[var(--abu-text)] group-hover:text-[var(--abu-accent)]">
                              <span>Open {page.label} Page</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </a>
                        );
                      }
                    )}
                  </div>
                </div>
              </section>
            )}
          </main>

          {/* Footer with Multi-Page Links */}
          <Footer
            currentRoute={currentRoute}
            onStartProject={() => handleOpenQuoteWithDivision('FABRICATION')}
            onRequestQuote={() => handleOpenQuoteWithDivision('FABRICATION')}
            onNavigate={navigateTo}
          />
        </div>
      </div>

      {/* Floating WhatsApp, CMS Admin Launcher & Mobile Sticky Bar */}
      <WhatsAppFloatingButton
        onRequestQuote={() => handleOpenQuoteWithDivision('FABRICATION')}
      />

      {/* Universal Quotation Modal */}
      <UniversalQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        prefillDivision={quoteDivision}
        prefillDetails={quoteDetails}
      />

      {/* Engineering Drawing Upload Modal */}
      <SendDrawingModal
        isOpen={drawingModalOpen}
        onClose={() => setDrawingModalOpen(false)}
      />

      {/* Administrator Login Modal for CMS Access */}
      <AdminLoginModal />
    </div>
  );
}
