"use client";
import Image from "next/image";
import { useState } from "react";

export default function PaymentPage() {
    const [formData, setFormData] = useState({
        cardholder: "",
        expiry: "",
        cardNumber: "",
        cvv: "",
        addAltMethod: false,
    });

    const [cardType, setCardType] = useState<string | null>(null);

    // detect card type
    const detectCardType = (number: string) => {
        const cleaned = number.replace(/\D/g, "");

        if (/^4/.test(cleaned)) return "visa";
        if (/^5[1-5]/.test(cleaned)) return "mastercard";
        if (/^3[47]/.test(cleaned)) return "amex";
        if (/^6(?:011|5)/.test(cleaned)) return "discover";
        if (/^35(2[89]|[3-8][0-9])/.test(cleaned)) return "jcb";
        if (/^(?:2131|1800|300|301|302|303|304|305|36|38|39)/.test(cleaned)) return "diners";
        return null;
    };

    // handle card number change
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // remove non-digits
        value = value.substring(0, 16); // limit to 16 digits

        // format 4-digit groups
        value = value.replace(/(\d{4})(?=\d)/g, "$1 - ");

        const detectedType = detectCardType(value);
        setCardType(detectedType);
        setFormData({ ...formData, cardNumber: value });
    };

    // general change handler
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment Details:", formData);
    };

    return (
        <main className="min-h-screen flex flex-col lg:flex-row bg-[#fdfcf8] text-gray-900">
            {/* ===== LEFT SIDE ===== */}
            <div className="hidden lg:flex w-7/15 items-center justify-center relative">
                {/* Divider */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[75%] w-[1px] bg-gray-300"></div>

                {/* Logo Section */}
                <div className="flex flex-col items-center space-y-4">
                    <Image
                        src="/logo/logo.svg"
                        alt="Hakem AI Logo"
                        width={150}
                        height={150}
                        className="object-contain rounded-full"
                        priority
                    />
                    <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
                        HAKEM.AI
                    </h1>
                </div>
            </div>

            {/* ===== RIGHT SIDE ===== */}
            <div className="flex flex-1 flex-col justify-center items-center px-8 md:px-16 py-10 lg:py-0">
                <div className="w-full max-w-lg space-y-10">
                    {/* Mobile avatar */}
                    <div className="flex justify-center lg:hidden mb-4">
                        <div className="w-24 h-24 flex items-center justify-center">
                            <Image
                                src="/logo/logo.svg"
                                alt="Hakem AI Logo"
                                width={150}
                                height={150}
                                className="object-contain rounded-full"
                                priority
                            />
                        </div>
                    </div>
                    {/* Title */}
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Payment Details
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Securely add your payment method to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Row 1 */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Cardholder Name */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">
                                    Cardholder name
                                </label>
                                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] to-[#04786b]">
                                    <div className="rounded-md bg-gradient-to-r from-[#f4eabf] to-[#bddbd4]">
                                        <input
                                            type="text"
                                            name="cardholder"
                                            value={formData.cardholder}
                                            onChange={handleChange}
                                            placeholder="James Smith"
                                            required
                                            className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Expiry */}
                            <div className="w-full md:w-1/3">
                                <label className="block text-sm font-semibold mb-1">
                                    Expiry
                                </label>
                                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] to-[#04786b]">
                                    <div className="rounded-md bg-gradient-to-r from-[#f4eabf] to-[#bddbd4]">
                                        <input
                                            type="text"
                                            name="expiry"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            placeholder="11 / 25"
                                            required
                                            className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Card Number */}
                            <div className="flex-1">
                                <label className="block text-sm font-semibold mb-1">
                                    Card number
                                </label>
                                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] to-[#04786b]">
                                    <div className="rounded-md bg-gradient-to-r from-[#f4eabf] to-[#bddbd4] flex items-center px-4">
                                        {/* Dynamic Card Logo */}
                                        {cardType ? (
                                            <Image
                                                src={`/images/${cardType}.svg`}
                                                alt={cardType}
                                                width={30}
                                                height={22}
                                                className="mr-2 transition-all duration-300 ease-in-out"
                                            />
                                        ) : (
                                            <Image
                                                src="/images/credit-card.svg"
                                                alt="Card"
                                                width={30}
                                                height={22}
                                                className="mr-2 opacity-50 transition-all duration-300 ease-in-out"
                                            />
                                        )}

                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 - 1234 - 1234 - 1234"
                                            required
                                            className="w-full py-3 bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CVV */}
                            <div className="w-full md:w-1/3">
                                <label className="block text-sm font-semibold mb-1">CVV</label>
                                <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#fdc431] to-[#04786b]">
                                    <div className="rounded-md bg-gradient-to-r from-[#f4eabf] to-[#bddbd4]">
                                        <input
                                            type="password"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            placeholder="•••"
                                            required
                                            className="w-full px-4 py-3 rounded-md bg-transparent text-gray-800 placeholder-gray-500 font-semibold focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#fdc431] to-[#04786b] text-white font-semibold py-3 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:opacity-95 transition mt-5"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
