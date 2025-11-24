# Admin Portal Troubleshooting Guide

## Common Issues and Solutions

### 1. "users.map is not a function" Error

**Cause:** The API response is not in the expected format or the request failed.

**Solutions:**
- ✅ **Fixed**: Updated API handlers to ensure `users` is always an array
- Ensure the backend is running at `http://localhost:5000`
- Check browser console for API error messages

### 2. "Login error: {}" or Login Fails

**Cause:** Cannot connect to backend or invalid credentials.

**Solutions:**

#### Check Backend is Running
```bash
# Navigate to backend directory
cd C:\Users\Admin\Downloads\Backend

# Install dependencies (if not done)
npm install

# Start the backend server
npm run start:dev
```

The backend should start at `http://localhost:5000`

#### Verify Admin Credentials
**Default Admin Login:**
- Email: `info@hakem.ai`
- Password: `Admin123!`

#### Check CORS Configuration
If you see CORS errors in the console, ensure the backend's CORS settings allow requests from `http://localhost:3000` (or wherever your frontend is running).

The backend should already have CORS configured in `src/main.ts`.

### 3. Network Connection Errors

**Error Message:** "Cannot connect to server"

**Solutions:**

1. **Verify Backend is Running:**
   - Open `http://localhost:5000/api` in your browser
   - You should see the Swagger API documentation

2. **Check Backend Port:**
   - Default backend port is `5000`
   - If it's running on a different port, update `API_BASE` in:
     - `HakemAI-Frontend/src/app/lib/adminApi.ts`
   ```typescript
   export const API_BASE = "http://localhost:YOUR_PORT/api";
   ```

3. **Check Firewall/Antivirus:**
   - Some security software may block local connections
   - Temporarily disable to test

### 4. Authentication Errors (401 Unauthorized)

**Solutions:**

1. **Clear Browser Storage:**
   - Open DevTools (F12)
   - Go to Application → Local Storage
   - Delete `adminAccessToken`
   - Try logging in again

2. **Verify Token:**
   - Check if token is being saved correctly
   - Open DevTools Console and run:
   ```javascript
   localStorage.getItem('adminAccessToken')
   ```

3. **Backend Admin User:**
   - The admin user is automatically created on first backend startup
   - Check backend logs to confirm admin creation

### 5. Empty Dashboard / No Users Showing

**Solutions:**

1. **Check API Response:**
   - Open DevTools → Network tab
   - Look for the `/admin/allusers` request
   - Check the response format

2. **Expected Response Format:**
   The backend should return an array of users:
   ```json
   [
     {
       "_id": "...",
       "username": "...",
       "email": "...",
       "phoneNumber": "...",
       "role": "...",
       "isActive": true,
       "accountStatus": "ACTIVE",
       "subscription": {...},
       "createdAt": "...",
       "updatedAt": "..."
     }
   ]
   ```

3. **If No Users Exist:**
   - Create a test user via the signup page
   - Then login as admin to manage them

## Quick Start Guide

### Starting Everything

1. **Start Backend:**
   ```bash
   cd C:\Users\Admin\Downloads\Backend
   npm install  # First time only
   npm run start:dev
   ```
   Wait for message: "Application is running on: http://localhost:5000"

2. **Start Frontend:**
   ```bash
   cd C:\Users\Admin\Downloads\HakemAI-Frontend
   npm install  # First time only
   npm run dev
   ```
   Wait for message: "Local: http://localhost:3000"

3. **Access Admin Portal:**
   - Navigate to: `http://localhost:3000/admin/login`
   - Login with:
     - Email: `info@hakem.ai`
     - Password: `Admin123!`

## Debugging Tips

### Enable Detailed Logging

Add this to your browser console before logging in:
```javascript
localStorage.setItem('debug', 'admin:*');
```

### Check API Calls

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "XHR" or "Fetch"
4. Perform the action (login, fetch users, etc.)
5. Click on the request to see:
   - Request headers
   - Response body
   - Status code

### Common Console Commands

```javascript
// Check if admin is logged in
localStorage.getItem('adminAccessToken')

// Clear admin session
localStorage.removeItem('adminAccessToken')

// Test API connection
fetch('http://localhost:5000/api/admin/statistics', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('adminAccessToken')
  }
}).then(r => r.json()).then(console.log)
```

## Still Having Issues?

### Check These Files

1. **Backend Configuration:**
   - `Backend/.env` - Environment variables
   - `Backend/src/main.ts` - CORS and server config
   - `Backend/src/admin/admin-auth.service.ts` - Admin creation logic

2. **Frontend Configuration:**
   - `HakemAI-Frontend/src/app/lib/adminApi.ts` - API base URL
   - Browser console for error messages

### Error Logs Location

- **Backend Logs:** Console where you run `npm run start:dev`
- **Frontend Logs:** Browser DevTools Console (F12)

## Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/hakem-ai

# JWT
JWT_SECRET=your-secret-key-change-in-production

# Admin Credentials (Optional - defaults shown)
ADMIN_EMAIL=info@hakem.ai
ADMIN_PASSWORD=Admin123!
ADMIN_USERNAME=admin

# Server
PORT=5000

# Frontend URL for CORS
FRONTEND_URL=http://localhost:3000
```

### Frontend
The frontend connects to `http://localhost:5000/api` by default.
Change in `src/app/lib/adminApi.ts` if needed.

## Contact

If issues persist:
1. Check the backend logs for detailed error messages
2. Check browser console for frontend errors
3. Ensure MongoDB is running if required
4. Verify all npm packages are installed correctly

