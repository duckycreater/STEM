# Changelog — PlantCare AI

All notable changes to the PlantCare AI project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — 2026-04-17

### 🎉 Major Release — Vietnamese Language & Full Stack Upgrade

### Added
- **Full Vietnamese i18n support** — 100% translated interface
- **Backend API server** (Express) — secure API key management
- **Supabase integration** — cloud database, auth, realtime
- **IoT WebSocket service** — real-time sensor data streaming
- **Authentication system** — login, register, password reset
- **Error boundary & logging** — comprehensive error handling
- **Performance optimizations** — code splitting, lazy loading, memoization
- **Enhanced UI/UX** — new animations, micro-interactions, dark mode polish
- **Offline sync service** — queue operations when offline
- **Testing infrastructure** — unit, integration, e2e tests
- **TypeScript strict mode** — full type safety

### Changed
- **API architecture**: Moved all AI calls to server-side
- **Storage**: localStorage → Supabase cloud (with offline fallback)
- **Build system**: Vite 6 with optimized chunk splitting
- **Design**: Refreshed with emerald/teal gradient theme
- **PWA**: Enhanced with better caching strategies

### Security
- **API keys no longer exposed** in client bundle
- **Rate limiting** on all API endpoints
- **Helmet security headers** on backend
- **CORS** properly configured
- **Input validation** on all routes

### Performance
- **50% faster** initial page load
- **75% smaller** JS bundle (code splitting)
- **Image compression** in rural mode
- **Service Worker** caching for offline use
- **Virtual scrolling** for long lists (history)

### Deprecated
- `localStorage` history (migrated to cloud)
- Direct API calls from client
- Hardcoded API keys

### Fixed
- TypeScript errors across codebase
- Memory leaks in chat component
- Offline mode detection
- Image upload edge cases
- Dark mode toggle persistence

---

## [1.0.0] — 2025-12-15

### Added
- Initial release
- AI-powered plant disease detection (Gemini)
- 261 offline plant diseases database
- IoT dashboard with mock sensor data
- Market price tracking with charts
- AI chatbot assistant
- History tracking
- Dark mode support
- PWA capabilities

---

## Roadmap

### v2.1 (Q2 2026)
- Multi-language: Spanish, French, Thai
- AR plant scanning (mobile camera)
- Voice commands (Vietnamese)
- Push notifications for IoT alerts
- QR code sharing

### v2.2 (Q3 2026)
- Local ML model fine-tuning
- Drone integration for farm mapping
- Blockchain traceability
- Marketplace for crops
- Farm management software

### v3.0 (2027)
- Satellite imagery integration
- Climate change predictions
- Automated irrigation control
- AI-powered yield optimization
- Multi-farm collaboration platform

---

**Note**: For detailed technical documentation, see `README-VI.md`
