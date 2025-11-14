"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState("annual");

    // ⭐ Figma data — 100% accurate content
    const plans = [
        {
            title: "Starter",
            price: "SAR 599/month",
            pricePrefix: "",
            description:
                "For individuals or companies exploring AI-powered comparisons",
            borderColor: "border-[#F5C94F]",

            features: [
                "1 user",
                "<b>Up to 50 comparisons/month</b>",
                "Compare up to <b>3 quotes/case</b>",
                "AI-generated ranking with coverage, premium, and value score",
                "Summary report",
                "Manual onboarding & email support",
            ],

            footer: {
                payment: "Bank transfer only (monthly or quarterly)",
                onboarding: "Manual account setup within 24 hours",
            },
        },
        {
            title: "Professional",
            price: "SAR 999/month",
            pricePrefix: "",
            description:
                "For small brokers handling multiple clients",
            borderColor: "border-[#0B8A62]",

            features: [
                "Up to <b>250 comparisons/month</b>",
                "Enhanced analytics — highlights premium gaps, benefit value, and exclusions",
                "Team dashboard (up to 3 users)",
                "Custom report branding with your company logo",
                "Priority onboarding and support",
            ],

            footer: {
                payment: "Bank transfer or invoice (monthly/annual)",
                onboarding:
                    "Guided setup session with dedicated agent",
            },
        },
        {
            title: "Premium",
            pricePrefix: "From",
            price: "SAR 1,875/month",
            description:
                "For comparison platforms, insurers, and enterprise partners",
            borderColor: "border-[#F5C94F]",

            features: [
                "<b>Unlimited comparisons</b> (fair-use policy)",
                "Compare up to <b>8 quotes/case</b>",
                "Advanced analytics dashboard",
                "Dedicated account manager",
                "SLA-backed service with performance reporting",
                "Custom model tuning (optional upgrade)",
            ],

            footer: {
                payment: "Annual or semi-annual invoicing",
                onboarding:
                    "Tailored deployment & system configuration",
            },
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

            {/* DESKTOP GRID */}
            <div className="hidden md:grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-xl border-1 ${plan.borderColor} bg-white p-8 shadow-sm`}
                    >
                        {/* Title */}
                        <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>

                        {/* Price */}
                        <p
                            className="text-3xl font-bold mb-1"
                            dangerouslySetInnerHTML={{
                                __html: `${plan.pricePrefix ? plan.pricePrefix + " " : ""}${plan.price}`,
                            }}
                        />
                        <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-[15px]">
                                    <span className="text-[#0B8A62] text-lg mt-[2px]">✓</span>
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: feat,
                                        }}
                                    ></span>
                                </li>
                            ))}
                        </ul>

                        {/* Footer info */}
                        <div className="text-sm text-gray-700 mb-6 space-y-2">
                            <p>
                                <b>Payment:</b> {plan.footer.payment}
                            </p>
                            <p>
                                <b>Onboarding:</b> {plan.footer.onboarding}
                            </p>
                        </div>

                        {/* Button */}
                        <button className=" w-full cursor-pointer border border-[#04786b] text-[#04786b] font-semibold py-2 rounded-md hover:bg-[#e8f5f2] transition">
                            Get started
                        </button>
                    </div>
                ))}
            </div>

            {/* MOBILE SWIPER */}
            <div className="block md:hidden max-w-sm mx-auto">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true, el: ".custom-pagination" }}
                    spaceBetween={20}
                    slidesPerView={1}
                >
                    {plans.map((plan, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`rounded-xl border-1 ${plan.borderColor} bg-white p-8 shadow-sm`}
                            >
                                <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>

                                <p
                                    className="text-3xl font-bold mb-1"
                                    dangerouslySetInnerHTML={{
                                        __html: `${plan.pricePrefix ? plan.pricePrefix + " " : ""}${plan.price}`,
                                    }}
                                />
                                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[15px]">
                                            <span className="text-[#0B8A62] text-lg mt-[2px]">✓</span>
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: feat,
                                                }}
                                            ></span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-sm text-gray-700 mb-6 space-y-2">
                                    <p>
                                        <b>Payment:</b> {plan.footer.payment}
                                    </p>
                                    <p>
                                        <b>Onboarding:</b> {plan.footer.onboarding}
                                    </p>
                                </div>

                                <button className="w-full border border-[#04786b] text-[#04786b] font-semibold py-2 rounded-md hover:bg-[#e8f5f2] transition">
                                    Get started
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="custom-pagination flex justify-center mt-6 pb-2"></div>
            </div>
        </section>
    );
}
