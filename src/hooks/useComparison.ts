// hooks/useComparison.ts
import { useEffect, useState } from "react";

export function useComparison() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem("comparisonResult");
        if (!stored) return;

        setData(JSON.parse(stored));
    }, []);

    return data;
}
