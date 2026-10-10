import React, { useState, useEffect } from 'react';
import { Edit2, Check } from 'lucide-react';
import { useWordPressCms } from '../../context/WordPressCmsContext';

interface WordPressInlineEditProps {
  sectionKey: string;
  fieldKey: string;
  value: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  style?: React.CSSProperties;
}

export const WordPressInlineEdit: React.FC<WordPressInlineEditProps> = ({
  sectionKey,
  fieldKey,
  value,
  as: Component = 'span',
  className = '',
  style,
}) => {
  const { isEditMode, updateSection } = useWordPressCms();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    setIsEditing(false);
    updateSection(sectionKey as any, { [fieldKey]: tempValue });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && Component !== 'p') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return (
      <Component className={className} style={style}>
        {value}
      </Component>
    );
  }

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1.5 my-1">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
          className="px-2 py-1 bg-white text-slate-900 border-2 border-[#2271b1] rounded-lg text-sm shadow-md focus:outline-none"
        />
        <button
          type="button"
          onClick={handleSave}
          className="p-1 bg-[#2271b1] text-white rounded-md hover:bg-[#135e96]"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      </span>
    );
  }

  return (
    <Component
      className={`group/wp relative inline cursor-pointer transition-all hover:bg-sky-500/10 hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#2271b1] rounded px-1 -mx-1 ${className}`}
      style={style}
      onClick={() => setIsEditing(true)}
      title="Click to live-edit text in WordPress mode"
    >
      {value}
      <span className="opacity-0 group-hover/wp:opacity-100 transition-opacity ml-1.5 inline-flex items-center text-[#2271b1] text-xs align-middle">
        <Edit2 className="w-3 h-3" />
      </span>
    </Component>
  );
};
