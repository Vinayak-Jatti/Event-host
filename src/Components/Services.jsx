export default function Services() {
  const services = [
    {
      title: "Wedding Events",
      img: "https://images.unsplash.com/photo-1519741497674-611481863552",
    },
    {
      title: "Corporate Events",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    },
    {
      title: "Birthday Parties",
      img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3",
    },
  ];

  const steps = ["Plan", "Organize", "Execute"];

  return (
    <div>

      {/* ================= SERVICES ================= */}
      <section
        id="services"
        className="py-16 sm:py-20 md:py-24 px-6 bg-gray-100 text-center"
      >

        {/* Responsive heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 md:mb-14 text-gray-800">
          Our Services
        </h2>


        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {services.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden
                         hover:-translate-y-3 hover:shadow-xl hover:scale-105
                         transition duration-300"
            >
              {/* Responsive Image */}
              <img
                src={item.img}
                alt={item.title}
                className="h-44 sm:h-48 md:h-52 w-full object-cover"
              />

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  Professional planning with premium decoration and smooth
                  management.
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>



      {/* ================= PROCESS ================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-white text-center">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          How We Work
        </h2>

        {/* Responsive steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-gray-50 p-8 sm:p-10 rounded-2xl shadow-md
                         hover:-translate-y-2 hover:shadow-lg transition"
            >
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-3">
                {i + 1}
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {step}
              </h3>

              <p className="text-gray-500 text-sm">
                We carefully handle every step to make your event perfect.
              </p>
            </div>
          ))}

        </div>
      </section>



      {/* ================= CTA ================= */}
      <section className="py-16 sm:py-20 md:py-24 text-center bg-indigo-600 text-white">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Let’s Create Something Amazing
        </h2>

        <p className="mb-8 text-indigo-100 text-sm sm:text-base">
          Book your event today and make memories that last forever.
        </p>

        <button
          className="bg-white text-black px-8 py-3 rounded-xl font-semibold
                     hover:bg-green-500 hover:text-white transition duration-300"
        >
          Book Now
        </button>

      </section>

    </div>
  );
}
