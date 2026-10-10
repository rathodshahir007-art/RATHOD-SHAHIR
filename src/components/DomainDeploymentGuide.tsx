import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  Server, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Upload, 
  FileCode, 
  Layers, 
  ExternalLink,
  Lock,
  Terminal,
  FolderArchive,
  Download,
  GitBranch,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { COMPANY_INFO } from '../data/polymerData';

interface DomainDeploymentGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainDeploymentGuide: React.FC<DomainDeploymentGuideProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'hostinger' | 'github' | 'dns' | 'htaccess' | 'wordpress' | 'commands'>('github');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const htaccessCode = `# ==============================================================================
# Hostinger Apache / LiteSpeed Configuration for NEWWAYS POLYMER NETWORK
# Domain: www.newways.co.in
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # 2. Redirect non-www to www.newways.co.in
  RewriteCond %{HTTP_HOST} ^newways\\.co\\.in$ [NC]
  RewriteRule ^(.*)$ https://www.newways.co.in/$1 [L,R=301]

  # 3. React SPA Routing (prevents 404 on page refresh)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Performance & Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-[#07162c] text-white p-6 md:p-8 relative border-b border-sky-900/60 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>HOSTINGER DEPLOYMENT & DOMAIN PUBLISHING GUIDE</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Publishing to www.newways.co.in on Hostinger
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
            Step-by-step instructions to upload and deploy this website to Hostinger hPanel, configure DNS for <strong>www.newways.co.in</strong>, enable Free SSL, and integrate with WordPress & Elementor Pro.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-3 text-xs">
            <span className="px-3 py-1 bg-sky-950/80 border border-sky-700/60 rounded-lg text-cyan-300 font-mono">
              Target Domain: www.newways.co.in
            </span>
            <span className="px-3 py-1 bg-amber-950/80 border border-amber-700/60 rounded-lg text-amber-300 font-mono">
              Platform: Hostinger hPanel
            </span>
            <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-700/60 rounded-lg text-emerald-300">
              Web Server: LiteSpeed / Apache
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 flex overflow-x-auto gap-2 flex-shrink-0 py-2">
          {[
            { id: 'github', label: '1. Hostinger via GitHub (CI/CD)', icon: GitBranch },
            { id: 'hostinger', label: '2. Hostinger File Manager', icon: Upload },
            { id: 'dns', label: '3. DNS for newways.co.in', icon: Globe },
            { id: 'htaccess', label: '4. Hostinger .htaccess & SSL', icon: Lock },
            { id: 'wordpress', label: '5. WordPress & Elementor Pro', icon: Layers },
            { id: 'commands', label: '6. Build & Terminal Commands', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-700 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 flex-1">
          
          {/* TAB 0: HOSTINGER VIA GITHUB DEPLOYMENT */}
          {activeTab === 'github' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-base font-extrabold text-sky-950 flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-sky-600" />
                    <span>How to Deploy to Hostinger using GitHub</span>
                  </h4>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                    Auto-Deploy on Push
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You can deploy this website to Hostinger automatically from GitHub. We have already generated the GitHub Actions workflow file <code>.github/workflows/deploy-hostinger.yml</code> in your repository!
                </p>

                {/* Method 1: GitHub Actions CI/CD */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                  <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-sky-900">
                    <RefreshCw className="w-4 h-4 text-sky-600" />
                    <span>METHOD 1: Automated GitHub Actions (Best & Recommended)</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    Every time you push to <code>main</code>, GitHub compiles the Vite app and automatically uploads <code>dist/</code> to Hostinger.
                  </p>

                  <ol className="space-y-3 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">1</span>
                      <div className="space-y-1">
                        <strong>Push this project to your GitHub repository:</strong>
                        <div className="bg-slate-900 text-sky-300 p-2.5 rounded-lg font-mono text-[11px] flex items-center justify-between">
                          <span>git add . && git commit -m "Deploy to Hostinger" && git push</span>
                          <button onClick={() => copyText('git add . && git commit -m "Deploy to Hostinger" && git push', 'gh-push')} className="text-slate-400 hover:text-white">
                            {copiedKey === 'gh-push' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">2</span>
                      <div className="space-y-1">
                        <strong>Find your Hostinger FTP credentials:</strong>
                        <p className="text-[11px] text-slate-500">
                          In Hostinger hPanel &rarr; <strong>Websites</strong> &rarr; <strong>Manage</strong> &rarr; <strong>Files</strong> &rarr; <strong>FTP Accounts</strong>. Copy your Host/IP (e.g. <code>ftp.newways.co.in</code>), Username (e.g. <code>u123456789</code>), and Password.
                        </p>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">3</span>
                      <div className="space-y-1">
                        <strong>Add GitHub Repository Secrets:</strong>
                        <p className="text-[11px] text-slate-500">
                          Go to your GitHub repo &rarr; <strong>Settings</strong> &rarr; <strong>Secrets and variables</strong> &rarr; <strong>Actions</strong> &rarr; <strong>New repository secret</strong>:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                            <span className="font-bold text-sky-800 block">HOSTINGER_FTP_SERVER</span>
                            <span className="text-slate-500 text-[10px]">ftp.newways.co.in or IP</span>
                          </div>
                          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                            <span className="font-bold text-sky-800 block">HOSTINGER_FTP_USER</span>
                            <span className="text-slate-500 text-[10px]">Your Hostinger FTP user</span>
                          </div>
                          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                            <span className="font-bold text-sky-800 block">HOSTINGER_FTP_PASSWORD</span>
                            <span className="text-slate-500 text-[10px]">Your Hostinger FTP pass</span>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">4</span>
                      <div className="space-y-1">
                        <strong>That's it!</strong>
                        <p className="text-[11px] text-slate-500">
                          The workflow file <code>.github/workflows/deploy-hostinger.yml</code> triggers automatically on every push, compiles your React code, and uploads all production files straight to Hostinger's <code>public_html/</code> folder!
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                {/* Method 2: Hostinger hPanel Native Git */}
                <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                  <h5 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2 text-slate-900">
                    <Server className="w-4 h-4 text-amber-600" />
                    <span>METHOD 2: Hostinger hPanel Built-in Git Tool</span>
                  </h5>
                  <p className="text-xs text-slate-600">
                    Hostinger also includes a direct Git tool in hPanel:
                  </p>
                  <ol className="space-y-2 text-xs text-slate-700 list-decimal pl-4">
                    <li>In Hostinger hPanel, scroll to <strong>Advanced &rarr; Git</strong>.</li>
                    <li>Enter your GitHub repository URL: <code>https://github.com/YOUR_USERNAME/YOUR_REPO.git</code></li>
                    <li>Branch: <strong>main</strong> &bull; Install Directory: <strong>public_html</strong>.</li>
                    <li>Click <strong>Create</strong>. Hostinger will clone your repository.</li>
                    <li>Copy Hostinger's <strong>Auto-Deployment Webhook URL</strong> into your GitHub repo &rarr; <strong>Settings &rarr; Webhooks</strong> to pull updates automatically whenever you push!</li>
                  </ol>
                </div>

              </div>
            </div>
          )}
          
          {/* TAB 1: HOSTINGER FILE MANAGER DEPLOYMENT */}
          {activeTab === 'hostinger' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 space-y-3">
                <h4 className="text-base font-extrabold text-sky-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-sky-600" />
                  <span>The Easiest Method: Upload to Hostinger `public_html` via File Manager</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hostinger provides a high-speed web-based File Manager in hPanel. Follow these 4 easy steps to publish the complete website:
                </p>

                <ol className="space-y-3 pt-2 text-xs">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">1</span>
                    <div>
                      <strong>Generate the Production Bundle:</strong> In your computer terminal, run <code>npm run build</code>. This generates a folder named <code>dist/</code> containing all optimized files, images, and HTML.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">2</span>
                    <div>
                      <strong>Zip the `dist` Folder:</strong> Compress all files inside the <code>dist/</code> folder into a zip file (e.g. <code>dist.zip</code>).
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">3</span>
                    <div>
                      <strong>Log in to Hostinger hPanel:</strong> Go to <strong>Websites</strong> &gt; Click <strong>Manage</strong> next to <code>newways.co.in</code> &gt; Click <strong>File Manager</strong> &gt; Open <code>public_html/</code>.
                    </div>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center flex-shrink-0 text-[11px]">4</span>
                    <div>
                      <strong>Upload and Extract:</strong> Delete any default <code>default.php</code> file, upload <code>dist.zip</code>, right-click and choose <strong>Extract</strong> directly into <code>public_html/</code>. Your site is immediately live at <code>https://www.newways.co.in</code>!
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Important Note about Hostinger File Structure:</strong>
                <p>
                  Ensure <code>index.html</code> is directly inside <code>public_html/index.html</code> (not inside <code>public_html/dist/index.html</code>).
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DNS RECORDS FOR WWW.NEWWAYS.CO.IN */}
          {activeTab === 'dns' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-sky-600" />
                  <span>Configuring DNS Records for www.newways.co.in</span>
                </h4>
                <p className="text-xs text-slate-600">
                  If your domain was purchased on Hostinger, DNS is automatically linked. If registered on GoDaddy, BigRock, or Namecheap, configure your DNS zone records as follows:
                </p>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#0b1e36] text-white">
                      <tr>
                        <th className="p-2.5">Record Type</th>
                        <th className="p-2.5">Name / Host</th>
                        <th className="p-2.5">Points To / Value</th>
                        <th className="p-2.5">TTL</th>
                        <th className="p-2.5">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                      <tr className="bg-white">
                        <td className="p-2.5 font-bold text-sky-700">A</td>
                        <td className="p-2.5">@</td>
                        <td className="p-2.5 font-bold">Your Hostinger Server IP (e.g. 195.35.x.x)</td>
                        <td className="p-2.5">3600</td>
                        <td className="p-2.5 font-sans text-slate-500">Points root newways.co.in to Hostinger</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-2.5 font-bold text-sky-700">CNAME</td>
                        <td className="p-2.5">www</td>
                        <td className="p-2.5 font-bold">newways.co.in</td>
                        <td className="p-2.5">3600</td>
                        <td className="p-2.5 font-sans text-slate-500">Points www.newways.co.in</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-2.5 font-bold text-sky-700">MX</td>
                        <td className="p-2.5">@</td>
                        <td className="p-2.5">mx1.titan.email (or Google Workspace)</td>
                        <td className="p-2.5">3600</td>
                        <td className="p-2.5 font-sans text-slate-500">For info@newways.in emails</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-900 mt-2">
                  <strong>Where to find Hostinger Server IP:</strong> In Hostinger hPanel &gt; Left Sidebar &gt; <strong>Hosting</strong> &gt; <strong>Plan Details</strong> &gt; <strong>Server IP</strong>.
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HOSTINGER .HTACCESS & FREE SSL */}
          {activeTab === 'htaccess' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-sky-600" />
                    <span>Hostinger LiteSpeed/Apache .htaccess Configuration</span>
                  </h4>
                  <button
                    onClick={() => copyText(htaccessCode, 'htaccess')}
                    className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
                  >
                    {copiedKey === 'htaccess' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'htaccess' ? 'Copied .htaccess' : 'Copy .htaccess'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600">
                  This file is already located in your project at <code>public/.htaccess</code>. It automatically gets included in the build and prevents 404 errors when visitors refresh inner links, while forcing HTTPS on <strong>www.newways.co.in</strong>:
                </p>

                <pre className="bg-[#0b1e36] text-sky-300 p-4 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed border border-sky-900">
                  {htaccessCode}
                </pre>

                {/* Free SSL setup */}
                <div className="pt-2 border-t border-slate-200">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1.5">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Enable Free SSL in Hostinger hPanel</span>
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    1. In hPanel, go to <strong>Security</strong> &gt; <strong>SSL</strong>.<br />
                    2. Click <strong>Install SSL</strong> for <code>newways.co.in</code> (Hostinger provides free lifetime Let&apos;s Encrypt SSL certificates).<br />
                    3. Turn on <strong>Force HTTPS</strong> toggle.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORDPRESS & ELEMENTOR PRO INTEGRATION */}
          {activeTab === 'wordpress' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="bg-sky-50 rounded-2xl p-5 border border-sky-100 space-y-4">
                <h4 className="text-base font-extrabold text-sky-950 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-sky-700" />
                  <span>WordPress & Elementor Pro Compatibility & Editing Options</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  You requested WordPress & Elementor Pro base editability for all sections and polymer products. Here are your 3 flexible workflow options:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-xl border border-sky-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wide block">OPTION A (RECOMMENDED)</span>
                    <h5 className="font-bold text-sm text-slate-900">Built-in Elementor Customizer</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Use the top black admin bar right on this website! Click <strong>&quot;Customize Site / Elementor&quot;</strong> to edit headlines, prices, products, and contact info directly in real time.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-sky-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wide block">OPTION B</span>
                    <h5 className="font-bold text-sm text-slate-900">Export to Elementor Pro Templates</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      In the top admin bar, click <strong>&quot;Export WP / Elementor&quot;</strong> to generate Gutenberg or Elementor Pro HTML templates and paste them into Elementor widgets.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-sky-200 shadow-sm space-y-2">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block">OPTION C</span>
                    <h5 className="font-bold text-sm text-slate-900">Headless WordPress on Hostinger</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Install WordPress on a subdomain (e.g. <code>cms.newways.co.in</code>) using Hostinger Auto-Installer, and keep the main domain on this ultra-fast frontend.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COMMANDS */}
          {activeTab === 'commands' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-slate-900 text-sky-300 p-5 rounded-2xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  TERMINAL COMMANDS SUMMARY
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1"># 1. Build Production App:</span>
                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-lg">
                      <code>npm run build</code>
                      <button onClick={() => copyText('npm run build', 'c1')} className="text-slate-400 hover:text-white">
                        {copiedKey === 'c1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1"># 2. Preview Production Build Locally:</span>
                    <div className="flex items-center justify-between bg-black/60 px-3 py-2 rounded-lg">
                      <code>npm run preview</code>
                      <button onClick={() => copyText('npm run preview', 'c2')} className="text-slate-400 hover:text-white">
                        {copiedKey === 'c2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-600 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-600" />
            <span>Target Production URL: <strong>https://www.newways.co.in</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://hpanel.hostinger.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>Open Hostinger hPanel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
