"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface NavLink {
  name: string;
  href: string;
}

interface NavGroup {
  name: string;
  intro?: string;
  links: NavLink[];
}

/* One definition drives both the desktop bar and the mobile drawer. They were
   maintained as two hardcoded lists and had already drifted: Team was missing
   from the desktop bar, Volunteer was missing from the mobile list, and Apply
   For Support appeared in it twice. */
const PRIMARY: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
];

const GROUPS: NavGroup[] = [
  {
    name: "Impact",
    intro: "Stories, moments and lives transformed through our mission.",
    links: [
      { name: "Impact Stories", href: "/impact-stories" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    name: "Get Involved",
    intro: "Join the mission.",
    links: [
      { name: "Volunteer", href: "/volunteer" },
      { name: "Become A Partner", href: "/partnerships" },
      { name: "Apply For Support", href: "/apply-for-support" },
    ],
  },
];

const SECONDARY: NavLink[] = [
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // A section stays marked while you are inside it: /programs/education-support
  // used to leave "Programs" unhighlighted because the check was exact.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const isGroupActive = (group: NavGroup) =>
    group.links.some((link) => isActive(link.href));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigating away should not leave a menu hanging open. Done on the click
  // rather than as an effect on pathname, so no cascading render.
  const closeMenus = () => {
    setOpenGroup(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setOpenGroup(null);
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // The page behind the mobile drawer should not scroll with it.
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const linkClass = (href: string) =>
    `relative pb-2 font-medium transition-all duration-300 ${
      isActive(href) ? "text-brand" : "text-[#3A3A3A] hover:text-brand"
    }`;

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

            <Link href="/" onClick={closeMenus} className="flex items-center gap-4">
              <span
                className={`relative block transition-all duration-500 ${
                  scrolled ? "h-11 w-11" : "h-14 w-14"
                }`}
              >
                <Image
                  src="/logo.png"
                  alt="St. Hannah Foundation"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </span>

              <span>
                <span
                  className={`block font-bold leading-tight text-brand transition-all duration-500 ${
                    scrolled ? "text-lg" : "text-2xl"
                  }`}
                >
                  St. Hannah
                  <span className="block text-[#A86A1A]">Foundation</span>
                </span>

                <span className="hidden text-[11px] uppercase tracking-[2px] text-gray-500 lg:block">
                  Empowering Communities
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}

            <nav
              ref={navRef}
              aria-label="Main"
              className="hidden items-center gap-9 lg:flex"
            >
              {PRIMARY.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(link.href)}
                >
                  {link.name}

                  {isActive(link.href) && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-accent"
                    />
                  )}
                </Link>
              ))}

              {GROUPS.map((group) => {
                const open = openGroup === group.name;

                return (
                  <div key={group.name} className="relative">
                    {/* Both menus open on click. "Get Involved" opened on
                        hover only, so it could not be reached by keyboard and
                        was unreliable on touch, which hid Volunteer, Become A
                        Partner and Apply For Support. */}
                    <button
                      onClick={() => setOpenGroup(open ? null : group.name)}
                      aria-expanded={open}
                      aria-haspopup="true"
                      className={`flex items-center gap-2 pb-2 font-medium transition ${
                        open || isGroupActive(group)
                          ? "text-brand"
                          : "text-[#3A3A3A] hover:text-brand"
                      }`}
                    >
                      {group.name}

                      <ChevronDown
                        size={16}
                        aria-hidden
                        className={`transition-transform duration-300 ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      hidden={!open}
                      className="absolute left-1/2 top-full z-50 mt-5 w-72 -translate-x-1/2 overflow-hidden rounded-[24px] border border-accent/15 bg-white shadow-2xl"
                    >
                        {group.intro && (
                          <div className="border-b bg-cream px-6 py-5">
                            <p className="font-bold text-brand">
                              {group.name}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                              {group.intro}
                            </p>
                          </div>
                        )}

                        <ul>
                          {group.links.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                onClick={closeMenus}
                                aria-current={
                                  isActive(link.href) ? "page" : undefined
                                }
                                className={`block px-6 py-4 transition hover:bg-cream ${
                                  isActive(link.href)
                                    ? "font-semibold text-brand"
                                    : ""
                                }`}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                    </div>
                  </div>
                );
              })}

              {SECONDARY.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={linkClass(link.href)}
                >
                  {link.name}

                  {isActive(link.href) && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-accent"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}

            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/volunteer"
                className="rounded-xl border border-brand/20 px-6 py-3 font-semibold text-brand transition-all duration-300 hover:border-brand hover:bg-cream"
              >
                Volunteer
              </Link>

              <Link
                href="/donate"
                className="group rounded-xl bg-brand px-7 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-brand-light hover:shadow-2xl"
              >
                <span className="flex items-center gap-2">
                  <Heart
                    size={18}
                    aria-hidden
                    className="text-[#FFD77A] transition-transform duration-300 group-hover:scale-125"
                  />
                  Donate Now
                </span>
              </Link>
            </div>

            <button
              aria-label="Open menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
              className="rounded-xl p-2 transition hover:bg-cream lg:hidden"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100] overflow-y-auto bg-white"
        >
          <div className="flex items-center justify-between border-b p-6">
            <span className="flex items-center gap-3">
              <span className="relative block h-10 w-10">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </span>

              <span className="font-bold text-brand">
                St. Hannah Foundation
              </span>
            </span>

            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-2 transition hover:bg-cream"
            >
              <X size={30} />
            </button>
          </div>

          <nav aria-label="Main" className="px-6 py-6">
            <ul className="flex flex-col">
              {PRIMARY.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={closeMenus}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block border-b py-4 text-lg ${
                      isActive(link.href) ? "font-semibold text-brand" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {GROUPS.map((group) => (
                <li key={group.name} className="py-4">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-brand">
                    {group.name}
                  </p>

                  <ul className="mt-1">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          onClick={closeMenus}
                          aria-current={
                            isActive(link.href) ? "page" : undefined
                          }
                          className={`block border-b py-4 text-lg ${
                            isActive(link.href)
                              ? "font-semibold text-brand"
                              : ""
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}

              {SECONDARY.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={closeMenus}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block border-b py-4 text-lg ${
                      isActive(link.href) ? "font-semibold text-brand" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/donate"
                onClick={closeMenus}
                className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 font-semibold text-white"
              >
                <Heart size={18} aria-hidden />
                Donate Now
              </Link>

              <Link
                href="/volunteer"
                onClick={closeMenus}
                className="rounded-xl border border-brand px-6 py-4 text-center font-semibold text-brand"
              >
                Volunteer With Us
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
