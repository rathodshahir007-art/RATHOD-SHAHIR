import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  TrendingUp, 
  Play, 
  Pause, 
  ExternalLink, 
  Factory, 
  PackageCheck,
  MapPin,
  Calendar,
  Scale,
  Users,
  MessageSquare
} from 'lucide-react';
import { useWordPressCms } from '../context/WordPressCmsContext';
import { COMPANY_INFO } from '../data/polymerData';

interface ClientTestimonial {
  id: string;
  companyName: string;
  location: string;
  clientSince: string;
  industry: string;
  category: 'blow' | 'injection' | 'extrusion' | 'film' | 'compounding';
  personName: string;
  personRole: string;
  materialSupplied: string;
  monthlyVolume: string;
  rating: number;
  highlight: string;
  quote: string;
  metrics: {
    specAccuracy: string;
    onTimeDelivery: string;
  };
  logoInitials: string;
  logoColor: string;
}

const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 't1',
    companyName: 'Apex Pipe & Extrusions Ltd.',
    location: 'Ahmedabad & Sanand, Gujarat',
    clientSince: '2013',
    industry: 'HDPE / PE100 Pressure Pipes',
    category: 'extrusion',
    personName: 'Dharmesh Patel',
    personRole: 'Procurement Director & Plant Head',
    materialSupplied: 'PE100 Pipe Regrind & Virgin Natural HDPE',
    monthlyVolume: '65 – 80 MT / Month',
    rating: 5,
    highlight: 'Consistent MFI & zero batch rejection in 11 years',
    quote: 'We have been sourcing extrusion regrind and prime natural HDPE granules from Newways Enterprise since 2013. In the pipe industry, carbon black dispersion and precise 0.3 MFI consistency are critical. Newways inspects and certifies every consignment before truck dispatch. Our line downtime due to material inconsistency has been zero.',
    metrics: {
      specAccuracy: '99.8%',
      onTimeDelivery: '99.2%'
    },
    logoInitials: 'APEX',
    logoColor: 'from-blue-600 to-cyan-700'
  },
  {
    id: 't2',
    companyName: 'Shreeji Blow Plast Industries',
    location: 'Vapi Industrial Estate, Gujarat',
    clientSince: '2012',
    industry: 'Industrial 200L Drums & Containers',
    category: 'blow',
    personName: 'Rameshwar Vyas',
    personRole: 'Managing Director',
    materialSupplied: 'HDPE 5601 / 5603 & 200L Blue Drum Regrind',
    monthlyVolume: '100+ MT / Month',
    rating: 5,
    highlight: 'Steadfast supply partner through volatile market cycles',
    quote: 'Newways has been our primary polymer sourcing desk since their inception in 2012. When local supply tightened during petrochemical turnaround cycles, Newways coordinated spot import lots from UAE and Oman ports within 48 hours. Their transparency regarding material grade, drop test suitability, and target price is unmatched.',
    metrics: {
      specAccuracy: '99.5%',
      onTimeDelivery: '98.9%'
    },
    logoInitials: 'SHREEJI',
    logoColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 't3',
    companyName: 'Mahavir Injection & Auto Tech',
    location: 'Bhosari & Chakan, Pune, Maharashtra',
    clientSince: '2015',
    industry: 'Automotive Battery Casings & Buckets',
    category: 'injection',
    personName: 'Sanjay Deshmukh',
    personRole: 'Chief Operating Officer',
    materialSupplied: 'PPCP Injection Black / Grey & Copolymer Lots',
    monthlyVolume: '45 – 60 MT / Month',
    rating: 5,
    highlight: 'Exceptional Izod impact strength and color consistency',
    quote: 'Automotive battery enclosures require severe Charpy impact ratings and crack resistance. Newways provides pre-tested PPCP lots with verified technical data sheets and ash content analysis. Dealing with their commercial desk has given our automotive tier-2 operation total supply chain security.',
    metrics: {
      specAccuracy: '100%',
      onTimeDelivery: '99.4%'
    },
    logoInitials: 'MAHAVIR',
    logoColor: 'from-emerald-600 to-teal-800'
  },
  {
    id: 't4',
    companyName: 'Vardhman Packaging Polymers',
    location: 'Daman & Silvassa Industrial Hub',
    clientSince: '2016',
    industry: 'Multi-layer Blown Film & Stretch Wraps',
    category: 'film',
    personName: 'Amit Shah',
    personRole: 'Partner & Raw Materials Head',
    materialSupplied: 'LLDPE Film 0120 / 0209 & LDPE Prime Granules',
    monthlyVolume: '85 MT / Month',
    rating: 5,
    highlight: 'High dart impact film resins at aggressive port rates',
    quote: 'Film manufacturing is extremely sensitive to gel counts and melt flow index variations. Newways consistently delivers prime grade LLDPE and LDPE lots cleared from Mundra and Nhava Sheva ports. Their commercial terms, freight coordination, and documentation speed make repeat ordering effortless.',
    metrics: {
      specAccuracy: '99.6%',
      onTimeDelivery: '99.0%'
    },
    logoInitials: 'VARDHMAN',
    logoColor: 'from-violet-600 to-purple-800'
  },
  {
    id: 't5',
    companyName: 'Gujarat Polymer Compounders',
    location: 'Surendranagar & Wadhwan, Gujarat',
    clientSince: '2014',
    industry: 'Engineering Compounds & Masterbatches',
    category: 'compounding',
    personName: 'Kiritbhai Sanghvi',
    personRole: 'Technical Director',
    materialSupplied: 'Virgin PP Homo, HDPE Natural Flakes & Additives',
    monthlyVolume: '50 MT / Month',
    rating: 5,
    highlight: 'Local Surendranagar roots with global sourcing reach',
    quote: 'Having Newways based right here in Surendranagar with a pan-India trading network is a huge asset for regional compounders. They understand raw resin chemistry, melt rheology, and filler loading limits. Their regrind materials are washed, metal-free, and uniform.',
    metrics: {
      specAccuracy: '99.9%',
      onTimeDelivery: '99.7%'
    },
    logoInitials: 'GPC',
    logoColor: 'from-sky-600 to-blue-900'
  },
  {
    id: 't6',
    companyName: 'Gulf Polymers & Trading FZE',
    location: 'Hamriyah Free Zone, Sharjah, UAE',
    clientSince: '2017',
    industry: 'Middle East Petrochemical Indenting',
    category: 'compounding',
    personName: 'Tariq Al-Mansoor',
    personRole: 'Senior Sourcing Executive',
    materialSupplied: 'Prime Virgin PP, HDPE Blow & Off-Spec Cargoes',
    monthlyVolume: '150 – 200 MT / Corridor',
    rating: 5,
    highlight: 'Flawless trade documentation and container dispatch',
    quote: 'We regularly collaborate with Newways Enterprise for cross-border polymer trade between Middle Eastern petrochemical refineries and the Indian sub-continent. Their prompt LC processing, BL documentation coordination, and commercial ethics have established them as our premier Indian trade partner.',
    metrics: {
      specAccuracy: '100%',
      onTimeDelivery: '99.5%'
    },
    logoInitials: 'GULF',
    logoColor: 'from-amber-500 to-rose-700'
  }
];

