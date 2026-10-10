# NEWWAYS ENTERPRISE — Hostinger Deployment Guide
**Target Domain:** `www.newways.co.in` (and `newways.co.in`)  
**Web Hosting:** Hostinger (Shared Hosting / Cloud / VPS with hPanel)  
**App Type:** High-Performance React + Vite Single Page Application (SPA) with WordPress / Elementor CMS Exporter  

---

## 🚀 Quick Summary: 3 Fast Steps to Deploy on Hostinger

1. **Build the production files:** Run `npm run build` in your terminal.
2. **Upload to Hostinger `public_html`:** Upload everything inside the generated `dist/` folder (including `dist/.htaccess`) into Hostinger File Manager under `public_html/`.
3. **Verify Domain & SSL:** Point `www.newways.co.in` to your Hostinger server IP, activate Free SSL in hPanel, and your site is live!

---

## Detailed Step-by-Step Instructions

### STEP 1: Generate the Production Build

In your terminal or project folder, execute:
```bash
npm run build
```
This command compiles and minifies all TypeScript, React components, Tailwind styling, and polymer product images into the `dist/` folder.

Inside `dist/` you will have:
- `index.html` (Main entry point with full SEO meta tags and Schema.org structured data)
- `.htaccess` (Hostinger LiteSpeed/Apache SPA URL rewrite & HTTPS rule)
- `assets/` (Optimized JavaScript, CSS, and Polymer images)
- `robots.txt`
- `sitemap.xml`

*Tip: You can zip the contents of `dist/` into a file named `dist.zip` for ultra-fast 1-click upload.*

---

### STEP 2: Upload Files to Hostinger via hPanel File Manager

