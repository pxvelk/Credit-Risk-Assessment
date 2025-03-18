import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="py-10 px-4 mb-8 mt-8">
        <div className="flex space-x-8 items-center text-center justify-center">
          <Link
            href="/"
            className=""
            style={{ color: "#066BB0" }}
          >
            <p className="p-3 bg-blue-600 text-white rounded-lg">Back</p>
          </Link>
          <h2
            className="text-4xl font-serif"
            style={{ color: "#066BB0" }}
          >
            Powerful Features for Smarter Risk Assessment
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-lg">
            <h3 className="text-xl font-serif " style={{ color: "#066BB0" }}>
              🚀 Advanced Analytics
            </h3>
            <p className="text-gray-600 mt-2">
              Harness the power of machine learning for precise, data-driven
              risk predictions.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-lg">
            <h3 className="text-xl font-serif " style={{ color: "#066BB0" }}>
              🔒 Secure Platform
            </h3>
            <p className="text-gray-600 mt-2">
              Protect your sensitive data with industry-leading, bank-grade
              security.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-lg">
            <h3 className="text-xl font-serif " style={{ color: "#066BB0" }}>
              📊 Credit Monitoring
            </h3>
            <p className="text-gray-600 mt-2">
              Stay ahead with real-time insights into your credit portfolios.
            </p>
          </div>
          <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-lg">
            <h3 className="text-xl font-serif " style={{ color: "#066BB0" }}>
              ⚖ Risk Scoring
            </h3>
            <p className="text-gray-600 mt-2">
              Make informed decisions with a comprehensive, AI-powered risk
              scoring system.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-b from-blue-200 to-white py-8 text-center">
        <h2 className="text-3xl font-serif " style={{ color: "#066BB0" }}>
          Ready to Elevate Your Risk Assessment?
        </h2>
        <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
          Join top financial institutions leveraging our cutting-edge platform
          to predict credit risk with confidence!
        </p>
        <Link href="/Page3">
          <button className="mt-6 px-6 py-3 bg-blue-700 text-white text-lg font-serif rounded-lg shadow-lg hover:bg-blue-700">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}