interface CompanyLogo {
  id: string;
  name: string;
  tagline: string;
  category: string;
  location: string;
  partnershipYear: string;
  verifiedVolume: string;
}

const PARTNER_COMPANIES: CompanyLogo[] = [
  {
    id: 'c1',
    name: 'Apex Extrusions Ltd.',
    tagline: 'PE100 & HDPE Pressure Pipes',
    category: 'Extrusion',
    location: 'Sanand, Gujarat',
    partnershipYear: 'Since 2013',
    verifiedVolume: '80 MT / mo'
  },
  {
    id: 'c2',
    name: 'Shreeji Blow Plast',
    tagline: '200L Industrial Drums',
    category: 'Blow Molding',
    location: 'Vapi, Gujarat',
    partnershipYear: 'Since 2012',
    verifiedVolume: '100+ MT / mo'
  },
  {
    id: 'c3',
    name: 'Mahavir Auto Tech',
    tagline: 'Battery Casings & Engineering PPCP',
    category: 'Injection',
    location: 'Pune, Maharashtra',
    partnershipYear: 'Since 2015',
    verifiedVolume: '50 MT / mo'
  },
  {
    id: 'c4',
    name: 'Vardhman Packaging',
    tagline: 'Multi-layer Blown Film & LLDPE',
    category: 'Film Packaging',
    location: 'Daman, U.T.',
    partnershipYear: 'Since 2016',
    verifiedVolume: '85 MT / mo'
  },
  {
    id: 'c5',
    name: 'Gujarat Compounders',
    tagline: 'Engineering Masterbatch & Additives',
    category: 'Compounding',
    location: 'Surendranagar, Gujarat',
    partnershipYear: 'Since 2014',
    verifiedVolume: '50 MT / mo'
  },
  {
    id: 'c6',
    name: 'Gulf Polymers FZE',
    tagline: 'Middle East Petrochemical Indenting',
    category: 'Import-Export',
    location: 'Sharjah, UAE',
    partnershipYear: 'Since 2017',
    verifiedVolume: '200 MT cargo'
  },
  {
    id: 'c7',
    name: 'Nilkanth Rotomolders',
    tagline: 'Chemical Storage & Water Tanks',
    category: 'Rotomolding',
    location: 'Rajkot, Gujarat',
    partnershipYear: 'Since 2018',
    verifiedVolume: '40 MT / mo'
  },
  {
    id: 'c8',
    name: 'Ratan Polychem Hub',
    tagline: 'Reprocessed Granules & Regrinds',
    category: 'Recycling',
    location: 'Bhiwandi, Maharashtra',
    partnershipYear: 'Since 2012',
    verifiedVolume: '70 MT / mo'
  }
];

