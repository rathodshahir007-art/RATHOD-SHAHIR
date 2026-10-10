import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ShieldCheck, 
  Scale, 
  Truck, 
  RefreshCw, 
  ArrowRight, 
  Leaf, 
  Recycle, 
  CheckCircle2, 
  Layers,
  ChevronRight
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS, CIRCULAR_RECYCLING_STEPS } from '../data/polymerData';

interface SourcingProcessProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string) => void;
}

export const SourcingProcess: React.FC<SourcingProcessProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<'trading' | 'recycling'>('trading');

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <FileText className="w-5 h-5 text-sky-600" />;
      case 1: return <Search className="w-5 h-5 text-sky-600" />;
      case 2: return <ShieldCheck className="w-5 h-5 text-sky-600" />;
      case 3: return <Scale className="w-5 h-5 text-sky-600" />;
      case 4: return <Truck className="w-5 h-5 text-sky-600" />;
      case 5: return <RefreshCw className="w-5 h-5 text-sky-600" />;
      default: return <Layers className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <section id="sourcing" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>HOW NEWWAYS WORKS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Sourcing & Trading Made Simple
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            From initial material specification to container dispatch, we coordinate transparent, reliable, and compliant polymer transactions.
          </p>

          {/* Workflow Toggle Buttons */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl mt-6 border border-slate-200">
            <button
              onClick={() => setActiveTab('trading')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'trading'
                  ? 'bg-[#0b1e36] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6-Step Trading & Sourcing Flow
            </button>
            <button
              onClick={() => setActiveTab('recycling')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'recycling'
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Circular Polymer & Recycling Flow</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 6-Step Sourcing Workflow */}
        {activeTab === 'trading' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOW_IT_WORKS_STEPS.map((step, idx) => (
                <div 
                  key={step.step}
                  className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {getStepIcon(idx)}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-sky-600 transition-colors">
                      STEP 0{step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Port Terminal & Container Reach Stacker Logistics Block */}
            <div className="rounded-3xl overflow-hidden bg-slate-900 border border-sky-800/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12 text-white">
              <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[260px] overflow-hidden group">
                <img
                  src="/src/assets/images/terminal_cargo_reach_stacker_1791545680144.jpg"
                  alt="Industrial Reach Stacker Container Crane Loading Polymer Cargo in Port Yard"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/40 text-[11px] font-mono font-bold">
                    <span>MUNDRA • HAZIRA • NHAVA SHEVA</span>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-sky-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Heavy Equipment Handling</span>
                    <span className="text-white font-bold text-xs">Reach Stacker Yard Transfer</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold text-xs">20ft / 40ft HC</span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-gradient-to-br from-slate-900 to-[#07162c]">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-600/50 text-cyan-300 text-xs font-semibold">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SEAMLESS IMPORT-EXPORT LOGISTICS</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Port Clearance & Container Yard Staging
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    From ocean vessels berthing at western Indian deep-water ports to factory gates, Newways Enterprise manages the entire logistics chain. Our coordination covers bill of lading documentation, customs inspection, CFS staging, and dedicated reach-stacker trailer transfers.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Port Customs Clearance</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Expedited BOE filing and inspection support.</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Factory Door Delivery</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Full truckloads & 24MT container deliveries.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Gujarat • Maharashtra • Rajasthan • Pan-India</span>
                  <button
                    onClick={() => onOpenQuote('quote', 'Container Freight Logistics')}
                    className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>Inquire Freight Rates</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Sourcing CTA banner */}
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0b1e36] to-[#0e2a47] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  Ready to Sourcing or Liquidate Material?
                </span>
                <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                  Have an active requirement or surplus stock?
                </h4>
                <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-xl">
                  Connect with our trading desk for immediate spot allocations, port deliveries, and verified buyer matchmaking.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => onOpenQuote('buy')}
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  Submit Requirement
                </button>
                <button
                  onClick={() => onOpenQuote('sell')}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors"
                >
                  Offer Stock
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Circular Polymer & Recycling Workflow */}
        {activeTab === 'recycling' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Circular Explainer Banner */}
            <div className="p-6 md:p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-800 shadow-xl relative overflow-hidden">
              {/* Photo backdrop */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img
                  src="/src/assets/images/circular_recycling_plant_1791541799748.jpg"
                  alt="High-Tech Plastic Recycling Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10 max-w-2xl space-y-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900 border border-emerald-700 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>CIRCULAR PLASTIC ECONOMY</span>
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  From Polymer Waste to New Possibilities
                </h3>
                <p className="text-emerald-100 text-xs md:text-sm leading-relaxed">
                  We turn recovered post-industrial runners and post-consumer baled plastics into high-purity recycled granules and screened regrind, supporting closed-loop manufacturing across Gujarat and Maharashtra.
                </p>
              </div>
            </div>

            {/* 6 Stage Circular Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CIRCULAR_RECYCLING_STEPS.map((stage) => (
                <div 
                  key={stage.step}
                  className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                      0{stage.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Stage {stage.step}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-emerald-950">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-emerald-900/80 leading-relaxed mt-2">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Recycling Sourcing CTA */}
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h5 className="font-bold text-slate-900 text-sm">
                  Supplying Regrind or Sourcing Recycled PCR Resins?
                </h5>
                <p className="text-xs text-slate-600 mt-0.5">
                  We trade clean HDPE milk bottle regrind, black PE100 regrind, PP washed flakes, and reprocessed pellets.
                </p>
              </div>
              <button
                onClick={() => onOpenQuote('quote')}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                Inquire Recycled Materials
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
