"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProviderCardProps {
    name: string;
    score: string;
    premium: string;
    rate: string;
    active?: boolean; // for showing the recommended badge
}

export default function ProviderCard({
    name,
    score,
    premium,
    rate,
    active = false,
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

            {/* ===== MOBILE CARD DESIGN (unchanged) ===== */}
            <div className="block lg:hidden">
                {/* Top Row */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full bg-gray-300" />
                    <h3 className="text-base md:text-lg font-bold text-gray-800">{name}</h3>
                </div>

                {/* Details */}
                <div className="text-sm md:text-base mt-1 space-y-2">
                    <div className="flex">
                        <p className="text-black font-bold">Score:</p>
                        <p className="text-[#3c978c] font-semibold ml-1">{score}</p>
                    </div>
                    <div className="flex">
                        <p className="text-black font-bold">Premium:</p>
                        <p className="text-[#3c978c] font-semibold ml-1">{premium}</p>
                    </div>
                    <div className="flex">
                        <p className="text-black font-bold">Rate:</p>
                        <p className="text-[#3c978c] font-semibold ml-1">{rate}</p>
                    </div>
                </div>
            </div>

            {/* ===== DESKTOP TABLE STYLE ===== */}
            <div className="hidden lg:block border-b-1 border-gray-200">
                {/* Row */}
                <div
                    className={`flex items-center justify-between py-4 px-6 cursor-pointer transition-all duration-200
      ${active
                            ? "border-l-4 border-[#04786b] bg-[#e6f3e9]/40"
                            : "border-l-4 border-transparent hover:bg-gray-50"
                        }`}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3 w-[25%]">
                        <div className="w-6 h-6 rounded-full bg-gray-300" />
                        <span
                            className={`font-semibold ${active ? "text-[#04786b]" : "text-gray-800"}`}
                        >
                            {name}
                        </span>
                    </div>
                    <p className={`w-[15%] font-semibold ${active ? "text-[#04786b]" : "text-gray-700"}`}>{score}</p>
                    <p className={`w-[25%] font-semibold ${active ? "text-[#04786b]" : "text-gray-700"}`}>{premium}</p>
                    <p className={`w-[15%] font-semibold ${active ? "text-[#04786b]" : "text-gray-700"}`}>{rate}</p>
                    <div className="w-[10%] flex justify-end text-gray-500">
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </div>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                    <div className="px-10 pb-6 pt-2 bg-white border-t border-gray-200 text-sm text-gray-700 space-y-3 animate-fadeIn">
                        <p>
                            <span className="font-semibold">Recommendation:</span>{" "}
                            <span className="text-[#04786b] font-medium">Recommended</span>
                        </p>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">Strengths:</h4>
                            <ul className="list-disc ml-6 text-gray-600 space-y-1">
                                <li>Competitive pricing</li>
                                <li>Excellent coverage amount</li>
                                <li>Favorable deductible</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">Warranties:</h4>
                            <ul className="list-disc ml-6 text-gray-600 space-y-1">
                                <li>Gas warranty</li>
                                <li>Sprinkler Warranty</li>
                                <li>Civil Defense coverage</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-gray-800 mb-1">
                                Subjectivities (Conditions to bind cover):
                            </h4>
                            <ul className="list-disc ml-6 text-gray-600 space-y-1">
                                <li>No combustible cladding on the building facades</li>
                                <li>5 working days prior notice to bind cover</li>
                                <li>
                                    Subject to receiving the fully completed KYC Form and documents
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}