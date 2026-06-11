import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Heart, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#140B02] text-white overflow-hidden">
      {/* CTA Banner */}

      <div className="border-b border-white/10">
        <div className="container-custom py-20">
          <div className="text-center max-w-4xl mx-auto">
            <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
              Join The Mission
            </span>

            <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
              Together We Can Restore Hope And Transform Lives
            </h2>

            <p className="mt-6 text-gray-300 text-lg">
              Every act of kindness creates opportunities, restores dignity and
              strengthens communities.
            </p>

            <Link
              href="/donate"
              className="inline-flex items-center gap-2 mt-10 bg-[#844204] hover:bg-[#A85A12] transition px-8 py-4 rounded-xl font-semibold"
            >
              Donate Today
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}

      <div className="container-custom py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Brand Section */}

          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="St. Hannah Foundation"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold">St. Hannah Foundation</h3>

                <p className="text-[#D9A441]">
                  Empowering Communities Through Love & Service
                </p>
              </div>
            </div>

            <p className="mt-8 text-gray-300 leading-8">
              We exist to uplift families and communities through dignified
              access to resources, education and community empowerment, igniting
              hope and restoring the power of possibility.
            </p>

            <div className="mt-8 border-l-4 border-[#D9A441] pl-5">
              <p className="italic text-gray-300 leading-8">
                "To build a world where every child and family experiences the
                fullness of their God-given potential."
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/volunteer"
                  className="bg-white text-[#140B02] px-6 py-3 rounded-xl font-semibold"
                >
                  Volunteer
                </Link>

                <Link
                  href="/donate"
                  className="bg-[#844204] px-6 py-3 rounded-xl font-semibold"
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>

          {/* Explore */}

          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-6">Explore</h4>

            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/">Home</Link>
              </li>

              <li>
                <Link href="/about">About Us</Link>
              </li>

              <li>
                <Link href="/programs">Programs</Link>
              </li>

              <li>
                <Link href="/stories">Stories of Impact</Link>
              </li>

              <li>
                <Link href="/gallery">Gallery</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}

          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-6">Get Involved</h4>

            <ul className="space-y-4 text-gray-300">
              <li>
                <Link href="/donate">Donate</Link>
              </li>

              <li>
                <Link href="/volunteer">Volunteer</Link>
              </li>

              <li>
                <Link href="/apply-for-support">Apply For Support</Link>
              </li>

              <li>
                <Link href="/impact-stories">Impact Stories</Link>
              </li>

              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div className="lg:col-span-3">
            <h4 className="font-bold text-xl mb-6">Contact</h4>

            <div className="space-y-6">
              <div className="flex gap-3">
                <Mail size={18} className="text-[#D9A441] mt-1" />

                <span className="text-gray-300 break-all">
                  support@thesthannahfoundation.com
                </span>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#D9A441] mt-1" />

                <div>
                  <p className="font-semibold">Nigeria Office</p>

                  <p className="text-gray-300">
                    35, Ilaje Road
                    <br />
                    Bariga, Lagos
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-[#D9A441] mt-1" />

                <div>
                  <p className="font-semibold">United States Office</p>

                  <p className="text-gray-300">
                    4310 S King Dr.
                    <br />
                    Unit 3D
                    <br />
                    Chicago, IL 60653
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h4 className="font-bold text-xl mb-6">Follow Us</h4>

          <div className="flex gap-4">
            <a
              href="#"
              target="_blank"
              className="text-gray-300 hover:text-[#D9A441] transition"
            >
              Facebook
            </a>

            <a
              href="#"
              target="_blank"
              className="text-gray-300 hover:text-[#D9A441] transition"
            >
              Instagram
            </a>

            <a
              href="#"
              target="_blank"
              className="text-gray-300 hover:text-[#D9A441] transition"
            >
              LinkedIn
            </a>

            <a
              href="#"
              target="_blank"
              className="text-gray-300 hover:text-[#D9A441] transition"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* Donation Card */}

        <div className="mt-20">
          <div className="bg-gradient-to-r from-[#844204] to-[#A85A12] rounded-[32px] p-10">
            <div className="grid md:grid-cols-4 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold">Support Our Mission</h3>

                <p className="text-white/80 mt-3">
                  Every contribution creates impact.
                </p>
              </div>

              <div>
                <p className="text-white/70 text-sm">Bank Name</p>

                <p className="font-semibold text-xl">FirstBank</p>
              </div>

              <div>
                <p className="text-white/70 text-sm">Account Number</p>

                <p className="font-semibold text-xl">2047855878</p>
              </div>

              <div>
                <p className="text-white/70 text-sm">Account Name</p>

                <p className="font-semibold">St. Hannah Charity Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} St. Hannah Foundation. All Rights
            Reserved.
          </p>

          <p className="text-gray-400 text-sm flex items-center gap-2">
            Made with <Heart size={14} /> for lasting impact.
          </p>
        </div>
      </div>
    </footer>
  );
}
