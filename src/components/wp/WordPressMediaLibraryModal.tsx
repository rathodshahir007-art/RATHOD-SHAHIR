import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  Image as ImageIcon, 
  Search, 
  Grid, 
  Sparkles, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { useWordPressCms } from '../../context/WordPressCmsContext';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'polymers' | 'logistics' | 'brand' | 'custom';
  description?: string;
}

const PRESET_MEDIA: MediaItem[] = [
  // Core Polymer Product Photos
  {
    id: 'pp-bag',
    name: 'Saudi Advanced PP 25kg Bag',
    url: '/src/assets/images/saudi_advanced_pp_25kg_bag_1791547542140.jpg',
    category: 'polymers',
    description: 'Prime 25kg Homo PP bag on industrial pallet'
  },
  {
    id: 'ppcp-pellets',
    name: 'PPCP Copolymer Pellets',
    url: '/src/assets/images/ppcp_copolymer_pellets_1791562133885.jpg',
    category: 'polymers',
    description: 'Impact grade black and natural polymer granules'
  },
  {
    id: 'hdpe-pellets',
    name: 'Virgin HDPE Polymer Pellets',
    url: '/src/assets/images/prime_polymer_pellets_1791541763376.jpg',
    category: 'polymers',
    description: 'High purity virgin HDPE blow and pipe grade pellets'
  },
  {
    id: 'ldpe-pellets',
    name: 'Prime Virgin LDPE Pellets',
    url: '/src/assets/images/prime_virgin_ldpe_pellets_1791547499807.jpg',
    category: 'polymers',
    description: 'Translucent disc LDPE film resin granules'
  },
  {
    id: 'lldpe-pellets',
    name: 'Virgin LLDPE Film & Roto Pellets',
    url: '/src/assets/images/lldpe_film_pellets_1791562150443.jpg',
    category: 'polymers',
    description: 'Pristine LLDPE stretch film & rotomolding granules'
  },
  {
    id: 'pet-chips',
    name: 'Ultra-Clear PET Bottle Resin',
    url: '/src/assets/images/pet_bottle_grade_resin_1791562170358.jpg',
    category: 'polymers',
    description: 'Sparkling clear PET polyester bottle grade chips'
  },
  {
    id: 'pvc-powder',
    name: 'PVC Suspension Resin Powder & Compound',
    url: '/src/assets/images/pvc_suspension_resin_1791562196323.jpg',
    category: 'polymers',
    description: 'Pure white PVC suspension powder and pipe compound'
  },
  {
    id: 'abs-granules',
    name: 'ABS High Impact Engineering Granules',
    url: '/src/assets/images/abs_engineering_granules_1791562223240.jpg',
    category: 'polymers',
    description: 'Glossy ivory & black ABS injection molding granules'
  },
  {
    id: 'nylon-pellets',
    name: 'Nylon PA6 / PA66 Engineering Pellets',
    url: '/src/assets/images/nylon_pa66_pellets_1791562252310.jpg',
    category: 'polymers',
    description: 'Beige and black PA66 polyamide engineering pellets'
  },
  {
    id: 'recycled-flakes',
    name: 'Recycled Polymer Flakes & Pellets',
    url: '/src/assets/images/recycled_regrind_flakes_1791541788232.jpg',
    category: 'polymers',
    description: 'Clean washed PCR recycled flakes and regrind'
  },
  // Logistics & Operations
  {
    id: 'globe-3d',
    name: 'Global Multimodal Sliced Earth',
    url: '/src/assets/images/globe_multimodal_logistics_1791547472300.jpg',
    category: 'logistics',
    description: 'Surreal 3D sliced Earth ocean shipping artwork'
  },
  {
    id: 'container-ship',
    name: 'Ocean Cargo Container Ship',
    url: '/src/assets/images/container_ship_ocean_1791543563929.jpg',
    category: 'logistics',
    description: 'International container freight vessel on open sea'
  },
  {
    id: 'port-terminal',
    name: 'Mundra & Nhava Sheva Terminal Cranes',
    url: '/src/assets/images/port_container_terminal_1791543588743.jpg',
    category: 'logistics',
    description: 'Container port quay cranes unloading polymer cargo'
  },
  {
    id: 'reach-stacker',
    name: 'Port Container Reach Stacker Crane',
    url: '/src/assets/images/reach_stacker_crane_1791545659528.jpg',
    category: 'logistics',
    description: 'Heavy port container loader crane in operation'
  },
  {
    id: 'recycling-plant',
    name: 'Circular Polymer Recycling Plant',
    url: '/src/assets/images/circular_recycling_plant_1791541799748.jpg',
    category: 'logistics',
    description: 'High capacity modern plastic reprocessing facility'
  },
  // Logos
  {
    id: 'logo-light',
    name: 'Newways Official Logo (Light/White BG)',
    url: '/src/assets/images/newways_original_logo_1791564299449.jpg', // fallback
    category: 'brand',
    description: 'Original 3D folded ribbon logo on crisp white'
  },
  {
    id: 'logo-dark',
    name: 'Newways Official Logo (Dark BG)',
    url: '/src/assets/images/newways_logo_dark_1791564316552.jpg',
    category: 'brand',
    description: 'Original logo on deep navy background'
  }
];

