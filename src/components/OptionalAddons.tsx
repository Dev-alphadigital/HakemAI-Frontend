"use client";

import { FaCheckCircle } from "react-icons/fa";

export default function OptionalAddons() {
    const addons = [
        {
            addOn: "Extra 100 comparisons",
            desc: "Top up your monthly limit",
            price: "SAR300/month",
        },
        {
            addOn: "Arabic language reports",
            desc: "AI summaries and outputs in Arabic",
            price: "SAR300/month",
        },
        {
            addOn: "CRM/ERP integration",
            desc: "Connect to internal systems",
            price: "Custom quote",
        },
        {
            addOn: "Open APIs",
            desc: "API & white-label access",
            price: "Custom quote",
        },
    ];

    return (
        <section className="bg-[#fdfcf8] py-2 md:py-6 px-6 md:px-16 2xl:px-44">
            {/* HEADER */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                    Optional Add-ons
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                    Enhance your plan with powerful add-ons tailored to your needs.
                </p>
            </div>

            {/* WRAPPER CARD */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-12 border border-gray-200">

                {/* DESKTOP HEADER */}
                <div className="hidden md:grid grid-cols-3 font-semibold text-gray-800 text-lg mb-6 px-2">
                    <div>Add-on</div>
                    <div>Description</div>
                    <div className="md:ml-[4.3rem] lg:ml-[9.8rem] xl:ml-[12.5rem]">Price</div>
                </div>

                {/* ROWS */}
                <div className="divide-y divide-gray-200">
                    {addons.map((item, idx) => (
                        <div
                            key={idx}
                            className="py-5 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 px-2"
                        >
                            {/* Add-on Name */}
                            <div className="flex items-start gap-3 text-[15px] text-gray-800">
                                <FaCheckCircle className="text-[#0B8A62] mt-1 shrink-0" />
                                <span>{item.addOn}</span>
                            </div>

                            {/* Description */}
                            <div className="text-[15px] text-gray-700">
                                {item.desc}
                            </div>

                            {/* Price */}
                            <div className="text-[15px] text-gray-800 font-medium md:text-right">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
