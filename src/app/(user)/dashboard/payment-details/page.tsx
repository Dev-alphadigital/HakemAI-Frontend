"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function PaymentDetailsPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "James Smith",
        expiry: "11 / 25",
        cardNumber: "",
        cvv: "",
        addAlt: false,
    });
    const [cardType, setCardType] = useState<string | null>(null);

    // === Detect Card Type ===
    const detectCardType = (number: string) => {
        const cleaned = number.replace(/\D/g, "");
        if (/^4/.test(cleaned)) return "visa";
        if (/^5[1-5]/.test(cleaned)) return "mastercard";
        if (/^3[47]/.test(cleaned)) return "amex";
        if (/^6(?:011|5)/.test(cleaned)) return "discover";
        if (/^35(2[89]|[3-8][0-9])/.test(cleaned)) return "jcb";
        if (/^(?:2131|1800|300|301|302|303|304|305|36|38|39)/.test(cleaned))
            return "diners";
        return null;
    };

    // === Handle card number formatting + type detection ===
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // remove non-digits
        value = value.substring(0, 16); // limit to 16 digits
        value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // group every 4 digits with space

        const detected = detectCardType(value);
        setCardType(detected);
        setForm({ ...form, cardNumber: value });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment Details:", form);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-[#fffdf8] px-6 py-4 relative">
            {/* Header */}
            <div className="relative w-full max-w-md flex items-center justify-center mb-8">
                <button
                    onClick={() => router.back()}
                    className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <p className="text-center text-xl font-bold text-gray-800">
                    Payment Details
                </p>
            </div>

            <p className="w-full max-w-sm text-gray-700 text-lg font-medium mb-4">
                Modify your payment details
            </p>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 text-gray-800"
            >
                {/* Row 1 - Cardholder + Expiry */}
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                            Cardholder name
                        </label>
                        <div className="rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="James Smith"
                                className="w-full bg-white rounded-lg px-3 py-2 outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>

                    <div className="w-28">
                        <label className="block text-sm font-medium mb-1">Expiry</label>
                        <div className="rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                            <input
                                type="text"
                                name="expiry"
                                value={form.expiry}
                                onChange={handleChange}
                                placeholder="11 / 25"
                                className="w-full bg-white rounded-lg px-3 py-2 outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Row 2 - Card Number + CVV */}
                <div className="flex gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                            Card number
                        </label>
                        <div className="rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                            <div className="flex items-center bg-white rounded-lg px-3 py-2">
                                {/* Dynamic logo */}
                                {cardType ? (
                                    <Image
                                        src={`/images/${cardType}.svg`}
                                        alt={cardType}
                                        width={28}
                                        height={20}
                                        className="mr-2"
                                    />
                                ) : (
                                    <Image
                                        src="/images/credit-card.svg"
                                        alt="Card"
                                        width={25}
                                        height={18}
                                        className="mr-2 opacity-50"
                                    />
                                )}
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={form.cardNumber}
                                    onChange={handleCardNumberChange}
                                    placeholder="1234 5678 9101 1121"
                                    className="flex-1 bg-transparent outline-none placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-24">
                        <label className="block text-sm font-medium mb-1">CVV</label>
                        <div className="rounded-lg p-[1px] bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C]">
                            <input
                                type="password"
                                name="cvv"
                                value={form.cvv}
                                onChange={handleChange}
                                placeholder="•••"
                                className="w-full bg-white rounded-lg px-3 py-2 outline-none placeholder-gray-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                    <input
                        id="alt"
                        type="checkbox"
                        name="addAlt"
                        checked={form.addAlt}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#1B7F5C] border-gray-300 rounded focus:ring-[#1B7F5C]"
                    />
                    <label htmlFor="alt" className="ml-2 text-sm font-medium text-gray-700">
                        Add an alternative method
                    </label>
                </div>

                {/* Save Button */}
                <button
                    type="submit"
                    className="w-full py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#FFD54F] to-[#1B7F5C] transition-transform hover:scale-[1.02]"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
