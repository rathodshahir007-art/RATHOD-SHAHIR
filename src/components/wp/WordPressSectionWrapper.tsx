import React from 'react';
import { 
  Edit3, 
  ArrowUp, 
  ArrowDown, 
  EyeOff, 
  Image as ImageIcon, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { useWordPressCms } from '../../context/WordPressCmsContext';

interface WordPressSectionWrapperProps {
  id: string;
  name: string;
  category?: string;
  children: React.ReactNode;
  onQuickImageChange?: () => void;
  className?: string;
}

export const WordPressSectionWrapper: React.FC<WordPressSectionWrapperProps> = ({
  id,
  name,
  category = 'Section',
  children,
  onQuickImageChange,
  className = '',
}) => {
  const {
    isEditMode,
    openSectionEditor,
    moveSection,
    toggleSectionVisibility,
    isSectionHidden,
    openMediaLibrary,
  } = useWordPressCms();

  if (isSectionHidden(id) && !isEditMode) {
    return null;
  }

  const isHidden = isSectionHidden(id);

  return (
    <div
      id={id}
      className={`relative transition-all duration-200 ${
        isEditMode
          ? `outline outline-2 outline-dashed outline-[#2271b1] outline-offset-[-2px] my-1 ${
              isHidden ? 'opacity-40 bg-slate-900/10' : ''
            }`
          : ''
      } ${className}`}
    >
      {/* WordPress / Elementor floating section control bar */}
      {isEditMode && (
        <div className="sticky top-10 z-40 flex items-center justify-between px-3 py-1.5 bg-[#1d2327]/95 backdrop-blur-md text-white border-b border-[#3c434a] shadow-lg rounded-t-lg mx-2 my-1 animate-in fade-in duration-100">
          {/* Section Identification */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#72aee6] animate-pulse"></span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              [WP: {category}]
            </span>
            <span className="text-xs font-bold text-white tracking-wide">
              {name}
            </span>
            {isHidden && (
              <span className="text-[10px] bg-red-900/80 text-red-200 px-1.5 py-0.5 rounded font-bold">
                HIDDEN ON LIVE SITE
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5">
            {onQuickImageChange && (
              <button
                type="button"
                onClick={onQuickImageChange}
                className="px-2 py-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-cyan-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                title="Change or upload section image"
              >
                <ImageIcon className="w-3 h-3" />
                <span>Media</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => moveSection(id, 'up')}
              className="p-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-slate-300 hover:text-white transition-colors"
              title="Move Section Up"
            >
              <ArrowUp className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => moveSection(id, 'down')}
              className="p-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-slate-300 hover:text-white transition-colors"
              title="Move Section Down"
            >
              <ArrowDown className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => toggleSectionVisibility(id)}
              className="p-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-slate-300 hover:text-white transition-colors"
              title={isHidden ? 'Show Section' : 'Hide Section'}
            >
              <EyeOff className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={() => openSectionEditor(id)}
              className="px-2.5 py-1 rounded bg-[#2271b1] hover:bg-[#135e96] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Section</span>
            </button>
          </div>
        </div>
      )}

      {/* Actual Section Content */}
      {children}
    </div>
  );
};
