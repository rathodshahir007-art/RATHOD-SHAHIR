import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Globe2, 
  TrendingUp, 
  Handshake, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2, 
  FileText, 
  Scale, 
  Truck, 
  RefreshCw,
  Sparkles,
  Ship
} from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';
import { TradeMap } from '../components/TradeMap';

interface NetworkPageProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote') => void;
}

export const NetworkPage: React.FC<NetworkPageProps> = ({ onOpenQuote }) => {
  const [activeMedia, setActiveMedia] = useState<'multimodal' | 'crane' | 'ship'>('multimodal');
  return (
    <div className="space-y-0 bg-white">
      {/* Network Page Hero Banner matching mockup */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-24 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
                <span>Home / Network</span>
              </div>
              
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
                NEWWAYS POLYMER NETWORK
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Buy • Sell • Source • <span className="text-cyan-400">Connect</span>
              </h1>
              
              <h2 className="text-lg md:text-xl font-bold text-slate-200">
                A Strong Network for a Stronger Polymer Trade
              </h2>
              
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Newways Polymer Network brings together buyers, sellers, importers, stockists, recyclers, and manufacturers to create real business opportunities in the polymer industry.
              </p>

              {/* 4 Trust Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Verified Partners</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Quality Focused</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Globe2 className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Global Connections</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                  <span className="text-xs font-bold text-white block">Trusted Network</span>
                </div>
              </div>
            </div>

            {/* Right: Creative Multimodal Logistics & Maritime Hero Visual */}
            <div className="lg:col-span-5 relative space-y-2">
              <div className="rounded-3xl overflow-hidden border border-sky-700/60 shadow-2xl aspect-[16/10] relative group bg-slate-900">
                {activeMedia === 'multimodal' ? (
                  <img
                    src="/src/assets/images/globe_multimodal_logistics_1791547472300.jpg"
                    alt="Creative 3D Multimodal Sliced Earth Globe - Ocean Shipping, Air Freight, Road Transport"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : activeMedia === 'crane' ? (
                  <img
                    src="/src/assets/images/reach_stacker_crane_1791545659528.jpg"
                    alt="Reach Stacker Heavy Container Crane Lifting Polymer Shipping Container in Port Terminal"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img
                    src="/src/assets/images/container_ship_ocean_1791543563929.jpg"
                    alt="International Container Cargo Ship Showing Import Export Logistics"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-transparent to-black/20 pointer-events-none"></div>

                {/* Bottom ticker info */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-sky-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                      {activeMedia === 'multimodal' 
                        ? 'Multimodal Global Trade' 
                        : activeMedia === 'crane' 
                        ? 'Port Yard Handling' 
                        : 'Ocean Freight Corridors'}
                    </span>
                    <span className="text-slate-200 text-xs">
                      {activeMedia === 'multimodal'
                        ? 'Air • Ocean Cargo • Road Haulage Fleet'
                        : activeMedia === 'crane'
                        ? 'Reach Stacker Heavy Container Crane'
                        : 'Direct Maritime Sourcing Lines'}
                    </span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold text-[11px]">
                    {activeMedia === 'multimodal'
                      ? 'Worldwide Corridors'
                      : activeMedia === 'crane'
                      ? '20ft/40ft Port CFS'
                      : 'CFR Mundra / Hazira'}
                  </span>
                </div>
              </div>

              {/* Quick media toggle buttons */}
              <div className="flex items-center justify-end gap-1.5 text-xs flex-wrap">
                <button
                  onClick={() => setActiveMedia('multimodal')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeMedia === 'multimodal'
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>3D Multimodal Globe</span>
                </button>
                <button
                  onClick={() => setActiveMedia('ship')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeMedia === 'ship'
                      ? 'bg-sky-500 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Ship className="w-3.5 h-3.5" />
                  <span>Ocean Cargo Ship</span>
                </button>
                <button
                  onClick={() => setActiveMedia('crane')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                    activeMedia === 'crane'
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Port Reach Stacker</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Join Our Network? 5 Value Props */}
      <section className="py-16 md:py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">WHY JOIN OUR NETWORK?</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                More Opportunities. More Connections.
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1 max-w-xl">
                Whether you are looking to buy, sell, or source polymer materials, our network helps you find the right partner, right material, and right price — faster and easier.
              </p>
            </div>

            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#0b1e36] hover:bg-sky-900 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              <span>Join Our Polymer Network</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Buyers & Sellers</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Connect with verified suppliers, manufacturers, stockists, and traders.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Multiple Grades</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Prime, Near Prime, Off-Grade & Recycled materials matched to your budget.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Global Reach</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Access to international suppliers and maritime import opportunities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Market Updates</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Daily stock releases, active buying requirements, and price trend insights.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">Long-Term Relations</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Build consistent, predictable, and recurring business partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trade Map section */}
      <section className="py-16 md:py-20 bg-[#07162c] text-white border-b border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <TradeMap onEnquireLocation={(loc) => onOpenQuote('quote')} />
        </div>
      </section>

      {/* 6 Simple Steps to Grow Together */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">HOW IT WORKS</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Simple Steps to Grow Together
            </h2>
            <p className="text-slate-600 text-xs md:text-sm mt-1">
              Our network makes the buying and selling process transparent, efficient, and hassle-free — from requirement to delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { num: '01', title: 'Share Your Requirement', desc: 'Material, grade, MFI, quantity, location, target price.', icon: FileText },
              { num: '02', title: 'Source & Verify', desc: 'We find the best suppliers and available stock.', icon: ShieldCheck },
              { num: '03', title: 'Compare Options', desc: 'Quality, price, location, freight, and terms.', icon: Scale },
              { num: '04', title: 'Negotiate & Close', desc: 'Commercial discussion and agreement.', icon: Handshake },
              { num: '05', title: 'Logistics & Delivery', desc: 'Dispatch, freight, and documentation support.', icon: Truck },
              { num: '06', title: 'Repeat Supply', desc: 'Build long-term partnerships.', icon: RefreshCw },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.num} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-8 h-8 rounded-xl bg-white text-[#0b1e36] font-bold text-xs flex items-center justify-center border border-slate-200 shadow-sm">
                        {s.num}
                      </span>
                      <Icon className="w-4 h-4 text-sky-600" />
                    </div>
                    <h3 className="font-bold text-xs text-slate-900 mb-1">{s.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-snug">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Member Disclaimer required by brief */}
          <div className="mt-8 p-3 rounded-xl bg-slate-100 text-center text-xs text-slate-500">
            *Network membership and communication channels facilitate commercial discovery. Commercial execution and verification remain subject to bilateral trade agreement and specification confirmations.
          </div>
        </div>
      </section>

      {/* WhatsApp Community Box matching mockup */}
      <section className="py-16 md:py-20 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-8 md:p-12 border border-emerald-800 bg-emerald-900/60 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.558 3.784 1.527 5.342L2 22l4.82-1.488A9.972 9.972 0 0 0 12.03 22c5.537 0 10.031-4.495 10.031-10.031C22.062 6.495 17.568 2 12.031 2zm5.836 14.199c-.244.686-1.223 1.328-1.745 1.41-.497.079-1.12.112-1.808-.109-.434-.14-1.002-.328-1.728-.643-3.048-1.32-5.041-4.417-5.195-4.621-.153-.204-1.242-1.654-1.242-3.155 0-1.502.787-2.241 1.066-2.528.279-.287.61-.359.814-.359.204 0 .408.002.585.012.188.01.442-.07.69.528.256.619.865 2.112.941 2.265.076.153.127.332.025.536-.102.204-.153.332-.305.511-.153.179-.32.4-.457.537-.153.153-.312.319-.134.625.178.306.791 1.303 1.696 2.109 1.166 1.037 2.148 1.359 2.454 1.512.306.153.484.127.662-.077.178-.204.764-.891.968-1.196.204-.306.408-.255.687-.153.28.102 1.778.839 2.083.992.305.153.508.23.585.357.076.128.076.738-.168 1.424z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  Join the Newways Polymer Network
                </h3>
                <p className="text-emerald-200 text-xs md:text-sm">
                  Get daily updates on stock, requirements, offers, and market trends.
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-emerald-300 pt-1">
                  <div>✓ Available Polymer Stock</div>
                  <div>✓ Buying Requirements</div>
                  <div>✓ Prime & Off-Grade Lots</div>
                  <div>✓ Recycled Materials & Flakes</div>
                  <div>✓ Import Opportunities</div>
                  <div>✓ Polymer Market Updates</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-xl whitespace-nowrap"
              >
                Join WhatsApp Network &rarr;
              </a>
              <span className="text-[11px] text-emerald-300 italic">Stay Updated. Stay Ahead.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
