"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Apply For Support", href: "/apply-for-support" },
    { name: "Stories", href: "/impact-stories" },
    { name: "Gallery", href: "/gallery" },
  ];
  const moreLinks = [
    { name: "Team", href: "/team" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "Become A Partner", href: "/partnerships" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container-custom">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}

            <Link href="/" className="flex items-center gap-4">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.png"
                  alt="St. Hannah Foundation"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-[#844204] leading-tight">
                  St. Hannah Foundation
                </h1>

                <p className="hidden lg:block text-xs text-gray-500">
                  Empowering Communities Through Love & Service
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition ${
                    pathname === link.href
                      ? "text-[#844204] font-semibold"
                      : "hover:text-[#844204]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* More Dropdown */}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-1 font-medium hover:text-[#844204] transition"
                >
                  More
                  <ChevronDown size={16} />
                </button>

                {moreOpen && (
                  <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-2xl shadow-xl border overflow-hidden">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-6 py-4 hover:bg-[#FAF7F2] transition"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Buttons */}

            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/volunteer"
                className="border border-[#844204] px-6 py-3 rounded-xl hover:bg-[#844204] hover:text-white transition font-semibold"
              >
                Volunteer
              </Link>

              <Link
                href="/donate"
                className="bg-[#844204] text-white px-6 py-3 rounded-xl hover:bg-[#A85A12] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <Heart size={18} />
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}

            <button className="lg:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="St. Hannah Foundation"
                  fill
                  className="object-contain"
                />
              </div>

              <span className="font-bold text-[#844204]">
                St. Hannah Foundation
              </span>
            </div>

            <button onClick={() => setIsOpen(false)}>
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col px-8 py-8">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-lg">
                Together We Can Change Lives
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-6">
                Join us in empowering widows, supporting families, providing
                educational opportunities and transforming communities.
              </p>
            </div>
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              About
            </Link>

            <Link
              href="/programs"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Programs
            </Link>

            <Link
              href="/impact-stories"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Stories
            </Link>

            <Link
              href="/gallery"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Gallery
            </Link>

            <Link
              href="/team"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Team
            </Link>

            <Link
              href="/apply-for-support"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Apply For Support
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Contact
            </Link>
            <Link
              href="/partnerships"
              onClick={() => setIsOpen(false)}
              className="py-5 border-b"
            >
              Become A Partner
            </Link>

            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/apply-for-support"
                onClick={() => setIsOpen(false)}
                className="bg-[#FAF7F2] text-center py-4 rounded-xl font-semibold"
              >
                Apply For Support
              </Link>
              <Link
                href="/volunteer"
                onClick={() => setIsOpen(false)}
                className="py-5 border-b"
              >
                Volunteer
              </Link>

              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="bg-[#844204] text-white text-center py-4 rounded-xl font-semibold"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
