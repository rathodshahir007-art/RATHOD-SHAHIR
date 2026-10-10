import React from 'react';
import { X, CheckCircle2, Package, Globe, Shield, Scale, ArrowRight, PhoneCall } from 'lucide-react';
import { PolymerProduct } from '../types';
import { COMPANY_INFO } from '../data/polymerData';

interface ProductDetailModalProps {
  product: PolymerProduct | null;
  onClose: () => void;
  onRequestQuote: (code: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#0b1e36] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-sky-500/20 text-cyan-300 border border-sky-400/30 rounded-lg text-xs font-black">
              {product.code}
            </span>
            <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
              {product.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {product.name}
          </h3>
          <p className="text-slate-300 text-xs mt-1">
            {product.fullName}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-sm">
          {/* Product Image if Available */}
          {product.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 border border-slate-200 shadow-md">
              <img
                src={product.imageUrl}
                alt={product.fullName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              {product.brandHighlight && (
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-amber-300 border border-amber-400/40 shadow-sm">
                    {product.brandHighlight}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Material Overview
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase block">Melt Flow Index</span>
              <span className="font-mono font-bold text-slate-900 text-sm">{product.mfiRange}</span>
            </div>
            {product.density && (
              <div>
                <span className="text-[11px] text-slate-400 font-bold uppercase block">Density</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{product.density}</span>
              </div>
            )}
            <div>
              <span className="text-[11px] text-slate-400 font-bold uppercase block">Packaging</span>
              <span className="font-bold text-slate-900 text-xs">{product.packaging}</span>
            </div>
          </div>

          {/* Applications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Primary Industrial Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {product.keyApplications.map((app, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/60 border border-sky-100 text-xs text-sky-950 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Grades & Origins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Popular Grade References
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.commonGrades.map((g, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-medium">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Sourcing Origins
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {product.originOptions.map((o, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-medium">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Conditions Available */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Traded Conditions
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.conditionsAvailable.map((cond) => (
                <span key={cond} className="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold">
                  {cond}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <a
            href={`https://wa.me/919879747777?text=Hello%2C%20I%20am%20inquiring%20about%20${product.code}%20(${product.name})%20specifications%20and%20rates.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Direct WhatsApp Desk</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestQuote(product.code);
              }}
              className="px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors"
            >
              Request Quote for {product.code}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
