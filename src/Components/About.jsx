import { FaStar, FaUsers, FaClock } from "react-icons/fa";

export default function About() {
  return (
    <div>

      {/* ================= ABOUT HERO ================= */}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-24 text-center
                   bg-gradient-to-br from-purple-600 to-purple-800
                   text-white px-6"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          About Us
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-purple-100">
          We design and manage beautiful events with creativity,
          professionalism and stress-free execution.
        </p>
      </section>



      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-gray-100 px-6">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Who We Are
            </h2>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              We are a professional event management company organizing weddings,
              corporate meetings and celebrations with premium decoration and
              perfect coordination.
            </p>

            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              Our experienced planners handle everything from planning to
              execution so you can relax and enjoy your special day.
            </p>

            <p className="text-gray-600 text-sm sm:text-base">
              500+ successful events and happy clients speak for our quality and dedication.
            </p>
          </div>

          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
              alt="Event"
              className="rounded-2xl shadow-xl w-full h-56 sm:h-64 md:h-80 object-cover"
            />
          </div>

        </div>
      </section>



      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white text-center px-6">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:-translate-y-2 transition">
            <FaStar className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-500 text-sm">
              Elegant decorations and professional execution.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:-translate-y-2 transition">
            <FaUsers className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">Expert Team</h3>
            <p className="text-gray-500 text-sm">
              Skilled planners with years of experience.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:-translate-y-2 transition">
            <FaClock className="text-3xl mx-auto mb-4 text-purple-600" />
            <h3 className="font-semibold mb-2">On-Time Delivery</h3>
            <p className="text-gray-500 text-sm">
              Events completed perfectly and on schedule.
            </p>
          </div>

        </div>
      </section>



      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 md:py-24 text-center bg-purple-700 text-white">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Let’s Plan Your Next Event
        </h2>

        <button
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold
                     hover:bg-purple-600 hover:text-white transition"
        >
          Contact Us
        </button>

      </section>

    </div>
  );
}
