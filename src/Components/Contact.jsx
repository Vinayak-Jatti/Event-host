import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Message sent!");
    setName("");
    setEmail("");
  }

  return (
    <div>

      {/* ================= CONTACT INFO ================= */}
      <section
        id="contact"
        className="py-16 sm:py-20 md:py-24 bg-gray-100 text-center px-6"
      >

        {/* Responsive heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Get In Touch
        </h2>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            { icon: <FaPhoneAlt />, title: "Phone", value: "+91 9876543210" },
            { icon: <FaEnvelope />, title: "Email", value: "eventhost@gmail.com" },
            { icon: <FaMapMarkerAlt />, title: "Location", value: "Mumbai, India" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center
                         hover:-translate-y-2 hover:shadow-xl transition"
            >
              <div className="text-2xl sm:text-3xl mb-4 text-purple-600 flex justify-center">
                {item.icon}
              </div>

              <h3 className="font-semibold text-base sm:text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm">{item.value}</p>
            </div>
          ))}

        </div>
      </section>



      {/* ================= CONTACT FORM ================= */}
      <section className="py-16 sm:py-20 md:py-24 flex justify-center bg-white px-6">

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10
                     w-full max-w-sm sm:max-w-md space-y-4"
        >

          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Send Message
          </h2>

          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            placeholder="Message"
            rows="4"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            className="bg-purple-600 text-white w-full p-3 rounded-lg font-semibold
                       hover:bg-purple-700 hover:scale-105 transition duration-300"
          >
            Send Message
          </button>

        </form>
      </section>



      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 md:py-24 text-center bg-purple-700 text-white">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Let’s Plan Your Next Event
        </h2>

        <p className="mb-8 text-purple-100 text-sm sm:text-base">
          We are ready to make your event unforgettable.
        </p>

        <button
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold
                     hover:bg-purple-600 hover:text-white transition duration-300"
        >
          Book Consultation
        </button>

      </section>

    </div>
  );
}
