import Image from "next/image";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

export default function PrivacyPolicy() {
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

      {/* ====== PRIVACY POLICY CONTENT ====== */}
      <section className="flex-grow bg-gray-50 py-12 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-72">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#04786b] mb-8">
            Privacy Policy
          </h1>

          {/* Section 1: Introduction */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              hakem.ai ("we," "our," or "us") respects your privacy and is
              committed to protecting your personal data. We are a registered
              brand in Dubai, United Arab Emirates, providing services to
              professionals across the Middle East.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform. It is designed
              to comply with applicable data protection laws, including the UAE
              Federal Decree-Law No. 45 and No. 34 of 2021 and the Saudi Personal
              Data Protection Law (PDPL).
            </p>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using our services, you consent to the data
              practices described in this policy.
            </p>
          </div>

          {/* Section 2: Information We Collect */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect information to provide and improve our services. This
              includes:
            </p>

            {/* Subsection 2.1 */}
            <div className="ml-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.1 Information You Provide to Us
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>
                  <strong>Account Information:</strong> When you register, we
                  collect identifiers such as your name, company name, email
                  address, and phone number.
                </li>
                <li>
                  <strong>Service Data:</strong> This includes the content,
                  documents (such as insurance quotations), and other materials
                  you upload or input into the platform for analysis ("User
                  Content").
                </li>
                <li>
                  <strong>Communications:</strong> Information provided when you
                  contact our support team or respond to surveys.
                </li>
              </ul>
            </div>

            {/* Subsection 2.2 */}
            <div className="ml-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>
                  <strong>Usage Data:</strong> We collect information about your
                  interactions with the platform, such as features used, pages
                  visited, and time spent.
                </li>
                <li>
                  <strong>Device & Technical Data:</strong> Information including
                  your IP address, browser type, device identifiers, and operating
                  system logs, used for security and troubleshooting.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3: How We Use Your Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your data for the following lawful purposes:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Service Provision:</strong> To deliver the core
                functionality of the platform, including data extraction, scoring,
                and report generation.
              </li>
              <li>
                <strong>Account Administration:</strong> To manage your
                subscription, verify your identity, and provide customer support.
              </li>
              <li>
                <strong>Platform Improvement:</strong> To analyze usage trends and
                enhance the performance, security, and user experience of our
                services.
              </li>
              <li>
                <strong>Security & Compliance:</strong> To detect and prevent
                fraud, unauthorized access, and other illegal activities, and to
                comply with legal obligations in the UAE and KSA.
              </li>
            </ul>
          </div>

          {/* Section 4: Data Processing & Retention */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Data Processing & Retention
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to the principle of Data Minimization.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Service Data Processing:</strong> Documents you upload for
                analysis are processed securely to generate the requested insights.
                We retain this data only for as long as is necessary to fulfill the
                specific service request or as required by law.
              </li>
              <li>
                <strong>Account Data Retention:</strong> We retain your account
                information for as long as your account is active or as needed to
                provide you with services, comply with our legal obligations,
                resolve disputes, and enforce our agreements.
              </li>
            </ul>
          </div>

          {/* Section 5: Sharing of Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Sharing of Information
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell your personal data. We may share your information
              only in the following limited circumstances:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                vendors who assist us in operating our platform (e.g., cloud
                hosting, payment processing), subject to strict confidentiality
                agreements.
              </li>
              <li>
                <strong>Legal Compliance:</strong> If required by law, regulation,
                or legal process (e.g., a court order or government request) in
                the UAE or KSA.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any merger,
                sale of company assets, or acquisition of all or a portion of our
                business by another company.
              </li>
            </ul>
          </div>

          {/* Section 6: International Data Transfers */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. International Data Transfers
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              As an entity operating across the region, we may process data in
              jurisdictions outside of your country of residence.
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              <li>
                <strong>Compliance:</strong> We take appropriate measures to
                ensure that any cross-border transfer of data complies with the
                KSA PDPL (Article 29) and the UAE Data Protection Law.
              </li>
              <li>
                <strong>Safeguards:</strong> We utilize robust legal mechanisms
                and standard contractual clauses to ensure your data remains
                protected to a standard comparable to that of your local
                jurisdiction.
              </li>
            </ul>
          </div>

          {/* Section 7: Data Security */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Data Security
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard technical and organizational measures
              to protect your information against unauthorized access, alteration,
              disclosure, or destruction. These measures include encryption in
              transit and at rest, strict access controls, and regular security
              assessments.
            </p>
          </div>

          {/* Section 8: Your Rights and Choices */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Your Rights and Choices
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Depending on your jurisdiction (KSA or UAE), you may have specific
              rights regarding your personal data, including:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-4">
              <li>
                <strong>Access & Correction:</strong> The right to request access
                to or correction of your personal data.
              </li>
              <li>
                <strong>Deletion:</strong> The right to request the deletion of
                your account and personal data, subject to legal retention
                requirements.
              </li>
              <li>
                <strong>Withdraw Consent:</strong> The right to withdraw consent
                for processing where consent is the basis for processing.
              </li>
              <li>
                <strong>Marketing Opt-Out:</strong> You may opt out of receiving
                promotional emails from us by following the unsubscribe
                instructions in those emails.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:dpo@hakim.ai"
                className="text-[#04786b] font-semibold hover:text-[#fdc431] transition underline"
              >
                dpo@hakim.ai
              </a>
            </p>
          </div>

          {/* Section 9: Updates to This Policy */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Updates to This Policy
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. We will notify you
              of any material changes by posting the new policy on this page and
              updating the "Effective Date."
            </p>
          </div>

          {/* Section 10: Contact Us */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <div className="bg-[#f5f7f6] p-6 rounded-lg border border-gray-200">
              <p className="text-gray-800 font-semibold mb-2">hakem.ai Team</p>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-[#04786b]" />
                <a
                  href="mailto:info@hakim.ai"
                  className="text-[#04786b] font-semibold hover:text-[#fdc431] transition underline"
                >
                  info@hakim.ai
                </a>
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

