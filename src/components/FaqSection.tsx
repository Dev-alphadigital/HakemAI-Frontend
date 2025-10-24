// "use client";
// import { useState } from "react";
// import { FaPlus, FaTimes } from "react-icons/fa";

// export default function FaqSection() {
//     const [activeIndex, setActiveIndex] = useState<number | null>(null);

//     const faqs = [
//         {
//             question: "What is hakem.ai?",
//             answer:
//                 "hakem.ai is an intelligent decision-support tool designed for insurance professionals in Saudi Arabia. It uses Artificial Intelligence to automatically extract and analyze key data from multiple insurance quotes, providing a clear, ranked comparison in minutes. Its purpose is to save you time, reduce manual errors, and help you provide data-driven recommendations to your clients with speed and accuracy.",
//         },
//         {
//             question: "Which types of insurance quotes can I compare?",
//             answer:
//                 "The platform is optimized for complex commercial insurance products common in the Saudi market, such as Property All Risks (PAR), Business Interruption, and General Liability. The AI can also process other lines of business, but it performs best with structured commercial quotes. The app includes a validation check to ensure you are only comparing similar products (e.g., Property vs. Property) to guarantee a meaningful analysis",
//         },
//         {
//             question: "Does the app support quotes in Arabic?",
//             answer:
//                 "Yes. The application's Optical Character Recognition (OCR) engine is specifically configured to process documents that contain both Arabic and English text, which is common in quotes from insurers in the Kingdom. The AI can extract data from bilingual documents seamlessly.",
//         },
//         {
//             question: "How accurate is the AI data extraction?",
//             answer:
//                 'The AI is highly accurate, but no automated system is perfect. That is why Step 2 of the workflow is "Review, Edit, and Compare." After the initial extraction, all key data points are presented in an editable table. We strongly encourage you to take a moment to verify the premium, coverage, and other critical numbers before running the final comparison to ensure the analysis is based on 100% accurate data.',
//         },
//         {
//             question: 'How is the "Score" and "Ranking" calculated?',
//             answer:
//                 "The score is calculated using a proprietary weighted algorithm that considers multiple factors, not just the price. By default, it balances:Financials: Premium, Coverage, Deductible Terms: Number of Benefits, Exclusions, and Warranties Provider: A reputation score based on market standing. This provides a holistic view of the best value rather than just the cheapest option.",
//         },
//         {
//             question: "Can I customize the comparison logic?",
//             answer:
//                 "Yes. We understand that every client has different priorities. In the Advanced: Customize Scoring Weights section, you can use sliders to adjust the importance of each factor in the final score. If a client is highly price-sensitive, you can increase the weight of the Premium score to reflect that priority in the final ranking.",
//         },
//         {
//             question: "Which insurance companies are supported?",
//             answer:
//                 "The app can process quotes from any insurer. The AI is trained to identify the provider's name from the document, whether it's a major local player like Tawuniya or GIG, or an international insurer with a presence in the Kingdom. The Provider Reputation score in the comparison is based on a general market assessment but can be adjusted via the custom weights.",
//         },
//         {
//             question: 'What is the "Strategic Memo" PDF?',
//             answer:
//                 "The Strategic Memo is a professional, two-page executive summary of the comparison results. Instead of printing all the raw data, it provides: A clear top recommendation. A high-level financial snapshot. A breakdown of the top contenders' strengths and weaknesses. It's designed to be a client-ready document that you can use to present your findings and justify your recommendation.",
//         },
//         {
//             question: "Is the data from my clients' quotes secure?",
//             answer:
//                 "Data security is paramount. When you upload documents, they are processed in a secure, isolated environment for the duration of the analysis. We do not store your quote documents or the extracted data after your session ends. The application is designed to be a stateless analysis tool, ensuring client confidentiality.",
//         },
//         {
//             question:
//                 "Does the app check for compliance with Saudi Insurance Authority regulations?",
//             answer:
//                 "hakem.ai is an analytical tool, not a compliance one. While it can extract details like VAT and show deductible structures, it does not verify if a policy is fully compliant with the latest Insurance Authority regulations and requirements. Compliance verification remains the responsibility of the insurance professional.",
//         },
//     ];

//     return (
//         <section className="bg-[#fdfcf8] text-gray-900 py-20 px-6 sm:px-10 md:px-16 2xl:px-44">
//             {/* Header */}
//             <div className="max-w-4xl mx-auto text-center mb-12">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-3">
//                     Frequently Asked Questions
//                 </h2>
//                 <p className="text-gray-600 text-base md:text-lg leading-relaxed">
//                     Here are answers to common questions about using{" "}
//                     <span className="font-semibold text-gray-800">HAKEM AI</span> to
//                     analyze and compare insurance quotes within the Saudi Arabian market.
//                 </p>
//             </div>

//             {/* FAQ Cards */}
//             <div className="max-w-3xl mx-auto space-y-4">
//                 {faqs.map((faq, index) => (
//                     <div
//                         key={index}
//                         className={`rounded-md overflow-hidden border border-[#04786b]/40 transition-all duration-300 ${activeIndex === index
//                             ? "bg-gradient-to-r from-[#fff9e6] via-[#e8f5ee] to-[#e1f1e6]"
//                             : "bg-gradient-to-r from-[#fff9e6] via-[#f8f1d1] to-[#d8ebe3]"
//                             }`}
//                     >
//                         {/* Question Row */}
//                         <button
//                             onClick={() =>
//                                 setActiveIndex(activeIndex === index ? null : index)
//                             }
//                             className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-gray-800 focus:outline-none"
//                         >
//                             <span>{faq.question}</span>
//                             {activeIndex === index ? (
//                                 <FaTimes className="text-[#04786b]" />
//                             ) : (
//                                 <FaPlus className="text-[#04786b]" />
//                             )}
//                         </button>

