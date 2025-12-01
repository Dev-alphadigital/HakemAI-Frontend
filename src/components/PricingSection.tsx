"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState("annual");

    const plans = [
        {
            title: "Starter",
            slashedPrice: "SAR 780",
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
                payment: "Annual Invoicing",
                onboarding: "Manual account setup within 24 hours",
            },
        },
        {
            title: "Professional",
            slashedPrice: "SAR 1300",
            price: "SAR 999/month",
            pricePrefix: "",
            description: "For small brokers handling multiple clients",
            borderColor: "border-[#0B8A62]",

            features: [
                "Up to <b>250 comparisons/month</b>",
                "Enhanced analytics — highlights premium gaps, benefit value, and exclusions",
                "Team dashboard (up to 3 users)",
                "Custom report branding with your company logo",
                "Priority onboarding and support",
            ],

            footer: {
                payment: "Annual Invoicing",
                onboarding: "Guided setup session with dedicated agent",
            },
        },
        {
            title: "Premium",
            slashedPrice: "SAR 2440",
            pricePrefix: "From",
            price: "SAR 1,875/month",
            description:
                "For comparison platforms, insurers, and enterprise partners",
            borderColor: "border-[#F5C94F]",

            features: [
                "<b>Unlimited comparisons</b> (fair-use policy)",
                "Compare up to <b>8 quotes/case</b>",
                "Team dashboard (upto 5 users)",
                "Dedicated account manager",
                "SLA-backed service with performance reporting",
                "Custom model tuning (optional upgrade)",
            ],

            footer: {
                payment: "Annual or semi-annual invoicing",
                onboarding: "Tailored deployment & system configuration",
            },
        },
    ];

    return (
        <section className="bg-[#fdfcf8] text-gray-900 py-10 px-8 md:px-16 2xl:px-44">
            {/* HEADER */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Plans & Pricing
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                    Compare smarter with flexible plans designed to fit every user’s
                    needs.
                </p>
            </div>

            {/* DESKTOP GRID */}
            <div className="hidden md:grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col rounded-xl border ${plan.borderColor} bg-white p-8 shadow-sm min-h-[690px]`}
                    >
                        {/* Early Adopter Discount */}
                        <div className="absolute -top-[1px] -right-[1px] bg-[#007f66] text-white text-xs font-medium px-4 py-4 rounded-tr-xl rounded-bl-xl shadow-md">
                            Early Adopter Discount
                        </div>

                        {/* Main Content */}
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-xl font-semibold mb-2 mt-4">{plan.title}</h3>

                            <p className="text-gray-500 font-semibold mb-1 line-through text-lg">
                                {plan.slashedPrice}
                            </p>

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
                                        <span dangerouslySetInnerHTML={{ __html: feat }}></span>
                                    </li>
                                ))}
                            </ul>

                            <div className="text-sm text-gray-700 mb-6 space-y-2">
                                <p><b>Payment:</b> {plan.footer.payment}</p>
                                <p><b>Onboarding:</b> {plan.footer.onboarding}</p>
                            </div>
                        </div>

                        {/* Button stays pushed down */}
                        <Link href="/dashboard">
                            <button className="w-full mt-auto border cursor-pointer border-[#04786b] text-[#04786b] font-semibold py-2 rounded-md hover:bg-[#e8f5f2] transition">
                                Get started
                            </button>
                        </Link>
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
                                className={`relative flex flex-col min-h-[680px] rounded-xl border ${plan.borderColor} bg-white p-8 shadow-sm`}
                            >
                                {/* Discount Tag */}
                                <div className="absolute -top-[1px] -right-[1px] bg-[#007f66] text-white text-xs font-medium px-4 py-4 rounded-tr-xl rounded-bl-xl shadow-md">
                                    Early Adopter Discount
                                </div>

                                {/* Content Wrapper */}
                                <div className="flex flex-col flex-grow">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {plan.title}
                                    </h3>

                                    <p className="text-gray-500 font-semibold mb-1 line-through">
                                        {plan.slashedPrice}
                                    </p>

                                    <p
                                        className="text-3xl font-bold mb-1"
                                        dangerouslySetInnerHTML={{
                                            __html: `${plan.pricePrefix ? plan.pricePrefix + " " : ""}${plan.price}`,
                                        }}
                                    />

                                    <p className="text-sm text-gray-600 mb-6">
                                        {plan.description}
                                    </p>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-[15px]">
                                                <span className="text-[#0B8A62] text-lg mt-[2px]">✓</span>
                                                <span dangerouslySetInnerHTML={{ __html: feat }}></span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="text-sm text-gray-700 mb-6 space-y-2">
                                        <p><b>Payment:</b> {plan.footer.payment}</p>
                                        <p><b>Onboarding:</b> {plan.footer.onboarding}</p>
                                    </div>
                                </div>

                                {/* Button pushed to bottom */}
                                <button className="mt-auto w-full border border-[#04786b] text-[#04786b] font-semibold py-2 rounded-md hover:bg-[#e8f5f2] transition">
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
