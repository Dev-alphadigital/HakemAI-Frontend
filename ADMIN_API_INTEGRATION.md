# Admin Portal API Integration

This document describes the complete integration of the admin portal frontend with the backend APIs.

## Overview

All admin portal APIs have been successfully connected to enable full admin functionality including:
- Admin authentication and login
- View and manage all users
- Assign subscription plans
- Activate/Deactivate accounts
- Freeze/Unfreeze accounts
- View and download payment proofs
- View payment history
- Statistics dashboard

## Files Created/Modified

### New Files Created

1. **`src/app/lib/adminApi.ts`**
   - Complete API service for all admin endpoints
   - Type definitions for all data structures
   - Helper functions for token management
   - All CRUD operations for user management

2. **`src/context/AdminAuthContext.tsx`**
   - Admin authentication context provider
   - Manages admin login state
   - Handles admin logout
   - Provides authentication status

3. **`ADMIN_API_INTEGRATION.md`** (this file)
   - Complete documentation of the integration

### Modified Files

1. **`src/app/admin/login/page.tsx`**
   - Connected to admin login API
   - Error handling for failed logins
   - Loading states
   - Redirect to dashboard on success

2. **`src/app/admin/dashboard/page.tsx`**
   - Fetches all users from API
   - Displays statistics (total, active, pending, frozen users)
   - Loading states and error handling
   - Authentication checks and redirects

3. **`src/app/admin/payment-history/page.tsx`**
   - Fetches payment proofs for all users or specific user
   - Supports query parameter for user-specific history
   - Loading and error states

4. **`src/components/Admin/DashboardTable.tsx`**
   - Integrated all user management actions:
     - Assign/change subscription plans
     - Freeze/unfreeze accounts
     - Download payment proofs
     - View payment history
   - Real-time UI updates after actions
   - Proper status display (ACTIVE, FROZEN, PENDING)

5. **`src/components/Admin/DashboardCard.tsx`**
   - Mobile-responsive version of DashboardTable
   - All the same functionality for mobile devices

6. **`src/components/Admin/AdminTopbar.tsx`**
   - Displays logged-in admin information
   - Logout functionality
   - Dropdown menu for admin actions

7. **`src/app/layout.tsx`**
   - Wrapped app with AdminAuthProvider
   - Enables admin auth context throughout the app

## API Endpoints Connected

### Authentication
- **POST** `/admin/login` - Admin login with email and password

### User Management
- **GET** `/admin/allusers` - Get all users
- **GET** `/admin/pending-users` - Get users with pending payment proofs
- **GET** `/admin/users/:id` - Get specific user details
- **GET** `/admin/statistics` - Get user statistics

### Account Actions
- **POST** `/admin/users/:id/activate` - Activate user account
- **POST** `/admin/users/:id/assign-plan` - Assign subscription plan
- **POST** `/admin/users/:id/freeze` - Freeze user account
- **POST** `/admin/users/:id/unfreeze` - Unfreeze user account

### Payment Proofs
- **GET** `/admin/users/:id/payment-proof` - Get payment proof details
- **GET** `/admin/users/:id/payment-proof/download` - Download payment proof file

## Subscription Plans

The system supports three subscription plans:
- **Starter** - starter (SAR 599/month)
- **Professional** - professional (SAR 999/month)
- **Premium/Enterprise** - enterprise (SAR 1,875/month)

## Features Implemented

### 1. Admin Login
- Email and password authentication
- JWT token storage in localStorage
- Error messages for failed login
- Automatic redirect to dashboard on success
- Loading states during authentication

### 2. Dashboard
- **Statistics Cards**:
  - Total Users count
  - Active Users count
  - Pending Users count
  - Frozen Users count

- **User Management Table/Cards**:
  - Display all users with details
  - User information: name, email, phone, plan, status, join date
  - Action menu for each user (three dots menu)

### 3. User Actions

#### Assign/Change Plan
- Dropdown with plan options:
  - No access
  - Starter – SAR 599
  - Professional – SAR 999
  - Premium – SAR 1,875
- Real-time plan assignment
- UI updates after successful assignment

#### Freeze/Unfreeze Account
- Freeze account modal with confirmation
- Unfreeze option for frozen accounts
- Status changes reflect immediately
- Visual status indicators (color-coded badges)

