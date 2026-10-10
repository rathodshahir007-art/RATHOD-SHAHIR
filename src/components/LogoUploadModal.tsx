import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  RotateCcw, 
  Download, 
  Image as ImageIcon, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useBrand } from '../context/BrandContext';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ isOpen, onClose }) => {
  const { 
    customLogoUrl, 
    logoMode, 
    originalLogoLight, 
    originalLogoDark, 
    setCustomLogo, 
    setLogoMode, 
    resetToDefaultLogo 
  } = useBrand();

  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileProcess = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg|webp|svg\+xml)$/)) {
      setErrorMsg('Please select a valid image file (PNG, JPG, SVG, or WEBP).');
      return;
    }

    // Validate size (max 8MB)
    if (file.size > 8 * 1024 * 1024) {
      setErrorMsg('Image size is too large (max 8MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setCustomLogo(result);
        setSuccessMsg('Original logo successfully uploaded and applied across the entire website!');
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-sky-900 to-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Brand Logo & Identity Manager</h3>
              <p className="text-xs text-sky-200">Newways Enterprise • Official Brand Assets</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Notification feedback */}
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-xs font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-800 text-xs font-medium">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Active Mode Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Select Logo Display Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setLogoMode('official-graphic')}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  logoMode === 'official-graphic'
                    ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">Official Graphic</span>
                  {logoMode === 'official-graphic' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-[11px] text-slate-500">
                  Full authentic 3D ribbon emblem with custom arrow wordmark.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setLogoMode('vector')}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  logoMode === 'vector'
                    ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">Pure Vector SVG</span>
                  {logoMode === 'vector' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-[11px] text-slate-500">
                  Crisp SVG vector path rendering with responsive fonts.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (customLogoUrl) {
                    setLogoMode('custom');
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  logoMode === 'custom'
                    ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-slate-900">Custom Upload</span>
                  {logoMode === 'custom' && <Check className="w-4 h-4 text-sky-600" />}
                </div>
                <p className="text-[11px] text-slate-500">
                  {customLogoUrl ? 'Active uploaded file' : 'Click to upload your image'}
                </p>
              </button>
            </div>
          </div>

          {/* Live Preview Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-600" />
                Live Brand Preview
              </label>
              <span className="text-[11px] text-slate-400">
                Mode: <strong className="text-slate-700 uppercase">{logoMode}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Light Background Preview (Navbar) */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Header Navigation (Light theme)
                </div>
                <div className="h-16 flex items-center justify-center bg-slate-50/50 rounded-xl border border-slate-100 p-2">
                  {logoMode === 'custom' && customLogoUrl ? (
                    <img src={customLogoUrl} alt="Custom Logo" className="h-12 w-auto object-contain" />
                  ) : logoMode === 'vector' ? (
                    <div className="scale-90 origin-center">
                      <span className="font-serif font-bold text-xl text-slate-900">Newways ↗</span>
                    </div>
                  ) : (
                    <img src={originalLogoLight} alt="Official Light Logo" className="h-12 w-auto object-contain" />
                  )}
                </div>
              </div>

              {/* Dark Background Preview (Footer) */}
              <div className="p-4 rounded-2xl bg-[#07162c] border border-sky-900 shadow-sm text-white">
                <div className="text-[10px] font-bold text-sky-300 uppercase tracking-wider mb-2">
                  Footer / Dark Section (Navy theme)
                </div>
                <div className="h-16 flex items-center justify-center bg-[#030d1b] rounded-xl border border-sky-950 p-2">
                  {logoMode === 'custom' && customLogoUrl ? (
                    <img src={customLogoUrl} alt="Custom Logo" className="h-12 w-auto object-contain" />
                  ) : logoMode === 'vector' ? (
                    <div className="scale-90 origin-center">
                      <span className="font-serif font-bold text-xl text-white">Newways ↗</span>
                    </div>
                  ) : (
                    <img src={originalLogoDark} alt="Official Dark Logo" className="h-12 w-auto object-contain" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Upload Original Logo File
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-sky-500 bg-sky-50/60 scale-[1.01]' 
                  : 'border-slate-200 hover:border-sky-400 hover:bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileInput}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 mx-auto flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                Click to browse or drag and drop your logo file here
              </h4>
              <p className="text-xs text-slate-500 mb-2">
                Supports transparent PNG, SVG vector, JPG, or WEBP (up to 8 MB)
              </p>
              <span className="inline-block text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200/80 px-3 py-1 rounded-full">
                Original Logo: newways logo.png
              </span>
            </div>
          </div>

          {/* Logo Authenticity Details */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Official Brand Specifications Included:
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-500">
              <li><strong>3D Folded Ribbon Emblem</strong>: Cyan blue, emerald green, crimson red, and golden amber folds.</li>
              <li><strong>Distinctive Wordmark</strong>: Authentic high-contrast serif with the rising ↗ arrow originating from the 'w'.</li>
              <li><strong>ENTERPRISE Sub-descriptor</strong>: Bold uppercase with wide tracking (280‰).</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetToDefaultLogo}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Official Default
            </button>
            <a
              href={originalLogoLight}
              download="Newways_Enterprise_Original_Logo.jpg"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-sky-700 hover:bg-sky-100/70 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download Official Asset
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
