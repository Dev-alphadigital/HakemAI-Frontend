"use client";
import BarChart from "./BarChart";

export default function ChartSection() {
    const providers = ["Provider 1", "Provider 2", "Provider 3", "Provider 4"];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <BarChart title="Premium Comparison (PKR)" labels={providers} data={[516335, 498000, 525100, 590324]} color="#FFD54F" />
            <BarChart title="Rate Comparison (%)" labels={providers} data={[0.33, 0.35, 0.31, 0.37]} color="#1B7F5C" />
            <BarChart title="Score Comparison (%)" labels={providers} data={[77, 72, 80, 83]} color="#4ADE80" />
        </div>
    );
}
