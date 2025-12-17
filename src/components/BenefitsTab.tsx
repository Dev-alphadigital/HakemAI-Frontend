"use client";

import { useState } from "react";
import Image from "next/image";

export default function BenefitsTab({ data }: { data: any[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {data.map((provider, index) => (
                <div
                    key={provider.name}
                    className={`relative p-2 transition-all cursor-pointer
            ${provider.active
                            ? "border-l-4 border-[#04786b] bg-[#f0faf6]"
                            : "border border-gray-200 bg-white"
                        }`}
                >
                    {/* ✅ Recommended badge */}
                    {provider.active && (
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

                    {/* Header */}
                    <button
                        className="w-full cursor-pointer flex items-center justify-between text-left"
                        onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    >
                        <div>
                            <h3
                                className={`font-semibold ${provider.active ? "text-[#04786b]" : "text-gray-900"
                                    }`}
                            >
                                {provider.name}
                            </h3>
                            <p className="text-sm text-gray-500 cursor-pointer">
                                {provider.benefits.length} benefits included
                            </p>
                        </div>

                        <span className="text-xl cursor-pointer">
                            {openIndex === index ? "−" : "+"}
                        </span>
                    </button>

                    {/* Content */}
                    {openIndex === index && (
                        <ul className="mt-4 cursor-pointer space-y-2 text-sm text-gray-700 max-h-[300px] overflow-y-auto pr-2">
                            {provider.benefits.map((benefit: string, i: number) => (
                                <li key={i} className="flex gap-2">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-[#04786b]" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}