import React, { useState } from 'react';
import { Search, X, ArrowRight, Tag, Layers, CheckCircle } from 'lucide-react';
import { POLYMER_PRODUCTS, AVAILABLE_STOCK } from '../data/polymerData';
import { PolymerProduct } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPolymer: (product: PolymerProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPolymer,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const query = searchTerm.toLowerCase().trim();

  const filteredProducts = POLYMER_PRODUCTS.filter((p) => {
    if (!query) return true;
    return (
      p.code.toLowerCase().includes(query) ||
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.keyApplications.some((app) => app.toLowerCase().includes(query)) ||
      p.commonGrades.some((g) => g.toLowerCase().includes(query)) ||
      p.conditionsAvailable.some((c) => c.toLowerCase().includes(query))
    );
  });

  const matchingStock = AVAILABLE_STOCK.filter((s) => {
    if (!query) return false;
    return (
      s.material.toLowerCase().includes(query) ||
      s.grade.toLowerCase().includes(query) ||
      s.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-start justify-center p-4 pt-16 md:pt-24">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search polymer (PP, HDPE, LDPE, MFI, Raffia, Pipe, Regrind...)"
            className="w-full text-base bg-transparent border-none outline-none text-slate-900 placeholder-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-200/60"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-5 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs text-slate-600">
          <span className="font-semibold text-slate-400 whitespace-nowrap">Popular:</span>
          {['PP Raffia', 'HDPE Blow', 'PPCP Battery', 'LLDPE Film', 'PET Flakes', 'PE100 Regrind'].map((chip) => (
            <button
              key={chip}
              onClick={() => setSearchTerm(chip)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-sky-500 hover:text-sky-600 transition-colors whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-slate-100">
          {/* Active Stock quick hits if any */}
          {matchingStock.length > 0 && (
            <div className="pb-3 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Available Stock Matches ({matchingStock.length})
              </span>
              <div className="mt-2 space-y-1.5">
                {matchingStock.map((s) => (
                  <div key={s.id} className="flex items-center justify-between p-2 rounded-lg bg-amber-50/50 border border-amber-200/60 text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{s.material}</span> — {s.grade} ({s.condition})
                      <span className="text-slate-500 ml-2">📍 {s.location}</span>
                    </div>
                    <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      {s.quantityMt} MT Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Cards */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 block">
              Polymer Catalog ({filteredProducts.length})
            </span>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Layers className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-sm font-medium">No direct matching polymers found</p>
                <p className="text-xs text-slate-500 mt-1">
                  Try searching by generic family (PP, PE, PVC) or submit an open sourcing enquiry.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5 mt-1">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectPolymer(product);
                      onClose();
                    }}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-sky-50/80 cursor-pointer transition-colors border border-transparent hover:border-sky-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0b1e36] text-white flex items-center justify-center font-bold text-sm tracking-wider">
                        {product.code}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-900">
                            {product.name}
                          </h4>
                          <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            MFI: {product.mfiRange}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {product.keyApplications.slice(0, 3).join(' • ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-sky-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        View Specs <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
