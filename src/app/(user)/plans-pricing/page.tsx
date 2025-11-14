"use client";

import React, { useState } from "react";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PlansPricingPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("Professional");

    const plans = [
        { name: "Starter", price: 599 },
        { name: "Professional", price: 999 },
        { name: "Premium", price: 1875 },
    ];

    return (
        <main className="flex min-h-screen bg-[#E9F0ED] text-gray-900">
            <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

            <div className="flex-1 flex flex-col">
                <Topbar setMobileOpen={setMobileOpen} />

                {/* CONTENT WRAPPER */}
                <div className="px-4 md:px-10 pt-4 lg:pt-20 2xl:pt-20 flex justify-center">
                    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-8 md:p-10 w-full max-w-[1100px]">

                        {/* -------------------------------------- */}
                        {/*            PLANS & PRICING             */}
                        {/* -------------------------------------- */}

                        <h2 className="text-xl font-bold mb-6">Plans & Pricing</h2>

                        {/* DESKTOP PLAN SELECTION */}
                        <div className="flex justify-center">
                            <div className="hidden md:flex items-center justify-start gap-14 mb-6">
                                {plans.map((p) => (
                                    <label key={p.name} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="plan-desktop"
                                            checked={selectedPlan === p.name}
                                            onChange={() => setSelectedPlan(p.name)}
                                            className="h-4 w-4 accent-[#0B8A62]"
                                        />
                                        <div>
                                            <p className="font-medium text-[15px]">{p.name}</p>
                                            <p className="text-gray-600 text-sm">SAR {p.price}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* MOBILE PLAN SELECTION — FIGMA ACCURATE */}
                        <div className="md:hidden space-y-4 mb-6">
                            {plans.map((p) => (
                                <div
                                    key={p.name}
                                    onClick={() => setSelectedPlan(p.name)}
                                    className={`w-full rounded-xl px-4 py-4 shadow-sm border flex 
                                        items-center justify-between cursor-pointer transition
                                        ${selectedPlan === p.name
                                            ? "bg-[#0B8A62] text-white border-[#0B8A62]"
                                            : "bg-white border-gray-300"
                                        }
                                    `}
                                >
                                    {/* LEFT: RADIO + TEXT */}
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="plan-mobile"
                                            checked={selectedPlan === p.name}
                                            onChange={() => setSelectedPlan(p.name)}
                                            className={`h-4 w-4 ${selectedPlan === p.name ? "accent-white" : "accent-[#0B8A62]"
                                                }`}
                                        />

                                        <div>
                                            <p
                                                className={`font-medium text-sm ${selectedPlan === p.name ? "text-white" : "text-gray-900"
                                                    }`}
                                            >
                                                {p.name}
                                            </p>
                                            <p
                                                className={`text-xs ${selectedPlan === p.name ? "text-white" : "text-gray-600"
                                                    }`}
                                            >
                                                SAR {p.price}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT: MONTHLY BADGE */}
                                    <span
                                        className={`text-xs font-medium px-3 py-1 rounded-full border 
                                            ${selectedPlan === p.name
                                                ? "border-white text-white"
                                                : "border-gray-400 text-gray-600"
                                            }
                                        `}
                                    >
                                        Monthly
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL PAYABLE */}
                        <div className="text-center mt-4 mb-10">
                            <p className="text-gray-700 text-sm">Total Payable Amount</p>
                            <p className="text-[#0B8A62] font-bold text-xl">
                                SAR {plans.find((p) => p.name === selectedPlan)?.price}
                            </p>
                        </div>

                        <hr className="border-gray-200 mb-10" />

                        {/* -------------------------------------- */}
                        {/*             BANK DETAILS               */}
                        {/* -------------------------------------- */}

                        <h3 className="text-lg font-bold mb-3">Bank Details</h3>

                        <div className="space-y-1.5 text-[15px] text-gray-800 mb-10">
                            <p><span className="font-semibold">Account Title:</span> [Account title]</p>
                            <p><span className="font-semibold">Bank Name:</span> [Bank Name]</p>
                            <p><span className="font-semibold">Account Number:</span> 0000-00000000</p>
                            <p><span className="font-semibold">IBAN:</span> 0XXXXXXXX0000000000000000</p>
                        </div>

                        {/* -------------------------------------- */}
                        {/*         UPLOAD PAYMENT PROOF           */}
                        {/* -------------------------------------- */}

                        <h3 className="text-lg font-semibold mb-4">Upload Payment Proof</h3>

                        <div
                            className="border-2 border-dashed border-[#0B8A62] rounded-xl 
                            bg-gradient-to-r from-[#FFE6AA] via-[#FFF7D9] to-[#D9F1E9]
                            p-8 md:p-12 min-h-[230px]
                            flex flex-col items-center justify-center mb-10"
                        >
                            <FaCloudUploadAlt className="text-4xl text-gray-700 mb-4" />

                            <p className="font-semibold text-[15px] mb-1">Upload payment proof</p>
                            <p className="text-xs text-gray-500 mb-4">
                                Attach a screenshot or receipt of your payment.
                            </p>

                            <label className="cursor-pointer bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-gray-50 transition">
                                Select File
                                <input type="file" className="hidden" />
                            </label>
                        </div>

                        {/* -------------------------------------- */}
                        {/*           SUBMIT BUTTON                */}
                        {/* -------------------------------------- */}

                        <div className="flex justify-center">
                            <button
                                className="bg-gradient-to-r from-[#FFC632] to-[#0B8A62]
                                text-white font-medium w-[260px] py-3 rounded-lg
                                shadow-[0px_4px_10px_rgba(0,0,0,0.15)]
                                hover:opacity-95 transition cursor-pointer"
                            >
                                Submit for Verification
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
