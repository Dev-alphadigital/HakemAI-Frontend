// Utility to sync comparison data from backend to localStorage
import { getUserId } from './auth';

// Use environment variable with fallback to localhost for development
const AI_API_BASE = process.env.NEXT_PUBLIC_FASTAPI_API || 'http://localhost:8000';

/**
 * Fetch comparisons from backend and sync to localStorage
 * Returns the most recent comparison data
 */
export async function syncComparisonsFromBackend(): Promise<any | null> {
    try {
        // Check environment variable
        console.log('🔧 AI_API_BASE:', AI_API_BASE);
        
        // Get user ID
        const userId = getUserId();
        if (!userId) {
            console.error('❌ No user ID found, skipping backend sync');
            
            // Debug: Check what's in localStorage
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('accessToken');
            console.log('🔍 Debug - localStorage user:', userStr ? 'exists' : 'missing');
            console.log('🔍 Debug - localStorage token:', token ? 'exists' : 'missing');
            
            if (userStr) {
                try {
                    const userData = JSON.parse(userStr);
                    console.log('🔍 Debug - User data keys:', Object.keys(userData));
                    console.log('🔍 Debug - Has _id?', '_id' in userData);
                    console.log('🔍 Debug - _id value:', userData._id);
                } catch (e) {
                    console.error('🔍 Debug - Failed to parse user:', e);
                }
            }
            
            return null;
        }

        console.log(`🔄 Fetching comparisons for user: ${userId}`);
        
        const apiUrl = `${AI_API_BASE}/api/comparisons?userId=${userId}`;
        console.log('🌐 API URL:', apiUrl);

        // Fetch from AI module
        const response = await fetch(apiUrl, {
            headers: {
                'X-User-Id': userId,
            },
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            console.error(`❌ Failed to fetch comparisons: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error('❌ Error details:', errorText);
            return null;
        }

        const responseData = await response.json();
        console.log('📦 Raw response data:', responseData);
        
        // Handle both formats: direct array OR wrapped object {comparisons: [...]}
        let comparisons = responseData;
        
        // Check if response is wrapped in an object with 'comparisons' property
        if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
            if ('comparisons' in responseData) {
                comparisons = responseData.comparisons;
                console.log(`📊 Unwrapped comparisons from object: ${comparisons?.length || 0} items`);
            }
        }
        
        console.log(`📊 Final comparisons array: ${Array.isArray(comparisons) ? comparisons.length : 0} items`);

        // If we have comparisons, use the most recent one
        if (comparisons && Array.isArray(comparisons) && comparisons.length > 0) {
            console.log(`✅ Processing ${comparisons.length} comparison(s)`);
            
            // Sort by created_at or timestamp (most recent first)
            comparisons.sort((a: any, b: any) => {
                const timeA = new Date(a.created_at || a.timestamp || 0).getTime();
                const timeB = new Date(b.created_at || b.timestamp || 0).getTime();
                return timeB - timeA; // Most recent first
            });

            const latestComparison = comparisons[0];
            console.log(`🎯 Latest comparison from: ${latestComparison.created_at || latestComparison.timestamp || 'unknown time'}`);
            console.log(`🎯 Latest comparison keys:`, Object.keys(latestComparison));
            
            // The backend returns comparisons where each item IS the comparison data
            // (has provider_cards, summary, etc. at root level)
            // So we use latestComparison directly
            const comparisonData = latestComparison;
            
            // Verify we have the expected structure
            if (!comparisonData.provider_cards && !comparisonData.summary) {
                console.error('❌ Invalid comparison data structure - missing provider_cards and summary');
                console.log('Available keys:', Object.keys(comparisonData));
                return null;
            }
            
            console.log('📋 Provider cards:', comparisonData.provider_cards?.length || 0);
            console.log('📋 Summary ranking:', comparisonData.summary?.ranking?.length || 0);

            // Save to localStorage
            try {
                localStorage.setItem('comparisonResult', JSON.stringify(comparisonData));
                localStorage.setItem('allComparisons', JSON.stringify(comparisons));
                console.log(`✅ Saved to localStorage successfully`);
            } catch (saveError) {
                console.error('❌ Failed to save to localStorage:', saveError);
                return null;
            }

            console.log(`✅ Synced ${comparisons.length} comparison(s) from backend - using latest`);
            return comparisonData;
        }

        console.log('⚠️ No comparisons found in backend');
        return null;
    } catch (error) {
        console.error('❌ Error syncing comparisons from backend:', error);
        console.error('❌ Error type:', error instanceof TypeError ? 'Network/Fetch error' : 'Other error');
        if (error instanceof TypeError) {
            console.error('💡 This usually means:');
            console.error('   1. Server not running on', AI_API_BASE);
            console.error('   2. CORS issue');
            console.error('   3. Network problem');
        }
        return null;
    }
}

/**
 * Load comparison data: ALWAYS fetch from backend first to get latest, then fallback to localStorage
 */
export async function loadComparisonData(): Promise<any | null> {
    try {
        // ALWAYS fetch from backend first to get the latest comparison
        console.log('🔄 Loading comparison: Fetching latest from backend...');
        const backendData = await syncComparisonsFromBackend();

        // If backend has data, use it (it's always the latest)
        if (backendData) {
            console.log('✅ Using latest comparison from backend');
            return backendData;
        }

        // Fallback to localStorage only if backend fails
        console.log('⚠️ Backend fetch failed, trying localStorage...');
        const stored = localStorage.getItem('comparisonResult');
        if (stored && stored !== 'undefined' && stored !== 'null') {
            try {
                console.log('📦 Using cached comparison from localStorage');
                return JSON.parse(stored);
            } catch (parseError) {
                console.error('❌ Failed to parse localStorage data:', parseError);
                console.log('🗑️ Clearing invalid localStorage data');
                localStorage.removeItem('comparisonResult');
            }
        }

        console.log('❌ No comparison data available');
        return null;
    } catch (error) {
        console.error('Error loading comparison data:', error);
        return null;
    }
}

