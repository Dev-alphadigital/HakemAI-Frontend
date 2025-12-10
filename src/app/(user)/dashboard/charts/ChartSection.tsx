"use client";
import { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { loadComparisonData } from "@/utils/comparisonSync";

export default function ChartSection() {
    const [providers, setProviders] = useState<string[]>([]);
    const [premiums, setPremiums] = useState<number[]>([]);
    const [rates, setRates] = useState<number[]>([]);
    const [scores, setScores] = useState<number[]>([]);

    useEffect(() => {
        const loadChartData = async () => {
            try {
                const result = await loadComparisonData();
                if (!result || !result.provider_cards) return;

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
            } catch (err) {
                console.error("Error loading chart data:", err);
            }
        };

        loadChartData();
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
