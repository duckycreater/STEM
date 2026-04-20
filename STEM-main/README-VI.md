# PlantCare AI — Setup & Run Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd STEM-main
npm install
```

### 2. Setup Environment

Create `.env` file:
```bash
# AI API Keys (Get from respective platforms)
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_GROQ_API_KEY=your_groq_key_here

# Optional: Supabase (Cloud Database)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key

# Optional: DeepSeek
DEEPSEEK_API_KEY=your_deepseek_key

# Server
PORT=3001
NODE_ENV=development
```

### 3. Run Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Run Backend API Separately (Optional)
```bash
npm run server
# API running on http://localhost:3001
```

---

## 📱 Features

### ✅ Completed (Version 2.0)

| Feature | Description | Tech |
|---------|-------------|------|
| **AI Diagnosis** | Phát hiện bệnh cây trồng qua ảnh | Gemini + Groq LLM |
| **Vietnamese i18n** | Hỗ trợ tiếng Việt & English | Custom i18n |
| **Offline Mode** | 261 bệnh cây trồng offline | localStorage |
| **IoT Dashboard** | Dashboard cảm biến thời gian thực | WebSocket/API |
| **Market Prices** | Biểu đồ giá nông sản + AI dự báo | Recharts + AI |
| **AI Chatbot** | Trợ lý nông nghiệp chat | Groq LLM |
| **History Tracking** | Lịch sử chẩn đoán | Cloud DB (Supabase) |
| **Disease Dictionary** | Từ điển 261 bệnh cây trồng | Search + Filter |
| **PWA** | Installable Progressive Web App | Vite PWA |
| **Dark Mode** | Chế độ tối/ sáng | Tailwind |

### 🔄 Architecture

```
┌─────────────────────────────────────────────┐
│            Frontend (React 19)              │
│  • Vite 6 + TypeScript + Tailwind CSS 4     │
│  • React Router v7 + Motion (Framer)        │
│  • Lazy loading + Code splitting            │
└───────────────┬─────────────────────────────┘
                │
                │ HTTP/WebSocket
                ▼
┌─────────────────────────────────────────────┐
│         Backend API (Express)               │
│  • /api/diagnose (Image AI)                 │
│  • /api/chat (AI Chat)                      │
│  • /api/sensors (IoT data)                  │
│  • /api/market (Prices)                     │
│  • Rate limiting + CORS + Helmet            │
└───────────────┬─────────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────┐
│      AI Providers (Multi-fallback)          │
│  1. Google Gemini 2.0 Flash (Primary)       │
│  2. Groq Llama 3.2 90B Vision (Fallback)    │
│  3. DeepSeek Chat (Optional)                │
│  4. OpenAI GPT-4o (Optional)                │
└────────────────────────���────────────────────┘

┌─────────────────────────────────────────────┐
│      Cloud Database (Supabase)              │
│  • auth (Authentication)                    │
│  • history (Diagnosis records)              │
│  • sensor_readings (IoT data)               │
│  • user_settings (Preferences)              │
└─────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
STEM-main/
├── src/
│   ├── components/           # UI Components
│   │   ├── AIChatBot.tsx     # AI Chat Assistant
│   │   ├── ResultCard.tsx    # Diagnosis Result Card
│   │   └── SplashScreen.tsx  # Loading Screen
│   ├── pages/                # Route Pages
│   │   ├── HomePage.tsx      # Main Diagnosis Page
│   │   ├── DashboardPage.tsx # IoT Farm Dashboard
│   │   ├── MarketPage.tsx    # Market Prices
│   │   ├── PlantsPage.tsx    # Disease Dictionary
│   │   ├── HistoryPage.tsx   # Scan History
│   │   ├── SettingsPage.tsx  # Settings
│   │   └── CommunityPage.tsx # Community (Coming Soon)
│   ├── contexts/             # React Contexts
│   │   └── SettingsContext.tsx
│   ├── hooks/                # Custom Hooks
│   │   └── useCustom.ts      # useDebounce, useOnline, etc.
│   ├── lib/                  # Utilities
│   │   ├── api.ts           # API Service Layer
│   │   ├── i18n.ts          # Vietnamese/English translations
│   │   ├── errorBoundary.ts # Error handling & logging
│   │   ├── offlineData.ts   # 261 offline diseases
│   │   └── utils.ts         # cn() helper
│   ├── services/            # External Services
│   │   ├── auth.tsx         # Supabase Auth
│   │   ├── database.ts      # Supabase DB
│   │   └── iotService.ts    # IoT WebSocket
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx              # Main App Router
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── server/
│   ├── api.ts               # Backend API routes
│   └── server.ts            # Vite + API middleware
├── public/                  # Static assets
│   ├── icons/
│   └── images/
├── .env.example             # Environment template
├── .env.server              # Server env (not committed)
├── package.json
├── vite.config.ts           # Vite configuration
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 🔧 Configuration

### API Keys Setup

#### 1. Gemini API (Google AI)
- Visit: https://makersuite.google.com/app/apikey
- Create API key
- Add to `.env`: `VITE_GEMINI_API_KEY=your_key`

#### 2. Groq API (Free & Fast)
- Visit: https://console.groq.com/keys
- Create API key
- Add to `.env`: `VITE_GROQ_API_KEY=gsk_...`

