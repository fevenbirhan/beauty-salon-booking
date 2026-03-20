import Link from "next/link"
import Image from "next/image"
import { Scissors, Sparkles, Calendar, Palette } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-pink-50">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white shadow-sm">

        <h1 className="text-2xl font-bold text-pink-600">
          Glow Beauty
        </h1>

        <Link
          href="/book"
          className="bg-pink-600 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Book Now
        </Link>

      </nav>

      {/* HERO */}

      <section className="grid md:grid-cols-2 items-center px-6 md:px-16 py-16 gap-10">

        {/* Text */}

        <div className="text-center md:text-left">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Book Your Beauty Appointment Online 💖
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Professional beauty services for women — braids, facials,
            nail care, and more. Choose your time and relax while we
            handle the rest.
          </p>

          <Link
            href="/book"
            className="inline-block mt-8 bg-pink-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-pink-700 transition shadow"
          >
            Book Appointment
          </Link>

        </div>

        {/* Image */}

        <div className="w-full">
          <Image
            src="/images/hero-salon.jpg"
            alt="Beauty salon"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
            priority
          />
        </div>

      </section>

      {/* SERVICES */}

      <section className="px-6 md:px-12 pb-20">

        <h3 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
          Our Services ✨
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {/* Braids */}

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">

            <Scissors className="mx-auto text-pink-600" size={40} />

            <h4 className="text-xl font-semibold mt-4">
              Braids
            </h4>

            <p className="text-gray-500 mt-2">
              Professional braiding styles
            </p>

          </div>

          {/* Facial */}

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">

            <Sparkles className="mx-auto text-pink-600" size={40} />

            <h4 className="text-xl font-semibold mt-4">
              Facial
            </h4>

            <p className="text-gray-500 mt-2">
              Deep skin glow treatment
            </p>

          </div>

          {/* Manicure */}

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">

            <Calendar className="mx-auto text-pink-600" size={40} />

            <h4 className="text-xl font-semibold mt-4">
              Manicure
            </h4>

            <p className="text-gray-500 mt-2">
              Elegant nail care & polish
            </p>

          </div>

          {/* Hair Coloring */}

          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">

            <Palette className="mx-auto text-pink-600" size={40} />

            <h4 className="text-xl font-semibold mt-4">
              Hair Coloring
            </h4>

            <p className="text-gray-500 mt-2">
              Vibrant & stylish hair colors
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}