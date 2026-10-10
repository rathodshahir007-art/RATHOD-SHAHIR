import React, { createContext, useContext, useState, useEffect } from 'react';
import { COMPANY_INFO, POLYMER_PRODUCTS, MARKET_PRICE_INDICATIONS } from '../data/polymerData';
import { PolymerProduct } from '../types';

export interface SectionContent {
  [key: string]: any;
}

export interface SiteSectionsData {
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    statsYears: string;
    statsYearsLabel: string;
    statsVolume: string;
    statsVolumeLabel: string;
    statsPorts: string;
    statsPortsLabel: string;
    heroImage: string;
  };
  materialRange: {
    badge: string;
    title: string;
    subtitle: string;
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
  };
  buySell: {
    badge: string;
    title: string;
    subtitle: string;
  };
  sourcing: {
    badge: string;
    title: string;
    subtitle: string;
  };
  tradeMap: {
    badge: string;
    title: string;
    subtitle: string;
  };
  shippingBanner: {
    badge: string;
    title: string;
    subtitle: string;
    bannerImage: string;
    ctaQuoteText: string;
    ctaWhatsappText: string;
  };
  whyChoose: {
    badge: string;
    title: string;
    subtitle: string;
  };
  clientTrust: {
    badge: string;
    title: string;
    subtitle: string;
  };
  marketDesk: {
    badge: string;
    title: string;
    subtitle: string;
  };
  community: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
  };
  footer: {
    aboutText: string;
    copyright: string;
  };
}

export interface WordPressCmsState {
  companyInfo: typeof COMPANY_INFO;
  sections: SiteSectionsData;
  products: PolymerProduct[];
  sectionOrder: string[];
  hiddenSections: string[];
}

const DEFAULT_SECTIONS: SiteSectionsData = {
  hero: {
    badge: 'GLOBAL POLYMER SOURCING & RECYCLED PLASTICS',
    headline: 'Global Polymer Sourcing, Trading & Circular Recycling',
    subheadline: 'Connecting Indian plastics converters and manufacturers with prime import petrochemicals, near-prime lots, off-grade resins, and verified post-consumer recycled flakes.',
    ctaPrimaryText: 'Explore Polymer Grades',
    ctaSecondaryText: 'Request Commercial Quote',
    statsYears: '12+',
    statsYearsLabel: 'Years Sourcing Experience',
    statsVolume: '1,200+',
    statsVolumeLabel: 'Metric Tons / Month Traded',
    statsPorts: '18+',
    statsPortsLabel: 'Indian & Global Port Corridors',
    heroImage: '/src/assets/images/globe_multimodal_logistics_1791547472300.jpg',
  },
  materialRange: {
    badge: 'TRADING SPECTRUM',
    title: 'Explore Our Complete Polymer Spectrum',
    subtitle: 'From refinery prime virgin granules to certified circular recycled flakes, we source the exact polymer specifications your production line requires.',
  },
  products: {
    badge: 'CORE POLYMER CATALOG',
    title: 'Petrochemical & Engineering Plastics Catalog',
    subtitle: 'Comprehensive portfolio of Polypropylene, Polyethylene, Polyesters, Vinyls, and Engineering resins available in prime, off-grade, and recycled conditions.',
  },
  buySell: {
    badge: 'DIRECT TRADE DESK',
    title: 'Active Polymer Buying & Selling Opportunities',
    subtitle: 'Tell us what you need. Tell us what you have. Newways connects verified converters, importers, and recyclers across India.',
  },
  sourcing: {
    badge: 'TRADE ARCHITECTURE',
    title: 'End-to-End Sourcing & Circular Logistics',
    subtitle: 'How Newways connects global petrochemical suppliers with domestic manufacturing hubs.',
  },
  tradeMap: {
    badge: 'GLOBAL REACH',
    title: 'Global Trade Corridors & Indian Domestic Depots',
    subtitle: 'Continuous maritime shipping connections with major Middle East, Far East, and European ports, cleared through Nhava Sheva & Mundra.',
  },
  shippingBanner: {
    badge: 'NEED A RELIABLE GLOBAL POLYMER SUPPLIER?',
    title: 'Get a Fast Commercial Quote Today',
    subtitle: 'Tell us your material grade, quantity, and destination port. Our sourcing executives in Gujarat coordinate smooth containerized import shipments and domestic warehouse deliveries.',
    bannerImage: '/src/assets/images/container_ship_ocean_1791543563929.jpg',
    ctaQuoteText: 'Request a Quote →',
    ctaWhatsappText: 'Chat on WhatsApp',
  },
  whyChoose: {
    badge: 'WHY NEWWAYS',
    title: 'The Trusted Partner for Polymer Converters',
    subtitle: 'Built on 12+ years of refinery relationships, rigorous quality checking, and transparent port-to-factory logistics.',
  },
  clientTrust: {
    badge: 'ESTABLISHED AUTHORITY & CLIENT TRUST',
    title: 'Client Trust & Industrial Partnerships',
    subtitle: 'Supplying India\'s leading blow molders, extrusion units, injection molders, and packaging converters with reliable prime resins, off-grade lots, and certified regrinds since 2012.',
  },
  marketDesk: {
    badge: 'LIVE MARKET DESK',
    title: 'Weekly Polymer Price Indications & Market Intelligence',
    subtitle: 'Real-time price trends across import CFR India benchmarks and local Indian warehouse ex-depot rates.',
  },
  community: {
    badge: 'EXCLUSIVE INDUSTRY COMMUNITY',
    title: 'Join the Newways Polymer Network',
    subtitle: 'Get real-time spot offers, container lot alerts, scrap availability, and CFR price fluctuations directly on your phone.',
    ctaText: 'Join WhatsApp Polymer Network',
  },
  footer: {
    aboutText: 'NEWWAYS ENTERPRISE is a premier Indian polymer trading, sourcing, and recycled plastic materials network operating since 2012. We connect buyers, sellers, converters, and global petrochemical suppliers.',
    copyright: '© 2012 – 2026 Newways Enterprise. All rights reserved. Surendranagar, Gujarat, India.',
  },
};

