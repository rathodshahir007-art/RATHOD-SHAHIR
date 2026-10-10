import React from 'react';
import { Sparkles, Layers, Recycle, ArrowRight } from 'lucide-react';
import { MaterialCondition } from '../types';
import { useWordPressCms } from '../context/WordPressCmsContext';

interface MaterialRangeCardsProps {
  onSelectCondition: (condition: MaterialCondition) => void;
  onViewAll: () => void;
}

export const MaterialRangeCards: React.FC<MaterialRangeCardsProps> = ({
  onSelectCondition,
  onViewAll,
}) => {
  const { sections } = useWordPressCms();

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header matching mockup */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600">
              {sections.materialRange.badge}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1e36] tracking-tight mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {sections.materialRange.title}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-2xl">
              {sections.materialRange.subtitle}
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 hover:border-sky-600 text-slate-800 hover:text-sky-700 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Prominent Visual Cards: Prime, Off-Grade / Non-Prime, Recycled */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Prime Materials */}
          <div className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-sky-300">
            <div>
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src="/src/assets/images/prime_virgin_ldpe_pellets_1791547499807.jpg"
                  alt="Prime Virgin Polymer Pellets - Reliance LDPE & Virgin Polyolefins"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0b1e36] text-xs font-black shadow-md border border-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Prime Materials</span>
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-cyan-300 text-[10px] font-bold border border-cyan-500/40 shadow-sm">
                    <span>Virgin LDPE / PP</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  Prime Materials
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  High-quality virgin polymers from certified petrochemical refiners for consistent melt flow index (MFI), superior mechanical performance, and strict quality assurance.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">PP</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">HDPE</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">LDPE</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">LLDPE</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded">PPCP</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <button
                onClick={() => onSelectCondition('Prime')}
                className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-white hover:bg-[#0b1e36] text-slate-800 hover:text-white border border-slate-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View Prime Grades</span>
                <ArrowRight className="w-4 h-4 text-sky-600 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Card 2: Off-Grade / Non-Prime Materials */}
          <div className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-orange-300">
            <div>
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src="/src/assets/images/off_grade_polymers_1791541774355.jpg"
                  alt="Off-Grade and Non-Prime Polymer Granules"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0b1e36] text-xs font-black shadow-md border border-slate-200">
                    <Layers className="w-3.5 h-3.5 text-orange-600" />
                    <span>Non-Prime / Off-Grade</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                  Off-Grade & Non-Prime
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Cost-effective production surplus, refinery transition batches, and non-standard lots. Ideal for flexible industrial extruders and molding applications requiring competitive raw material costs.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded">Plant Transition</span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded">Surplus Lots</span>
                  <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded">Off-Spec Batches</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <button
                onClick={() => onSelectCondition('Off-Grade')}
                className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-white hover:bg-orange-600 text-slate-800 hover:text-white border border-slate-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View Off-Grade Lots</span>
                <ArrowRight className="w-4 h-4 text-orange-600 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Card 3: Recycled & Regrind Materials */}
          <div className="group rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-emerald-300">
            <div>
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src="/src/assets/images/recycled_regrind_flakes_1791541788232.jpg"
                  alt="Washed Recycled Plastic Regrind Flakes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#0b1e36] text-xs font-black shadow-md border border-slate-200">
                    <Recycle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Recycled & Regrind</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Recycled & Regrind
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Sustainable solutions supporting circular economy. High-purity washed HDPE milk bottle regrind, black PE100 pipe flakes, and uniform reprocessed PCR pellets.
                </p>
                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Washed Flakes</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">PE100 Regrind</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">PCR Granules</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <button
                onClick={() => onSelectCondition('Recycled')}
                className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-white hover:bg-emerald-700 text-slate-800 hover:text-white border border-slate-200 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View Recycled Grades</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
