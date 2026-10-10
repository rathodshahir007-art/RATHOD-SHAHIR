import React from 'react';
import { 
  ArrowRight, 
  MessageSquare, 
  Globe2, 
  ShieldCheck, 
  Leaf, 
  Layers, 
  TrendingUp, 
  Users, 
  PackageCheck,
  CheckCircle2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';
import { MaterialCondition } from '../types';
import { useWordPressCms } from '../context/WordPressCmsContext';

interface HeroProps {
  onExploreProducts: () => void;
  onRequestQuote: () => void;
  onBuyPolymers?: () => void;
  onSellStock?: () => void;
  onJoinNetwork?: () => void;
  onFilterCondition?: (condition: MaterialCondition) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProducts,
  onRequestQuote,
  onBuyPolymers,
  onSellStock,
  onJoinNetwork,
  onFilterCondition,
}) => {
  const { sections, companyInfo, isEditMode, openSectionEditor } = useWordPressCms();
  const [activeVisual, setActiveVisual] = React.useState<number>(0);

  const heroVisuals = [
    {
      id: 'multimodal',
      title: 'Global Multimodal',
      caption: 'Air Cargo • Container Ships • Road Fleet',
      image: sections.hero.heroImage || '/src/assets/images/globe_multimodal_logistics_1791547472300.jpg',
      badge: 'Multimodal Import / Export',
      tagColor: 'text-cyan-300 border-cyan-500/50',
    },
    {
      id: 'pellets',
      title: 'Virgin LDPE Pellets',
      caption: 'Reliance 1005FY20 / 040 Virgin Granules',
      image: '/src/assets/images/prime_virgin_ldpe_pellets_1791547499807.jpg',
      badge: 'Translucent Prime Virgin Granules',
      tagColor: 'text-amber-300 border-amber-500/50',
    },
    {
      id: 'saudi_bags',
      title: 'Saudi 25kg PP Bags',
      caption: 'Advanced Petrochem Homo Polypropylene',
      image: '/src/assets/images/saudi_advanced_pp_25kg_bag_1791547542140.jpg',
      badge: 'Original 25kg Factory Packaging',
      tagColor: 'text-emerald-300 border-emerald-500/50',
    },
    {
      id: 'port',
      title: 'Port Terminal Handling',
      caption: 'Reach Stacker Heavy Container Operations',
      image: '/src/assets/images/reach_stacker_crane_1791545659528.jpg',
      badge: 'Mundra & Kandla Port Clearance',
      tagColor: 'text-sky-300 border-sky-500/50',
    },
  ];

  const currentVisual = heroVisuals[activeVisual];

  const handleBuyClick = () => {
    if (onBuyPolymers) {
      onBuyPolymers();
    } else {
      onRequestQuote();
    }
  };

  const handleSellClick = () => {
    if (onSellStock) {
      onSellStock();
    } else {
      onRequestQuote();
    }
  };

  const handleJoinClick = () => {
    if (onJoinNetwork) {
      onJoinNetwork();
    } else {
      window.open(companyInfo.whatsappUrl, '_blank');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#07162c] text-white">
      {/* Background Graphic Effects & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Gradients */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

        {/* Global Connection Circuit Overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path d="M0,300 C300,150 700,450 1000,200" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="6 6" />
          <path d="M0,450 C400,300 600,100 1000,350" stroke="#f97316" strokeWidth="0.8" fill="none" strokeDasharray="4 4" />
          <circle cx="350" cy="225" r="4" fill="#38bdf8" />
          <circle cx="680" cy="280" r="5" fill="#f97316" />
          <circle cx="850" cy="240" r="4" fill="#38bdf8" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Concept Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-600/50 text-cyan-300 text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>NEWWAYS POLYMER NETWORK</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 text-xs font-medium">
                Est. {companyInfo.establishedYear} • Gujarat, India
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                POLYMER TRADING & SOURCING NETWORK
              </h1>
              <p className="text-amber-400 text-sm md:text-base font-bold tracking-widest uppercase flex items-center gap-2">
                <span>Buy • Sell • Source • Connect</span>
              </p>
            </div>

            {/* Materials Ticker Line (PP | PPCP | HDPE | LDPE | LLDPE | PET | PVC | ABS) */}
            <div className="bg-sky-950/60 border border-sky-800/80 rounded-xl px-4 py-2.5 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                CORE TRADING POLYMERS:
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs md:text-sm font-bold text-cyan-300">
                <span>PP</span>
                <span className="text-slate-600">|</span>
                <span>PPCP</span>
                <span className="text-slate-600">|</span>
                <span>HDPE</span>
                <span className="text-slate-600">|</span>
                <span>LDPE</span>
                <span className="text-slate-600">|</span>
                <span>LLDPE</span>
                <span className="text-slate-600">|</span>
                <span>PET</span>
                <span className="text-slate-600">|</span>
                <span>PVC</span>
                <span className="text-slate-600">|</span>
                <span>ABS</span>
              </div>
            </div>

            {/* Material Conditions Row: Prime | Near Prime | Off-Grade | Recycled */}
            <div className="pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                GRADES & CONDITIONS:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Prime', color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
                  { name: 'Near Prime', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
                  { name: 'Off-Grade', color: 'bg-orange-500/20 text-orange-300 border-orange-500/40' },
                  { name: 'Recycled', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => onFilterCondition && onFilterCondition(item.name as MaterialCondition)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 ${item.color}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Subheading / Tagline */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl italic font-serif">
              “The right polymer. The right source. The right connection.”
            </p>

            {/* Primary Action Buttons: [ BUY POLYMERS ] [ SELL YOUR STOCK ] [ JOIN POLYMER NETWORK ] */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleBuyClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-sky-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>BUY POLYMERS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleSellClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>SELL YOUR STOCK</span>
              </button>

              <button
                onClick={handleJoinClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>JOIN POLYMER NETWORK</span>
              </button>
            </div>

            {/* Micro-Features Bar & Trust Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sky-900/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-900/60 border border-sky-700/60 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{sections.hero.statsPorts} Corridors</div>
                  <div className="text-[11px] text-slate-400">{sections.hero.statsPortsLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-900/60 border border-sky-700/60 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{sections.hero.statsYears}</div>
                  <div className="text-[11px] text-slate-400">{sections.hero.statsYearsLabel}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-900/60 border border-sky-700/60 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{sections.hero.statsVolume}</div>
                  <div className="text-[11px] text-slate-400">{sections.hero.statsVolumeLabel}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-sky-950/70 to-slate-900/90 border border-sky-800/60 p-6 md:p-8 shadow-2xl backdrop-blur-md">
              {/* Floating Tag */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                <span>Active Trading Desk</span>
              </div>

              {/* Visual Polymer Graphic Display with Interactive Carousel & Authentic User Photos */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-sky-700/60 mb-4 shadow-xl group">
                <img
                  key={currentVisual.id}
                  src={currentVisual.image}
                  alt={currentVisual.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient overlay for crystal clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-transparent to-black/40 pointer-events-none"></div>

                {/* Top left badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold bg-sky-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border shadow-md ${currentVisual.tagColor}`}>
                    {currentVisual.badge}
                  </span>
                </div>

                {/* Bottom ticker banner */}
                <div className="absolute bottom-0 inset-x-0 z-10 p-3 bg-gradient-to-t from-slate-950/95 to-slate-950/60 backdrop-blur-sm flex items-center justify-between text-xs border-t border-sky-800/40">
                  <div>
                    <span className="text-white font-bold text-xs block">
                      {currentVisual.title}
                    </span>
                    <span className="text-slate-300 text-[10px]">
                      {currentVisual.caption}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Verified Spot Lot</span>
                  </span>
                </div>
              </div>

              {/* Creative Visual Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {heroVisuals.map((vis, idx) => (
                  <button
                    key={vis.id}
                    onClick={() => setActiveVisual(idx)}
                    className={`py-1.5 px-2 rounded-xl text-[10px] font-bold text-center transition-all truncate border ${
                      activeVisual === idx
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md ring-1 ring-sky-300/40'
                        : 'bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border-slate-800'
                    }`}
                  >
                    {vis.title.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Quick Sourcing Snapshot Matrix */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>Fast Material Routing</span>
                  <span className="text-sky-400 text-[11px]">Instant Inquiry</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">Looking to Buy?</span>
                    <span className="font-bold text-white block mt-0.5">Post Requirements</span>
                    <span className="text-[10px] text-sky-400">Grade, MFI, Target Price</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase">Have Stock to Sell?</span>
                    <span className="font-bold text-orange-400 block mt-0.5">Offer Available Lots</span>
                    <span className="text-[10px] text-slate-400">Prime, Surplus, Regrind</span>
                  </div>
                </div>

                {/* Tagline snippet */}
                <p className="text-[11px] text-slate-400 text-center italic pt-1">
                  “Tell us what you need. Tell us what you have. Newways connects the two.”
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
