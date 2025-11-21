// "use client";
// import BarChart from "./BarChart";

// export default function ChartSection() {
//     const providers = ["Provider 1", "Provider 2", "Provider 3", "Provider 4"];

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//             <BarChart title="Premium Comparison (PKR)" labels={providers} data={[516335, 498000, 525100, 590324]} color="#FFD54F" />
//             <BarChart title="Rate Comparison (%)" labels={providers} data={[0.33, 0.35, 0.31, 0.37]} color="#1B7F5C" />
//             <BarChart title="Score Comparison (%)" labels={providers} data={[77, 72, 80, 83]} color="#4ADE80" />
//         </div>
//     );
// }
"use client";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";

export default function ChartSection() {
    const [providers, setProviders] = useState<string[]>([]);
    const [premiums, setPremiums] = useState<number[]>([]);
    const [rates, setRates] = useState<number[]>([]);
    const [scores, setScores] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("comparisonResult");
        if (!stored) return;

        const result = JSON.parse(stored);

        if (!result.provider_cards) return;

        const names = result.provider_cards.map((p: any) => p.provider_name);

        const premiumValues = result.provider_cards.map((p: any) =>
            parseFloat(
                p.premium
                    .replace("SAR", "")
                    .replace(/,/g, "")
                    .trim()
            )
        );

        const rateValues = result.provider_cards.map((p: any) =>
            parseFloat(p.rate.replace("‰", ""))
        );

        const scoreValues = result.provider_cards.map((p: any) =>
            parseFloat(p.score)
        );

        setProviders(names);
        setPremiums(premiumValues);
        setRates(rateValues);
        setScores(scoreValues);
    }, []);

    if (providers.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <BarChart
                title="Premium Comparison (SAR)"
                labels={providers}
                data={premiums}
                color="#FFD54F"
            />

            <BarChart
                title="Rate Comparison (%)"
                labels={providers}
                data={rates}
                color="#1B7F5C"
            />

            <BarChart
                title="Score Comparison (%)"
                labels={providers}
                data={scores}
                color="#4ADE80"
            />
        </div>
    );
}
