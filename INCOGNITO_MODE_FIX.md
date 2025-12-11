# Incognito Mode Fix - Sub-User Comparison Loading ✅

## 🐛 The Root Cause

**Mismatch between backend response and frontend expectations:**

### Backend (NestJS):
- **Login endpoint** (`/api/auth/login`) returns: `user.id` ✅
- **Profile endpoint** (`/api/auth/profile`) returns: `user._id` ✅

### Frontend (before fix):
- `getUserId()` utility **only checked** `user._id` ❌
- This worked in the same browser window (because profile data was cached)
- **Failed in incognito mode** because only login data was available initially

---

## ✅ What Was Fixed

### 1. **User ID Extraction** (`src/utils/auth.ts`)
**Before:**
```typescript
if (user._id) return user._id; // Only checked _id
```

**After:**
```typescript
if (user._id) return user._id; // Check _id first (from profile)
if (user.id) return user.id;   // Fallback to id (from login)
```

### 2. **User Interface** (`src/context/AuthContext.tsx`)
**Before:**
```typescript
interface User {
    _id: string;  // Required - would fail if missing
    // ...
}
```

**After:**
```typescript
interface User {
    _id?: string;  // Optional - from profile endpoint
    id?: string;   // Optional - from login endpoint
    // ...
}
```

### 3. **Enhanced Debug Logging** (`src/utils/comparisonSync.ts`)
Added extensive logging to help debug issues:
```typescript
console.log('🔍 Debug - localStorage user:', userStr ? 'exists' : 'missing');
console.log('🔍 Debug - User data keys:', Object.keys(userData));
console.log('🔍 Debug - Has _id?', '_id' in userData);
```

---

## 🧪 How to Test (CRITICAL!)

### Prerequisites:
1. **Stop and restart all servers:**
   ```bash
   # Backend (Terminal 1)
   cd C:\Users\Admin\Desktop\workspace\HakemAi-Backend
   # Stop with Ctrl+C if running
   npm run start:dev
   
   # AI Module (Terminal 2)
   cd C:\Users\Admin\Music\HakimAI-AIModule
   # Stop with Ctrl+C if running
   python main.py
   
   # Frontend (Terminal 3 - MUST RESTART!)
   cd C:\Users\Admin\Desktop\workspace\HakemAI-Frontend
   # Stop with Ctrl+C
   npm run dev
   ```

2. **Verify Environment Variables:**
   Check `C:\Users\Admin\Desktop\workspace\HakemAI-Frontend\.env`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   NEXT_PUBLIC_FASTAPI_API=http://localhost:8000
   ```

---

### Test Scenario 1: Normal Browser (Baseline)

1. **Open Chrome (normal mode)**
2. Go to `http://localhost:3000`
3. Login as **main account** (muneeba)
4. Generate a comparison (upload 2-3 PDFs)
5. Verify comparison displays correctly
6. **Keep this window open for reference**

---

### Test Scenario 2: Incognito Mode (The Fix!)

1. **Open Chrome Incognito** (`Ctrl + Shift + N`)
2. Go to `http://localhost:3000`
3. Login as **sub-user** (team member email)
4. **Open Browser Console** (`F12` → Console tab)

**Expected Console Output:**
```
🔧 AI_API_BASE: http://localhost:8000
🔄 Fetching comparisons for user: {userId}
🌐 API URL: http://localhost:8000/api/comparisons?userId={userId}
📡 Response status: 200
📦 Raw response data: {success: true, count: 1, comparisons: Array(1)}
📊 Unwrapped comparisons from object: 1 items
📊 Final comparisons array: 1 items
✅ Processing 1 comparison(s)
🎯 Latest comparison from: 2025-12-11T...
✅ Saved to localStorage successfully
✅ Synced 1 comparison(s) from backend - using latest
✅ Using latest comparison from backend
```

**Expected Dashboard Display:**
- ✅ Blue banner: "Team Member View"
- ✅ Providers section with recommended provider card
- ✅ Comparison tabs with data (Summary, Key Differences, etc.)
- ✅ All comparison data loads correctly

---

### Test Scenario 3: Different Browser

1. **Open Firefox / Edge / Safari**
2. Go to `http://localhost:3000`
3. Login as **sub-user**
4. Same behavior as incognito mode should work ✅

---

## ❌ Troubleshooting Guide

### Issue 1: "❌ No user ID found, skipping backend sync"

**Console will show:**
```
❌ No user ID found, skipping backend sync
🔍 Debug - localStorage user: exists
🔍 Debug - User data keys: ["username", "email", "phoneNumber", "role", ...]
🔍 Debug - Has _id? false
🔍 Debug - _id value: undefined
```

**Solution:**
1. Check if `id` is in the user data keys
2. If YES → Frontend fix is working, but check if backend is returning `id`
3. If NO → Backend not returning user ID properly

