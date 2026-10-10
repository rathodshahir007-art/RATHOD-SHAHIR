import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { CurrentRequirements } from '../components/CurrentRequirements';
import { MaterialRangeCards } from '../components/MaterialRangeCards';
import { PolymerCatalog } from '../components/PolymerCatalog';
import { BuySellSection } from '../components/BuySellSection';
import { SourcingProcess } from '../components/SourcingProcess';
import { TradeMap } from '../components/TradeMap';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { MarketDesk } from '../components/MarketDesk';
import { PolymerProduct, MaterialCondition, PageId } from '../types';
import { COMPANY_INFO } from '../data/polymerData';
import { Users, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';
import { useWordPressCms } from '../context/WordPressCmsContext';
import { WordPressSectionWrapper } from '../components/wp/WordPressSectionWrapper';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string, condition?: MaterialCondition) => void;
  onSelectPolymer: (product: PolymerProduct) => void;
  onFilterCondition?: (condition: MaterialCondition) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuote,
  onSelectPolymer,
}) => {
  const { sections, updateSection, companyInfo, openMediaLibrary } = useWordPressCms();
  const [activeCatalogCondition, setActiveCatalogCondition] = useState<MaterialCondition | 'All'>('All');

  const handleConditionSelect = (condition: MaterialCondition) => {
    setActiveCatalogCondition(condition);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToBuy = () => {
    const el = document.getElementById('buy');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToSell = () => {
    const el = document.getElementById('sell');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <WordPressSectionWrapper
        id="hero"
        name="Hero Banner & Sourcing Intro"
        category="Header & Hero"
        onQuickImageChange={() => openMediaLibrary((url) => updateSection('hero', { heroImage: url }))}
      >
        <Hero
          onExploreProducts={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onRequestQuote={() => onOpenQuote('quote')}
          onBuyPolymers={handleScrollToBuy}
          onSellStock={handleScrollToSell}
          onJoinNetwork={() => window.open(companyInfo.whatsappUrl, '_blank')}
          onFilterCondition={handleConditionSelect}
        />
      </WordPressSectionWrapper>

      {/* 2. CURRENT REQUIREMENTS (Dynamic Section: 5601 / 5603, PE100 Regrind, HDPE Milk Bottle, HDPE 200L Regrind) */}
      <WordPressSectionWrapper
        id="requirements"
        name="Current Polymer Requirements (Live & Dynamic)"
        category="Trade Desk"
      >
        <CurrentRequirements
          onOpenRequirementModal={(material) => onOpenQuote('buy', material || 'Polymer 5601 / 5603')}
          onHaveStockOffer={(material) => onOpenQuote('sell', material)}
        />
      </WordPressSectionWrapper>

      {/* 3. Material Range Cards: Prime, Non-Prime / Off-Grade, and Recycled */}
      <WordPressSectionWrapper
        id="materialRange"
        name="Material Range (Prime / Off-Grade / Recycled)"
        category="Catalog"
      >
        <MaterialRangeCards
          onSelectCondition={handleConditionSelect}
          onViewAll={() => {
            setActiveCatalogCondition('All');
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </WordPressSectionWrapper>

      {/* 3. Polymer Products Catalog Showcase (10 Photo Grades) */}
      <WordPressSectionWrapper
        id="products"
        name="Core Polymer Products Catalog (10 Photo Grades)"
        category="Products"
      >
        <PolymerCatalog
          initialCondition={activeCatalogCondition}
          onSelectProduct={onSelectPolymer}
          onRequestQuote={(code) => onOpenQuote('buy', code)}
        />
      </WordPressSectionWrapper>

      {/* 4. Dual Buy & Sell Section */}
      <WordPressSectionWrapper
        id="buySell"
        name="Direct Buy & Sell Desk"
        category="Trade Desk"
      >
        <BuySellSection />
      </WordPressSectionWrapper>

      {/* 5. How Newways Works: Sourcing & Circular Recycling Process */}
      <WordPressSectionWrapper
        id="sourcing"
        name="How Newways Works: Sourcing & Recycling"
        category="Process"
      >
        <SourcingProcess onOpenQuote={onOpenQuote} />
      </WordPressSectionWrapper>

      {/* 6. Interactive Global Polymer Trade Network Map */}
      <WordPressSectionWrapper
        id="tradeMap"
        name="Global Trade Corridors & Port Depots"
        category="Network Map"
      >
        <section className="py-16 md:py-24 bg-[#051124] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <TradeMap onEnquireLocation={(loc) => onOpenQuote('quote', `Trade Corridor: ${loc}`)} />
          </div>
        </section>
      </WordPressSectionWrapper>

      {/* 7. Why Choose Newways Enterprise */}
      <WordPressSectionWrapper
        id="whyChoose"
        name="Why Choose Newways Enterprise"
        category="Trust & Credibility"
      >
        <WhyChooseUs />
      </WordPressSectionWrapper>

      {/* 8. Panoramic Import-Export Container Ship Banner */}
      <WordPressSectionWrapper
        id="shippingBanner"
        name="Container Shipping Panoramic Banner"
        category="Call To Action"
        onQuickImageChange={() => openMediaLibrary((url) => updateSection('shippingBanner', { bannerImage: url }))}
      >
        <section className="relative overflow-hidden bg-slate-950 text-white py-14 px-4 sm:px-6 border-y border-sky-900/60">
          <div className="absolute inset-0 opacity-25">
            <img
              src={sections.shippingBanner.bannerImage || "/src/assets/images/container_ship_ocean_1791543563929.jpg"}
              alt="International Ocean Container Cargo Ship - Polymer Import Export"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#07162c] via-[#07162c]/85 to-transparent pointer-events-none"></div>

          <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 z-10">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                {sections.shippingBanner.badge}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {sections.shippingBanner.title}
              </h3>
              <p className="text-slate-300 text-xs md:text-sm">
                {sections.shippingBanner.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
              <button
                onClick={() => onOpenQuote('quote')}
                className="w-full sm:w-auto px-6 py-3.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                {sections.shippingBanner.ctaQuoteText || 'Request a Quote →'}
              </button>
              <a
                href={companyInfo.directWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{sections.shippingBanner.ctaWhatsappText || 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>
        </section>
      </WordPressSectionWrapper>

      {/* 9. Polymer Market Desk & Price Indications */}
      <WordPressSectionWrapper
        id="marketDesk"
        name="Market Desk & Weekly Price Indications"
        category="Market Data"
      >
        <MarketDesk 
          onOpenQuote={onOpenQuote} 
          onReadArticle={() => onNavigate('market-updates')}
        />
      </WordPressSectionWrapper>

      {/* 10. WhatsApp Community Network Section */}
      <WordPressSectionWrapper
        id="community"
        name="WhatsApp Community Network Hub"
        category="Community"
      >
        <section className="py-16 md:py-20 bg-gradient-to-r from-emerald-950 via-[#07162c] to-[#0b1e36] text-white border-t border-sky-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl p-8 md:p-12 border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-600 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5" />
                  <span>{sections.community.badge}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {sections.community.title}
                </h2>
                <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
                  {sections.community.subtitle}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-emerald-200">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Daily Port & Domestic Stock Releases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Direct Processor Buying Inquiries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Prime, Near-Prime & Surplus Lots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Verified Recycled Regrind Offers</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>{sections.community.ctaText || 'JOIN OUR WHATSAPP NETWORK'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${companyInfo.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 text-center transition-colors"
                >
                  Direct Call: {companyInfo.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </section>
      </WordPressSectionWrapper>
    </div>
  );
};
