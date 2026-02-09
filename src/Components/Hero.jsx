import { FaPaintBrush, FaUsers, FaDollarSign } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="min-h-screen flex flex-col md:flex-row items-center justify-center
                   bg-gradient-to-br from-indigo-600 via-purple-600 to-gray-800
                   text-white px-6 sm:px-10 lg:px-20 py-16 md:py-24"
      >

        {/* LEFT CONTENT */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">

          {/* Responsive Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Perfect Events <br />
            <span className="text-purple-200">Zero Stress</span>
          </h1>

          {/* Paragraph */}
          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-lg mx-auto md:mx-0">
            We organize weddings, corporate events, parties and conferences
            professionally with creativity and perfection.
          </p>

          {/* Buttons responsive */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">

            <button
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold
                         hover:bg-green-500 hover:text-white transition duration-300"
            >
              Book Event
            </button>

            <button
              className="border border-white px-6 py-3 rounded-xl
                         hover:bg-green-500 hover:text-white hover:border-green-500
                         transition duration-300"
            >
              Explore
            </button>

          </div>
        </div>



        {/* RIGHT CARD */}
        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">

          <div
            className="group bg-white/20 backdrop-blur-lg p-8 sm:p-10 md:p-12
                       rounded-3xl shadow-xl text-center w-64 sm:w-72 md:w-80
                       transform transition duration-500
                       hover:-translate-y-3 hover:scale-105 hover:bg-white/30"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-green-400 transition">
              500+
            </h3>

            <p className="text-gray-200 text-sm sm:text-base">
              Events Successfully Hosted
            </p>
          </div>

        </div>
      </section>



      {/* ================= FEATURES ================= */}
      <section className="py-16 md:py-24 bg-gray-100">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Us
        </h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:-translate-y-2 transition">
            <FaPaintBrush className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold">Creative Decoration</h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:-translate-y-2 transition">
            <FaUsers className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold">Professional Team</h3>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md text-center hover:-translate-y-2 transition">
            <FaDollarSign className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold">Affordable Pricing</h3>
          </div>

        </div>
      </section>



      {/* ================= CTA ================= */}
      <section className="py-16 md:py-24 text-center bg-purple-700 text-white">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Ready To Plan Your Event?
        </h2>

        <button
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold
                     hover:bg-green-500 hover:text-white transition"
        >
          Contact Us
        </button>

      </section>

    </div>
  );
}
