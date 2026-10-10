import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Layers, 
  Sliders, 
  Box, 
  Image as ImageIcon, 
  Phone, 
  Globe, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Upload, 
  Plus, 
  Trash2,
  FileCode,
  Sparkles
} from 'lucide-react';
import { useWordPressCms, SiteSectionsData } from '../../context/WordPressCmsContext';

export const WordPressCustomizerDrawer: React.FC = () => {
  const {
    isCustomizerOpen,
    closeCustomizer,
    customizerTab,
    setCustomizerTab,
    activeEditingSection,
    sections,
    updateSection,
    companyInfo,
    updateCompanyInfo,
    products,
    updateProduct,
    openMediaLibrary,
    hiddenSections,
    toggleSectionVisibility,
    sectionOrder,
    moveSection,
    resetToDefaults,
    importWpContent,
  } = useWordPressCms();

  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);

  if (!isCustomizerOpen) return null;

  const currentSecKey = (activeEditingSection || 'hero') as keyof SiteSectionsData;
  const currentSecData = sections[currentSecKey] || sections.hero;

  const handleFieldChange = (field: string, value: any) => {
    updateSection(currentSecKey, { [field]: value });
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importWpContent(importText);
    if (ok) {
      setImportStatus('Successfully imported site content!');
      setTimeout(() => setImportStatus(null), 3000);
      setImportText('');
    } else {
      setImportStatus('Invalid JSON format. Please verify syntax.');
    }
  };

  const selectedProd = products[selectedProductIndex] || products[0];

  return (
    <aside 
      aria-label="WordPress Site Customizer & Inspector"
      className="fixed inset-y-0 left-0 z-[1000] w-full max-w-md bg-white shadow-2xl border-r border-slate-300 flex flex-col font-sans animate-in slide-in-from-left duration-200"
    >
      {/* Drawer Header */}
      <div className="bg-[#1d2327] text-white p-4 flex items-center justify-between border-b border-[#3c434a] flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#2271b1] flex items-center justify-center font-serif font-black text-white text-sm">
            W
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">
              WordPress Live Inspector
            </h3>
            <span className="text-[11px] text-slate-400">
              Easy In-Place Site & Section Customizer
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={closeCustomizer}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Customizer Tabs Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 flex overflow-x-auto p-1.5 gap-1 flex-shrink-0">
        {[
          { id: 'active', label: 'Section Content', icon: Layers },
          { id: 'products', label: 'Polymers (10)', icon: Box },
          { id: 'general', label: 'Brand & Phone', icon: Globe },
          { id: 'layout', label: 'Layout & Order', icon: Sliders },
          { id: 'import', label: 'Backup / Sync', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = customizerTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCustomizerTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-white text-[#2271b1] shadow-sm font-bold border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm">
        {/* TAB 1: SECTION CONTENT INSPECTOR */}
        {customizerTab === 'active' && (
          <div className="space-y-5">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
                  CURRENTLY EDITING
                </span>
                <strong className="text-sm text-sky-950 capitalize">
                  {currentSecKey} Section
                </strong>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-200 text-sky-900 font-semibold">
                Live Preview
              </span>
            </div>

            {/* Hero Section Inputs */}
            {currentSecKey === 'hero' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Top Pill Badge
                  </label>
                  <input
                    type="text"
                    value={sections.hero.badge}
                    onChange={(e) => handleFieldChange('badge', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-[#2271b1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Main Headline
                  </label>
                  <textarea
                    rows={2}
                    value={sections.hero.headline}
                    onChange={(e) => handleFieldChange('headline', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-[#2271b1] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Hero Sub-headline / Description
                  </label>
                  <textarea
                    rows={3}
                    value={sections.hero.subheadline}
                    onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-[#2271b1] focus:outline-none"
                  />
                </div>

                {/* Hero Image */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Hero Visual Graphic
                  </label>
                  <div className="flex items-center gap-3">
                    <img
                      src={sections.hero.heroImage}
                      alt="Hero preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-sm"
                    />
                    <div className="flex-1 space-y-1">
                      <button
                        type="button"
                        onClick={() => openMediaLibrary((url) => handleFieldChange('heroImage', url))}
                        className="w-full py-1.5 px-3 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Change from Media Library</span>
                      </button>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {sections.hero.heroImage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={sections.hero.ctaPrimaryText}
                      onChange={(e) => handleFieldChange('ctaPrimaryText', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={sections.hero.ctaSecondaryText}
                      onChange={(e) => handleFieldChange('ctaSecondaryText', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                {/* Key Metrics / Trust Numbers */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Trust Statistics & Numbers
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        type="text"
                        value={sections.hero.statsYears}
                        onChange={(e) => handleFieldChange('statsYears', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold"
                        placeholder="12+"
                      />
                      <input
                        type="text"
                        value={sections.hero.statsYearsLabel}
                        onChange={(e) => handleFieldChange('statsYearsLabel', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border-0 text-[10px] text-slate-500"
                        placeholder="Label"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={sections.hero.statsVolume}
                        onChange={(e) => handleFieldChange('statsVolume', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold"
                        placeholder="1,200+"
                      />
                      <input
                        type="text"
                        value={sections.hero.statsVolumeLabel}
                        onChange={(e) => handleFieldChange('statsVolumeLabel', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border-0 text-[10px] text-slate-500"
                        placeholder="Label"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={sections.hero.statsPorts}
                        onChange={(e) => handleFieldChange('statsPorts', e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold"
                        placeholder="18+"
                      />
                      <input
                        type="text"
                        value={sections.hero.statsPortsLabel}
                        onChange={(e) => handleFieldChange('statsPortsLabel', e.target.value)}
                        className="w-full px-2 py-1 bg-transparent border-0 text-[10px] text-slate-500"
                        placeholder="Label"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* General Section Inputs for Any Other Section */}
            {currentSecKey !== 'hero' && (
              <div className="space-y-4">
                {'badge' in currentSecData && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Badge / Tagline
                    </label>
                    <input
                      type="text"
                      value={(currentSecData as any).badge || ''}
                      onChange={(e) => handleFieldChange('badge', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                )}

                {'title' in currentSecData && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Section Title
                    </label>
                    <input
                      type="text"
                      value={(currentSecData as any).title || ''}
                      onChange={(e) => handleFieldChange('title', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
                    />
                  </div>
                )}

                {'subtitle' in currentSecData && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Section Subtitle / Description
                    </label>
                    <textarea
                      rows={3}
                      value={(currentSecData as any).subtitle || ''}
                      onChange={(e) => handleFieldChange('subtitle', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                )}

                {'bannerImage' in currentSecData && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Background Banner Image
                    </label>
                    <div className="flex items-center gap-3">
                      <img
                        src={(currentSecData as any).bannerImage}
                        alt="Banner preview"
                        className="w-16 h-16 rounded-xl object-cover border border-slate-300"
                      />
                      <div className="flex-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => openMediaLibrary((url) => handleFieldChange('bannerImage', url))}
                          className="w-full py-1.5 px-3 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5"
                        >
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Choose Media</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {'aboutText' in currentSecData && (
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Footer About Bio
                    </label>
                    <textarea
                      rows={4}
                      value={(currentSecData as any).aboutText || ''}
                      onChange={(e) => handleFieldChange('aboutText', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: POLYMERS PRODUCT MANAGER */}
        {customizerTab === 'products' && (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                100% PHOTO-FILLED PRODUCTS
              </span>
              <p className="text-xs text-emerald-950 mt-0.5">
                Every polymer product has a dedicated authentic photo. Click any product below to customize its name, specs, or photo.
              </p>
            </div>

            {/* Product Selector Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
              {products.map((prod, idx) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    selectedProductIndex === idx
                      ? 'bg-[#2271b1] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{prod.code}</span>
                </button>
              ))}
            </div>

            {/* Selected Product Form */}
            {selectedProd && (
              <div className="space-y-4 pt-2">
                {/* Product Image Preview & Change */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Product Image & Catalog Photo
                  </label>
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm group">
                    {selectedProd.imageUrl ? (
                      <img
                        src={selectedProd.imageUrl}
                        alt={selectedProd.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No image assigned
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        openMediaLibrary((url) =>
                          updateProduct(selectedProd.id, { imageUrl: url })
                        )
                      }
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-bold text-xs transition-opacity"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Change Product Image</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openMediaLibrary((url) =>
                        updateProduct(selectedProd.id, { imageUrl: url })
                      )
                    }
                    className="w-full py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload or Pick from Media Library</span>
                  </button>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Product Code & Name
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={selectedProd.code}
                      onChange={(e) => updateProduct(selectedProd.id, { code: e.target.value })}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-[#2271b1]"
                      placeholder="PP"
                    />
                    <input
                      type="text"
                      value={selectedProd.name}
                      onChange={(e) => updateProduct(selectedProd.id, { name: e.target.value })}
                      className="col-span-2 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                      placeholder="Polypropylene"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Brand Highlight (e.g. Saudi Advanced PP 25kg)
                  </label>
                  <input
                    type="text"
                    value={selectedProd.brandHighlight || ''}
                    onChange={(e) => updateProduct(selectedProd.id, { brandHighlight: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                    placeholder="Brand or Grade Highlight"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    MFI / Melt Flow Index
                  </label>
                  <input
                    type="text"
                    value={selectedProd.mfiRange}
                    onChange={(e) => updateProduct(selectedProd.id, { mfiRange: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={selectedProd.description}
                    onChange={(e) => updateProduct(selectedProd.id, { description: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: BRAND & CONTACT */}
        {customizerTab === 'general' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                GLOBAL SITE SETTINGS
              </span>
              <p className="text-xs text-amber-950 mt-0.5">
                Changes apply instantly across headers, footers, quote forms, and WhatsApp triggers.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => updateCompanyInfo({ name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Tagline & Slogan
              </label>
              <input
                type="text"
                value={companyInfo.tagline}
                onChange={(e) => updateCompanyInfo({ tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={companyInfo.phone}
                onChange={(e) => updateCompanyInfo({ phone: e.target.value, phoneDisplay: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Corporate Email
              </label>
              <input
                type="email"
                value={companyInfo.email}
                onChange={(e) => updateCompanyInfo({ email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Physical Address
              </label>
              <textarea
                rows={2}
                value={companyInfo.address.fullAddress}
                onChange={(e) =>
                  updateCompanyInfo({
                    address: { ...companyInfo.address, fullAddress: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                WhatsApp Group Invite Link
              </label>
              <input
                type="url"
                value={companyInfo.whatsappUrl}
                onChange={(e) => updateCompanyInfo({ whatsappUrl: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        )}

        {/* TAB 4: LAYOUT & REORDER */}
        {customizerTab === 'layout' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">
              Reorder or hide sections on your homepage. Use arrows to move up or down.
            </p>

            <div className="space-y-2">
              {sectionOrder.map((secId) => {
                const isHidden = hiddenSections.includes(secId);
                return (
                  <div
                    key={secId}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                      isHidden ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-white border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2271b1]"></span>
                      <span className="font-bold text-xs capitalize text-slate-800">
                        {secId}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveSection(secId, 'up')}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSection(secId, 'down')}
                        className="p-1 hover:bg-slate-100 rounded text-slate-600"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(secId)}
                        className={`p-1 rounded ${isHidden ? 'text-red-500' : 'text-slate-600 hover:bg-slate-100'}`}
                        title={isHidden ? 'Show' : 'Hide'}
                      >
                        {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: BACKUP & IMPORT */}
        {customizerTab === 'import' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Paste WordPress JSON Backup
              </label>
              <textarea
                rows={8}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder='Paste previously exported JSON config here...'
                className="w-full font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-xl border border-slate-800 focus:outline-none"
              />
            </div>

            {importStatus && (
              <div className="text-xs p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                {importStatus}
              </div>
            )}

            <button
              type="button"
              onClick={handleImport}
              className="w-full py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-xl shadow transition-colors"
            >
              Import & Apply Changes
            </button>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={resetToDefaults}
                className="w-full py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-xl border border-red-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Entire Website to Factory Defaults</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
        <span className="text-[11px] text-slate-500">
          Auto-saves to browser storage
        </span>
        <button
          type="button"
          onClick={closeCustomizer}
          className="px-4 py-2 bg-[#1d2327] hover:bg-black text-white text-xs font-bold rounded-xl shadow transition-colors"
        >
          Done Editing
        </button>
      </div>
    </aside>
  );
};
