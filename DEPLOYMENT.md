# Deployment Instructions

This document provides step-by-step instructions for deploying the Personal Expense Tracker application.

## Table of Contents
1. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
2. [Database Setup (MongoDB Atlas)](#database-setup-mongodb-atlas)
3. [Environment Variables](#environment-variables)
4. [Alternative Deployment Options](#alternative-deployment-options)

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)

### Step 1: Prepare Your Repository
1. Ensure your code is pushed to GitHub
2. Make sure all environment variables are documented in `.env.example`

### Step 2: Deploy to Vercel
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (if deploying from root)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

### Step 3: Configure Environment Variables
In Vercel dashboard, add the following environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-secure-jwt-secret-key
NEXTAUTH_URL=https://your-app.vercel.app
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your live application

## Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create a new cluster (free tier)

### Step 2: Configure Database
1. **Database Access**: Create a database user with read/write permissions
2. **Network Access**: Add your IP address (or 0.0.0.0/0 for all IPs)
3. **Database**: Create database named `expense-tracker`

### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/expense-tracker` |
| `JWT_SECRET` | Secret key for JWT tokens | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Application URL | `https://your-app.vercel.app` |

### Development vs Production

#### Development (`.env.local`)
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=development-secret-key
NEXTAUTH_URL=http://localhost:3000
```

#### Production (Vercel Environment Variables)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=super-secure-production-key
NEXTAUTH_URL=https://your-app.vercel.app
```

## Alternative Deployment Options

### 1. Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out` (add `output: 'export'` to `next.config.js`)
4. Add environment variables

### 2. Railway
1. Connect GitHub repository
2. Add environment variables
3. Railway will auto-deploy

### 3. Render
1. Create new Web Service
2. Connect GitHub repository
3. Build command: `npm run build`
4. Start command: `npm start`
5. Add environment variables

### 4. Self-Hosted (VPS/Server)
```bash
# Clone repository
git clone <your-repo-url>
cd expense-tracker

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "expense-tracker" -- start

# Or start directly
npm start
```

## Post-Deployment Checklist

### ✅ Verification Steps
- [ ] Application loads without errors
- [ ] User registration works
- [ ] User login works  
- [ ] Expense creation works
- [ ] Expense editing works
- [ ] Expense deletion works
- [ ] Charts display correctly
- [ ] Filtering works
- [ ] Mobile responsiveness works
- [ ] Database connections are secure

### ✅ Performance Optimization
- [ ] Enable caching headers
- [ ] Optimize images
- [ ] Enable compression
- [ ] Monitor performance metrics

### ✅ Security Checklist
- [ ] Environment variables are secure
- [ ] Database has proper access controls
- [ ] JWT secrets are strong
- [ ] API endpoints are protected
- [ ] Input validation is working

### ✅ Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Monitor database performance
- [ ] Set up uptime monitoring
- [ ] Configure backup strategy

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check Node.js version compatibility
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

#### 2. Database Connection Issues
- Verify MongoDB URI format
- Check database user permissions
- Confirm network access settings
- Test connection locally first

#### 3. Environment Variables Not Working
- Verify variable names match exactly
- Check for trailing spaces
- Ensure variables are set in correct environment
- Restart application after changes

#### 4. Authentication Issues
- Verify JWT_SECRET is set and secure
- Check NEXTAUTH_URL matches deployment URL
- Clear browser cache and localStorage

## Cost Optimization

### Free Tier Limits
- **Vercel**: 100GB bandwidth, unlimited deployments
- **MongoDB Atlas**: 512MB storage, 500 connections
- **Render**: 750 hours/month free

### Scaling Considerations
- Monitor database usage
- Optimize API queries
- Implement caching strategies
- Consider CDN for static assets

## Support

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

### Getting Help
- Check application logs in Vercel dashboard
- Monitor MongoDB Atlas metrics
- Use browser developer tools for client issues
- Check GitHub Issues for known problems

---

Last updated: August 2024