export const WordPressMediaLibraryModal: React.FC = () => {
  const { isMediaLibraryOpen, closeMediaLibrary, handleMediaSelected } = useWordPressCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [selectedItemUrl, setSelectedItemUrl] = useState<string | null>(null);
  const [customUploads, setCustomUploads] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isMediaLibraryOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newItem: MediaItem = {
        id: `custom-${Date.now()}`,
        name: file.name,
        url: dataUrl,
        category: 'custom',
        description: `Uploaded file (${Math.round(file.size / 1024)} KB)`,
      };
      setCustomUploads((prev) => [newItem, ...prev]);
      setSelectedItemUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const allItems = [...customUploads, ...PRESET_MEDIA];

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleConfirmSelect = () => {
    if (selectedItemUrl) {
      handleMediaSelected(selectedItemUrl);
    }
  };

  const handleInsertCustomUrl = () => {
    if (customUrlInput.trim()) {
      handleMediaSelected(customUrlInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* WP Media Header */}
        <div className="bg-[#1d2327] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2271b1] flex items-center justify-center font-serif font-black text-white text-base">
              W
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                WordPress Media Library
                <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-normal">
                  All Polymer Assets & Photos
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Select an authentic product image or upload a custom graphic
              </p>
            </div>
          </div>

          <button
            onClick={closeMediaLibrary}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Files' },
              { id: 'polymers', label: 'Polymer Products' },
              { id: 'logistics', label: 'Shipping & Logistics' },
              { id: 'brand', label: 'Logos & Brand' },
              { id: 'custom', label: 'My Uploads' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-[#2271b1] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Upload */}
          <div className="flex items-center gap-2 flex-grow sm:flex-grow-0">
            <div className="relative flex-grow sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#2271b1] focus:outline-none"
              />
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Files</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Media Grid & Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Grid */}
          <div className="flex-1 p-5 overflow-y-auto bg-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {filteredItems.map((item) => {
                const isSelected = selectedItemUrl === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemUrl(item.url)}
                    className={`group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-slate-900 border-2 transition-all ${
                      isSelected
                        ? 'border-[#2271b1] ring-2 ring-[#2271b1]/50 shadow-lg scale-[1.02]'
                        : 'border-slate-300 hover:border-slate-400 hover:shadow'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Gradient title overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                      <span className="text-[11px] font-bold text-white leading-tight line-clamp-1 drop-shadow">
                        {item.name}
                      </span>
                      {item.description && (
                        <span className="text-[9px] text-slate-300 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.description}
                        </span>
                      )}
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#2271b1] text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-slate-400 space-y-2">
                <ImageIcon className="w-10 h-10 stroke-1" />
                <p className="text-sm">No media items found</p>
              </div>
            )}
          </div>

          {/* Detail Side Panel */}
          <div className="w-80 bg-white border-l border-slate-200 p-5 overflow-y-auto flex flex-col justify-between flex-shrink-0">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b pb-2">
                Attachment Details
              </h4>

              {selectedItemUrl ? (
                <div className="space-y-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                    <img
                      src={selectedItemUrl}
                      alt="Selected preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-900">Image Source:</span>
                      <p className="font-mono text-[10px] break-all text-slate-500 bg-slate-50 p-1.5 rounded border mt-0.5">
                        {selectedItemUrl}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic py-6 text-center">
                  Select an image from the library grid to preview and insert.
                </div>
              )}

              {/* Or paste external URL */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <label className="text-[11px] font-bold text-slate-700 block">
                  Or Paste External Image URL:
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="flex-1 px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-1 focus:ring-[#2271b1] focus:outline-none"
                  />
                  <button
                    onClick={handleInsertCustomUrl}
                    disabled={!customUrlInput.trim()}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold disabled:opacity-40"
                  >
                    Insert
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Confirm Buttons */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={closeMediaLibrary}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSelect}
                disabled={!selectedItemUrl}
                className="flex-1 px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-xl text-xs font-bold shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Select & Insert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