1. Log in to your **Hostinger Account** at [https://hpanel.hostinger.com](https://hpanel.hostinger.com).
2. Go to **Websites** and click **Manage** next to `newways.co.in`.
3. Under the **Files** section, click **File Manager** (or File Manager for all files).
4. Double-click to open the `public_html` folder.
5. If there is a default `default.php` or parking page from Hostinger, delete it.
6. Click the **Upload** icon (top-right of File Manager) and select:
   - Your `dist.zip` file (or drag-and-drop the files from your local `dist/` folder).
7. If you uploaded a `.zip`, right-click it and choose **Extract** into `public_html`.
8. Ensure the files (`index.html`, `.htaccess`, `assets/`, etc.) are directly inside `public_html/` and NOT in a subfolder like `public_html/dist/`.

---

### STEP 3: Configure Hostinger `.htaccess` for React Routing & HTTPS

A pre-configured `.htaccess` file is already included in your project under `public/.htaccess`. It will automatically be placed in your root folder.

If you ever need to manually verify or edit it in Hostinger File Manager:
1. In Hostinger File Manager, ensure **"Show Hidden Files"** is enabled in settings (cog icon) so you can see `.htaccess`.
2. Ensure your `.htaccess` contains the following rules:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Force HTTPS
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # 2. Redirect non-www to www.newways.co.in
  RewriteCond %{HTTP_HOST} ^newways\.co\.in$ [NC]
  RewriteRule ^(.*)$ https://www.newways.co.in/$1 [L,R=301]

  # 3. React SPA Routing (prevents 404 on page refresh)
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^ index.html [L]
</IfModule>

# Caching & Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>
```

---

### STEP 4: Point Domain DNS to Hostinger (`www.newways.co.in`)

If you purchased `newways.co.in` directly on Hostinger:
- DNS is configured automatically! Just ensure the domain is assigned to your hosting plan.

If your domain was purchased elsewhere (GoDaddy, BigRock, Namecheap, etc.):
1. In Hostinger hPanel, look at the **Left Sidebar** under **Hosting** -> **Plan Details** to find your **Server IP Address** (e.g., `195.35.x.x`) and **Nameservers**:
   - `ns1.dns-parking.com`
   - `ns2.dns-parking.com`
2. Option A (Recommended): Update the nameservers at your registrar to Hostinger's nameservers.
3. Option B: In your existing registrar's DNS Zone editor, update the records:
   - **A Record**: Host `@` -> Points to `[Hostinger Server IP]` (TTL: 3600)
   - **CNAME Record**: Host `www` -> Points to `newways.co.in` (TTL: 3600)

---

### STEP 5: Enable Free SSL (HTTPS) on Hostinger

1. In Hostinger hPanel, go to **Security** -> **SSL**.
2. Click **Install SSL** on `newways.co.in` (Free Lifetime Let's Encrypt SSL provided by Hostinger).
3. Toggle on **Force HTTPS**.
4. Once active, your site will display the secure green lock in browsers at `https://www.newways.co.in`.

---

### STEP 6: Deploy in Hostinger using GitHub (Automated CI/CD)

Deploying from GitHub to Hostinger means whenever you push code changes to GitHub, your site at `www.newways.co.in` automatically builds and updates!

#### Method A: Automated GitHub Actions (Recommended & Zero Hassle)
A GitHub Actions workflow is already configured for you in `.github/workflows/deploy-hostinger.yml`.

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Newways Polymer Network"
   git remote add origin https://github.com/YOUR_USERNAME/newways-polymer.git
   git branch -M main
   git push -u origin main
   ```

2. **Get your Hostinger FTP Credentials:**
   - In Hostinger hPanel, go to **Websites** -> **Manage** -> **Files** -> **FTP Accounts**.
   - Note down:
     - **FTP Host / IP** (e.g., `ftp.newways.co.in` or your server IP `195.35.x.x`)
     - **FTP Username** (e.g., `u123456789`)
     - **FTP Password** (Set or change if needed)
     - **Port**: `21`

3. **Add Secrets in your GitHub Repository:**
   - In your GitHub repo, click **Settings** -> **Secrets and variables** -> **Actions**.
   - Click **New repository secret** and add:
     - `HOSTINGER_FTP_SERVER` : Your Hostinger FTP Host (e.g., `ftp.newways.co.in`)
     - `HOSTINGER_FTP_USER`   : Your Hostinger FTP Username
     - `HOSTINGER_FTP_PASSWORD` : Your Hostinger FTP Password

4. **Automatic Push & Deploy:**
   - Every time you push to the `main` branch, GitHub Actions will:
     1. Automatically install packages (`npm ci`)
     2. Run `npm run build` to compile the production app
     3. Upload the compiled `dist/` directly into Hostinger's `public_html/`!

---

#### Method B: Hostinger Native Git Tool (hPanel)

Hostinger includes a built-in Git deployment tool:

1. In Hostinger hPanel, scroll to **Advanced** -> **Git**.
2. Under **Create a New Repository**:
   - **Repository:** Enter your GitHub repository HTTPS clone URL (`https://github.com/YOUR_USERNAME/newways-polymer.git`).
   - **Branch:** `main`
   - **Install directory:** Leave as `public_html` (or create a subfolder if running Node.js build on VPS).
3. Click **Create**. Hostinger will pull the repository files.
4. **Auto-Deployment Webhook:**
   - Hostinger will display an **Auto-Deployment Webhook URL**.
   - Copy this URL, go to your GitHub repository -> **Settings** -> **Webhooks** -> **Add webhook**.
   - Paste the Payload URL, choose Content type `application/json`, and save.
   - Now, whenever you push to GitHub, Hostinger immediately pulls the latest update!

---

### STEP 7: WordPress & Elementor Pro Integration Guide

Since you requested WordPress & Elementor Pro editability:
You have 3 easy deployment architectures:

#### Option 1: Built-in Live WordPress & Elementor Customizer (Recommended)
This web application comes with a built-in WordPress Administrator Bar and Elementor-style visual editor!
- Click **"Customize Site / Elementor"** in the top black admin bar to edit headlines, phone numbers, prices, and products in real-time.
- Edits persist in local storage and can be exported as a backup JSON at any time.

#### Option 2: Export to WordPress & Elementor Pro Pages
- In the top admin bar, click **"Export WP / Elementor"**.
- Choose **"Gutenberg / Elementor HTML Blocks"** or **"WordPress JSON Schema"**.
- In your WordPress dashboard with Elementor Pro installed:
  1. Create a new page -> **Edit with Elementor**.
  2. Add an **HTML Widget** or import the block JSON into Elementor Templates (`Templates -> Saved Templates -> Import`).
  3. Publish your page!

#### Option 3: Headless WordPress on Hostinger Subdomain
- Install WordPress on a subdomain (e.g., `cms.newways.co.in` or `admin.newways.co.in`) via Hostinger Auto-Installer.
- Keep `www.newways.co.in` as the ultra-fast React frontend, and connect to WordPress REST API for blog posts or market news updates.

---

### Need Help or Direct Trade Support?
- **Company:** NEWWAYS ENTERPRISE
- **Phone:** +91 98797 47777
- **Email:** info@newways.in
- **Website:** www.newways.co.in