const DEFAULT_ORDER = [
  'hero',
  'materialRange',
  'products',
  'buySell',
  'sourcing',
  'tradeMap',
  'whyChoose',
  'clientTrust',
  'shippingBanner',
  'marketDesk',
  'community'
];

interface WordPressCmsContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (val: boolean) => void;
  activeEditingSection: string | null;
  openSectionEditor: (sectionKey: string) => void;
  closeSectionEditor: () => void;
  isCustomizerOpen: boolean;
  openCustomizer: (initialTab?: string) => void;
  closeCustomizer: () => void;
  customizerTab: string;
  setCustomizerTab: (tab: string) => void;
  companyInfo: typeof COMPANY_INFO;
  updateCompanyInfo: (patch: Partial<typeof COMPANY_INFO>) => void;
  sections: SiteSectionsData;
  updateSection: <K extends keyof SiteSectionsData>(sectionKey: K, patch: Partial<SiteSectionsData[K]>) => void;
  products: PolymerProduct[];
  updateProduct: (productId: string, patch: Partial<PolymerProduct>) => void;
  addProduct: (product: PolymerProduct) => void;
  deleteProduct: (productId: string) => void;
  hiddenSections: string[];
  toggleSectionVisibility: (sectionKey: string) => void;
  isSectionHidden: (sectionKey: string) => boolean;
  sectionOrder: string[];
  moveSection: (sectionKey: string, direction: 'up' | 'down') => void;
  resetToDefaults: () => void;
  saveStatus: 'saved' | 'saving';
  isMediaLibraryOpen: boolean;
  openMediaLibrary: (onSelect: (url: string) => void) => void;
  closeMediaLibrary: () => void;
  handleMediaSelected: (url: string) => void;
  exportWpContent: (format?: 'json' | 'gutenberg_blocks') => string;
  importWpContent: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'newways_wp_cms_data_v1';

const WordPressCmsContext = createContext<WordPressCmsContextType | null>(null);

