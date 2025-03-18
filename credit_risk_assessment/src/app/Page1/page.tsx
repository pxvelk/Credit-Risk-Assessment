import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('white.jpg')" }} // Replace with your image
      >
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>{" "}
        {/* Adjusted opacity */}
        <div className="relative text-center">
          <h1
            className="lg:text-6xl text-5xl font-serif text-white" // Changed text color to white
          >
            Credit Risk Assessment
          </h1>
          <p className="text-lg text-gray-100 mt-3 lg:mx-80">
            Revolutionize credit risk assessment with cutting-edge machine
            learning! Accurately predict credit card loan defaults and make
            smarter, faster, and more confident lending decisions. Unlock the
            power of AI for risk-free growth.
          </p>
          <Link href="/Page2">
            <button className="mt-7 px-6 py-3 bg-blue-600 text-white text-lg font-serif rounded-lg shadow-lg hover:bg-blue-700">
              Start Assessment
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}