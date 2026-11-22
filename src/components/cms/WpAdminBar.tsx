import React, { useState } from 'react';
import {
  Layout,
  Plus,
  Image as ImageIcon,
  Palette,
  Eye,
  FolderKanban,
  UserCheck,
  ChevronDown,
  Globe,
  LogOut
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PageRoute, PAGE_DEFINITIONS } from '../../utils/router';

interface WpAdminBarProps {
  currentRoute: PageRoute;
  onNavigate: (target: string) => void;
}

export const WpAdminBar: React.FC<WpAdminBarProps> = ({ currentRoute, onNavigate }) => {
  const {
    cmsData,
    isAdminAuthenticated,
    isEditorOpen,
    setIsEditorOpen,
    presentationMode,
    setPresentationMode,
    openWithTab,
    logoutAdmin
  } = useCms();

  const [newMenuOpen, setNewMenuOpen] = useState(false);

  if (!isAdminAuthenticated || presentationMode) return null;

  return (
    <div className="bg-[#1d2327] text-neutral-200 border-b border-black/40 text-[11px] font-mono z-50 relative select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-2 overflow-x-auto">
        {/* Left WP + Elementor Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsEditorOpen(!isEditorOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-[#2c3338] text-white font-bold cursor-pointer transition-colors"
            title="Toggle WordPress CMS Studio (Ctrl+E)"
          >
            <span className="w-4 h-4 rounded-sm bg-[#ff6200] text-white text-[9px] font-heading flex items-center justify-center">
              W
            </span>
            <span className="hidden sm:inline truncate max-w-[140px]">
              {cmsData.siteIdentity.shortName} CMS
            </span>
          </button>

          <button
            type="button"
            onClick={() => openWithTab('sections')}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#92003b] hover:bg-[#b50049] text-white font-bold cursor-pointer transition-colors"
            title="Edit Page Visually with Elementor"
          >
            <Layout className="w-3 h-3" />
            <span>Edit with Elementor</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setNewMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] text-neutral-200 hover:text-white cursor-pointer transition-colors"
            >
              <Plus className="w-3 h-3 text-[#ff6200]" />
              <span>New</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {newMenuOpen && (
              <div
                onMouseLeave={() => setNewMenuOpen(false)}
                className="absolute left-0 top-full mt-1 w-52 bg-[#1d2327] border border-[#3c434a] rounded shadow-2xl py-1 z-50"
              >
                <button
                  type="button"
                  onClick={() => {
                    setNewMenuOpen(false);
                    openWithTab('catalog');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2c3338] text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <FolderKanban className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>New Portfolio / Product</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewMenuOpen(false);
                    openWithTab('sections');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2c3338] text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <Layout className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>New Elementor Block</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewMenuOpen(false);
                    openWithTab('media');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2c3338] text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>Upload Photos / Videos</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNewMenuOpen(false);
                    openWithTab('identity');
                  }}
                  className="w-full text-left px-3 py-1.5 hover:bg-[#2c3338] text-neutral-200 hover:text-white flex items-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#ff6200]" />
                  <span>Edit Founder &amp; Background</span>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => openWithTab('media')}
            className="hidden md:flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] text-neutral-300 hover:text-white cursor-pointer"
          >
            <ImageIcon className="w-3 h-3 text-[#ff6200]" />
            <span>Media (Images &amp; Videos)</span>
          </button>

          <button
            type="button"
            onClick={() => openWithTab('identity')}
            className="hidden lg:flex items-center gap-1 px-2 py-1 rounded hover:bg-[#2c3338] text-neutral-300 hover:text-white cursor-pointer"
          >
            <Palette className="w-3 h-3 text-[#ff6200]" />
            <span>Customize</span>
          </button>
        </div>

        {/* Right Page Switcher & Client View */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden xl:flex items-center gap-1 text-[10px] text-neutral-400">
            <Globe className="w-3 h-3" />
            <span>Page:</span>
            <select
              value={currentRoute}
              onChange={(e) => onNavigate(e.target.value)}
              className="bg-[#2c3338] text-white border border-[#3c434a] rounded px-1.5 py-0.5 text-[10px] cursor-pointer"
            >
              {(Object.keys(PAGE_DEFINITIONS) as PageRoute[]).map((r) => (
                <option key={r} value={r}>
                  {PAGE_DEFINITIONS[r].label} ({r})
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsEditorOpen(false);
              setPresentationMode(true);
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-neutral-200 hover:text-white cursor-pointer"
            title="Hide WordPress Admin Bar for clean client viewing (Ctrl+E to restore)"
          >
            <Eye className="w-3 h-3 text-emerald-400" />
            <span>Hide Admin Bar</span>
          </button>

          <button
            type="button"
            onClick={logoutAdmin}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#2c3338] hover:bg-red-900/60 text-neutral-300 hover:text-white cursor-pointer"
            title="Sign out of CMS Admin"
          >
            <LogOut className="w-3 h-3 text-red-400" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
