"use client";

import { useState } from "react";
import Image from "next/image";

export default function KeyDifferences({ data }: { data: any[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {data.map((provider, index) => (
                <div
                    key={provider.name}
                    className={`relative p-4 cursor-pointer transition-all
            ${provider.active
                            ? "border-l-4 border-[#04786b] cursor-pointer bg-[#f0faf6]"
                            : "border border-gray-200 bg-white"
                        }`}
                >
                    {/* Recommended badge */}
                    {provider.active && (
                        <div className="absolute -top-3 -right-4 w-10 h-10">
                            <Image
                                src="/images/recommended-badge.svg"
                                alt="Recommended"
                                width={30}
                                height={30}
                            />
                        </div>
                    )}

                    {/* Header */}
                    <button
                        className="w-full flex justify-between cursor-pointer items-center text-left"
                        onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                    >
                        <h3
                            className={`font-semibold ${provider.active ? "text-[#04786b]" : "text-gray-900"
                                }`}
                        >
                            {provider.name}
                        </h3>
                        <span>{openIndex === index ? "−" : "+"}</span>
                    </button>

                    {/* Content */}
                    {openIndex === index && (
                        <div className="mt-4 space-y-4 text-sm text-gray-700">
                            {provider.warranties.length > 0 && (
                                <Section title="Unique Warranties" items={provider.warranties} />
                            )}

                            {provider.exclusions.length > 0 && (
                                <Section title="Unique Exclusions" items={provider.exclusions} />
                            )}

                            {provider.subjectivities.length > 0 && (
                                <Section
                                    title="Unique Subjectivities"
                                    items={provider.subjectivities}
                                />
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

function Section({ title, items }: { title: string; items: string[] }) {
    return (
        <div>
            <h4 className="font-semibold mb-1">{title}</h4>
            <ul className="list-disc ml-5 space-y-1">
                {items.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    );
}