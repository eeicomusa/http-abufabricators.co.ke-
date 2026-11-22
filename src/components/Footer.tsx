import React from 'react';
import { ArrowRight, MapPin, Phone, Mail, MessageSquare, Sliders, Globe, Download, LogIn, LogOut } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PageRoute } from '../utils/router';
import { generateCompanyProfilePdf, generateTenderCapabilityDossierPdf } from '../utils/pdfGenerator';

interface FooterProps {
  currentRoute: PageRoute;
  onStartProject: () => void;
  onRequestQuote: () => void;
  onNavigate: (target: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentRoute,
  onStartProject,
  onRequestQuote,
  onNavigate
}) => {
  const {
    cmsData,
    isAdminAuthenticated,
    setIsLoginModalOpen,
    setIsEditorOpen,
    setPresentationMode,
    logoutAdmin
  } = useCms();
  const { siteIdentity } = cmsData;

  const whatsappUrl = `https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteIdentity.companyName}, I am ready to start a fabrication project and would like a free consultation and quotation.`
  )}`;

  const renderPageLink = (target: string, label: string) => (
    <a
      href={target.startsWith('/') ? target : `#${target}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(target);
      }}
      className="hover:text-white text-left cursor-pointer block transition-colors"
    >
      {label}
    </a>
  );

  return (
    <footer className="border-t border-[#1e293b] bg-[#0D1B2A] text-slate-300">
      {/* Conversion CTA Banner (hidden on /contact since /contact already focuses on the form & map) */}
      {currentRoute !== '/contact' && (
        <div className="border-b border-[#1e293b] py-14 bg-[#0a1522]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--abu-accent)] font-bold">
                Get in Touch · {siteIdentity.address}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white uppercase tracking-tight">
                {cmsData.footerFinalHeadline || 'Let’s Build Something Strong Together'}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {cmsData.footerFinalSubtext ||
                  'Ready to start your next fabrication project? Contact us today for a free consultation and quotation.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] text-white font-heading font-bold text-sm uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP {siteIdentity.phoneDisplay}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-[#0D1B2A] font-heading font-bold text-sm uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Contact Us &amp; Map</span>
              </a>

              <button
                onClick={onStartProject}
                className="px-5 py-3.5 bg-[#16293f] hover:bg-[#1e3550] text-white border border-slate-700 font-heading font-bold text-sm uppercase tracking-wider rounded-md transition-colors cursor-pointer"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* Col 1: Core Services */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              CORE SERVICES
            </h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>{renderPageLink('/services', 'Structural Steel Fabrication')}</li>
              <li>{renderPageLink('/services', 'Custom Metal Fabrication')}</li>
              <li>{renderPageLink('/services', 'Industrial Welding Services')}</li>
              <li>{renderPageLink('/services', 'Steel Frameworks')}</li>
              <li>{renderPageLink('/services', 'Fabrication Support')}</li>
              <li>
                <button onClick={() => onRequestQuote()} className="hover:text-white text-left cursor-pointer">
                  Get a Free Quote
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Machinery */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              MACHINERY
            </h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>{renderPageLink('/machinery', 'Jaw Crushers')}</li>
              <li>{renderPageLink('/machinery', 'Cone Crushers')}</li>
              <li>{renderPageLink('/machinery', 'Impact Crushers')}</li>
              <li>{renderPageLink('/machinery', 'Vibrating Screens')}</li>
              <li>{renderPageLink('conveyors', 'Conveyors & Feeders')}</li>
              <li>{renderPageLink('mining-solutions', 'Mining Ball Mills')}</li>
              <li>{renderPageLink('custom-machine', 'Custom Machinery')}</li>
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              SOLUTIONS
            </h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>{renderPageLink('maintenance', 'Industrial Installation')}</li>
              <li>{renderPageLink('maintenance-packages', 'Preventive Maintenance')}</li>
              <li>{renderPageLink('maintenance', 'Mechanical Repairs')}</li>
              <li>{renderPageLink('maintenance', 'Machine Refurbishment')}</li>
              <li>{renderPageLink('spare-parts', 'Spare Parts & Liners')}</li>
              <li>{renderPageLink('/contact', 'Site Mechanical Audits')}</li>
            </ul>
          </div>

          {/* Col 4: Projects & Industries */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              PROJECTS
            </h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>{renderPageLink('/projects', 'All Completed Projects')}</li>
              <li>{renderPageLink('industries', 'Civil Construction')}</li>
              <li>{renderPageLink('industries', 'Manufacturing')}</li>
              <li>{renderPageLink('industries', 'Quarrying & Aggregates')}</li>
              <li>{renderPageLink('industries', 'Mining & Gold')}</li>
              <li>{renderPageLink('industries', 'Logistics & Warehousing')}</li>
            </ul>
          </div>

          {/* Col 5: Company Pages */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              PAGES
            </h4>
            <ul className="space-y-2 font-mono text-slate-400">
              <li>{renderPageLink('/', 'Home')}</li>
              <li>{renderPageLink('/about', 'About Us')}</li>
              <li>{renderPageLink('/services', 'Services')}</li>
              <li>{renderPageLink('/projects', 'Projects')}</li>
              <li>{renderPageLink('/machinery', 'Machinery')}</li>
              <li>{renderPageLink('/guides', 'Engineering Guides')}</li>
              <li>{renderPageLink('/contact', 'Contact Us')}</li>
              <li className="pt-1 space-y-1.5">
                <button
                  type="button"
                  onClick={() => generateCompanyProfilePdf(cmsData, true)}
                  className="inline-flex items-center gap-1.5 text-[var(--abu-accent)] hover:text-white font-bold cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Company Profile PDF</span>
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => generateTenderCapabilityDossierPdf(cmsData, '', '', true)}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-white font-bold cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tender Capability Dossier</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 6: Location & Contact + Brand Logo */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[var(--abu-accent)]">
              CONTACT
            </h4>
            {siteIdentity.logoUrl && (
              <div className="bg-white p-2 rounded inline-block">
                <img
                  src={siteIdentity.logoUrl}
                  alt={siteIdentity.companyName}
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="space-y-2 text-slate-400 font-mono">
              <div className="text-white font-bold">{siteIdentity.companyName}</div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0 mt-0.5" />
                <span>{siteIdentity.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
                <a href={`tel:${siteIdentity.phoneRaw}`} className="hover:text-white font-bold">
                  {siteIdentity.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
                <span className="break-all">{siteIdentity.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[var(--abu-accent)] shrink-0" />
                <a
                  href={cmsData.seo.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all hover:text-white"
                >
                  {cmsData.seo.canonicalUrl}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {siteIdentity.companyName}. {siteIdentity.address}.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">{siteIdentity.tagline}</span>
            {isAdminAuthenticated ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPresentationMode(false);
                    setIsEditorOpen(true);
                  }}
                  className="text-slate-300 hover:text-[var(--abu-accent)] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Open CMS Studio"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>CMS Studio</span>
                </button>
                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="text-slate-400 hover:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Sign out of CMS Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <a
                href="#admin-login"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoginModalOpen(true);
                }}
                className="text-slate-400 hover:text-[var(--abu-accent)] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
