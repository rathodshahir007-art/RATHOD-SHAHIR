import React, { createContext, useContext, useState, useEffect } from 'react';
import originalLogoLight from '../assets/images/newways_original_logo_1791546299449.jpg';
import originalLogoDark from '../assets/images/newways_logo_dark_1791546316552.jpg';

interface BrandContextType {
  customLogoUrl: string | null;
  logoMode: 'official-graphic' | 'vector' | 'custom';
  isLogoModalOpen: boolean;
  originalLogoLight: string;
  originalLogoDark: string;
  openLogoModal: () => void;
  closeLogoModal: () => void;
  setCustomLogo: (url: string | null) => void;
  setLogoMode: (mode: 'official-graphic' | 'vector' | 'custom') => void;
  resetToDefaultLogo: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const STORAGE_KEY_CUSTOM_LOGO = 'newways_custom_logo';
const STORAGE_KEY_LOGO_MODE = 'newways_logo_mode';

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customLogoUrl, setCustomLogoUrlState] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_CUSTOM_LOGO);
    } catch {
      return null;
    }
  });

  const [logoMode, setLogoModeState] = useState<'official-graphic' | 'vector' | 'custom'>(() => {
    try {
      const savedMode = localStorage.getItem(STORAGE_KEY_LOGO_MODE) as 'official-graphic' | 'vector' | 'custom';
      if (savedMode) return savedMode;
      return 'official-graphic';
    } catch {
      return 'official-graphic';
    }
  });

  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);

  const openLogoModal = () => setIsLogoModalOpen(true);
  const closeLogoModal = () => setIsLogoModalOpen(false);

  const setCustomLogo = (url: string | null) => {
    setCustomLogoUrlState(url);
    try {
      if (url) {
        localStorage.setItem(STORAGE_KEY_CUSTOM_LOGO, url);
        setLogoModeState('custom');
        localStorage.setItem(STORAGE_KEY_LOGO_MODE, 'custom');
      } else {
        localStorage.removeItem(STORAGE_KEY_CUSTOM_LOGO);
      }
    } catch (e) {
      console.warn('Failed to save custom logo to localStorage', e);
    }
  };

  const setLogoMode = (mode: 'official-graphic' | 'vector' | 'custom') => {
    setLogoModeState(mode);
    try {
      localStorage.setItem(STORAGE_KEY_LOGO_MODE, mode);
    } catch (e) {
      console.warn('Failed to save logo mode', e);
    }
  };

  const resetToDefaultLogo = () => {
    setCustomLogoUrlState(null);
    setLogoModeState('official-graphic');
    try {
      localStorage.removeItem(STORAGE_KEY_CUSTOM_LOGO);
      localStorage.setItem(STORAGE_KEY_LOGO_MODE, 'official-graphic');
    } catch (e) {
      console.warn('Failed to reset logo', e);
    }
  };

  return (
    <BrandContext.Provider
      value={{
        customLogoUrl,
        logoMode,
        isLogoModalOpen,
        originalLogoLight,
        originalLogoDark,
        openLogoModal,
        closeLogoModal,
        setCustomLogo,
        setLogoMode,
        resetToDefaultLogo
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
};
