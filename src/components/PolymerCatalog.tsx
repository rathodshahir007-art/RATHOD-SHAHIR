import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  Tag, 
  CheckCircle2, 
  Info, 
  Filter, 
  Scale, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { POLYMER_PRODUCTS } from '../data/polymerData';
import { MaterialCondition, PolymerProduct } from '../types';
import { useWordPressCms } from '../context/WordPressCmsContext';

interface PolymerCatalogProps {
  onSelectProduct: (product: PolymerProduct) => void;
  onRequestQuote: (materialCode: string, condition?: MaterialCondition) => void;
  initialCondition?: MaterialCondition | 'All';
}

export const PolymerCatalog: React.FC<PolymerCatalogProps> = ({
  onSelectProduct,
  onRequestQuote,
  initialCondition = 'All',
}) => {
  const { products, sections } = useWordPressCms();
  const [selectedCondition, setSelectedCondition] = useState<MaterialCondition | 'All'>(initialCondition);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const conditions: (MaterialCondition | 'All')[] = ['All', 'Prime', 'Near Prime', 'Off-Grade', 'Recycled', 'Regrind'];
  const categories = ['All', 'Polyolefins', 'Engineering', 'Vinyls', 'Polyesters', 'Recycled'];

  const filteredProducts = products.filter((product) => {
    const matchesCondition = selectedCondition === 'All' 
      ? true 
      : product.conditionsAvailable.includes(selectedCondition as MaterialCondition);
    
    const matchesCategory = selectedCategory === 'All'
      ? true
      : product.category === selectedCategory;

    return matchesCondition && matchesCategory;
  });

  return (
    <section id="products" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{sections.products.badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {sections.products.title}
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            {sections.products.subtitle}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Material Condition Toggles */}
          <div className="w-full md:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 md:mb-1.5">
              Filter by Material Condition:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {conditions.map((cond) => {
                const isActive = selectedCondition === cond;
                return (
                  <button
                    key={cond}
                    onClick={() => setSelectedCondition(cond)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0b1e36] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cond}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="w-full md:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 md:mb-1.5">
              Polymer Family:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-sky-300"
            >
              {/* Product Photo If Available */}
              {product.imageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  {product.brandHighlight && (
                    <div className="absolute bottom-2.5 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/40 shadow-sm">
                        {product.brandHighlight}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Card Top Banner / Visual Representation */}
              <div className="relative p-5 bg-gradient-to-r from-slate-900 to-[#0e2a47] text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md text-cyan-300 font-black text-sm tracking-wide border border-white/10">
                      {product.code}
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">
                      {product.category}
                    </span>
                  </div>

                  {product.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/40">
                      {product.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {product.fullName}
                </p>

                {/* Technical Specs quick pill */}
                <div className="flex items-center gap-3 text-[11px] text-slate-300 font-mono mt-3 pt-2 border-t border-white/10">
                  <span>MFI: <strong className="text-amber-300">{product.mfiRange}</strong></span>
                  {product.density && (
                    <span>Density: <strong className="text-cyan-300">{product.density}</strong></span>
                  )}
                </div>
              </div>

              {/* Card Middle: Key Applications & Common Grades */}
              <div className="p-5 space-y-4 flex-1">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Common Applications:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700">
                    {product.keyApplications.slice(0, 3).map((app, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="truncate">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Popular Traded Grades:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {product.commonGrades.slice(0, 3).map((grade, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Conditions Traded:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {product.conditionsAvailable.map((cond) => (
                      <span 
                        key={cond} 
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          cond === 'Prime' 
                            ? 'bg-sky-50 text-sky-700 border border-sky-200' 
                            : cond === 'Off-Grade'
                            ? 'bg-orange-50 text-orange-700 border border-orange-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="text-xs font-bold text-[#0b1e36] hover:text-sky-600 transition-colors flex items-center gap-1"
                >
                  <span>Full Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onRequestQuote(product.code)}
                  className="px-3.5 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Industry Notice as specified in brief */}
        <div className="mt-10 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong>Commercial & Grade Availability Notice:</strong> Specific polymer grades, melt flow indexes, and lot allocations vary according to petrochemical refinery production cycles, import schedules, and domestic warehouse inventory. Material availability, Certificates of Analysis (CoA), and final pricing are confirmed upon specific commercial inquiry.
          </div>
        </div>

      </div>
    </section>
  );
};