interface ClientTrustSectionProps {
  onOpenQuote?: (type: 'buy' | 'sell' | 'quote', material?: string) => void;
}

export const ClientTrustSection: React.FC<ClientTrustSectionProps> = ({ onOpenQuote }) => {
  const { sections, companyInfo } = useWordPressCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'blow' | 'injection' | 'extrusion' | 'film' | 'compounding'>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredTestimonials = selectedFilter === 'all'
    ? CLIENT_TESTIMONIALS
    : CLIENT_TESTIMONIALS.filter(t => t.category === selectedFilter);

  // Keep index within bounds when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);

  // Autoplay handler
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 1) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const current = filteredTestimonials[currentIndex] || CLIENT_TESTIMONIALS[0];

  return (
    <section id="trust" className="py-20 bg-slate-900 text-white relative overflow-hidden border-b border-sky-950">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ESTABLISHED AUTHORITY & INDUSTRY CREDIBILITY</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" 
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Client Trust & Industrial Partnerships
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Supplying India's leading blow molders, extrusion units, injection molders, and packaging converters with reliable prime resins, off-grade lots, and certified regrinds since <strong>2012</strong>.
          </p>

          {/* Core Authority Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 text-left">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">12+ Years</div>
              <div className="text-xs text-slate-400 mt-1">Trading Experience (Est. 2012)</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">350+</div>
              <div className="text-xs text-slate-400 mt-1">Active Converter Clients</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">85,000+ MT</div>
              <div className="text-xs text-slate-400 mt-1">Polymers Supplied & Sourced</div>
            </div>
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
              <div className="text-2xl sm:text-3xl font-black text-sky-400">99.4%</div>
              <div className="text-xs text-slate-400 mt-1">Lab Spec Conformance Rate</div>
            </div>
          </div>
        </div>

        {/* LOGO STRIP / CLIENT LOGOS SECTION */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                PROMINENT MANUFACTURING PARTNERS SINCE 2012
              </span>
              <p className="text-[11px] text-slate-500">
                Verified converter supply relationships across Gujarat, Maharashtra, Daman & International Free Zones
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Commercial Trade Reliability</span>
            </div>
          </div>

          {/* Interactive Company Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {PARTNER_COMPANIES.map((company) => (
              <div 
                key={company.id}
                className="group relative bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-sky-600/60 rounded-xl p-3.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left"
                onClick={() => {
                  if (onOpenQuote) {
                    onOpenQuote('buy', company.tagline);
                  }
                }}
                title={`Click to enquire about polymers for ${company.category}`}
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-cyan-300 font-bold text-xs mb-2 group-hover:scale-105 transition-transform">
                    <Factory className="w-4 h-4 text-sky-400" />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {company.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {company.category}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500">
                  <span className="text-amber-400/90 font-medium">{company.partnershipYear}</span>
                  <span className="text-slate-400">{company.verifiedVolume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIAL SLIDER INTERACTIVE CONTAINER */}
        <div 
          className="bg-slate-950/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Top Controls: Filter Category Tabs & Slider Controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                <span>Filter By Sector:</span>
              </span>
              {[
                { id: 'all', label: 'All Industries' },
                { id: 'extrusion', label: 'Pipes & Extrusion' },
                { id: 'blow', label: 'Blow Molding' },
                { id: 'injection', label: 'Injection & Auto' },
                { id: 'film', label: 'Film & Packaging' },
                { id: 'compounding', label: 'Compounding' },
              ].map((filter) => {
                const isActive = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30' 
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Autoplay & Arrows Controls */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
                title={isAutoPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
                aria-label={isAutoPlaying ? 'Pause slide rotation' : 'Start slide rotation'}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-sky-900/60 border border-slate-800 hover:border-sky-700 text-white transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-sky-900/60 border border-slate-800 hover:border-sky-700 text-white transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Slide Card */}
          <div className="pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Spokesperson & Company Metadata */}
              <div className="lg:col-span-5 space-y-5 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                
                {/* Company Badge & Verified Pill */}
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${current.logoColor} flex items-center justify-center font-black text-sm text-white shadow-lg`}>
                    {current.logoInitials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {current.companyName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{current.location}</span>
                    </div>
                  </div>
                </div>

                {/* Sourcing Specs Box */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Client Relationship:</span>
                    </span>
                    <strong className="text-amber-400 font-bold">Since {current.clientSince} ({new Date().getFullYear() - parseInt(current.clientSince)}+ Years)</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <PackageCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Material Sourced:</span>
                    </span>
                    <strong className="text-white text-right max-w-[180px] truncate">{current.materialSupplied}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-sky-400" />
                      <span>Order Volume:</span>
                    </span>
                    <strong className="text-white">{current.monthlyVolume}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Spec Conformance:</span>
                    </span>
                    <strong className="text-emerald-400 font-mono">{current.metrics.specAccuracy}</strong>
                  </div>
                </div>

                {/* Representative details */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs">
                    {current.personName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">{current.personName}</h5>
                    <p className="text-xs text-slate-400">{current.personRole}</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Highlight, Quote & Star Rating */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 5-Star Rating & Trade Verified Stamp */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-amber-400 ml-1.5">5.0 / 5.0 Rating</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Commercial Trade History</span>
                  </span>
                </div>

                {/* Highlight Heading */}
                <div className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-start gap-3">
                  <Quote className="w-8 h-8 text-sky-500/40 flex-shrink-0 -mt-1" />
                  <p>"{current.highlight}"</p>
                </div>

                {/* Full Testimonial Body */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed pl-11">
                  {current.quote}
                </p>

                {/* Quick Action Button */}
                <div className="pt-2 pl-11 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      if (onOpenQuote) {
                        onOpenQuote('buy', current.materialSupplied);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-sky-600/25 flex items-center gap-1.5"
                  >
                    <span>Enquire Same Material ({current.materialSupplied})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={companyInfo.directWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-colors border border-slate-800 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Trade Reference</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* Slider Pagination Dots & Current / Total Counter */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 transition-all rounded-full ${
                    currentIndex === idx 
                      ? 'w-8 bg-sky-500' 
                      : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="text-xs text-slate-500 font-mono">
              <span className="text-white font-bold">{currentIndex + 1}</span> of {filteredTestimonials.length} Case Studies
            </div>
          </div>

        </div>

        {/* BOTTOM CTA: Join the Trust Network */}
        <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-emerald-950/60 rounded-2xl p-6 sm:p-8 border border-sky-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Looking for a Verified Polymer Supply Partner for Your Factory?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Speak directly with our commercial trading team in Surendranagar & Ahmedabad for sample testing, COA verification, and recurring contract terms.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onOpenQuote && onOpenQuote('quote')}
              className="w-full md:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-orange-600/30 whitespace-nowrap text-center"
            >
              Get Supply Proposal →
            </button>
            <a
              href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`}
              className="w-full md:w-auto px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-colors whitespace-nowrap text-center"
            >
              Call {companyInfo.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
