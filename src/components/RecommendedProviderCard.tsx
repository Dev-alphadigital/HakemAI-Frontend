// "use client";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function RecommendedProviderCard() {
//     const router = useRouter();

//     const handleAllProvidersClick = () => {
//         router.push('/dashboard/all-providers');
//     };

//     return (
//         <div className="relative w-full bg-white rounded-3xl lg:rounded-t-none shadow-sm overflow-hidden mt-2">
//             {/* Background image */}
//             <div className="relative h-40 md:h-52 lg:h-72 xl:h-80 2xl:h-92 w-full">
//                 <Image
//                     src="/images/provider-bg.png"
//                     alt="Provider background"
//                     fill
//                     className="object-cover"
//                 />
//             </div>

//             {/* Foreground card (left aligned & smaller) */}
//             <div onClick={handleAllProvidersClick} className="absolute cursor-pointer hover:scale-[1.02] transition-all bottom-3 left-3 bg-white rounded-3xl lg:rounded-xl shadow-md px-4 py-3 lg:py-6 border border-gray-100 w-[85%] md:w-[70%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]">
//                 {/* Header */}
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-200" />
//                         <h3 className="font-bold text-bold text-base md:text-lg lg:text-2xl xl:text-3xl">Provider 1</h3>
//                     </div>
//                     <span className="text-[11px] 2xl:text-[16px] md:text-sm font-semibold bg-[#0b7f71] text-white px-2 lg:px-3 py-[2px] 2xl:py-3 rounded-md">
//                         Recommended
//                     </span>
//                 </div>

//                 {/* Stats Section */}
//                 <div className="mt-3 grid grid-cols-3 divide-x divide-gray-200 text-center">
//                     <div className="px-2">
//                         <p className="text-sm md:text-base xl:text-lg text-black font-bold">Score</p>
//                         <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">77.0%</p>
//                     </div>
//                     <div className="px-2">
//                         <p className="text-sm md:text-base xl:text-lg text-black font-bold">Premium</p>
//                         <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">516,335 SAR</p>
//                     </div>
//                     <div className="px-2">
//                         <p className="text-sm md:text-base xl:text-lg text-black font-bold">Rate</p>
//                         <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">0.33%</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadComparisonData } from "@/utils/comparisonSync";

export default function RecommendedProviderCard() {
    const router = useRouter();

    const [provider, setProvider] = useState<any>(null);

    useEffect(() => {
        const loadProvider = async () => {
            try {
                console.log('🔄 RecommendedProviderCard: Loading...');
                const result = await loadComparisonData();
                console.log('📊 RecommendedProviderCard: Got data:', result ? 'yes' : 'no');
                
                if (result) {
                    console.log('📦 Provider cards:', result.provider_cards?.length || 0);
                    const topProvider = result.provider_cards?.[0];
                    if (topProvider) {
                        setProvider(topProvider);
                        console.log('✅ Top provider set:', topProvider.provider_name);
                    } else {
                        console.warn('⚠️ No provider cards found in data');
                    }
                } else {
                    console.error('❌ No comparison data available');
                }
            } catch (error) {
                console.error('❌ Error loading provider:', error);
            }
        };

        loadProvider();
    }, []);

    // const handleAllProvidersClick = () => {
    //     router.push("/dashboard/all-providers");
    // };

    if (!provider) return null;

    return (
        <div className="relative w-full bg-white rounded-3xl shadow-sm overflow-hidden mt-2">

            {/* Background image */}
            <div className="relative h-40 md:h-52 lg:h-64 xl:h-72 2xl:h-80 w-full">
                <Image
                    src="/images/provider-bg.png"
                    alt="Provider background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Foreground card */}
            <div
                // onClick={handleAllProvidersClick}
                className="absolute cursor-pointer hover:scale-[1.02] transition-all bottom-3 left-3 bg-white rounded-3xl lg:rounded-xl shadow-md px-4 py-3 lg:py-6 border border-gray-100 w-[85%] md:w-[70%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%]"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gray-200" />
                        <h3 className="font-bold text-base md:text-lg lg:text-2xl xl:text-3xl">
                            {provider.provider_name}
                        </h3>
                    </div>

                    <span className="text-[11px] 2xl:text-[16px] md:text-sm font-semibold bg-[#0b7f71] text-white px-2 lg:px-3 py-[2px] 2xl:py-3 rounded-md">
                        {provider.recommendation_badge}
                    </span>
                </div>

                {/* Stats Section */}
                <div className="mt-3 grid grid-cols-3 divide-x divide-gray-200 text-center">

                    <div className="px-2">
                        <p className="text-sm md:text-base xl:text-lg text-black font-bold">
                            Score
                        </p>
                        <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">
                            {provider.score}%
                        </p>
                    </div>

                    <div className="px-2">
                        <p className="text-sm md:text-base xl:text-lg text-black font-bold">
                            Premium
                        </p>
                        <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">
                            {provider.premium}
                        </p>
                    </div>

                    <div className="px-2">
                        <p className="text-sm md:text-base xl:text-lg text-black font-bold">
                            Rate
                        </p>
                        <p className="text-[#0b7f71] font-semibold text-sm md:text-base xl:mt-1">
                            {provider.rate}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}