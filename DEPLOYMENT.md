# 🚀 Deployment Guide

## ✅ GitHub Repository
✅ **COMPLETED**: Code pushed to https://github.com/phani41/Aimentor.git

## 🔧 Vercel Deployment Steps

### 1. **Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import `phani41/Aimentor` repository

### 2. **Configure Environment Variables**
In Vercel dashboard, add these environment variables:

```
VITE_GEMINI_API_KEY=your-actual-gemini-api-key
VITE_FIREBASE_API_KEY=AIzaSyDLW_tPe5jtHumb7o_8fK0JwwMsVDYy7jY
VITE_FIREBASE_AUTH_DOMAIN=aimentor-e9edb.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=aimentor-e9edb
VITE_FIREBASE_STORAGE_BUCKET=aimentor-e9edb.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=43161610297
VITE_FIREBASE_APP_ID=1:43161610297:web:ab893bc4a853b3803005e8
```

### 3. **Deploy**
1. Click "Deploy"
2. Vercel will automatically build and deploy
3. Get your live URL: `https://aimentor-xyz.vercel.app`

## 📦 Chrome Extension Build

### Local Build:
```bash
npm run build:extension
```

### Create Release:
1. Zip the `dist-extension` folder
2. Upload to GitHub Releases
3. Users can download and install

## 🎯 Next Steps

1. **Update README** with live demo URL
2. **Test deployment** with real API key
3. **Create GitHub release** for extension download
4. **Submit to Chrome Web Store** (optional)

---

**🎉 Your AiMentor is ready for the world!**