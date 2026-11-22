import React, { useState } from 'react';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PageRoute } from '../utils/router';

interface NavbarProps {
  currentRoute: PageRoute;
  onRequestQuote: () => void;
  onNavigate: (target: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onRequestQuote,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cmsData } = useCms();
  const { siteIdentity } = cmsData;

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  const navItems: { route: PageRoute; label: string }[] = [
    { route: '/', label: 'Home' },
    { route: '/services', label: 'Services' },
    { route: '/about', label: 'About Us' },
    { route: '/projects', label: 'Projects' },
    { route: '/machinery', label: 'Machinery' },
    { route: '/guides', label: 'Guides' },
    { route: '/contact', label: 'Contact' }
  ];

  const logoContainerClass =
    siteIdentity.logoFrameStyle === 'white-badge'
      ? 'bg-white px-2 py-1 rounded border border-[var(--abu-border)] shadow-sm'
      : siteIdentity.logoFrameStyle === 'bordered-card'
      ? 'bg-[#0D1B2A] px-2 py-1 rounded border border-[#1E293B]'
      : '';

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--abu-bg) 95%, transparent)',
        borderColor: 'var(--abu-border)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Zone 1: Brand Wordmark + Uploaded Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-3 text-left group shrink-0 cursor-pointer"
          >
            {siteIdentity.logoUrl && (
              <div className={`${logoContainerClass} shrink-0 flex items-center justify-center`}>
                <img
                  src={siteIdentity.logoUrl}
                  alt={siteIdentity.companyName}
                  className="h-12 w-auto max-w-[125px] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="hidden sm:block">
              <span className="text-lg xl:text-xl font-extrabold tracking-tight text-[var(--abu-text)] font-heading uppercase group-hover:text-[var(--abu-accent)] transition-colors whitespace-nowrap">
                {siteIdentity.shortName}
              </span>
              <span className="block text-[10px] text-[var(--abu-text-muted)] uppercase tracking-widest font-mono whitespace-nowrap">
                {siteIdentity.subLabel}
              </span>
            </div>
          </a>

          {/* Zone 2: Clean single-line multi-page links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-[var(--abu-text-muted)]">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={item.route}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.route);
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer underline-offset-8 ${
                    isActive
                      ? 'text-[var(--abu-accent)] font-bold underline'
                      : 'hover:text-[var(--abu-accent)] hover:underline'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${siteIdentity.phoneRaw}`}
              className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-[var(--abu-text)] hover:border-[var(--abu-accent)] px-3 py-2 rounded border transition-colors whitespace-nowrap"
              style={{ backgroundColor: 'var(--abu-surface)', borderColor: 'var(--abu-border)' }}
              title={`Call ${siteIdentity.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[var(--abu-accent)]" />
              <span className="font-bold">{siteIdentity.phoneDisplay}</span>
            </a>

            <button
              onClick={onRequestQuote}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[var(--abu-accent)] hover:bg-[var(--abu-accent-hover)] rounded-md transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--abu-text)] hover:text-[var(--abu-accent)] rounded-md border border-[var(--abu-border)] ml-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden border-t px-4 pt-3 pb-6 space-y-2 shadow-lg"
          style={{ backgroundColor: 'var(--abu-bg)', borderColor: 'var(--abu-border)' }}
        >
          <div className="text-xs font-mono text-[var(--abu-text-muted)] pb-2 border-b border-[var(--abu-border)]">
            {siteIdentity.location} · {siteIdentity.phoneDisplay}
          </div>
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.route}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.route);
                }}
                className={`block w-full text-left py-2 px-2 rounded font-medium cursor-pointer ${
                  isActive
                    ? 'text-[var(--abu-accent)] font-bold bg-[var(--abu-surface)]'
                    : 'text-[var(--abu-text)] hover:text-[var(--abu-accent)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-3 border-t border-[var(--abu-border)] flex flex-col gap-2">
            <button
              onClick={() => {
                onRequestQuote();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-[var(--abu-accent)] text-white text-center font-bold uppercase rounded-md text-sm cursor-pointer"
            >
              Get a Free Quote
            </button>
            <a
              href={`https://wa.me/${siteIdentity.whatsappNumber}?text=${encodeURIComponent(
                `Hello ${siteIdentity.companyName}, I would like to discuss a fabrication or engineering project.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0D1B2A] text-white text-center font-bold uppercase rounded-md text-sm"
            >
              Call or WhatsApp {siteIdentity.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
