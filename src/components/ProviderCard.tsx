"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProviderCardProps {
    name: string;
    score: string;
    premium: string;
    rate: string;
    active?: boolean;

    strengths?: string[];
    warranties?: string[];
    subjectivities?: string[];
}

export default function ProviderCard({
    name,
    score,
    premium,
    rate,
    active = false,
    strengths = [],
    warranties = [],
    subjectivities = [],
}: ProviderCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`relative rounded-2xl p-4 transition-all duration-200 ${active
                    ? "border border-[#04786b] bg-[#e6f3e9]/60 shadow-sm"
                    : "bg-[#eff4f1]"
                } lg:bg-white lg:border-x lg:border-t lg:border-gray-200 lg:rounded-none lg:p-0`}
        >
            {/* ✅ Recommended badge */}
            {active && (
                <div className="absolute -top-3 -right-4 w-10 h-10">
                    <Image
                        src="/images/recommended-badge.svg"
                        alt="Recommended Badge"
                        width={30}
                        height={30}
                        className="object-contain"
                        priority
                    />
                </div>
            )}

            {/* 📱 MOBILE VIEW */}
            <div className="block lg:hidden">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300" />
                    <h3 className="text-base md:text-lg font-bold text-gray-800">{name}</h3>
                </div>

                <div className="text-sm md:text-base space-y-2">
                    <div><strong>Score:</strong> <span className="text-[#3c978c]">{score}</span></div>
                    <div><strong>Premium:</strong> <span className="text-[#3c978c]">{premium}</span></div>
                    <div><strong>Rate:</strong> <span className="text-[#3c978c]">{rate}</span></div>
                </div>
            </div>

            {/* 🖥️ DESKTOP VIEW */}
            <div className="hidden lg:block border-b border-gray-200">
                <div
                    className={`flex items-center justify-between py-4 px-6 cursor-pointer ${active
                            ? "border-l-4 border-[#04786b] bg-[#e6f3e9]/40"
                            : "border-l-4 border-transparent hover:bg-gray-50"
                        }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 w-[25%]">
                        <div className="w-6 h-6 rounded-full bg-gray-300" />
                        <span className={`font-semibold ${active ? "text-[#04786b]" : "text-gray-800"}`}>
                            {name}
                        </span>
                    </div>

                    <p className="w-[15%] font-semibold">{score}</p>
                    <p className="w-[25%] font-semibold">{premium}</p>
                    <p className="w-[15%] font-semibold">{rate}</p>

                    <div className="w-[10%] text-right">
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </div>

                {/* 🔽 Expanded Section */}
                {isExpanded && (
                    <div className="px-10 pb-6 pt-3 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-4">

                        {strengths.length > 0 && (
                            <div>
                                <h4 className="font-bold">Strengths:</h4>
                                <ul className="list-disc ml-6 mt-1">
                                    {strengths.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {warranties.length > 0 && (
                            <div>
                                <h4 className="font-bold">Warranties:</h4>
                                <ul className="list-disc ml-6 mt-1">
                                    {warranties.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {subjectivities.length > 0 && (
                            <div>
                                <h4 className="font-bold">Subjectivities:</h4>
                                <ul className="list-disc ml-6 mt-1">
                                    {subjectivities.map((item: string, index: number) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
