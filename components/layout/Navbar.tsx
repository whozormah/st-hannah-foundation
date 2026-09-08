"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ----------------------------
     Close dropdown on outside click
  ----------------------------- */

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

  /* ----------------------------
     Navbar Scroll Effect
  ----------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ----------------------------
     Navigation
  ----------------------------- */

  const primaryLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
  ];

  const impactLinks = [
    {
      name: "Impact Stories",
      href: "/impact-stories",
    },
    {
      name: "Gallery",
      href: "/gallery",
    },
  ];

  const getInvolvedLinks = [
    {
      name: "Volunteer",
      href: "/volunteer",
    },
    {
      name: "Become A Partner",
      href: "/partnerships",
    },
    {
      name: "Apply For Support",
      href: "/apply-for-support",
    },
  ];

  const secondaryLinks = [
    {
      name: "Team",
      href: "/team",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? "border-gray-200 bg-white/90 shadow-xl backdrop-blur-2xl"
            : "border-transparent bg-white"
        }`}
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}

            <Link href="/" className="flex items-center gap-4">
              <div
                className={`relative transition-all duration-500 ${
                  scrolled ? "h-11 w-11" : "h-14 w-14"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="St. Hannah Foundation"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <span
                  className={`block font-bold leading-tight text-brand transition-all duration-500 ${
                    scrolled ? "text-lg" : "text-2xl"
                  }`}
                >
                  St. Hannah
                  <span className="block text-[#A86A1A]">Foundation</span>
                </span>

                <p className="hidden lg:block text-[11px] uppercase tracking-[2px] text-gray-500">
                  Empowering Communities
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden lg:flex items-center gap-10">
              {primaryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative pb-2 font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-brand"
                      : "text-[#3A3A3A] hover:text-brand"
                  }`}
                >
                  {link.name}

                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-accent" />
                  )}
                </Link>
              ))}

              {/* Impact */}

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="flex items-center gap-2 pb-2 font-medium text-[#3A3A3A] transition hover:text-brand"
                >
                  Impact
                  <ChevronDown
                    size={16}
                    className={`transition ${moreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {moreOpen && (
                  <div
                    className={`absolute right-0 top-full mt-5 w-72 overflow-hidden rounded-[28px] border bg-white shadow-2xl transition-all duration-300 ${
                      moreOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="border-b bg-cream p-6">
                      <h4 className="font-bold text-brand">Our Impact</h4>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        Explore the stories, moments and lives transformed
                        through our mission.
                      </p>
                    </div>

                    {impactLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMoreOpen(false)}
                        className="block px-7 py-5 transition hover:bg-cream"
                      >
                        {link.name}
                      </Link>
                    ))}

                    <div className="border-t bg-cream p-5">
                      <Link
                        href="/impact-stories"
                        className="font-semibold text-brand"
                      >
                        View Our Impact →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Involved */}

              <div className="group relative">
                <button className="flex items-center gap-2 pb-2 font-medium text-[#3A3A3A] transition hover:text-brand">
                  Get Involved
                  <ChevronDown size={16} />
                </button>

                <div className="absolute right-0 top-full invisible mt-5 w-72 overflow-hidden rounded-[28px] border bg-white opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100">
                  <div className="border-b bg-cream p-6">
                    <h4 className="font-bold text-brand">
                      Join The Mission
                    </h4>
                  </div>

                  {getInvolvedLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-7 py-5 transition hover:bg-cream"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative pb-2 font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-brand"
                      : "text-[#3A3A3A] hover:text-brand"
                  }`}
                >
                  {link.name}

                  {pathname === link.href && (
                    <span className="absolute -bottom-[6px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}

            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/volunteer"
                className="rounded-xl border border-brand/20 px-6 py-3 font-semibold text-brand transition-all duration-300 hover:border-brand hover:bg-cream"
              >
                Volunteer
              </Link>

              <Link
                href="/donate"
                className="group rounded-xl bg-brand px-7 py-3 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-brand-light hover:shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  <Heart
                    size={18}
                    className="animate-pulse text-[#FFD77A] transition-transform duration-300 group-hover:scale-125"
                  />
                  Donate Now
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}

            <button aria-label="Open menu"
              onClick={() => setIsOpen(true)}
              className="rounded-xl p-2 transition hover:bg-cream lg:hidden"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}

      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white/95 backdrop-blur-xl">
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

              <span className="font-bold text-brand">
                St. Hannah Foundation
              </span>
            </div>

            <button aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 transition hover:bg-cream"
            >
              <X size={30} />
            </button>
          </div>

          <div className="flex flex-col px-8 py-8">
            <div className="bg-cream p-6 rounded-2xl mb-8">
              <h3 className="font-bold text-lg">
                Together We Can Change Lives
              </h3>

              <p className="text-gray-700 mt-2 text-sm leading-6">
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
              className="border-b border-gray-100 py-5 text-lg font-medium transition hover:text-brand"
            >
              Become A Partner
            </Link>

            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/apply-for-support"
                onClick={() => setIsOpen(false)}
                className="bg-cream text-center py-4 rounded-xl font-semibold"
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
                className="bg-brand text-white text-center py-4 rounded-xl font-semibold"
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
