import React, { useState } from 'react';
import { 
  Sliders, 
  Eye, 
  EyeOff, 
  Check, 
  RotateCcw, 
  FileCode, 
  ChevronDown, 
  Layers, 
  Sparkles, 
  Plus, 
  Download,
  Copy,
  ExternalLink,
  Edit3
} from 'lucide-react';
import { useWordPressCms } from '../../context/WordPressCmsContext';

export const WordPressAdminBar: React.FC = () => {
  const {
    isEditMode,
    toggleEditMode,
    openCustomizer,
    openSectionEditor,
    saveStatus,
    resetToDefaults,
    exportWpContent,
    companyInfo,
  } = useWordPressCms();

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'gutenberg_blocks'>('json');
  const [copied, setCopied] = useState(false);
  const [isJumpOpen, setIsJumpOpen] = useState(false);

  const sectionsList = [
    { id: 'hero', name: 'Hero Banner & Core Stats' },
    { id: 'materialRange', name: 'Material Range (Prime / Off-Grade / Recycled)' },
    { id: 'products', name: 'Core Polymer Products Catalog' },
    { id: 'buySell', name: 'Direct Buy & Sell Desk' },
    { id: 'sourcing', name: 'Sourcing & Recycling Process' },
    { id: 'tradeMap', name: 'Global Shipping & Trade Map' },
    { id: 'shippingBanner', name: 'Container Shipping Panoramic Banner' },
    { id: 'whyChoose', name: 'Why Choose Newways Enterprise' },
    { id: 'marketDesk', name: 'Market Desk & Live Pricing' },
    { id: 'community', name: 'WhatsApp Community Network' },
    { id: 'footer', name: 'Footer & Corporate Info' },
  ];

  const handleJumpToSection = (sectionId: string) => {
    setIsJumpOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    openSectionEditor(sectionId);
  };

  const handleCopyExport = () => {
    const text = exportWpContent(exportFormat);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadExport = () => {
    const text = exportWpContent(exportFormat);
    const blob = new Blob([text], { 
      type: exportFormat === 'json' ? 'application/json' : 'text/html' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFormat === 'json' ? 'newways-wordpress-data.json' : 'newways-gutenberg-blocks.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* WordPress Top Admin Bar */}
      <aside 
        aria-label="WordPress Administrator Bar"
        className="sticky top-0 z-[100] bg-[#1d2327] text-[#c3c4c7] text-[13px] border-b border-[#3c434a] shadow-md select-none font-sans"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-9">
          {/* Left: WordPress Branding & Navigation Jump */}
          <div className="flex items-center gap-3">
            {/* WP Logo */}
            <div 
              className="flex items-center gap-1.5 text-white hover:text-[#72aee6] transition-colors cursor-pointer py-1"
              title="WordPress Visual Content Management System"
              onClick={() => openCustomizer('active')}
            >
              <div className="w-5 h-5 rounded-full bg-[#2271b1] flex items-center justify-center text-white text-[11px] font-serif font-black shadow-inner">
                W
              </div>
              <span className="font-bold text-[12px] hidden md:inline text-white">
                WordPress CMS
              </span>
            </div>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Quick jump to edit any section */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsJumpOpen(!isJumpOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2c3338] hover:bg-[#3c434a] text-slate-200 text-xs font-medium transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[#72aee6]" />
                <span className="hidden sm:inline">Edit Section:</span>
                <span className="font-semibold text-white">Select Part</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isJumpOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-[#262c30] rounded-xl shadow-2xl border border-[#3c434a] py-1.5 z-50 text-xs">
                  <div className="px-3 py-1 font-bold text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#3c434a]">
                    Instant Section Editor
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1">
                    {sectionsList.map((sec) => (
                      <button
                        key={sec.id}
                        type="button"
                        onClick={() => handleJumpToSection(sec.id)}
                        className="w-full text-left px-3 py-2 text-slate-200 hover:bg-[#2271b1] hover:text-white transition-colors flex items-center gap-2 group"
                      >
                        <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-white" />
                        <span className="truncate">{sec.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Customize Site Button */}
            <button
              type="button"
              onClick={() => openCustomizer('general')}
              className="hidden lg:flex items-center gap-1.5 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-[#2c3338] transition-colors text-xs"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Theme Customizer</span>
            </button>
          </div>

          {/* Right: Mode Toggle & WordPress Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Auto-save indicator */}
            <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
              <span className={`w-2 h-2 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span>{saveStatus === 'saved' ? 'Auto-Saved' : 'Saving...'}</span>
            </div>

            {/* WordPress Export Button */}
            <button
              type="button"
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-xs text-slate-200 bg-[#2c3338] hover:bg-[#3c434a] transition-colors"
              title="Export content as WordPress JSON or Gutenberg Blocks"
            >
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">WP Export</span>
            </button>

            {/* Reset Defaults */}
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-slate-400 hover:text-red-300 p-1 rounded hover:bg-[#2c3338] transition-colors"
              title="Reset all sections to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Visual Builder Mode Switch */}
            <button
              type="button"
              onClick={toggleEditMode}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all shadow-sm ${
                isEditMode
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white ring-2 ring-emerald-400/40'
                  : 'bg-[#2271b1] hover:bg-[#135e96] text-white'
              }`}
            >
              {isEditMode ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>Edit Mode: ON</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Enable Edit Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* WordPress Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-300">
            <div className="bg-[#1d2327] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-5 h-5 text-[#72aee6]" />
                <h3 className="font-bold text-base">WordPress Export & Gutenberg Sync</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex gap-2 border-b border-slate-200 pb-3">
                <button
                  type="button"
                  onClick={() => setExportFormat('json')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    exportFormat === 'json'
                      ? 'bg-[#2271b1] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Full Site JSON Config
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('gutenberg_blocks')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    exportFormat === 'gutenberg_blocks'
                      ? 'bg-[#2271b1] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Gutenberg HTML Blocks
                </button>
              </div>

              <div className="relative">
                <textarea
                  readOnly
                  rows={12}
                  value={exportWpContent(exportFormat)}
                  className="w-full font-mono text-xs bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  Ready to paste into WordPress theme or import back anytime.
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyExport}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadExport}
                    className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