export const WordPressCmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [activeEditingSection, setActiveEditingSection] = useState<string | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [customizerTab, setCustomizerTab] = useState<string>('active');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Media Library Modal
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState<boolean>(false);
  const [mediaSelectCallback, setMediaSelectCallback] = useState<((url: string) => void) | null>(null);

  // Core CMS state
  const [companyInfo, setCompanyInfo] = useState<typeof COMPANY_INFO>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.companyInfo) return { ...COMPANY_INFO, ...parsed.companyInfo };
      }
    } catch (e) {
      console.warn('Failed to load WP CMS company info', e);
    }
    return COMPANY_INFO;
  });

  const [sections, setSections] = useState<SiteSectionsData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sections) {
          return {
            ...DEFAULT_SECTIONS,
            ...parsed.sections,
            hero: { ...DEFAULT_SECTIONS.hero, ...parsed.sections.hero },
            materialRange: { ...DEFAULT_SECTIONS.materialRange, ...parsed.sections.materialRange },
            products: { ...DEFAULT_SECTIONS.products, ...parsed.sections.products },
            buySell: { ...DEFAULT_SECTIONS.buySell, ...parsed.sections.buySell },
            sourcing: { ...DEFAULT_SECTIONS.sourcing, ...parsed.sections.sourcing },
            tradeMap: { ...DEFAULT_SECTIONS.tradeMap, ...parsed.sections.tradeMap },
            shippingBanner: { ...DEFAULT_SECTIONS.shippingBanner, ...parsed.sections.shippingBanner },
            whyChoose: { ...DEFAULT_SECTIONS.whyChoose, ...parsed.sections.whyChoose },
            marketDesk: { ...DEFAULT_SECTIONS.marketDesk, ...parsed.sections.marketDesk },
            community: { ...DEFAULT_SECTIONS.community, ...parsed.sections.community },
            footer: { ...DEFAULT_SECTIONS.footer, ...parsed.sections.footer },
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load WP CMS sections', e);
    }
    return DEFAULT_SECTIONS;
  });

  const [products, setProducts] = useState<PolymerProduct[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.products && Array.isArray(parsed.products) && parsed.products.length > 0) {
          // Merge with current default image URLs if missing
          return parsed.products.map((p: PolymerProduct) => {
            const def = POLYMER_PRODUCTS.find((dp) => dp.id === p.id);
            return {
              ...p,
              imageUrl: p.imageUrl || def?.imageUrl,
              brandHighlight: p.brandHighlight || def?.brandHighlight,
            };
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load WP CMS products', e);
    }
    return POLYMER_PRODUCTS;
  });

  const [hiddenSections, setHiddenSections] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.hiddenSections) return parsed.hiddenSections;
      }
    } catch (e) {}
    return [];
  });

  const [sectionOrder, setSectionOrder] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sectionOrder && Array.isArray(parsed.sectionOrder)) return parsed.sectionOrder;
      }
    } catch (e) {}
    return DEFAULT_ORDER;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      setSaveStatus('saving');
      const payload = {
        companyInfo,
        sections,
        products,
        hiddenSections,
        sectionOrder,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      const timer = setTimeout(() => setSaveStatus('saved'), 350);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Error saving WP CMS data', e);
      setSaveStatus('saved');
    }
  }, [companyInfo, sections, products, hiddenSections, sectionOrder]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const openSectionEditor = (sectionKey: string) => {
    setActiveEditingSection(sectionKey);
    setCustomizerTab('active');
    setIsCustomizerOpen(true);
  };

  const closeSectionEditor = () => {
    setActiveEditingSection(null);
  };

  const openCustomizer = (initialTab: string = 'active') => {
    setCustomizerTab(initialTab);
    setIsCustomizerOpen(true);
  };

  const closeCustomizer = () => {
    setIsCustomizerOpen(false);
  };

  const updateCompanyInfo = (patch: Partial<typeof COMPANY_INFO>) => {
    setCompanyInfo((prev) => ({ ...prev, ...patch }));
  };

  const updateSection = <K extends keyof SiteSectionsData>(sectionKey: K, patch: Partial<SiteSectionsData[K]>) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        ...patch,
      },
    }));
  };

  const updateProduct = (productId: string, patch: Partial<PolymerProduct>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...patch } : p))
    );
  };

  const addProduct = (product: PolymerProduct) => {
    setProducts((prev) => [...prev, product]);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleSectionVisibility = (sectionKey: string) => {
    setHiddenSections((prev) =>
      prev.includes(sectionKey)
        ? prev.filter((k) => k !== sectionKey)
        : [...prev, sectionKey]
    );
  };

  const isSectionHidden = (sectionKey: string) => hiddenSections.includes(sectionKey);

  const moveSection = (sectionKey: string, direction: 'up' | 'down') => {
    setSectionOrder((prev) => {
      const idx = prev.indexOf(sectionKey);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all website sections, texts, and products back to original defaults?')) {
      setCompanyInfo(COMPANY_INFO);
      setSections(DEFAULT_SECTIONS);
      setProducts(POLYMER_PRODUCTS);
      setHiddenSections([]);
      setSectionOrder(DEFAULT_ORDER);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const openMediaLibrary = (onSelect: (url: string) => void) => {
    setMediaSelectCallback(() => onSelect);
    setIsMediaLibraryOpen(true);
  };

  const closeMediaLibrary = () => {
    setIsMediaLibraryOpen(false);
    setMediaSelectCallback(null);
  };

  const handleMediaSelected = (url: string) => {
    if (mediaSelectCallback) {
      mediaSelectCallback(url);
    }
    closeMediaLibrary();
  };

  const exportWpContent = (format: 'json' | 'gutenberg_blocks' = 'json') => {
    if (format === 'json') {
      return JSON.stringify({
        wordpressMeta: {
          siteTitle: companyInfo.name,
          tagline: companyInfo.tagline,
          domain: companyInfo.domain,
          generator: 'WordPress Visual CMS - Newways Enterprise',
          exportedAt: new Date().toISOString(),
        },
        companyInfo,
        sections,
        products,
        sectionOrder,
      }, null, 2);
    }

    // Gutenberg Block Format
    return `<!-- wp:heading {"level":1} -->
<h1>${sections.hero.headline}</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>${sections.hero.subheadline}</p>
<!-- /wp:paragraph -->

<!-- wp:buttons -->
<div class="wp-block-buttons">
  <div class="wp-block-button"><a class="wp-block-button__link" href="#products">${sections.hero.ctaPrimaryText}</a></div>
  <div class="wp-block-button is-style-outline"><a class="wp-block-button__link" href="#quote">${sections.hero.ctaSecondaryText}</a></div>
</div>
<!-- /wp:buttons -->

<!-- wp:columns -->
<div class="wp-block-columns">
  <div class="wp-block-column"><h3>${sections.hero.statsYears}</h3><p>${sections.hero.statsYearsLabel}</p></div>
  <div class="wp-block-column"><h3>${sections.hero.statsVolume}</h3><p>${sections.hero.statsVolumeLabel}</p></div>
  <div class="wp-block-column"><h3>${sections.hero.statsPorts}</h3><p>${sections.hero.statsPortsLabel}</p></div>
</div>
<!-- /wp:columns -->

<!-- wp:heading {"level":2} -->
<h2>${sections.products.title}</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>${sections.products.subtitle}</p>
<!-- /wp:paragraph -->
`;
  };

  const importWpContent = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
      if (parsed.sections) setSections(parsed.sections);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);
      return true;
    } catch (e) {
      console.error('Failed to import JSON', e);
      return false;
    }
  };

  return (
    <WordPressCmsContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        setEditMode: setIsEditMode,
        activeEditingSection,
        openSectionEditor,
        closeSectionEditor,
        isCustomizerOpen,
        openCustomizer,
        closeCustomizer,
        customizerTab,
        setCustomizerTab,
        companyInfo,
        updateCompanyInfo,
        sections,
        updateSection,
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        hiddenSections,
        toggleSectionVisibility,
        isSectionHidden,
        sectionOrder,
        moveSection,
        resetToDefaults,
        saveStatus,
        isMediaLibraryOpen,
        openMediaLibrary,
        closeMediaLibrary,
        handleMediaSelected,
        exportWpContent,
        importWpContent,
      }}
    >
      {children}
    </WordPressCmsContext.Provider>
  );
};

export const useWordPressCms = () => {
  const ctx = useContext(WordPressCmsContext);
  if (!ctx) {
    throw new Error('useWordPressCms must be used within a WordPressCmsProvider');
  }
  return ctx;
};
