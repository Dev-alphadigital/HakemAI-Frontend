"use client";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface BarChartProps {
    title: string;
    labels: string[];
    data: number[];
    color?: string;
}

export default function BarChart({ title, labels, data, color = "#04786b" }: BarChartProps) {
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                backgroundColor: color,
                borderRadius: 8,
                barThickness: 40,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: { beginAtZero: true, ticks: { color: "#555" } },
            x: { ticks: { color: "#555" } },
        },
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}
