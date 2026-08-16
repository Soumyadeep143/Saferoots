# SafeRoots 🏆

A gamified platform teaching newcomers **calibrated trust** and **information literacy** for navigating a new city safely.

## 🎯 Core Philosophy

**Don't tell users what's safe → Teach them HOW to determine what's trustworthy**

SafeRoots empowers newcomers with:
- 🎮 **Scam or Safe?** - Duolingo-style micro-learning with trust signal analysis
- 🗺️ **Community Map** - Interactive intelligence of verified resources and scams
- 📰 **Media Decoder** - Understanding local media bias and political context

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 📦 What's Included

### Features
- ✅ 8 real-world quiz scenarios (5+ cities)
- ✅ Interactive Leaflet map with 12+ locations
- ✅ Media decoder analyzing 12+ news outlets
- ✅ 5-level gamification system with badges
- ✅ Trust signal analysis teaching framework
- ✅ Mobile-responsive design
- ✅ Beautiful dark theme

### Performance
- Build size: 391 KB (gzip: 117 KB)
- Load time: < 2 seconds
- 100% mobile responsive

## 🌐 Deployment

### Deploy to Vercel (1 click)
1. Go to vercel.com/new
2. Import this GitHub repo
3. Click Deploy
4. Done! ✨

### Deploy to Vercel (CLI)
```bash
npm install -g vercel
vercel
```

## 📁 Project Structure

```
/src
  ├── components/SafeRoots/
  │   ├── SafeRootsApp.jsx      # Main app & navigation
  │   ├── QuizGame.jsx          # Quiz with trust signals
  │   ├── FactCheckingMap.jsx   # Interactive map
  │   ├── MediaDecoder.jsx      # Media bias analysis
  │   └── SafeRoots.css         # Styling
  ├── App.jsx
  └── main.jsx
```

## 🎮 Features Explained

### Scam or Safe? Quiz
- Real-world scenarios from different cities
- Swipe-based interface (Left = Scam, Right = Safe)
- Trust signal analysis explaining warning signs
- Verification steps for each scenario
- Progress tracking with scores and streaks

### Community Fact-Checking Map
- 12+ locations with community data
- Scam alerts with report counts
- Trusted resources with ratings
- Interactive filtering and detailed cards
- Real-time location intelligence

### Media Decoder
- 12+ media outlets analyzed
- Political bias visualization
- Reliability scores
- Ownership transparency
- Interpretation guidance

## 🎯 Tech Stack

- React 19
- Vite
- Tailwind CSS
- Leaflet.js (Maps)
- Lucide React (Icons)
- Recharts (Charts)

## 📚 Documentation

See the docs folder for:
- Feature roadmap
- Deployment guide
- API integration guide

## 🚀 Future Phases

**Phase 2**: Verify Before You Trust analyzer, real-time alerts, user accounts
**Phase 3**: Community forums, teaching mode, leaderboards
**Phase 4**: Multi-language, 100+ cities, mobile apps

## 📄 License

MIT

---

**SafeRoots © 2026** - Empowering newcomers to navigate their new city safely
