import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { QuoteModal } from './components/QuoteModal';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DomainDeploymentGuide } from './components/DomainDeploymentGuide';
import { LogoUploadModal } from './components/LogoUploadModal';
import { BrandProvider, useBrand } from './context/BrandContext';
import { WordPressCmsProvider, useWordPressCms } from './context/WordPressCmsContext';
import { WordPressAdminBar } from './components/wp/WordPressAdminBar';
import { WordPressCustomizerDrawer } from './components/wp/WordPressCustomizerDrawer';
import { WordPressMediaLibraryModal } from './components/wp/WordPressMediaLibraryModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { SourcingPage } from './pages/SourcingPage';
import { NetworkPage } from './pages/NetworkPage';
import { MarketUpdatesPage } from './pages/MarketUpdatesPage';
import { ContactPage } from './pages/ContactPage';

import { PageId, PolymerProduct, MaterialCondition } from './types';
import { COMPANY_INFO } from './data/polymerData';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteModalType, setQuoteModalType] = useState<'buy' | 'sell' | 'quote'>('quote');
  const [quoteModalMaterial, setQuoteModalMaterial] = useState<string>('');
  const [quoteModalCondition, setQuoteModalCondition] = useState<MaterialCondition>('Prime');
  
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<PolymerProduct | null>(null);

  const { isLogoModalOpen, closeLogoModal } = useBrand();

  // Sync with URL hash for search engine crawlability and deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'about', 'products', 'sourcing', 'network', 'market-updates', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToPage = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (
    type: 'buy' | 'sell' | 'quote' = 'quote', 
    material: string = '', 
    condition: MaterialCondition = 'Prime'
  ) => {
    setQuoteModalType(type);
    setQuoteModalMaterial(material);
    setQuoteModalCondition(condition);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500/20 selection:text-cyan-900">
      {/* WordPress Top Admin Bar */}
      <WordPressAdminBar />

      {/* Sticky Header Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={navigateToPage}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenQuote={handleOpenQuote}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onSelectPolymer={(prod) => {
          setSelectedProductForDetail(prod);
        }}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateToPage}
            onOpenQuote={handleOpenQuote}
            onSelectPolymer={(prod) => setSelectedProductForDetail(prod)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenQuote={handleOpenQuote}
            onNavigateContact={() => navigateToPage('contact')}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onSelectPolymer={(prod) => setSelectedProductForDetail(prod)}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'sourcing' && (
          <SourcingPage
            onOpenQuote={handleOpenQuote}
            onSelectPolymer={(prod) => setSelectedProductForDetail(prod)}
          />
        )}

        {currentPage === 'network' && (
          <NetworkPage
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'market-updates' && (
          <MarketUpdatesPage
            onOpenQuote={handleOpenQuote}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={navigateToPage}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
        onOpenQuote={handleOpenQuote}
      />

      {/* Floating WhatsApp Action Hub */}
      <FloatingWhatsApp
        onOpenQuote={handleOpenQuote}
      />

      {/* Modals & Dialogs */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultType={quoteModalType}
        defaultMaterial={quoteModalMaterial}
        defaultCondition={quoteModalCondition}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPolymer={(prod) => setSelectedProductForDetail(prod)}
      />

      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onRequestQuote={(code) => handleOpenQuote('buy', code)}
      />

      <DomainDeploymentGuide
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />

      <LogoUploadModal
        isOpen={isLogoModalOpen}
        onClose={closeLogoModal}
      />

      {/* WordPress Live Customizer Drawer & Media Library */}
      <WordPressCustomizerDrawer />
      <WordPressMediaLibraryModal />
    </div>
  );
}

export default function App() {
  return (
    <WordPressCmsProvider>
      <BrandProvider>
        <AppContent />
      </BrandProvider>
    </WordPressCmsProvider>
  );
}
