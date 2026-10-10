import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Users, 
  Sparkles,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_INFO, POLYMER_PRODUCTS } from '../data/polymerData';
import { PageId, PolymerProduct } from '../types';
import { useBrand } from '../context/BrandContext';
import { useWordPressCms } from '../context/WordPressCmsContext';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSearch: () => void;
  onOpenQuote: (type?: 'buy' | 'sell' | 'quote') => void;
  onOpenDeployGuide: () => void;
  onSelectPolymer?: (product: PolymerProduct) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenQuote,
  onOpenDeployGuide,
  onSelectPolymer,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPolymerDropdownOpen, setIsPolymerDropdownOpen] = useState(false);
  const { openLogoModal } = useBrand();
  const { companyInfo, products } = useWordPressCms();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; isDropdown?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Polymers', isDropdown: true },
    { id: 'sourcing', label: 'Sourcing & Trading' },
    { id: 'network', label: 'Network' },
    { id: 'market-updates', label: 'Market Updates' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsPolymerDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#07162c] text-slate-300 text-[11px] py-1.5 px-4 border-b border-sky-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-cyan-400" />
              <span>{companyInfo.phoneDisplay}</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a 
              href={`mailto:${companyInfo.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-cyan-400" />
              <span>{companyInfo.email}</span>
            </a>
            <span className="text-slate-600 hidden md:inline">•</span>
            <div className="hidden md:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>{companyInfo.address.fullAddress}</span>
            </div>
          </div>

          {/* Right: Quick actions & Domain Deployment guide trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={openLogoModal}
              className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1 text-[11px]"
              title="View, upload or customize original logo"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Original Logo</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <button
              onClick={onOpenDeployGuide}
              className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px]"
              title="Instructions for publishing to www.newways.in"
            >
              <HelpCircle className="w-3 h-3" />
              <span className="hidden sm:inline">Deployment Guide</span>
            </button>
            <span className="text-slate-600">•</span>
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WhatsApp Group Invite</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full bg-white transition-all duration-200 border-b ${
        isScrolled ? 'shadow-md border-slate-200 py-2.5' : 'border-slate-100 py-3.5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div 
              onClick={() => handleNavClick('home')} 
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavClick('home');
                }
              }}
              role="button"
              tabIndex={0}
              className="text-left focus:outline-none cursor-pointer flex items-center"
              aria-label="Newways Enterprise Home"
            >
              <Logo variant="light" allowQuickUpload={false} />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;

              if (link.isDropdown) {
                return (
                  <div 
                    key={link.id} 
                    className="relative"
                    onMouseEnter={() => setIsPolymerDropdownOpen(true)}
                    onMouseLeave={() => setIsPolymerDropdownOpen(false)}
                  >
                    <button
                      onClick={() => handleNavClick(link.id)}
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                        isActive
                          ? 'text-sky-700 bg-sky-50'
                          : 'text-slate-700 hover:text-[#0b1e36] hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>

                    {/* Polymers Dropdown Menu */}
                    {isPolymerDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 px-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Core Polymers Traded
                          </span>
                          <span className="text-[10px] text-sky-600 font-semibold cursor-pointer" onClick={() => handleNavClick('products')}>
                            View All Catalog
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {products.map((prod) => (
                            <button
                              key={prod.id}
                              onClick={() => {
                                setIsPolymerDropdownOpen(false);
                                if (onSelectPolymer) {
                                  onSelectPolymer(prod);
                                } else {
                                  handleNavClick('products');
                                }
                              }}
                              className="text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group flex items-center justify-between"
                            >
                              <div>
                                <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600">
                                  {prod.code}
                                </div>
                                <div className="text-[10px] text-slate-500 truncate max-w-[100px]">
                                  {prod.name}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 px-3">
                          <button
                            onClick={() => {
                              setIsPolymerDropdownOpen(false);
                              onOpenQuote('buy');
                            }}
                            className="w-full text-center text-xs font-bold text-orange-600 hover:text-orange-700 py-1"
                          >
                            + Enquire Custom Grade / Regrind
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors ${
                    isActive
                      ? 'text-sky-700 bg-sky-50'
                      : 'text-slate-700 hover:text-[#0b1e36] hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search polymers and stock"
              className="p-2 text-slate-600 hover:text-[#0b1e36] hover:bg-slate-100 rounded-xl transition-colors"
              title="Search polymers"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Join Polymer Network Button */}
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0b1e36] hover:bg-sky-900 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm border border-sky-800"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>JOIN POLYMER NETWORK</span>
            </a>

            {/* Direct WhatsApp button */}
            <a
              href={COMPANY_INFO.directWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Request a Quote CTA */}
            <button
              onClick={() => onOpenQuote('quote')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors ${
                    currentPage === link.id
                      ? 'bg-sky-50 text-sky-800'
                      : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                <Users className="w-4 h-4" />
                <span>Join WhatsApp Polymer Network</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenQuote('quote');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
