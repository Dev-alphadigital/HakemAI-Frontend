import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import OptionalAddons from "@/components/OptionalAddons";

export default function Home() {
  return (
    <main className="font-sans bg-[#04786b] text-white min-h-screen flex flex-col">
      {/* ====== HEADER ====== */}
      <header className="w-full flex items-center justify-between px-8 py-6 border-b border-white/10 lg:px-16 2xl:px-72">
        <div className="flex items-center gap-3">
          <Image
            src="/logo/logo.svg"
            alt="Hakem AI Logo"
            width={55}
            height={55}
            className="w-12 h-12 md:w-14 md:h-14 xl:w-18 xl:h-18 rounded-full object-contain"
            priority
          />
          <h1 className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold tracking-wide">
            HAKEM<span className="text-[#fdc431]">.</span>AI
          </h1>
        </div>


        <div className="flex space-x-2 lg:mr-5 xl:mr-14 2xl:mr-16">
          <Link href="/login">
            <button className="bg-[#fdc431] cursor-pointer text-black font-semibold px-3 md:px-4 py-1 md:py-2 rounded-md shadow hover:bg-yellow-300 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-[#fdc431] cursor-pointer text-black font-semibold px-3 md:px-4 py-1 md:py-2 rounded-md shadow hover:bg-yellow-300 transition">
              Signup
            </button>
          </Link>
        </div>
      </header>

      {/* ====== HERO SECTION ====== */}
      <section className="flex flex-col lg:flex-row items-center justify-between flex-grow w-full mx-auto px-8 lg:px-16 py-12 lg:py-0 2xl:px-72">
        {/* LEFT SIDE */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="text-3xl 2xl:text-6xl font-semibold md:font-extrabold leading-tight">
            Empowering <span className="text-[#fdc431]">Smarter</span> <br />
            Decisions with <span className="text-[#fdc431]">Intelligence.</span>
          </h2>

          <p className="text-base 2xl:text-lg text-gray-100 leading-relaxed">
            <span className="text-[#fdc431] font-semibold">HAKEM AI</span> uses
            artificial intelligence to analyze quotes from leading insurance
            companies and helps you find the best plan in seconds.
          </p>
          <Link href="/dashboard">
            <button className="bg-[#fdc431] cursor-pointer lg:mb-5 text-black font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-300 transition">
              Get Your Comparison Now
            </button>
          </Link>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="lg:w-1/2 mt-6 md:mt-0 flex justify-center">
          <Image
            src="/images/dashboard.png"
            alt="AI Dashboard"
            width={600}
            height={420}
            className="object-contain"
          />
        </div>
      </section>

      {/* ====== FEATURES SECTION ====== */}
      <section className="bg-white text-gray-900 py-12 px-8 md:px-16 2xl:px-44">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-semibold">
            Let AI compare, analyze, and find your best insurance plan.
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-10 place-items-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <Image
              src="/images/compare.png"
              alt="Compare Instantly"
              width={180}
              height={180}
              className="mb-6"
            />
            <h3 className="text-2xl font-bold mb-3">Compare Instantly</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Get real-time quotes from top insurance providers. No calls, no
              spreadsheets, instant side-by-side comparisons.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <Image
              src="/images/ai.png"
              alt="AI Recommendations"
              width={180}
              height={180}
              className="mb-6"
            />
            <h3 className="text-2xl font-bold mb-3">AI Recommendations</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Our intelligent engine analyzes coverage, pricing, and terms to
              highlight the plan that fits your lifestyle and budget.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center max-w-xs">
            <Image
              src="/images/insight.png"
              alt="Transparent Insights"
              width={180}
              height={180}
              className="mb-6"
            />
            <h3 className="text-2xl font-bold mb-3">Transparent Insights</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              See exactly how each plan compares, from hidden fees to claim
              ratings, so you can make confident, data-backed decisions.
            </p>
          </div>
        </div>
      </section>

      <PricingSection />

      <OptionalAddons />

      {/* ====== SMARTER INSURANCE SECTION ====== */}
      <section className="bg-gray-50 text-gray-900 py-10">
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 px-8 md:px-16 lg:px-24 xl:px-28 2xl:px-32">
          {/* LEFT CONTENT */}
          <div className="lg:w-[48%] text-center lg:text-left space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold">
              Smarter{" "}
              <span className="text-[#04786b]">Insurance</span> Starts Here.
            </h2>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              <span className="text-[#04786b] font-semibold">HAKEM AI</span>{" "}
              compares real quotes from trusted insurance providers, analyzes
              them using AI, and highlights the plan that fits you best
              instantly.
            </p>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              No confusion, no hidden terms, just clarity and confidence through
              smart automation.
            </p>

            <Link href="/dashboard">
              <button className="bg-[#fdc431] cursor-pointer text-black font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-300 transition">
                Get Your Comparison Now
              </button>
            </Link>
          </div>

          {/* RIGHT IMAGE (two phones as one image) */}
          <div className="lg:w-[48%] md:w-[50%] flex justify-center lg:justify-end">
            <Image
              src="/images/mobiles.png"
              alt="HAKEM AI Mobile Mockups"
              width={550}
              height={440}
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      <FaqSection />

      {/* ====== FOOTER SECTION ====== */}
      <footer className="bg-[#7a7a7a] text-white py-14 px-8 md:px-16 lg:px-24 xl:px-28 2xl:px-44">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-5 lg:w-2/3">
            <div className="flex items-center gap-4">
              <Image
                src="/logo/logo.svg"
                alt="Hakem AI Logo"
                width={55}
                height={55}
                className="w-12 h-12 md:w-14 md:h-14 xl:w-18 xl:h-18 rounded-full object-contain"
                priority
              />
              <h2 className="text-2xl font-bold tracking-wide">
                HAKEM<span className="text-[#fdc431]">.</span>AI
              </h2>
            </div>

            <p className="text-sm md:text-base max-w-xl leading-relaxed">
              <span className="text-[#fdc431] font-semibold">HAKEM AI</span> uses
              artificial intelligence to analyze quotes from leading insurance
              companies and helps you find the best plan in seconds.
            </p>

            <div className="flex space-x-2 items-center">
              <FaEnvelope className="text-[#fdc431]" />
              <p className="text-[#fdc431] text-sm font-semibold tracking-wide">
                info@hakem.ai
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col mt-14 text-sm gap-3 text-gray-100 lg:text-right">
            <a
              href="#"
              className="hover:text-[#fdc431] transition underline-offset-2 hover:underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-[#fdc431] transition underline-offset-2 hover:underline"
            >
              Terms & Conditions
            </a>
            <p className="text-xs mt-4 text-gray-300">
              Copyright©2025@hakem.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}