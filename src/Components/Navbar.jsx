import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const link =
    "relative hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-gray-300 shadow-md">

      <div className="flex justify-between items-center px-6 py-4">

        {/* ================= LOGO ================= */}
        <a href="#home" className="flex items-center gap-2">

          {/* EH Monogram */}
          <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-sm font-bold">
            EH
          </span>

          {/* Brand Name */}
          <span className="text-white font-bold text-lg sm:text-xl tracking-wide">
            Event<span className="text-purple-400">Host</span>
          </span>

        </a>



        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#home" className={link}>Home</a>
          <a href="#services" className={link}>Services</a>
          <a href="#about" className={link}>About</a>
          <a href="#contact" className={link}>Contact</a>
        </div>



        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>



      {/* ================= MOBILE MENU ================= */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-gray-800">

          <a href="#home" onClick={() => setOpen(false)} className={link}>Home</a>
          <a href="#services" onClick={() => setOpen(false)} className={link}>Services</a>
          <a href="#about" onClick={() => setOpen(false)} className={link}>About</a>
          <a href="#contact" onClick={() => setOpen(false)} className={link}>Contact</a>

        </div>
      )}

    </nav>
  );
}
