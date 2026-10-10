import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Leaf, 
  ArrowUpRight, 
  Linkedin, 
  Instagram, 
  Facebook, 
  Youtube,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO, POLYMER_PRODUCTS } from '../data/polymerData';
import { PageId } from '../types';
import { useBrand } from '../context/BrandContext';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenDeployGuide: () => void;
  onOpenQuote: (type: 'buy' | 'sell' | 'quote') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenDeployGuide,
  onOpenQuote,
}) => {
  const { openLogoModal } = useBrand();

  return (
    <footer className="bg-[#07162c] text-white border-t border-sky-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-sky-900/40">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <Logo variant="white" showTagline={true} allowQuickUpload={true} />
            </div>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-sm mt-3">
              NEWWAYS ENTERPRISE is a premier Indian polymer trading, sourcing, and recycled plastic materials network operating since 2012. We connect buyers, sellers, converters, and global petrochemical suppliers.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={openLogoModal}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Upload / Change Original Logo</span>
                <span className="text-[10px] bg-sky-900/80 px-1.5 py-0.5 rounded text-sky-200">Asset</span>
              </button>
            </div>

            <div className="pt-2 text-xs text-sky-300/90 font-medium">
              Prime • Off-Grade • Near Prime • Recycled • Regrind
            </div>

            {/* Sustainability Badge as seen in design */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-950/70 border border-sky-800/60 max-w-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">Sustainable Polymers.</span>
                <span className="text-slate-400 text-[11px]">Supporting circular plastic recovery.</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Polymers Catalog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('sourcing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Sourcing & Trading
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: More & Network */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Network & Market
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button 
                  onClick={() => { onNavigate('network'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Polymer Network
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('market-updates'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Market Updates & Prices
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <a 
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <span>WhatsApp Group</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white font-semibold">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href={COMPANY_INFO.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {COMPANY_INFO.domain}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address.fullAddress}</span>
              </div>
            </div>

            {/* Quick buttons */}
            <div className="pt-3 flex flex-wrap gap-2">
              <button
                onClick={() => onOpenQuote('buy')}
                className="px-3 py-1.5 rounded-lg bg-sky-900/80 hover:bg-sky-800 text-sky-200 text-xs font-semibold border border-sky-700/60 transition-colors"
              >
                Submit Requirement
              </button>
              <button
                onClick={() => onOpenQuote('sell')}
                className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors"
              >
                Offer Stock
              </button>
              <button
                onClick={onOpenDeployGuide}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>Publishing Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} NEWWAYS ENTERPRISE. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500">
              India • Middle East • Europe • Japan
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="hover:text-white transition-colors cursor-pointer" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" title="Instagram">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" title="Facebook">
                <Facebook className="w-4 h-4" />
              </span>
              <span className="hover:text-white transition-colors cursor-pointer" title="YouTube">
                <Youtube className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
