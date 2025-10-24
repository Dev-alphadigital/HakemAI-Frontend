"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState("annual");

    const plans = [
        {
            title: "Free",
            price: "$0",
            desc: "Per user/month, billed annually",
            btn: "Get started for free",
        },
        {
            title: "Pro",
            price: "$85",
            desc: "Per user/month, billed annually",
            btn: "Get started for pro",
        },
        {
            title: "Enterprise",
            price: "$150",
            desc: "Per user/month, billed annually",
            btn: "Get started for enterprise",
        },
    ];

    return (
        <section className="bg-[#fdfcf8] text-gray-900 py-10 px-8 md:px-16 2xl:px-44">
            {/* HEADER */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Plans & Pricing</h2>
                <p className="text-gray-600 text-base md:text-lg">
                    Compare smarter with flexible plans designed to fit every user’s needs.
                </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex justify-center mb-12">
                <div className="inline-flex bg-[#e6f0ee] rounded-md overflow-hidden">
                    <button
                        onClick={() => setBillingCycle("monthly")}
                        className={`px-10 py-2 font-semibold transition ${billingCycle === "monthly"
                            ? "bg-[#04786b] text-white"
                            : "text-gray-700 hover:bg-[#d1e7e2]"
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingCycle("annual")}
                        className={`px-2 py-2 font-semibold flex items-center gap-2 transition ${billingCycle === "annual"
                            ? "bg-[#04786b] text-white"
                            : "text-gray-700 hover:bg-[#d1e7e2]"
                            }`}
                    >
                        Annual
                        <span className="text-xs bg-[#fdc431] text-black px-2 py-[2px] rounded-sm font-bold">
                            Save 35%
                        </span>
                    </button>
                </div>
            </div>

            {/* DESKTOP GRID */}
            <div className="hidden md:grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="border border-[#04786b]/40 rounded-lg shadow-sm p-8 text-center hover:shadow-md transition"
                    >
                        <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                        <p className="text-4xl font-bold mb-2">{plan.price}</p>
                        <p className="text-gray-600 mb-6">{plan.desc}</p>

                        <h4 className="font-semibold mb-4">For your projects</h4>
                        <ul className="space-y-2 text-gray-600 mb-8 text-sm">
                            {Array(6)
                                .fill("For your projects")
                                .map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <span className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                            ✓
                                        </span>
                                        {item}
                                    </li>
                                ))}
                        </ul>

                        <button className="border border-[#fdc431] cursor-pointer text-gray-800 font-semibold px-6 py-2 rounded-md hover:bg-[#fff9e1] transition">
                            {plan.btn}
                        </button>
                    </div>
                ))}
            </div>

            {/* MOBILE SWIPER */}
            <div className="block md:hidden max-w-sm mx-auto">
                <Swiper
                    modules={[Pagination]}
                    pagination={{
                        clickable: true,
                        el: ".custom-pagination", // attach to custom element
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    className="relative"
                >
                    {plans.map((plan, index) => (
                        <SwiperSlide key={index}>
                            <div className="border border-[#04786b]/40 rounded-lg shadow-sm p-8 text-center">
                                <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
                                <p className="text-4xl font-bold mb-2">{plan.price}</p>
                                <p className="text-gray-600 mb-6">{plan.desc}</p>

                                <h4 className="font-semibold mb-4">For your projects</h4>
                                <ul className="space-y-2 text-gray-600 mb-8 text-sm">
                                    {Array(5)
                                        .fill("For your projects")
                                        .map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <span className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs">
                                                    ✓
                                                </span>
                                                {item}
                                            </li>
                                        ))}
                                </ul>

                                <button className="border border-[#fdc431] text-gray-800 font-semibold px-6 py-2 rounded-md hover:bg-[#fff9e1] transition">
                                    {plan.btn}
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination Container */}
                <div className="custom-pagination flex justify-center mt-6 pb-2"></div>

            </div>
        </section>
    );
}
