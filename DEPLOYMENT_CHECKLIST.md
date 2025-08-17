# FixMyBike Server Deployment Checklist

## ✅ Pre-Deployment Checks

### 1. Environment Variables
- [ ] `MONGO_URL` is set to production MongoDB instance
- [ ] `JWT_SECRET` is set to a strong, unique secret
- [ ] `NODE_ENV` is set to `production`
- [ ] `PORT` is set (Render will override this automatically)

### 2. CORS Configuration
- [ ] Client domain is added to CORS origins
- [ ] HTTPS is used for production domains

### 3. Database
- [ ] MongoDB connection string is correct
- [ ] Database is accessible from Render's servers

### 4. Security
- [ ] JWT secret is strong and unique
- [ ] No hardcoded secrets in code

### 5. Dependencies
- [ ] Express version is 4.x (not 5.x for production stability)
- [ ] All dependencies are compatible

### 6. API Paths
- [ ] All client API calls use `/api/` prefix
- [ ] Server routes are mounted at `/api/` prefix
- [ ] No duplicate `/api/` paths in client configuration

## 🚀 Render Deployment Steps

1. **Connect GitHub Repository**
   - Link your GitHub repo to Render
   - Set branch to `main` or `master`

2. **Environment Variables**
   ```
   MONGO_URL=your_production_mongodb_url
   JWT_SECRET=your_strong_jwt_secret
   NODE_ENV=production
   ```

3. **Build Command**
   ```
   npm install
   ```

4. **Start Command**
   ```
   npm start
   ```

5. **Health Check Path**
   ```
   /api/health
   ```

## 🔍 Troubleshooting

### Common Issues:
1. **Express 5.x Compatibility**: Use Express 4.x for production stability
2. **API Path Mismatch**: Ensure client calls `/api/auth/login`, not `/auth/login`
3. **404 Errors**: Check if routes are properly mounted
4. **CORS Errors**: Verify CORS origins include client domain
5. **Database Connection**: Check MongoDB connection string
6. **Environment Variables**: Ensure all required vars are set

### Testing Endpoints:
- Root: `https://fixmybike-server.onrender.com/`
- Health: `https://fixmybike-server.onrender.com/api/health`
- Auth: `https://fixmybike-server.onrender.com/api/auth/login`

## 📱 Client Configuration

Ensure client `api.js` has:
```javascript
const resolvedBaseUrl = 'https://fixmybike-server.onrender.com';
```

And all API calls use the correct prefix:
```javascript
// ✅ Correct
api.post('/api/auth/login', data)
api.get('/api/bookings')

// ❌ Incorrect
api.post('/auth/login', data)
api.get('/bookings')
```

## 🔧 Monitoring

- Check Render logs for errors
- Monitor MongoDB connection
- Test all API endpoints after deployment

## 🚨 Critical Fixes Applied

**Express Version**: Downgraded from 5.1.0 to 4.18.2 for production stability
**Route Handler**: Fixed 404 handler to be compatible with Express 4.x
**API Paths**: Fixed all client API calls to use `/api/` prefix
**Deployment**: Use `npm start` (not `npm run dev`) for production

## 🧪 Testing Checklist

After deployment, test these endpoints:
- [ ] Root endpoint (`/`)
- [ ] Health check (`/api/health`)
- [ ] Auth endpoints (`/api/auth/*`)
- [ ] Booking endpoints (`/api/bookings/*`)
- [ ] User endpoints (`/api/users/*`)
- [ ] Notification endpoints (`/api/notifications/*`)
- [ ] Payment endpoints (`/api/payments/*`)