#### 3. Supabase (Optional - Cloud DB)
```bash
npm install @supabase/supabase-js
```
- Create project at https://supabase.com
- Enable Auth & Database
- Run SQL schema (see `supabase-schema.sql`)
- Add to `.env`: `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`

---

## 🎨 UI/UX Features

### Design System
- **Colors**: Emerald (#059669) primary, Teal (#0d9488) secondary
- **Dark Mode**: Full dark theme support
- **Typography**: Inter + system fonts
- **Icons**: Lucide React (260+ icons)

### Animations (Motion)
- Page transitions (slide/fade)
- Button micro-interactions (tap scale)
- Loading skeletons
- Radar scan effect (diagnosis)
- Smooth scroll to bottom (chat)

### Mobile-First
- Responsive design (max-w-md container)
- Touch-optimized buttons
- Safe area insets (notch support)
- PWA installable

---

## 🔐 Security

### Backend Protection
- ✅ **API keys hidden** (server-side only)
- ✅ **Rate limiting** (100 req/15min per IP)
- ✅ **CORS** configured
- ✅ **Helmet** security headers
- ✅ **Body size limits** (50MB for images)

### Frontend
- ✅ No hardcoded API keys
- ✅ Input validation
- ✅ XSS protection (React)
- ✅ CSP via Vite PWA

### Privacy
- ✅ Images processed server-side (not stored)
- ✅ Local history encryption optional
- ✅ GDPR-compliant data handling

---

## 📊 Performance Optimizations

### Code Splitting
```typescript
// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
```

### Chunk Groups (Vite)
```typescript
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  ui: ['lucide-react', 'motion', 'clsx'],
  ai: ['@google/genai', 'groq-sdk'],
  charts: ['recharts', 'leaflet'],
}
```

### Image Optimization
- Compression in Rural Mode (0.5MB max)
- WebP format support
- Lazy loading with IntersectionObserver

### Caching
- Service Worker (PWA)
- API response caching
- Map tile caching
- Font caching (1 year)

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Lint
npm run lint

# Type check
npm run typecheck
```

### Test Coverage
- ✅ Unit: Components, Hooks, Utils
- ✅ Integration: API routes, Auth flows
- ✅ E2E: User journeys (diagnosis, login, IoT)
- ✅ Visual regression (Storybook)

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
# Output: dist/
```

### Deploy to Vercel/Netlify
```bash
vercel --prod
# or
netlify deploy --prod
```

### Environment Variables (Production)
Set in hosting platform dashboard:
- `VITE_GEMINI_API_KEY`
- `VITE_GROQ_API_KEY`
- `VITE_SUPABASE_URL` (optional)
- `VITE_SUPABASE_ANON_KEY` (optional)

---

## 📈 Future Roadmap

### v2.1 (Q2 2026)
- [ ] Multi-language: Spanish, French, Thai
- [ ] AR plant scanning (mobile camera)
- [ ] Voice commands (tiếng Việt)
- [ ] Push notifications (IoT alerts)
- [ ] QR code sharing (diagnosis results)

### v2.2 (Q3 2026)
- [ ] ML model fine-tuning (local data)
- [ ] Drone integration (farm mapping)
- [ ] Blockchain traceability
- [ ] Marketplace (buy/sell crops)
- [ ] Farm management software

### v3.0 (2027)
- [ ] Satellite imagery integration
- [ ] Climate change predictions
- [ ] Automated irrigation control
- [ ] AI-powered yield optimization
- [ ] Multi-farm collaboration

---

## 🐛 Troubleshooting

### Common Issues

**1. "API Key Missing"**
```bash
# Check .env file exists
ls -la .env

# Restart dev server
npm run dev
```

**2. Build Fails**
```bash
# Clear cache
rm -rf node_modules/.vite
npm run clean
npm install
```

**3. Images Not Uploading**
- Max size: 10MB
- Formats: JPG, PNG, WebP
- Check network connection

**4. PWA Not Installing**
- HTTPS required (except localhost)
- Manifest must be valid
- Service Worker registered

### Debug Mode
```typescript
// Enable verbose logging
localStorage.setItem('debug', 'plantcare:*');
console.log('[PlantCare] Debug mode ON');
```

---

## 📞 Support

- **Issues**: https://github.com/your-repo/issues
- **Discord**: [Community Server]
- **Email**: support@plantcare.ai
- **Docs**: https://docs.plantcare.ai

---

## 📄 License

MIT License — See `LICENSE` file

---

## 🙏 Credits

**Built with ❤️ for STEM Research**

### Technologies
- [React](https://react.dev) — UI Library
- [Vite](https://vitejs.dev) — Build Tool
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Google Gemini](https://ai.google.dev) — Vision AI
- [Groq](https://groq.com) — Fast LLM
- [Supabase](https://supabase.com) — Backend
- [Leaflet](https://leafletjs.com) — Maps
- [Recharts](https://recharts.org) — Charts
- [Motion](https://motion.dev) — Animations
- [Lucide](https://lucide.dev) — Icons

### Vietnamese Agriculture Data
- Bộ Nông nghiệp Việt Nam
- Tổng cục Trồng trọt
- Viện Nông nghiệp

---

**Phiên bản 2.0 — Nâng cấp toàn diện với tiếng Việt hoàn toàn** 🇻🇳
