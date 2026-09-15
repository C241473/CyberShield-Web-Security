# 🛡️ CyberShield — Defensive Cybersecurity Web App

**CyberShield** is a modern, dark-themed, full-stack cybersecurity web application built with **React**, **Tailwind CSS**, **Node.js/Express**, **Python security checkers**, and **MongoDB**. It audits target websites for defensive security configurations, HTTP security headers, SSL/TLS certificates, cookie security flags, and technology leakage.

---

## 🚀 Key Features

- 🔍 **Realtime Website Scan**: Enter any target domain or URL (e.g., `facebook.com`, `google.com`, `stackoverflow.com`, `prothomalo.com`, `bdjobs.com`, or any custom website).
- 🛡️ **Defensive Security Audit**:
  - ✅ **HTTPS Protocol & SSL Certificate** validation (issuer, expiration days remaining, TLS version, cipher suite, SANs).
  - ✅ **HTTP Security Headers** audit (`Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
  - ✅ **Cookie Flags Audit** (`Secure`, `HttpOnly`, `SameSite` flags).
  - ⚠️ **Information Leak Detection** (`Server` version & `X-Powered-By` header leaks).
  - 🛠️ **Technology Stack Detection** (Meta Infrastructure, Google Web Server, Cloudflare WAF, Nginx, Express, React, WordPress).
- 📊 **Visual Security Score (0-100)**: Weighted grading system with clear risk badges (✅ Pass, ⚠️ Warning, 🔴 Vulnerable).
- 💡 **Actionable Fixes**: Production-ready configuration code snippets for **Express.js (`helmet`)**, **Nginx**, **Apache**, and **Cloudflare**.
- 💾 **Persistent Database**: Saves scan reports to **MongoDB** (with zero-config fallback to local storage).
- 📥 **Export Reports**: Download JSON scan reports for documentation.

---

## 🛠️ 1. Tech Stack Overview (কোন কাজের জন্য কি ইউজ করা হয়েছে)

| Layer | Technology | Usage & Purpose |
| :--- | :--- | :--- |
| **Frontend UI** | **React 18 + Vite** | High-performance single page application framework for dynamic state management & instant UI updates. |
| **Styling & Theme** | **Tailwind CSS** | Dark-themed cyber aesthetic, glassmorphism (`cyber-glass`), custom glowing borders, and responsive grid layouts. |
| **UI Components & Icons** | **Lucide React** | Cyber security iconography (`ShieldCheck`, `Lock`, `Cookie`, `Terminal`, `Activity`). |
| **Backend API** | **Node.js + Express** | RESTful HTTP server handling `/api/scan`, `/api/scans`, `/api/scans/:id` endpoints. |
| **HTTP Network Engine** | **Axios** | Multi-protocol HTTP client with browser user-agent header spoofing to fetch raw response headers across redirects. |
| **SSL Diagnostic Engine** | **Python `ssl` + `socket`** | Python helper script spawned via Node `child_process.execFile` for low-level TLS handshake & certificate inspection. |
| **Database & Persistence** | **MongoDB (Mongoose)** | Stores scan history and reports locally on MongoDB Server (`mongodb://127.0.0.1:27017/cybershield`). |
| **Database Fallback** | **JSON Local Storage** | If MongoDB is ever offline, automatically falls back to persistent file storage at `data/scans_fallback.json`. |

---

## 🔍 2. Security Checks & Vulnerability Detections (কি কি ডিটেক্ট করতেছে)

### 1. HTTPS & SSL/TLS Certificate Audit
- **Check**: Validates whether the website operates over encrypted `https://` protocol.
- **Details Extracted**: Certificate Issuer (e.g. Let's Encrypt, DigiCert, SSL Corp), Validity Period (start/end dates), Days Remaining until expiry, TLS Protocol version (TLS 1.3/1.2), Cipher Suite (`TLS_AES_256_GCM_SHA384`), and Subject Alternative Names (SANs).

### 2. HTTP Security Headers Audit
- **Strict-Transport-Security (HSTS)**: Checks if `max-age`, `includeSubDomains`, and `preload` rules enforce HTTPS.
- **Content-Security-Policy (CSP)**: Audits `Content-Security-Policy` and `Content-Security-Policy-Report-Only` headers for XSS protection.
- **X-Frame-Options**: Checks for `DENY` or `SAMEORIGIN` flags (Clickjacking defense).
- **X-Content-Type-Options**: Checks for `nosniff` flag (MIME-sniffing defense).
- **Referrer-Policy**: Audits privacy of outbound link referrer headers (`strict-origin-when-cross-origin`).
- **Permissions-Policy**: Audits restrictions on hardware features (camera, microphone, geolocation).

### 3. Cookie Security Flags Audit
- Audits all `Set-Cookie` headers for:
  - `Secure` flag (Ensures cookie is sent strictly over HTTPS).
  - `HttpOnly` flag (Prevents JavaScript `document.cookie` access / XSS theft).
  - `SameSite` flag (`Strict`, `Lax`, or `None` for CSRF protection).

### 4. Server & Framework Information Leakage
- Checks for `Server` header version disclosures (e.g., `Apache/2.4.41` or `Nginx/1.18.0`).
- Checks for `X-Powered-By` framework leaks (e.g., `Express`, `PHP/8.1`, `ASP.NET`).

### 5. Technology Stack Fingerprinting
- Fingerprints server infrastructure based on header signatures and HTML markup (e.g. Cloudflare WAF, Meta Infrastructure, Google Web Server, Nginx, Apache, Express.js, React, WordPress, Next.js).

### 6. Dynamic Security Score (0-100)
- Weighted scoring algorithm calculating overall security health score (0-100), letter grade (`A+`, `A`, `B`, `C`, `F`), and risk level assessment (`Excellent`, `Good`, `Moderate Risk`, `High Risk`, `Critical Vulnerability`).

---

## 📁 3. Code Responsibility Mapping (কোন কোড এর জন্য এই কাজগুলা হচ্ছে)

### Backend Codebase (`cybershield/backend/`)

#### 📄 `src/services/scannerService.js`
The core security scanning engine containing all audit logic:
- `parseTargetUrl(inputUrl)`: Normalizes user input (e.g., converts `facebook.com` to `https://facebook.com`), extracts clean hostname.
- `fetchWebsiteHeaders(initialUrl, hostname)`: Executes multi-protocol fallback (tries `https://<domain>`, `https://www.<domain>`, `http://<domain>`) using Chrome User-Agent headers to bypass bot blocks and capture real response headers.
- `runPythonSslScanner(hostname)`: Spawns the Python SSL script to extract TLS certificate metadata.
- `performScan(targetInput)`: Master function coordinating all security checks, cookie audits, header inspections, and tech stack detection.
- `auditCookies(setCookieHeader)`: Parses `Set-Cookie` strings and verifies `Secure`, `HttpOnly`, and `SameSite` flags.
- `detectTechStack(headers, htmlContent, domain)`: Pattern-matches response headers and HTML body content to detect tech stacks.
- `calculateDynamicScore(...)`: Applies weighted penalties and bonuses to generate the final 0-100 score, grade, and risk level.
- `generateRecommendations(...)`: Generates actionable fix snippets for missing headers.

#### 📄 `scripts/ssl_scanner.py`
- `scan_ssl(target)`: Uses Python's native `ssl` and `socket` modules to establish a TLS handshake with the target server, extracting issuer, dates, cipher, and SANs into a clean JSON output.

#### 📄 `src/config/db.js`
- `connectDB()`: Connects to local MongoDB server (`mongodb://127.0.0.1:27017/cybershield`).
- `getLocalScans()`, `saveLocalScan()`: File-based JSON database fallback (`data/scans_fallback.json`) for seamless execution if MongoDB is offline.

#### 📄 `src/controllers/scanController.js`
- `createScan`: Express endpoint handler for `POST /api/scan`. Calls `scannerService.performScan(url)` and saves the report to DB.
- `getScans`: Endpoint handler for `GET /api/scans` (fetches scan history).
- `deleteScan`: Endpoint handler for `DELETE /api/scans/:id`.

#### 📄 `src/server.js`
- Express app setup, CORS middleware, API route mounting, and HTTP server startup on port `5000`.

---

### Frontend Codebase (`cybershield/frontend/`)

#### 📄 `src/App.jsx`
- Root application component managing global scan state (`currentReport`, `scans`, `loading`, `error`), executing API calls (`scanWebsite`, `getScanHistory`), rendering layout, and handling JSON report download.

#### 📄 `src/components/UrlInputForm.jsx`
- Search bar component accepting any user-entered website URL, triggering scans on `Enter` keypress or button click, and providing quick test target chips.

#### 📄 `src/components/ScoreGauge.jsx`
- Renders the circular SVG animated score gauge (`78 / 100`), grade badge (`A+`, `A`, `B`, `C`, `F`), and risk level text.

#### 📄 `src/components/StatusBadgeGrid.jsx`
- Renders the 6-point visual defensive security checklist:
  - HTTPS Protocol ✅ / ❌
  - HSTS Enabled ✅ / ⚠️ / ❌
  - Content-Security-Policy ✅ / ⚠️ / ❌
  - X-Frame-Options ✅ / ❌
  - Secure Cookie Flags ✅ / ❌
  - Server Leak Status ✅ / ⚠️

#### 📄 `src/components/HeaderAuditTable.jsx`
- Interactive audit table displaying evaluated HTTP security headers with tab filtering (`All`, `Missing`, `Warnings`, `Passed`), severity badges, observed header values, and security explanations.

#### 📄 `src/components/SslDetailsCard.jsx`
- Displays SSL certificate details: Issuer, Days Remaining, TLS Version, Cipher Suite, SANs.

#### 📄 `src/components/CookieAuditCard.jsx`
- Displays cookie security statistics (`Secure`, `HttpOnly`, `SameSite` counts) and lists specific vulnerable cookies.

#### 📄 `src/components/RecommendationsCard.jsx`
- Provides copyable production-ready fix code snippets tabbed for **Express.js (`helmet`)**, **Nginx**, **Apache**, and **Cloudflare**.

#### 📄 `src/components/RecentScans.jsx`
- Renders historical scan cards saved in MongoDB, allowing 1-click report reload and deletion.

---

## 🚦 How to Run CyberShield

### 1. Start Backend Server
```bash
cd backend
npm start
```
*Backend runs on `http://localhost:5000`*

### 2. Start Frontend App
```bash
cd frontend
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🎯 Verification Test Results

| Target URL | Calculated Score | Grade | Risk Level | Detected Tech Stack |
| :--- | :---: | :---: | :---: | :--- |
| `facebook.com` | **96 / 100** | **A+** | Excellent | Meta Infrastructure (proxygen) |
| `stackoverflow.com` | **98 / 100** | **A+** | Excellent | Cloudflare WAF / CDN |
| `prothomalo.com` | **76 / 100** | **B** | Moderate Risk | Cloudflare WAF / CDN, Express.js, React |
| `bdjobs.com` | **74 / 100** | **B** | Moderate Risk | Cloudflare WAF / CDN, Express.js |
| `wikipedia.org` | **79 / 100** | **B** | Moderate Risk | Cloud Web Infrastructure |
| `http://neverssl.com` | **20 / 100** | **F** | Critical Risk | Unencrypted HTTP |
