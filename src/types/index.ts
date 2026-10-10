export type PageId = 
  | 'home' 
  | 'about' 
  | 'products' 
  | 'sourcing' 
  | 'network' 
  | 'market-updates' 
  | 'contact';

export type MaterialCondition = 'Prime' | 'Near Prime' | 'Off-Grade' | 'Recycled' | 'Regrind';

export interface PolymerProduct {
  id: string;
  name: string;
  code: string;
  fullName: string;
  category: 'Polyolefins' | 'Engineering' | 'Vinyls' | 'Polyesters' | 'Recycled';
  description: string;
  keyApplications: string[];
  commonGrades: string[];
  mfiRange: string;
  density?: string;
  conditionsAvailable: MaterialCondition[];
  popularForms: string[];
  packaging: string;
  originOptions: string[];
  imagePlaceholderColor: string;
  imageUrl?: string;
  brandHighlight?: string;
  badge?: string;
}

export interface MarketPriceIndication {
  id: string;
  material: string;
  gradeType: string;
  priceUsd: string;
  priceInr: string;
  changePercent: string;
  isPositive: boolean;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  basis: string;
}

export interface AvailableStockItem {
  id: string;
  material: string;
  grade: string;
  condition: MaterialCondition;
  quantityMt: number;
  location: string;
  packing: string;
  notes?: string;
  status: 'Available' | 'Reserved';
}

export interface BuyingRequirementItem {
  id: string;
  material: string;
  gradeSpec: string;
  mfiTarget?: string;
  targetLocation: string;
  quantityMt: string;
  targetPrice?: string;
  timeline: string;
}

export interface SellingOfferItem {
  id: string;
  material: string;
  grade: string;
  condition: MaterialCondition;
  quantityMt: number;
  location: string;
  lotType: string;
}

export interface ImportOpportunity {
  id: string;
  country: string;
  flag: string;
  port: string;
  materials: string[];
  leadTime: string;
  keyAdvantage: string;
}

export interface MarketInsightArticle {
  id: string;
  title: string;
  category: 'Market Updates' | 'Plastic & Polymers' | 'Recycling' | 'Trade & Logistics' | 'Business Tips';
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  tags: string[];
}
