import React, { useState } from 'react';
import { MapPin, ArrowRight, ShieldCheck, Ship, Globe, Anchor } from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';

interface Hub {
  id: string;
  name: string;
  country: string;
  type: 'headquarters' | 'active-source' | 'export-market';
  x: number; // percentage
  y: number; // percentage
  materials: string[];
  role: string;
  transit: string;
}

const HUBS: Hub[] = [
  {
    id: 'india-hq',
    name: 'Surendranagar & Gujarat Ports (Mundra / Hazira)',
    country: 'India',
    type: 'headquarters',
    x: 68,
    y: 49,
    materials: ['PP Raffia/Homo', 'HDPE Pipe & Blow', 'Recycled Flakes', 'PET'],
    role: 'Central Commercial Headquarters & Port Distribution Hub',
    transit: 'Domestic Hub (Same day dispatch to Gujarat/Maharashtra)',
  },
  {
    id: 'uae',
    name: 'Jebel Ali / Abu Dhabi',
    country: 'UAE',
    type: 'active-source',
    x: 62,
    y: 47,
    materials: ['Borouge PP', 'Prime HDPE Blow', 'LLDPE Film'],
    role: 'Major Petrochemical Sourcing Partner',
    transit: '5 – 7 Days Sailing to Mundra / Nhava Sheva',
  },
  {
    id: 'saudi',
    name: 'Jubail & Yanbu',
    country: 'Saudi Arabia',
    type: 'active-source',
    x: 58,
    y: 48,
    materials: ['SABIC PPCP', 'Tasnee LLDPE', 'LDPE Heavy Film'],
    role: 'Primary Virgin Polyolefins Supplier',
    transit: '8 – 11 Days Ocean Transit',
  },
  {
    id: 'oman',
    name: 'Sohar Industrial Port',
    country: 'Oman',
    type: 'active-source',
    x: 63,
    y: 50,
    materials: ['OQ PP Homo', 'PP Random Copolymer', 'HDPE'],
    role: 'Fast-Maritime Direct Line Partner',
    transit: '4 – 6 Days Direct Feeder Service',
  },
  {
    id: 'europe',
    name: 'Antwerp / Rotterdam',
    country: 'Europe',
    type: 'active-source',
    x: 48,
    y: 32,
    materials: ['Hot Washed PET Flakes', 'Engineering ABS', 'PA6/PA66'],
    role: 'High-Purity Circular & Recycled Polymers',
    transit: '22 – 26 Days Container Freight',
  },
  {
    id: 'japan',
    name: 'Yokohama & Osaka',
    country: 'Japan',
    type: 'active-source',
    x: 87,
    y: 42,
    materials: ['Automotive Grade ABS', 'Specialty Polyamides', 'Optical PC'],
    role: 'Precision Engineering Polymers',
    transit: '18 – 22 Days Express Sea Line',
  },
  {
    id: 'srilanka',
    name: 'Colombo',
    country: 'Sri Lanka',
    type: 'export-market',
    x: 69,
    y: 60,
    materials: ['Woven Sack PP', 'HDPE Regrind', 'Packaging Film Lots'],
    role: 'Regional Export & Transshipment Market',
    transit: '3 – 4 Days Feeder Connection',
  },
  {
    id: 'bangladesh',
    name: 'Chittagong / Dhaka',
    country: 'Bangladesh',
    type: 'export-market',
    x: 74,
    y: 49,
    materials: ['PP Raffia', 'Recycled Granules', 'Textile PET Flakes'],
    role: 'Garment & Industrial Packaging Trade Corridor',
    transit: '6 – 8 Days Coastal & Sea Freight',
  },
];

