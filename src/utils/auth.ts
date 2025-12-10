// Utility functions for authentication

/**
 * Decode JWT token to get user ID
 * @param token - JWT access token
 * @returns User ID from token payload
 */
export function getUserIdFromToken(token: string): string | null {
    try {
        // JWT structure: header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        // Decode the payload (base64url)
        const payload = parts[1];
        const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));

        // Return user ID from 'sub' claim (standard JWT claim for subject/user ID)
        return decoded.sub || decoded.userId || decoded._id || null;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

/**
 * Get user ID from localStorage user object or JWT token
 * @returns User ID
 */
export function getUserId(): string | null {
    try {
        // First, try to get from user object in localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user._id) return user._id;
        }

        // Fallback: decode from JWT token
        const token = localStorage.getItem('accessToken');
        if (token) {
            return getUserIdFromToken(token);
        }

        return null;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return null;
    }
}

