# SafeRoots Setup & Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `SafeRoots`
   - **Description**: SafeRoots - Gamified platform for information literacy
   - **Visibility**: Public
3. Click "Create repository"

### Step 2: Push Code to GitHub

```bash
cd /tmp/saferoots-demo

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/SafeRoots.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 3: Deploy to Vercel

**Option A: Web Dashboard (Easiest)**
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Paste: `https://github.com/YOUR_USERNAME/SafeRoots`
4. Click "Import"
5. Click "Deploy"
6. Done! Your live URL: `https://saferoots-xxxxx.vercel.app`

**Option B: Vercel CLI**
```bash
npm install -g vercel
cd /tmp/saferoots-demo
vercel
# Follow prompts
```

## 📊 Expected Output

After deployment:
- ✅ Live URL from Vercel
- ✅ Automatic HTTPS
- ✅ Auto-redeploy on push
- ✅ Production-optimized build

## 🔍 Verify Deployment

1. Visit your Vercel URL
2. Click SafeRoots tab
3. Test all features:
   - Take a quiz
   - Click map locations
   - View media outlets
4. Check mobile responsiveness

## ⚙️ Environment Variables (if needed)

In Vercel dashboard → Settings → Environment Variables:
- None needed for this demo!

## 📱 Monitor After Deployment

Vercel Dashboard shows:
- Build status
- Deployment history
- Performance metrics
- Error logs

## 🆘 Troubleshooting

**Blank page?**
- Check browser console (F12)
- Verify all imports in dist folder
- Try hard refresh (Ctrl+Shift+R)

**Build failed?**
- Check Node version (18+)
- Clear npm cache: `npm cache clean --force`
- Rebuild: `npm run build`

**Slow load?**
- Check Vercel analytics
- Optimize images
- Enable Vercel edge caching

## 🎯 Next Steps

1. ✅ Deploy to Vercel
2. Share the URL: `https://saferoots-xxxxx.vercel.app`
3. Get feedback
4. Plan Phase 2 features
5. Scale to more cities

---

**Total time to live: ~5 minutes** ⚡
