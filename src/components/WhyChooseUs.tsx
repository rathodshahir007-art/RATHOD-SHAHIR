import React from 'react';
import { 
  Building2, 
  Network, 
  Layers, 
  CheckCircle2, 
  Globe2, 
  FileCheck, 
  Truck, 
  Handshake, 
  ShieldCheck,
  Award
} from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Established in 2012',
      desc: 'Over a decade of continuous presence in the Indian polymer trade, anchored in Surendranagar, Gujarat.',
      icon: Building2,
    },
    {
      title: 'Buyer & Seller Network',
      desc: 'Active bridge linking plastic processors, converters, domestic stockists, and global petrochemical traders.',
      icon: Network,
    },
    {
      title: 'Multiple Material Conditions',
      desc: 'Reliable options across Prime Virgin, Near-Prime surplus, factory transition Off-Grade, and Recycled Regrind.',
      icon: Layers,
    },
    {
      title: 'Material Verification Support',
      desc: 'Guidance on Certificate of Analysis (CoA), Melt Flow Index (MFI) matching, and physical batch consistency.',
      icon: ShieldCheck,
    },
    {
      title: 'Import-Export Coordination',
      desc: 'Regular maritime logistics connecting Middle East (UAE, Saudi, Oman), Europe, and Japan with West Coast Indian ports.',
      icon: Globe2,
    },
    {
      title: 'Logistics & Documentation',
      desc: 'Assistance with GST billing, port container clearing, freight optimization, and reliable delivery dispatch.',
      icon: Truck,
    },
    {
      title: 'Transparent Commercials',
      desc: 'Clear price basis (CFR, Ex-Warehouse, Ex-Factory) and honest grade declarations for long-term partnerships.',
      icon: FileCheck,
    },
    {
      title: 'Long-Term Relationships',
      desc: 'We focus on sustainable, repeat supply contracts rather than speculative one-off transactions.',
      icon: Handshake,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>COMMERCIAL INTEGRITY & EXPERIENCE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Why Leading Processors Work With Newways
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Built on trust, verified specifications, and dependable commercial delivery since 2012.
          </p>
        </div>

        {/* 8 Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center mb-4 group-hover:bg-[#0b1e36] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-900 transition-colors">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {pt.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center text-[10px] font-bold text-slate-400 group-hover:text-sky-600">
                  <span>NEWWAYS ADVANTAGE 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logistics & Port Terminal Infrastructure Spotlight */}
        <div className="mt-12 rounded-3xl overflow-hidden bg-[#07162c] border border-sky-900 shadow-xl grid grid-cols-1 lg:grid-cols-12 text-white">
          <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] lg:aspect-auto min-h-[300px] overflow-hidden group">
            <img
              src="/src/assets/images/reach_stacker_crane_1791545659528.jpg"
              alt="Industrial Reach Stacker Container Crane Loading Polymer Shipping Containers in Port Terminal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-transparent to-black/30 pointer-events-none"></div>
            
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-400/40 text-[11px] font-mono font-bold">
                <span>PORT TERMINAL DISPATCH</span>
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-sky-800/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Heavy Port Equipment</span>
                <span className="text-white font-bold text-xs">Reach Stacker Crane Yard Staging</span>
              </div>
              <span className="text-emerald-400 font-mono font-bold text-xs">Mundra • Hazira</span>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-300 text-xs font-semibold">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span>PHYSICAL HANDLING & LOGISTICS INFRASTRUCTURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Active Port Clearance & Rapid Container Movement
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Operating in the polymer industry requires dependable physical coordination. Newways Enterprise oversees containerized cargo arriving at western India's major deep-sea terminals, arranging heavy-duty reach-stacker yard movement, customs inspection, CFS de-stuffing, and direct trailer delivery to plastic manufacturing plants.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>20ft & 40ft HC Containers</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Prime virgin resin, off-grade lots, and screened regrind in standard maritime containers.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Mundra & Hazira Gateways</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Direct access to Gujarat's premier commercial ports with fast customs turnaround.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 text-[11px]">
                Surendranagar, Gujarat • Direct connectivity to Ahmedabad, Vadodara, Surat & Mumbai industrial corridors
              </span>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-white font-bold flex items-center gap-1.5 whitespace-nowrap transition-colors"
              >
                <span>Track Cargo On WhatsApp</span>
                <span className="text-amber-400">&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Core Value Quote */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-xs md:text-sm text-slate-700 italic font-medium leading-relaxed">
            “We believe that strong business relationships, transparent communication, verified material specifications, and reliable coordination are essential to long-term trading partnerships.”
          </p>
          <span className="block mt-2 text-xs font-bold text-[#0b1e36] uppercase tracking-wider">
            — NEWWAYS ENTERPRISE Commercial Philosophy
          </span>
        </div>

      </div>
    </section>
  );
};
