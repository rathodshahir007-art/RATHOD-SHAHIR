import React, { useState } from 'react';
import { MarketDesk } from '../components/MarketDesk';
import { MARKET_INSIGHT_ARTICLES, COMPANY_INFO } from '../data/polymerData';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Share2, Check, MessageSquare } from 'lucide-react';

interface MarketUpdatesPageProps {
  onOpenQuote: (type: 'buy' | 'sell' | 'quote', material?: string) => void;
}

export const MarketUpdatesPage: React.FC<MarketUpdatesPageProps> = ({ onOpenQuote }) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedArticle = selectedArticleId 
    ? MARKET_INSIGHT_ARTICLES.find(a => a.id === selectedArticleId) 
    : null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-0 bg-white">
      {/* Hero Header */}
      <section className="relative bg-[#07162c] text-white py-16 md:py-20 overflow-hidden border-b border-sky-950">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950 border border-sky-700/60 text-cyan-400 text-xs font-semibold">
              <span>Home / Market Updates & Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Polymer Market Desk
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Price Indications, Available Stock Feeds, Active Buying Requirements, and Industry Analysis to guide procurement teams.
            </p>
          </div>
        </div>
      </section>

      {/* If an article is clicked, show reader view */}
      {selectedArticle ? (
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-900 mb-6 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Market Desk</span>
            </button>

            <article className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-md space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-800 font-bold uppercase tracking-wider text-[10px]">
                  {selectedArticle.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {selectedArticle.readTime}
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-slate-600 hover:text-sky-600"
                    title="Copy Article Link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Share'}</span>
                  </button>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1e36] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {selectedArticle.title}
              </h2>

              <p className="text-sm md:text-base font-medium text-slate-700 italic border-l-4 border-sky-600 pl-4 py-1 bg-slate-50 rounded-r-xl">
                {selectedArticle.summary}
              </p>

              <div className="space-y-4 text-slate-700 text-sm leading-relaxed pt-2">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Tags:</span>
                {selectedArticle.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    #{t}
                  </span>
                ))}
              </div>

              {/* CTA Box */}
              <div className="p-6 rounded-2xl bg-[#0b1e36] text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="font-bold text-base text-white">Have Questions About This Market Report?</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Contact our polymer desk for lot quotations and delivery schedules.</p>
                </div>
                <button
                  onClick={() => onOpenQuote('quote', selectedArticle.title)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl whitespace-nowrap transition-colors"
                >
                  Consult Trading Desk
                </button>
              </div>
            </article>
          </div>
        </section>
      ) : (
        /* Full Polymer Market Desk Component */
        <MarketDesk
          onOpenQuote={onOpenQuote}
          onReadArticle={(id) => {
            setSelectedArticleId(id);
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};
