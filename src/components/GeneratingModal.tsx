"use client";

import { useEffect, useState } from "react";

interface Props {
    onCancel: () => void;
    onComplete: () => void;
}

export default function GeneratingModal({ onCancel, onComplete }: Props) {
    const messages = [
        "🧠 AI thinking...",
        "⚡ Smart analysis...",
        "🤖 Robot brain working...",
        "💡 Intelligence loading...",
        "✨ AI magic happening...",
        "📊 Crunching insurance data...",
        "🔍 Deep scanning your quotes...",
        "🧬 Analyzing hidden patterns...",
        "🚀 Optimizing comparison engine...",
        "🛰️ Connecting to AI core...",
        "📡 Reading policy fine print...",
        "🔐 Securing your data...",
        "🧩 Piecing together insights...",
        "📈 Evaluating premium vs coverage...",
        "🗂️ Sorting provider details...",
        "📚 Learning from policy structures...",
        "🧠 Neural networks processing...",
        "🛠️ Refining recommendation model...",
        "💫 Finalizing intelligent output...",
        "📊 Generating beautiful charts..."
    ];

    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setCurrentMessage(messages[index]);
        }, 3500); // change every 3.5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#333333] rounded-2xl p-10 text-center w-[420px] shadow-xl">

                {/* Spinner */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 border-4 border-gray-600 border-t-yellow-400 rounded-full animate-spin"></div>
                </div>

                <h2 className="text-white text-lg font-semibold mb-2">
                    Your AI is Generating Results
                </h2>

                <p className="text-gray-400 text-sm mb-6">
                    This may take a few moments. Your comparison will be ready soon.
                </p>

                <div className="text-yellow-400 font-medium text-base mb-6 animate-pulse">
                    {currentMessage}
                </div>
            </div>
        </div>
    );
}