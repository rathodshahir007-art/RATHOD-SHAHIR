import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  HeartHandshake, 
  Leaf, 
  Award, 
  ArrowRight, 
  Globe2, 
  CheckCircle2, 
  Package, 
  Users, 
  Layers, 
  Ship,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';
import { TradeMap } from '../components/TradeMap';
import { useBrand } from '../context/BrandContext';

interface AboutPageProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote') => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote, onNavigateContact }) => {
  const { originalLogoLight, openLogoModal } = useBrand();

  return (
    <div className="space-y-0 bg-white">
      {/* Page Hero Banner */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-24 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src="/src/assets/images/container_ship_ocean_1791543563929.jpg"
            alt="International Polymer Trade and Cargo Shipping"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/90 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
              <span>Home / About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Building Connections in Polymer Trade Since 2012
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Connecting Global Polymer Supply with a Sustainable Future. Newways Enterprise is a trusted polymer sourcing, trading, and recycling network, creating value for processors and traders worldwide.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenQuote('quote')}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
              >
                Request a Quote
              </button>
              <button
                onClick={onNavigateContact}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all"
              >
                Contact Trading Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Company Overview */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                OUR COMPANY
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Built on Trust. Driven by Possibilities.
              </h2>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                <strong>NEWWAYS ENTERPRISE</strong> is an India-based polymer trading, sourcing, import-export, and recycled plastic materials business established in 2012 in Surendranagar, Gujarat. We work to connect buyers, sellers, stockists, manufacturers, recyclers, and international suppliers.
              </p>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Our focus is to simplify polymer sourcing by helping businesses identify suitable materials, communicate requirements, evaluate supply opportunities, and coordinate commercial transactions and logistics.
              </p>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                We believe that strong business relationships, transparent communication, material specifications, and reliable coordination are essential to long-term trading partnerships.
              </p>

              {/* Hand-signed brand message style */}
              <div className="pt-2 border-l-4 border-orange-500 pl-4 py-1 italic text-slate-700 font-medium text-sm">
                “Your Polymer Partner for a Better Tomorrow — Tell us what you need. Tell us what you have. Newways connects the two.”
              </div>
            </div>

            {/* Center: Photo as shown in mockup */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] bg-slate-100">
                <img
                  src="/src/assets/images/circular_recycling_plant_1791541799748.jpg"
                  alt="Newways Enterprise Polymer Warehouse and Processing Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* 4 Core Sourcing Capabilities Cards below story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Global Sourcing</h3>
                <p className="text-xs text-slate-500 mt-0.5">Connecting with trusted suppliers across UAE, Saudi, Europe and Asia.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Trading Network</h3>
                <p className="text-xs text-slate-500 mt-0.5">Linking buyers, traders, stockists, and domestic manufacturers.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Sustainable Approach</h3>
                <p className="text-xs text-slate-500 mt-0.5">Supporting the circular plastic economy through verified regrind and PCR.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Reliable Supply</h3>
                <p className="text-xs text-slate-500 mt-0.5">Quality consistency, specification verification, and dependable delivery.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Verifiable Company Milestones Bar */}
      <section className="py-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <span className="font-mono text-3xl font-extrabold text-[#0b1e36] block">2012</span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">Established in Gujarat</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <span className="font-bold text-lg text-slate-900 block">Polymer Range</span>
              <span className="text-xs text-sky-700 font-semibold mt-1 block">Prime • Off-Grade • Recycled • Regrind</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <span className="font-bold text-lg text-slate-900 block">Global Presence</span>
              <span className="text-xs text-slate-500 mt-1 block">UAE • Saudi • Oman • Europe • Japan</span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
              <span className="font-bold text-lg text-slate-900 block">Trade Focus</span>
              <span className="text-xs text-orange-600 font-semibold mt-1 block">Import • Export • Domestic Trading</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Brand Identity & Original Logo Showcase */}
      <section className="py-14 bg-slate-900 text-white border-y border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#0a1e38] border border-sky-800/80 p-6 md:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-inner text-slate-900 text-center">
                <img
                  src={originalLogoLight}
                  alt="Newways Enterprise Original Brand Logo"
                  className="max-h-36 w-auto object-contain mx-auto hover:scale-105 transition-transform"
                />
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Official Brandmark</span>
                  <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">2012 — Present</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 text-cyan-300 text-xs font-semibold border border-sky-700/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ORIGINAL BRAND EMBLEM & LOGOTYPE</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  The Newways Enterprise Trademark
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Our identity is anchored in the multi-dimensional folded polymer ribbon loop with the signature upward trajectory arrow. Each color in the ribbon corresponds to our material divisions:
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-cyan-800/50">
                    <span className="text-cyan-400 font-bold block">Cyan Blue</span>
                    <span className="text-[11px] text-slate-400">Virgin Polymers</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-emerald-800/50">
                    <span className="text-emerald-400 font-bold block">Emerald Green</span>
                    <span className="text-[11px] text-slate-400">Recycled & Circular</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-rose-800/50">
                    <span className="text-rose-400 font-bold block">Crimson Red</span>
                    <span className="text-[11px] text-slate-400">Off-Grade & Scrap</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-amber-800/50">
                    <span className="text-amber-400 font-bold block">Golden Amber</span>
                    <span className="text-[11px] text-slate-400">Global Logistics</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={openLogoModal}
                    className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Upload or Manage Logo</span>
                  </button>
                  <a
                    href={originalLogoLight}
                    download="Newways_Enterprise_Original_Logo.jpg"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span>Download Official Asset</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-600">OUR VALUES</span>
            <h2 className="text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              What Drives Us Every Day
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our core values shape the way we do business, cultivate trust, and build enduring partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Integrity</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We believe in transparent terms, clear grade descriptions, and honest commercial practices without misrepresentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Sustainability</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We support a cleaner planet through responsible plastic recycling, screened regrind recovery, and resource conservation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Collaboration</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We grow stronger by working together with converters, stockists, freight handlers, and international suppliers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Excellence</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We are dedicated to quality, reliability, and continuous improvement across technical verification and trade logistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trade Network Interactive Embed */}
      <section className="py-16 md:py-20 bg-[#07162c] text-white border-b border-sky-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <TradeMap onEnquireLocation={(loc) => onOpenQuote('quote')} />
        </div>
      </section>

      {/* Twin Cards: Trusted Partners & Circular Economy as in Mockup */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Trusted by Global Suppliers */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 block mb-1">OUR PARTNERS</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Trusted by Global Suppliers and Buyers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We work with established resin producers, leading processors, and reliable logistics partners to ensure smooth commercial trade, reliable container clearance, and on-time plant delivery.
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">B2B Trade Network</span>
                <button
                  onClick={() => onOpenQuote('quote')}
                  className="px-4 py-2 bg-[#0b1e36] hover:bg-sky-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Partner With Us &rarr;
                </button>
              </div>
            </div>

            {/* Card 2: Towards a Circular Economy */}
            <div className="p-6 md:p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-800 shadow-md flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-44 h-36 rounded-2xl overflow-hidden bg-emerald-900 flex-shrink-0">
                <img
                  src="/src/assets/images/recycled_regrind_flakes_1791541788232.jpg"
                  alt="Towards a Circular Plastic Economy"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">OUR COMMITMENT</span>
                <h3 className="text-lg font-bold text-white leading-snug">Towards a Circular Economy</h3>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  By giving new life to plastic, we reduce waste, conserve resources, and support a cleaner, greener manufacturing ecosystem.
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => onOpenQuote('quote')}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Our Sustainability &rarr;
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sourcing & Verification Methodology */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-600">QUALITY & VERIFICATION</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0b1e36] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Our Approach to Material Verification
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mt-3">
                In polymer trading, specification mismatches lead to costly plant downtime. Newways Enterprise adheres to strict verification protocols before completing commercial transactions:
              </p>
              <ul className="space-y-3 mt-4 text-xs md:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Certificate of Analysis (CoA):</strong> Matching manufacturer batch test reports against processor technical requirements.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>MFI & Melt Density Checks:</strong> Verifying melt flow parameters for smooth injection molding or film blowing.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Recycled Regrind Purity:</strong> Multi-point inspection of contamination levels, moisture content, and screening mesh size.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Transparent Terms:</strong> Full upfront disclosure of packaging, delivery timelines, and transit insurance coverage.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 shadow-md overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900 group">
                <img
                  src="/src/assets/images/reach_stacker_crane_1791545659528.jpg"
                  alt="Industrial Container Reach Stacker Crane at Port Terminal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <span className="font-bold text-amber-300">Container Terminal Dispatch</span>
                  <span className="font-mono text-[11px] bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded">Mundra • Hazira Port Gateways</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="font-bold text-lg text-slate-900">
                  Speak with Our Sourcing Desk in Gujarat
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether you need a full container load (FCL) of prime PP raffia at Mundra port or regular monthly dispatch of washed PE100 regrind to your factory floor, we are ready to assist.
                </p>
                <div className="space-y-2 text-xs font-medium text-slate-700 pt-2 border-t border-slate-100">
                  <div>📍 Surendranagar – 363001, Gujarat, India</div>
                  <div>📞 +91 98797 47777 (Voice & WhatsApp)</div>
                  <div>✉️ info@newways.in</div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenQuote('quote')}
                    className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all"
                  >
                    Request Commercial Quotation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
