import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 sm:pt-16">

      {/* ================= MAIN FOOTER ================= */}
      <div
        className="max-w-7xl mx-auto px-6
                   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                   gap-10 sm:gap-12 pb-12 text-center sm:text-left"
      >

        {/* Company */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">
            EventHost
          </h3>

          <p className="text-sm leading-6">
            We organize weddings, corporate events and parties with
            creativity, professionalism and perfection.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start gap-4 mt-5 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-white transition" />
            <FaInstagram className="cursor-pointer hover:text-white transition" />
            <FaTwitter className="cursor-pointer hover:text-white transition" />
          </div>
        </div>



        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-white transition">Home</a></li>
            <li><a href="#services" className="hover:text-white transition">Services</a></li>
            <li><a href="#about" className="hover:text-white transition">About</a></li>
            <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>



        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Services
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="hover:text-white transition">Wedding Planning</li>
            <li className="hover:text-white transition">Corporate Events</li>
            <li className="hover:text-white transition">Birthday Parties</li>
          </ul>
        </div>



        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-white">
            Contact Info
          </h3>

          <ul className="space-y-2 text-sm">
            <li>Email: eventhost@gmail.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Mumbai, India</li>
          </ul>
        </div>

      </div>



      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-700 text-center py-4 sm:py-5 text-xs sm:text-sm text-gray-400">
        © 2026 EventHost. All rights reserved.
      </div>

    </footer>
  );
}
