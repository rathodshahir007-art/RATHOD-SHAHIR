import React, { useState } from 'react';
import { X, Globe, ShieldCheck, CheckCircle2, Server, ArrowUpRight, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';

interface DomainDeploymentGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainDeploymentGuide: React.FC<DomainDeploymentGuideProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#0b1e36] text-white p-6 md:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>PRODUCTION DEPLOYMENT & SEO PRESERVATION GUIDE</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Publishing to www.newways.in Without SEO Loss
          </h3>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Complete technical instructions for deploying this redesign to your live domain while protecting established search rankings and domain authority.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-950">
              <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs">1</span>
              <h4>Production Build Generation</h4>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Run the production build command in your terminal. This bundles all assets into high-performance static files in the <code>/dist</code> directory.
            </p>
            <div className="flex items-center justify-between bg-slate-900 text-sky-300 px-4 py-2.5 rounded-xl font-mono text-xs">
              <code>npm run build</code>
              <button 
                onClick={() => copyText('npm run build', 'build')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedKey === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'build' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs">2</span>
              <h4>DNS Settings for www.newways.in</h4>
            </div>
            <p className="text-slate-600 text-xs">
              Point your domain registrar (GoDaddy, Hostinger, BigRock, or Cloudflare) to your hosting provider (Vercel, Cloud Run, cPanel, or Netlify):
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-amber-200 rounded-lg overflow-hidden">
                <thead className="bg-amber-100 text-amber-900 font-bold">
                  <tr>
                    <th className="p-2">Type</th>
                    <th className="p-2">Name / Host</th>
                    <th className="p-2">Value / Points To</th>
                    <th className="p-2">TTL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200 font-mono">
                  <tr className="bg-white">
                    <td className="p-2 font-bold">A</td>
                    <td className="p-2">@ (root)</td>
                    <td className="p-2">Your Host IP (or 76.76.21.21 for Vercel)</td>
                    <td className="p-2">3600 (1 hr)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2 font-bold">CNAME</td>
                    <td className="p-2">www</td>
                    <td className="p-2">cname.yourhost.com (or cname.vercel-dns.com)</td>
                    <td className="p-2">3600 (1 hr)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">3</span>
              <h4>Preserving SEO Rankings with 301 Permanent Redirects</h4>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              If your previous website had legacy URLs (such as <code>/products.php</code> or <code>/contact-us.html</code>), configure 301 redirects in your server configuration (e.g., <code>_redirects</code> or <code>.htaccess</code>) so Google transfers 100% of the accumulated page rank to the new URLs:
            </p>
            <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs space-y-1">
              <div>301 /products.php -&gt; /#products</div>
              <div>301 /about-us.html -&gt; /#about</div>
              <div>301 /contact.html -&gt; /#contact</div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs">4</span>
              <h4>Google Search Console Verification & XML Sitemap</h4>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              We have already included <strong>sitemap.xml</strong> and <strong>robots.txt</strong> pointing to <code>https://www.newways.in</code>. Once DNS propagation is complete (usually 15–30 minutes), submit your sitemap:
            </p>
            <div className="flex items-center justify-between bg-slate-900 text-amber-300 px-4 py-2 rounded-xl font-mono text-xs">
              <code>https://www.newways.in/sitemap.xml</code>
              <button 
                onClick={() => copyText('https://www.newways.in/sitemap.xml', 'sitemap')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Official Production Target: <strong>www.newways.in</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
