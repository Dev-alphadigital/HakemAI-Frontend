// hooks/useComparison.ts
import { useEffect, useState } from "react";
import { getUserId } from "@/utils/auth";

export function useComparison() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const AI_API_BASE = process.env.NEXT_PUBLIC_FASTAPI_API || "http://localhost:8000";

    useEffect(() => {
        const loadComparison = async () => {
            try {
                // First, try to get from localStorage
                const stored = localStorage.getItem("comparisonResult");
                if (stored) {
                    setData(JSON.parse(stored));
                }

                // Then, fetch from backend (for sub-users or to get latest data)
                const userId = getUserId();
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${AI_API_BASE}/api/comparisons?userId=${userId}`, {
                    headers: {
                        "X-User-Id": userId,
                    },
                });

                if (response.ok) {
                    const comparisons = await response.json();

                    // If we have comparisons from backend, use the most recent one
                    if (comparisons && comparisons.length > 0) {
                        // Sort by timestamp (most recent first)
                        comparisons.sort((a: any, b: any) => {
                            return new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime();
                        });

                        const latestComparison = comparisons[0];

                        // Save to localStorage for faster subsequent loads
                        localStorage.setItem("comparisonResult", JSON.stringify(latestComparison.comparison_data));
                        localStorage.setItem("allComparisons", JSON.stringify(comparisons));

                        setData(latestComparison.comparison_data);
                    }
                }
            } catch (err) {
                console.error("Error loading comparisons:", err);
            } finally {
                setLoading(false);
            }
        };

        loadComparison();
    }, []);

    return { data, loading };
}