export const TradeMap: React.FC<{ onEnquireLocation?: (loc: string) => void }> = ({ onEnquireLocation }) => {
  const [selectedHub, setSelectedHub] = useState<Hub>(HUBS[0]);

  return (
    <div className="relative bg-[#07162c] text-white rounded-3xl overflow-hidden shadow-2xl border border-sky-900/60 p-6 md:p-10">
      {/* Background World Map Graphic */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg 
          viewBox="0 0 1000 500" 
          className="w-full h-full object-cover" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle World Map Outline Grid */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="0.8" />
          </pattern>
          <rect width="1000" height="500" fill="url(#grid)" />

          {/* Continents simplified silhouettes */}
          <path 
            d="M 120,90 Q 200,60 260,110 T 240,210 T 170,220 T 130,160 Z 
               M 230,240 Q 290,260 280,360 T 230,440 T 190,320 Z 
               M 440,80 Q 520,70 540,140 T 470,180 T 430,120 Z 
               M 460,200 Q 560,200 550,330 T 480,410 T 420,290 Z 
               M 580,100 Q 820,90 840,190 T 730,270 T 630,180 Z 
               M 770,320 Q 850,310 860,390 T 780,420 Z" 
            fill="rgba(14, 116, 144, 0.12)" 
          />

          {/* Glowing connecting trade arcs between Surendranagar/India (680, 245) and other hubs */}
          <g stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse">
            <path d="M 680,245 Q 650,230 620,235" />
            <path d="M 680,245 Q 630,220 580,240" />
            <path d="M 680,245 Q 655,245 630,250" />
            <path d="M 680,245 Q 580,180 480,160" />
            <path d="M 680,245 Q 780,220 870,210" />
            <path d="M 680,245 Q 685,275 690,300" />
            <path d="M 680,245 Q 710,240 740,245" />
          </g>
        </svg>
      </div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-sky-800/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-400 text-xs font-semibold mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL POLYMER SOURCING & TRADE CORRIDORS</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Connecting the Polymer World
          </h3>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mt-1">
            Centrally anchored in Gujarat, India since 2012. We coordinate prime, off-grade, and recycled polymer shipments with established international suppliers and verified logistics corridors.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20"></span>
            <span className="text-slate-200">Headquarters (Surendranagar, IN)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20"></span>
            <span className="text-slate-200">Active Import Sourcing Hubs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></span>
            <span className="text-slate-200">Export & Regional Markets</span>
          </div>
        </div>
      </div>

      {/* Map Interactive Visual Box */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Map View */}
        <div className="lg:col-span-8 relative aspect-[16/9] min-h-[300px] md:min-h-[380px] bg-slate-950/70 rounded-2xl border border-sky-800/40 p-4 overflow-hidden flex items-center justify-center shadow-inner">
          {/* Subtle World Map backdrop */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* SVG Map Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {HUBS.filter(h => h.id !== 'india-hq').map(hub => (
              <line
                key={hub.id}
                x1="68"
                y1="49"
                x2={hub.x}
                y2={hub.y}
                stroke={selectedHub.id === hub.id ? '#38bdf8' : '#0369a1'}
                strokeWidth={selectedHub.id === hub.id ? '0.7' : '0.35'}
                strokeDasharray={selectedHub.id === hub.id ? '1 0.5' : '0.8 0.8'}
                opacity={selectedHub.id === hub.id ? 1 : 0.4}
              />
            ))}
          </svg>

          {/* Interactive Hub Markers */}
          {HUBS.map((hub) => {
            const isSelected = selectedHub.id === hub.id;
            const isHQ = hub.type === 'headquarters';
            const isImport = hub.type === 'active-source';

            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHub(hub)}
                style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                className={`group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 focus:outline-none`}
                title={`${hub.name} (${hub.country})`}
              >
                {/* Ping animation for active hub */}
                {isSelected && (
                  <span className={`absolute -inset-2 rounded-full opacity-75 animate-ping ${
                    isHQ ? 'bg-amber-400' : isImport ? 'bg-cyan-400' : 'bg-emerald-400'
                  }`}></span>
                )}

                {/* Pin Node */}
                <div className={`relative flex items-center justify-center rounded-full transition-transform duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'group-hover:scale-110 z-10'
                } ${
                  isHQ
                    ? 'w-6 h-6 bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/50'
                    : isImport
                    ? 'w-5 h-5 bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/40'
                    : 'w-4 h-4 bg-emerald-400 text-slate-950 shadow-md shadow-emerald-400/40'
                }`}>
                  {isHQ ? (
                    <span className="text-[10px] font-black">HQ</span>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950"></span>
                  )}
                </div>

                {/* Country Label pill on desktop */}
                <div className={`hidden md:block absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-md transition-all ${
                  isSelected 
                    ? 'bg-sky-900/90 text-white border border-sky-400 shadow-md z-40' 
                    : 'bg-slate-900/70 text-slate-300 border border-slate-700/60 opacity-80 group-hover:opacity-100'
                }`}>
                  {hub.country}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Hub Details Card */}
        <div className="lg:col-span-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-sky-800/60 p-6 shadow-xl flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                selectedHub.type === 'headquarters'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : selectedHub.type === 'active-source'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {selectedHub.type === 'headquarters' ? 'Primary Operations Hub' : selectedHub.type === 'active-source' ? 'Active Sourcing Origin' : 'Export & Delivery Market'}
              </span>
              <span className="text-slate-400 text-xs font-mono">{selectedHub.country}</span>
            </div>

            <h4 className="text-xl font-bold text-white mb-1">
              {selectedHub.name}
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed mb-4">
              {selectedHub.role}
            </p>

            {/* Key Polymer Flows */}
            <div className="space-y-3 mb-6">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Key Traded Materials:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHub.materials.map((m, i) => (
                    <span key={i} className="text-xs bg-sky-950 border border-sky-700/60 text-sky-200 px-2.5 py-0.5 rounded-md font-medium">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Logistics & Sea Transit:
                </span>
                <div className="flex items-center gap-2 text-xs text-amber-300 font-medium">
                  <Ship className="w-4 h-4 text-cyan-400" />
                  <span>{selectedHub.transit}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => onEnquireLocation && onEnquireLocation(selectedHub.name)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-orange-600/30 transition-colors"
            >
              <span>Enquire Corridors for {selectedHub.country}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              *Shipments subject to customs clearance, port allocations & shipping schedules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