**Fix:**
```bash
# Restart frontend to load the updated code
cd C:\Users\Admin\Desktop\workspace\HakemAI-Frontend
# Ctrl+C to stop
npm run dev
```

---

### Issue 2: "📡 Response status: 404" or "Failed to fetch"

**Possible Causes:**
- AI Module not running
- Wrong `NEXT_PUBLIC_FASTAPI_API` in `.env`
- CORS issue

**Solution:**
```bash
# 1. Check AI Module is running
cd C:\Users\Admin\Music\HakimAI-AIModule
python main.py

# 2. Check the URL in console output
# Should show: 🔧 AI_API_BASE: http://localhost:8000

# 3. Test the endpoint manually
curl http://localhost:8000/api/health
# Should return: {"status":"healthy",...}
```

---

### Issue 3: "⚠️ No comparisons found in backend"

**Console shows:**
```
📡 Response status: 200
📦 Raw response data: {success: true, count: 0, comparisons: []}
⚠️ No comparisons found in backend
```

**Possible Causes:**
- No comparison generated by main account yet
- Sub-user's `companyId` not set correctly
- Comparison not saved with `company_id`

**Solution:**

1. **Check Sub-User Document in MongoDB:**
   ```javascript
   // MongoDB Compass or Shell
   db.users.findOne({ email: "subuser@example.com" })
   
   // Should have:
   {
     "_id": ObjectId("..."),
     "isSubUser": true,
     "companyId": ObjectId("..."),  // <-- Must be present!
     "accountStatus": "active"
   }
   ```

2. **Check Comparison Document:**
   ```javascript
   // Find company from main user
   db.users.findOne({ email: "muneeba@example.com" })
   // Note the _id, then find their company
   
   db.companies.findOne({ createdBy: ObjectId("{mainUserId}") })
   // Note the _id of the company
   
   // Now check if comparison has this company_id
   db.comparisons.find({ company_id: "{companyId}" })
   
   // Should return at least 1 comparison with:
   {
     "_id": ObjectId("..."),
     "comparison_id": "...",
     "user_id": "{mainUserId}",
     "company_id": "{companyId}",  // <-- Must match!
     "comparison_data": { ... },
     "created_at": ISODate("...")
   }
   ```

3. **If companyId is missing from sub-user:**
   ```bash
   # Re-add the team member
   # 1. Remove from team in UI
   # 2. Add back to team
   # This will set companyId correctly
   ```

---

### Issue 4: Still shows "Loading comparison..."

**Possible Causes:**
- Comparison data structure mismatch
- localStorage cache issue
- Race condition (dashboard loads before user data)

**Solution:**

1. **Clear browser cache and localStorage:**
   - Open Console (`F12`)
   - Go to Application tab
   - Clear Storage → Clear site data
   - Refresh page

2. **Check if data is in localStorage:**
   ```javascript
   // In browser console
   localStorage.getItem('comparisonResult')
   // Should return a JSON string with comparison data
   ```

3. **Force refresh:**
   - Click the "Refresh Now" button on dashboard
   - Or wait 30 seconds for auto-refresh

---

## 🔍 Debug Checklist

Use this checklist when testing in incognito/different browser:

- [ ] All 3 servers running (Backend, AI Module, Frontend)
- [ ] Frontend restarted after code changes
- [ ] Environment variables configured correctly
- [ ] Main account has generated at least 1 comparison
- [ ] Sub-user added to team (shows in team list)
- [ ] Sub-user logged out and logged in again (fresh session)
- [ ] Browser console open to check logs
- [ ] Network tab open to check API calls

---

## 📝 Files Changed (Summary)

| File | Change | Reason |
|------|--------|--------|
| `src/utils/auth.ts` | Check both `user.id` and `user._id` | Backend returns different fields |
| `src/context/AuthContext.tsx` | Make `_id` and `id` optional | Support both login and profile responses |
| `src/utils/comparisonSync.ts` | Add debug logging | Help troubleshoot issues |

---

## ✅ Success Criteria

**After this fix, sub-users should be able to:**

1. ✅ Login in **incognito mode**
2. ✅ Login in **different browser**
3. ✅ See comparisons generated by main account
4. ✅ Auto-refresh works (every 30 seconds)
5. ✅ Manual refresh works ("Refresh Now" button)
6. ✅ No console errors
7. ✅ localStorage properly populated with comparison data

---

## 🚀 Next Steps After Testing

1. **If it works:** Great! Mark this as resolved.
2. **If it still doesn't work:**
   - Copy the **full console output** (from browser console)
   - Check **Network tab** for failed API calls
   - Run the **MongoDB queries** above to verify data
   - Share the debug output for further investigation

---

**Last Updated:** December 11, 2025  
**Status:** ✅ Fixed and ready for testing  
**Critical:** Must restart frontend server after applying these changes!