//                         {/* Answer */}
//                         {activeIndex === index && (
//                             <div className="px-5 pb-5 text-gray-700 text-sm leading-relaxed">
//                                 {faq.answer}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// }

"use client";
import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

export default function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "What is hakem.ai?",
            answer:
                "hakem.ai is an intelligent decision-support tool designed for insurance professionals in Saudi Arabia. It uses Artificial Intelligence to automatically extract and analyze key data from multiple insurance quotes, providing a clear, ranked comparison in minutes. Its purpose is to save you time, reduce manual errors, and help you provide data-driven recommendations to your clients with speed and accuracy.",
        },
        {
            question: "Which types of insurance quotes can I compare?",
            answer:
                "The platform is optimized for complex commercial insurance products common in the Saudi market, such as Property All Risks (PAR), Business Interruption, and General Liability. The AI can also process other lines of business, but it performs best with structured commercial quotes. The app includes a validation check to ensure you are only comparing similar products (e.g., Property vs. Property) to guarantee a meaningful analysis.",
        },
        {
            question: "Does the app support quotes in Arabic?",
            answer:
                "Yes. The application's Optical Character Recognition (OCR) engine is specifically configured to process documents that contain both Arabic and English text, which is common in quotes from insurers in the Kingdom. The AI can extract data from bilingual documents seamlessly.",
        },
        {
            question: "How accurate is the AI data extraction?",
            answer:
                'The AI is highly accurate, but no automated system is perfect. That is why Step 2 of the workflow is "Review, Edit, and Compare." After the initial extraction, all key data points are presented in an editable table. We strongly encourage you to take a moment to verify the premium, coverage, and other critical numbers before running the final comparison to ensure the analysis is based on 100% accurate data.',
        },
        {
            question: 'How is the "Score" and "Ranking" calculated?',
            answer:
                "The score is calculated using a proprietary weighted algorithm that considers multiple factors, not just the price. By default, it balances: Financials: Premium, Coverage, Deductible. Terms: Number of Benefits, Exclusions, and Warranties. Provider: A reputation score based on market standing. This provides a holistic view of the best value rather than just the cheapest option.",
        },
        {
            question: "Can I customize the comparison logic?",
            answer:
                "Yes. We understand that every client has different priorities. In the Advanced: Customize Scoring Weights section, you can use sliders to adjust the importance of each factor in the final score. If a client is highly price-sensitive, you can increase the weight of the Premium score to reflect that priority in the final ranking.",
        },
        {
            question: "Which insurance companies are supported?",
            answer:
                "The app can process quotes from any insurer. The AI is trained to identify the provider's name from the document, whether it's a major local player like Tawuniya or GIG, or an international insurer with a presence in the Kingdom. The Provider Reputation score in the comparison is based on a general market assessment but can be adjusted via the custom weights.",
        },
        {
            question: 'What is the "Strategic Memo" PDF?',
            answer:
                "The Strategic Memo is a professional, two-page executive summary of the comparison results. Instead of printing all the raw data, it provides: A clear top recommendation. A high-level financial snapshot. A breakdown of the top contenders' strengths and weaknesses. It's designed to be a client-ready document that you can use to present your findings and justify your recommendation.",
        },
        {
            question: "Is the data from my clients' quotes secure?",
            answer:
                "Data security is paramount. When you upload documents, they are processed in a secure, isolated environment for the duration of the analysis. We do not store your quote documents or the extracted data after your session ends. The application is designed to be a stateless analysis tool, ensuring client confidentiality.",
        },
        {
            question:
                "Does the app check for compliance with Saudi Insurance Authority regulations?",
            answer:
                "hakem.ai is an analytical tool, not a compliance one. While it can extract details like VAT and show deductible structures, it does not verify if a policy is fully compliant with the latest Insurance Authority regulations and requirements. Compliance verification remains the responsibility of the insurance professional.",
        },
    ];

    return (
        <section className="bg-[#fdfcf8] text-gray-900 py-10 px-6 sm:px-10 md:px-16 2xl:px-44">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Frequently Asked Questions
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    Here are answers to common questions about using{" "}
                    <span className="font-semibold text-gray-800">HAKEM AI</span> to analyze
                    and compare insurance quotes within the Saudi Arabian market.
                </p>
            </div>

            {/* FAQ List */}
            <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <div
                            key={index}
                            className="p-[1px] bg-gradient-to-r from-[#fdc431] via-[#e3d26b] to-[#04786b] rounded-lg transition-all"
                        >
                            <div
                                className={`rounded-md bg-gradient-to-r from-[#f4eabf] to-[#bddbd4] transition-all duration-300 ${isActive ? "pb-4" : ""
                                    }`}
                            >
                                {/* Question */}
                                <button
                                    onClick={() =>
                                        setActiveIndex(isActive ? null : index)
                                    }
                                    className="w-full cursor-pointer flex justify-between items-center text-left px-5 py-4 font-semibold text-gray-800 focus:outline-none"
                                >
                                    <span>{faq.question}</span>
                                    {isActive ? (
                                        <FaTimes className="text-[#04786b]" />
                                    ) : (
                                        <FaPlus className="text-[#04786b]" />
                                    )}
                                </button>

                                {/* Answer */}
                                {isActive && (
                                    <div className="px-5 pb-2 text-gray-700 text-sm leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
