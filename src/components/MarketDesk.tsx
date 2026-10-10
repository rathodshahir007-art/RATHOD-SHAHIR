import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  FileText, 
  Ship, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Globe2, 
  Users,
  AlertCircle
} from 'lucide-react';
import { 
  MARKET_PRICE_INDICATIONS, 
  AVAILABLE_STOCK, 
  BUYING_REQUIREMENTS, 
  SELLING_OFFERS, 
  IMPORT_OPPORTUNITIES,
  MARKET_INSIGHT_ARTICLES,
  COMPANY_INFO
} from '../data/polymerData';
import { AvailableStockItem } from '../types';

interface MarketDeskProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string) => void;
  onReadArticle?: (id: string) => void;
}

export const MarketDesk: React.FC<MarketDeskProps> = ({ onOpenQuote, onReadArticle }) => {
  const [selectedStock, setSelectedStock] = useState<AvailableStockItem | null>(null);
  const [activeTab, setActiveTab] = useState<'prices' | 'stock' | 'requirements' | 'offers' | 'imports'>('prices');

  return (
    <section id="market-updates" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Desk Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>POLYMER MARKET DESK</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Real-Time Updates for Smarter Decisions
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Stay informed with the latest polymer prices, available stock, active buying requirements, selling offers, and global trade movements.
          </p>

          {/* Quick Nav Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'prices', label: 'Price Indications', icon: TrendingUp },
              { id: 'stock', label: 'Available Stock', icon: Package },
              { id: 'requirements', label: 'Buying Requirements', icon: FileText },
              { id: 'offers', label: 'Selling Offers', icon: Users },
              { id: 'imports', label: 'Import Opportunities', icon: Ship },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#0b1e36] text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 1: Price Indications Table & Market Outlook */}
        {activeTab === 'prices' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Price Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600">TODAY'S MARKET SNAPSHOT</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Polymer Price Indications</h3>
                  <p className="text-xs text-slate-500">Indicative prices in USD/MT & ₹/kg (subject to commercial confirmation)</p>
                </div>
                <div className="text-right">
                  <span className="inline-block text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    Updated: 14 Sep 2026
                  </span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold text-[11px]">
                      <th className="py-3 px-3">Material</th>
                      <th className="py-3 px-3">Grade / Type</th>
                      <th className="py-3 px-3">Price (USD/MT)</th>
                      <th className="py-3 px-3">Approx. INR</th>
                      <th className="py-3 px-3">Change</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {MARKET_PRICE_INDICATIONS.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-900 text-sm">{row.material}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[11px] font-medium border border-sky-100">
                            {row.gradeType}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-slate-900">
                          {row.priceUsd}
                        </td>
                        <td className="py-3.5 px-3 font-mono text-slate-600">
                          {row.priceInr}
                        </td>
                        <td className="py-3.5 px-3 font-mono">
                          <span className={`inline-flex items-center gap-1 font-bold ${
                            row.isPositive ? 'text-emerald-600' : 'text-red-500'
                          }`}>
                            {row.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                            <span>{row.changePercent}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => onOpenQuote('buy', row.material)}
                            className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-[11px] border border-orange-200 transition-colors"
                          >
                            Enquire
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Basis Note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Basis: CFR Nhava Sheva / Mundra (USD) | Ex-Depot / Factory (INR)</span>
                <span className="italic">*Prices are indicative references, not live continuous exchanges.</span>
              </div>
            </div>

            {/* Market Outlook Sidebar */}
            <div className="lg:col-span-4 bg-[#0b1e36] text-white rounded-3xl p-6 shadow-xl border border-sky-900 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>Polymer Market Outlook</span>
                </div>

                <h4 className="text-xl font-bold tracking-tight">
                  Weekly Trade Desk Assessment
                </h4>

                <ul className="space-y-3 text-xs text-slate-200 leading-relaxed pt-2">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    <span><strong>PP & HDPE Demand:</strong> Remains buoyant in domestic agricultural, woven sacks, and industrial container segments.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Feedstock & Crude:</strong> Naphtha cracking rates steady across Middle East refiners, holding polymer price floor firm.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Recycled Feedstock:</strong> Increased inflow of tested PE100 and washed HDPE bottle flakes from Europe & Gulf ports.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Import Port Allocations:</strong> Container congestion at Mundra easing; sailing transit from Jebel Ali clocking 5–7 days.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-sky-800">
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/30"
                >
                  <Users className="w-4 h-4" />
                  <span>Get WhatsApp Price Alerts</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Available Stock Desk */}
        {activeTab === 'stock' && (
          <div className="space-y-4 mb-12 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Available Ready Stock</h3>
                <p className="text-xs text-slate-500">Verified inventory lots ready for dispatch from Indian ports and warehouses.</p>
              </div>
              <button
                onClick={() => onOpenQuote('sell')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                + Submit Stock to Sell
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {AVAILABLE_STOCK.map((item) => (
                <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-black bg-[#0b1e36] text-white">
                        {item.material}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.condition === 'Prime' ? 'bg-sky-100 text-sky-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {item.condition}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900">{item.grade}</h4>
                    <div className="text-xs text-slate-500 mt-1">📍 {item.location}</div>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Available Volume:</span>
                        <strong className="text-slate-900 font-mono text-sm">{item.quantityMt} MT</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Packaging:</span>
                        <span className="text-slate-700 truncate max-w-[150px]">{item.packing}</span>
                      </div>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-slate-500 mt-2 italic leading-relaxed">
                        "{item.notes}"
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Lot</span>
                    </span>
                    <button
                      onClick={() => onOpenQuote('buy', `${item.material} ${item.grade}`)}
                      className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Book Lot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Buying Requirements Desk */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 mb-12 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Active Buying Requirements</h3>
                <p className="text-xs text-slate-500">Manufacturers and processors currently looking for regular supplies.</p>
              </div>
              <button
                onClick={() => onOpenQuote('buy')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                + Post Your Requirement
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BUYING_REQUIREMENTS.map((req) => (
                <div key={req.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-xs font-black bg-cyan-700 text-white">
                        {req.material}
                      </span>
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                        {req.timeline}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{req.gradeSpec}</h4>
                    {req.mfiTarget && (
                      <span className="inline-block text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1">
                        {req.mfiTarget}
                      </span>
                    )}

                    <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Required Quantity:</span>
                        <strong className="text-slate-900 font-mono">{req.quantityMt}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Destination Hub:</span>
                        <span className="text-slate-700">{req.targetLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Pricing: <strong className="text-slate-700">{req.targetPrice || 'Negotiable'}</strong>
                    </span>
                    <button
                      onClick={() => onOpenQuote('sell', req.material)}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Offer This Grade
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Selling Offers */}
        {activeTab === 'offers' && (
          <div className="space-y-4 mb-12 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Verified Selling Offers</h3>
                <p className="text-xs text-slate-500">Direct producer and stockist lots offered to our trading network.</p>
              </div>
              <button
                onClick={() => onOpenQuote('sell')}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
              >
                + Submit Stock Offer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SELLING_OFFERS.map((off) => (
                <div key={off.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono font-bold text-sm text-slate-900">{off.material}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        off.condition === 'Prime' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {off.condition}
                      </span>
                    </div>

                    <h4 className="text-xs text-slate-600">{off.grade}</h4>
                    
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Available Volume:</span>
                        <strong className="text-slate-900 font-mono">{off.quantityMt} MT</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="text-slate-700">{off.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Lot Description:</span>
                        <span className="text-slate-700">{off.lotType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => onOpenQuote('buy', off.material)}
                      className="px-3.5 py-1.5 bg-[#0b1e36] hover:bg-sky-900 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Enquire Rate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Import Opportunities */}
        {activeTab === 'imports' && (
          <div className="space-y-6 mb-12 animate-in fade-in duration-200">
            {/* Visual Container Shipping Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-sky-800/60 shadow-xl p-6 md:p-8 text-white">
              <div className="absolute inset-0 opacity-30">
                <img
                  src="/src/assets/images/container_ship_ocean_1791543563929.jpg"
                  alt="Ocean Freight Container Ship for Polymer Import Export"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/80 to-transparent pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/90 border border-sky-600/60 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Ship className="w-3.5 h-3.5" />
                  <span>MARITIME TRADE CORRIDORS</span>
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Direct Maritime Import Pipelines
                </h3>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                  Regular containerized and bulk polymer shipments connecting Jebel Ali, Yanbu, Jubail, Sohar, Antwerp, and Yokohama directly to Mundra and Nhava Sheva with full customs documentation and duty clearance support.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {IMPORT_OPPORTUNITIES.map((imp) => (
                <div key={imp.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{imp.flag}</span>
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{imp.country}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">{imp.port}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Featured Polymers:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {imp.materials.map((m, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-sky-50 text-sky-800 text-xs font-medium border border-sky-100">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {imp.keyAdvantage}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-cyan-700 font-medium">
                      ⏱ {imp.leadTime}
                    </span>
                    <button
                      onClick={() => onOpenQuote('quote', `Import from ${imp.country}`)}
                      className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      Get CFR Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 6: Latest Market Articles & Insights */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">INDUSTRY INTELLIGENCE</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-0.5">Latest Polymer Insights & Trade Guides</h3>
            </div>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Subscribe via WhatsApp Community</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MARKET_INSIGHT_ARTICLES.slice(0, 3).map((art, idx) => {
              const articleImage = idx === 0 
                ? "/src/assets/images/prime_polymer_pellets_1791541763376.jpg"
                : idx === 1
                ? "/src/assets/images/recycled_regrind_flakes_1791541788232.jpg"
                : "/src/assets/images/hero_polymer_shipping_1791541751862.jpg";

              return (
                <div 
                  key={art.id}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Article Thumbnail Image as seen in mockup */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                      <img
                        src={articleImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-slate-800 font-bold uppercase tracking-wider text-[10px] shadow-sm">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {art.date}
                        </span>
                      </div>

                      <h4 className="font-bold text-base text-slate-900 group-hover:text-sky-700 transition-colors">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 line-clamp-3">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                    <span className="text-[11px] text-slate-400">{art.readTime}</span>
                    <button
                      onClick={() => onReadArticle && onReadArticle(art.id)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Network CTA Banner */}
        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-800 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.954.558 3.784 1.527 5.342L2 22l4.82-1.488A9.972 9.972 0 0 0 12.03 22c5.537 0 10.031-4.495 10.031-10.031C22.062 6.495 17.568 2 12.031 2zm5.836 14.199c-.244.686-1.223 1.328-1.745 1.41-.497.079-1.12.112-1.808-.109-.434-.14-1.002-.328-1.728-.643-3.048-1.32-5.041-4.417-5.195-4.621-.153-.204-1.242-1.654-1.242-3.155 0-1.502.787-2.241 1.066-2.528.279-.287.61-.359.814-.359.204 0 .408.002.585.012.188.01.442-.07.69.528.256.619.865 2.112.941 2.265.076.153.127.332.025.536-.102.204-.153.332-.305.511-.153.179-.32.4-.457.537-.153.153-.312.319-.134.625.178.306.791 1.303 1.696 2.109 1.166 1.037 2.148 1.359 2.454 1.512.306.153.484.127.662-.077.178-.204.764-.891.968-1.196.204-.306.408-.255.687-.153.28.102 1.778.839 2.083.992.305.153.508.23.585.357.076.128.076.738-.168 1.424z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                Join the Newways Polymer Network on WhatsApp
              </h4>
              <p className="text-emerald-200 text-xs md:text-sm mt-0.5">
                Discover available stock, active buying requirements, selling offers, and polymer market updates daily.
              </p>
            </div>
          </div>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform transform hover:scale-105 whitespace-nowrap"
          >
            Join WhatsApp Network Now
          </a>
        </div>

      </div>
    </section>
  );
};
