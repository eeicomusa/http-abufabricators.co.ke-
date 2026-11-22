import React from 'react';
import { ArrowUp, ArrowDown, Eye, EyeOff, Pencil } from 'lucide-react';
import { SectionId } from '../../data/industrialData';
import { useCms } from '../../context/CmsContext';

interface EditableSectionWrapperProps {
  sectionId: SectionId;
  children: React.ReactNode;
}

export const EditableSectionWrapper: React.FC<EditableSectionWrapperProps> = ({
  sectionId,
  children
}) => {
  const {
    isEditorOpen,
    selectedSectionId,
    getSection,
    openSectionInEditor,
    moveSection,
    toggleSectionVisibility
  } = useCms();

  const section = getSection(sectionId);

  // When not in editor mode, hidden sections don't render at all
  if (!isEditorOpen && !section.visible) {
    return null;
  }

  if (!isEditorOpen) {
    return <>{children}</>;
  }

  const isSelected = selectedSectionId === sectionId;

  return (
    <div
      className={`relative group transition-all ${
        isSelected
          ? 'ring-2 ring-[#ff6200] ring-inset'
          : 'hover:ring-2 hover:ring-[#ff6200]/70 hover:ring-inset'
      } ${!section.visible ? 'opacity-40 grayscale' : ''}`}
    >
      {/* Elementor Floating Section Toolbar */}
      <div
        className={`absolute top-2 right-3 z-30 flex items-center gap-1 px-2 py-1 rounded bg-[#0f1216]/95 border shadow-lg transition-opacity ${
          isSelected
            ? 'opacity-100 border-[#ff6200]'
            : 'opacity-0 group-hover:opacity-100 border-[#30363d]'
        }`}
      >
        <span className="text-[10px] font-mono uppercase tracking-wider text-white font-bold px-1.5">
          {section.label}
          {!section.visible ? ' (Hidden)' : ''}
        </span>

        <button
          type="button"
          onClick={() => openSectionInEditor(sectionId)}
          className="px-2 py-1 rounded bg-[#ff6200] hover:bg-[#e05600] text-white text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
          title="Edit Section Content"
        >
          <Pencil className="w-3 h-3" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => moveSection(sectionId, 'up')}
          className="p-1 rounded bg-[#161b22] hover:bg-[#252b34] text-neutral-300 hover:text-white cursor-pointer"
          title="Move Section Up"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => moveSection(sectionId, 'down')}
          className="p-1 rounded bg-[#161b22] hover:bg-[#252b34] text-neutral-300 hover:text-white cursor-pointer"
          title="Move Section Down"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => toggleSectionVisibility(sectionId)}
          className="p-1 rounded bg-[#161b22] hover:bg-[#252b34] text-neutral-300 hover:text-white cursor-pointer"
          title={section.visible ? 'Hide Section' : 'Show Section'}
        >
          {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
        </button>
      </div>

      {children}
    </div>
  );
};