#### Payment Proofs
- View payment proof link for each user
- Download payment proof as file
- Opens payment history for specific user

#### Payment History
- View all payment proofs
- Filter by specific user (via query parameter)
- Display payment status and details

### 4. Admin Topbar
- Display admin name and email
- Profile dropdown with:
  - Admin details
  - Logout button
- Logo click returns to dashboard

### 5. Authentication & Security
- JWT token-based authentication
- Protected routes (redirects to login if not authenticated)
- Token stored in localStorage as `adminAccessToken`
- Automatic logout on unauthorized requests

## Usage Flow

### Admin Login Flow
1. Admin navigates to `/admin/login`
2. Enters email and password
3. System validates credentials with backend
4. On success:
   - JWT token saved to localStorage
   - Admin data stored in context
   - Redirects to `/admin/dashboard`
5. On failure:
   - Error message displayed
   - User can retry

### User Management Flow
1. Admin views dashboard with all users
2. Clicks three-dot menu on any user
3. Available actions:
   - **Access**: Assign/change subscription plan
   - **Payment History**: View user's payment history
   - **Download Receipt**: Download payment proof
   - **Freeze/Unfreeze**: Toggle account status
4. After any action:
   - API call is made
   - On success: UI refreshes with updated data
   - On failure: Error message displayed

### Logout Flow
1. Click admin profile in topbar
2. Click "Logout" in dropdown
3. Token removed from localStorage
4. Admin context cleared
5. Redirects to `/admin/login`

## Data Structures

### User Object
```typescript
interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: string;
    isActive: boolean;
    accountStatus: string; // 'ACTIVE', 'FROZEN', 'PENDING'
    subscription?: {
        plan: string;
        status: string;
        startDate?: string;
        endDate?: string;
    };
    createdAt: string;
    updatedAt: string;
}
```

### Statistics Object
```typescript
interface Statistics {
    totalUsers: number;
    activeUsers: number;
    pendingUsers: number;
    frozenUsers: number;
    totalRevenue?: number;
}
```

### Admin User Object
```typescript
interface AdminUser {
    _id: string;
    username: string;
    email: string;
    role: string;
}
```

## Error Handling

- All API calls wrapped in try-catch blocks
- User-friendly error messages displayed
- 401 errors trigger redirect to login
- Network errors show appropriate messages
- Loading states prevent duplicate requests

## Responsive Design

- Desktop: Table view with full details
- Mobile/Tablet: Card view with compact layout
- Both views have full functionality
- Dropdowns adjust position based on viewport

## Testing Checklist

- [ ] Admin can login with valid credentials
- [ ] Invalid credentials show error message
- [ ] Dashboard loads all users
- [ ] Statistics display correctly
- [ ] Can assign starter plan to user
- [ ] Can assign professional plan to user
- [ ] Can assign premium plan to user
- [ ] Can freeze active account
- [ ] Can unfreeze frozen account
- [ ] Can download payment proof
- [ ] Payment history page loads
- [ ] Can view specific user's payment history
- [ ] Logout works and redirects to login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Mobile responsive layout works

## Configuration

### API Base URL
Current: `http://localhost:5000/api`

To change, update in `src/app/lib/adminApi.ts`:
```typescript
export const API_BASE = "http://localhost:5000/api";
```

### Token Storage
Token key: `adminAccessToken`
Storage: `localStorage`

## Next Steps / Future Enhancements

1. Add search/filter functionality for users
2. Implement pagination for large user lists
3. Add export functionality (CSV/Excel)
4. Add bulk actions (freeze multiple accounts)
5. Add audit logs for admin actions
6. Add more detailed payment history
7. Add revenue analytics and charts
8. Add email notifications for admin actions

## Support

For issues or questions, refer to:
- Backend API documentation in `Backend/BACKEND_FLOW_DOCUMENTATION.md`
- Admin controller: `Backend/src/admin/admin.controller.ts`
- Admin service: `Backend/src/admin/admin.service.ts`

## Notes

- The backend uses lowercase plan names: 'starter', 'professional', 'enterprise'
- The UI displays 'Premium' for the 'enterprise' plan
- All dates are formatted to locale format for display
- Status badges are color-coded: green (active), red (frozen), yellow (pending)


