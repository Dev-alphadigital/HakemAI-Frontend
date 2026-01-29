import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

export default function TermsConditions() {
  return (
    <main className="font-sans bg-white min-h-screen flex flex-col">
      {/* ====== HEADER ====== */}
      <header className="w-full bg-[#04786b] text-white flex items-center justify-between px-8 py-6 border-b border-white/10 lg:px-16 2xl:px-72">
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
          <Link href="/">
            <button className="bg-[#fdc431] cursor-pointer text-black font-semibold px-3 md:px-4 py-1 md:py-2 rounded-md shadow hover:bg-yellow-300 transition">
              Home
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-[#fdc431] cursor-pointer text-black font-semibold px-3 md:px-4 py-1 md:py-2 rounded-md shadow hover:bg-yellow-300 transition">
              Login
            </button>
          </Link>
        </div>
      </header>

      {/* ====== TERMS AND CONDITIONS CONTENT ====== */}
      <section className="flex-grow bg-gray-50 py-12 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-72">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#04786b] mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> January 29, 2026
          </p>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Hakem AI. These Terms and Conditions ("Terms") govern
              your access to and use of the Hakem AI platform, website, and
              services (collectively, the "Service"), which is owned and operated
              by <strong>Pexilogic Technologies CO. L.L.C S.O.C</strong>{" "}
              ("Company", "we", "us", or "our"), a Limited Liability Company
              registered in Dubai, United Arab Emirates under License Number{" "}
              <strong>1562978</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, you may not
              access the Service.
            </p>
          </div>

          {/* Section 1: Description of Service */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Description of Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hakem AI is an artificial intelligence-powered decision support
              system designed for the insurance industry. The Service provides
              tools for:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                Extracting data from unstructured insurance quotation documents
                (PDFs).
              </li>
              <li>
                Comparing insurance offers against Request for Quotations (RFQs).
              </li>
              <li>
                Generating the "Hakem Score" to assess insurer financial health.
              </li>
              <li>Identifying risk exposures and exclusions.</li>
            </ul>
          </div>

          {/* Section 2: No Insurance or Financial Advice */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. No Insurance or Financial Advice
            </h2>
            <div className="bg-yellow-50 border-l-4 border-[#fdc431] p-4 mb-4">
              <p className="text-gray-800 font-semibold mb-2">
                ⚠️ Critical Disclaimer:
              </p>
              <p className="text-gray-700 leading-relaxed">
                Hakem AI is a technology platform, not an insurance broker,
                financial advisor, or legal counsel.
              </p>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong>Decision Support Only:</strong> The analysis,
                comparisons, and "Hakem Scores" provided by the Service are for
                informational purposes only. They are intended to assist
                professional judgment, not replace it.
              </li>
              <li>
                <strong>No Guarantee:</strong> We do not guarantee the solvency
                of any insurer or the suitability of any insurance product. The
                final decision to accept or reject an insurance offer rests solely
                with the User.
              </li>
              <li>
                <strong>Liability:</strong> Pexilogic Technologies CO. L.L.C
                S.O.C is not liable for any financial losses, denied claims, or
                coverage gaps resulting from decisions made based on Hakem AI's
                analysis.
              </li>
            </ul>
          </div>

          {/* Section 3: AI Limitations and Accuracy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. AI Limitations and Accuracy
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You acknowledge that the Service utilizes Artificial Intelligence
              (AI) and Optical Character Recognition (OCR) technologies, which are
              probabilistic in nature.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Potential Errors:</strong> While we strive for high
                accuracy, the System may occasionally misinterpret text, figures,
                or legal clauses within uploaded documents.
              </li>
              <li>
                <strong>Verification:</strong> You agree to review and verify all
                extracted data and comparisons against the original source
                documents before taking any action.
              </li>
            </ul>
          </div>

          {/* Section 4: User Accounts and Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. User Accounts and Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access certain features, you may be required to register an
              account.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                You are responsible for safeguarding the password that you use to
                access the Service.
              </li>
              <li>
                You agree not to disclose your password to any third party.
              </li>
              <li>
                You must notify us immediately upon becoming aware of any breach
                of security or unauthorized use of your account.
              </li>
            </ul>
          </div>

          {/* Section 5: Data Privacy and Sovereignty */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Data Privacy and Sovereignty
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to data privacy and respect the sovereignty laws of
              the jurisdictions in which we operate.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Stateless Processing:</strong> By default, our AI
                processing architecture is "stateless." Documents uploaded for
                analysis are processed in volatile memory and are not permanently
                stored on our servers unless you explicitly choose to save them to
                your account.
              </li>
              <li>
                <strong>KSA Compliance:</strong> For clients operating in the
                Kingdom of Saudi Arabia, we adhere to the Personal Data Protection
                Law (PDPL).
              </li>
              <li>
                <strong>UAE Compliance:</strong> For clients operating in the
                United Arab Emirates, we adhere to Federal Decree-Law No. 45 of
                2021 regarding the Protection of Personal Data.
              </li>
              <li>
                <strong>Data Ownership:</strong> You retain all rights and
                ownership of the data and documents you upload.
              </li>
            </ul>
          </div>

          {/* Section 6: Intellectual Property */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Intellectual Property
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                The Service and its original content (excluding Content provided
                by users), features, and functionality are and will remain the
                exclusive property of Pexilogic Technologies CO. L.L.C S.O.C and
                its licensors.
              </li>
              <li>
                The "Hakem AI" name, logo, and the "Hakem Score" methodology are
                trademarks of Pexilogic.
              </li>
              <li>
                You may not reverse engineer, decompile, or attempt to derive the
                source code or underlying algorithms of the Service.
              </li>
            </ul>
          </div>

          {/* Section 7: Subscription, Billing, and Taxes */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Subscription, Billing, and Taxes
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                Certain aspects of the Service may be provided for a fee. If you
                elect to use paid aspects of the Service, you agree to the pricing
                and payment terms.
              </li>
              <li>
                <strong>Taxes (VAT):</strong> All fees are exclusive of taxes
                unless otherwise stated. Value Added Tax (VAT) will be applied
                where applicable in accordance with UAE Federal Decree-Law No. (8)
                of 2017 on Value Added Tax or KSA VAT Law as relevant to the
                billing address.
              </li>
              <li>
                <strong>Refunds:</strong> All fees are non-refundable unless
                otherwise provided by law.
              </li>
              <li>
                <strong>Changes:</strong> We reserve the right to change our
                subscription plans or adjust pricing for our Service in any manner
                and at any time.
              </li>
            </ul>
          </div>

          {/* Section 8: Limitation of Liability */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In no event shall Pexilogic Technologies CO. L.L.C S.O.C, its
              directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, including without limitation, loss of profits,
              data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li>
                Your access to or use of or inability to access or use the
                Service;
              </li>
              <li>Any errors or inaccuracies in the AI-generated content;</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To the maximum extent permitted by applicable law, our total
              liability to you for any damages arising from or related to these
              Terms is limited to the amount you paid to access the Service in the
              12 months preceding the claim.
            </p>
          </div>

          {/* Section 9: Termination */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may terminate or suspend your account immediately, without prior
              notice or liability, for any reason whatsoever, including without
              limitation if you breach the Terms. Upon termination, your right to
              use the Service will immediately cease.
            </p>
          </div>

          {/* Section 10: Governing Law */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of the Emirate of Dubai and the Federal Laws of the United Arab
              Emirates, without regard to conflict of law provisions. Any disputes
              arising from these Terms shall be resolved in the competent courts
              of Dubai, UAE.
            </p>
          </div>

          {/* Section 11: Changes to Terms */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. By continuing to access or use our Service
              after those revisions become effective, you agree to be bound by the
              revised terms.
            </p>
          </div>

          {/* Section 12: Contact Us */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              12. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-[#f5f7f6] p-6 rounded-lg border border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#04786b]" />
                  <a
                    href="mailto:support@pexilogic.com"
                    className="text-[#04786b] font-semibold hover:text-[#fdc431] transition underline"
                  >
                    support@pexilogic.com
                  </a>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Registered Address:</strong> Office 204, Al Safi 1
                  Building, Al Mararr, Dubai, United Arab Emirates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <Link
              href="/privacy-policy"
              className="hover:text-[#fdc431] transition underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:text-[#fdc431] transition underline-offset-2 hover:underline"
            >
              Terms & Conditions
            </Link>
            <p className="text-xs mt-4 text-gray-300">
              Copyright©2025@hakem.ai. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

